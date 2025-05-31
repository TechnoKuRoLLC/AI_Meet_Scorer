import { getScoreColor } from "../utils/score-utils"
import { MetricsDisplay } from "./MetricsDisplay"
import { RadarChartComponent } from "./RadarChart"

interface IndividualAnalysisFromData {
  readonly speaker: string
  readonly speakerReview: string
  readonly metrics: Record<string, { readonly score: number; readonly reason: string }>
  readonly goodPointsComment: string
  readonly improvementSuggestions: string
  readonly meetingStyleAttribute: string
}

interface IndividualSpeakerViewProps {
  readonly individualAnalysis: readonly IndividualAnalysisFromData[]
  currentSpeaker: number
  setCurrentSpeaker: (index: number) => void
  animateScore: boolean
}

export const IndividualSpeakerView = ({
  individualAnalysis,
  currentSpeaker,
  setCurrentSpeaker,
  animateScore,
}: IndividualSpeakerViewProps) => {
  const currentData = individualAnalysis[currentSpeaker]

  const calculateOverallScore = (metrics: Record<string, { score: number }>) => {
    if (!metrics || Object.keys(metrics).length === 0) {
      return 0
    }
    const scores = Object.values(metrics).map((m) => m.score)
    return scores.reduce((acc, score) => acc + score, 0) / scores.length
  }
  const displayedScore = currentData ? calculateOverallScore(currentData.metrics) : 0

  return (
    <div className="relative z-10 max-w-6xl mx-auto px-4">
      {/* Speaker Selection */}
      <div className="flex justify-center mb-8 space-x-4">
        {individualAnalysis.map((speaker, index) => (
          <button
            className={`px-6 py-3 rounded-full border-2 transition-all ${
              currentSpeaker === index
                ? "bg-gradient-to-r from-cyan-400 to-purple-400 text-black border-cyan-400 font-bold scale-110"
                : "border-cyan-400 text-cyan-300 hover:bg-cyan-400/20"
            }`}
            key={index.toString()}
            onClick={() => setCurrentSpeaker(index)}
            type="button"
          >
            {speaker.speaker}
          </button>
        ))}
      </div>

      {/* Main Score Display */}
      <div className="bg-black/40 backdrop-blur-lg rounded-3xl border-4 border-cyan-400 p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-5xl font-bold text-cyan-300 mb-4">🎯 {currentData?.speaker} さん 🎯</h2>
          <div className="text-xl text-gray-300 my-2">
            <strong>レビュー:</strong> {currentData?.speakerReview}
          </div>
          <div
            className={`text-9xl font-bold ${getScoreColor(displayedScore)} ${animateScore ? "animate-pulse scale-110" : ""} transition-transform`}
          >
            {displayedScore.toFixed(1)}
            <span className="text-4xl">点</span>
          </div>
          <div className="text-2xl text-gray-300 mt-4">🎭 {currentData?.meetingStyleAttribute}</div>
        </div>

        {/* Charts and Details */}
        {currentData?.metrics && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <RadarChartComponent
              color="#ff6b9d"
              metrics={currentData.metrics}
              name={currentData?.speaker}
              title="📊 能力分析チャート"
            />
            <MetricsDisplay metrics={currentData?.metrics ?? {}} title="📈 詳細スコア" />
          </div>
        )}

        {/* Good Points and Improvements */}
        {currentData && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 text-left">
            <div className="bg-black/30 p-6 rounded-xl border border-green-500">
              <h3 className="text-2xl font-semibold text-green-400 mb-3">🌟 良い点</h3>
              <p className="text-gray-200 whitespace-pre-line">{currentData.goodPointsComment}</p>
            </div>
            <div className="bg-black/30 p-6 rounded-xl border border-yellow-500">
              <h3 className="text-2xl font-semibold text-yellow-400 mb-3">💡 改善点</h3>
              <p className="text-gray-200 whitespace-pre-line">{currentData.improvementSuggestions}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
