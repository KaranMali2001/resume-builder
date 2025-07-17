import { Course, Resume, User } from '@/models';
import { DashboardData } from '@/types';
import { Request, Response } from 'express';
export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user' });
  }
};
export const getDashboardData = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const resume = await Resume.findById(user.resume);
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    const courses = await Course.find({ userId: user._id });

    // Transform courses to match the interface
    const transformedCourses = courses.map((course) => ({
      id: course._id.toString(),
      title: course.title,
      progress: course.progress,
      skills: course.skills,
      completionDate: course.completionDate?.toISOString(),
      status: course.status,
      embedded: course.embedded,
      modules: course.modules.map((module) => ({
        id: module._id?.toString() || '',
        title: module.title,
        completed: module.completed,
        description: module.description ?? undefined,
        order: module.order,
      })),
    }));

    // Calculate comprehensive stats
    const completedCourses = transformedCourses.filter(
      (course) => course.status === 'completed',
    ).length;
    const activeCourses = transformedCourses.filter(
      (course) => course.status === 'active',
    ).length;
    const totalModules = transformedCourses.reduce(
      (acc, course) => acc + course.modules.length,
      0,
    );
    const completedModules = transformedCourses.reduce(
      (acc, course) =>
        acc + course.modules.filter((module) => module.completed).length,
      0,
    );
    const averageProgress =
      transformedCourses.length > 0
        ? transformedCourses.reduce((acc, course) => acc + course.progress, 0) /
          transformedCourses.length
        : 0;

    // Get all unique skills from courses
    const allSkills = [
      ...new Set(transformedCourses.flatMap((course) => course.skills)),
    ];

    const stats = {
      totalCourses: transformedCourses.length,
      completedCourses,
      activeCourses,
      totalSkills: allSkills.length,
      averageProgress: Math.round(averageProgress * 100) / 100, // Round to 2 decimal places
      totalModules,
      completedModules,
    };

    // Transform user data
    const transformedUser = {
      //@ts-ignore
      id: user._id.toString(),
      name: user.name,
      email: user.email,

      location: user.location,
      joinDate: user.joinDate.toISOString(),
    };

    const dashboardData: DashboardData = {
      user: transformedUser,
      courses: transformedCourses,

      stats,
    };

    res.json(dashboardData);
  } catch (error) {
    console.error('Dashboard data fetch error:', error);
    res.status(500).json({ message: 'Failed to fetch dashboard data' });
  }
};
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { autoEmbed } = req.body;
    const user = await User.findOneAndUpdate(
      { _id: req.userId },
      {
        autoEmbed,
      },
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Failed to update user' });
  }
};
