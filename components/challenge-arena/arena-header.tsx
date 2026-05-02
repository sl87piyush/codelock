import { Swords, Flame, Target, Zap, ShieldAlert } from "lucide-react"
import { PLAYER_STATS } from "./arena-data"
import { cn } from "@/lib/utils"

export function ArenaHeader({
  totalProblems,
  legendaryCount,
  newThisWeek,
}: {
  totalProblems: number
  legendaryCount: number
  newThisWeek: number
}) {
  const weeklyPct = Math.round(
    (PLAYER_STATS.weeklyDone / PLAYER_STATS.weeklyTarget) * 100,
  )
  const masteryPct = Math.round((PLAYER_STATS.solved / totalProblems) * 100)

  return (
    <section className="relative overflow-hidden border border-line/60 bg-panel/70 bl-glass">
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-30" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-blood/15 via-ember/5 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-blood/60 to-transparent" />
      <div className="pointer-events-none absolute -top-32 -right-24 h-64 w-64 rounded-full bg-blood/20 blur-3xl bl-float-slow" />
      <div className="pointer-events-none absolute -bottom-32 -left-16 h-56 w-56 rounded-full bg-electric/15 blur-3xl bl-float-slower" />

      <div className="relative grid gap-6 p-6 md:p-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex h-6 items-center gap-1.5 border border-blood/50 bg-blood/15 px-2.5 font-display text-[10px] font-bold tracking-[0.22em] text-blood bl-clip-chevron">
              <ShieldAlert className="h-3 w-3" />
              ELITE PROTOCOL
            </span>
            <span className="font-mono text-[10px] tracking-[0.2em] text-text-mute">
              {"// SECTOR 002 · CHALLENGE_ARENA"}
            </span>
            <span className="hidden sm:inline-flex h-6 items-center gap-1.5 border border-line/70 bg-void/60 px-2 font-mono text-[10px] tracking-[0.18em] text-text-dim">
              <span className="h-1 w-1 rounded-full bg-neon shadow-[0_0_6px_#00f0ff]" />
              {newThisWeek} NEW THIS WEEK
            </span>
          </div>

          <h1 className="font-display text-4xl font-bold tracking-tight text-text md:text-5xl">
            Forge yourself in the{" "}
            <span className="text-blood text-glow-ember">Challenge Arena</span>.
          </h1>
          <p className="max-w-2xl text-[14px] leading-relaxed text-text-dim">
            A curated archive of {totalProblems}+ ruthless problems across DSA, system design,
            concurrency, ML, and distributed systems. Filter by topic, hunt by difficulty, and
            track your ascent up the elite ranks.
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="inline-flex h-7 items-center gap-1.5 border border-gold/50 bg-gold/10 px-2.5 font-display text-[11px] font-bold tracking-[0.16em] text-gold">
              <Flame className="h-3.5 w-3.5" />
              {legendaryCount} LEGENDARY UNLOCKED
            </span>
            <span className="inline-flex h-7 items-center gap-1.5 border border-ember/45 bg-ember/10 px-2.5 font-display text-[11px] font-bold tracking-[0.16em] text-ember">
              <Zap className="h-3.5 w-3.5" />
              {PLAYER_STATS.streak}-DAY STREAK
            </span>
            <span className="inline-flex h-7 items-center gap-1.5 border border-neon/45 bg-neon/10 px-2.5 font-display text-[11px] font-bold tracking-[0.16em] text-neon">
              <Target className="h-3.5 w-3.5" />
              GLOBAL RANK #{PLAYER_STATS.rank.toLocaleString()}
            </span>
          </div>

          {/* Weekly target bar */}
          <div className="mt-3 max-w-xl space-y-1.5">
            <div className="flex items-center justify-between font-display text-[10px] font-bold tracking-[0.22em] text-text-mute">
              <span>WEEKLY GAUNTLET</span>
              <span className="text-text">
                {PLAYER_STATS.weeklyDone}/{PLAYER_STATS.weeklyTarget} CLEARED
              </span>
            </div>
            <div className="bl-bar-track h-1.5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-electric via-neon to-gold shadow-[0_0_12px_rgba(0,240,255,0.5)]"
                style={{ width: `${weeklyPct}%` }}
              />
            </div>
          </div>
        </div>

        {/* Stat tiles */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatTile
            icon={Swords}
            label="Solved"
            value={PLAYER_STATS.solved.toString()}
            sub={`${masteryPct}% mastery`}
            accent="neon"
          />
          <StatTile
            icon={Zap}
            label="Total XP"
            value={`${(PLAYER_STATS.xp / 1000).toFixed(1)}k`}
            sub={`+${PLAYER_STATS.weeklyXp} this week`}
            accent="electric"
          />
          <StatTile
            icon={Flame}
            label="Streak"
            value={`${PLAYER_STATS.streak}d`}
            sub="best 23d"
            accent="ember"
          />
          <StatTile
            icon={ShieldAlert}
            label="Boss Kills"
            value={String(PLAYER_STATS.legendaryUnlocked)}
            sub="Legendary tier"
            accent="gold"
          />
        </div>
      </div>
    </section>
  )
}

function StatTile({
  icon: Icon,
  label,
  value,
  sub,
  accent,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  sub?: string
  accent: "neon" | "ember" | "gold" | "electric"
}) {
  const accents = {
    neon: { text: "text-neon", border: "border-neon/40", glow: "text-glow" },
    ember: { text: "text-ember", border: "border-ember/40", glow: "text-glow-ember" },
    gold: { text: "text-gold", border: "border-gold/40", glow: "text-glow-ember" },
    electric: { text: "text-electric", border: "border-electric/40", glow: "" },
  }[accent]

  return (
    <div
      className={cn(
        "relative overflow-hidden border bg-void/40 bl-corners min-w-[150px]",
        accents.border,
      )}
    >
      <div className="flex flex-col gap-1.5 p-3">
        <div className="flex items-center gap-1.5 font-display text-[9px] font-bold tracking-[0.22em] text-text-mute">
          <Icon className={cn("h-3.5 w-3.5", accents.text)} />
          {label}
        </div>
        <div
          className={cn(
            "font-display text-2xl font-bold leading-none tabular-nums",
            accents.text,
            accents.glow,
          )}
        >
          {value}
        </div>
        {sub && (
          <div className="font-mono text-[10px] tracking-tight text-text-mute">{sub}</div>
        )}
      </div>
    </div>
  )
}
