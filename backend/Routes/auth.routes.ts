import express from 'express';
import { signup, verifyEmail, forgetPassword, resetPassword, login, logout, authenticateUser } from '../Controllers/auth.controller';
import verifyToken from '../middleware/verifyToken';
const router = express.Router();

router.post("/check-auth", verifyToken, authenticateUser);
router.post("/signup", signup);
router.post("/verify-email", verifyEmail);

router.post("/forget-password", forgetPassword);
router.post("/reset-password/:token", resetPassword);

router.post("/login", login);
router.post("/logout", verifyToken, logout);

export default router;