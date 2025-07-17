'use client';

import { courseService } from '@/services/courseService';
import { userService } from '@/services/userService';
import { calculateProgress } from '@/utils/courseUtils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

interface DashboardData {
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
  resume: {
    personalInfo: {
      name: string;
      email: string;
      phone?: string;
      location?: string;
    };
    skills: string[];
    courses: Array<{
      title: string;
      progress: number;
      skills: string[];
      completionDate?: string;
      embedded: boolean;
      modules: {
        completed: number;
        total: number;
      };
    }>;
  };
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

export function useDashboard() {
  const queryClient = useQueryClient();

  const dashboardQuery = useQuery({
    queryKey: ['dashboard'],
    queryFn: userService.getDashboardData,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const updateModuleMutation = useMutation({
    mutationFn: async ({ courseId, moduleId, completed }: { courseId: string; moduleId: string; completed: boolean }) => {
      await courseService.updateModuleProgress(courseId, moduleId, completed);

      const currentData = queryClient.getQueryData<DashboardData>(['dashboard']);
      if (!currentData) {
        throw new Error('No dashboard data available');
      }

      // Find the course and update the module
      const course = currentData.courses.find((c) => c.id === courseId);
      if (!course) {
        throw new Error('Course not found');
      }

      // Create updated modules array
      const updatedModules = course.modules.map((module) => (module.id === moduleId ? { ...module, completed } : module));

      // Calculate new progress
      const newProgress = calculateProgress(updatedModules);

      return {
        newProgress,
        courseTitle: course.title,
        moduleTitle: updatedModules.find((m) => m.id === moduleId)?.title || 'Module',
      };
    },
    onMutate: async ({ courseId, moduleId, completed }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['dashboard'] });

      // Snapshot the previous value
      const previousData = queryClient.getQueryData<DashboardData>(['dashboard']);

      // Optimistically update the data
      if (previousData) {
        const updatedData = {
          ...previousData,
          courses: previousData.courses.map((course) => {
            if (course.id === courseId) {
              const updatedModules = course.modules.map((module) => (module.id === moduleId ? { ...module, completed } : module));
              const newProgress = calculateProgress(updatedModules);
              return {
                ...course,
                modules: updatedModules,
                progress: newProgress,
              };
            }
            return course;
          }),
        };
        queryClient.setQueryData(['dashboard'], updatedData);
      }

      return { previousData };
    },
    onSuccess: (_, variables) => {
      toast.success(variables.completed ? '✅ Module Completed!' : '⏸️ Module Unchecked', {});
    },
    onError: (error, _, context) => {
      console.error('Error updating module progress:', error);
      if (context?.previousData) {
        queryClient.setQueryData(['dashboard'], context.previousData);
      }

      toast.error(' Error', { description: 'Failed to update module progress. Please try again.' });
    },
  });

  const embedCourseMutation = useMutation({
    mutationFn: async (courseId: string) => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      const currentData = queryClient.getQueryData<DashboardData>(['dashboard']);
      const course = currentData?.courses.find((c) => c.id === courseId);

      return {
        success: true,
        courseTitle: course?.title || 'Course',
      };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      toast.success('✨ Course Embedded!', { description: `${data.courseTitle} has been added to your resume successfully.` });
    },
    onError: () => {
      toast.error('❌ Error', { description: 'Failed to embed course to resume. Please try again.' });
    },
  });

  const generateResumeMutation = useMutation({
    mutationFn: async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      toast.success('📄 Resume Generated!', { description: 'Your resume has been updated with the latest information.' });
    },
    onError: () => {
      toast.error('❌ Error', { description: 'Failed to generate resume. Please try again.' });
    },
  });

  return {
    data: dashboardQuery.data,
    isLoading: dashboardQuery.isLoading,
    error: dashboardQuery.error,

    updateModule: updateModuleMutation.mutate,
    isUpdatingModule: updateModuleMutation.isPending,
    embedCourse: embedCourseMutation.mutate,
    isEmbedding: embedCourseMutation.isPending,
    generateResume: generateResumeMutation.mutate,
    isGenerating: generateResumeMutation.isPending,
  };
}
