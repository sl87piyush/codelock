"use client"

import { ArrowRight, Flame, Sparkles, Target, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  type PlannerTask,
  CATEGORY_META,
  NOW_SEED,
  PRIORITY_META,
  accentBgSolid,
  accentText,
  fmtTime12,
  fmtDuration,
  durationMinutes,
  isSameUTCDay,
} from "./planner-data"

const D = 86_400_000

const PROTOCOL = [
  {
    title: "Top of mind, top of stack",
    desc: "Schedule your hardest cognitive work in the first 90 minutes after waking.",
  },
  {
    title: "P0 lock-in",
    desc: "Critical tasks get a 25-minute warning. No reschedules without a written reason.",
  },
  {
    title: "Recovery is training",
    desc: "Block at least 60 minutes of mandatory recovery every 4 hours of focused work.",
  },
]

const TIPS = [
  { icon: Zap, label: "Practice ↔ Battle ↔ Recovery rotation" },
  { icon: Target, label: "Mock OAs every 48 hours" },
  { icon: Sparkles, label: "Review session within 90 minutes of finishing" },
]

export function PlannerRail({
  tasks,
  onSelectTask,
}: {
  tasks: PlannerTask[]
  onSelectTask: (t: PlannerTask) => void
}) {
  // Up next — earliest non-done task starting from NOW_SEED
  const upcoming = [...tasks]
    .filter(
      (t) =>
        t.status !== "DONE" &&
        t.status !== "CANCELLED" &&
        +new Date(t.startsAt) >= NOW_SEED - 30 * 60_000,
    )
    .sort((a, b) => +new Date(a.startsAt) - +new Date(b.startsAt))
    .slice(0, 4)

  // Tomorrow's preview
  const tomorrowMs = NOW_SEED + D
  const tomorrowTasks = tasks
    .filter((t) => isSameUTCDay(+new Date(t.startsAt), tomorrowMs))
    .sort((a, b) => +new Date(a.startsAt) - +new Date(b.startsAt))
    .slice(0, 3)

  return (
    <aside className="flex flex-col gap-4 xl:sticky xl:top-[88px] xl:max-h-[calc(100vh-104px)] xl:overflow-y-auto xl:pr-1">
      {/* Up Next */}
      <section className="relative overflow-hidden border border-line/60 bg-panel/50 bl-glass">
        <div className="bl-side-stripe" aria-hidden />
        <header className="flex items-center justify-between border-b border-line/60 px-4 py-3">
          <div className="flex items-center gap-2">
            <Flame className="h-4 w-4 text-ember" />
            <span className="font-display text-[11px] font-bold tracking-[0.22em] text-text">
              UP NEXT
            </span>
          </div>
          <span className="font-mono text-[10px] text-text-mute">
            {upcoming.length} pending
          </span>
        </header>

        <ul className="divide-y divide-line/40">
          {upcoming.length === 0 && (
            <li className="px-4 py-6 text-center font-mono text-[12px] text-text-mute">
              All caught up. Plan something next.
            </li>
          )}
          {upcoming.map((t) => {
            const cat = CATEGORY_META[t.category]
            const prio = PRIORITY_META[t.priority]
            const startMs = +new Date(t.startsAt)
            const minutesAway = Math.round((startMs - NOW_SEED) / 60_000)
            const inFuture = minutesAway > 0
            const counter =
              minutesAway < 0
                ? "now"
                : minutesAway < 60
                  ? `in ${minutesAway}m`
                  : minutesAway < 60 * 24
                    ? `in ${Math.round(minutesAway / 60)}h`
                    : `in ${Math.round(minutesAway / (60 * 24))}d`

            return (
              <li key={t.id}>
                <button
                  type="button"
                  onClick={() => onSelectTask(t)}
                  className="group flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-neon/[0.04]"
                >
                  <span
                    className={cn("mt-1 h-8 w-1 shrink-0", accentBgSolid(cat.accent))}
                    aria-hidden
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={cn(
                          "h-1.5 w-1.5 rounded-full",
                          accentBgSolid(prio.accent),
                          t.priority === "P0" && "bl-flicker",
                        )}
                      />
                      <span className="font-display text-[12.5px] font-bold tracking-tight text-text truncate">
                        {t.title}
                      </span>
                    </div>
                    <div className="mt-0.5 flex items-center gap-2 font-mono text-[10.5px] text-text-mute">
                      <span className={accentText(cat.accent)}>{cat.short}</span>
                      <span>·</span>
                      <span>{fmtTime12(startMs)}</span>
                      <span>·</span>
                      <span>{fmtDuration(durationMinutes(t.startsAt, t.endsAt))}</span>
                    </div>
                  </div>
                  <span
                    className={cn(
                      "shrink-0 self-center border px-1.5 py-0.5 font-display text-[9.5px] font-bold tracking-[0.18em]",
                      inFuture
                        ? "border-neon/40 bg-neon/10 text-neon"
                        : "border-blood/50 bg-blood/15 text-blood bl-flicker",
                    )}
                  >
                    {counter.toUpperCase()}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </section>

      {/* Tomorrow preview */}
      <section className="relative overflow-hidden border border-line/60 bg-panel/50 bl-glass">
        <header className="flex items-center justify-between border-b border-line/60 px-4 py-3">
          <div className="flex items-center gap-2">
            <ArrowRight className="h-4 w-4 text-electric" />
            <span className="font-display text-[11px] font-bold tracking-[0.22em] text-text">
              TOMORROW
            </span>
          </div>
          <span className="font-mono text-[10px] text-text-mute">
            {tomorrowTasks.length} planned
          </span>
        </header>
        <ul className="divide-y divide-line/40">
          {tomorrowTasks.length === 0 && (
            <li className="px-4 py-5 text-center font-mono text-[11.5px] text-text-mute">
              Nothing scheduled. Open canvas.
            </li>
          )}
          {tomorrowTasks.map((t) => {
            const cat = CATEGORY_META[t.category]
            return (
              <li key={t.id}>
                <button
                  type="button"
                  onClick={() => onSelectTask(t)}
                  className="flex w-full items-center gap-2 px-4 py-2.5 text-left transition-colors hover:bg-neon/[0.04]"
                >
                  <span
                    className={cn("h-3 w-1 shrink-0", accentBgSolid(cat.accent))}
                    aria-hidden
                  />
                  <span className="font-mono text-[10.5px] text-text-mute">
                    {fmtTime12(+new Date(t.startsAt))}
                  </span>
                  <span className="min-w-0 truncate font-display text-[12px] font-semibold tracking-tight text-text">
                    {t.title}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </section>

      {/* Protocol */}
      <section className="relative overflow-hidden border border-gold/40 bg-panel/50 bl-glass">
        <div className="pointer-events-none absolute inset-0 bg-gold/[0.02]" />
        <header className="flex items-center gap-2 border-b border-line/60 px-4 py-3">
          <Sparkles className="h-4 w-4 text-gold" />
          <span className="font-display text-[11px] font-bold tracking-[0.22em] text-text">
            PLANNER PROTOCOL
          </span>
        </header>
        <ol className="space-y-3 px-4 py-4">
          {PROTOCOL.map((p, i) => (
            <li key={p.title} className="flex items-start gap-3">
              <span className="font-display text-[18px] font-bold leading-none tracking-tight text-gold/70">
                {(i + 1).toString().padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <div className="font-display text-[12px] font-bold tracking-tight text-text">
                  {p.title}
                </div>
                <p className="mt-0.5 font-mono text-[11px] leading-relaxed text-text-dim">
                  {p.desc}
                </p>
              </div>
            </li>
          ))}
        </ol>
        <ul className="space-y-1.5 border-t border-line/60 px-4 py-3">
          {TIPS.map((t) => {
            const Icon = t.icon
            return (
              <li
                key={t.label}
                className="flex items-center gap-2 font-mono text-[11px] text-text-dim"
              >
                <Icon className="h-3 w-3 text-gold/70" />
                {t.label}
              </li>
            )
          })}
        </ul>
      </section>
    </aside>
  )
}
