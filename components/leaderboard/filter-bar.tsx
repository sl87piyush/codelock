"use client"

import { Search, SlidersHorizontal, X } from "lucide-react"
import {
  CATEGORIES,
  type Category,
  TIME_FILTERS,
  type TimeFilter,
} from "./leaderboard-data"
import { cn } from "@/lib/utils"

const DIVISIONS = ["DIAMOND", "PLATINUM", "GOLD", "SILVER", "BRONZE"] as const

const DIVISION_ACCENT: Record<
  (typeof DIVISIONS)[number],
  { text: string; border: string; bg: string }
> = {
  DIAMOND: { text: "text-neon", border: "border-neon/50", bg: "bg-neon/10" },
  PLATINUM: { text: "text-electric", border: "border-electric/50", bg: "bg-electric/10" },
  GOLD: { text: "text-gold", border: "border-gold/50", bg: "bg-gold/10" },
  SILVER: { text: "text-text", border: "border-text/40", bg: "bg-text/5" },
  BRONZE: { text: "text-ember", border: "border-ember/50", bg: "bg-ember/10" },
}

type Props = {
  category: Category
  setCategory: (c: Category) => void
  timeFilter: TimeFilter
  setTimeFilter: (t: TimeFilter) => void
  search: string
  setSearch: (s: string) => void
  divisionFilter: string | null
  setDivisionFilter: (d: string | null) => void
}

export function FilterBar({
  category,
  setCategory,
  timeFilter,
  setTimeFilter,
  search,
  setSearch,
  divisionFilter,
  setDivisionFilter,
}: Props) {
  return (
    <div className="flex flex-col gap-3">
      {/* Top row: categories */}
      <div className="flex flex-wrap items-center gap-2">
        {CATEGORIES.map((c) => {
          const active = c.id === category
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategory(c.id)}
              className={cn(
                "relative inline-flex h-9 items-center gap-2 px-4 font-display text-[11px] font-bold tracking-[0.18em] transition-all bl-clip-chevron",
                active
                  ? "bg-neon text-void shadow-[0_0_22px_rgba(0,240,255,0.45)]"
                  : "border border-line/70 bg-panel/40 text-text-dim hover:text-text hover:border-neon/40",
              )}
            >
              {c.label.toUpperCase()}
            </button>
          )
        })}
      </div>

      {/* Bottom row: search + time + divisions */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-text-mute" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search warriors, handles, divisions…"
            className="h-11 w-full border border-line/70 bg-void/60 pl-10 pr-10 font-mono text-[13px] text-text outline-none placeholder:text-text-mute focus:border-neon/60 focus:bg-void"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-text-mute hover:text-text"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Time filter segmented */}
        <div className="flex items-center border border-line/70 bg-void/60 p-1">
          {TIME_FILTERS.map((t) => {
            const active = t.id === timeFilter
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTimeFilter(t.id)}
                className={cn(
                  "relative flex flex-col items-center px-3.5 py-1.5 font-display text-[10px] font-bold tracking-[0.18em] transition-colors",
                  active
                    ? "bg-neon/15 text-neon border border-neon/40"
                    : "text-text-mute hover:text-text",
                )}
              >
                <span>{t.label.toUpperCase()}</span>
                <span className="font-mono text-[9px] tracking-[0.1em] opacity-70">
                  {t.sub}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Division chip filter */}
      <div className="flex flex-wrap items-center gap-2 border-t border-line/60 pt-3">
        <div className="inline-flex items-center gap-1.5 font-display text-[10px] font-bold tracking-[0.22em] text-text-mute">
          <SlidersHorizontal className="h-3 w-3" />
          DIVISION
        </div>
        <button
          type="button"
          onClick={() => setDivisionFilter(null)}
          className={cn(
            "inline-flex h-7 items-center px-2.5 font-display text-[10px] font-bold tracking-[0.18em]",
            divisionFilter === null
              ? "bg-text/10 text-text border border-text/40"
              : "border border-line/60 text-text-mute hover:text-text",
          )}
        >
          ALL
        </button>
        {DIVISIONS.map((d) => {
          const active = divisionFilter === d
          const accent = DIVISION_ACCENT[d]
          return (
            <button
              key={d}
              type="button"
              onClick={() => setDivisionFilter(active ? null : d)}
              className={cn(
                "inline-flex h-7 items-center px-2.5 font-display text-[10px] font-bold tracking-[0.18em] transition-all",
                active
                  ? `${accent.bg} ${accent.border} ${accent.text} border`
                  : "border border-line/60 text-text-mute hover:text-text",
              )}
            >
              {d}
            </button>
          )
        })}
      </div>
    </div>
  )
}
