import { CalendarDays, CheckCircle2, Flame, Clock3, AlertCircle } from "lucide-react"
import {
  type PlannerTask,
  NOW_SEED,
  startOfDayUTC,
  startOfWeekUTC,
  isSameUTCDay,
  fmtLongDate,
} from "./planner-data"

function pct(n: number, d: number) {
  return d === 0 ? 0 : Math.round((n / d) * 100)
}

export function PlannerHeader({ tasks }: { tasks: PlannerTask[] }) {
  const todayStart = startOfDayUTC(NOW_SEED)
  const weekStart = startOfWeekUTC(NOW_SEED)
  const weekEnd = weekStart + 7 * 86_400_000

  const todayTasks = tasks.filter((t) => isSameUTCDay(+new Date(t.startsAt), NOW_SEED))
  const todayDone = todayTasks.filter((t) => t.status === "DONE").length
  const todayPct = pct(todayDone, todayTasks.length)

  const weekTasks = tasks.filter((t) => {
    const start = +new Date(t.startsAt)
    return start >= weekStart && start < weekEnd
  })
  const weekDone = weekTasks.filter((t) => t.status === "DONE").length

  const inProgress = tasks.filter((t) => t.status === "IN_PROGRESS").length
  const overdue = tasks.filter((t) => {
    const end = +new Date(t.endsAt)
    return end < NOW_SEED && t.status !== "DONE" && t.status !== "CANCELLED"
  }).length

  // Streak — consecutive past days with at least one DONE task (counting today if any DONE)
  let streak = 0
  for (let off = 0; off < 30; off++) {
    const dayMs = todayStart - off * 86_400_000
    const hadDone = tasks.some(
      (t) => t.status === "DONE" && isSameUTCDay(+new Date(t.startsAt), dayMs),
    )
    if (hadDone) streak += 1
    else if (off > 0) break
    else if (off === 0) {
      // allow today to be empty without breaking streak yet
      continue
    }
  }

  return (
    <section className="relative overflow-hidden border border-line/60 bg-panel/60 bl-glass">
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-30" />
      <div className="pointer-events-none absolute -top-32 -right-32 h-72 w-72 rounded-full bg-neon/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-electric/10 blur-3xl" />
      <div className="bl-corners" aria-hidden />

      <div className="relative grid gap-6 p-6 lg:grid-cols-[1.4fr_1fr] lg:gap-8 lg:p-8">
        {/* Left: title + today summary */}
        <div className="flex flex-col gap-4">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-[10px] tracking-[0.3em] text-neon/80">
              // OPERATIONS_DECK
            </span>
          </div>

          <div>
            <h1 className="font-display text-3xl font-bold tracking-tight text-text lg:text-[40px] lg:leading-[1.05]">
              Tactical <span className="text-neon text-glow">Planner</span>
            </h1>
            <p className="mt-2 max-w-xl text-[13.5px] leading-relaxed text-text-dim">
              Engineer your week with surgical focus. Practice, battles, mock OAs and recovery —
              all stacked, prioritized and accountable.
            </p>
          </div>

          <div className="mt-2 flex items-center gap-3 border-t border-line/60 pt-4">
            <div className="flex h-11 w-11 items-center justify-center border border-neon/40 bg-neon/10">
              <CalendarDays className="h-5 w-5 text-neon" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-[10px] font-bold tracking-[0.22em] text-text-mute">
                TODAY
              </span>
              <span className="font-display text-[15px] font-bold tracking-tight text-text">
                {fmtLongDate(NOW_SEED)}
              </span>
            </div>

            <div className="ml-auto flex items-center gap-3">
              <div className="hidden h-9 w-px bg-line/60 md:block" />
              <div className="flex flex-col items-end">
                <span className="font-display text-[10px] font-bold tracking-[0.22em] text-text-mute">
                  TODAY PROGRESS
                </span>
                <span className="font-display text-base font-bold tracking-tight text-neon text-glow">
                  {todayDone}/{todayTasks.length}
                  <span className="ml-1.5 font-mono text-[11px] text-text-dim">· {todayPct}%</span>
                </span>
              </div>
            </div>
          </div>

          <div className="bl-bar-track h-1.5 w-full">
            <div
              className="h-full bg-gradient-to-r from-neon via-electric to-neon shadow-[0_0_12px_rgba(0,240,255,0.6)]"
              style={{ width: `${todayPct}%` }}
            />
          </div>
        </div>

        {/* Right: KPI tiles */}
        <div className="grid grid-cols-2 gap-3">
          <Kpi
            icon={Flame}
            iconCls="text-ember"
            iconBg="bg-ember/15 border-ember/40"
            label="STREAK"
            value={streak}
            suffix="days"
          />
          <Kpi
            icon={CheckCircle2}
            iconCls="text-neon"
            iconBg="bg-neon/15 border-neon/40"
            label="THIS WEEK"
            value={weekDone}
            suffix={`/ ${weekTasks.length} done`}
          />
          <Kpi
            icon={Clock3}
            iconCls="text-electric"
            iconBg="bg-electric/15 border-electric/40"
            label="IN PROGRESS"
            value={inProgress}
            suffix="active"
          />
          <Kpi
            icon={AlertCircle}
            iconCls={overdue > 0 ? "text-blood" : "text-text-mute"}
            iconBg={
              overdue > 0 ? "bg-blood/15 border-blood/40" : "bg-text-mute/10 border-text-mute/30"
            }
            label="OVERDUE"
            value={overdue}
            suffix={overdue === 1 ? "task" : "tasks"}
            critical={overdue > 0}
          />
        </div>
      </div>
    </section>
  )
}

function Kpi({
  icon: Icon,
  iconCls,
  iconBg,
  label,
  value,
  suffix,
  critical = false,
}: {
  icon: React.ComponentType<{ className?: string }>
  iconCls: string
  iconBg: string
  label: string
  value: number
  suffix: string
  critical?: boolean
}) {
  return (
    <div className="relative overflow-hidden border border-line/60 bg-void/40 p-3.5 bl-clip-notch">
      <div className="flex items-start gap-3">
        <div className={`flex h-9 w-9 shrink-0 items-center justify-center border ${iconBg}`}>
          <Icon className={`h-4 w-4 ${iconCls}`} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-display text-[9px] font-bold tracking-[0.22em] text-text-mute">
            {label}
          </div>
          <div className="mt-0.5 flex items-baseline gap-1.5">
            <span
              className={`font-display text-2xl font-bold tracking-tight leading-none ${
                critical ? "text-blood" : "text-text"
              }`}
            >
              {value}
            </span>
            <span className="font-mono text-[10.5px] text-text-mute">{suffix}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
