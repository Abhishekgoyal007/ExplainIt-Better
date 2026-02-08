import { BarChart3 } from "lucide-react";

interface CompetitiveContextProps {
  data?: {
    competitors?: Array<{
      name?: string;
      description?: string;
    }>;
  };
  isLoading?: boolean;
}

function LoadingSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="space-y-2">
          <div className="h-4 bg-secondary/40 rounded w-1/3 animate-pulse"></div>
          <div className="h-3 bg-secondary/40 rounded w-full animate-pulse"></div>
        </div>
      ))}
    </div>
  );
}

export function CompetitiveContext({ data, isLoading }: CompetitiveContextProps) {
  return (
    <section className="flex flex-col gap-6 rounded-xl border border-border bg-card p-6">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
          <BarChart3 className="h-4 w-4 text-primary" />
        </div>
        <h2 className="text-lg font-semibold text-foreground">
          Competitive Context
        </h2>
      </div>

      {isLoading ? (
        <LoadingSkeleton />
      ) : !data?.competitors || data.competitors.length === 0 ? null : (
        <div className="flex flex-col gap-3">
          {data.competitors.map((competitor, i) => (
            <div
              key={i}
              className="flex flex-col gap-1 rounded-lg border border-border/50 bg-secondary/30 px-4 py-3"
            >
              {competitor.name && (
                <span className="font-medium text-foreground">
                  {competitor.name}
                </span>
              )}
              {competitor.description && (
                <span className="text-sm text-muted-foreground leading-relaxed">
                  {competitor.description}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
