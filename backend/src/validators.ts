import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["user", "doctor", "admin"]).optional().default("user"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

export const createAppointmentSchema = z.object({
  doctor: z.string().min(1, "Doctor ID is required"),
  date: z.string().min(1, "Date is required"),
  timeSlot: z.string().min(1, "Time slot is required"),
  type: z.enum(["in-person", "video"]).optional().default("in-person"),
  reason: z.string().optional(),
});

export const createReviewSchema = z.object({
  doctor: z.string().min(1, "Doctor ID is required"),
  rating: z.number().min(1).max(5),
  text: z.string().optional(),
  appointment: z.string().optional(),
});

export const updateProfileSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  phone: z.string().optional(),
  avatar: z.string().optional(),
  healthProfile: z
    .object({
      bloodType: z.string().optional(),
      height: z.string().optional(),
      weight: z.string().optional(),
      allergies: z.array(z.string()).optional(),
      conditions: z.array(z.string()).optional(),
    })
    .optional(),
  insurance: z
    .object({
      provider: z.string().optional(),
      policyNumber: z.string().optional(),
    })
    .optional(),
  notifications: z
    .object({
      emailReminders: z.boolean().optional(),
      smsReminders: z.boolean().optional(),
      promotional: z.boolean().optional(),
    })
    .optional(),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(6, "New password must be at least 6 characters"),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email"),
});
