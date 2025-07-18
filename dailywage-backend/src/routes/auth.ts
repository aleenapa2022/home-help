import express from 'express';
import {
  register,
  login,
  refreshToken,
  getCurrentUser,
  logout,
  forgotPassword,
  resetPassword,
  changePassword
} from '../controllers/authController';
import { auth } from '../middleware/auth';
import {
  validateRegistration,
  validateLogin,
  validatePasswordReset,
  validatePasswordUpdate
} from '../middleware/validation';

const router = express.Router();

// Public routes
router.post('/register', ...validateRegistration, register);
router.post('/login', ...validateLogin, login);
router.post('/refresh-token', refreshToken);
router.post('/forgot-password', ...validatePasswordReset, forgotPassword);
router.post('/reset-password', ...validatePasswordUpdate, resetPassword);

// Protected routes
router.get('/me', auth, getCurrentUser);
router.post('/logout', auth, logout);
router.post('/change-password', auth, changePassword);

export default router;