"use client";

import { Navbar } from "@/components/navbar";

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-12">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-4">How It Works</h1>
            <p className="text-lg text-muted-foreground">
              Three simple steps to validate and sharpen your idea
            </p>
          </div>

          <div className="space-y-8">
            {/* Step 1 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg">
                  1
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground mb-2">Paste Your Idea</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Enter your pitch, product description, or business idea. It can be as short as a few sentences or as detailed as a full paragraph. The more specific, the better the analysis.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg">
                  2
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground mb-2">AI Analyzes in 4 Dimensions</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our AI evaluates your idea across clarity, market validation, competitive context, and pitch readiness. You get instant feedback on each dimension with actionable suggestions.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg">
                  3
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground mb-2">Iterate & Improve</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Use the feedback to refine your pitch. Resubmit and watch your clarity score and market positioning improve. Each iteration makes your idea stronger.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-8 space-y-4">
            <h2 className="text-xl font-bold text-foreground">The Four Dimensions</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  Clarity Check
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Measures if your idea is understandable. We score clarity (0-100), identify unclear points, and provide a rewritten version for reference.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  Idea Validation
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Evaluates market fit and uniqueness. We assess similarity to existing solutions, market crowdedness (low/medium/high), and your differentiation.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  Competitive Context
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Identifies 3-5 relevant competitors and describes how your idea compares. Understand your market landscape.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  Pitch Readiness
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Generates 5-7 tough questions investors or critics might ask. Prepare your answers before your real pitch.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-primary/10 border border-primary/20 rounded-lg p-8">
            <h2 className="text-lg font-bold text-foreground mb-2">💡 Pro Tips</h2>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li className="flex gap-2">
                <span>•</span>
                <span>Be specific about your target customer, problem, and solution</span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span>Include key metrics or insights if available</span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span>Refine and resubmit based on feedback for even better results</span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span>Use this as a starting point, not a replacement for real user feedback</span>
              </li>
            </ul>
          </div>

          <div className="pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Ready to validate your idea? <a href="/" className="text-primary hover:underline">Get started here</a>.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
