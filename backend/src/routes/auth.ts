import { Router } from "express";
import {
  register,
  login,
  getMe,
  updateProfile,
  changePassword,
  forgotPassword,
  resetPassword,
} from "../controllers/authController";
import { authenticate } from "../middleware/auth";
import { validate } from "../middleware/validate";
import {
  registerSchema,
  loginSchema,
  updateProfileSchema,
  changePasswordSchema,
  forgotPasswordSchema,
} from "../validators";

const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/forgot-password", validate(forgotPasswordSchema), forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/me", authenticate, getMe);
router.patch("/profile", authenticate, validate(updateProfileSchema), updateProfile);
router.patch("/change-password", authenticate, validate(changePasswordSchema), changePassword);

export default router;
