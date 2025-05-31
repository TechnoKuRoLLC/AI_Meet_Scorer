import { getScoreColor, getScoreGradient } from "../utils/score-utils"

interface MetricsDisplayProps {
  readonly metrics: Record<string, { readonly score: number; readonly reason: string }>
  readonly title: string
}

export const MetricsDisplay = ({ metrics, title }: MetricsDisplayProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-cyan-300 mb-4">{title}</h3>
      {Object.entries(metrics).map(([key, value]) => (
        <div className="bg-black/30 rounded-xl p-4" key={key}>
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg font-semibold">{key}</span>
            <span className={`text-xl font-bold ${getScoreColor(value.score)}`}>{value.score}点</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div
              className={`h-3 rounded-full bg-gradient-to-r ${getScoreGradient(value.score)} transition-all duration-1000`}
              style={{ width: `${value.score}%` }}
            />
          </div>
          <p className="text-sm text-gray-300 mt-2">{value.reason}</p>
        </div>
      ))}
    </div>
  )
}
