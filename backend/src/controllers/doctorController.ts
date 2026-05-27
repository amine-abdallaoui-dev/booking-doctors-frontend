import { Response, NextFunction } from "express";
import { User } from "../models/User";
import { TimeSlot } from "../models/TimeSlot";
import { Review } from "../models/Review";
import { Appointment } from "../models/Appointment";
import { AuthRequest } from "../types";
import { NotFoundError } from "../utils/errors";

export async function getDoctors(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const {
      specialty,
      location,
      search,
      minRating,
      maxPrice,
      consultationType,
      online,
      page = "1",
      limit = "10",
    } = req.query;

    const filter: Record<string, unknown> = {
      role: "doctor",
      "doctorProfile.isApproved": true,
    };

    if (specialty) filter["doctorProfile.specialty"] = specialty;
    if (location) filter["doctorProfile.location"] = { $regex: location as string, $options: "i" };
    if (online) filter["doctorProfile.online"] = online === "true";
    if (consultationType === "video") filter["doctorProfile.videoAvailable"] = true;
    if (minRating) filter["doctorProfile.rating"] = { $gte: Number(minRating) };
    if (maxPrice) filter["doctorProfile.price"] = { $lte: Number(maxPrice) };

    if (search) {
      filter.$or = [
        { name: { $regex: search as string, $options: "i" } },
        { "doctorProfile.specialty": { $regex: search as string, $options: "i" } },
        { "doctorProfile.hospital": { $regex: search as string, $options: "i" } },
        { "doctorProfile.location": { $regex: search as string, $options: "i" } },
      ];
    }

    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.min(50, Math.max(1, Number(limit)));
    const skip = (pageNum - 1) * limitNum;

    const [doctors, total] = await Promise.all([
      User.find(filter)
        .select("-password")
        .skip(skip)
        .limit(limitNum)
        .sort({ "doctorProfile.rating": -1 }),
      User.countDocuments(filter),
    ]);

    res.json({
      doctors,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function getDoctorBySlug(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const doctor = await User.findOne({
      role: "doctor",
      "doctorProfile.slug": req.params.slug,
    }).select("-password");

    if (!doctor) throw new NotFoundError("Doctor");
    res.json({ doctor });
  } catch (err) {
    next(err);
  }
}

export async function getDoctorById(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const doctor = await User.findOne({
      _id: req.params.id,
      role: "doctor",
    }).select("-password");

    if (!doctor) throw new NotFoundError("Doctor");
    res.json({ doctor });
  } catch (err) {
    next(err);
  }
}

export async function getDoctorSlots(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { date } = req.query;
    const doctorId = req.params.id;

    if (!date) {
      // Return the next 7 days of slots
      const today = new Date();
      const end = new Date(today);
      end.setDate(end.getDate() + 7);

      const slots = await TimeSlot.find({
        doctor: doctorId,
        date: { $gte: today, $lte: end },
        isBooked: false,
      }).sort({ date: 1, startTime: 1 });

      res.json({ slots });
      return;
    }

    const targetDate = new Date(date as string);
    const slots = await TimeSlot.find({
      doctor: doctorId,
      date: {
        $gte: new Date(targetDate.setHours(0, 0, 0, 0)),
        $lte: new Date(targetDate.setHours(23, 59, 59, 999)),
      },
    }).sort({ startTime: 1 });

    res.json({ slots });
  } catch (err) {
    next(err);
  }
}

export async function getDoctorReviews(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { page = "1", limit = "10" } = req.query;
    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.min(50, Math.max(1, Number(limit)));

    const [reviews, total] = await Promise.all([
      Review.find({ doctor: req.params.id, status: "published" })
        .populate("patient", "name avatar")
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum)
        .sort({ createdAt: -1 }),
      Review.countDocuments({ doctor: req.params.id, status: "published" }),
    ]);

    const stats = await Review.aggregate([
      { $match: { doctor: req.params.id as any, status: "published" } },
      {
        $group: {
          _id: null,
          average: { $avg: "$rating" },
          count: { $sum: 1 },
          breakdown: { $push: "$rating" },
        },
      },
    ]);

    const breakdown = [0, 0, 0, 0, 0];
    if (stats.length > 0) {
      stats[0].breakdown.forEach((r: number) => {
        if (r >= 1 && r <= 5) breakdown[r - 1]++;
      });
    }

    res.json({
      reviews,
      stats: {
        average: stats.length > 0 ? Math.round(stats[0].average * 10) / 10 : 0,
        total: stats.length > 0 ? stats[0].count : 0,
        breakdown,
      },
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function getSimilarDoctors(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const doctor = await User.findById(req.params.id).select("-password");
    if (!doctor) throw new NotFoundError("Doctor");

    const similar = await User.find({
      _id: { $ne: doctor._id },
      role: "doctor",
      "doctorProfile.specialty": doctor.doctorProfile?.specialty,
      "doctorProfile.isApproved": true,
    })
      .select("-password")
      .limit(3)
      .sort({ "doctorProfile.rating": -1 });

    res.json({ doctors: similar });
  } catch (err) {
    next(err);
  }
}

// ---- Doctor Dashboard ----

export async function getDoctorDashboard(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const doctorId = req.user!.userId;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const endOfToday = new Date(today);
    endOfToday.setHours(23, 59, 59, 999);

    const [
      totalAppointments,
      upcomingAppointments,
      totalPatients,
      todayAppointments,
      recentAppointments,
    ] = await Promise.all([
      Appointment.countDocuments({ doctor: doctorId }),
      Appointment.countDocuments({
        doctor: doctorId,
        date: { $gte: today },
        status: { $in: ["confirmed", "pending"] },
      }),
      Appointment.distinct("patient", { doctor: doctorId }).then((r) => r.length),
      Appointment.find({
        doctor: doctorId,
        date: { $gte: today, $lte: endOfToday },
      })
        .populate("patient", "name avatar")
        .sort({ date: 1 }),
      Appointment.find({ doctor: doctorId })
        .populate("patient", "name avatar")
        .sort({ createdAt: -1 })
        .limit(5),
    ]);

    res.json({
      stats: { totalAppointments, upcomingAppointments, totalPatients, todayAppointments: todayAppointments.length },
      todaySchedule: todayAppointments,
      recentPatients: recentAppointments,
    });
  } catch (err) {
    next(err);
  }
}

export async function getDoctorPatients(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const doctorId = req.user!.userId;
    const { search } = req.query;

    const patientIds = await Appointment.distinct("patient", { doctor: doctorId });

    const filter: Record<string, unknown> = {
      _id: { $in: patientIds },
      role: "user",
    };

    if (search) {
      filter.name = { $regex: search as string, $options: "i" };
    }

    const patients = await User.find(filter)
      .select("name email phone avatar")
      .sort({ name: 1 });

    // Enrich with last visit and condition
    const enriched = await Promise.all(
      patients.map(async (p) => {
        const lastVisit = await Appointment.findOne({
          patient: p._id,
          doctor: doctorId,
          status: "completed",
        }).sort({ date: -1 });
        return {
          ...p.toJSON(),
          lastVisit: lastVisit?.date || null,
        };
      })
    );

    res.json({ patients: enriched });
  } catch (err) {
    next(err);
  }
}

export async function getDoctorEarnings(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const doctorId = req.user!.userId;

    const earnings = await Appointment.aggregate([
      { $match: { doctor: doctorId as any, status: "completed" } },
      {
        $group: {
          _id: null,
          total: { $sum: "$fee" },
          count: { $sum: 1 },
        },
      },
    ]);

    const totalEarnings = earnings.length > 0 ? earnings[0].total : 0;
    const totalAppointments = earnings.length > 0 ? earnings[0].count : 0;
    const pendingPayout = await Appointment.aggregate([
      { $match: { doctor: doctorId as any, status: { $in: ["confirmed", "pending"] } } },
      { $group: { _id: null, total: { $sum: "$fee" } } },
    ]);

    const transactions = await Appointment.find({ doctor: doctorId })
      .populate("patient", "name")
      .sort({ createdAt: -1 })
      .limit(20);

    res.json({
      stats: {
        totalEarnings,
        totalAppointments,
        pendingPayout: pendingPayout.length > 0 ? pendingPayout[0].total : 0,
      },
      transactions,
    });
  } catch (err) {
    next(err);
  }
}

export async function updateDoctorSchedule(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const doctorId = req.user!.userId;
    const { slots } = req.body; // array of { date, startTime, endTime }

    // Remove existing future slots for this doctor
    await TimeSlot.deleteMany({
      doctor: doctorId,
      date: { $gte: new Date() },
      isBooked: false,
    });

    // Create new slots
    if (slots && slots.length > 0) {
      const newSlots = slots.map((s: { date: string; startTime: string; endTime: string }) => ({
        doctor: doctorId,
        date: new Date(s.date),
        startTime: s.startTime,
        endTime: s.endTime,
      }));
      await TimeSlot.insertMany(newSlots);
    }

    res.json({ message: "Schedule updated" });
  } catch (err) {
    next(err);
  }
}

export async function getDoctorAppointments(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const doctorId = req.user!.userId;
    const { status, page = "1", limit = "20" } = req.query;
    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.min(50, Math.max(1, Number(limit)));

    const filter: Record<string, unknown> = { doctor: doctorId };
    if (status && status !== "all") filter.status = status;

    const [appointments, total] = await Promise.all([
      Appointment.find(filter)
        .populate("patient", "name email phone avatar")
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum)
        .sort({ date: -1 }),
      Appointment.countDocuments(filter),
    ]);

    res.json({
      appointments,
      pagination: { page: pageNum, limit: limitNum, total, pages: Math.ceil(total / limitNum) },
    });
  } catch (err) {
    next(err);
  }
}
