import { getScoreColor } from "../utils/score-utils"
import { MetricsDisplay } from "./MetricsDisplay"
import { RadarChartComponent } from "./RadarChart"

interface IndividualAnalysis {
  readonly speaker: string
  readonly metrics: Record<string, { readonly score: number; readonly reason: string }>
  readonly meetingStyleAttribute: string
  readonly overallScore: number
}

interface IndividualSpeakerViewProps {
  readonly individualAnalysis: readonly IndividualAnalysis[]
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
          <div
            className={`text-9xl font-bold ${getScoreColor(currentData?.overallScore ?? 0)} ${animateScore ? "animate-pulse scale-110" : ""} transition-transform`}
          >
            {currentData?.overallScore.toFixed(1)}
            <span className="text-4xl">点</span>
          </div>
          <div className="text-2xl text-gray-300 mt-4">🎭 {currentData?.meetingStyleAttribute}</div>
          <div className="text-xl text-gray-400">全国平均: 68.5点</div>
        </div>

        {/* Charts and Details */}
        {currentData?.metrics && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <RadarChartComponent
              color="#ff6b9d"
              metrics={currentData.metrics}
              name={currentData?.speaker}
              title="📊 能力分析チャート"
            />
            <MetricsDisplay metrics={currentData?.metrics ?? {}} title="📈 詳細スコア" />
          </div>
        )}
      </div>
    </div>
  )
}
