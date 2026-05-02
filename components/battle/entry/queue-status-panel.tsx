"use client"

import { useEffect, useState } from "react"
import { Radar, X } from "lucide-react"
import type { BattleMode, TeamFormat } from "@/components/battle/entry-data"

type Props = {
  mode: BattleMode
  format: TeamFormat
  regionCode: string
  elapsedSeconds: number
  onCancel: () => void
}

export function QueueStatusPanel({
  mode,
  format,
  regionCode,
  elapsedSeconds,
  onCancel,
}: Props) {
  const mm = String(Math.floor(elapsedSeconds / 60)).padStart(2, "0")
  const ss = String(elapsedSeconds % 60).padStart(2, "0")

  // Cycling matchmaking status lines
  const [phraseIndex, setPhraseIndex] = useState(0)
  const phrases = [
    "SCANNING FOR RIVALS",
    "EVALUATING ELO RANGE",
    "BALANCING SQUADS",
    "VALIDATING INTEGRITY",
    "LOCKING LOBBY",
  ]
  useEffect(() => {
    const id = setInterval(() => {
      setPhraseIndex((i) => (i + 1) % phrases.length)
    }, 1400)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className="relative overflow-hidden border border-neon/50 bg-panel/70 bl-glass bl-corners">
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-25" />
      <div className="pointer-events-none absolute inset-0 bl-scanline opacity-40" />
      <div className="bl-side-stripe" />

      <div className="relative flex flex-col items-center gap-5 px-5 py-8 md:flex-row md:items-center md:gap-8 md:px-8 md:py-10">
        {/* Radar visual */}
        <div className="relative flex h-36 w-36 items-center justify-center md:h-44 md:w-44">
          {/* Expanding rings */}
          <span
            className="absolute inset-0 rounded-full border border-neon/50 bl-pulse-ring"
            style={{ animationDelay: "0s" }}
          />
          <span
            className="absolute inset-0 rounded-full border border-neon/40 bl-pulse-ring"
            style={{ animationDelay: "0.6s" }}
          />
          <span
            className="absolute inset-0 rounded-full border border-neon/30 bl-pulse-ring"
            style={{ animationDelay: "1.2s" }}
          />
          {/* Inner ring */}
          <span className="absolute inset-6 rounded-full border border-neon/70" />
          <span className="absolute inset-10 rounded-full border border-neon/50" />
          {/* Spinning sweep */}
          <span
            className="absolute inset-6 rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, rgba(0,240,255,0.45), transparent 40%)",
              animation: "bl-spin 2.4s linear infinite",
              maskImage: "radial-gradient(circle, transparent 55%, black 56%)",
              WebkitMaskImage: "radial-gradient(circle, transparent 55%, black 56%)",
            }}
          />
          {/* Center dot */}
          <Radar className="relative h-8 w-8 text-neon text-glow" />
        </div>

        {/* Info */}
        <div className="flex min-w-0 flex-1 flex-col items-center gap-3 text-center md:items-start md:text-left">
          <div className="flex items-center gap-2">
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon/70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-neon" />
            </span>
            <span className="font-display text-[10px] font-bold tracking-[0.28em] text-neon">
              MATCHMAKING IN PROGRESS
            </span>
          </div>

          <h3 className="font-display text-2xl font-black tracking-tight text-text md:text-3xl">
            <span className="bl-count-flicker">{phrases[phraseIndex]}</span>
            <span className="ml-1 inline-block w-4 text-neon">...</span>
          </h3>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 font-mono text-[11px] tracking-[0.14em] text-text-dim">
            <span>
              MODE: <span className="text-text">{mode.name.toUpperCase()}</span>
            </span>
            <span className="text-text-mute">·</span>
            <span>
              FORMAT: <span className="text-text">{format === "solo" ? "1V1" : "2V2"}</span>
            </span>
            <span className="text-text-mute">·</span>
            <span>
              NODE: <span className="text-text">{regionCode}</span>
            </span>
          </div>

          {/* Meters */}
          <div className="mt-2 grid w-full grid-cols-3 gap-3">
            <Meter label="ELAPSED" value={`${mm}:${ss}`} />
            <Meter label="ELO RANGE" value="±65" />
            <Meter label="QUEUE POS" value="#3" />
          </div>
        </div>

        {/* Cancel */}
        <button
          type="button"
          onClick={onCancel}
          className="group inline-flex items-center gap-2 self-stretch border border-ember/60 bg-ember/10 px-5 py-2.5 font-display text-[11px] font-bold tracking-[0.22em] text-ember transition hover:bg-ember/20 md:self-auto bl-clip-chevron"
        >
          <X className="h-3.5 w-3.5" />
          CANCEL QUEUE
        </button>
      </div>
    </section>
  )
}

function Meter({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col border border-line/70 bg-void/60 px-3 py-2">
      <span className="font-mono text-[9px] tracking-[0.16em] text-text-mute">{label}</span>
      <span className="mt-0.5 font-display text-base font-black tracking-tight text-text">
        {value}
      </span>
    </div>
  )
}
