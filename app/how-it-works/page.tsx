"use client";

import { Navbar } from "@/components/navbar";
import { CheckCircle, Zap, Target, Lightbulb, Brain, Trophy } from "lucide-react";

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-16">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent leading-tight">
              How It Works
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to validate and sharpen your idea with AI-powered analysis
            </p>
          </div>

          {/* Three Steps */}
          <div className="space-y-6">
            {[
              {
                step: 1,
                title: "Paste Your Idea",
                desc: "Enter your pitch, product description, or business idea. It can be a few sentences or a full paragraph.",
                icon: Lightbulb,
              },
              {
                step: 2,
                title: "AI Analyzes in 4 Dimensions",
                desc: "Our AI evaluates clarity, market validation, competition, and pitch readiness. Instant feedback on each.",
                icon: Brain,
              },
              {
                step: 3,
                title: "Iterate & Improve",
                desc: "Use the feedback to refine your pitch. Resubmit and watch your scores improve with each iteration.",
                icon: Zap,
              },
            ].map(({ step, title, desc, icon: Icon }) => (
              <div key={step} className="group glass-effect rounded-2xl p-8 border border-border/40 hover:border-primary/20 transition-all hover:shadow-lg hover:shadow-primary/5">
                <div className="flex gap-6">
                  <div className="flex items-center justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/60 text-primary-foreground font-bold text-xl flex-shrink-0">
                      {step}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-3">
                      <Icon className="h-6 w-6 text-primary" />
                      {title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Four Dimensions */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-foreground">The Four Analysis Dimensions</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: Target,
                  title: "Clarity Check",
                  points: ["Measures understandability", "Scores clarity 0-100", "Identifies unclear points", "Provides rewritten version"],
                },
                {
                  icon: Trophy,
                  title: "Idea Validation",
                  points: ["Evaluates market fit", "Assesses uniqueness", "Measures crowdedness", "Highlights differentiation"],
                },
                {
                  icon: Zap,
                  title: "Competitive Context",
                  points: ["Identifies 3-5 competitors", "Describes comparisons", "Maps market landscape", "Finds your positioning"],
                },
                {
                  icon: Brain,
                  title: "Pitch Readiness",
                  points: ["Generates tough questions", "Prepares for investors", "Anticipates objections", "Strengthens your answer"],
                },
              ].map(({ icon: Icon, title, points }) => (
                <div key={title} className="glass-effect rounded-xl p-6 border border-border/40">
                  <div className="flex items-start gap-4 mb-4">
                    <Icon className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <h3 className="text-xl font-bold text-foreground">{title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {points.map((point) => (
                      <li key={point} className="flex items-start gap-2 text-muted-foreground text-sm">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Pro Tips */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Lightbulb className="h-6 w-6 text-primary" />
              Pro Tips
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Be specific about your target customer, problem, and solution",
                "Include key metrics or insights if available",
                "Refine and resubmit based on feedback for even better results",
                "Use this as a starting point, not a replacement for real user feedback",
              ].map((tip) => (
                <li key={tip} className="flex gap-3 text-foreground">
                  <span className="text-primary text-lg leading-none">✓</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="glass-effect rounded-2xl p-12 border border-border/40 text-center space-y-4">
            <p className="text-lg font-semibold text-foreground">
              Ready to validate your idea?
            </p>
            <a href="/" className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground hover:shadow-lg hover:shadow-primary/30 transition-all">
              Start Analyzing Now
              <Zap className="h-4 w-4" />
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
