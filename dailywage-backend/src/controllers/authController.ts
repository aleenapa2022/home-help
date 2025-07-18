import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/User';
import Worker from '../models/Worker';
import { ApiResponse, RegisterRequest, AuthRequest, JWTPayload } from '../types';

// Generate JWT token
const generateToken = (payload: JWTPayload): string => {
  return jwt.sign(payload as any, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  } as jwt.SignOptions);
};

// Generate refresh token
const generateRefreshToken = (payload: JWTPayload): string => {
  return jwt.sign(payload as any, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: process.env.JWT_REFRESH_EXPIRE || '30d'
  } as jwt.SignOptions);
};

// Register user
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const userData: RegisterRequest = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      } as ApiResponse);
      return;
    }

    // Check if phone number already exists
    const existingPhone = await User.findOne({ phone: userData.phone });
    if (existingPhone) {
      res.status(400).json({
        success: false,
        message: 'User with this phone number already exists'
      } as ApiResponse);
      return;
    }

    // Create user
    const user = new User(userData);
    await user.save();

    // If user is a worker, create worker profile with minimal data
    if (userData.userType === 'worker') {
      const workerProfile = new Worker({
        userId: user._id,
        services: [],
        skills: [],
        experience: 0,
        hourlyRate: 100,
        description: '',
        languages: ['Hindi'],
        workRadius: 10,
        emergencyContact: {
          name: '',
          phone: '',
          relation: ''
        }
      });
      await workerProfile.save();
    }

    // Generate tokens
    const tokenPayload: JWTPayload = {
      userId: user._id,
      email: user.email,
      userType: user.userType
    };

    const token = generateToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    // Update last login
    await user.updateLastLogin();

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          userType: user.userType,
          isVerified: user.isVerified,
          avatar: user.avatar
        },
        token,
        refreshToken
      }
    } as ApiResponse);

  } catch (error: any) {
    console.error('Registration error:', error);
    
    // Handle duplicate key error
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      res.status(400).json({
        success: false,
        message: `${field} already exists`
      } as ApiResponse);
      return;
    }

    res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: error.message
    } as ApiResponse);
  }
};

// Login user
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password }: AuthRequest = req.body;

    // Find user and include password for comparison
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      } as ApiResponse);
      return;
    }

    // Check if user is active
    if (!user.isActive) {
      res.status(401).json({
        success: false,
        message: 'Account is deactivated. Please contact support.'
      } as ApiResponse);
      return;
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      } as ApiResponse);
      return;
    }

    // Generate tokens
    const tokenPayload: JWTPayload = {
      userId: user._id,
      email: user.email,
      userType: user.userType
    };

    const token = generateToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    // Update last login
    await user.updateLastLogin();

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          userType: user.userType,
          isVerified: user.isVerified,
          avatar: user.avatar,
          address: user.address,
          city: user.city,
          state: user.state,
          pincode: user.pincode
        },
        token,
        refreshToken
      }
    } as ApiResponse);

  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: error.message
    } as ApiResponse);
  }
};

// Refresh token
export const refreshToken = async (req: Request, res: Response): Promise<void> => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      res.status(401).json({
        success: false,
        message: 'Refresh token is required'
      } as ApiResponse);
      return;
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as JWTPayload;

    // Find user
    const user = await User.findById(decoded.userId);
    if (!user || !user.isActive) {
      res.status(401).json({
        success: false,
        message: 'Invalid refresh token'
      } as ApiResponse);
      return;
    }

    // Generate new tokens
    const tokenPayload: JWTPayload = {
      userId: user._id,
      email: user.email,
      userType: user.userType
    };

    const newToken = generateToken(tokenPayload);
    const newRefreshToken = generateRefreshToken(tokenPayload);

    res.status(200).json({
      success: true,
      message: 'Tokens refreshed successfully',
      data: {
        token: newToken,
        refreshToken: newRefreshToken
      }
    } as ApiResponse);

  } catch (error: any) {
    console.error('Refresh token error:', error);
    res.status(401).json({
      success: false,
      message: 'Invalid refresh token',
      error: error.message
    } as ApiResponse);
  }
};

// Get current user
export const getCurrentUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = req.user;

    let additionalData = {};

    // If user is a worker, get worker profile
    if (user.userType === 'worker') {
      const workerProfile = await Worker.findOne({ userId: user._id });
      additionalData = { workerProfile };
    }

    res.status(200).json({
      success: true,
      message: 'User data retrieved successfully',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          userType: user.userType,
          isVerified: user.isVerified,
          avatar: user.avatar,
          address: user.address,
          city: user.city,
          state: user.state,
          pincode: user.pincode,
          lastLogin: user.lastLogin
        },
        ...additionalData
      }
    } as ApiResponse);

  } catch (error: any) {
    console.error('Get current user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get user data',
      error: error.message
    } as ApiResponse);
  }
};

// Logout user (client-side token removal, server-side can implement token blacklisting)
export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    // In a production app, you might want to blacklist the token
    // For now, we'll just send a success response
    
    res.status(200).json({
      success: true,
      message: 'Logged out successfully'
    } as ApiResponse);

  } catch (error: any) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Logout failed',
      error: error.message
    } as ApiResponse);
  }
};

// Forgot password
export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User with this email does not exist'
      } as ApiResponse);
      return;
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // Set reset token and expiry (1 hour)
    user.passwordResetToken = hashedToken;
    user.passwordResetExpires = new Date(Date.now() + 60 * 60 * 1000);
    await user.save();

    // In a real application, you would send an email with the reset link
    // For now, we'll just return the token (remove this in production)
    res.status(200).json({
      success: true,
      message: 'Password reset token generated successfully',
      data: {
        resetToken // Remove this in production - send via email instead
      }
    } as ApiResponse);

  } catch (error: any) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process password reset request',
      error: error.message
    } as ApiResponse);
  }
};

// Reset password
export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { token, password } = req.body;

    // Hash the token to compare with database
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    // Find user with valid reset token
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: new Date() }
    });

    if (!user) {
      res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token'
      } as ApiResponse);
      return;
    }

    // Update password
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password reset successfully'
    } as ApiResponse);

  } catch (error: any) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to reset password',
      error: error.message
    } as ApiResponse);
  }
};

// Change password (for authenticated users)
export const changePassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user._id;

    // Get user with password
    const user = await User.findById(userId).select('+password');
    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found'
      } as ApiResponse);
      return;
    }

    // Verify current password
    const isCurrentPasswordValid = await user.comparePassword(currentPassword);
    if (!isCurrentPasswordValid) {
      res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      } as ApiResponse);
      return;
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password changed successfully'
    } as ApiResponse);

  } catch (error: any) {
    console.error('Change password error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to change password',
      error: error.message
    } as ApiResponse);
  }
};