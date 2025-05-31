import type { MeetingData } from "../data/meeting-data"
import { meetingData } from "../data/meeting-data"

export interface AnalyzeRequest {
  text: string
}

export interface AnalyzeResponse {
  success: boolean
  data: MeetingData
  error?: string
}

const API_BASE_URL = import.meta.env.VITE_ANALYZE_TEXT_API_URL || "http://localhost:3001/api"
const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API === "true" || !import.meta.env.VITE_ANALYZE_TEXT_API_URL

// Mock API for development/testing
const mockAnalyzeMeetingText = async (text: string): Promise<MeetingData> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // For demo purposes, return the sample data
  // In a real implementation, this would analyze the actual text
  console.log("Analyzing meeting text:", `${text.substring(0, 100)}...`)

  return meetingData
}

export const analyzeMeetingText = async (text: string): Promise<MeetingData> => {
  if (USE_MOCK_API) {
    return mockAnalyzeMeetingText(text)
  }

  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ body: { text: JSON.stringify({ text }) } }),
  })

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`)
  }

  const result: AnalyzeResponse = await response.json()
  console.log({ result })

  if (!result.success) {
    throw new Error(result.error || "Analysis failed")
  }

  return result.data
}
