import { userDetails } from "../../db/schema/schema.js";

import db from "../../db/db.js";

import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";

// Main authentication middleware
export const jwtVerify = async (req, res, next) => {
  try {
    // Check for token in cookies or Authorization header
    const token = req?.cookies?.accessToken || 
                 (req.headers.authorization && req.headers.authorization.replace("Bearer ", ""));

    if (!token) {
      return res.status(401).json({ error: "Unauthorized request" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    
    // Verify user exists in database
    const user = await db.select().from(userDetails).where(eq(userDetails.userId, decodedToken?.userId));

    if (!user || user.length === 0) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = user[0];
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

// Admin role verification
export const isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: "User not authenticated" });
  }

  if (req.user.roles === "admin") {
    req.isAdmin = true;
    next();
  } else {
    return res.status(403).json({ error: "User is not an admin" } );
  }
};

// Club head verification
export const isClubHead = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: "User not authenticated" });
  }

  if (req.user.roles === "club") {
    req.isClubHead = true;
    next();
  } else {
    return res.status(403).json({ error: "User is not a club head" });
  }
};

// Optional authentication middleware
export const optionalAuth = async (req, res, next) => {
  try {
    const token = req?.cookies?.accessToken || 
                 (req.headers.authorization && req.headers.authorization.replace("Bearer ", ""));

    if (token) {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const user = await db.select().from(userDetails).where(eq(userDetails.userId, decodedToken?.userId));
      
      if (user && user.length > 0) {
        req.user = user[0];
      }
    }
  } catch (error) {
    // Silently fail - user will be treated as unauthenticated
    console.error("Optional auth error:", error);
  }
  next();
};
