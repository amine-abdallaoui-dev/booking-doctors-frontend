import { Request } from "express";

export type UserRole = "user" | "doctor" | "admin";
export type AppointmentStatus = "confirmed" | "pending" | "cancelled" | "completed";
export type ConsultationType = "in-person" | "video";
export type RecordType = "prescription" | "lab_result" | "report" | "imaging";
export type ReviewStatus = "published" | "flagged" | "removed";

export interface AuthPayload {
  userId: string;
  role: UserRole;
}

export interface AuthRequest extends Request {
  user?: AuthPayload;
}
