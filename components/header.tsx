import { Lightbulb } from "lucide-react";

export function Header() {
  return (
    <header className="flex flex-col items-center gap-4 text-center">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Lightbulb className="h-5 w-5 text-primary" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          ExplainIt Better
        </h1>
      </div>
      <p className="max-w-lg text-balance text-muted-foreground leading-relaxed">
        Explain your idea clearly, validate it against the real world, and
        prepare for the tough questions.
      </p>
    </header>
  );
}
