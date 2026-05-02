"use client"

import { CalendarRange, ChevronLeft, ChevronRight, Columns3, Grid3x3, List } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  fmtLongDate,
  fmtMonthRange,
  fmtWeekRange,
  startOfMonthUTC,
  startOfWeekUTC,
} from "./planner-data"

export type ViewMode = "DAY" | "WEEK" | "MONTH" | "LIST"

const VIEWS: { id: ViewMode; label: string; icon: React.ComponentType<{ className?: string }> }[] =
  [
    { id: "DAY", label: "Day", icon: CalendarRange },
    { id: "WEEK", label: "Week", icon: Columns3 },
    { id: "MONTH", label: "Month", icon: Grid3x3 },
    { id: "LIST", label: "List", icon: List },
  ]

export function ViewSwitcher({
  view,
  onViewChange,
  cursor,
  onCursorChange,
  onJumpToday,
}: {
  view: ViewMode
  onViewChange: (v: ViewMode) => void
  /** Current focused day in ms (UTC). Drives the date label. */
  cursor: number
  onCursorChange: (ms: number) => void
  onJumpToday: () => void
}) {
  const D = 86_400_000

  function shift(direction: -1 | 1) {
    if (view === "DAY") {
      onCursorChange(cursor + direction * D)
    } else if (view === "WEEK") {
      onCursorChange(cursor + direction * 7 * D)
    } else if (view === "MONTH") {
      const d = new Date(cursor)
      const next = Date.UTC(
        d.getUTCFullYear(),
        d.getUTCMonth() + direction,
        Math.min(d.getUTCDate(), 28),
      )
      onCursorChange(next)
    } else {
      onCursorChange(cursor + direction * 7 * D)
    }
  }

  const rangeLabel =
    view === "DAY"
      ? fmtLongDate(cursor)
      : view === "WEEK"
        ? fmtWeekRange(startOfWeekUTC(cursor))
        : view === "MONTH"
          ? fmtMonthRange(startOfMonthUTC(cursor))
          : "All Tasks"

  const subLabel =
    view === "DAY"
      ? "Day · 24-hour timeline"
      : view === "WEEK"
        ? "Week · Mon → Sun"
        : view === "MONTH"
          ? "Month · calendar grid"
          : "List · sortable"

  return (
    <div className="flex flex-col gap-3 border border-line/60 bg-panel/50 p-3 bl-glass md:flex-row md:items-center md:justify-between md:p-3.5">
      {/* Left: Date navigator */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => shift(-1)}
          aria-label="Previous"
          className="flex h-9 w-9 items-center justify-center border border-line/60 bg-void/60 text-text-dim hover:border-neon/50 hover:text-neon transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={onJumpToday}
          className="h-9 border border-neon/40 bg-neon/10 px-3 font-display text-[10px] font-bold tracking-[0.22em] text-neon hover:bg-neon/20 transition-colors bl-clip-chevron"
        >
          TODAY
        </button>
        <button
          type="button"
          onClick={() => shift(1)}
          aria-label="Next"
          className="flex h-9 w-9 items-center justify-center border border-line/60 bg-void/60 text-text-dim hover:border-neon/50 hover:text-neon transition-colors"
        >
          <ChevronRight className="h-4 w-4" />
        </button>

        <div className="ml-2 flex flex-col leading-tight">
          <span className="font-display text-[9px] font-bold tracking-[0.24em] text-text-mute">
            {subLabel}
          </span>
          <span className="font-display text-[15px] font-bold tracking-tight text-text">
            {rangeLabel}
          </span>
        </div>
      </div>

      {/* Right: View tabs */}
      <div
        role="tablist"
        aria-label="Calendar view"
        className="inline-flex items-center gap-1 border border-line/60 bg-void/60 p-1"
      >
        {VIEWS.map((v) => {
          const active = view === v.id
          const Icon = v.icon
          return (
            <button
              key={v.id}
              role="tab"
              aria-selected={active}
              type="button"
              onClick={() => onViewChange(v.id)}
              className={cn(
                "inline-flex h-7 items-center gap-1.5 px-3 font-display text-[10.5px] font-bold tracking-[0.18em] transition-colors",
                active
                  ? "bg-neon/15 text-neon shadow-[inset_0_0_0_1px_rgba(0,240,255,0.4)]"
                  : "text-text-dim hover:text-text",
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {v.label.toUpperCase()}
            </button>
          )
        })}
      </div>
    </div>
  )
}
