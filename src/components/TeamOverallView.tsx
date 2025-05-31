import { getScoreColor } from "../utils/score-utils"
import { MetricsDisplay } from "./MetricsDisplay"
import { RadarChartComponent } from "./RadarChart"

interface TeamDataForView {
  readonly metrics: Record<string, { readonly score: number; readonly reason: string }>
  readonly goodPointsComment: string
  readonly improvementSuggestions: string
}

interface TeamOverallViewProps {
  readonly teamData: TeamDataForView
  animateScore: boolean
}

export const TeamOverallView = ({ teamData, animateScore }: TeamOverallViewProps) => {
  const calculateOverallScore = (metrics: Record<string, { score: number }>) => {
    if (!metrics || Object.keys(metrics).length === 0) {
      return 0
    }
    const scores = Object.values(metrics).map((m) => m.score)
    return scores.reduce((acc, score) => acc + score, 0) / scores.length
  }
  const displayedScore = calculateOverallScore(teamData.metrics)

  return (
    <div className="relative z-10 max-w-6xl mx-auto px-4">
      <div className="bg-black/40 backdrop-blur-lg rounded-3xl border-4 border-cyan-400 p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-cyan-300 mb-4">🏆 チーム総合評価 🏆</h2>
          <div
            className={`text-8xl font-bold ${getScoreColor(displayedScore)} ${animateScore ? "animate-pulse scale-110" : ""} transition-transform`}
          >
            {displayedScore.toFixed(1)}点
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <RadarChartComponent
            color="#00d4aa"
            metrics={teamData.metrics}
            name="チームスコア"
            title="📊 チーム分析チャート"
          />
          <MetricsDisplay metrics={teamData.metrics} title="📈 詳細スコア" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 text-left">
          <div className="bg-black/30 p-6 rounded-xl border border-green-500">
            <h3 className="text-2xl font-semibold text-green-400 mb-3">🌟 Good Points</h3>
            <p className="text-gray-200 whitespace-pre-line">{teamData.goodPointsComment}</p>
          </div>
          <div className="bg-black/30 p-6 rounded-xl border border-yellow-500">
            <h3 className="text-2xl font-semibold text-yellow-400 mb-3">💡 Improvement Suggestions</h3>
            <p className="text-gray-200 whitespace-pre-line">{teamData.improvementSuggestions}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
