"use client"

import {
  Activity,
  Flame,
  History as HistoryIcon,
  Shield,
  Swords,
  Target,
  TrendingDown,
  TrendingUp,
  Trophy,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { HistoryStats } from "@/lib/battle-history-data"

type Props = {
  stats: HistoryStats
  rangeLabel?: string
}

export function HistoryHeader({ stats, rangeLabel = "ALL TIME" }: Props) {
  const lpPositive = stats.netLp >= 0
  const streakPositive = stats.currentStreak.outcome === "WIN"

  return (
    <section className="relative overflow-hidden border border-line/60 bg-panel/60 bl-glass-strong bl-corners">
      {/* Atmospherics */}
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-30" />
      <div className="pointer-events-none absolute -top-32 -right-24 h-72 w-72 rounded-full bg-neon/10 blur-3xl bl-float-slow" />
      <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-blood/10 blur-3xl bl-float-slower" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon/60 to-transparent" />

      <div className="relative grid gap-6 p-5 sm:p-7 lg:grid-cols-[1.55fr_1fr] lg:gap-8">
        {/* Hero */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-display text-[10px] font-bold tracking-[0.32em] text-text-mute">
              SECTOR
            </span>
            <span className="font-mono text-[10px] text-neon/80">
              // 014_BATTLE_HISTORY
            </span>
            <span className="ml-1 inline-flex h-6 items-center gap-1.5 border border-neon/45 bg-neon/10 px-2.5 font-display text-[10px] font-bold tracking-[0.22em] text-neon">
              <HistoryIcon className="h-3 w-3" />
              {rangeLabel}
            </span>
            {stats.currentStreak.count >= 2 && (
              <span
                className={cn(
                  "inline-flex h-6 items-center gap-1.5 border px-2.5 font-display text-[10px] font-bold tracking-[0.22em] bl-flicker",
                  streakPositive
                    ? "border-neon/45 bg-neon/10 text-neon"
                    : "border-blood/45 bg-blood/10 text-blood",
                )}
              >
                <Flame className="h-3 w-3" />
                {stats.currentStreak.count}-MATCH{" "}
                {streakPositive ? "WIN" : "LOSS"} STREAK
              </span>
            )}
          </div>

          <h1 className="font-display text-3xl font-extrabold leading-[1.05] tracking-tight sm:text-4xl">
            Every battle.{" "}
            <span className="text-glow text-neon">Every replay.</span>
            <br className="hidden sm:block" /> The receipts don&apos;t lie.
          </h1>

          <p className="max-w-2xl text-[14px] leading-relaxed text-text-dim">
            Filter through every match you&apos;ve fought — solo 1v1, duo 2v2,
            and clan wars. Expand any record to break down rounds, problem
            timing, and LP swings. Find your patterns. Patch the leaks.
          </p>

          {/* Win/Loss/Draw bar */}
          <RecordBar
            wins={stats.wins}
            losses={stats.losses}
            draws={stats.draws}
            total={stats.total}
            winRate={stats.winRate}
          />

          {/* Stat tiles */}
          <div className="mt-1 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            <StatTile
              label="MATCHES PLAYED"
              value={stats.total.toLocaleString()}
              accent="neon"
              icon={Activity}
            />
            <StatTile
              label="WIN RATE"
              value={`${stats.winRate}%`}
              accent="gold"
              icon={Trophy}
              subline={`${stats.wins}W / ${stats.losses}L`}
            />
            <StatTile
              label="NET LP"
              value={`${lpPositive ? "+" : ""}${stats.netLp.toLocaleString()}`}
              accent={lpPositive ? "neon" : "blood"}
              icon={lpPositive ? TrendingUp : TrendingDown}
              subline="all formats"
            />
            <StatTile
              label="BEST STREAK"
              value={`${stats.bestStreak}W`}
              accent="ember"
              icon={Flame}
              subline="consecutive"
              flicker={stats.bestStreak >= 5}
            />
          </div>
        </div>

        {/* Right: per-mode breakdown */}
        <div className="flex flex-col gap-3.5">
          <ModeBreakdownPanel stats={stats} />
        </div>
      </div>
    </section>
  )
}

// --------------------------------------------------------------------

function RecordBar({
  wins,
  losses,
  draws,
  total,
  winRate,
}: {
  wins: number
  losses: number
  draws: number
  total: number
  winRate: number
}) {
  if (total === 0) return null
  const winPct = (wins / total) * 100
  const lossPct = (losses / total) * 100
  const drawPct = (draws / total) * 100
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between font-display text-[10px] font-bold tracking-[0.2em] text-text-mute">
        <span>OVERALL RECORD</span>
        <span className="tabular-nums text-neon">{winRate}% WR</span>
      </div>
      <div className="relative flex h-2 w-full overflow-hidden bl-bar-track">
        <div
          className="h-full bg-gradient-to-r from-neon/70 to-neon"
          style={{ width: `${winPct}%` }}
        />
        <div
          className="h-full bg-gradient-to-r from-gold/60 to-gold"
          style={{ width: `${drawPct}%` }}
        />
        <div
          className="h-full bg-gradient-to-r from-blood/70 to-blood"
          style={{ width: `${lossPct}%` }}
        />
      </div>
      <div className="flex flex-wrap items-center gap-3 font-mono text-[10.5px] text-text-mute">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-2.5 bg-neon" />
          <span className="text-neon tabular-nums">{wins}W</span>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-2.5 bg-gold" />
          <span className="text-gold tabular-nums">{draws}D</span>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-2.5 bg-blood" />
          <span className="text-blood tabular-nums">{losses}L</span>
        </span>
      </div>
    </div>
  )
}

// --------------------------------------------------------------------

function StatTile({
  label,
  value,
  subline,
  icon: Icon,
  accent,
  flicker,
}: {
  label: string
  value: string
  subline?: string
  icon: React.ComponentType<{ className?: string }>
  accent: "neon" | "ember" | "blood" | "gold"
  flicker?: boolean
}) {
  const accentMap = {
    neon: { text: "text-neon", border: "border-neon/30", bg: "bg-neon/5" },
    ember: { text: "text-ember", border: "border-ember/30", bg: "bg-ember/5" },
    blood: { text: "text-blood", border: "border-blood/35", bg: "bg-blood/5" },
    gold: { text: "text-gold", border: "border-gold/35", bg: "bg-gold/5" },
  } as const
  const a = accentMap[accent]
  return (
    <div
      className={cn(
        "relative overflow-hidden border bg-void/60 px-3 py-2.5",
        a.border,
        a.bg,
      )}
    >
      <div className="flex items-center justify-between">
        <span className="font-display text-[9.5px] font-bold tracking-[0.22em] text-text-mute">
          {label}
        </span>
        <Icon className={cn("h-3.5 w-3.5", a.text, flicker && "bl-flicker")} />
      </div>
      <div className="mt-1.5 flex items-baseline gap-1.5">
        <span
          className={cn(
            "font-display text-2xl font-extrabold tabular-nums",
            a.text,
          )}
        >
          {value}
        </span>
        {subline && (
          <span className="font-mono text-[10px] text-text-mute">
            {subline}
          </span>
        )}
      </div>
    </div>
  )
}

// --------------------------------------------------------------------

function ModeBreakdownPanel({ stats }: { stats: HistoryStats }) {
  const rows = [
    {
      key: "SOLO" as const,
      label: "Solo 1v1",
      icon: Target,
      accent: "neon" as const,
      ...stats.byMode.SOLO,
    },
    {
      key: "DUO" as const,
      label: "Duo 2v2",
      icon: Swords,
      accent: "electric" as const,
      ...stats.byMode.DUO,
    },
    {
      key: "CLAN_WAR" as const,
      label: "Clan War",
      icon: Shield,
      accent: "blood" as const,
      ...stats.byMode.CLAN_WAR,
    },
  ]
  return (
    <div className="relative overflow-hidden border border-line/60 bg-void/55 p-4 bl-glass">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon/50 to-transparent" />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="h-3.5 w-3.5 text-neon" />
          <span className="font-display text-[10.5px] font-bold tracking-[0.22em] text-text-dim">
            FORMAT BREAKDOWN
          </span>
        </div>
        <span className="font-mono text-[10px] text-text-mute">
          {stats.total} matches
        </span>
      </div>
      <div className="mt-3 flex flex-col gap-2.5">
        {rows.map(({ key, ...rest }) => (
          <ModeRow key={key} {...rest} />
        ))}
      </div>
    </div>
  )
}

function ModeRow({
  label,
  icon: Icon,
  accent,
  played,
  wins,
  winRate,
}: {
  label: string
  icon: React.ComponentType<{ className?: string }>
  accent: "neon" | "electric" | "blood"
  played: number
  wins: number
  winRate: number
}) {
  const accentMap = {
    neon: { text: "text-neon", from: "from-neon/60", to: "to-neon" },
    electric: {
      text: "text-electric",
      from: "from-electric/60",
      to: "to-electric",
    },
    blood: { text: "text-blood", from: "from-blood/60", to: "to-blood" },
  } as const
  const a = accentMap[accent]
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-2">
        <Icon className={cn("h-3.5 w-3.5", a.text)} />
        <span className="font-display text-[11px] font-bold tracking-[0.16em] text-text">
          {label}
        </span>
        <span className="ml-auto flex items-baseline gap-1.5 font-mono text-[10.5px]">
          <span className={cn("font-display tabular-nums", a.text)}>
            {winRate}%
          </span>
          <span className="text-text-mute">
            · {wins}W / {played}P
          </span>
        </span>
      </div>
      <div className="h-1.5 bl-bar-track overflow-hidden">
        <div
          className={cn("h-full bg-gradient-to-r", a.from, a.to)}
          style={{ width: `${played === 0 ? 0 : winRate}%` }}
        />
      </div>
    </div>
  )
}
