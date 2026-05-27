import { Response, NextFunction } from "express";
import { Appointment } from "../models/Appointment";
import { Notification } from "../models/Notification";
import { AuthRequest } from "../types";
import { AppError, NotFoundError, ForbiddenError } from "../utils/errors";

export async function createAppointment(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const patientId = req.user!.userId;
    const { doctor, date, timeSlot, type, reason } = req.body;

    // Check for conflicting appointments
    const conflicting = await Appointment.findOne({
      doctor,
      date: new Date(date),
      timeSlot,
      status: { $in: ["confirmed", "pending"] },
    });
    if (conflicting) throw new AppError("This time slot is already booked", 409);

    // Get doctor's fee
    const doctorUser = await (await import("../models/User")).User.findById(doctor);
    if (!doctorUser) throw new NotFoundError("Doctor");

    const fee =
      type === "video"
        ? doctorUser.doctorProfile?.videoPrice || doctorUser.doctorProfile?.price || 0
        : doctorUser.doctorProfile?.price || 0;

    const appointment = await Appointment.create({
      patient: patientId,
      doctor,
      date: new Date(date),
      timeSlot,
      type: type || "in-person",
      fee,
      reason: reason || "",
      status: "confirmed",
    });

    // Notify doctor
    await Notification.create({
      user: doctor,
      type: "appointment",
      title: "New Appointment",
      message: `A new appointment has been booked for ${new Date(date).toLocaleDateString()} at ${timeSlot}`,
      link: "/doctor/appointments",
    });

    const populated = await Appointment.findById(appointment._id)
      .populate("doctor", "name avatar doctorProfile")
      .populate("patient", "name email phone");

    res.status(201).json({ appointment: populated });
  } catch (err) {
    next(err);
  }
}

export async function getAppointments(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.user!.userId;
    const role = req.user!.role;
    const { status, page = "1", limit = "10" } = req.query;

    const filter: Record<string, unknown> = {};
    if (role === "user") filter.patient = userId;
    else if (role === "doctor") filter.doctor = userId;
    else if (role === "admin") {
      // Admin sees all
    }

    if (status && status !== "all") filter.status = status;

    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.min(50, Math.max(1, Number(limit)));

    const [appointments, total] = await Promise.all([
      Appointment.find(filter)
        .populate("patient", "name email phone avatar")
        .populate("doctor", "name avatar doctorProfile")
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum)
        .sort({ date: -1 }),
      Appointment.countDocuments(filter),
    ]);

    res.json({
      appointments,
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

export async function getAppointmentById(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate("patient", "name email phone avatar")
      .populate("doctor", "name avatar doctorProfile");

    if (!appointment) throw new NotFoundError("Appointment");
    res.json({ appointment });
  } catch (err) {
    next(err);
  }
}

export async function updateAppointmentStatus(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { status } = req.body;
    const validStatuses = ["confirmed", "pending", "cancelled", "completed"];
    if (!validStatuses.includes(status)) {
      throw new AppError("Invalid status", 400);
    }

    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) throw new NotFoundError("Appointment");

    // Only the assigned doctor can complete/start
    if (status === "completed" && req.user!.role === "user") {
      throw new ForbiddenError("Only doctors can complete appointments");
    }

    appointment.status = status;
    if (req.body.cancellationReason) {
      appointment.cancellationReason = req.body.cancellationReason;
    }
    await appointment.save();

    res.json({ appointment });
  } catch (err) {
    next(err);
  }
}

export async function rescheduleAppointment(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { date, timeSlot } = req.body;
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) throw new NotFoundError("Appointment");

    if (appointment.status === "cancelled" || appointment.status === "completed") {
      throw new AppError("Cannot reschedule a cancelled or completed appointment", 400);
    }

    appointment.date = new Date(date);
    appointment.timeSlot = timeSlot;
    appointment.status = "confirmed";
    await appointment.save();

    res.json({ appointment });
  } catch (err) {
    next(err);
  }
}

export async function cancelAppointment(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { reason } = req.body;
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) throw new NotFoundError("Appointment");

    if (appointment.status === "completed") {
      throw new AppError("Cannot cancel a completed appointment", 400);
    }

    appointment.status = "cancelled";
    appointment.cancellationReason = reason || "";
    await appointment.save();

    res.json({ appointment });
  } catch (err) {
    next(err);
  }
}

// Patient dashboard endpoints
export async function getPatientDashboard(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const patientId = req.user!.userId;

    const now = new Date();

    const [upcoming, completed, favorites, records] = await Promise.all([
      Appointment.countDocuments({
        patient: patientId,
        date: { $gte: now },
        status: { $in: ["confirmed", "pending"] },
      }),
      Appointment.countDocuments({ patient: patientId, status: "completed" }),
      (await import("../models/Favorite")).Favorite.countDocuments({ patient: patientId }),
      (await import("../models/MedicalRecord")).MedicalRecord.countDocuments({ patient: patientId }),
    ]);

    const upcomingAppointments = await Appointment.find({
      patient: patientId,
      date: { $gte: now },
      status: { $in: ["confirmed", "pending"] },
    })
      .populate("doctor", "name avatar doctorProfile")
      .sort({ date: 1 })
      .limit(5);

    const recentRecords = await (await import("../models/MedicalRecord")).MedicalRecord
      .find({ patient: patientId })
      .sort({ date: -1 })
      .limit(3);

    res.json({
      stats: { upcoming, completed, favorites, records },
      upcomingAppointments,
      recentRecords,
    });
  } catch (err) {
    next(err);
  }
}
