import { serialize } from "cookie";
import { NextApiResponse } from "next";

export function setTokenCookie(res: NextApiResponse, token: string) {
  const isProduction = process.env.NODE_ENV === "production";

  const cookieStr = serialize("auth_token", token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/", // important
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  res.setHeader("Set-Cookie", cookieStr);
}
