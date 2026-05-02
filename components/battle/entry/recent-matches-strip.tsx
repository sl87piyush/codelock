import { cn } from "@/lib/utils"
import { ArrowDown, ArrowUp, Clock } from "lucide-react"
import { RECENT_MATCHES } from "@/components/battle/entry-data"

export function RecentMatchesStrip() {
  const last5 = RECENT_MATCHES.slice(0, 5)
  const wins = last5.filter((m) => m.result === "W").length

  return (
    <section className="relative overflow-hidden border border-line bg-panel/60 bl-glass">
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-20" />

      <div className="relative flex items-center justify-between border-b border-line/70 px-4 py-2.5 md:px-5">
        <div className="flex items-center gap-2">
          <Clock className="h-3.5 w-3.5 text-neon" />
          <span className="font-display text-[10px] font-bold tracking-[0.28em] text-text-mute">
            LAST 5 ENGAGEMENTS
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] tracking-[0.18em] text-text-dim">FORM</span>
          <div className="flex items-center gap-1">
            {last5.map((m) => (
              <span
                key={m.id}
                className={cn(
                  "inline-flex h-5 w-5 items-center justify-center border font-display text-[10px] font-black",
                  m.result === "W"
                    ? "border-neon/50 bg-neon/10 text-neon"
                    : "border-ember/50 bg-ember/10 text-ember",
                )}
              >
                {m.result}
              </span>
            ))}
          </div>
          <span className="font-mono text-[10px] tracking-[0.18em] text-neon">
            {wins}W — {last5.length - wins}L
          </span>
        </div>
      </div>

      <div className="relative divide-y divide-line/50">
        {last5.map((m) => {
          const win = m.result === "W"
          return (
            <div
              key={m.id}
              className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-3 px-4 py-2.5 transition hover:bg-void/40 md:px-5"
            >
              <span
                className={cn(
                  "inline-flex h-7 w-7 items-center justify-center border font-display text-xs font-black",
                  win
                    ? "border-neon/50 bg-neon/10 text-neon"
                    : "border-ember/50 bg-ember/10 text-ember",
                )}
              >
                {m.result}
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="truncate text-sm text-text">vs {m.opponent}</span>
                  <span className="font-mono text-[10px] tracking-[0.14em] text-text-mute">
                    · {m.mode}
                  </span>
                </div>
                <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.12em] text-text-dim">
                  <span>{m.timeAgo}</span>
                  <span className="text-text-mute">·</span>
                  <span>{m.duration}</span>
                </div>
              </div>
              <span className="hidden font-display text-sm font-black tracking-wide text-text sm:inline">
                {m.score}
              </span>
              <span
                className={cn(
                  "inline-flex items-center gap-0.5 font-display text-sm font-black",
                  m.lp > 0 ? "text-neon" : m.lp < 0 ? "text-ember" : "text-text-dim",
                )}
              >
                {m.lp > 0 ? (
                  <ArrowUp className="h-3 w-3" />
                ) : m.lp < 0 ? (
                  <ArrowDown className="h-3 w-3" />
                ) : null}
                {m.lp === 0 ? "—" : `${Math.abs(m.lp)} LP`}
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
