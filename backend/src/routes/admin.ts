import { Router } from "express";
import {
  getAdminDashboard,
  getUsers,
  updateUser,
  deleteUser,
  getAdminDoctors,
  approveDoctor,
  getAdminReviews,
  updateReviewStatus,
  getSpecialties,
  createSpecialty,
  updateSpecialty,
  deleteSpecialty,
  getBlogPosts,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  getSettings,
  updateSettings,
  getPayments,
} from "../controllers/adminController";
import { getAppointments } from "../controllers/appointmentController";
import { authenticate, authorize } from "../middleware/auth";

const router = Router();

router.use(authenticate, authorize("admin"));

router.get("/dashboard", getAdminDashboard);

router.get("/users", getUsers);
router.patch("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

router.get("/doctors", getAdminDoctors);
router.patch("/doctors/:id/approve", approveDoctor);

router.get("/appointments", getAppointments);

router.get("/reviews", getAdminReviews);
router.patch("/reviews/:id/status", updateReviewStatus);

router.get("/specialties", getSpecialties);
router.post("/specialties", createSpecialty);
router.patch("/specialties/:id", updateSpecialty);
router.delete("/specialties/:id", deleteSpecialty);

router.get("/blog", getBlogPosts);
router.post("/blog", createBlogPost);
router.patch("/blog/:id", updateBlogPost);
router.delete("/blog/:id", deleteBlogPost);

router.get("/settings", getSettings);
router.patch("/settings", updateSettings);

router.get("/payments", getPayments);

export default router;
