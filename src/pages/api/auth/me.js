// src/pages/api/auth/me.js
import { authenticate } from "../../../backend/utils/authMiddleware";
import dbConnect from "../../../backend/utils/dbConnect";
import User from "../../../backend/models/User";

export default async function handler(req, res) {
  await dbConnect();

  const decoded = authenticate(req, res);
  if (!decoded) return;

  const user = await User.findById(decoded.userId).select("name email phone");
  if (!user) return res.status(404).json({ message: "User not found" });

  res.status(200).json({ user });
}
