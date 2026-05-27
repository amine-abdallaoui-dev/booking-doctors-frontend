import mongoose from "mongoose";

const medicalRecordSchema = new mongoose.Schema(
  {
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    type: {
      type: String,
      enum: ["prescription", "lab_result", "report", "imaging"],
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, default: "" },
    fileUrl: { type: String, default: "" },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

medicalRecordSchema.index({ patient: 1, date: -1 });

export const MedicalRecord = mongoose.model("MedicalRecord", medicalRecordSchema);
