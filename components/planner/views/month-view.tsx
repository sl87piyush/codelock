"use client"

import { cn } from "@/lib/utils"
import {
  type PlannerTask,
  CATEGORY_META,
  NOW_SEED,
  PRIORITY_META,
  accentBgSolid,
  accentText,
  fmtMonthShort,
  fmtTime12,
  isSameUTCDay,
  startOfMonthUTC,
  startOfWeekUTC,
} from "../planner-data"

const D = 86_400_000
const WEEKDAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]
const MAX_VISIBLE = 3

export function MonthView({
  cursor,
  tasks,
  onSelectTask,
  onSelectDay,
}: {
  cursor: number
  tasks: PlannerTask[]
  onSelectTask: (t: PlannerTask) => void
  onSelectDay: (ms: number) => void
}) {
  const monthStart = startOfMonthUTC(cursor)
  const gridStart = startOfWeekUTC(monthStart)
  const monthDate = new Date(monthStart)
  const monthIdx = monthDate.getUTCMonth()
  const cells = Array.from({ length: 42 }, (_, i) => gridStart + i * D)

  return (
    <section className="relative overflow-hidden border border-line/60 bg-panel/40 bl-glass">
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-20" />
      <div className="bl-corners" aria-hidden />

      <header
        className="relative grid border-b border-line/60 bg-void/40"
        style={{ gridTemplateColumns: "repeat(7, minmax(0, 1fr))" }}
      >
        {WEEKDAYS.map((w) => (
          <div
            key={w}
            className="border-l border-line/60 px-2 py-2.5 font-display text-[9.5px] font-bold tracking-[0.22em] text-text-mute first:border-l-0"
          >
            {w}
          </div>
        ))}
      </header>

      <div
        className="relative grid"
        style={{ gridTemplateColumns: "repeat(7, minmax(0, 1fr))" }}
      >
        {cells.map((d, idx) => {
          const inMonth = new Date(d).getUTCMonth() === monthIdx
          const isToday = isSameUTCDay(d, NOW_SEED)
          const dayTasks = tasks
            .filter((t) => isSameUTCDay(+new Date(t.startsAt), d))
            .sort((a, b) => +new Date(a.startsAt) - +new Date(b.startsAt))
          const visible = dayTasks.slice(0, MAX_VISIBLE)
          const overflow = dayTasks.length - visible.length

          return (
            <div
              key={d}
              className={cn(
                "group relative flex min-h-[112px] flex-col gap-1.5 border-l border-t border-line/40 p-2 transition-colors",
                idx < 7 && "border-t-0",
                idx % 7 === 0 && "border-l-0",
                inMonth ? "bg-void/20" : "bg-void/40",
                isToday && "bg-neon/[0.04]",
              )}
            >
              {/* Date number row */}
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => onSelectDay(d)}
                  className={cn(
                    "inline-flex h-6 min-w-[24px] items-center justify-center font-display text-[12px] font-bold tracking-tight transition-colors",
                    isToday
                      ? "border border-neon/60 bg-neon/15 px-1.5 text-neon shadow-[0_0_8px_rgba(0,240,255,0.35)]"
                      : inMonth
                        ? "text-text hover:text-neon"
                        : "text-text-mute hover:text-text-dim",
                  )}
                  aria-label={`Open ${fmtMonthShort(d)} ${new Date(d).getUTCDate()}`}
                >
                  {new Date(d).getUTCDate()}
                </button>
                {dayTasks.length > 0 && (
                  <span className="font-mono text-[9px] text-text-mute">
                    {dayTasks.length}
                  </span>
                )}
              </div>

              {/* Event chips */}
              <div className="flex flex-1 flex-col gap-1">
                {visible.map((t) => {
                  const cat = CATEGORY_META[t.category]
                  const prio = PRIORITY_META[t.priority]
                  const isDone = t.status === "DONE"
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => onSelectTask(t)}
                      className={cn(
                        "group/chip flex items-center gap-1 overflow-hidden border border-line/60 bg-void/70 px-1.5 py-0.5 text-left transition-colors hover:border-neon/50",
                        isDone && "opacity-60",
                      )}
                    >
                      <span
                        className={cn("h-2 w-0.5 shrink-0", accentBgSolid(cat.accent))}
                        aria-hidden
                      />
                      <span
                        className={cn(
                          "h-1 w-1 shrink-0 rounded-full",
                          accentBgSolid(prio.accent),
                        )}
                        aria-hidden
                      />
                      <span className="font-mono text-[9.5px] text-text-mute">
                        {fmtTime12(+new Date(t.startsAt)).replace(":00", "")}
                      </span>
                      <span
                        className={cn(
                          "min-w-0 flex-1 truncate font-display text-[10.5px] font-semibold tracking-tight text-text",
                          isDone && "line-through",
                        )}
                      >
                        {t.title}
                      </span>
                    </button>
                  )
                })}
                {overflow > 0 && (
                  <button
                    type="button"
                    onClick={() => onSelectDay(d)}
                    className={cn(
                      "self-start font-display text-[9.5px] font-bold tracking-[0.18em] transition-colors",
                      accentText("electric"),
                    )}
                  >
                    +{overflow} MORE
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
