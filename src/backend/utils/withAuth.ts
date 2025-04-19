// src/backend/utils/withAuth.ts
import { authenticate } from "./authMiddleware";
import { NextApiRequest, NextApiResponse } from "next";

type Handler = (req: NextApiRequest & { user: any }, res: NextApiResponse) => any;

export default function withAuth(handler: Handler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const user = await authenticate(req, res);
    if (!user) return;

    (req as any).user = user;
    return handler(req as any, res);
  };
}
