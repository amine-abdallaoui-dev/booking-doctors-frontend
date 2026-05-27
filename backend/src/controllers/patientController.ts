import { Response, NextFunction } from "express";
import { MedicalRecord } from "../models/MedicalRecord";
import { Favorite } from "../models/Favorite";
import { AuthRequest } from "../types";
import { NotFoundError } from "../utils/errors";

// ---- Medical Records ----

export async function getMedicalRecords(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { type } = req.query;
    const filter: Record<string, unknown> = { patient: req.user!.userId };
    if (type) filter.type = type;

    const records = await MedicalRecord.find(filter)
      .populate("doctor", "name")
      .sort({ date: -1 });

    res.json({ records });
  } catch (err) {
    next(err);
  }
}

export async function createMedicalRecord(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const record = await MedicalRecord.create({
      ...req.body,
      patient: req.user!.userId,
    });
    res.status(201).json({ record });
  } catch (err) {
    next(err);
  }
}

// ---- Favorites ----

export async function getFavorites(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const favorites = await Favorite.find({ patient: req.user!.userId })
      .populate("doctor", "name avatar doctorProfile");

    res.json({
      favorites: favorites.map((f) => ({
        ...(f.doctor as any).toJSON(),
        favoriteId: f._id,
      })),
    });
  } catch (err) {
    next(err);
  }
}

export async function toggleFavorite(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const patientId = req.user!.userId;
    const doctorId = req.params.doctorId;

    const existing = await Favorite.findOne({ patient: patientId, doctor: doctorId });
    if (existing) {
      await existing.deleteOne();
      res.json({ favorited: false });
    } else {
      await Favorite.create({ patient: patientId, doctor: doctorId });
      res.json({ favorited: true });
    }
  } catch (err) {
    next(err);
  }
}

export async function checkFavorite(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const existing = await Favorite.findOne({
      patient: req.user!.userId,
      doctor: req.params.doctorId,
    });
    res.json({ favorited: !!existing });
  } catch (err) {
    next(err);
  }
}
