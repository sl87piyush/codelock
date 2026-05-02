"use client"

import { Search, X } from "lucide-react"
import {
  SORT_OPTIONS,
  STATUS_FILTERS,
  TOPICS,
  type SortId,
  type StatusFilterId,
  type TopicId,
} from "./doubt-data"
import { cn } from "@/lib/utils"

type Props = {
  search: string
  setSearch: (v: string) => void
  sort: SortId
  setSort: (v: SortId) => void
  status: StatusFilterId
  setStatus: (v: StatusFilterId) => void
  topic: TopicId
  setTopic: (v: TopicId) => void
  total: number
}

export function DoubtFilterBar({
  search,
  setSearch,
  sort,
  setSort,
  status,
  setStatus,
  topic,
  setTopic,
  total,
}: Props) {
  return (
    <div className="flex flex-col gap-4">
      {/* Search + sort + status row */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-mute" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search doubts, tags, authors…"
            className="w-full border border-line/70 bg-void/50 pl-9 pr-9 py-2.5 text-[13.5px] text-text placeholder:text-text-mute outline-none transition-colors focus:border-neon/60"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-6 w-6 items-center justify-center text-text-mute hover:text-blood transition-colors"
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Status segmented control */}
        <div
          role="tablist"
          aria-label="Status filter"
          className="inline-flex h-10 items-center border border-line/70 bg-void/40 p-0.5"
        >
          {STATUS_FILTERS.map((s) => {
            const active = status === s.id
            const accent =
              s.id === "open"
                ? "text-neon"
                : s.id === "resolved"
                  ? "text-gold"
                  : s.id === "bounty"
                    ? "text-ember"
                    : "text-text"
            return (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setStatus(s.id)}
                className={cn(
                  "inline-flex h-full min-w-[68px] items-center justify-center px-3 font-display text-[10px] font-bold tracking-[0.2em] transition-colors",
                  active
                    ? `bg-panel/80 ${accent} shadow-[inset_0_-2px_0_currentColor]`
                    : "text-text-mute hover:text-text",
                )}
              >
                {s.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Sort + count + topics */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-display text-[10px] font-bold tracking-[0.22em] text-text-mute">
            SORT BY
          </span>
          {SORT_OPTIONS.map((s) => {
            const active = sort === s.id
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setSort(s.id)}
                className={cn(
                  "inline-flex h-7 items-center px-2.5 font-display text-[10px] font-bold tracking-[0.18em] transition-all border",
                  active
                    ? "border-neon/60 bg-neon/10 text-neon"
                    : "border-line/60 text-text-mute hover:text-text",
                )}
              >
                {s.label}
              </button>
            )
          })}
        </div>

        <div className="flex items-center gap-2 font-mono text-[11px] tabular-nums text-text-mute">
          <span className="text-text font-display tracking-[0.18em] text-[10px] font-bold">
            {total.toLocaleString()}
          </span>
          DOUBTS MATCHING
        </div>
      </div>

      {/* Topic chips — horizontal scroll on mobile */}
      <div className="-mx-1 overflow-x-auto pb-1">
        <div className="flex min-w-min items-center gap-1.5 px-1">
          {TOPICS.map((t) => {
            const active = topic === t.id
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTopic(t.id)}
                className={cn(
                  "group inline-flex h-8 shrink-0 items-center gap-2 px-3 font-display text-[10px] font-bold tracking-[0.18em] transition-all border",
                  active
                    ? "border-neon/60 bg-neon/15 text-neon shadow-[0_0_18px_rgba(0,240,255,0.2)]"
                    : "border-line/60 bg-void/30 text-text-dim hover:border-line hover:text-text",
                )}
              >
                {t.label}
                <span
                  className={cn(
                    "inline-flex h-4 min-w-[1.25rem] items-center justify-center px-1 font-mono text-[9px] tabular-nums",
                    active ? "bg-neon/20 text-neon" : "bg-panel/70 text-text-mute group-hover:text-text",
                  )}
                >
                  {t.count}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
