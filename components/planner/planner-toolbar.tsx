"use client"

import { Plus, Search, X } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  CATEGORY_LIST,
  CATEGORY_META,
  PRIORITY_LIST,
  PRIORITY_META,
  STATUS_LIST,
  STATUS_META,
  SORT_OPTIONS,
  type Category,
  type Priority,
  type SortKey,
  type Status,
  accentBg,
  accentBorder,
  accentText,
} from "./planner-data"

export type FilterState = {
  search: string
  category: Category | "ALL"
  priority: Priority | "ALL"
  status: Status | "ALL"
  sort: SortKey
}

export const DEFAULT_FILTERS: FilterState = {
  search: "",
  category: "ALL",
  priority: "ALL",
  status: "ALL",
  sort: "DUE_ASC",
}

export function PlannerToolbar({
  filters,
  onChange,
  onCreate,
  taskCount,
  filteredCount,
}: {
  filters: FilterState
  onChange: (f: FilterState) => void
  onCreate: () => void
  taskCount: number
  filteredCount: number
}) {
  const hasActiveFilter =
    filters.search.length > 0 ||
    filters.category !== "ALL" ||
    filters.priority !== "ALL" ||
    filters.status !== "ALL" ||
    filters.sort !== "DUE_ASC"

  function reset() {
    onChange(DEFAULT_FILTERS)
  }

  return (
    <div className="flex flex-col gap-3 border border-line/60 bg-panel/50 p-3.5 bl-glass">
      {/* Row 1: Search + Sort + Create */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-mute"
            aria-hidden
          />
          <input
            type="search"
            value={filters.search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            placeholder="Search tasks, tags, descriptions…"
            aria-label="Search planner tasks"
            className="h-10 w-full border border-line/60 bg-void/60 pl-9 pr-3 font-mono text-[13px] text-text placeholder:text-text-mute focus:border-neon/60 focus:outline-none focus:ring-1 focus:ring-neon/40"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="sr-only" htmlFor="planner-sort">
            Sort by
          </label>
          <select
            id="planner-sort"
            value={filters.sort}
            onChange={(e) => onChange({ ...filters, sort: e.target.value as SortKey })}
            className="h-10 border border-line/60 bg-void/60 px-3 font-display text-[11px] font-bold tracking-[0.16em] text-text-dim hover:border-neon/40 focus:border-neon/60 focus:outline-none focus:ring-1 focus:ring-neon/40"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={onCreate}
            className="bl-btn-primary bl-clip-notch inline-flex h-10 items-center gap-2 px-4 font-display text-[11px] font-bold tracking-[0.18em]"
          >
            <Plus className="h-4 w-4" />
            NEW TASK
          </button>
        </div>
      </div>

      {/* Row 2: Category chips */}
      <div className="flex flex-wrap items-center gap-1.5">
        <Chip
          active={filters.category === "ALL"}
          onClick={() => onChange({ ...filters, category: "ALL" })}
          label="All categories"
        />
        {CATEGORY_LIST.map((c) => {
          const meta = CATEGORY_META[c]
          const active = filters.category === c
          return (
            <button
              key={c}
              type="button"
              onClick={() => onChange({ ...filters, category: active ? "ALL" : c })}
              aria-pressed={active}
              className={cn(
                "inline-flex h-7 items-center gap-1.5 px-2.5 font-display text-[10px] font-bold tracking-[0.18em] transition-colors",
                active
                  ? `border ${accentBorder(meta.accent)} ${accentBg(meta.accent)} ${accentText(meta.accent)}`
                  : "border border-line/60 text-text-dim hover:text-text",
              )}
            >
              <span className={cn("h-1.5 w-1.5", active ? "bg-current" : "bg-text-mute")} />
              {meta.label}
            </button>
          )
        })}
      </div>

      {/* Row 3: Priority + Status + reset */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1.5">
          <span className="font-display text-[9px] font-bold tracking-[0.22em] text-text-mute">
            PRIORITY
          </span>
          <Chip
            active={filters.priority === "ALL"}
            onClick={() => onChange({ ...filters, priority: "ALL" })}
            label="Any"
          />
          {PRIORITY_LIST.map((p) => {
            const meta = PRIORITY_META[p]
            const active = filters.priority === p
            return (
              <button
                key={p}
                type="button"
                onClick={() => onChange({ ...filters, priority: active ? "ALL" : p })}
                aria-pressed={active}
                className={cn(
                  "inline-flex h-7 items-center gap-1.5 px-2.5 font-display text-[10px] font-bold tracking-[0.18em] transition-colors",
                  active
                    ? `border ${accentBorder(meta.accent)} ${accentBg(meta.accent)} ${accentText(meta.accent)}`
                    : "border border-line/60 text-text-dim hover:text-text",
                )}
              >
                <span className="font-mono">{p}</span>
                {meta.label}
              </button>
            )
          })}
        </div>

        <div className="hidden h-5 w-px bg-line/60 md:block" />

        <div className="flex items-center gap-1.5">
          <span className="font-display text-[9px] font-bold tracking-[0.22em] text-text-mute">
            STATUS
          </span>
          <Chip
            active={filters.status === "ALL"}
            onClick={() => onChange({ ...filters, status: "ALL" })}
            label="Any"
          />
          {STATUS_LIST.map((s) => {
            const meta = STATUS_META[s]
            const active = filters.status === s
            return (
              <button
                key={s}
                type="button"
                onClick={() => onChange({ ...filters, status: active ? "ALL" : s })}
                aria-pressed={active}
                className={cn(
                  "inline-flex h-7 items-center gap-1.5 px-2.5 font-display text-[10px] font-bold tracking-[0.18em] transition-colors",
                  active
                    ? `border ${accentBorder(meta.accent)} ${accentBg(meta.accent)} ${accentText(meta.accent)}`
                    : "border border-line/60 text-text-dim hover:text-text",
                )}
              >
                {meta.label}
              </button>
            )
          })}
        </div>

        <div className="ml-auto flex items-center gap-3">
          <span className="font-mono text-[11px] text-text-mute">
            <span className="text-text">{filteredCount}</span>
            <span className="text-text-mute"> / {taskCount}</span>
          </span>
          {hasActiveFilter && (
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-1 font-display text-[10px] font-bold tracking-[0.2em] text-text-dim hover:text-blood transition-colors"
            >
              <X className="h-3 w-3" /> RESET
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function Chip({
  active,
  onClick,
  label,
}: {
  active: boolean
  onClick: () => void
  label: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex h-7 items-center px-2.5 font-display text-[10px] font-bold tracking-[0.18em] transition-colors",
        active
          ? "border border-neon/50 bg-neon/15 text-neon"
          : "border border-line/60 text-text-dim hover:text-text",
      )}
    >
      {label}
    </button>
  )
}
