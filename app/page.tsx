"use client";

import { useState } from "react";
import { useObject } from "@ai-sdk/react";
import { z } from "zod";
import { Header } from "@/components/header";
import { IdeaInput } from "@/components/idea-input";
import { ResultsPanel } from "@/components/results/results-panel";

const analysisSchema = z.object({
  clarityCheck: z.object({
    score: z.number(),
    targetAudience: z.string(),
    unclearPoints: z.array(z.string()),
    rewrittenVersion: z.string(),
  }),
  ideaValidation: z.object({
    similarityAssessment: z.string(),
    marketCrowdedness: z.enum(["low", "medium", "high"]),
    differentiationSummary: z.string(),
  }),
  competitiveContext: z.object({
    competitors: z.array(
      z.object({
        name: z.string(),
        description: z.string(),
      })
    ),
  }),
  pitchReadiness: z.object({
    questions: z.array(z.string()),
  }),
});

export default function Home() {
  const [idea, setIdea] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const { object, submit, isLoading, error } = useObject({
    api: "/api/analyze",
    schema: analysisSchema,
  });

  const handleSubmit = () => {
    if (!idea.trim()) {
      setValidationError("Please enter your idea or pitch before analyzing.");
      return;
    }
    setValidationError(null);
    setHasSubmitted(true);
    submit({ idea: idea.trim() });
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto flex w-full max-w-2xl flex-col gap-10 px-4 py-16 sm:px-6 sm:py-24">
        <Header />

        <div className="flex flex-col gap-2">
          <IdeaInput
            value={idea}
            onChange={(v) => {
              setIdea(v);
              if (validationError) setValidationError(null);
            }}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
          {validationError && (
            <p className="text-sm text-destructive" role="alert">
              {validationError}
            </p>
          )}
          {error && (
            <p className="text-sm text-destructive" role="alert">
              Something went wrong. Please try again.
            </p>
          )}
        </div>

        {hasSubmitted && (
          <ResultsPanel data={object ?? undefined} isLoading={isLoading} />
        )}

        {hasSubmitted && !isLoading && object && (
          <footer className="text-center">
            <p className="text-xs text-muted-foreground leading-relaxed">
              This analysis is based on publicly available information and AI
              interpretation. It is an early validation tool, not a definitive
              market assessment.
            </p>
          </footer>
        )}
      </main>
    </div>
  );
}
