import { Schema, models, model } from "mongoose";

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: false }, // Ensure name is required, especially for Google users
    phone: String, // You can keep this optional if you want
    password: { type: String, required: false }, // For Google login, password is not used
    authProvider: {
      type: String,
      enum: ["credentials", "google"],
      default: "credentials",
    },

    // OTP-related fields
    otp: String,
    otpExpiresAt: Date,
    isValidated: { type: Boolean, default: false },

    //password reset fields
    resetToken: String,
    resetTokenExpires: Date,
  },
  { timestamps: true }
);

// Ensure that the model is either already created or create a new one
export default models.User || model("User", userSchema);
