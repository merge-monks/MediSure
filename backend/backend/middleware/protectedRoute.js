import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "medisure-secret-key";

const protectRoute = async (req, res, next) => {
  try {
    // Check for session
    const sessionId = req.session.userId;
    
    // Check for Authorization header
    const authHeader = req.headers.authorization;
    let token = null;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    }
    
    // No authentication
    if (!sessionId && !token) {
      return res.status(401).json({ error: "Authentication required" });
    }
    
    // If we have a token, verify it
    let userId = sessionId;
    
    if (token) {
      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        userId = decoded.id;
      } catch (tokenError) {
        return res.status(401).json({ error: "Invalid or expired token" });
      }
    }
    
    // Find the user
    const user = await User.findById(userId).select("-password");
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    // Set the user on the request object
    req.user = user;
    next();
    
  } catch (err) {
    console.error("Protected route error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default protectRoute;
