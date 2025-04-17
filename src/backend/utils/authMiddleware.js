import jwt from "jsonwebtoken";
const cookie = require('cookie');

export function authenticate(req, res) {
  const cookies = cookie.parse(req.headers.cookie || "");

  const authToken = cookies.auth_token;

  if (!authToken) {
    res.status(401).json({ message: "Not authenticated" });
    return null;
  }

  try {
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
    return decoded; // contains userId, email
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
    return null;
  }
}
