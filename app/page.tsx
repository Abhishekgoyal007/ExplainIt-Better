"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { IdeaInput } from "@/components/idea-input";
import { ClarityCheck } from "@/components/results/clarity-check";
import { IdeaValidation } from "@/components/results/idea-validation";
import { CompetitiveContext } from "@/components/results/competitive-context";
import { PitchReadiness } from "@/components/results/pitch-readiness";
import { Zap } from "lucide-react";

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
      
      {!hasSubmitted ? (
        <>
          {/* Hero Section */}
          <section className="relative px-4 py-20 sm:px-6 lg:px-8 overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
            </div>

            <div className="relative mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2">
                <Zap className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground">AI-Powered Idea Validation</span>
              </div>
              
              <h1 className="mb-6 text-5xl sm:text-6xl font-bold bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent leading-tight">
                Validate Your Idea in Seconds
              </h1>
              
              <p className="mb-12 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Get instant AI-powered feedback on clarity, market fit, competition, and pitch readiness. Perfect for founders, students, and entrepreneurs.
              </p>

              <div className="space-y-6">
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
                    <p className="text-sm text-destructive bg-destructive/10 border border-destructive/20 p-3 rounded-lg" role="alert">
                      {error}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Feature highlights */}
            <div className="relative mx-auto max-w-4xl mt-20 grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: "Clarity Score", icon: "📊" },
                { label: "Market Analysis", icon: "🎯" },
                { label: "Competitors", icon: "🏆" },
                { label: "Pitch Q&A", icon: "💬" },
              ].map((feature) => (
                <div key={feature.label} className="glass-effect rounded-xl p-4 text-center">
                  <div className="text-2xl mb-2">{feature.icon}</div>
                  <p className="text-sm font-medium text-foreground">{feature.label}</p>
                </div>
              ))}
            </div>
          </section>
        </>
      ) : (
        <>
          {/* Analysis Section */}
          <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {/* Left Column - Sticky Input */}
              <div className="lg:sticky lg:top-20 lg:h-fit">
                <div className="glass-effect rounded-2xl p-6 space-y-6 border border-border/40">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">Your Idea</h2>
                    <p className="text-sm text-muted-foreground">
                      Analyzing and providing real-time feedback
                    </p>
                  </div>

                  <div className="bg-input/40 rounded-xl p-4 max-h-48 overflow-y-auto border border-border/40">
                    <p className="text-sm text-foreground leading-relaxed">{idea}</p>
                  </div>

                  <button
                    onClick={() => {
                      setHasSubmitted(false);
                      setResult(null);
                    }}
                    className="w-full py-2.5 px-4 rounded-lg border border-border bg-background text-foreground font-medium hover:bg-secondary/10 transition-colors"
                  >
                    Analyze Another Idea
                  </button>

                  <div className="pt-4 border-t border-border/40">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      This analysis is AI-generated and meant for early validation only. Use as a starting point for deeper research.
                    </p>
                  </div>
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
          </main>
        </>
      )}
    </div>
  );
}
