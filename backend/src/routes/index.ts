import { Router } from "express";
import authRoutes from "./auth";
import doctorRoutes from "./doctors";
import appointmentRoutes from "./appointments";
import patientRoutes from "./patients";
import adminRoutes from "./admin";

const router = Router();

router.use("/auth", authRoutes);
router.use("/doctors", doctorRoutes);
router.use("/appointments", appointmentRoutes);
router.use("/patients", patientRoutes);
router.use("/admin", adminRoutes);

export default router;
