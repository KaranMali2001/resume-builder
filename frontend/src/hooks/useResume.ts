"use client"

import { useAuth } from "@/context/AuthContext"
import { resumeService } from "@/services/resumeService"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export function useResume() {
  const { user } = useAuth()

  const queryClient = useQueryClient()

  const getResume=useQuery({
    queryKey:["resume"],
    queryFn:resumeService.getResume
})
  const generateMutation = useMutation({
    mutationFn: () => resumeService.generateResume(user!.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resume"] })
      toast("Resume Generated!", {
        description: "Your resume has been updated with the latest information.",
      })
    },
    onError: () => {
      toast("Error", {
        description: "Failed to generate resume",

      })
    },
  })

  return {
    getResume: getResume.data,
    isLoading: getResume.isLoading,
    error: getResume.error,
    generateResume: generateMutation.mutate,
    isGenerating: generateMutation.isPending,
  }
}
