import dbConnect from "../../../backend/utils/dbConnect";
import User from "../../../backend/models/User";
import withAuth from "../../../backend/utils/withAuth";
import bcrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") return res.status(405).end();

  const { userId } = (req as any).user;
  const { newPassword, confirmPassword } = req.body;

  if (!newPassword || !confirmPassword) {
    return res.status(400).json({ message: "All fields are required." });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match." });
  }

  await dbConnect();

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await User.findByIdAndUpdate(userId, { password: hashedPassword });

  return res.status(200).json({ message: "Password updated successfully." });
};

export default withAuth(handler);
