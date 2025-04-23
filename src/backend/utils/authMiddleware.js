import jwt from "jsonwebtoken";
import { parse } from "cookie";

export function authenticate(req, res) {
  const cookies = parse(req.headers.cookie || "");
  const authToken = cookies.auth_token;

  if (!authToken) {
    res.status(401).json({ message: "Not authenticated" });
    return null;
  }

  try {
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
    return decoded; // decoded.userId will be available
  } catch (err) {
    console.error("JWT error:", err);
    res.status(401).json({ message: "Invalid token" });
    return null;
  }
}
