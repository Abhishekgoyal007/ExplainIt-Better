import { ClarityCheck } from "./clarity-check";
import { IdeaValidation } from "./idea-validation";
import { CompetitiveContext } from "./competitive-context";
import { PitchReadiness } from "./pitch-readiness";

interface AnalysisData {
  clarityCheck?: {
    score?: number;
    targetAudience?: string;
    unclearPoints?: string[];
    rewrittenVersion?: string;
  };
  ideaValidation?: {
    similarityAssessment?: string;
    marketCrowdedness?: "low" | "medium" | "high";
    differentiationSummary?: string;
  };
  competitiveContext?: {
    competitors?: Array<{
      name?: string;
      description?: string;
    }>;
  };
  pitchReadiness?: {
    questions?: string[];
  };
}

interface ResultsPanelProps {
  data: AnalysisData | undefined;
  isLoading: boolean;
}

function LoadingSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6"
        >
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 animate-pulse rounded-lg bg-secondary" />
            <div className="h-5 w-32 animate-pulse rounded bg-secondary" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-4 w-full animate-pulse rounded bg-secondary" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-secondary" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-secondary" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ResultsPanel({ data, isLoading }: ResultsPanelProps) {
  if (isLoading && !data) {
    return <LoadingSkeleton />;
  }

  if (!data) return null;

  const hasAnyData =
    data.clarityCheck ||
    data.ideaValidation ||
    data.competitiveContext ||
    data.pitchReadiness;

  if (!hasAnyData) return null;

  return (
    <div className="flex flex-col gap-6">
      <ClarityCheck data={data.clarityCheck} />
      <IdeaValidation data={data.ideaValidation} />
      <CompetitiveContext data={data.competitiveContext} />
      <PitchReadiness data={data.pitchReadiness} />
    </div>
  );
}
