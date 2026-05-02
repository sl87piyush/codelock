"use client"

import { cn } from "@/lib/utils"
import { User, Users } from "lucide-react"
import type { TeamFormat } from "@/components/battle/entry-data"

type Props = {
  format: TeamFormat
  onChange: (f: TeamFormat) => void
}

const OPTIONS: { id: TeamFormat; label: string; sub: string; icon: typeof User }[] = [
  { id: "solo", label: "SOLO", sub: "1 vs 1", icon: User },
  { id: "duo", label: "DUO", sub: "2 vs 2", icon: Users },
]

export function TeamFormatToggle({ format, onChange }: Props) {
  return (
    <section className="relative overflow-hidden border border-line bg-panel/60 bl-glass">
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-20" />

      <div className="relative p-4 md:p-5">
        <div className="mb-3 flex items-center justify-between">
          <span className="font-display text-[10px] font-bold tracking-[0.28em] text-text-mute">
            FORMAT
          </span>
          <span className="font-mono text-[10px] tracking-[0.14em] text-neon/70">
            {"// TEAM_SIZE"}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {OPTIONS.map((opt) => {
            const Icon = opt.icon
            const active = format === opt.id
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => onChange(opt.id)}
                className={cn(
                  "group relative flex items-center gap-3 border p-3 text-left transition bl-clip-notch",
                  active
                    ? "border-neon/60 bg-neon/10 text-neon"
                    : "border-line/70 bg-void/40 text-text-dim hover:border-line hover:text-text",
                )}
              >
                {active && (
                  <span className="pointer-events-none absolute inset-0 bl-pulse opacity-40" />
                )}
                <div
                  className={cn(
                    "flex h-9 w-9 items-center justify-center border",
                    active
                      ? "border-neon/70 bg-neon/15 text-neon"
                      : "border-line/70 bg-void text-text-dim",
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex min-w-0 flex-1 flex-col">
                  <span className="font-display text-sm font-black tracking-wider">
                    {opt.label}
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.14em] text-text-dim">
                    {opt.sub}
                  </span>
                </div>
                {active && (
                  <span className="inline-flex h-5 items-center border border-neon/60 bg-void px-1.5 font-mono text-[9px] font-bold text-neon">
                    LOCKED
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
