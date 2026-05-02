import { ArrowUpRight, Target, TrendingUp } from "lucide-react"
import { DIVISION_META, YOUR_STATS } from "./leaderboard-data"

export function YourRankCard() {
  const stats = YOUR_STATS
  const div = DIVISION_META[stats.division]
  const rankDelta =
    stats.prevRank != null ? stats.prevRank - stats.rank : 0
  const tierProgress = Math.round(
    ((stats.lp - DIVISION_META[stats.division].minLp) /
      (DIVISION_META[stats.division].minLp + 600 - DIVISION_META[stats.division].minLp)) *
      100,
  )

  return (
    <div className="relative overflow-hidden border border-neon/40 bg-panel/70 bl-glass">
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-30" />
      <div className="bl-side-stripe absolute inset-0" />

      <div className="relative grid items-center gap-5 p-5 md:grid-cols-[auto_1fr_auto] md:gap-8 md:p-6">
        {/* Avatar + rank */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-neon/30 blur-lg" />
            <div className="relative flex h-16 w-16 items-center justify-center border-2 border-neon bg-void font-display text-2xl font-bold text-neon bl-clip-notch">
              {stats.username.slice(0, 1).toUpperCase()}
            </div>
            <div className="absolute -bottom-1 -right-1 inline-flex h-5 items-center border border-gold/60 bg-void px-1.5 font-display text-[9px] font-bold tracking-[0.15em] text-gold">
              YOU
            </div>
          </div>

          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-[10px] font-bold tracking-[0.22em] text-text-mute">
                YOUR RANK
              </span>
              {rankDelta !== 0 && (
                <span
                  className={`inline-flex items-center gap-0.5 font-mono text-[10px] font-bold ${
                    rankDelta > 0 ? "text-neon" : "text-ember"
                  }`}
                >
                  <TrendingUp
                    className={`h-3 w-3 ${rankDelta < 0 ? "rotate-180" : ""}`}
                  />
                  {Math.abs(rankDelta)}
                </span>
              )}
            </div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="font-display text-4xl font-bold leading-none tracking-tight text-text">
                #{stats.rank}
              </span>
              <span className="font-mono text-[12px] text-text-mute">
                / {stats.totalWarriors.toLocaleString()}
              </span>
            </div>
            <div className="mt-1 font-mono text-[10px] tracking-[0.15em] text-neon">
              TOP {(100 - stats.percentile).toFixed(2)}%
            </div>
          </div>
        </div>

        {/* Division progress */}
        <div className="border-l border-line/60 pl-0 md:pl-8">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 border ${div.ring} ${div.bg} px-2.5 py-1 font-display text-[10px] font-bold tracking-[0.22em] ${div.accent}`}
            >
              <Target className="h-3 w-3" />
              {div.label} {stats.tier}
            </span>
            <span className="font-mono text-[11px] tracking-tight text-text-dim">
              {stats.lp.toLocaleString()} LP
            </span>
          </div>

          <div className="relative mt-3 h-2 overflow-hidden border border-line/80 bg-void">
            <div
              className="relative h-full bg-gradient-to-r from-electric/70 to-neon"
              style={{ width: `${Math.min(tierProgress, 100)}%` }}
            >
              <div className="absolute inset-0 bl-shimmer" />
            </div>
          </div>

          <div className="mt-2 flex items-center justify-between font-mono text-[10px] tracking-[0.15em] text-text-mute">
            <span>{div.label} {stats.tier}</span>
            <span className="text-neon">+{stats.toNext} LP TO NEXT</span>
          </div>
        </div>

        {/* Weekly delta */}
        <div className="flex flex-col items-start gap-1 border-l border-line/60 pl-0 md:items-end md:pl-8">
          <div className="font-display text-[10px] font-bold tracking-[0.22em] text-text-mute">
            THIS WEEK
          </div>
          <div className="inline-flex items-center gap-1.5 font-display text-3xl font-bold leading-none tracking-tight text-neon text-glow">
            <ArrowUpRight className="h-7 w-7" />
            +{stats.weeklyDelta}
          </div>
          <div className="font-mono text-[10px] tracking-[0.15em] text-text-mute">
            LP GAINED
          </div>
        </div>
      </div>
    </div>
  )
}
