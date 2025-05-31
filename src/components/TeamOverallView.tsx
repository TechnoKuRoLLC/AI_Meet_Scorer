import { getScoreColor } from "../utils/score-utils"
import { MetricsDisplay } from "./MetricsDisplay"
import { RadarChartComponent } from "./RadarChart"

interface TeamOverallViewProps {
  readonly teamData: {
    readonly metrics: Record<string, { readonly score: number; readonly reason: string }>
    readonly overallScore: number
  }
  animateScore: boolean
}

export const TeamOverallView = ({ teamData, animateScore }: TeamOverallViewProps) => {
  return (
    <div className="relative z-10 max-w-6xl mx-auto px-4">
      <div className="bg-black/40 backdrop-blur-lg rounded-3xl border-4 border-cyan-400 p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-cyan-300 mb-4">🏆 チーム総合評価 🏆</h2>
          <div
            className={`text-8xl font-bold ${getScoreColor(teamData.overallScore)} ${animateScore ? "animate-pulse scale-110" : ""} transition-transform`}
          >
            {teamData.overallScore.toFixed(1)}点
          </div>
          <div className="text-2xl text-gray-300 mt-4">全国平均: 65.2点</div>
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
      </div>
    </div>
  )
}
