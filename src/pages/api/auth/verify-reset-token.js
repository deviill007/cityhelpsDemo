import dbConnect from '../../../backend/utils/dbConnect';
import User from '../../../backend/models/User';

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end("Method Not Allowed");

  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ message: "Token is required" });
  }

  await dbConnect();

  const user = await User.findOne({
    resetToken: token,
    resetTokenExpires: { $gt: Date.now() }, // check not expired
  });

  if (!user) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }

  return res.status(200).json({ message: "Token is valid" });
}
