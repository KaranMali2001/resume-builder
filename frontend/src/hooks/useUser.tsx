import { userService } from '@/services/userService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useUser() {
  const queryClient = useQueryClient();

  // const userQuery = useQuery({
  //   queryKey: ['user'],
  //   queryFn: userService.getUser,
  //   staleTime: 5 * 60 * 1000, // 5 minutes
  //   gcTime: 10 * 60 * 1000, // 10 minutes
  //   retry: 2,
  // });

  // Mutation to update user
  const updateUserMutation = useMutation({
    mutationFn: async (autoEmbed: boolean) => {
      const response = await userService.updateUser(autoEmbed);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      toast.success('Settings Updated!', {
        description: 'Your preferences have been saved successfully.',
      });
    },
    onError: (error) => {
      console.error('Error updating user:', error);
      toast.error('Update Failed', {
        description: 'Failed to update your preferences. Please try again.',
      });
    },
  });

  return {
    // userQuery: userQuery,
    // isLoading: userQuery.isLoading,
    // error: userQuery.error,
    // isError: userQuery.isError,

    updateUser: updateUserMutation.mutate,
    isUpdating: updateUserMutation.isPending,
    updateError: updateUserMutation.error,
  };
}
