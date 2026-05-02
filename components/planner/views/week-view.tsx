"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import {
  type PlannerTask,
  NOW_SEED,
  fmtMonthShort,
  fmtWeekdayShort,
  isSameUTCDay,
  startOfDayUTC,
  startOfWeekUTC,
} from "../planner-data"
import { TaskBlock } from "../task-block"

const HOUR_HEIGHT = 44
const TOTAL_HEIGHT = 24 * HOUR_HEIGHT
const D = 86_400_000

function position(task: PlannerTask, dayStartMs: number) {
  const start = +new Date(task.startsAt)
  const end = +new Date(task.endsAt)
  const startMin = Math.max(0, (start - dayStartMs) / 60_000)
  const endMin = Math.min(24 * 60, (end - dayStartMs) / 60_000)
  return {
    top: (startMin / 60) * HOUR_HEIGHT,
    height: Math.max(22, ((endMin - startMin) / 60) * HOUR_HEIGHT),
  }
}

export function WeekView({
  cursor,
  tasks,
  onSelectTask,
  onCreate,
}: {
  cursor: number
  tasks: PlannerTask[]
  onSelectTask: (t: PlannerTask) => void
  onCreate: (atMs?: number) => void
}) {
  const weekStart = startOfWeekUTC(cursor)
  const days = Array.from({ length: 7 }, (_, i) => weekStart + i * D)

  const [nowMs, setNowMs] = useState<number>(NOW_SEED)
  useEffect(() => {
    setNowMs(Date.now())
    const id = setInterval(() => setNowMs(Date.now()), 60_000)
    return () => clearInterval(id)
  }, [])

  // Auto-scroll the canvas to ~6 AM.
  const scrollRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 6 * HOUR_HEIGHT
    }
  }, [])

  return (
    <section className="relative overflow-hidden border border-line/60 bg-panel/40 bl-glass">
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-20" />
      <div className="bl-corners" aria-hidden />

      {/* Day headers */}
      <header className="relative grid border-b border-line/60 bg-void/40" style={{ gridTemplateColumns: "56px repeat(7, minmax(0, 1fr))" }}>
        <div className="border-r border-line/60 px-2 py-3 font-display text-[9px] font-bold tracking-[0.22em] text-text-mute">
          UTC
        </div>
        {days.map((d) => {
          const isToday = isSameUTCDay(d, NOW_SEED)
          const dayTaskCount = tasks.filter((t) => isSameUTCDay(+new Date(t.startsAt), d)).length
          return (
            <div
              key={d}
              className={cn(
                "flex flex-col items-center gap-1 border-l border-line/60 px-2 py-2.5 transition-colors",
                isToday && "bg-neon/5",
              )}
            >
              <span className="font-display text-[9.5px] font-bold tracking-[0.22em] text-text-mute">
                {fmtWeekdayShort(d)}
              </span>
              <span
                className={cn(
                  "flex h-7 w-7 items-center justify-center font-display text-[14px] font-bold tracking-tight",
                  isToday
                    ? "border border-neon/60 bg-neon/15 text-neon shadow-[0_0_10px_rgba(0,240,255,0.4)]"
                    : "text-text",
                )}
              >
                {new Date(d).getUTCDate()}
              </span>
              <span className="font-mono text-[9.5px] text-text-mute">
                {fmtMonthShort(d)} · {dayTaskCount}
              </span>
            </div>
          )
        })}
      </header>

      <div ref={scrollRef} className="relative max-h-[600px] overflow-y-auto">
        <div className="relative grid" style={{ gridTemplateColumns: "56px repeat(7, minmax(0, 1fr))", height: TOTAL_HEIGHT }}>
          {/* Hour rail */}
          <div className="relative border-r border-line/60">
            {Array.from({ length: 24 }).map((_, h) => (
              <div
                key={h}
                className="relative flex items-start justify-end pr-1.5"
                style={{ height: HOUR_HEIGHT }}
              >
                <span className="font-mono text-[9.5px] text-text-mute">
                  {h.toString().padStart(2, "0")}
                </span>
              </div>
            ))}
          </div>

          {/* Day columns */}
          {days.map((d) => {
            const dayStart = startOfDayUTC(d)
            const dayTasks = tasks.filter((t) => isSameUTCDay(+new Date(t.startsAt), d))
            const isToday = isSameUTCDay(d, NOW_SEED)
            const showLive = isToday && isSameUTCDay(nowMs, d)
            const liveTop = ((nowMs - dayStart) / 3_600_000) * HOUR_HEIGHT

            return (
              <div
                key={d}
                className={cn(
                  "relative border-l border-line/60",
                  isToday && "bg-neon/[0.02]",
                )}
              >
                {/* hour grid */}
                {Array.from({ length: 24 }).map((_, h) => (
                  <button
                    key={h}
                    type="button"
                    onClick={() => onCreate(dayStart + h * 3_600_000)}
                    className="absolute inset-x-0 border-b border-line/20 hover:bg-neon/5"
                    style={{ top: h * HOUR_HEIGHT, height: HOUR_HEIGHT }}
                    aria-label={`Add task on ${fmtWeekdayShort(d)} at ${h}:00`}
                  />
                ))}

                {showLive && liveTop >= 0 && liveTop <= TOTAL_HEIGHT && (
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 z-20 flex items-center"
                    style={{ top: liveTop }}
                  >
                    <span className="ml-[-4px] h-2 w-2 rounded-full bg-blood shadow-[0_0_8px_var(--color-blood)] bl-flicker" />
                    <span className="h-px flex-1 bg-blood/80" />
                  </div>
                )}

                {dayTasks.map((t) => {
                  const { top, height } = position(t, dayStart)
                  return (
                    <div
                      key={t.id}
                      className="absolute left-1 right-1 z-10"
                      style={{ top, height }}
                    >
                      <TaskBlock task={t} onClick={onSelectTask} density="dense" hideTime />
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
