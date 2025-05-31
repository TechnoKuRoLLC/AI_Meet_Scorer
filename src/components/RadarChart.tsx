import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from "recharts"
import { getRadarData } from "../utils/score-utils"

interface RadarChartComponentProps {
  readonly metrics: Record<string, { readonly score: number; readonly reason: string }>
  readonly title: string
  readonly color: string
  readonly name: string
}

export const RadarChartComponent = ({ metrics, title, color, name }: RadarChartComponentProps) => {
  return (
    <div className="bg-black/30 rounded-2xl p-6">
      <h3 className="text-2xl font-bold text-cyan-300 mb-4 text-center">{title}</h3>
      <ResponsiveContainer height={300} width="100%">
        <RadarChart data={getRadarData(metrics)}>
          <PolarGrid stroke="#64748b" />
          <PolarAngleAxis dataKey="metric" tick={{ fontSize: 12, fill: "#94a3b8" }} />
          <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 10, fill: "#64748b" }} />
          <Radar dataKey="score" fill={color} fillOpacity={0.3} name={name} stroke={color} strokeWidth={3} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
