import { BookOpen, ArrowRight } from "lucide-react"

export function RecommendedStep() {
  return (
    <div className="relative bl-glass overflow-hidden group cursor-pointer">
      {/* Side stripe */}
      <div className="bl-side-stripe absolute inset-0 pointer-events-none" />

      {/* Diagonal stripes pattern */}
      <div className="absolute inset-0 bl-stripes opacity-50 pointer-events-none" />

      <div className="relative p-5 flex items-center gap-4">
        <div className="relative shrink-0">
          <div className="absolute inset-0 bg-neon/30 blur-md" />
          <div className="relative flex h-11 w-11 items-center justify-center bg-neon/10 border border-neon/40 bl-clip-notch">
            <BookOpen className="h-[18px] w-[18px] text-neon" />
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[10px] text-neon/70 tracking-wider">
              // NEXT_MOVE
            </span>
            <span className="h-px flex-1 bg-gradient-to-r from-neon/30 to-transparent" />
          </div>
          <h3 className="font-display text-[17px] font-bold text-text leading-tight">
            Recommended Next Step
          </h3>
          <p className="mt-1 text-[13px] text-text-dim leading-relaxed">
            Start with the first unlocked topic in your roadmap to begin building strong fundamentals.
          </p>
        </div>

        <div className="shrink-0 hidden sm:flex items-center gap-2 text-neon font-display text-[12px] font-bold tracking-[0.2em] opacity-80 group-hover:opacity-100 transition-opacity">
          BEGIN
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </div>
  )
}
