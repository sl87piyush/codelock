"use client"

import { useEffect, useRef, useState } from "react"
import { CalendarOff } from "lucide-react"
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import {
  type PlannerTask,
  NOW_SEED,
  isSameUTCDay,
  startOfDayUTC,
  fmtLongDate,
} from "../planner-data"
import { TaskBlock } from "../task-block"

const HOUR_HEIGHT = 56 // px
const TOTAL_HEIGHT = 24 * HOUR_HEIGHT

function position(task: PlannerTask, dayStartMs: number) {
  const start = +new Date(task.startsAt)
  const end = +new Date(task.endsAt)
  const startMin = Math.max(0, (start - dayStartMs) / 60_000)
  const endMin = Math.min(24 * 60, (end - dayStartMs) / 60_000)
  const top = (startMin / 60) * HOUR_HEIGHT
  const height = Math.max(28, ((endMin - startMin) / 60) * HOUR_HEIGHT)
  return { top, height }
}

export function DayView({
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
  const dayStart = startOfDayUTC(cursor)
  const dayTasks = tasks.filter((t) => isSameUTCDay(+new Date(t.startsAt), cursor))

  // Current time line — start with NOW_SEED for SSR, upgrade to live time on client.
  const [nowMs, setNowMs] = useState<number>(NOW_SEED)
  useEffect(() => {
    setNowMs(Date.now())
    const id = setInterval(() => setNowMs(Date.now()), 60_000)
    return () => clearInterval(id)
  }, [])

  const showLive = isSameUTCDay(nowMs, cursor)
  const liveMin = (nowMs - dayStart) / 60_000
  const liveTop = (liveMin / 60) * HOUR_HEIGHT

  // Auto-scroll to ~6 AM (or current hour today) on mount.
  const scrollRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const targetHour = showLive ? Math.max(0, new Date(nowMs).getUTCHours() - 1) : 6
    el.scrollTop = targetHour * HOUR_HEIGHT
    // Only run once — do not re-scroll on every minute tick.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className="relative overflow-hidden border border-line/60 bg-panel/40 bl-glass">
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-20" />
      <div className="bl-corners" aria-hidden />

      <header className="relative flex items-center justify-between border-b border-line/60 bg-void/40 px-4 py-3">
        <div className="flex flex-col">
          <span className="font-display text-[9px] font-bold tracking-[0.24em] text-text-mute">
            DAY VIEW
          </span>
          <span className="font-display text-[15px] font-bold tracking-tight text-text">
            {fmtLongDate(cursor)}
          </span>
        </div>
        <div className="font-mono text-[11px] text-text-mute">
          <span className="text-text">{dayTasks.length}</span> task
          {dayTasks.length === 1 ? "" : "s"}
        </div>
      </header>

      {dayTasks.length === 0 ? (
        <div className="relative px-4 py-10">
          <Empty className="border border-dashed border-line/60 bg-void/30">
            <EmptyHeader>
              <EmptyMedia variant="icon" className="border border-line/60 bg-void/60">
                <CalendarOff className="h-5 w-5 text-text-mute" />
              </EmptyMedia>
              <EmptyTitle>No tasks scheduled</EmptyTitle>
              <EmptyDescription>
                The slate is clean for {fmtLongDate(cursor)}. Block some focus time below.
              </EmptyDescription>
            </EmptyHeader>
            <button
              type="button"
              onClick={() => onCreate(dayStart + 9 * 3_600_000)}
              className="bl-btn-primary bl-clip-notch mt-2 inline-flex h-9 items-center px-4 font-display text-[11px] font-bold tracking-[0.18em]"
            >
              + ADD TASK
            </button>
          </Empty>
        </div>
      ) : (
        <div
          ref={scrollRef}
          className="relative max-h-[640px] overflow-y-auto"
          aria-label="24-hour timeline"
        >
          <div className="relative grid grid-cols-[64px_1fr]" style={{ height: TOTAL_HEIGHT }}>
            {/* Hour rail */}
            <div className="relative border-r border-line/60">
              {Array.from({ length: 24 }).map((_, h) => (
                <div
                  key={h}
                  className="relative flex items-start justify-end pr-2"
                  style={{ height: HOUR_HEIGHT }}
                >
                  <span className="font-mono text-[10px] text-text-mute">
                    {h.toString().padStart(2, "0")}:00
                  </span>
                </div>
              ))}
            </div>

            {/* Event canvas */}
            <div className="relative">
              {/* Hour grid lines */}
              {Array.from({ length: 24 }).map((_, h) => (
                <button
                  key={h}
                  type="button"
                  aria-label={`Add task at ${h}:00`}
                  onClick={() => onCreate(dayStart + h * 3_600_000)}
                  className="absolute inset-x-0 border-b border-line/30 hover:bg-neon/5"
                  style={{ top: h * HOUR_HEIGHT, height: HOUR_HEIGHT }}
                />
              ))}

              {/* Live time line */}
              {showLive && liveTop >= 0 && liveTop <= TOTAL_HEIGHT && (
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 z-20 flex items-center"
                  style={{ top: liveTop }}
                >
                  <span className="ml-[-6px] h-2.5 w-2.5 rounded-full bg-blood shadow-[0_0_10px_var(--color-blood)] bl-flicker" />
                  <span className="h-px flex-1 bg-blood/80" />
                </div>
              )}

              {/* Event blocks */}
              {dayTasks.map((t) => {
                const { top, height } = position(t, dayStart)
                return (
                  <div
                    key={t.id}
                    className="absolute left-2 right-3 z-10"
                    style={{ top, height }}
                  >
                    <TaskBlock task={t} onClick={onSelectTask} density="comfortable" />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
