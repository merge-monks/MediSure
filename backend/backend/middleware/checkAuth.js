import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "medisure-secret-key";

const checkAuth = async (req, res, next) => {
  try {
    // First try session-based auth
    const sessionId = req.session.userId;
    
    // Then try token-based auth from Authorization header
    const authHeader = req.headers.authorization;
    let token = null;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    }
    
    // No authentication
    if (!sessionId && !token) {
      return res.status(401).json({ 
        authenticated: false, 
        error: "Please log in to continue" 
      });
    }
    
    // If we have a token, verify it
    let userId = sessionId;
    
    if (token) {
      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        userId = decoded.id;
      } catch (tokenError) {
        return res.status(401).json({ 
          authenticated: false, 
          error: "Invalid or expired token" 
        });
      }
    }
    
    // Find the user
    const user = await User.findById(userId).select("-password");
    
    if (!user) {
      return res.status(404).json({ 
        authenticated: false, 
        error: "User not found" 
      });
    }
    
    // Set the user on the request object
    req.user = user;
    
    // If this is just a middleware in a chain, continue
    if (next) {
      return next();
    }
    
    // If this is the final handler (e.g., for /api/auth/checkAuth endpoint)
    return res.status(200).json({
      authenticated: true,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        title: user.title,
        specialty: user.specialty
      }
    });
  } catch (err) {
    console.error("Auth check error:", err);
    return res.status(500).json({ 
      authenticated: false,
      error: "Internal server error" 
    });
  }
};

export default checkAuth;
