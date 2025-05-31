import type { MeetingData } from "../data/meeting-data"
import { meetingData } from "../data/meeting-data"

export interface AnalyzeRequest {
  text: string
}

// This interface represents the raw response from the Lambda function
interface RawAnalyzeResponse {
  body: string // This is a JSON string containing MeetingData
  headers: { "Content-Type": string; "x-api-key": string }
  statusCode: number
}

// AnalyzeResponse now refers to the parsed MeetingData itself,
// which is what the rest of the app expects.
// The old AnalyzeResponse with success/data/error is removed as the new structure is different.

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

  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": import.meta.env.VITE_ANALYZE_TEXT_API_KEY,
    },
    body: JSON.stringify({ body: { text: JSON.stringify({ text }) } }),
  })

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`)
  }

  const result: RawAnalyzeResponse = await response.json()
  console.log({ result })

  if (result.statusCode !== 200) {
    // Attempt to parse error from body if available
    let errorMessage = "Analysis failed"
    try {
      const errorBody = JSON.parse(result.body)
      errorMessage = errorBody.message || errorBody.error || errorMessage
    } catch (e) {
      console.error("Failed to parse error from response body:", e)
    }
    throw new Error(errorMessage)
  }

  try {
    const meetingData: MeetingData = JSON.parse(result.body)
    return meetingData
  } catch (e) {
    console.error("Failed to parse meeting data from response body:", e)
    throw new Error("Failed to parse analysis data.")
  }
}
