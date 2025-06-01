import json
import os
import logging
import openai

# === ロギング設定 ===
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S"
)
logger = logging.getLogger(__name__)
openai.api_key = os.getenv("OPENAI_API_KEY")

CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "x-api-key, Content-Type, Authorization"
}

def lambda_handler(event, context):
    if event["requestContext"]["http"]["method"] == "OPTIONS":
        print("OPTIONS")
        return {
            "statusCode": 200,
            "headers": CORS_HEADERS
        }

    if "body" not in event or event["body"] is None:
        print("body not in event:", event)
        return {
            "statusCode": 400,
            "headers": {
                "Content-Type": "application/json; charset=utf-8",
                **CORS_HEADERS
            },
            "body": json.dumps({"error": "'body' フィールドが必要です"}, ensure_ascii=False)
        }
    body = event["body"]
    if isinstance(body, str):
        try:
            body = json.loads(body)
        except json.JSONDecodeError:
            print("json.JSONDecodeError", body)
            return {
                "statusCode": 400,
                "headers": {
                    "Content-Type": "application/json; charset=utf-8",
                    **CORS_HEADERS
                },
                "body": json.dumps({"error": "リクエストボディが不正なJSONです"}, ensure_ascii=False)
            }
    elif not isinstance(body, dict):
        print("body is not a dict:", body)
        return {
            "statusCode": 400,
            "headers": {
                "Content-Type": "application/json; charset=utf-8",
                **CORS_HEADERS
            },
            "body": json.dumps({"error": "リクエストボディはJSONオブジェクトである必要があります"}, ensure_ascii=False)
        }
    text = body.get("text")
    logger.info(f"text:{text}")
    print(f"text:{text}")
    if not isinstance(text, str) or text.strip() == "":
        print("text is not a string:", text, body)
        return {
            "statusCode": 400,
            "headers": {
                "Content-Type": "application/json; charset=utf-8",
                **CORS_HEADERS
            },
            "body": json.dumps({"error": "'text' フィールド（空でない文字列）が必要です"}, ensure_ascii=False)
        }
    try:
        response = openai.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": 
                    "会議分析結果を JSON 形式で返してください。\n"
                    "個別分析（individualAnalysis）では、以下6つの評価指標を必ず出力してください：\n"
                    " - 貢献度\n"
                    " - 一貫性\n"
                    " - 協調性\n"
                    " - 脱線度\n"
                    " - 発言密度\n"
                    " - ファシリ度\n"
                    "各指標には 0〜100 の score と、その根拠を説明する reason を含めてください。\n"
                    "また、チーム分析（teamAnalysis）では以下6つの評価指標を必ず出力してください：\n"
                    " - 目的達成度\n"
                    " - 議論の建設性\n"
                    " - 参加率のバランス\n"
                    " - ファシリテーションの機能\n"
                    " - 集中度・一貫性\n"
                    " - チームの雰囲気\n"
                    " - アクション明確度\n"
                    "こちらも各指標に score（0〜100）と reason を含めてください。\n"
                    "JSONで出力されるValueのうち、文字列のものは全て日本語にしてください\n"
                    "必ずすべての発言者に対して individualAnalysis を返してください。\n"
                    "会話に一度でも発言した参加者は、短い発言であってもすべて評価対象としてください。\n"
                    "特定の参加者を省略したり、人数を減らすことは絶対に避けてください。\n"
                    "スピーカー数と返却された individualAnalysis の件数が一致するよう厳密に出力してください。\n"
                    "Please output strictly in the JSON format described in the function schema.\n Do not place any of the following keys inside 'metrics': 'goodPointsComment', 'improvementSuggestions', or 'meetingStyleAttribute'.\n Each of these must be placed at the top level of the individual object, outside the 'metrics' object."
                },
                {"role": "user", "content": text}
            ],
            functions=[
                {
                    "name": "analyze_meeting_participants",
                    "description": "会議の文字起こしを解析し、参加者ごとにスコアやコメントを含む individualAnalysis 配列を返す関数です。",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "individualAnalysis": {
                                "type": "array",
                                "items": {
                                    "type": "object",
                                    "properties": {
                                        "speaker": {
                                            "type": "string",
                                            "description": "発言者の名前"
                                        },
                                        "speakerReview": {
                                            "type": "string",
                                            "description": "発言者の総評"
                                        },
                                        "metrics": {
                                            "type": "object",
                                            "properties": {
                                                "貢献度": {
                                                    "type": "object",
                                                    "properties": {
                                                        "score": { "type": "integer", "minimum": 0, "maximum": 100 },
                                                        "reason": { "type": "string" }
                                                    }
                                                },
                                                "一貫性": {
                                                    "type": "object",
                                                    "properties": {
                                                        "score": { "type": "integer", "minimum": 0, "maximum": 100 },
                                                        "reason": { "type": "string" }
                                                    }
                                                },
                                                "協調性": {
                                                    "type": "object",
                                                    "properties": {
                                                        "score": { "type": "integer", "minimum": 0, "maximum": 100 },
                                                        "reason": { "type": "string" }
                                                    }
                                                },
                                                "脱線度": {
                                                    "type": "object",
                                                    "properties": {
                                                        "score": { 
                                                            "type": "integer", 
                                                            "minimum": 0, 
                                                            "maximum": 100 
                                                        },
                                                        "reason": { "type": 'string' }
                                                    }
                                                },
                                                "発言密度": {
                                                    "type": "object",
                                                    "properties": {
                                                        "score": { "type": "integer", "minimum": 0, "maximum": 100 },
                                                        "reason": { "type": "string" }
                                                    }
                                                },
                                                "ファシリ度": {
                                                    "type": "object",
                                                    "properties": {
                                                        "score": { "type": "integer", "minimum": 0, "maximum": 100 },
                                                        "reason": { "type": "string" }
                                                    }
                                                }
                                            },
                                            "required": ["貢献度", "一貫性", "協調性", "脱線度", "発言密度", "ファシリ度"]
                                        },
                                        "goodPointsComment": {
                                            "type": "string",
                                            "description": "良い点に関するコメント"
                                        },
                                        "improvementSuggestions": {
                                            "type": "string",
                                            "description": "改善点に関するコメント"
                                        },
                                        "meetingStyleAttribute": {
                                            "type": "string",
                                            "description": "会議スタイルの属性（例：自己表現重視、論理的思考重視など）"
                                        }
                                    },
                                    "required": ["speaker", "speakerReview", "metrics", "goodPointsComment", "improvementSuggestions", "meetingStyleAttribute"]
                                }
                            },
                "teamAnalysis": {
                    "type": "object",
                    "properties": {
                        "metrics": {
                            "type": "object",
                            "properties": {
                                "目的達成度": {
                                    "type": "object",
                                    "properties": {
                                        "score": { "type": "integer", "minimum": 0, "maximum": 100 },
                                        "reason": { "type": "string" }
                                    }
                                },
                                "議論の建設性": {
                                    "type": "object",
                                    "properties": {
                                        "score": { "type": "integer", "minimum": 0, "maximum": 100 },
                                        "reason": { "type": "string" }
                                    }
                                },
                                "参加率のバランス": {
                                    "type": "object",
                                    "properties": {
                                        "score": { "type": "integer", "minimum": 0, "maximum": 100 },
                                        "reason": { "type": "string" }
                                    }
                                },
                                "ファシリテーションの機能": {
                                    "type": "object",
                                    "properties": {
                                        "score": { "type": "integer", "minimum": 0, "maximum": 100 },
                                        "reason": { "type": "string" }
                                    }
                                },
                                "集中度・一貫性": {
                                    "type": "object",
                                    "properties": {
                                        "score": { "type": "integer", "minimum": 0, "maximum": 100 },
                                        "reason": { "type": "string" }
                                    }
                                },
                                "チームの雰囲気": {
                                    "type": "object",
                                    "properties": {
                                        "score": { "type": "integer", "minimum": 0, "maximum": 100 },
                                        "reason": { "type": "string" }
                                    }
                                },
                                "アクション明確度": {
                                    "type": "object",
                                    "properties": {
                                        "score": { "type": "integer", "minimum": 0, "maximum": 100 },
                                        "reason": { "type": "string" }
                                    }
                                }
                            },
                            "required": [
                                "目的達成度",
                                "議論の建設性",
                                "参加率のバランス",
                                "ファシリテーションの機能",
                                "集中度・一貫性",
                                "チームの雰囲気",
                                "アクション明確度"
                            ]
                        },
                        "goodPointsComment": {
                            "type": "string",
                            "description": "チーム全体としての良い点コメント"
                        },
                        "improvementSuggestions": {
                            "type": "string",
                            "description": "チーム全体としての改善提案コメント"
                        }
                    },
                    "required": ["metrics", "goodPointsComment", "improvementSuggestions"]
                }
            },
            "required": ["individualAnalysis", "teamAnalysis"]
        }
    }
],
            function_call={"name": "analyze_meeting_participants"},
            temperature=0
        )

        choice = response.choices[0].message
        if hasattr(choice, "function_call") and choice.function_call is not None:
            generated_json_str = choice.function_call.arguments
        else:
            generated_json_str = choice.content
        if generated_json_str is None:
            raise ValueError("OpenAI から JSON 文字列が返ってきませんでした。")
        import re
        match = re.search(r"```(?:json)?\s*(\{.*\})\s*```", generated_json_str, re.DOTALL)
        if match:
            cleaned = match.group(1)
        else:
            cleaned = generated_json_str.strip()
        analysis_result = json.loads(cleaned)
        analysis_result_data = json.dumps(analysis_result, ensure_ascii=False)
        logger.info(f"analysis_result: {analysis_result_data}")
        print(f"analysis_result: {analysis_result_data}")
    except Exception as e:
        print("Exception", e)
        return {
            "statusCode": 500,
            "headers": {
                "Content-Type": "application/json; charset=utf-8",
                **CORS_HEADERS
            },
            "body": json.dumps(
                {
                    "error": f"OpenAI API 呼び出しに失敗しました: {str(e)}",
                    "raw_output": generated_json_str if 'generated_json_str' in locals() else None
                },
                ensure_ascii=False
            )
        }
    
    # --- 脱線度→非脱線度への変換処理 ---
    try:
        result_obj = json.loads(analysis_result_data)
        # individualAnalysis の各 metrics
        for indiv in result_obj.get("individualAnalysis", []):
            metrics = indiv.get("metrics", {})
            if "脱線度" in metrics:
                old = metrics.pop("脱線度")
                new_score = 100 - int(old.get("score", 0))
                metrics["非脱線度"] = {"score": new_score, "reason": old.get("reason", "")}
        analysis_result_data_edited = json.dumps(result_obj, ensure_ascii=False)  # 変換後の内容を反映
    except Exception as e:
        logger.warning(f"脱線度→非脱線度変換処理で例外: {e}")
    
    
    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json; charset=utf-8",
            **CORS_HEADERS
        },
        "body": analysis_result_data_edited
    }
