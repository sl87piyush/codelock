"use client"

import { ChevronDown, Filter, Search, X } from "lucide-react"
import {
  DIFFICULTIES,
  type Difficulty,
  OA_TYPES,
  type AssessmentStatus,
  type AssessmentType,
  SORT_OPTIONS,
  type SortKey,
  STATUS_TABS,
} from "./oa-arena-data"
import { cn } from "@/lib/utils"

export type Filters = {
  status: AssessmentStatus | "ALL"
  type: AssessmentType | "ALL"
  difficulty: Difficulty | "ALL"
  sort: SortKey
  search: string
  company: string | "ALL"
}

const COMPANIES = [
  "ALL",
  "Google",
  "Meta",
  "Amazon",
  "Microsoft",
  "Apple",
  "Netflix",
  "Stripe",
  "Uber",
  "Airbnb",
  "OpenAI",
] as const

export function OaFilterBar({
  filters,
  setFilters,
  counts,
}: {
  filters: Filters
  setFilters: (f: Filters) => void
  counts: Record<AssessmentStatus | "ALL", number>
}) {
  const update = <K extends keyof Filters>(k: K, v: Filters[K]) =>
    setFilters({ ...filters, [k]: v })

  return (
    <div className="relative overflow-hidden border border-line/60 bg-panel/60 bl-glass">
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-20" />

      <div className="relative flex flex-col gap-3 p-3 lg:p-4">
        {/* Top row: search + sort */}
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <label className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-mute" />
            <input
              type="search"
              value={filters.search}
              onChange={(e) => update("search", e.target.value)}
              placeholder="Search by company, role, topic, or ID…"
              aria-label="Search assessments"
              className="w-full border border-line/60 bg-void/60 py-2.5 pl-10 pr-10 font-mono text-[13px] text-text placeholder:text-text-mute focus:border-neon/60 focus:outline-none"
            />
            {filters.search && (
              <button
                type="button"
                onClick={() => update("search", "")}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-text-mute hover:text-text"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </label>

          {/* Sort */}
          <div className="relative">
            <select
              value={filters.sort}
              onChange={(e) => update("sort", e.target.value as SortKey)}
              aria-label="Sort"
              className="appearance-none border border-line/60 bg-void/60 py-2.5 pl-9 pr-9 font-display text-[11px] font-bold tracking-[0.18em] text-text uppercase focus:border-neon/60 focus:outline-none"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.id} value={o.id}>
                  Sort · {o.label}
                </option>
              ))}
            </select>
            <Filter className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-text-mute" />
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-text-mute" />
          </div>

          {/* Company select */}
          <div className="relative">
            <select
              value={filters.company}
              onChange={(e) => update("company", e.target.value)}
              aria-label="Filter by company"
              className="appearance-none border border-line/60 bg-void/60 py-2.5 pl-3 pr-9 font-display text-[11px] font-bold tracking-[0.18em] text-text uppercase focus:border-neon/60 focus:outline-none"
            >
              {COMPANIES.map((c) => (
                <option key={c} value={c}>
                  {c === "ALL" ? "All Companies" : c}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-text-mute" />
          </div>
        </div>

        {/* Status tabs */}
        <div className="flex flex-wrap items-center gap-1.5 border-t border-line/40 pt-3">
          {STATUS_TABS.map((tab) => {
            const active = filters.status === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => update("status", tab.id)}
                aria-pressed={active}
                className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-1.5 font-display text-[11px] font-bold tracking-[0.18em] transition-colors bl-clip-chevron",
                  active
                    ? "bg-neon/15 text-neon border border-neon/50"
                    : "border border-line/60 text-text-dim hover:text-text",
                )}
              >
                <span>{tab.label.toUpperCase()}</span>
                <span
                  className={cn(
                    "inline-flex h-4 min-w-[18px] items-center justify-center px-1 font-mono text-[9px]",
                    active
                      ? "bg-neon/20 text-neon"
                      : "bg-text-mute/10 text-text-mute",
                  )}
                >
                  {counts[tab.id] ?? 0}
                </span>
              </button>
            )
          })}
        </div>

        {/* Type + Difficulty chips */}
        <div className="flex flex-col gap-2 border-t border-line/40 pt-3 lg:flex-row lg:items-center lg:gap-4">
          <ChipGroup
            label="TYPE"
            items={OA_TYPES}
            active={filters.type}
            onChange={(v) => update("type", v as AssessmentType | "ALL")}
          />
          <div className="hidden h-5 w-px bg-line/60 lg:block" />
          <ChipGroup
            label="DIFFICULTY"
            items={DIFFICULTIES}
            active={filters.difficulty}
            onChange={(v) => update("difficulty", v as Difficulty | "ALL")}
          />
        </div>
      </div>
    </div>
  )
}

function ChipGroup<T extends string>({
  label,
  items,
  active,
  onChange,
}: {
  label: string
  items: ReadonlyArray<{ id: T; label: string }>
  active: T
  onChange: (v: T) => void
}) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="mr-1 font-display text-[10px] font-bold tracking-[0.24em] text-text-mute">
        {label}
      </span>
      {items.map((item) => {
        const isActive = active === item.id
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onChange(item.id)}
            className={cn(
              "h-7 px-2.5 font-display text-[10px] font-bold tracking-[0.18em] transition-colors",
              isActive
                ? "bg-electric/15 text-electric border border-electric/50"
                : "border border-line/60 text-text-dim hover:text-text",
            )}
          >
            {item.label.toUpperCase()}
          </button>
        )
      })}
    </div>
  )
}
