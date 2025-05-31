import type { MeetingData } from "../data/meeting-data"
import { meetingData } from "../data/meeting-data"

export interface AnalyzeRequest {
  text: string
}

const API_BASE_URL = import.meta.env.VITE_ANALYZE_TEXT_API_URL || "http://localhost:3001/api"
const USE_MOCK_API =
  import.meta.env.VITE_USE_MOCK_API === "true" ||
  !(import.meta.env.VITE_ANALYZE_TEXT_API_URL && import.meta.env.VITE_ANALYZE_TEXT_API_KEY)

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
  const body = JSON.stringify({ text: JSON.stringify(text) })

  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": import.meta.env.VITE_ANALYZE_TEXT_API_KEY,
    },
    body,
  })
  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`)
  }

  try {
    const meetingData: MeetingData = await response.json()
    return meetingData
  } catch (e) {
    console.error("Failed to parse meeting data from response body:", e)
    throw new Error("Failed to parse analysis data.")
  }
}
