import { APIGatewayProxyHandler } from 'aws-lambda';

export const handler: APIGatewayProxyHandler = async (event) => {
  // --- モックとして送るリクエストデータ ---
  const mockRequest = {
    model: "gpt-4",
    prompt: "Hello, this is a mock prompt",
    max_tokens: 50,
  };

  // --- 本来はここで OpenAI SDK を使ってリクエストを投げる想定 ---
  // 例（本番実装時にコメント解除して利用してください）:
  // import OpenAI from "openai";
  // const openai = new OpenAI();
  // const response = await openai.chat.completions.create({
  //   model: mockRequest.model,
  //   messages: [{ role: "user", content: mockRequest.prompt }],
  //   max_tokens: mockRequest.max_tokens,
  // });
  //
  // ここではモックなので、以下のようにダミーのレスポンスを作成します。

  const mockResponse = {
    id: "mock-id-123",
    object: "chat.completion",
    created: Date.now(),
    model: mockRequest.model,
    choices: [
      {
        index: 0,
        message: {
          role: "assistant",
          content: "これはモックのレスポンスです。",
        },
        finish_reason: "stop",
      },
    ],
    usage: {
      prompt_tokens: 5,
      completion_tokens: 7,
      total_tokens: 12,
    },
  };

  // レスポンスをログに出力
  console.log("【OpenAI モックレスポンス】", JSON.stringify(mockResponse, null, 2));

  // API Gateway に返すレスポンス
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(mockResponse),
  };
};
