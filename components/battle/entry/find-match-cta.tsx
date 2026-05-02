"use client"

import { Swords } from "lucide-react"
import type { BattleMode, TeamFormat } from "@/components/battle/entry-data"

type Props = {
  mode: BattleMode
  format: TeamFormat
  regionCode: string
  onFindMatch: () => void
}

export function FindMatchCta({ mode, format, regionCode, onFindMatch }: Props) {
  return (
    <section className="relative overflow-hidden border border-line bg-panel/60 bl-glass">
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-25" />
      <div className="pointer-events-none absolute -left-20 top-0 h-full w-[420px] bg-neon/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-full w-[420px] bg-ember/5 blur-3xl" />

      <div className="relative flex flex-col items-center gap-5 px-5 py-6 md:flex-row md:items-center md:justify-between md:px-8">
        {/* Setup summary */}
        <div className="flex flex-col items-center gap-2 text-center md:items-start md:text-left">
          <span className="font-display text-[10px] font-bold tracking-[0.28em] text-text-mute">
            FINAL LOADOUT
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
            <span className="inline-flex items-center border border-neon/50 bg-neon/10 px-2.5 py-1 font-display text-[11px] font-bold tracking-[0.2em] text-neon bl-clip-chevron">
              {mode.name.toUpperCase()}
            </span>
            <span className="inline-flex items-center border border-line bg-void/60 px-2.5 py-1 font-display text-[11px] font-bold tracking-[0.2em] text-text">
              {format === "solo" ? "1 V 1" : "2 V 2"}
            </span>
            <span className="inline-flex items-center border border-line bg-void/60 px-2.5 py-1 font-mono text-[11px] font-bold tracking-[0.18em] text-text-dim">
              {regionCode}
            </span>
            <span
              className={`inline-flex items-center border px-2.5 py-1 font-display text-[11px] font-bold tracking-[0.2em] ${
                mode.ranked
                  ? "border-gold/50 bg-gold/10 text-gold"
                  : "border-line bg-void/60 text-text-dim"
              }`}
            >
              {mode.stakes}
            </span>
          </div>
        </div>

        {/* CTA */}
        <button
          type="button"
          onClick={onFindMatch}
          className="group relative inline-flex items-center gap-3 overflow-hidden border border-neon bg-neon px-8 py-4 font-display text-sm font-black tracking-[0.3em] text-void transition hover:bg-electric bl-clip-chevron shadow-[0_0_0_1px_rgba(0,240,255,0.35),0_0_50px_-6px_rgba(0,240,255,0.6)]"
        >
          {/* Pulse ring */}
          <span className="pointer-events-none absolute inset-0 -z-10 bl-pulse-ring rounded-none border border-neon/60" />
          {/* Light sweep on hover */}
          <span className="pointer-events-none absolute inset-0 bl-sweep" />

          <Swords className="h-4 w-4" />
          <span>FIND MATCH</span>
          <span className="ml-1 font-mono text-[10px] font-bold tracking-[0.2em] text-void/80">
            [ ENTER ]
          </span>
        </button>
      </div>
    </section>
  )
}
