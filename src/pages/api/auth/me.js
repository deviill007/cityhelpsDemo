// src/pages/api/auth/me.js
import dbConnect from "../../../backend/utils/dbConnect";
import User from "../../../backend/models/User";
import withAuth from "../../../backend/utils/withAuth";

const handler = async (req, res) => {
  await dbConnect();

  const { userId } = req.user;
  const user = await User.findById(userId).select("name email phone");

  if (!user) return res.status(404).json({ message: "User not found" });

  return res.status(200).json({ user });
};

export default withAuth(handler);
