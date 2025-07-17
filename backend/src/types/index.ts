export interface Module {
  _id: string;
  title: string;
  completed: boolean;
}
export interface JwtPayload {
  userId: string;
  email: string;
  [key: string]: any;
}
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}
export interface DashboardData {
  user: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    location?: string;
    joinDate: string;
  };
  courses: Array<{
    id: string;
    title: string;
    progress: number;
    skills: string[];
    completionDate?: string;
    status: 'active' | 'completed';
    embedded: boolean;
    modules: Array<{
      id: string;
      title: string;
      completed: boolean;
      description?: string;
      order: number;
    }>;
  }>;

  stats: {
    totalCourses: number;
    completedCourses: number;
    activeCourses: number;
    totalSkills: number;
    averageProgress: number;
    totalModules: number;
    completedModules: number;
  };
}
