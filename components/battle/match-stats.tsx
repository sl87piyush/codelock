import { Activity, Cpu, Keyboard, Check, Clock3, Code2 } from "lucide-react"

const STATS = [
  { label: "MATCH TIME", value: "42:18", icon: Clock3, accent: "text-neon" },
  { label: "CODE LINES", value: "247", icon: Code2, accent: "text-text" },
  { label: "TESTS CLEARED", value: "31 / 48", icon: Check, accent: "text-neon" },
  { label: "AVG WPM", value: "83", icon: Keyboard, accent: "text-text" },
  { label: "CPU TIME", value: "1.24s", icon: Cpu, accent: "text-ember" },
  { label: "MOMENTUM", value: "+68%", icon: Activity, accent: "text-gold" },
]

export function MatchStats() {
  return (
    <div className="relative overflow-hidden border border-line/80 bg-panel/60 bl-glass">
      <div className="flex items-center justify-between border-b border-line/70 px-5 py-3">
        <div className="flex items-center gap-2">
          <Activity className="h-3.5 w-3.5 text-neon" />
          <h4 className="font-display text-[13px] font-bold tracking-[0.22em] text-text">
            MATCH STATS
          </h4>
        </div>
        <span className="font-mono text-[10px] tracking-[0.18em] text-text-mute">
          AGGREGATE · BLUE SIDE
        </span>
      </div>

      <div className="grid grid-cols-2 gap-px bg-line/60 sm:grid-cols-3">
        {STATS.map((s) => {
          const Icon = s.icon
          return (
            <div
              key={s.label}
              className="flex items-center gap-3 bg-panel/80 px-4 py-3"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-line/70 bg-void bl-clip-notch">
                <Icon className={`h-3.5 w-3.5 ${s.accent}`} />
              </div>
              <div className="min-w-0">
                <div className="font-display text-[9.5px] font-bold tracking-[0.24em] text-text-mute">
                  {s.label}
                </div>
                <div
                  className={`font-display text-[17px] font-bold leading-tight tabular-nums ${s.accent}`}
                >
                  {s.value}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
