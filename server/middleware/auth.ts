import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../db";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export interface AuthRequest extends Request {
  userId?: string;
  userEmail?: string;
  userRole?: string;
}

export const authenticateToken: RequestHandler = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        error: "No token provided",
      });
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, JWT_SECRET) as any;

    // Verify user still exists
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "User not found",
      });
    }

    // Attach user info to request
    (req as any).userId = decoded.id;
    (req as any).userEmail = decoded.email;
    (req as any).userRole = decoded.role;

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        success: false,
        error: "Invalid token",
      });
    }
    return res.status(500).json({
      success: false,
      error: "Authentication failed",
    });
  }
};

export const requireAdmin: RequestHandler = (req, res, next) => {
  const userRole = (req as any).userRole;

  if (userRole !== "ADMIN") {
    return res.status(403).json({
      success: false,
      error: "Admin access required",
    });
  }

  next();
};

export const requireSeller: RequestHandler = (req, res, next) => {
  const userRole = (req as any).userRole;

  if (userRole !== "SELLER" && userRole !== "ADMIN") {
    return res.status(403).json({
      success: false,
      error: "Seller or Admin access required",
    });
  }

  next();
};
