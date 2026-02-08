"use client";

import React from "react"

import { ArrowRight, Loader2 } from "lucide-react";

interface IdeaInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export function IdeaInput({
  value,
  onChange,
  onSubmit,
  isLoading,
}: IdeaInputProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste your idea or pitch here..."
          rows={6}
          className="w-full resize-none rounded-xl border border-border bg-input px-4 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 leading-relaxed font-sans text-base"
          disabled={isLoading}
        />
      </div>
      <button
        type="submit"
        disabled={isLoading || !value.trim()}
        className="flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 font-medium text-primary-foreground transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Analyzing your idea...</span>
          </>
        ) : (
          <>
            <span>Analyze my idea</span>
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}
