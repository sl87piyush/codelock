"use client"

import { cn } from "@/lib/utils"
import { DoorOpen, Hourglass, Swords, Trophy } from "lucide-react"

export type BattlePhase = "entry" | "pre" | "live" | "post"

const PHASES: {
  id: BattlePhase
  label: string
  sub: string
  icon: React.ComponentType<{ className?: string }>
}[] = [
  { id: "entry", label: "ENTRY", sub: "Gateway", icon: DoorOpen },
  { id: "pre", label: "LOBBY", sub: "Pre-match", icon: Hourglass },
  { id: "live", label: "LIVE", sub: "In progress", icon: Swords },
  { id: "post", label: "RESULT", sub: "Match ended", icon: Trophy },
]

export function PhaseToggle({
  phase,
  onChange,
}: {
  phase: BattlePhase
  onChange: (p: BattlePhase) => void
}) {
  return (
    <div className="relative overflow-hidden border border-line bg-panel/60 bl-glass">
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-20" />
      <div className="relative flex items-center justify-between gap-4 px-4 py-2.5 md:px-5">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-5 items-center border border-gold/40 bg-gold/10 px-1.5 font-display text-[9px] font-bold tracking-[0.22em] text-gold">
            DEMO MODE
          </span>
          <span className="hidden font-mono text-[11px] tracking-[0.14em] text-text-dim sm:inline">
            {"// switch states to preview the full battle lifecycle"}
          </span>
        </div>
        <div className="flex items-center gap-1 border border-line bg-void/60 p-1">
          {PHASES.map((p) => {
            const active = p.id === phase
            const Icon = p.icon
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => onChange(p.id)}
                className={cn(
                  "group inline-flex items-center gap-2 border px-3 py-1.5 font-display text-[10px] font-bold tracking-[0.2em] transition bl-clip-chevron",
                  active
                    ? "border-neon/60 bg-neon/15 text-neon text-glow"
                    : "border-transparent text-text-dim hover:text-text hover:bg-line/40",
                )}
              >
                <Icon className={cn("h-3.5 w-3.5", active && "animate-pulse")} />
                <span>{p.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
