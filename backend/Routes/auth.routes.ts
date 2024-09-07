import express from 'express';
import { checkAuth, signup, verifyEmail, forgetPassword, resetPassword, login, logout } from '../Controllers/auth.controller.ts';
import verifyToken from '../middleware/verifyToken.ts';
const router = express.Router();

router.post("/check-auth", verifyToken, checkAuth);

router.post("/signup", signup);
router.post("/verify-email", verifyEmail);

router.post("/forget-password", forgetPassword);
router.post("/reset-password/:token", resetPassword);

router.post("/login", login);
router.post("/logout", logout);

export default router;