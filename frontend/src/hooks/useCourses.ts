'use client';


import { courseService } from '@/services/courseService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useCourses() {


  const queryClient = useQueryClient();

 

  const updateModuleMutation = useMutation({
    mutationFn: ({ courseId, moduleId, completed }: { courseId: string; moduleId: string; completed: boolean }) =>
      courseService.updateModuleProgress(courseId, moduleId, completed),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      toast.success('Module Progress Updated!', {
        description: `Module ${variables.moduleId} progress has been updated successfully.`,
      });
    },
    onError: () => {
      toast.error('Error', {
        description: 'Failed to update module progress',
      });
    },
  });

  const embedCourseMutation = useMutation({
    mutationFn: (courseId: string) => courseService.embedCourse(courseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      queryClient.invalidateQueries({ queryKey: ['resume'] });
      toast.success('Course Embedded!', {
        description: 'Your course progress and achievements have been embedded to your resume.',
      });
    },
    onError: () => {
      toast.error('Error', {
        description: 'Failed to embed course to resume',
      });
    },
  });

  return {
  
    updateModule: updateModuleMutation.mutate,
    isUpdatingModule: updateModuleMutation.isPending,
    embedCourse: embedCourseMutation.mutate,
    isEmbedding: embedCourseMutation.isPending,
  };
}
