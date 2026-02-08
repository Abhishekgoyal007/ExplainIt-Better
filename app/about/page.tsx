"use client";

import { Navbar } from "@/components/navbar";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-12">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-4">About ExplainIt Better</h1>
            <p className="text-lg text-muted-foreground">
              An AI-powered tool that helps founders, students, and entrepreneurs validate and sharpen their ideas.
            </p>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-3">The Problem</h2>
              <p className="text-muted-foreground leading-relaxed">
                Great ideas often get lost in unclear communication. Founders struggle to explain their concepts concisely, validate market fit early, and anticipate investor questions. Without structured feedback, early-stage ideas remain rough and unconvincing.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-3">Our Solution</h2>
              <p className="text-muted-foreground leading-relaxed">
                ExplainIt Better uses advanced AI to analyze your pitch across four critical dimensions: clarity (is your idea understandable?), validation (does this solve a real problem?), competition (how does it fit in the market?), and pitch readiness (are you prepared for tough questions?). Get instant, actionable feedback.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-3">Who It's For</h2>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span><strong>Founders</strong> - Pre-pitch idea validation and feedback refinement</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span><strong>Students</strong> - Validate coursework ideas and capstone projects</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span><strong>Entrepreneurs</strong> - Quick early-stage feedback loops</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span><strong>Product Managers</strong> - Test new feature concepts and positioning</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-3">Our Values</h2>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span><strong>Honest</strong> - We give direct, constructive feedback</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span><strong>Fast</strong> - Get results in seconds, not weeks</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span><strong>Accessible</strong> - Free and open to everyone</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Built with care for early-stage founders and innovators. Powered by AI.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
