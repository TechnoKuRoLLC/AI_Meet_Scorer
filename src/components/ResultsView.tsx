import { useEffect, useState } from "react"
import type { MeetingData } from "../data/meeting-data"
import { BackgroundElements } from "./BackgroundElements"
import { Header } from "./Header"
import { IndividualSpeakerView } from "./IndividualSpeakerView"
import { Navigation } from "./Navigation"
import { TeamOverallView } from "./TeamOverallView"

interface ResultsViewProps {
  meetingData: MeetingData
  onNewAnalysis: () => void
}

export const ResultsView = ({ meetingData, onNewAnalysis }: ResultsViewProps) => {
  const [currentSpeaker, setCurrentSpeaker] = useState(0)
  const [showOverall, setShowOverall] = useState(false)
  const [animateScore, setAnimateScore] = useState(false)

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setAnimateScore(true)
    const timer = setTimeout(() => setAnimateScore(false), 2000)
    return () => clearTimeout(timer)
  }, [currentSpeaker, showOverall])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden relative">
      <BackgroundElements />
      <Header />

      {/* New Analysis Button */}
      <div className="relative z-10 flex justify-center mb-4">
        <button
          className="bg-gradient-to-r from-green-400 to-green-600 text-black px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform shadow-lg"
          onClick={onNewAnalysis}
          type="button"
        >
          🔄 新しい分析を開始
        </button>
      </div>

      <Navigation setShowOverall={setShowOverall} showOverall={showOverall} />

      {showOverall ? (
        <TeamOverallView animateScore={animateScore} teamData={meetingData.teamAnalysis} />
      ) : (
        <IndividualSpeakerView
          animateScore={animateScore}
          currentSpeaker={currentSpeaker}
          individualAnalysis={meetingData.individualAnalysis}
          setCurrentSpeaker={setCurrentSpeaker}
        />
      )}

      {/* Footer */}
      <div className="relative z-10 text-center py-8 mt-8">
        <div className="text-lg text-cyan-300 animate-pulse">✨ 次回の会議でも頑張って！ ✨</div>
        <div className="mt-4 space-x-4">
          <button
            className="bg-gradient-to-r from-green-400 to-green-600 text-black px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform"
            type="button"
          >
            📊 詳細レポート
          </button>
          <button
            className="bg-gradient-to-r from-purple-400 to-purple-600 text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform"
            onClick={onNewAnalysis}
            type="button"
          >
            🔄 再分析
          </button>
        </div>
      </div>
    </div>
  )
}
