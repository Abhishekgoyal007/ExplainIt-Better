import Link from "next/link";
import { Sparkles } from "lucide-react";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/50 backdrop-blur-xl supports-[backdrop-filter]:bg-background/30">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-2.5 hover:opacity-80 transition-opacity">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/70 text-primary-foreground font-bold text-sm shadow-lg shadow-primary/30 group-hover:shadow-primary/50 transition-shadow">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-base font-bold text-foreground">ExplainIt Better</h1>
            <p className="text-xs text-muted-foreground -mt-0.5">Validate ideas</p>
          </div>
        </Link>
        <div className="flex items-center gap-8">
          <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200">
            About
          </Link>
          <Link href="/how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200">
            How it works
          </Link>
          <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:opacity-95 transition-all duration-200 active:scale-95">
            Share Feedback
          </button>
        </div>
      </div>
    </nav>
  );
}
