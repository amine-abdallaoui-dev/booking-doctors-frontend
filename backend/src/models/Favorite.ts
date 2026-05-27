import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema(
  {
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

favoriteSchema.index({ patient: 1, doctor: 1 }, { unique: true });

export const Favorite = mongoose.model("Favorite", favoriteSchema);
