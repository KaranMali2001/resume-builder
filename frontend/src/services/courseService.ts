import api from "@/lib/api"
import type { Course } from "@/types"

export const courseService = {
  getCourses: async (userId: string): Promise<Course[]> => {
    const response = await api.get(`/progress/${userId}`)
    return response.data
  },

  updateModuleProgress: async (courseId: string, moduleId: string, completed: boolean) => {
    const response = await api.post("/course/update", {
      courseId,
      moduleId,
      completed,
    })
    return response.data
  },

  embedCourse: async (courseId: string) => {
    const response = await api.post("/course/resume/embed", {
      courseId,
    })
    return response.data
  },
}
