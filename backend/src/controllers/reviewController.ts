import { Response, NextFunction } from "express";
import { Review } from "../models/Review";
import { User } from "../models/User";
import { Notification } from "../models/Notification";
import { AuthRequest } from "../types";
import { NotFoundError, AppError } from "../utils/errors";

export async function createReview(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const patientId = req.user!.userId;
    const { doctor, rating, text, appointment } = req.body;

    // Check if already reviewed
    const existing = await Review.findOne({ patient: patientId, doctor, appointment });
    if (existing) throw new AppError("You have already reviewed this appointment", 409);

    const review = await Review.create({
      patient: patientId,
      doctor,
      rating,
      text,
      appointment,
      status: "published",
    });

    // Update doctor rating
    const stats = await Review.aggregate([
      { $match: { doctor: doctor as any, status: "published" } },
      { $group: { _id: null, avg: { $avg: "$rating" }, count: { $sum: 1 } } },
    ]);

    if (stats.length > 0) {
      await User.findByIdAndUpdate(doctor, {
        "doctorProfile.rating": Math.round(stats[0].avg * 10) / 10,
        "doctorProfile.reviewCount": stats[0].count,
      });
    }

    await Notification.create({
      user: doctor,
      type: "review",
      title: "New Review",
      message: `You received a ${rating}-star review`,
      link: "/doctor/reviews",
    });

    const populated = await Review.findById(review._id)
      .populate("patient", "name avatar");

    res.status(201).json({ review: populated });
  } catch (err) {
    next(err);
  }
}

export async function getPatientReviews(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const reviews = await Review.find({ patient: req.user!.userId })
      .populate("doctor", "name avatar doctorProfile")
      .sort({ createdAt: -1 });
    res.json({ reviews });
  } catch (err) {
    next(err);
  }
}

export async function replyToReview(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) throw new NotFoundError("Review");
    // Simplified - in production, add a reply field to Review model
    res.json({ review });
  } catch (err) {
    next(err);
  }
}
