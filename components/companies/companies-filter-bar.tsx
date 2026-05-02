"use client"

import { Search, ArrowUpDown, X, SlidersHorizontal } from "lucide-react"
import {
  COMPANY_SORTS,
  COMPANY_TAGS,
  COMPANY_TIERS,
  type Company,
  type CompanySort,
  type CompanyTier,
  type QuestionTag,
} from "./companies-data"
import { cn } from "@/lib/utils"

export type DifficultyFilter = "ALL" | "EASY" | "MEDIUM" | "HARD"

export function CompaniesFilterBar({
  query,
  setQuery,
  tier,
  setTier,
  difficulty,
  setDifficulty,
  selectedTags,
  toggleTag,
  clearTags,
  hiringOnly,
  setHiringOnly,
  sort,
  setSort,
  totalResults,
  companies,
}: {
  query: string
  setQuery: (q: string) => void
  tier: CompanyTier | "ALL"
  setTier: (t: CompanyTier | "ALL") => void
  difficulty: DifficultyFilter
  setDifficulty: (d: DifficultyFilter) => void
  selectedTags: Set<QuestionTag>
  toggleTag: (t: QuestionTag) => void
  clearTags: () => void
  hiringOnly: boolean
  setHiringOnly: (v: boolean) => void
  sort: CompanySort
  setSort: (s: CompanySort) => void
  totalResults: number
  companies: Company[]
}) {
  const tierCounts = (id: CompanyTier | "ALL") =>
    id === "ALL" ? companies.length : companies.filter((c) => c.tier === id).length

  const difficultyTabs: {
    id: DifficultyFilter
    label: string
    accent: "neon" | "ember" | "blood" | "text-mute"
  }[] = [
    { id: "ALL", label: "All", accent: "neon" },
    { id: "EASY", label: "Easy", accent: "neon" },
    { id: "MEDIUM", label: "Medium", accent: "ember" },
    { id: "HARD", label: "Hard", accent: "blood" },
  ]

  return (
    <div className="relative space-y-3 border border-line/60 bg-panel/60 bl-glass p-3 sm:p-4">
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-20" />

      {/* Row 1 — Tier tabs + search + sort */}
      <div className="relative flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-1 border border-line/60 bg-void/60 p-1">
          {COMPANY_TIERS.map((t) => {
            const active = tier === t.id
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTier(t.id)}
                className={cn(
                  "relative inline-flex h-8 items-center gap-2 px-3 font-display text-[11px] font-bold tracking-[0.18em] transition-all bl-clip-chevron",
                  active
                    ? t.id === "TITAN"
                      ? "bg-gold/15 text-gold border border-gold/50"
                      : t.id === "QUANT"
                        ? "bg-ember/15 text-ember border border-ember/50"
                        : t.id === "RISING"
                          ? "bg-blood/15 text-blood border border-blood/50"
                          : "bg-neon/15 text-neon border border-neon/50"
                    : "text-text-mute hover:text-text",
                )}
              >
                {t.label.toUpperCase()}
                <span className="rounded-sm bg-void/70 px-1 font-mono text-[10px] tabular-nums text-text-dim">
                  {tierCounts(t.id)}
                </span>
              </button>
            )
          })}
        </div>

        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-[280px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-mute" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search company, ticker, industry..."
              className="h-9 w-full border border-line/70 bg-void/60 pl-9 pr-9 font-mono text-[12.5px] text-text placeholder:text-text-mute focus:border-neon/50 focus:outline-none"
              aria-label="Search companies"
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
              onChange={(e) => setSort(e.target.value as CompanySort)}
              className="h-9 cursor-pointer appearance-none border border-line/70 bg-void/60 pl-8 pr-7 font-display text-[11px] font-bold tracking-[0.18em] text-text hover:border-neon/40 focus:border-neon/50 focus:outline-none"
              aria-label="Sort companies"
            >
              {COMPANY_SORTS.map((s) => (
                <option key={s.id} value={s.id} className="bg-void text-text">
                  {s.label.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Row 2 — Difficulty + hiring toggle + result count */}
      <div className="relative flex flex-wrap items-center gap-2">
        <span className="font-display text-[10px] font-bold tracking-[0.22em] text-text-mute">
          DIFFICULTY
        </span>
        <div className="flex flex-wrap items-center gap-1 border border-line/60 bg-void/60 p-0.5">
          {difficultyTabs.map((d) => {
            const active = difficulty === d.id
            const accentClass =
              d.accent === "neon"
                ? "bg-neon/15 text-neon border border-neon/50"
                : d.accent === "ember"
                  ? "bg-ember/15 text-ember border border-ember/50"
                  : d.accent === "blood"
                    ? "bg-blood/15 text-blood border border-blood/50"
                    : "bg-void text-text-mute"
            return (
              <button
                key={d.id}
                type="button"
                onClick={() => setDifficulty(d.id)}
                className={cn(
                  "relative inline-flex h-7 items-center px-2.5 font-display text-[10.5px] font-bold tracking-[0.2em] transition-all",
                  active ? accentClass : "text-text-mute hover:text-text",
                )}
              >
                {d.label.toUpperCase()}
              </button>
            )
          })}
        </div>

        <button
          type="button"
          onClick={() => setHiringOnly(!hiringOnly)}
          className={cn(
            "ml-1 inline-flex h-7 items-center gap-1.5 px-2.5 font-display text-[10.5px] font-bold tracking-[0.2em] transition-all bl-clip-chevron",
            hiringOnly
              ? "border border-blood/50 bg-blood/10 text-blood"
              : "border border-line/60 text-text-mute hover:border-blood/40 hover:text-blood",
          )}
          aria-pressed={hiringOnly}
        >
          <span
            className={cn(
              "relative h-1.5 w-1.5 rounded-full",
              hiringOnly ? "bg-blood" : "bg-text-mute",
            )}
          >
            {hiringOnly && (
              <span className="absolute inset-0 rounded-full bg-blood/60 animate-ping" />
            )}
          </span>
          HIRING ONLY
        </button>

        <div className="ml-auto flex items-center gap-2 font-mono text-[11px] tracking-tight text-text-mute">
          <SlidersHorizontal className="h-3.5 w-3.5" />
          <span className="tabular-nums text-text-dim">{totalResults}</span>
          <span>RESULTS</span>
        </div>
      </div>

      {/* Row 3 — Tag chips */}
      <div className="relative flex flex-wrap items-center gap-1.5">
        <span className="font-display text-[10px] font-bold tracking-[0.22em] text-text-mute">
          TAGS
        </span>
        {COMPANY_TAGS.map((t) => {
          const active = selectedTags.has(t)
          return (
            <button
              key={t}
              type="button"
              onClick={() => toggleTag(t)}
              className={cn(
                "inline-flex h-7 items-center gap-1.5 px-2.5 font-display text-[10.5px] font-bold tracking-[0.18em] transition-all",
                active
                  ? "border border-neon/50 bg-neon/10 text-neon"
                  : "border border-line/60 text-text-mute hover:border-line hover:text-text",
              )}
              aria-pressed={active}
            >
              {t.toUpperCase()}
            </button>
          )
        })}
        {selectedTags.size > 0 && (
          <button
            type="button"
            onClick={clearTags}
            className="ml-1 inline-flex h-7 items-center gap-1 px-2 font-display text-[10px] font-bold tracking-[0.2em] text-text-mute hover:text-blood transition-colors"
          >
            <X className="h-3 w-3" />
            CLEAR ({selectedTags.size})
          </button>
        )}
      </div>
    </div>
  )
}
