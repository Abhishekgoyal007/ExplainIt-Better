import { Search, Info } from "lucide-react";

interface IdeaValidationProps {
  data?: {
    similarityAssessment?: string;
    marketCrowdedness?: "low" | "medium" | "high";
    differentiationSummary?: string;
  };
}

function CrowdednessIndicator({
  level,
}: {
  level: "low" | "medium" | "high";
}) {
  const config = {
    low: {
      label: "Low",
      bars: 1,
      color: "bg-emerald-500",
      textColor: "text-emerald-500",
    },
    medium: {
      label: "Medium",
      bars: 2,
      color: "bg-amber-500",
      textColor: "text-amber-500",
    },
    high: {
      label: "High",
      bars: 3,
      color: "bg-red-500",
      textColor: "text-red-500",
    },
  };

  const { label, bars, color, textColor } = config[level];

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-end gap-1">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`w-2 rounded-sm transition-all ${i <= bars ? color : "bg-secondary"}`}
            style={{ height: `${8 + i * 6}px` }}
          />
        ))}
      </div>
      <span className={`text-sm font-semibold ${textColor}`}>{label}</span>
    </div>
  );
}

export function IdeaValidation({ data }: IdeaValidationProps) {
  if (!data) return null;

  return (
    <section className="flex flex-col gap-6 rounded-xl border border-border bg-card p-6">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
          <Search className="h-4 w-4 text-primary" />
        </div>
        <h2 className="text-lg font-semibold text-foreground">
          Idea Validation
        </h2>
      </div>

      {data.similarityAssessment && (
        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Similarity Assessment
          </span>
          <p className="text-foreground leading-relaxed">
            {data.similarityAssessment}
          </p>
        </div>
      )}

      {data.marketCrowdedness && (
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Market Crowdedness
          </span>
          <CrowdednessIndicator level={data.marketCrowdedness} />
        </div>
      )}

      {data.differentiationSummary && (
        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Differentiation
          </span>
          <p className="text-foreground leading-relaxed">
            {data.differentiationSummary}
          </p>
        </div>
      )}

      <div className="flex items-start gap-2 rounded-lg bg-secondary/50 px-3 py-2.5">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
        <p className="text-xs text-muted-foreground leading-relaxed">
          Based on publicly available information. This is an early, directional
          validation, not a definitive market assessment.
        </p>
      </div>
    </section>
  );
}
