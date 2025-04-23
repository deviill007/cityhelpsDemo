// src/backend/utils/withAuth.ts
import { authenticate } from "./authMiddleware";
import { NextApiRequest, NextApiResponse } from "next";

// Match the fields from your Mongoose User model
export interface AuthenticatedUser {
  _id: string;
  email: string;
  name?: string;
  phone?: string;
  authProvider: "credentials" | "google";
  isValidated: boolean;
  // Add optional fields only if used after authentication
  otp?: string;
  otpExpiresAt?: Date;
  resetToken?: string;
  resetTokenExpires?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AuthenticatedRequest extends NextApiRequest {
  user: AuthenticatedUser;
}

type Handler = (req: AuthenticatedRequest, res: NextApiResponse) => unknown;

export default function withAuth(handler: Handler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const user = await authenticate(req, res);
    if (!user) return;

    (req as AuthenticatedRequest).user = user;
    return handler(req as AuthenticatedRequest, res);
  };
}
