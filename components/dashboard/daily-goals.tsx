import { Target } from "lucide-react"
import { cn } from "@/lib/utils"

type Goal = {
  label: string
  value: number
  total: number
  accent: "neon" | "electric" | "ember"
}

const goals: Goal[] = [
  { label: "DAILY", value: 0, total: 1, accent: "neon" },
  { label: "WEEKLY", value: 0, total: 5, accent: "electric" },
  { label: "MONTHLY", value: 0, total: 25, accent: "ember" },
]

const accentMap: Record<Goal["accent"], { bar: string; text: string; ring: string }> = {
  neon: { bar: "from-neon to-electric", text: "text-neon", ring: "ring-neon/40" },
  electric: { bar: "from-electric to-blue-mid", text: "text-neon-soft", ring: "ring-electric/40" },
  ember: { bar: "from-ember to-ember-soft", text: "text-ember", ring: "ring-ember/40" },
}

export function DailyGoals() {
  return (
    <div className="relative bl-glass">
      <div className="p-5">
        <div className="flex items-center gap-2 mb-4">
          <Target className="h-4 w-4 text-neon" />
          <h3 className="font-display text-[13px] font-bold tracking-[0.22em] text-text">
            KILL COUNT
          </h3>
          <span className="h-px flex-1 bg-line/60" />
          <span className="font-mono text-[10px] text-text-mute">OBJECTIVES</span>
        </div>

        <div className="flex flex-col gap-3">
          {goals.map((g) => (
            <GoalRow key={g.label} goal={g} />
          ))}
        </div>
      </div>
    </div>
  )
}

function GoalRow({ goal }: { goal: Goal }) {
  const a = accentMap[goal.accent]
  const pct = (goal.value / goal.total) * 100

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="font-display text-[10px] font-bold tracking-[0.22em] text-text-dim">
          {goal.label}
        </span>
        <span className={cn("font-display text-[13px] font-bold tabular-nums", a.text)}>
          {goal.value}
          <span className="text-text-mute">/{goal.total}</span>
        </span>
      </div>
      <div className="h-1.5 bl-bar-track">
        <div
          className={cn("h-full bg-gradient-to-r", a.bar)}
          style={{ width: `${Math.max(pct, 2)}%` }}
        />
      </div>
    </div>
  )
}
