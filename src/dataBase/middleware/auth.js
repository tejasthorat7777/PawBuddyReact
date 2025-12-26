import jwt from "jsonwebtoken";
import { UserInfo } from "../modal/userInfo.js";

/**
 * Middleware to verify JWT access token
 * Protects routes by validating the token in the Authorization header
 */
export const authenticateToken = async (req, res, next) => {
  try {
    // Get token from Authorization header (format: "Bearer <token>")
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token after "Bearer "

    // Check if token exists
    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: "Access denied. No token provided." 
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach user info to request object for use in route handlers
    req.user = {
      userId: decoded.userId,
      username: decoded.username,
      email: decoded.email
    };

    // Check if user still exists in database (in case user was deleted)
    const user = await UserInfo.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: "User no longer exists." 
      });
    }

    next(); // Proceed to the next middleware/route handler
  } catch (error) {
    // Handle specific JWT errors
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false,
        message: "Token expired. Please login again.",
        expired: true
      });
    }
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(403).json({ 
        success: false,
        message: "Invalid token. Access forbidden." 
      });
    }

    // Handle other errors
    console.error("Authentication error:", error);
    return res.status(500).json({ 
      success: false,
      message: "Internal server error during authentication." 
    });
  }
};

/**
 * Optional middleware to check if user is admin/business account
 * Use this after authenticateToken middleware
 */
export const requireBusinessAccount = async (req, res, next) => {
  try {
    const user = await UserInfo.findById(req.user.userId);
    
    if (!user || user.acc_type !== 'business') {
      return res.status(403).json({ 
        success: false,
        message: "Access denied. Business account required." 
      });
    }

    next();
  } catch (error) {
    console.error("Authorization error:", error);
    return res.status(500).json({ 
      success: false,
      message: "Internal server error during authorization." 
    });
  }
};

/**
 * Generate JWT access token
 * @param {Object} user - User object from database
 * @returns {String} JWT access token
 */
export const generateAccessToken = (user) => {
  const payload = {
    userId: user._id,
    username: user.username,
    email: user.email,
    acc_type: user.acc_type
  };

  return jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '1h' }
  );
};

/**
 * Generate JWT refresh token
 * @param {Object} user - User object from database
 * @returns {String} JWT refresh token
 */
export const generateRefreshToken = (user) => {
  const payload = {
    userId: user._id,
    username: user.username
  };

  return jwt.sign(
    payload,
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRE || '7d' }
  );
};

/**
 * Verify refresh token
 * @param {String} token - Refresh token to verify
 * @returns {Object} Decoded token payload
 */
export const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  } catch (error) {
    throw error;
  }
};
