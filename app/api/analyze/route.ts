import { generateText } from "ai";
import { xai } from "@ai-sdk/xai";

export const maxDuration = 60;

const JSON_SCHEMA = `{
  "clarityCheck": {
    "score": <number 0-10>,
    "targetAudience": "<string>",
    "unclearPoints": ["<string>", ...],
    "rewrittenVersion": "<string 2-3 sentences>"
  },
  "ideaValidation": {
    "similarityAssessment": "<string>",
    "marketCrowdedness": "<low|medium|high>",
    "differentiationSummary": "<string one-line>"
  },
  "competitiveContext": {
    "competitors": [
      { "name": "<string>", "description": "<string one-line>" },
      ... (3 to 5 entries)
    ]
  },
  "pitchReadiness": {
    "questions": ["<string>", ... (5 to 7 entries)]
  }
}`;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const idea = body.idea;

    if (!idea || typeof idea !== "string") {
      return new Response(
        JSON.stringify({ error: "Missing idea" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const result = await generateText({
      model: xai("grok-3-mini-fast"),
      system: `You are a seasoned startup advisor and idea reviewer. Your job is to analyze ideas honestly and constructively.

Rules:
- Be direct, honest, and practical. No hype or marketing language.
- Assume the reader has no prior context about the idea.
- For competitive context, draw from your knowledge of publicly available products and startups.
- For pitch questions, think like a skeptical but fair investor or judge.
- Always err on the side of being helpful over being harsh.
- You MUST respond with ONLY valid JSON matching the schema below. No markdown, no explanation, no code fences. Just the raw JSON object.`,
      prompt: `Analyze the following idea or pitch thoroughly and return ONLY a JSON object matching this exact schema:

${JSON_SCHEMA}

Here is the idea to analyze:

"""
${idea}
"""

Remember: respond with ONLY the JSON object. No other text.`,
    });

    const text = result.text.trim();
    // Strip markdown code fences if the model wraps it
    const cleaned = text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "");
    const parsed = JSON.parse(cleaned);

    return new Response(JSON.stringify(parsed), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("[v0] API error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to analyze idea", details: (error as Error)?.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
