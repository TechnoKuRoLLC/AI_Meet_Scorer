import { useState } from "react"
import { ResultsView } from "./components/ResultsView"
import { UploadScreen } from "./components/UploadScreen"
import type { MeetingData } from "./data/meeting-data"
import { useAnalyzeMeeting } from "./hooks/use-analyze-meeting"

type AppState = "upload" | "results"

export const App = () => {
  const [appState, setAppState] = useState<AppState>("upload")
  const [meetingData, setMeetingData] = useState<MeetingData | null>(null)

  const analyzeMutation = useAnalyzeMeeting()

  const handleFileUpload = async (text: string) => {
    try {
      const result = await analyzeMutation.mutateAsync(text)
      setMeetingData(result)
      setAppState("results")
    } catch (error) {
      console.error("Analysis failed:", error)
      alert("分析に失敗しました。もう一度お試しください。")
    }
  }

  const handleNewAnalysis = () => {
    setAppState("upload")
    setMeetingData(null)
    analyzeMutation.reset()
  }

  if (appState === "results" && meetingData) {
    return <ResultsView meetingData={meetingData} onNewAnalysis={handleNewAnalysis} />
  }

  return <UploadScreen isLoading={analyzeMutation.isPending} onFileUpload={handleFileUpload} />
}
