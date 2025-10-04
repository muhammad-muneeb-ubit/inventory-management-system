import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const authMiddleware = async (req, res, next) => {
  try {
    // 1. Read token from request headers
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided", status: false });
    }

    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWTPRIVATE_KEY);

    // 3. Find user in DB
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User not found", status: false });
    }

    // 4. Attach user to req
    req.user = user;
    next(); // move to next middleware or controller
  } catch (error) {
    return res.status(401).json({ message: "Invalid token", status: false });
  }
};

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied", status: false });
    }
    next();
  };
};

export const checkApprovedStatus = (req, res, next) => {
  if (req.user.status !== "approved") {
    return res.status(403).json({
      message: "Your account is not approved by admin yet",
      status: false
    });
  }
  next();
};
