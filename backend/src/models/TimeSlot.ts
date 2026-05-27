import mongoose from "mongoose";

const timeSlotSchema = new mongoose.Schema(
  {
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    isBooked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

timeSlotSchema.index({ doctor: 1, date: 1 });

export const TimeSlot = mongoose.model("TimeSlot", timeSlotSchema);
