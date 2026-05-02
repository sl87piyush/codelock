"use client"

import { Search, ArrowUpDown, X, SlidersHorizontal, Bookmark, Crown } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  ALL_TAGS,
  ARENA_SORTS,
  DIFFICULTIES,
  DIFFICULTY_META,
  DOMAINS,
  type ArenaSort,
  type ArenaStatus,
  type Difficulty,
  type Domain,
  type Problem,
} from "./arena-data"

const STATUS_TABS: {
  id: ArenaStatus
  label: string
  accent: "neon" | "electric" | "gold" | "ember"
}[] = [
  { id: "ALL", label: "All", accent: "gold" },
  { id: "unattempted", label: "Unattempted", accent: "neon" },
  { id: "attempted", label: "In Progress", accent: "ember" },
  { id: "solved", label: "Solved", accent: "electric" },
]

const DIFFICULTY_PILLS: Record<
  Difficulty,
  { active: string; idle: string }
> = {
  Apprentice: {
    active: "border-neon/55 bg-neon/15 text-neon",
    idle: "border-line/60 text-text-mute hover:text-text",
  },
  Adept: {
    active: "border-electric/55 bg-electric/15 text-electric",
    idle: "border-line/60 text-text-mute hover:text-text",
  },
  Master: {
    active: "border-ember/55 bg-ember/15 text-ember",
    idle: "border-line/60 text-text-mute hover:text-text",
  },
  Grandmaster: {
    active: "border-blood/55 bg-blood/15 text-blood",
    idle: "border-line/60 text-text-mute hover:text-text",
  },
  Legendary: {
    active: "border-gold/55 bg-gold/15 text-gold",
    idle: "border-line/60 text-text-mute hover:text-text",
  },
}

export function ArenaFilterBar({
  status,
  setStatus,
  difficulties,
  toggleDifficulty,
  domains,
  toggleDomain,
  tags,
  toggleTag,
  sort,
  setSort,
  query,
  setQuery,
  bookmarkedOnly,
  setBookmarkedOnly,
  premiumOnly,
  setPremiumOnly,
  totalCount,
  resultCount,
  problems,
  onClearAll,
}: {
  status: ArenaStatus
  setStatus: (s: ArenaStatus) => void
  difficulties: Set<Difficulty>
  toggleDifficulty: (d: Difficulty) => void
  domains: Set<Domain>
  toggleDomain: (d: Domain) => void
  tags: Set<string>
  toggleTag: (t: string) => void
  sort: ArenaSort
  setSort: (s: ArenaSort) => void
  query: string
  setQuery: (q: string) => void
  bookmarkedOnly: boolean
  setBookmarkedOnly: (b: boolean) => void
  premiumOnly: boolean
  setPremiumOnly: (b: boolean) => void
  totalCount: number
  resultCount: number
  problems: Problem[]
  onClearAll: () => void
}) {
  const [showAllTags, setShowAllTags] = useState(false)
  const visibleTags = showAllTags ? ALL_TAGS : ALL_TAGS.slice(0, 18)

  const statusCount = (id: ArenaStatus) => {
    if (id === "ALL") return problems.length
    return problems.filter((p) => p.status === id).length
  }

  const domainCount = (d: Domain) => problems.filter((p) => p.domain === d).length
  const difficultyCount = (d: Difficulty) =>
    problems.filter((p) => p.difficulty === d).length

  const activeFilters =
    difficulties.size + domains.size + tags.size + (bookmarkedOnly ? 1 : 0) + (premiumOnly ? 1 : 0)

  return (
    <div className="relative space-y-3 border border-line/60 bg-panel/60 bl-glass p-3 sm:p-4">
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-20" />

      {/* Row 1 — status tabs + search + sort */}
      <div className="relative flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-1 border border-line/60 bg-void/60 p-1">
          {STATUS_TABS.map((t) => {
            const active = status === t.id
            const count = statusCount(t.id)
            const activeCls =
              t.accent === "neon"
                ? "bg-neon/15 text-neon border border-neon/50"
                : t.accent === "electric"
                  ? "bg-electric/15 text-electric border border-electric/50"
                  : t.accent === "ember"
                    ? "bg-ember/15 text-ember border border-ember/50"
                    : "bg-gold/15 text-gold border border-gold/50"
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setStatus(t.id)}
                className={cn(
                  "relative inline-flex h-8 items-center gap-2 px-3 font-display text-[11px] font-bold tracking-[0.18em] transition-all bl-clip-chevron",
                  active ? activeCls : "text-text-mute hover:text-text",
                )}
              >
                {t.label.toUpperCase()}
                <span className="rounded-sm bg-void/70 px-1 font-mono text-[10px] tabular-nums text-text-dim">
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative w-full sm:w-[300px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-mute" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search problems, tags, codes, authors..."
              className="h-9 w-full border border-line/70 bg-void/60 pl-9 pr-9 font-mono text-[12.5px] text-text placeholder:text-text-mute focus:border-neon/50 focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-text-mute hover:text-text"
                aria-label="Clear search"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <div className="relative">
            <ArrowUpDown className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-text-mute" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as ArenaSort)}
              className="h-9 cursor-pointer appearance-none border border-line/70 bg-void/60 pl-8 pr-7 font-display text-[11px] font-bold tracking-[0.18em] text-text hover:border-neon/40 focus:border-neon/50 focus:outline-none"
            >
              {ARENA_SORTS.map((s) => (
                <option key={s.id} value={s.id} className="bg-void text-text">
                  {s.label.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Row 2 — Difficulty pills */}
      <div className="relative flex flex-wrap items-center gap-1.5">
        <span className="font-display text-[10px] font-bold tracking-[0.22em] text-text-mute">
          DIFFICULTY
        </span>
        {DIFFICULTIES.map((d) => {
          const active = difficulties.has(d)
          const meta = DIFFICULTY_META[d]
          const cls = DIFFICULTY_PILLS[d]
          return (
            <button
              key={d}
              type="button"
              onClick={() => toggleDifficulty(d)}
              className={cn(
                "inline-flex h-7 items-center gap-1.5 border px-2.5 font-display text-[10.5px] font-bold tracking-[0.18em] transition-all",
                active ? cls.active : cls.idle,
              )}
            >
              <span className="font-mono text-[9px] opacity-80">{meta.short}</span>
              {d.toUpperCase()}
              <span className="font-mono text-[9.5px] tabular-nums opacity-70">
                {difficultyCount(d)}
              </span>
            </button>
          )
        })}

        <div className="ml-auto flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setBookmarkedOnly(!bookmarkedOnly)}
            className={cn(
              "inline-flex h-7 items-center gap-1.5 border px-2.5 font-display text-[10.5px] font-bold tracking-[0.18em] transition-all",
              bookmarkedOnly
                ? "border-neon/55 bg-neon/15 text-neon"
                : "border-line/60 text-text-mute hover:text-text",
            )}
          >
            <Bookmark className="h-3 w-3" />
            BOOKMARKED
          </button>
          <button
            type="button"
            onClick={() => setPremiumOnly(!premiumOnly)}
            className={cn(
              "inline-flex h-7 items-center gap-1.5 border px-2.5 font-display text-[10.5px] font-bold tracking-[0.18em] transition-all",
              premiumOnly
                ? "border-gold/55 bg-gold/15 text-gold"
                : "border-line/60 text-text-mute hover:text-text",
            )}
          >
            <Crown className="h-3 w-3" />
            ELITE
          </button>
        </div>
      </div>

      {/* Row 3 — Domain chips */}
      <div className="relative flex flex-wrap items-center gap-1.5">
        <span className="font-display text-[10px] font-bold tracking-[0.22em] text-text-mute">
          DOMAIN
        </span>
        {DOMAINS.map((d) => {
          const active = domains.has(d)
          const count = domainCount(d)
          return (
            <button
              key={d}
              type="button"
              onClick={() => toggleDomain(d)}
              className={cn(
                "inline-flex h-7 items-center gap-1.5 border px-2.5 font-display text-[10px] font-bold tracking-[0.18em] transition-all",
                active
                  ? "border-electric/50 bg-electric/12 text-electric"
                  : "border-line/60 text-text-mute hover:border-line hover:text-text",
              )}
            >
              {d.toUpperCase()}
              <span className="font-mono text-[9.5px] tabular-nums opacity-70">{count}</span>
            </button>
          )
        })}
      </div>

      {/* Row 4 — Tags */}
      <div className="relative flex flex-wrap items-center gap-1.5">
        <span className="font-display text-[10px] font-bold tracking-[0.22em] text-text-mute">
          TAGS
        </span>
        {visibleTags.map((t) => {
          const active = tags.has(t)
          return (
            <button
              key={t}
              type="button"
              onClick={() => toggleTag(t)}
              className={cn(
                "inline-flex h-6 items-center px-2 font-mono text-[10.5px] tracking-tight transition-all",
                active
                  ? "border border-neon/50 bg-neon/10 text-neon"
                  : "border border-line/60 text-text-dim hover:border-neon/30 hover:text-text",
              )}
            >
              {t}
            </button>
          )
        })}
        {ALL_TAGS.length > 18 && (
          <button
            type="button"
            onClick={() => setShowAllTags((s) => !s)}
            className="inline-flex h-6 items-center gap-1 border border-line/60 bg-void/60 px-2 font-display text-[9.5px] font-bold tracking-[0.2em] text-text-mute hover:text-neon"
          >
            <SlidersHorizontal className="h-3 w-3" />
            {showAllTags ? "SHOW LESS" : `+${ALL_TAGS.length - 18} MORE`}
          </button>
        )}
      </div>

      {/* Footer — result summary + clear */}
      <div className="relative flex items-center justify-between border-t border-line/60 pt-2.5">
        <div className="flex items-center gap-2 font-mono text-[11px] tracking-tight text-text-mute">
          <span className="font-display text-[10px] font-bold tracking-[0.22em] text-neon">
            {resultCount}
          </span>
          <span>/ {totalCount} problems</span>
          {activeFilters > 0 && (
            <span className="ml-1 inline-flex h-5 items-center border border-ember/40 bg-ember/10 px-1.5 font-display text-[9.5px] font-bold tracking-[0.2em] text-ember">
              {activeFilters} FILTER{activeFilters !== 1 ? "S" : ""} ACTIVE
            </span>
          )}
        </div>
        {(activeFilters > 0 || query) && (
          <button
            type="button"
            onClick={onClearAll}
            className="inline-flex h-6 items-center gap-1 px-1.5 font-display text-[10px] font-bold tracking-[0.2em] text-text-mute hover:text-blood"
          >
            <X className="h-3 w-3" />
            CLEAR ALL
          </button>
        )}
      </div>
    </div>
  )
}
