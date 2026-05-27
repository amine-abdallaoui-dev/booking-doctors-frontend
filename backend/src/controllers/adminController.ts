import { Response, NextFunction } from "express";
import { User } from "../models/User";
import { Appointment } from "../models/Appointment";
import { Review } from "../models/Review";
import { Specialty } from "../models/Specialty";
import { BlogPost } from "../models/BlogPost";
import { AuthRequest } from "../types";
import { NotFoundError } from "../utils/errors";

// ---- Dashboard ----

export async function getAdminDashboard(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const [totalUsers, totalDoctors, totalAppointments, totalRevenue, recentAppointments] =
      await Promise.all([
        User.countDocuments({ role: "user" }),
        User.countDocuments({ role: "doctor" }),
        Appointment.countDocuments(),
        Appointment.aggregate([
          { $match: { status: "completed" } },
          { $group: { _id: null, total: { $sum: "$fee" } } },
        ]),
        Appointment.find()
          .populate("patient", "name")
          .populate("doctor", "name")
          .sort({ createdAt: -1 })
          .limit(10),
      ]);

    const avgRating = await User.aggregate([
      { $match: { role: "doctor" } },
      { $group: { _id: null, avg: { $avg: "$doctorProfile.rating" } } },
    ]);

    res.json({
      stats: {
        totalUsers,
        totalDoctors,
        totalAppointments,
        totalRevenue: totalRevenue.length > 0 ? totalRevenue[0].total : 0,
        avgRating: avgRating.length > 0 ? Math.round(avgRating[0].avg * 10) / 10 : 0,
      },
      recentAppointments,
    });
  } catch (err) {
    next(err);
  }
}

// ---- Users ----

export async function getUsers(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { role, search, page = "1", limit = "20" } = req.query;
    const filter: Record<string, unknown> = {};
    if (role && role !== "all") filter.role = role;
    if (search) filter.name = { $regex: search as string, $options: "i" };

    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.min(50, Math.max(1, Number(limit)));

    const [users, total] = await Promise.all([
      User.find(filter)
        .select("-password")
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum)
        .sort({ createdAt: -1 }),
      User.countDocuments(filter),
    ]);

    res.json({
      users,
      pagination: { page: pageNum, limit: limitNum, total, pages: Math.ceil(total / limitNum) },
    });
  } catch (err) {
    next(err);
  }
}

export async function updateUser(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { role, isActive } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role, "doctorProfile.isApproved": isActive },
      { new: true }
    ).select("-password");
    if (!user) throw new NotFoundError("User");
    res.json({ user });
  } catch (err) {
    next(err);
  }
}

export async function deleteUser(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) throw new NotFoundError("User");
    res.json({ message: "User deleted" });
  } catch (err) {
    next(err);
  }
}

// ---- Doctors (admin) ----

export async function getAdminDoctors(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { status, search, page = "1", limit = "20" } = req.query;
    const filter: Record<string, unknown> = { role: "doctor" };

    if (status === "pending") filter["doctorProfile.isApproved"] = false;
    if (search) filter.name = { $regex: search as string, $options: "i" };

    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.min(50, Math.max(1, Number(limit)));

    const [doctors, total] = await Promise.all([
      User.find(filter)
        .select("-password")
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum)
        .sort({ createdAt: -1 }),
      User.countDocuments(filter),
    ]);

    res.json({
      doctors,
      pagination: { page: pageNum, limit: limitNum, total, pages: Math.ceil(total / limitNum) },
    });
  } catch (err) {
    next(err);
  }
}

export async function approveDoctor(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { "doctorProfile.isApproved": true },
      { new: true }
    ).select("-password");
    if (!user) throw new NotFoundError("Doctor");
    res.json({ user });
  } catch (err) {
    next(err);
  }
}

// ---- Reviews (admin) ----

export async function getAdminReviews(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { status, page = "1", limit = "20" } = req.query;
    const filter: Record<string, unknown> = {};
    if (status && status !== "all") filter.status = status;

    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.min(50, Math.max(1, Number(limit)));

    const [reviews, total] = await Promise.all([
      Review.find(filter)
        .populate("patient", "name")
        .populate("doctor", "name")
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum)
        .sort({ createdAt: -1 }),
      Review.countDocuments(filter),
    ]);

    res.json({
      reviews,
      pagination: { page: pageNum, limit: limitNum, total, pages: Math.ceil(total / limitNum) },
    });
  } catch (err) {
    next(err);
  }
}

export async function updateReviewStatus(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { status } = req.body;
    const review = await Review.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!review) throw new NotFoundError("Review");
    res.json({ review });
  } catch (err) {
    next(err);
  }
}

// ---- Specialties ----

export async function getSpecialties(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const specialties = await Specialty.find().sort({ name: 1 });
    res.json({ specialties });
  } catch (err) {
    next(err);
  }
}

export async function createSpecialty(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const specialty = await Specialty.create(req.body);
    res.status(201).json({ specialty });
  } catch (err) {
    next(err);
  }
}

export async function updateSpecialty(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const specialty = await Specialty.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!specialty) throw new NotFoundError("Specialty");
    res.json({ specialty });
  } catch (err) {
    next(err);
  }
}

export async function deleteSpecialty(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const specialty = await Specialty.findByIdAndDelete(req.params.id);
    if (!specialty) throw new NotFoundError("Specialty");
    res.json({ message: "Specialty deleted" });
  } catch (err) {
    next(err);
  }
}

// ---- Blog ----

export async function getBlogPosts(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const posts = await BlogPost.find()
      .populate("author", "name")
      .sort({ createdAt: -1 });
    res.json({ posts });
  } catch (err) {
    next(err);
  }
}

export async function createBlogPost(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const post = await BlogPost.create({ ...req.body, author: req.user!.userId });
    res.status(201).json({ post });
  } catch (err) {
    next(err);
  }
}

export async function updateBlogPost(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const post = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!post) throw new NotFoundError("Blog post");
    res.json({ post });
  } catch (err) {
    next(err);
  }
}

export async function deleteBlogPost(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const post = await BlogPost.findByIdAndDelete(req.params.id);
    if (!post) throw new NotFoundError("Blog post");
    res.json({ message: "Blog post deleted" });
  } catch (err) {
    next(err);
  }
}

// ---- Settings ----

export async function getSettings(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { Setting } = await import("../models/Setting");
    let settings = await Setting.findOne();
    if (!settings) settings = await Setting.create({});
    res.json({ settings });
  } catch (err) {
    next(err);
  }
}

export async function updateSettings(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { Setting } = await import("../models/Setting");
    const settings = await Setting.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
    });
    res.json({ settings });
  } catch (err) {
    next(err);
  }
}

// ---- Payments (admin) ----

export async function getPayments(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { Payment } = await import("../models/Payment");
    const payments = await Payment.find()
      .populate("patient", "name")
      .populate("doctor", "name")
      .sort({ createdAt: -1 });
    res.json({ payments });
  } catch (err) {
    next(err);
  }
}
