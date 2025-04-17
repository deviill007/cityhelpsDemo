import { OAuth2Client } from "google-auth-library";
import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../backend/models/User";
import jwt from "jsonwebtoken";
import { setTokenCookie } from "../../../backend/utils/setTokenCookie"; 

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  try {
    const { credential } = req.body;
    if (!credential) return res.status(400).json({ message: "Missing Google token" });

    // Verify token
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload?.email) {
      return res.status(400).json({ message: "Invalid Google token" });
    }

    // Check existing user
    const existingUser = await User.findOne({ email: payload.email });

    // CASE 1: Conflict - Existing password user
    if (existingUser && existingUser.authProvider === "credentials") {
      return res.status(409).json({
        message: "This email is registered with a password. Please log in manually.",
      });
    }

    // CASE 2: Create/update user
    const user = await User.findOneAndUpdate(
      { email: payload.email },
      {
        name: payload.name || existingUser?.name || "Google User",
        email: payload.email,
        authProvider: "google",
        isValidated: true,
        ...(!existingUser && { phone: null, password: null }),
      },
      { upsert: true, new: true }
    );

    // Generate JWT token
    const authToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    // ✅ Set HTTP-only cookie
    setTokenCookie(res, authToken);

    res.status(200).json({
      user: {
        email: user.email,
        name: user.name,
        authProvider: user.authProvider,
      }
    });
  } catch (error) {
    console.error("Google auth error:", error);
    res.status(500).json({
      message: error instanceof Error ? error.message : "Google authentication failed",
    });
  }
}
