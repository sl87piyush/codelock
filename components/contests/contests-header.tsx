import { Trophy, Flame, Medal, Coins, Sparkles } from "lucide-react"
import { PLAYER_STATS } from "./contests-data"

export function ContestsHeader({
  liveCount,
  upcomingCount,
}: {
  liveCount: number
  upcomingCount: number
}) {
  return (
    <section className="relative overflow-hidden border border-line/60 bg-panel/70 bl-glass">
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-30" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-ember/10 via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-ember/60 to-transparent" />

      <div className="relative grid gap-6 p-6 md:p-8 lg:grid-cols-[1fr_auto] lg:items-end">
        {/* Title */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-6 items-center gap-1.5 border border-ember/50 bg-ember/10 px-2.5 font-display text-[10px] font-bold tracking-[0.22em] text-ember bl-clip-chevron">
              <Sparkles className="h-3 w-3" />
              CONTESTS PROTOCOL
            </span>
            <span className="font-mono text-[10px] tracking-[0.2em] text-text-mute">
              {"// SECTOR 008"}
            </span>
          </div>
          <h1 className="font-display text-4xl font-bold tracking-tight text-text md:text-5xl">
            Conquer the <span className="text-ember text-glow-ember">Arena</span>.
          </h1>
          <p className="max-w-xl text-[14px] leading-relaxed text-text-dim">
            Live duels, weekly tournaments, and once-a-season finales. Climb the global ranks,
            secure prize pools, and rewrite your legacy under pressure.
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="inline-flex h-7 items-center gap-1.5 border border-blood/50 bg-blood/15 px-2.5 font-display text-[11px] font-bold tracking-[0.16em] text-blood">
              <span className="relative h-1.5 w-1.5 rounded-full bg-blood">
                <span className="absolute inset-0 rounded-full bg-blood/60 animate-ping" />
              </span>
              {liveCount} LIVE NOW
            </span>
            <span className="inline-flex h-7 items-center gap-1.5 border border-neon/40 bg-neon/10 px-2.5 font-display text-[11px] font-bold tracking-[0.16em] text-neon">
              {upcomingCount} UPCOMING
            </span>
          </div>
        </div>

        {/* Player stats grid */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatTile icon={Trophy} label="Registered" value={String(PLAYER_STATS.registered)} accent="neon" />
          <StatTile icon={Flame} label="Competing" value={String(PLAYER_STATS.competing)} accent="ember" />
          <StatTile icon={Medal} label="Best Rank" value={`#${PLAYER_STATS.bestRank}`} accent="gold" />
          <StatTile icon={Coins} label="LP Earned" value={`${(PLAYER_STATS.totalLP / 1000).toFixed(1)}k`} accent="electric" />
        </div>
      </div>
    </section>
  )
}

function StatTile({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  accent: "neon" | "ember" | "gold" | "electric"
}) {
  const accents = {
    neon: { text: "text-neon", border: "border-neon/40", bg: "bg-neon/10", glow: "text-glow" },
    ember: { text: "text-ember", border: "border-ember/40", bg: "bg-ember/10", glow: "text-glow-ember" },
    gold: { text: "text-gold", border: "border-gold/40", bg: "bg-gold/10", glow: "text-glow-ember" },
    electric: { text: "text-electric", border: "border-electric/40", bg: "bg-electric/10", glow: "" },
  }[accent]

  return (
    <div className={`relative overflow-hidden border ${accents.border} bg-void/40 bl-corners`}>
      <div className="flex flex-col gap-1.5 p-3">
        <div className="flex items-center gap-1.5 font-display text-[9px] font-bold tracking-[0.22em] text-text-mute">
          <Icon className={`h-3.5 w-3.5 ${accents.text}`} />
          {label}
        </div>
        <div className={`font-display text-2xl font-bold leading-none ${accents.text} ${accents.glow}`}>
          {value}
        </div>
      </div>
      <div className={`absolute inset-x-0 bottom-0 h-px ${accents.bg.replace("bg-", "bg-")}`} />
    </div>
  )
}
