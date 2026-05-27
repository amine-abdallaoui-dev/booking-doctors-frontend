import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    appointment: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment" },
    rating: { type: Number, required: true, min: 1, max: 5 },
    text: { type: String, default: "" },
    status: {
      type: String,
      enum: ["published", "flagged", "removed"],
      default: "published",
    },
  },
  { timestamps: true }
);

reviewSchema.index({ doctor: 1, status: 1 });
reviewSchema.index({ patient: 1 });

export const Review = mongoose.model("Review", reviewSchema);
