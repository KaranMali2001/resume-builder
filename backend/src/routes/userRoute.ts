import {
  getCurrentUser,
  getDashboardData,
  updateUser,
} from '@/controllers/userController';
import { authMiddleware } from '@/middleware/authMiddleware';
import { Router } from 'express';
const router = Router();
router.get('/getCurrentUser', authMiddleware, getCurrentUser);
router.put('/update', authMiddleware, updateUser);
router.get('/dashboard', authMiddleware, getDashboardData);
export default router;
