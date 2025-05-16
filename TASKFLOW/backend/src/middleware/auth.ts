import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_here";

export async function authMiddleware(req: any, res: any, next: any) {
  //GRAB THE BEARER TOKEN FROM AUTHORIZATION HEADER
  const authHeader = req.header.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  const token = authHeader.split(" ")[1];

  //VERIFY & ATTACH USER OBJECT

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const userId =
      typeof payload === "object" && payload !== null && "id" in payload
        ? (payload as any).id
        : null;
    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid token payload" });
    }
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.log("JWT verification failed", err);
    return res
      .status(401)
      .json({ success: false, message: "Invalid token or expired" });
  }
}
