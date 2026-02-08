"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { IdeaInput } from "@/components/idea-input";
import { ClarityCheck } from "@/components/results/clarity-check";
import { IdeaValidation } from "@/components/results/idea-validation";
import { CompetitiveContext } from "@/components/results/competitive-context";
import { PitchReadiness } from "@/components/results/pitch-readiness";

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

      if (!response.ok) {
        throw new Error(data?.details || data?.error || "Failed to analyze");
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left Column - Input Section (Sticky on larger screens) */}
          <div className="lg:sticky lg:top-20 lg:h-fit">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Analyze Your Idea</h2>
                <p className="text-sm text-muted-foreground">
                  Paste your pitch or idea description and get instant feedback on clarity, market fit, and readiness.
                </p>
              </div>

              <div className="flex flex-col gap-3">
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
                  <p className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg" role="alert">
                    {error}
                  </p>
                )}
              </div>

              {hasSubmitted && !isLoading && result && (
                <div className="pt-6 border-t border-border">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    This analysis is based on AI interpretation. It's an early validation tool, not a definitive market assessment.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Results Grid */}
          {hasSubmitted && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <ClarityCheck data={result?.clarityCheck} isLoading={isLoading} />
                <IdeaValidation data={result?.ideaValidation} isLoading={isLoading} />
              </div>
              <div className="grid grid-cols-1 gap-6">
                <CompetitiveContext data={result?.competitiveContext} isLoading={isLoading} />
                <PitchReadiness data={result?.pitchReadiness} isLoading={isLoading} />
              </div>
            </div>
          )}
        </div>

        {!hasSubmitted && (
          <div className="col-span-full text-center py-24">
            <p className="text-muted-foreground">Enter your idea above to get started</p>
          </div>
        )}
      </main>
    </div>
  );
}
