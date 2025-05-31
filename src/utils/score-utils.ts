export const getScoreColor = (score: number) => {
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

export const getScoreGradient = (score: number) => {
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

export const getRadarData = (metrics: Record<string, { readonly score: number; readonly reason: string }>) => {
  return Object.entries(metrics).map(([key, value]) => ({
    metric: key,
    score: value.score,
  }))
}
