const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
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
module.exports = mongoose.models.User || mongoose.model("User", userSchema);
