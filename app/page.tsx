"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { IdeaInput } from "@/components/idea-input";
import { ResultsPanel } from "@/components/results/results-panel";

interface AnalysisData {
  clarityCheck?: {
    score?: number;
    targetAudience?: string;
    unclearPoints?: string[];
    rewrittenVersion?: string;
  };
  ideaValidation?: {
    similarityAssessment?: string;
    marketCrowdedness?: "low" | "medium" | "high";
    differentiationSummary?: string;
  };
  competitiveContext?: {
    competitors?: Array<{
      name?: string;
      description?: string;
    }>;
  };
  pitchReadiness?: {
    questions?: string[];
  };
}

export default function Home() {
  const [idea, setIdea] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!idea.trim()) {
      setError("Please enter your idea or pitch before analyzing.");
      return;
    }

    setError(null);
    setHasSubmitted(true);
    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea: idea.trim() }),
      });

      const data = await response.json();
      console.log("[v0] Response status:", response.status, "data:", JSON.stringify(data).substring(0, 200));

      if (!response.ok) {
        throw new Error(data?.details || data?.error || "Failed to analyze");
      }

      setResult(data);
    } catch (err) {
      console.error("[v0] Client error:", err);
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
              if (error) setError(null);
            }}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
          {error && (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          )}
        </div>

        {hasSubmitted && (
          <ResultsPanel data={result ?? undefined} isLoading={isLoading} />
        )}

        {hasSubmitted && !isLoading && result && (
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
