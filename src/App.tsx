import { useEffect, useState } from "react"
import { BackgroundElements } from "./components/BackgroundElements"
import { Footer } from "./components/Footer"
import { Header } from "./components/Header"
import { IndividualSpeakerView } from "./components/IndividualSpeakerView"
import { Navigation } from "./components/Navigation"
import { TeamOverallView } from "./components/TeamOverallView"
import { meetingData } from "./data/meeting-data"

export const App = () => {
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

      <Footer />
    </div>
  )
}
