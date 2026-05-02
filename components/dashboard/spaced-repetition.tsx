import { RotateCw, Calendar, Clock } from "lucide-react"

export function SpacedRepetition() {
  return (
    <div className="relative bl-glass">
      <div className="p-5">
        <div className="flex items-center gap-2 mb-1">
          <RotateCw className="h-4 w-4 text-neon" />
          <h3 className="font-display text-[14px] font-bold tracking-tight">
            Spaced Repetition
          </h3>
        </div>
        <p className="text-[12px] text-text-dim leading-snug">
          Keep your knowledge fresh with scheduled revisions.
        </p>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <Card icon={Calendar} label="DUE TODAY" value="0" accent="neon" />
          <Card icon={Clock} label="UPCOMING" value="0" accent="electric" />
        </div>
      </div>
    </div>
  )
}

function Card({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  accent: "neon" | "electric"
}) {
  return (
    <div className="relative border border-line/60 bg-void/40 p-3 hover:border-neon/40 transition-colors">
      <div className="flex items-center justify-between">
        <Icon className={accent === "neon" ? "h-4 w-4 text-neon" : "h-4 w-4 text-neon-soft"} />
        <span className={`font-display text-[9px] font-bold tracking-[0.2em] ${accent === "neon" ? "text-neon/80" : "text-neon-soft/80"}`}>
          {label}
        </span>
      </div>
      <div className="mt-2 font-display text-[28px] font-bold leading-none tabular-nums text-text">
        {value}
      </div>
    </div>
  )
}
