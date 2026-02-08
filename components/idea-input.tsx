"use client";

import React from "react";
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
          placeholder="Describe your startup idea, product, or project..."
          rows={7}
          className="w-full resize-none rounded-xl border border-border/40 bg-input placeholder:text-muted-foreground/60 px-5 py-4 text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent leading-relaxed font-sans text-base transition-all"
          disabled={isLoading}
        />
      </div>
      <button
        type="submit"
        disabled={isLoading || !value.trim()}
        className="flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary/80 px-6 font-semibold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/30 hover:from-primary/95 hover:to-primary/75 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none active:scale-95"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Analyzing...</span>
          </>
        ) : (
          <>
            <span>Analyze my idea</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </button>
    </form>
  );
}
