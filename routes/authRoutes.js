import express from 'express';
import {
  signup,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
  logout,
  resendOTP,
  verifyOTP,
} from '../controllers/authController.js';
import { protect } from '../middleware/protect.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);
router.patch('/updateMyPassword', protect, updatePassword);
router.post('/verifyOtp', verifyOTP);
router.post('/resendOtp', resendOTP);
router.get('/logout', logout);

export default router;
