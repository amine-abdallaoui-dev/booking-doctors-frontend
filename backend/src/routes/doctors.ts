import { Router } from "express";
import {
  getDoctors,
  getDoctorBySlug,
  getDoctorById,
  getDoctorSlots,
  getDoctorReviews,
  getSimilarDoctors,
  getDoctorDashboard,
  getDoctorPatients,
  getDoctorEarnings,
  getDoctorAppointments,
  updateDoctorSchedule,
} from "../controllers/doctorController";
import { authenticate, authorize } from "../middleware/auth";

const router = Router();

// Public
router.get("/", getDoctors);
router.get("/slug/:slug", getDoctorBySlug);
router.get("/:id", getDoctorById);
router.get("/:id/slots", getDoctorSlots);
router.get("/:id/reviews", getDoctorReviews);
router.get("/:id/similar", getSimilarDoctors);

// Doctor dashboard (protected)
router.get("/dashboard/me", authenticate, authorize("doctor"), getDoctorDashboard);
router.get("/dashboard/patients", authenticate, authorize("doctor"), getDoctorPatients);
router.get("/dashboard/earnings", authenticate, authorize("doctor"), getDoctorEarnings);
router.get("/dashboard/appointments", authenticate, authorize("doctor"), getDoctorAppointments);
router.put("/dashboard/schedule", authenticate, authorize("doctor"), updateDoctorSchedule);

export default router;
