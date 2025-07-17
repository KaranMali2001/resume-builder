import { Resume } from '@/models';
import { Request, Response } from 'express';
export async function getResume(req: Request, res: Response) {
  try {
    const resume = await Resume.findOne({ userId: req.userId }).populate(
      'courses.courseId',
    );
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.json(resume);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
