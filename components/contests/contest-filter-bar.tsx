"use client"

import { Search, ArrowUpDown, X } from "lucide-react"
import {
  CONTEST_CATEGORIES,
  CONTEST_SORTS,
  type Contest,
  type ContestCategory,
  type ContestSort,
  type ContestStatus,
} from "./contests-data"
import { cn } from "@/lib/utils"

export function ContestFilterBar({
  status,
  setStatus,
  category,
  setCategory,
  sort,
  setSort,
  query,
  setQuery,
  liveCount,
  upcomingCount,
  pastCount,
  contests,
}: {
  status: ContestStatus | "ALL"
  setStatus: (s: ContestStatus | "ALL") => void
  category: ContestCategory | "ALL"
  setCategory: (c: ContestCategory | "ALL") => void
  sort: ContestSort
  setSort: (s: ContestSort) => void
  query: string
  setQuery: (q: string) => void
  liveCount: number
  upcomingCount: number
  pastCount: number
  contests: Contest[]
}) {
  const statusTabs: {
    id: ContestStatus | "ALL"
    label: string
    count: number
    accent: string
  }[] = [
    { id: "live", label: "Live", count: liveCount, accent: "blood" },
    { id: "upcoming", label: "Upcoming", count: upcomingCount, accent: "neon" },
    { id: "past", label: "Past", count: pastCount, accent: "text-mute" },
    { id: "ALL", label: "All", count: contests.length, accent: "gold" },
  ]

  const categoryCounts = (id: ContestCategory | "ALL") =>
    id === "ALL" ? contests.length : contests.filter((c) => c.category === id).length

  return (
    <div className="relative space-y-3 border border-line/60 bg-panel/60 bl-glass p-3 sm:p-4">
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-20" />

      {/* Row 1 — Status tabs + search */}
      <div className="relative flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-1 border border-line/60 bg-void/60 p-1">
          {statusTabs.map((t) => {
            const active = status === t.id
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setStatus(t.id)}
                className={cn(
                  "relative inline-flex h-8 items-center gap-2 px-3 font-display text-[11px] font-bold tracking-[0.18em] transition-all bl-clip-chevron",
                  active
                    ? t.accent === "blood"
                      ? "bg-blood/20 text-blood border border-blood/50"
                      : t.accent === "neon"
                        ? "bg-neon/15 text-neon border border-neon/50"
                        : t.accent === "gold"
                          ? "bg-gold/15 text-gold border border-gold/50"
                          : "bg-void text-text border border-line"
                    : "text-text-mute hover:text-text",
                )}
              >
                {t.id === "live" && active && (
                  <span className="relative h-1.5 w-1.5 rounded-full bg-blood">
                    <span className="absolute inset-0 rounded-full bg-blood/60 animate-ping" />
                  </span>
                )}
                {t.label.toUpperCase()}
                <span className="rounded-sm bg-void/70 px-1 font-mono text-[10px] tabular-nums text-text-dim">
                  {t.count}
                </span>
              </button>
            )
          })}
        </div>

        <div className="relative flex items-center gap-2">
          <div className="relative w-full sm:w-[280px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-mute" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search contests, sponsors, codes..."
              className="h-9 w-full border border-line/70 bg-void/60 pl-9 pr-9 font-mono text-[12.5px] text-text placeholder:text-text-mute focus:border-neon/50 focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-text-mute hover:text-text"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <div className="relative">
            <ArrowUpDown className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-text-mute" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as ContestSort)}
              className="h-9 cursor-pointer appearance-none border border-line/70 bg-void/60 pl-8 pr-7 font-display text-[11px] font-bold tracking-[0.18em] text-text hover:border-neon/40 focus:border-neon/50 focus:outline-none"
            >
              {CONTEST_SORTS.map((s) => (
                <option key={s.id} value={s.id} className="bg-void text-text">
                  {s.label.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Row 2 — Category chips */}
      <div className="relative flex flex-wrap gap-1.5">
        {CONTEST_CATEGORIES.map((c) => {
          const active = category === c.id
          const count = categoryCounts(c.id)
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategory(c.id)}
              className={cn(
                "inline-flex h-7 items-center gap-1.5 px-2.5 font-display text-[10.5px] font-bold tracking-[0.18em] transition-all",
                active
                  ? "border border-neon/50 bg-neon/10 text-neon"
                  : "border border-line/60 text-text-mute hover:border-line hover:text-text",
              )}
            >
              {c.label.toUpperCase()}
              <span className="font-mono text-[9.5px] text-text-mute tabular-nums">{count}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
