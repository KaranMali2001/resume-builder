import { getResume } from '@/controllers/resumeController';
import { authMiddleware } from '@/middleware/authMiddleware';
import express from 'express';

const router = express.Router();

// GET /api/resume/preview - Preview resume with embedded progress
router.get('/', authMiddleware, getResume);

export default router;
