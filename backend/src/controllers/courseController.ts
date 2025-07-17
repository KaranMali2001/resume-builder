import { Request, Response } from 'express';
import mongoose from 'mongoose';

import { Course, User } from '@/models';
import { getAchievements } from '@/utils/getAchievements';
import Resume from '../models/Resume';

export const updateProgress = async (req: Request, res: Response) => {
  try {
    const { courseId, moduleId, completed } = req.body;
    const userId = req.userId;
    const user = await User.findById(userId);
    const course = await Course.findOne({ _id: courseId, userId });
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (moduleId) {
      const moduleIndex = course.modules.findIndex(
        //@ts-ignore
        (m: Module) => m._id.toString() === moduleId,
      );
      if (moduleIndex !== -1) {
        course.modules[moduleIndex].completed = completed;
      }
    }

    const totalModules = course.modules.length;
    const completedModules = course.modules.filter(
      //@ts-ignore
      (m: Module) => m.completed,
    ).length;
    course.progress =
      totalModules > 0
        ? Math.round((completedModules / totalModules) * 100)
        : 0;

    if (course.progress === 100) {
      course.completionDate = new Date();
      course.status = 'completed';
      if (user?.autoEmbed) {
        const response = await getAchievements(course);
        if (!response) {
          return res
            .status(400)
            .json({ message: 'Failed to generate bullet points' });
        }
        course.embedded = true;

        const bulletPoints = JSON.parse(response.trim()).bulletPoints;
        let resume = await Resume.findOne({ userId });
        resume?.courses.push({
          courseId: new mongoose.Types.ObjectId(courseId),
          achivements: bulletPoints,
        });

        if (course.skills && course.skills.length > 0) {
          const newSkills = course.skills.filter(
            (skill) => !resume?.skills.includes(skill),
          );
          resume?.skills.push(...newSkills);
        }

        await resume?.save();
      }
    }

    await course.save();

    res.json({
      id: course._id,
      title: course.title,
      progress: course.progress,
      skills: course.skills || [],
      modules: course.modules || [],
    });
  } catch (error) {
    console.error('Error updating progress:', error);
    res.status(500).json({ message: 'Failed to update progress' });
  }
};

export const embedToResume = async (req: Request, res: Response) => {
  try {
    const { courseId } = req.body;
    const userId = req.userId;
    const user = await User.findById(userId);

    const course = await Course.findOne({ _id: courseId, userId });
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (course.progress < 60) {
      return res
        .status(400)
        .json({ message: 'Course progress should be at least 60%' });
    }

    const response = await getAchievements(course);
    if (!response) {
      return res
        .status(400)
        .json({ message: 'Failed to generate bullet points' });
    }
    course.embedded = true;

    const bulletPoints = JSON.parse(response.trim()).bulletPoints;

    let resume = await Resume.findOne({ userId });

    if (!resume) {
      resume = new Resume({
        userId,
        personalInfo: {
          name: user?.name || '',
          email: user?.email || '',
          location: user?.location || '',
        },
        skills: [],
        courses: [],
      });
    }

    const courseObjectId = new mongoose.Types.ObjectId(courseId);
    const existingCourseIndex = resume.courses.findIndex(
      (course: any) => course.courseId.toString() === courseId,
    );

    if (existingCourseIndex !== -1) {
      resume.courses[existingCourseIndex].achivements.push(...bulletPoints);
    } else {
      resume.courses.push({
        courseId: courseObjectId,
        achivements: bulletPoints,
      });

      if (course.skills && course.skills.length > 0) {
        const newSkills = course.skills.filter(
          (skill) => !resume.skills.includes(skill),
        );
        resume.skills.push(...newSkills);
      }
    }

    await resume.save();
    await course.save();
    res.json({
      success: true,
      message: 'Course added to resume successfully',
      resumeId: resume._id,
      course: {
        id: course._id.toString(),
        title: course.title,
        progress: course.progress,
        skills: course.skills,
        completionDate: course.completionDate,
      },
    });
  } catch (error: any) {
    console.error('Error embedding course to resume:', error);
    res.status(500).json({ message: 'Failed to add course to resume' });
  }
};
