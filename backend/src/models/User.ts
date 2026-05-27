import mongoose, { Document, Model } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: "user" | "doctor" | "admin";
  avatar: string;
  phone: string;
  healthProfile: {
    bloodType: string;
    height: string;
    weight: string;
    allergies: string[];
    conditions: string[];
  };
  insurance: {
    provider: string;
    policyNumber: string;
  };
  notifications: {
    emailReminders: boolean;
    smsReminders: boolean;
    promotional: boolean;
  };
  doctorProfile?: {
    slug: string;
    specialty: string;
    hospital: string;
    location: string;
    about: string;
    experience: number;
    price: number;
    videoPrice: number;
    rating: number;
    reviewCount: number;
    online: boolean;
    videoAvailable: boolean;
    languages: string[];
    services: string[];
    education: { institution: string; detail: string; year: string }[];
    experienceList: { hospital: string; role: string; period: string; location?: string }[];
    certifications: string[];
    hours: string;
    nextAvailable: string;
    isApproved: boolean;
    license: string;
  };
  comparePassword(candidate: string): Promise<boolean>;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6, select: false },
    role: { type: String, enum: ["user", "doctor", "admin"], default: "user" },
    avatar: { type: String, default: "" },
    phone: { type: String, default: "" },

    healthProfile: {
      bloodType: { type: String, enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", ""], default: "" },
      height: { type: String, default: "" },
      weight: { type: String, default: "" },
      allergies: [{ type: String }],
      conditions: [{ type: String }],
    },
    insurance: {
      provider: { type: String, default: "" },
      policyNumber: { type: String, default: "" },
    },
    notifications: {
      emailReminders: { type: Boolean, default: true },
      smsReminders: { type: Boolean, default: false },
      promotional: { type: Boolean, default: false },
    },

    doctorProfile: {
      slug: { type: String, unique: true, sparse: true },
      specialty: { type: String, default: "" },
      hospital: { type: String, default: "" },
      location: { type: String, default: "" },
      about: { type: String, default: "" },
      experience: { type: Number, default: 0 },
      price: { type: Number, default: 0 },
      videoPrice: { type: Number, default: 0 },
      rating: { type: Number, default: 0 },
      reviewCount: { type: Number, default: 0 },
      online: { type: Boolean, default: false },
      videoAvailable: { type: Boolean, default: true },
      languages: [{ type: String }],
      services: [{ type: String }],
      education: [{ institution: String, detail: String, year: String }],
      experienceList: [{ hospital: String, role: String, period: String, location: String }],
      certifications: [{ type: String }],
      hours: { type: String, default: "Mon - Fri, 9:00 AM - 5:00 PM" },
      nextAvailable: { type: String, default: "" },
      isApproved: { type: Boolean, default: false },
      license: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function (candidate: string) {
  return bcrypt.compare(candidate, this.password);
};

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const User = mongoose.model<IUser>("User", userSchema);
