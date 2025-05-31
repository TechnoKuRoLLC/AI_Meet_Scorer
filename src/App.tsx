import { useEffect, useState } from "react"
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from "recharts"

// Sample data based on your JSON structure
const meetingData = {
  individualAnalysis: [
    {
      speaker: "虎太郎",
      metrics: {
        貢献度: { score: 80, reason: "スキル・経験の共有や将来の展望提示など、議論の軸を提供した。" },
        一貫性: { score: 75, reason: "努力と実績を踏まえた自己評価は一貫していた。" },
        協調性: { score: 40, reason: "熊野ぷ〜さんへの対抗姿勢が強く、対立を助長する発言があった。" },
        脱線度: { score: 35, reason: "途中から雑談や対立が長引き、会議主題から逸れがち。" }, // Inverted for display
        発言密度: { score: 90, reason: "発言量・内容ともに豊富で議論の中心にいた。" },
        ファシリ度: { score: 20, reason: "議事進行や中立的まとめは見られなかった。" },
      },
      meetingStyleAttribute: "自己表現重視（ENFP風）",
      overallScore: 73.3,
    },
    {
      speaker: "熊野ぷ〜さん",
      metrics: {
        貢献度: { score: 45, reason: "自己評価に関する視点提示はあったが、建設的な提案には乏しかった。" },
        一貫性: { score: 60, reason: "自己過大評価を批判する立場は一貫していた。" },
        協調性: { score: 20, reason: "他者を煽るような発言が多く、全体の雰囲気を悪化させた。" },
        脱線度: { score: 20, reason: "主題よりも対人批判に多くの発言を費やしていた。" },
        発言密度: { score: 85, reason: "発言数は非常に多く、議論の一方の中心にいた。" },
        ファシリ度: { score: 10, reason: "ファシリテーションの意識は見られなかった。" },
      },
      meetingStyleAttribute: "批評型（ENTJ風）",
      overallScore: 40.0,
    },
    {
      speaker: "度し難い酷使ローテ伯爵",
      metrics: {
        貢献度: { score: 70, reason: "議論に論理的・客観的視点を織り込んだ。" },
        一貫性: { score: 85, reason: "客観性と論理性を一貫して強調。" },
        協調性: { score: 75, reason: "他者の発言を受けてコメントし、関与度も高かった。" },
        脱線度: { score: 70, reason: "雑談化せず主題内で発言していた。" },
        発言密度: { score: 65, reason: "的確なタイミングで発言。" },
        ファシリ度: { score: 30, reason: "議論収束への小さな貢献があった。" },
      },
      meetingStyleAttribute: "分析重視（INTP風）",
      overallScore: 65.8,
    },
  ],
  teamAnalysis: {
    metrics: {
      目的達成度: { score: 60, reason: "案件評価と単価感覚の共有はあったが、明確な結論や合意は形成されなかった。" },
      議論の建設性: { score: 55, reason: "一部でスキルや提案の共有があったが、個人攻撃的な場面が議論を阻害した。" },
      参加率のバランス: { score: 50, reason: "発言は一部メンバーに集中し、消極的参加者も見られた。" },
      ファシリテーションの機能: { score: 30, reason: "まとめ役が不在で、対立時も整理や収束が行われなかった。" },
      // biome-ignore lint/style/useNamingConvention: <explanation>
      集中度・一貫性: { score: 45, reason: "途中から対立や雑談に脱線し、主題が薄れていった。" },
      チームの雰囲気: { score: 40, reason: "冗談や共感も見られたが、攻撃的な発言が雰囲気を損ねた。" },
      アクション明確度: { score: 20, reason: "ToDoや明確な次のアクションは定義されなかった。" },
    },
    overallScore: 42.9,
  },
} as const

export const App = () => {
  const [currentSpeaker, setCurrentSpeaker] = useState(0)
  const [showOverall, setShowOverall] = useState(false)
  const [animateScore, setAnimateScore] = useState(false)

  const currentData = showOverall ? null : meetingData.individualAnalysis[currentSpeaker]
  const teamData = meetingData.teamAnalysis

  // Prepare radar chart data
  const getRadarData = (metrics: Record<string, { score: number; reason: string }>) => {
    return Object.entries(metrics).map(([key, value]) => ({
      metric: key,
      score: value.score,
    }))
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setAnimateScore(true)
    const timer = setTimeout(() => setAnimateScore(false), 2000)
    return () => clearTimeout(timer)
  }, [currentSpeaker, showOverall])

  const getScoreColor = (score: number) => {
    if (score >= 80) {
      return "text-yellow-300"
    }
    if (score >= 60) {
      return "text-green-400"
    }
    if (score >= 40) {
      return "text-orange-400"
    }
    return "text-red-400"
  }

  const getScoreGradient = (score: number) => {
    if (score >= 80) {
      return "from-yellow-400 to-yellow-600"
    }
    if (score >= 60) {
      return "from-green-400 to-green-600"
    }
    if (score >= 40) {
      return "from-orange-400 to-orange-600"
    }
    return "from-red-400 to-red-600"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-cyan-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-l from-pink-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Header */}
      <div className="relative z-10 text-center py-8">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
          🎤 AI会議採点システム 🎤
        </h1>
        <div className="mt-4 text-2xl text-cyan-300 animate-bounce">★ 精密採点結果発表 ★</div>
      </div>

      {/* Navigation */}
      <div className="relative z-10 flex justify-center mb-8">
        <div className="bg-black/50 backdrop-blur-sm rounded-full p-2 border-2 border-cyan-400">
          <button
            className={`px-6 py-3 rounded-full transition-all ${showOverall ? "text-cyan-300 hover:bg-white/10" : "bg-gradient-to-r from-cyan-400 to-purple-400 text-black font-bold"}`}
            onClick={() => setShowOverall(false)}
            type="button"
          >
            個人スコア
          </button>
          <button
            className={`px-6 py-3 rounded-full transition-all ${showOverall ? "bg-gradient-to-r from-cyan-400 to-purple-400 text-black font-bold" : "text-cyan-300 hover:bg-white/10"}`}
            onClick={() => setShowOverall(true)}
            type="button"
          >
            チーム総合
          </button>
        </div>
      </div>

      {showOverall ? (
        /* Team Overall Score */
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

            {/* Team Radar Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-black/30 rounded-2xl p-6">
                <h3 className="text-2xl font-bold text-cyan-300 mb-4 text-center">📊 チーム分析チャート</h3>
                <ResponsiveContainer height={300} width="100%">
                  <RadarChart data={getRadarData(teamData.metrics)}>
                    <PolarGrid stroke="#64748b" />
                    <PolarAngleAxis dataKey="metric" tick={{ fontSize: 12, fill: "#94a3b8" }} />
                    <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 10, fill: "#64748b" }} />
                    <Radar
                      dataKey="score"
                      fill="#00d4aa"
                      fillOpacity={0.3}
                      name="チームスコア"
                      stroke="#00d4aa"
                      strokeWidth={3}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-cyan-300 mb-4">📈 詳細スコア</h3>
                {Object.entries(teamData.metrics).map(([key, value]) => (
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
            </div>
          </div>
        </div>
      ) : (
        /* Individual Speaker Score */
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          {/* Speaker Selection */}
          <div className="flex justify-center mb-8 space-x-4">
            {meetingData.individualAnalysis.map((speaker, index) => (
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
                {/* Radar Chart */}
                <div className="bg-black/30 rounded-2xl p-6">
                  <h3 className="text-2xl font-bold text-cyan-300 mb-4 text-center">📊 能力分析チャート</h3>
                  <ResponsiveContainer height={300} width="100%">
                    <RadarChart data={getRadarData(currentData.metrics)}>
                      <PolarGrid stroke="#64748b" />
                      <PolarAngleAxis dataKey="metric" tick={{ fontSize: 12, fill: "#94a3b8" }} />
                      <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 10, fill: "#64748b" }} />
                      <Radar
                        dataKey="score"
                        fill="#ff6b9d"
                        fillOpacity={0.3}
                        name={currentData?.speaker}
                        stroke="#ff6b9d"
                        strokeWidth={3}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                {/* Detailed Metrics */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-cyan-300 mb-4">📈 詳細スコア</h3>
                  {Object.entries(currentData?.metrics ?? {}).map(([key, value]) => (
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
              </div>
            )}
          </div>
        </div>
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
            type="button"
          >
            🎵 もう一度
          </button>
        </div>
      </div>
    </div>
  )
}
