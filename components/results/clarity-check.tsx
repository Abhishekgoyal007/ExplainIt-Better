import { Eye, AlertCircle, FileText } from "lucide-react";

interface ClarityCheckProps {
  data?: {
    score?: number;
    targetAudience?: string;
    unclearPoints?: string[];
    rewrittenVersion?: string;
  };
  isLoading?: boolean;
}

function ScoreBar({ score }: { score: number }) {
  const percentage = (score / 10) * 100;
  const getColor = () => {
    if (score >= 8) return "bg-emerald-500";
    if (score >= 5) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex-1 h-3 rounded-full bg-secondary overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out ${getColor()}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-2xl font-bold text-foreground tabular-nums">
        {score}
        <span className="text-sm text-muted-foreground font-normal">/10</span>
      </span>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="h-3 bg-secondary/40 rounded-full w-full animate-pulse"></div>
      <div className="h-4 bg-secondary/40 rounded w-2/3 animate-pulse"></div>
      <div className="space-y-2">
        <div className="h-3 bg-secondary/40 rounded animate-pulse"></div>
        <div className="h-3 bg-secondary/40 rounded w-5/6 animate-pulse"></div>
      </div>
    </div>
  );
}

export function ClarityCheck({ data, isLoading }: ClarityCheckProps) {
  return (
    <section className="flex flex-col gap-6 rounded-xl border border-border bg-card p-6">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
          <Eye className="h-4 w-4 text-primary" />
        </div>
        <h2 className="text-lg font-semibold text-foreground">
          Clarity Check
        </h2>
      </div>

      {isLoading ? (
        <LoadingSkeleton />
      ) : !data ? null : (
        <>
          {data.score !== undefined && <ScoreBar score={data.score} />}

          {data.targetAudience && (
            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Target Audience
              </span>
              <p className="text-foreground leading-relaxed">
                {data.targetAudience}
              </p>
            </div>
          )}

          {data.unclearPoints && data.unclearPoints.length > 0 && (
            <div className="flex flex-col gap-3">
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                {"What's Unclear or Missing"}
              </span>
              <ul className="flex flex-col gap-2">
                {data.unclearPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                    <span className="text-foreground leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {data.rewrittenVersion && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  Clearer Version
                </span>
              </div>
              <blockquote className="border-l-2 border-primary/40 pl-4 text-foreground leading-relaxed italic">
                {data.rewrittenVersion}
              </blockquote>
            </div>
          )}
        </>
      )}
    </section>
  );
}
