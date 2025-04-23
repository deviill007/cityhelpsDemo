import dbConnect from "../../../backend/utils/dbConnect";
import User from "../../../backend/models/User";
import withAuth from "../../../backend/utils/withAuth";
import { NextApiResponse } from "next";
import { AuthenticatedRequest } from "../../../backend/utils/withAuth";

const handler = async (req: AuthenticatedRequest, res: NextApiResponse) => {
  if (req.method !== "DELETE") return res.status(405).end();

  const { _id: userId, email: userEmail } = req.user;
  const { confirmEmail } = req.body;

  await dbConnect();

  if (userEmail !== confirmEmail) {
    return res.status(400).json({ message: "Email does not match." });
  }

  await User.findByIdAndDelete(userId);

  // Optionally clear cookie
  res.setHeader("Set-Cookie", "auth_token=; Max-Age=0; Path=/;");

  return res.status(200).json({ message: "Account deleted successfully." });
};

export default withAuth(handler);
