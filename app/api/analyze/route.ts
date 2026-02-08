import { generateText, Output } from "ai";
import { z } from "zod";

export const maxDuration = 60;

const analysisSchema = z.object({
  clarityCheck: z.object({
    score: z.number().describe("Clarity score from 0 to 10"),
    targetAudience: z
      .string()
      .describe("Detected target audience for this idea"),
    unclearPoints: z
      .array(z.string())
      .describe("List of things that are unclear or missing from the pitch"),
    rewrittenVersion: z
      .string()
      .describe(
        "A clearer, simpler rewritten version of the idea in 2-3 sentences"
      ),
  }),
  ideaValidation: z.object({
    similarityAssessment: z
      .string()
      .describe(
        "High-level assessment of whether similar ideas or products already exist"
      ),
    marketCrowdedness: z
      .enum(["low", "medium", "high"])
      .describe("How crowded the space appears"),
    differentiationSummary: z
      .string()
      .describe("One-line summary of how this idea is different or not"),
  }),
  competitiveContext: z.object({
    competitors: z
      .array(
        z.object({
          name: z.string().describe("Name of the similar tool or product"),
          description: z
            .string()
            .describe("One-line description of what it focuses on"),
        })
      )
      .describe("3 to 5 similar tools, products, or approaches"),
  }),
  pitchReadiness: z.object({
    questions: z
      .array(z.string())
      .describe(
        "5 to 7 challenging questions that someone might ask while pitching this idea"
      ),
  }),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const idea = body.idea;

    if (!idea || typeof idea !== "string") {
      return Response.json({ error: "Missing idea" }, { status: 400 });
    }

    const result = await generateText({
      model: "openai/gpt-4o",
      system: `You are a seasoned startup advisor and idea reviewer. Your job is to analyze ideas honestly and constructively.

Rules:
- Be direct, honest, and practical. No hype or marketing language.
- Assume the reader has no prior context about the idea.
- For competitive context, draw from your knowledge of publicly available products and startups.
- For pitch questions, think like a skeptical but fair investor or judge.
- Always err on the side of being helpful over being harsh.`,
      prompt: `Analyze the following idea or pitch thoroughly:

"""
${idea}
"""

Provide a complete structured analysis covering clarity, validation, competitive landscape, and pitch readiness.`,
      output: Output.object({
        schema: analysisSchema,
      }),
    });

    return Response.json(result.object);
  } catch (error) {
    console.error("[v0] API error:", error);
    return Response.json(
      { error: "Failed to analyze idea" },
      { status: 500 }
    );
  }
}
