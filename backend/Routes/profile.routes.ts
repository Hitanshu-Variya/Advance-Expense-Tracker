import express from 'express';
import { getProfile, updateProfile } from '../Controllers/profile.controller.ts';
import verifyToken from '../middleware/verifyToken.ts';
const router = express.Router();

router.get('/get-profile', verifyToken, getProfile);
router.put('/update-profile', verifyToken, updateProfile);
export default router;