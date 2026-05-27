import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true },
    timeSlot: { type: String, required: true },
    type: { type: String, enum: ["in-person", "video"], default: "in-person" },
    status: {
      type: String,
      enum: ["confirmed", "pending", "cancelled", "completed"],
      default: "pending",
    },
    fee: { type: Number, required: true },
    reason: { type: String, default: "" },
    cancellationReason: { type: String, default: "" },
    notes: { type: String, default: "" },
  },
  { timestamps: true }
);

appointmentSchema.index({ patient: 1, date: -1 });
appointmentSchema.index({ doctor: 1, date: -1 });
appointmentSchema.index({ status: 1 });

export const Appointment = mongoose.model("Appointment", appointmentSchema);
