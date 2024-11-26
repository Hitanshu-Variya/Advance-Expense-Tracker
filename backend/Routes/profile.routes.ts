import express from 'express';
import { getProfile, updateProfile } from '../Controllers/profile.controller';
import verifyToken from '../middleware/verifyToken';
const router = express.Router();

router.get('/get-profile', verifyToken, getProfile);
router.put('/update-profile', verifyToken, updateProfile);
export default router;