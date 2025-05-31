import { useMutation } from "@tanstack/react-query"
import { analyzeMeetingText } from "../services/api"

export const useAnalyzeMeeting = () => {
  return useMutation({
    mutationFn: analyzeMeetingText,
    onError: (error) => {
      console.error("Meeting analysis failed:", error)
    },
  })
}
