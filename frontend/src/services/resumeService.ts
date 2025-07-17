import api from "@/lib/api"
import type { ResumeData } from "@/types"

export const resumeService = {
  getResume: async (): Promise<ResumeData> => {
    const response = await api.get(`/resume`)
    if(!response.data) throw new Error("No Resume Found")
    return response.data
  },

  generateResume: async (userId: string) => {
    const response = await api.post("/resume/generate", { userId })
    return response.data
  },
}
