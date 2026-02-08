"use client";

import { Navbar } from "@/components/navbar";
import { Zap, Lightbulb, Users, Heart } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-16">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent leading-tight">
              About ExplainIt Better
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We're on a mission to help founders and innovators validate their ideas faster, communicate clearer, and pitch better.
            </p>
          </div>

          {/* Problem & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-effect rounded-2xl p-8 border border-border/40">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                  <Lightbulb className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-3">The Problem</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Great ideas get lost in unclear communication. Founders struggle to explain concepts concisely, validate market fit early, and anticipate investor questions.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-effect rounded-2xl p-8 border border-border/40">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-3">Our Solution</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    AI-powered analysis across clarity, validation, competition, and pitch readiness. Get instant, actionable feedback to transform rough ideas into compelling pitches.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Who It's For */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground">Who It's For</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: Users, title: "Founders", desc: "Pre-pitch idea validation and feedback" },
                { icon: Heart, title: "Students", desc: "Validate coursework and capstone projects" },
                { icon: Zap, title: "Entrepreneurs", desc: "Quick early-stage feedback loops" },
                { icon: Lightbulb, title: "Product Managers", desc: "Test feature concepts and positioning" },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="glass-effect rounded-xl p-6 border border-border/40 hover:border-primary/20 transition-colors">
                  <div className="flex items-start gap-3">
                    <Icon className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground">{title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Values */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { value: "Honest", desc: "Direct, constructive feedback without fluff" },
                { value: "Fast", desc: "Results in seconds, not weeks" },
                { value: "Accessible", desc: "Free and open to everyone" },
              ].map(({ value, desc }) => (
                <div key={value} className="text-center space-y-3">
                  <div className="text-4xl font-bold bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-transparent">
                    {value}
                  </div>
                  <p className="text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="glass-effect rounded-2xl p-12 border border-border/40 text-center space-y-4">
            <p className="text-lg font-semibold text-foreground">
              Ready to validate your idea?
            </p>
            <a href="/" className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground hover:shadow-lg hover:shadow-primary/30 transition-all">
              Get Started Now
              <Zap className="h-4 w-4" />
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
