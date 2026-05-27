import { Router } from "express";
import {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointmentStatus,
  rescheduleAppointment,
  cancelAppointment,
  getPatientDashboard,
} from "../controllers/appointmentController";
import { createReview } from "../controllers/reviewController";
import { authenticate, authorize } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { createAppointmentSchema, createReviewSchema } from "../validators";

const router = Router();

// Patient dashboard
router.get("/dashboard", authenticate, authorize("user"), getPatientDashboard);

// Appointments
router.post("/", authenticate, validate(createAppointmentSchema), createAppointment);
router.get("/", authenticate, getAppointments);
router.get("/:id", authenticate, getAppointmentById);
router.patch("/:id/status", authenticate, updateAppointmentStatus);
router.patch("/:id/reschedule", authenticate, rescheduleAppointment);
router.patch("/:id/cancel", authenticate, cancelAppointment);

// Reviews on appointments
router.post("/:id/review", authenticate, authorize("user"), validate(createReviewSchema), createReview);

export default router;
