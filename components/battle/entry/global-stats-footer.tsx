import { Activity, Radar, Signal, Users } from "lucide-react"
import { GLOBAL_STATS } from "@/components/battle/entry-data"

export function GlobalStatsFooter() {
  const items = [
    {
      icon: Users,
      label: "ONLINE",
      value: GLOBAL_STATS.onlinePlayers.toLocaleString(),
      accent: "text-neon",
    },
    {
      icon: Radar,
      label: "LIVE BATTLES",
      value: GLOBAL_STATS.activeBattles.toLocaleString(),
      accent: "text-ember",
    },
    {
      icon: Activity,
      label: "AVG QUEUE",
      value: GLOBAL_STATS.avgQueue,
      accent: "text-text",
    },
    {
      icon: Signal,
      label: "QUEUE HEALTH",
      value: `${GLOBAL_STATS.queueHealth}%`,
      accent: "text-neon",
    },
  ]

  return (
    <section className="relative overflow-hidden border border-line bg-panel/60 bl-glass">
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-20" />
      <div className="relative grid grid-cols-2 divide-line md:grid-cols-4 md:divide-x">
        {items.map((it) => {
          const Icon = it.icon
          return (
            <div key={it.label} className="flex items-center gap-3 px-4 py-3.5 md:px-5">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center border border-line/70 bg-void">
                <Icon className={`h-4 w-4 ${it.accent}`} />
              </div>
              <div className="flex min-w-0 flex-col">
                <span className="font-mono text-[9px] tracking-[0.22em] text-text-mute">
                  {it.label}
                </span>
                <span className="font-display text-base font-black tracking-tight text-text">
                  {it.value}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
