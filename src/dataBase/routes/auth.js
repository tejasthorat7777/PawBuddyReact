import express from "express";
import { UserInfo } from "../modal/userInfo.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  authenticateToken
} from "../middleware/auth.js";

const router = express.Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post("/register", async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      acc_type,
      name,
      gender,
      age,
      breed,
      birthdate,
      owner,
      identification
    } = req.body;

    // Validate required fields
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide username, email, and password."
      });
    }

    // Check if user already exists
    const existingUser = await UserInfo.findOne({
      $or: [{ username }, { email }]
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: existingUser.username === username 
          ? "Username already exists." 
          : "Email already registered."
      });
    }

    // Generate unique userId
    const userId = `USER_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Create new user (password will be hashed automatically by pre-save hook)
    const newUser = new UserInfo({
      username,
      email,
      password,
      userId,
      acc_type: acc_type || 'customer',
      name,
      gender,
      age,
      breed,
      birthdate,
      owner,
      identification,
      address: ""
    });

    await newUser.save();

    // Generate tokens
    const accessToken = generateAccessToken(newUser);
    const refreshToken = generateRefreshToken(newUser);

    // Save refresh token to database
    newUser.refreshToken = refreshToken;
    await newUser.save();

    // Send response (password excluded automatically by toJSON method)
    res.status(201).json({
      success: true,
      message: "User registered successfully!",
      data: {
        user: newUser,
        accessToken,
        refreshToken
      }
    });
  } catch (error) {
    console.error("Registration error:", error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: messages
      });
    }

    res.status(500).json({
      success: false,
      message: "Error registering user. Please try again."
    });
  }
});

/**
 * @route   POST /api/auth/login
 * @desc    Login user and return JWT tokens
 * @access  Public
 */
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide username and password."
      });
    }

    // Find user by username or email
    const user = await UserInfo.findOne({
      $or: [{ username }, { email: username }]
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials."
      });
    }

    // Verify password using the comparePassword method
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials."
      });
    }

    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Save refresh token to database
    user.refreshToken = refreshToken;
    user.updatedAt = Date.now();
    await user.save();

    // Send response
    res.status(200).json({
      success: true,
      message: "Login successful!",
      data: {
        user: user,
        accessToken,
        refreshToken
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Error during login. Please try again."
    });
  }
});

/**
 * @route   POST /api/auth/refresh
 * @desc    Refresh access token using refresh token
 * @access  Public
 */
router.post("/refresh", async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token required."
      });
    }

    // Verify refresh token
    let decoded;
    try {
      decoded = verifyRefreshToken(refreshToken);
    } catch (error) {
      return res.status(403).json({
        success: false,
        message: "Invalid or expired refresh token."
      });
    }

    // Find user and verify refresh token matches
    const user = await UserInfo.findById(decoded.userId);

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({
        success: false,
        message: "Invalid refresh token."
      });
    }

    // Generate new access token
    const newAccessToken = generateAccessToken(user);

    res.status(200).json({
      success: true,
      message: "Token refreshed successfully!",
      data: {
        accessToken: newAccessToken
      }
    });
  } catch (error) {
    console.error("Token refresh error:", error);
    res.status(500).json({
      success: false,
      message: "Error refreshing token."
    });
  }
});

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user by invalidating refresh token
 * @access  Private
 */
router.post("/logout", authenticateToken, async (req, res) => {
  try {
    // Remove refresh token from database
    const user = await UserInfo.findById(req.user.userId);
    
    if (user) {
      user.refreshToken = null;
      await user.save();
    }

    res.status(200).json({
      success: true,
      message: "Logged out successfully!"
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      success: false,
      message: "Error during logout."
    });
  }
});

/**
 * @route   GET /api/auth/me
 * @desc    Get current user profile
 * @access  Private
 */
router.get("/me", authenticateToken, async (req, res) => {
  try {
    const user = await UserInfo.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found."
      });
    }

    res.status(200).json({
      success: true,
      data: {
        user: user
      }
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching user profile."
    });
  }
});

/**
 * @route   PUT /api/auth/change-password
 * @desc    Change user password
 * @access  Private
 */
router.put("/change-password", authenticateToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Please provide current and new password."
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 6 characters long."
      });
    }

    const user = await UserInfo.findById(req.user.userId);

    // Verify current password
    const isPasswordValid = await user.comparePassword(currentPassword);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect."
      });
    }

    // Update password (will be hashed by pre-save hook)
    user.password = newPassword;
    user.updatedAt = Date.now();
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully!"
    });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({
      success: false,
      message: "Error changing password."
    });
  }
});

export default router;
