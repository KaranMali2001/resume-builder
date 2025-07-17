import { authMiddleware } from '@/middleware/authMiddleware';
import express from 'express';
import { embedToResume, updateProgress } from '../controllers/courseController';

const router = express.Router();

router.post('/update', authMiddleware, updateProgress);

router.post('/resume/embed', authMiddleware, embedToResume);

export default router;
