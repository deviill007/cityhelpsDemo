import dbConnect from "../../../backend/utils/dbConnect";
import User from "../../../backend/models/User";
import withAuth from "../../../backend/utils/withAuth";
import { NextApiResponse } from "next";
import { AuthenticatedRequest } from "../../../backend/utils/withAuth";

const handler = async (req: AuthenticatedRequest, res: NextApiResponse) => {
  if (req.method !== "POST") return res.status(405).end();

  const { _id: userId } = req.user;
  const { name, phone } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ message: "Name and phone are required." });
  }

  await dbConnect();
  await User.findByIdAndUpdate(userId, { name, phone });

  return res.status(200).json({ message: "Profile updated successfully." });
};

export default withAuth(handler);
