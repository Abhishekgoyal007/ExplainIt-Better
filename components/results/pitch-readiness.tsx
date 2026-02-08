import { MessageSquareWarning } from "lucide-react";

interface PitchReadinessProps {
  data?: {
    questions?: string[];
  };
}

export function PitchReadiness({ data }: PitchReadinessProps) {
  if (!data?.questions || data.questions.length === 0) return null;

  return (
    <section className="flex flex-col gap-6 rounded-xl border border-border bg-card p-6">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
          <MessageSquareWarning className="h-4 w-4 text-primary" />
        </div>
        <h2 className="text-lg font-semibold text-foreground">
          Pitch Readiness
        </h2>
      </div>

      <div className="flex flex-col gap-3">
        {data.questions.map((question, i) => (
          <div
            key={i}
            className="flex items-start gap-3 rounded-lg border border-border/50 bg-secondary/30 px-4 py-3"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
              {i + 1}
            </span>
            <p className="text-foreground leading-relaxed">{question}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
