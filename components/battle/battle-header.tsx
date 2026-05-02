"use client"

import { useEffect, useState } from "react"
import { Radio, Clock, Flag, Swords, Hash } from "lucide-react"

export function BattleHeader() {
  // Ticking timer for visual interest (demo only)
  const [seconds, setSeconds] = useState(14 * 60 + 32)
  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000)
    return () => clearInterval(id)
  }, [])

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0")
  const ss = String(seconds % 60).padStart(2, "0")
  const urgent = seconds < 120

  return (
    <div className="relative overflow-hidden border border-line/80 bg-panel/70 bl-glass">
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-30" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon/70 to-transparent" />

      <div className="relative flex flex-wrap items-center gap-6 px-5 py-4 md:px-7">
        {/* Battle ID + live */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="relative inline-flex h-2.5 w-2.5">
              <span className="absolute inset-0 rounded-full bg-blood/60 blur-[3px]" />
              <span className="relative h-2.5 w-2.5 rounded-full bg-blood bl-flicker shadow-[0_0_12px_#ff3355]" />
            </span>
            <span className="font-display text-[11px] font-bold tracking-[0.3em] text-blood">
              LIVE
            </span>
          </div>
          <div className="h-6 w-px bg-line/70" />
          <div className="flex items-center gap-2 text-text-dim">
            <Hash className="h-3.5 w-3.5" />
            <span className="font-mono text-[12px] tracking-[0.18em] text-text">
              BL-A7X-4429
            </span>
          </div>
        </div>

        {/* Match type */}
        <div className="hidden items-center gap-2 md:flex">
          <Swords className="h-4 w-4 text-neon" />
          <span className="font-display text-[11px] font-bold tracking-[0.24em] text-text">
            DUO BATTLE
          </span>
          <span className="text-text-mute">/</span>
          <span className="font-mono text-[11px] tracking-[0.14em] text-text-dim">
            BEST OF 5
          </span>
        </div>

        {/* Timer */}
        <div className="ml-auto flex items-center gap-3">
          <Clock className={`h-4 w-4 ${urgent ? "text-blood" : "text-neon"}`} />
          <div className="flex flex-col items-end leading-none">
            <span className="font-display text-[9px] font-bold tracking-[0.3em] text-text-mute">
              ROUND TIMER
            </span>
            <span
              className={`font-mono text-[22px] font-bold tabular-nums ${
                urgent ? "text-blood text-glow-ember" : "text-neon text-glow"
              }`}
            >
              {mm}:{ss}
            </span>
          </div>
        </div>

        {/* Surrender */}
        <button
          type="button"
          className="group inline-flex items-center gap-2 border border-blood/40 bg-blood/10 px-3.5 py-2 font-display text-[11px] font-bold tracking-[0.18em] text-blood transition hover:bg-blood/20 hover:shadow-[0_0_24px_rgba(255,51,85,0.35)] bl-clip-chevron"
        >
          <Flag className="h-3.5 w-3.5" />
          SURRENDER
        </button>

        {/* Spectators */}
        <div className="hidden items-center gap-2 border border-line/70 bg-void/40 px-3 py-1.5 md:flex bl-clip-chevron">
          <Radio className="h-3.5 w-3.5 text-neon" />
          <span className="font-mono text-[11px] text-text">
            <span className="text-neon">1,284</span> watching
          </span>
        </div>
      </div>
    </div>
  )
}
