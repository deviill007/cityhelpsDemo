import dbConnect from '../../../backend/utils/dbConnect';
import User from '../../../backend/models/User';
import crypto from "crypto";
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  await dbConnect();

  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(200)
      .json({ message: "If that email exists, a reset link has been sent." }); // generic message
  }

  const token = crypto.randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  user.resetToken = token;
  user.resetTokenExpires = expires;
  await user.save();

  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset/${token}`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: '"CityHelps" <no-reply@cityhelps.com>',
    to: email,
          subject: "Password Reset Request",
          html: `
              <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
                  <div style="max-width: 600px; background: white; padding: 20px; margin: auto; border-radius: 8px;">
                      <h2 style="color: #333;">Password Reset Request</h2>
                      <p style="color: #555;">You recently requested to reset your password for your CityHelps account.</p>
                      <p style="color: #555;">Click the button below to reset your password. This link will expire in 15 minutes.</p>
                      <a href="${resetUrl}" 
                         style="display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background: #007bff; 
                                text-decoration: none; border-radius: 5px; margin-top: 10px;">
                         Reset Password
                      </a>
                      <p style="color: #555; margin-top: 20px;">If you didn't request this, please ignore this email.</p>
                      <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
                      <p style="font-size: 12px; color: #888; text-align: center;">
                          © ${new Date().getFullYear()} CityHelps. All rights reserved.
                      </p>
                  </div>
              </div>
          `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res
      .status(200)
      .json({ message: "If that email exists, a reset link has been sent." });
  } catch (err) {
    console.error("Failed to send reset email:", err);
    return res.status(500).json({ message: "Failed to send reset email." });
  }
}
