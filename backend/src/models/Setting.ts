import mongoose from "mongoose";

const settingSchema = new mongoose.Schema(
  {
    siteName: { type: String, default: "MediBook" },
    tagline: { type: String, default: "Your Health, Our Priority" },
    contactEmail: { type: String, default: "" },
    contactPhone: { type: String, default: "" },
    currency: { type: String, default: "USD" },
    timezone: { type: String, default: "UTC" },
    primaryColor: { type: String, default: "#0F766E" },
    logo: { type: String, default: "" },
    integrations: {
      stripe: { type: String, default: "" },
      sendgrid: { type: String, default: "" },
      twilio: { type: String, default: "" },
      zoom: { type: String, default: "" },
    },
    notifications: {
      emailReminders: { type: Boolean, default: true },
      smsReminders: { type: Boolean, default: false },
    },
    security: {
      minPasswordLength: { type: Number, default: 6 },
      twoFactorAuth: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

export const Setting = mongoose.model("Setting", settingSchema);
