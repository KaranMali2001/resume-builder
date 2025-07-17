import api from '@/lib/api';

export const userService = {
  getUser: async () => {
    const response = await api.get(`/user/getCurrentUser`);

    return response.data;
  },
  getDashboardData: async () => {
    const response = await api.get(`/user/dashboard`);
    return response.data;
  },
  updateUser: async (autoEmbed: boolean) => {
    const response = await api.put(`/user/update`, { autoEmbed });
    return response.data;
  },
};
