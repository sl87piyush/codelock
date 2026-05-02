import { Target, BookOpen, ArrowRight } from "lucide-react"

export function StartSolving() {
  return (
    <div className="relative bl-glass overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-line/50">
        <div className="flex items-center gap-2">
          <Target className="h-4 w-4 text-neon" />
          <span className="font-display text-[11px] font-bold tracking-[0.28em] text-neon">
            START SOLVING
          </span>
        </div>
        <a
          href="#"
          className="inline-flex items-center gap-1 font-display text-[11px] font-bold tracking-[0.2em] text-text-dim hover:text-neon transition-colors"
        >
          BROWSE ALL
          <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>

      {/* Body */}
      <div className="relative p-8 text-center">
        <div className="absolute inset-0 bl-dots opacity-40" />

        <div className="relative flex flex-col items-center">
          <div className="relative">
            <div className="absolute inset-0 bg-neon/40 blur-2xl" />
            <div className="relative flex h-16 w-16 items-center justify-center bg-gradient-to-br from-neon/25 to-electric/20 border-2 border-neon/60 rounded-full bl-pulse">
              <Target className="h-7 w-7 text-neon" />
            </div>
          </div>

          <h3 className="mt-4 font-display text-2xl font-bold tracking-tight">
            Ready to <span className="text-neon text-glow">Dominate?</span>
          </h3>
          <p className="mt-2 max-w-md text-[13px] text-text-dim leading-relaxed">
            Follow your roadmap and solve challenges to earn XP and sharpen your edge. One weakness. One kill. One step closer to the top.
          </p>

          <button className="bl-btn-primary bl-pulse mt-6 px-6 py-3.5 text-[12px]">
            <BookOpen className="h-4 w-4" />
            CONTINUE LEARNING PATH
          </button>

          <div className="mt-5 flex items-center gap-4 font-mono text-[11px] text-text-mute">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-neon shadow-[0_0_6px_#00f0ff]" />
              ARRAYS
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-neon/60" />
              TWO POINTERS
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-neon/30" />
              6 MORE
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
