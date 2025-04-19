import dbConnect from "../../../backend/utils/dbConnect";
import User from "../../../backend/models/User";
import withAuth from "../../../backend/utils/withAuth";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "DELETE") return res.status(405).end();

  const { userId } = (req as any).user;
  const { confirmEmail } = req.body;

  await dbConnect();

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: "User not found." });

  if (user.email !== confirmEmail) {
    return res.status(400).json({ message: "Email does not match." });
  }

  await User.findByIdAndDelete(userId);

  // Optionally clear cookie
  res.setHeader("Set-Cookie", "auth_token=; Max-Age=0; Path=/;");

  return res.status(200).json({ message: "Account deleted successfully." });
};

export default withAuth(handler);
