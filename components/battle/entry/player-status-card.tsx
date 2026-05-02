import { Crown, Flame, Target, Trophy } from "lucide-react"
import { PLAYER_SNAPSHOT } from "@/components/battle/entry-data"

export function PlayerStatusCard() {
  const p = PLAYER_SNAPSHOT
  const lpPct = Math.round((p.lp / p.lpNextTier) * 100)

  return (
    <section className="relative overflow-hidden border border-line bg-panel/60 bl-glass bl-corners">
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-20" />
      <div className="pointer-events-none absolute -top-24 -left-24 h-[300px] w-[300px] rounded-full bg-neon/10 blur-3xl" />

      <div className="bl-side-stripe" />

      <div className="relative p-5 md:p-6">
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-display text-[10px] font-bold tracking-[0.28em] text-text-mute">
              COMBATANT PROFILE
            </span>
            <span className="font-mono text-[10px] tracking-[0.18em] text-neon/70">
              {"// PID-8830 · ACTIVE"}
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 border border-gold/40 bg-gold/10 px-2 py-0.5 font-display text-[9px] font-bold tracking-[0.22em] text-gold bl-clip-chevron">
            <Crown className="h-3 w-3" />
            CAPTAIN
          </span>
        </div>

        {/* Identity */}
        <div className="mb-5 flex items-center gap-4">
          <div className="relative">
            <div className="relative flex h-16 w-16 items-center justify-center border border-neon/60 bg-void text-neon bl-clip-notch">
              <span className="font-display text-3xl font-black">{p.handle.charAt(0)}</span>
              <span className="pointer-events-none absolute inset-0 bl-pulse" />
            </div>
            <span className="absolute -bottom-1 -right-1 inline-flex h-5 items-center border border-neon/60 bg-void px-1.5 font-mono text-[9px] font-bold text-neon">
              LVL 42
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="truncate font-display text-xl font-black tracking-tight text-text">
              {p.handle}
            </h3>
            <div className="mt-0.5 flex items-center gap-2">
              <span className="font-display text-xs font-bold tracking-[0.18em] text-neon">
                {p.rank.toUpperCase()} {p.division}
              </span>
              <span className="h-3 w-px bg-line" />
              <span className="font-mono text-[10px] tracking-[0.14em] text-text-dim">
                TOP {p.seasonPercentile}%
              </span>
            </div>
          </div>
        </div>

        {/* LP Progress */}
        <div className="mb-5 border border-line/70 bg-void/50 p-3">
          <div className="mb-2 flex items-end justify-between">
            <span className="font-display text-[10px] font-bold tracking-[0.22em] text-text-mute">
              LP TO DIAMOND I
            </span>
            <span className="font-display text-sm font-black text-text">
              <span className="text-neon">{p.lp}</span>
              <span className="text-text-dim"> / {p.lpNextTier}</span>
            </span>
          </div>
          <div className="relative h-2 overflow-hidden border border-line/70 bg-void">
            <div
              className="relative h-full bg-gradient-to-r from-neon via-electric to-neon bl-shimmer"
              style={{ width: `${lpPct}%` }}
            />
            {/* Tick marks */}
            <div className="pointer-events-none absolute inset-0 flex">
              {[25, 50, 75].map((t) => (
                <div key={t} className="flex-1 border-r border-line/50 last:border-r-0" />
              ))}
            </div>
          </div>
        </div>

        {/* Stat grid */}
        <div className="grid grid-cols-4 gap-2">
          <StatTile icon={Trophy} label="W-L" value={`${p.wins}-${p.losses}`} accent="neon" />
          <StatTile icon={Target} label="WIN %" value={`${p.winRate}%`} accent="gold" />
          <StatTile icon={Flame} label="STREAK" value={`W${p.streak}`} accent="ember" />
          <StatTile icon={Crown} label="MVPs" value={`${p.mvpCount}`} accent="gold" />
        </div>

        {/* Daily quest */}
        <div className="mt-4 flex items-center justify-between border-t border-line/60 pt-4">
          <div className="flex flex-col">
            <span className="font-display text-[10px] font-bold tracking-[0.22em] text-text-mute">
              DAILY OBJECTIVE
            </span>
            <span className="mt-0.5 text-sm text-text">{p.dailyQuest.label}</span>
          </div>
          <div className="flex items-baseline gap-1 font-display font-black">
            <span className="text-2xl text-gold">{p.dailyQuest.progress}</span>
            <span className="text-sm text-text-dim">/{p.dailyQuest.target}</span>
          </div>
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
  accent: "neon" | "ember" | "gold"
}) {
  const colorMap = {
    neon: "text-neon",
    ember: "text-ember",
    gold: "text-gold",
  }
  return (
    <div className="flex flex-col items-start gap-1 border border-line/60 bg-void/40 p-2">
      <Icon className={`h-3 w-3 ${colorMap[accent]}`} />
      <span className="font-mono text-[9px] tracking-[0.16em] text-text-mute">{label}</span>
      <span className="font-display text-sm font-black text-text">{value}</span>
    </div>
  )
}
