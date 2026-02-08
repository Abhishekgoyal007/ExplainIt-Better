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
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisData | undefined>(undefined);

  console.log("[v0] Page rendered, hasSubmitted:", hasSubmitted, "isLoading:", isLoading);

  const handleSubmit = async () => {
    if (!idea.trim()) {
      setError("Please enter your idea or pitch before analyzing.");
      return;
    }
    setError(null);
    setHasSubmitted(true);
    setIsLoading(true);
    setResult(undefined);

    try {
      console.log("[v0] Submitting idea to API");
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea: idea.trim() }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No response body");

      const decoder = new TextDecoder();
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        fullText += decoder.decode(value, { stream: true });

        try {
          const parsed = JSON.parse(fullText);
          console.log("[v0] Parsed partial result:", Object.keys(parsed));
          setResult(parsed);
        } catch {
          // Still accumulating JSON, not yet parseable
        }
      }

      // Final parse
      try {
        const finalResult = JSON.parse(fullText);
        console.log("[v0] Final result:", Object.keys(finalResult));
        setResult(finalResult);
      } catch (e) {
        console.log("[v0] Failed to parse final result:", fullText.slice(0, 200));
      }
    } catch (err) {
      console.error("[v0] API call failed:", err);
      setError("Something went wrong. Please try again.");
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
          <ResultsPanel data={result} isLoading={isLoading} />
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
