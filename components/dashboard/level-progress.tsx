import { Zap } from "lucide-react"

export function LevelProgress() {
  const pct = 62
  return (
    <div className="relative bl-glass p-6 overflow-hidden">
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-neon to-transparent" />

      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-neon/30 blur-lg" />
            <div className="relative flex h-12 w-12 items-center justify-center bg-gradient-to-br from-neon/20 to-electric/20 border border-neon/50 bl-clip-notch">
              <Zap className="h-5 w-5 text-neon" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display text-[10px] font-bold tracking-[0.3em] text-neon/80">
                RANK PROGRESS
              </span>
            </div>
            <h3 className="font-display text-3xl font-bold tracking-tight leading-none mt-1">
              Level <span className="text-neon text-glow">01</span>
            </h3>
            <p className="mt-1.5 font-mono text-[12px] text-text-dim">
              310 XP total
            </p>
          </div>
        </div>

        <div className="text-right">
          <div className="font-display text-5xl font-bold leading-none tabular-nums text-neon text-glow">
            {pct}%
          </div>
          <div className="mt-2 font-display text-[11px] font-bold tracking-[0.2em] text-text-dim">
            TO LEVEL 02
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-6 relative">
        <div className="h-3 bl-bar-track rounded-none overflow-hidden">
          <div
            className="relative h-full bl-shimmer"
            style={{ width: `${pct}%` }}
          >
            <div className="absolute inset-y-0 right-0 w-1 bg-white shadow-[0_0_16px_#ffffff,0_0_32px_#00f0ff]" />
          </div>
        </div>

        {/* tick marks */}
        <div className="absolute inset-0 flex items-center pointer-events-none">
          {[25, 50, 75].map((m) => (
            <div
              key={m}
              className="absolute h-3 w-px bg-void/80"
              style={{ left: `${m}%` }}
            />
          ))}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between font-mono text-[11px]">
        <span className="text-text-mute">CURRENT: <span className="text-neon">310 XP</span></span>
        <span className="text-text-mute">NEXT: <span className="text-neon">500 XP</span></span>
      </div>
    </div>
  )
}
