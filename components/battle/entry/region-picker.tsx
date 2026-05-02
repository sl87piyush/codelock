"use client"

import { cn } from "@/lib/utils"
import { Globe } from "lucide-react"
import { REGIONS } from "@/components/battle/entry-data"

type Props = {
  regionId: string
  onChange: (id: string) => void
}

export function RegionPicker({ regionId, onChange }: Props) {
  return (
    <section className="relative overflow-hidden border border-line bg-panel/60 bl-glass">
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-20" />

      <div className="relative p-4 md:p-5">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="h-3.5 w-3.5 text-neon" />
            <span className="font-display text-[10px] font-bold tracking-[0.28em] text-text-mute">
              REGION
            </span>
          </div>
          <span className="font-mono text-[10px] tracking-[0.14em] text-neon/70">
            {"// SERVER_NODE"}
          </span>
        </div>

        <div className="flex flex-col gap-1.5">
          {REGIONS.map((r) => {
            const active = regionId === r.id
            const pingColor =
              r.ping < 50 ? "text-neon" : r.ping < 150 ? "text-gold" : "text-ember"
            const loadColor =
              r.load === "low" ? "bg-neon" : r.load === "medium" ? "bg-gold" : "bg-ember"

            return (
              <button
                key={r.id}
                type="button"
                onClick={() => onChange(r.id)}
                className={cn(
                  "group flex items-center gap-3 border px-3 py-2 text-left transition",
                  active
                    ? "border-neon/60 bg-neon/10"
                    : "border-line/70 bg-void/40 hover:border-line",
                )}
              >
                <span className="font-mono text-[10px] font-bold tracking-[0.14em] text-text-dim">
                  {r.code}
                </span>
                <span className="h-3 w-px bg-line" />
                <span
                  className={cn(
                    "flex-1 truncate text-sm",
                    active ? "text-text" : "text-text-dim",
                  )}
                >
                  {r.name}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className={cn("h-1.5 w-1.5 rounded-full", loadColor)} />
                  <span className={cn("font-mono text-[10px] font-bold", pingColor)}>
                    {r.ping}ms
                  </span>
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
