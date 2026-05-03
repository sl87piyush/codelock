"use client"

import { useState, useMemo } from "react"
import { ChampionCard } from "./championship-atoms"
import { getChampionsBySeason, type Track } from "@/lib/championship-data"
import { cn } from "@/lib/utils"
import { User, Users, Shield, Sparkles } from "lucide-react"

type TrackFilter = "all" | Track

const FILTERS: { id: TrackFilter; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "all", label: "ALL TRACKS", icon: Sparkles },
  { id: "solo", label: "SOLO", icon: User },
  { id: "duo", label: "DUO", icon: Users },
  { id: "clan", label: "CLAN", icon: Shield },
]

// =============================================================
// HALL GRID — season-grouped champion list with a track filter.
// Newest season first. Each season carries its own gold strip.
// =============================================================
export function HallGrid() {
  const [filter, setFilter] = useState<TrackFilter>("all")

  const groups = useMemo(() => {
    const all = getChampionsBySeason()
    if (filter === "all") return all
    return all
      .map((g) => ({ ...g, rows: g.rows.filter((c) => c.track === filter) }))
      .filter((g) => g.rows.length > 0)
  }, [filter])

  return (
    <section className="space-y-6">
      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-2 border border-line/60 bg-panel/60 p-2 bl-clip-chevron">
        {FILTERS.map(({ id, label, icon: Icon }) => {
          const active = filter === id
          return (
            <button
              key={id}
              type="button"
              onClick={() => setFilter(id)}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5 font-display text-[10px] font-bold tracking-[0.22em] transition-all bl-clip-chevron",
                active
                  ? "bg-gold/15 text-gold border border-gold/50 shadow-[0_0_18px_rgba(251,191,36,0.25)]"
                  : "border border-transparent text-text-dim hover:text-gold hover:bg-gold/5",
              )}
            >
              <Icon className="h-3 w-3" />
              {label}
            </button>
          )
        })}
        <span className="ml-auto font-mono text-[10px] tracking-[0.22em] text-text-mute">
          {groups.reduce((acc, g) => acc + g.rows.length, 0)} CHAMPIONS · {groups.length} SEASONS
        </span>
      </div>

      {/* Season groups */}
      <div className="space-y-7">
        {groups.map((group) => (
          <SeasonGroup key={group.season} label={group.label} year={group.year}>
            <div className="space-y-4">
              {group.rows.map((c) => (
                <ChampionCard key={c.id} champion={c} />
              ))}
            </div>
          </SeasonGroup>
        ))}
      </div>
    </section>
  )
}

function SeasonGroup({
  label,
  year,
  children,
}: {
  label: string
  year: number
  children: React.ReactNode
}) {
  const isInaugural = year === 2021
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span
          className={cn(
            "inline-flex h-7 items-center gap-1.5 px-3 font-display text-[11px] font-bold tracking-[0.24em] bl-clip-chevron",
            isInaugural
              ? "border border-ember/60 bg-ember/15 text-ember"
              : "border border-gold/50 bg-gold/10 text-gold",
          )}
        >
          {label}
        </span>
        <span className="h-px flex-1 bg-gradient-to-r from-gold/50 via-gold/15 to-transparent" />
        {isInaugural && (
          <span className="font-mono text-[10px] tracking-[0.22em] text-ember">
            INAUGURAL SEASON
          </span>
        )}
      </div>
      {children}
    </div>
  )
}
