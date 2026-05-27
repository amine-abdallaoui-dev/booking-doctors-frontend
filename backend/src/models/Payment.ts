import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    appointment: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment", required: true },
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    platformFee: { type: Number, default: 0 },
    doctorPayout: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["paid", "pending", "refunded"],
      default: "pending",
    },
    stripePaymentIntentId: { type: String, default: "" },
  },
  { timestamps: true }
);

paymentSchema.index({ appointment: 1 });
paymentSchema.index({ patient: 1 });
paymentSchema.index({ doctor: 1 });

export const Payment = mongoose.model("Payment", paymentSchema);
