"use client"

import {
  ArrowDownUp,
  Calendar,
  Filter,
  Search,
  Shield,
  Swords,
  Target,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { MatchMode, MatchOutcome } from "@/lib/battle-history-data"

export type ModeTab = "ALL" | MatchMode
export type OutcomeFilter = "ALL" | MatchOutcome
export type DateRange = "ALL" | "24H" | "7D" | "30D" | "SEASON"
export type SortMode = "NEWEST" | "OLDEST" | "LP_DESC" | "LP_ASC" | "DURATION"

type Props = {
  // tab
  tab: ModeTab
  setTab: (t: ModeTab) => void
  counts: Record<ModeTab, number>

  // search
  query: string
  setQuery: (q: string) => void

  // outcome chips
  outcome: OutcomeFilter
  setOutcome: (o: OutcomeFilter) => void

  // date range
  range: DateRange
  setRange: (r: DateRange) => void

  // sort
  sort: SortMode
  setSort: (s: SortMode) => void

  // result count + clear
  resultCount: number
  totalCount: number
  onClear: () => void
}

const TABS: { key: ModeTab; label: string; short: string; icon: React.ComponentType<{ className?: string }>; accent: "neon" | "electric" | "blood" | "gold" }[] = [
  { key: "ALL", label: "All Battles", short: "ALL", icon: Swords, accent: "gold" },
  { key: "SOLO", label: "Solo 1v1", short: "1V1", icon: Target, accent: "neon" },
  { key: "DUO", label: "Duo 2v2", short: "2V2", icon: Swords, accent: "electric" },
  { key: "CLAN_WAR", label: "Clan Wars", short: "WAR", icon: Shield, accent: "blood" },
]

const RANGES: { key: DateRange; label: string }[] = [
  { key: "ALL", label: "All time" },
  { key: "24H", label: "Last 24h" },
  { key: "7D", label: "Last 7 days" },
  { key: "30D", label: "Last 30 days" },
  { key: "SEASON", label: "This season" },
]

const SORTS: { key: SortMode; label: string }[] = [
  { key: "NEWEST", label: "Newest first" },
  { key: "OLDEST", label: "Oldest first" },
  { key: "LP_DESC", label: "Highest LP gain" },
  { key: "LP_ASC", label: "Biggest LP loss" },
  { key: "DURATION", label: "Longest match" },
]

export function HistoryFilters({
  tab,
  setTab,
  counts,
  query,
  setQuery,
  outcome,
  setOutcome,
  range,
  setRange,
  sort,
  setSort,
  resultCount,
  totalCount,
  onClear,
}: Props) {
  const filtered = resultCount !== totalCount

  return (
    <section className="relative overflow-hidden border border-line/60 bg-panel/60 bl-glass">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon/40 to-transparent" />

      <div className="relative flex flex-col gap-3.5 p-4 sm:p-5">
        {/* Mode tabs */}
        <div
          role="tablist"
          aria-label="Match mode filter"
          className="flex flex-wrap items-center gap-1.5"
        >
          {TABS.map((t) => {
            const active = tab === t.key
            const count = counts[t.key] ?? 0
            const accentMap = {
              neon: {
                active:
                  "border-neon bg-neon/15 text-neon shadow-[0_0_18px_rgba(0,240,255,0.2)]",
                idle: "border-line/60 text-text-dim hover:border-neon/40 hover:text-neon",
              },
              electric: {
                active:
                  "border-electric bg-electric/15 text-electric shadow-[0_0_18px_rgba(120,220,255,0.2)]",
                idle: "border-line/60 text-text-dim hover:border-electric/40 hover:text-electric",
              },
              blood: {
                active:
                  "border-blood bg-blood/15 text-blood shadow-[0_0_18px_rgba(255,51,85,0.18)]",
                idle: "border-line/60 text-text-dim hover:border-blood/40 hover:text-blood",
              },
              gold: {
                active:
                  "border-gold bg-gold/15 text-gold shadow-[0_0_18px_rgba(255,200,80,0.2)]",
                idle: "border-line/60 text-text-dim hover:border-gold/40 hover:text-gold",
              },
            } as const
            const a = accentMap[t.accent]
            const Icon = t.icon
            return (
              <button
                key={t.key}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setTab(t.key)}
                className={cn(
                  "group inline-flex h-10 items-center gap-2 border px-3.5 font-display text-[11px] font-bold tracking-[0.18em] transition bl-clip-chevron",
                  active ? a.active : a.idle,
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{t.label.toUpperCase()}</span>
                <span className="sm:hidden">{t.short}</span>
                <span
                  className={cn(
                    "ml-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center px-1.5 font-mono text-[10px] tabular-nums",
                    active
                      ? "bg-void/60 text-text"
                      : "bg-void/50 text-text-mute",
                  )}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Search + outcome chips + range + sort */}
        <div className="flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-center">
          {/* Search */}
          <div className="relative min-w-0 flex-1 lg:max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-text-mute" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search opponents, clans, problems…"
              className={cn(
                "h-10 w-full border border-line/60 bg-void/55 pl-9 pr-9 font-mono text-[12.5px] text-text placeholder:text-text-mute",
                "outline-none transition focus:border-neon/55 focus:bg-void/70 focus:shadow-[0_0_18px_rgba(0,240,255,0.12)]",
              )}
            />
            {query && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => setQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-6 w-6 items-center justify-center text-text-mute hover:text-blood transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Outcome chips */}
          <div
            role="group"
            aria-label="Outcome filter"
            className="flex items-center gap-1.5"
          >
            <span className="hidden font-display text-[10px] font-bold tracking-[0.22em] text-text-mute sm:inline">
              OUTCOME
            </span>
            <OutcomeChip
              active={outcome === "ALL"}
              onClick={() => setOutcome("ALL")}
              label="All"
              accent="text"
            />
            <OutcomeChip
              active={outcome === "WIN"}
              onClick={() => setOutcome("WIN")}
              label="Wins"
              accent="neon"
            />
            <OutcomeChip
              active={outcome === "LOSS"}
              onClick={() => setOutcome("LOSS")}
              label="Losses"
              accent="blood"
            />
            <OutcomeChip
              active={outcome === "DRAW"}
              onClick={() => setOutcome("DRAW")}
              label="Draws"
              accent="gold"
            />
          </div>

          {/* Date range */}
          <div className="relative">
            <Calendar className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-text-mute" />
            <select
              aria-label="Date range"
              value={range}
              onChange={(e) => setRange(e.target.value as DateRange)}
              className={cn(
                "h-10 appearance-none border border-line/60 bg-void/55 pl-9 pr-8 font-display text-[11px] font-bold tracking-[0.18em] text-text-dim",
                "outline-none transition focus:border-neon/55 focus:text-text",
              )}
            >
              {RANGES.map((r) => (
                <option key={r.key} value={r.key} className="bg-void">
                  {r.label.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div className="relative">
            <ArrowDownUp className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-text-mute" />
            <select
              aria-label="Sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortMode)}
              className={cn(
                "h-10 appearance-none border border-line/60 bg-void/55 pl-9 pr-8 font-display text-[11px] font-bold tracking-[0.18em] text-text-dim",
                "outline-none transition focus:border-neon/55 focus:text-text",
              )}
            >
              {SORTS.map((s) => (
                <option key={s.key} value={s.key} className="bg-void">
                  {s.label.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          {/* Result + clear */}
          <div className="ml-auto flex items-center gap-2.5">
            <div className="inline-flex h-9 items-center gap-2 border border-line/60 bg-void/40 px-3 font-display text-[10.5px] font-bold tracking-[0.18em] text-text-dim">
              <Filter className="h-3 w-3 text-neon" />
              <span className="tabular-nums text-neon">{resultCount}</span>
              <span className="text-text-mute">/ {totalCount}</span>
            </div>
            {filtered && (
              <button
                type="button"
                onClick={onClear}
                className="inline-flex h-9 items-center gap-1.5 border border-blood/45 bg-blood/10 px-3 font-display text-[10.5px] font-bold tracking-[0.18em] text-blood hover:bg-blood/15 transition-colors"
              >
                <X className="h-3 w-3" />
                CLEAR
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function OutcomeChip({
  active,
  onClick,
  label,
  accent,
}: {
  active: boolean
  onClick: () => void
  label: string
  accent: "neon" | "blood" | "gold" | "text"
}) {
  const accentMap = {
    neon: {
      active: "border-neon bg-neon/15 text-neon",
      idle: "border-line/60 text-text-dim hover:border-neon/40 hover:text-neon",
    },
    blood: {
      active: "border-blood bg-blood/15 text-blood",
      idle: "border-line/60 text-text-dim hover:border-blood/40 hover:text-blood",
    },
    gold: {
      active: "border-gold bg-gold/15 text-gold",
      idle: "border-line/60 text-text-dim hover:border-gold/40 hover:text-gold",
    },
    text: {
      active: "border-text/60 bg-text/10 text-text",
      idle: "border-line/60 text-text-dim hover:border-text/40 hover:text-text",
    },
  } as const
  const a = accentMap[accent]
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex h-9 items-center px-3 border font-display text-[10.5px] font-bold tracking-[0.18em] transition bl-clip-chevron",
        active ? a.active : a.idle,
      )}
    >
      {label.toUpperCase()}
    </button>
  )
}
