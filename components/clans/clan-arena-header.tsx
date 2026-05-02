"use client"

import { ChevronRight, Crown, Plus, Shield, Sparkles, Swords, Trophy } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  LADDER_TIERS,
  TIER_META,
  YOUR_CLAN,
  formatXp,
  type Clan,
  type ClanTier,
} from "./clan-data"

type Props = {
  totalClans: number
  recruitingCount: number
  liveWars: number
  weekIndex: number
  weekEndsInH: number
}

export function ClanArenaHeader({
  totalClans,
  recruitingCount,
  liveWars,
  weekIndex,
  weekEndsInH,
}: Props) {
  const yourClan: Clan | null = YOUR_CLAN

  return (
    <section className="relative overflow-hidden border border-line/60 bg-panel/60 bl-glass-strong bl-corners">
      {/* Atmospherics */}
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-30" />
      <div className="pointer-events-none absolute -top-32 -right-24 h-72 w-72 rounded-full bg-blood/15 blur-3xl bl-float-slow" />
      <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-electric/15 blur-3xl bl-float-slower" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blood/60 to-transparent" />

      <div className="relative grid gap-6 p-5 sm:p-7 lg:grid-cols-[1.55fr_1fr] lg:gap-8">
        {/* Hero */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-display text-[10px] font-bold tracking-[0.32em] text-text-mute">
              SECTOR
            </span>
            <span className="font-mono text-[10px] text-blood/80">// 011_CLAN_ARENA</span>
            <span className="ml-1 inline-flex h-6 items-center gap-1.5 border border-blood/45 bg-blood/10 px-2.5 font-display text-[10px] font-bold tracking-[0.22em] text-blood bl-flicker">
              <span className="h-1.5 w-1.5 rounded-full bg-blood" />
              SEASON 04 — WEEK {String(weekIndex).padStart(2, "0")}
            </span>
            <span className="inline-flex h-6 items-center gap-1.5 border border-neon/40 bg-neon/10 px-2.5 font-display text-[10px] font-bold tracking-[0.22em] text-neon">
              <Sparkles className="h-3 w-3" />
              {liveWars} LIVE WARS
            </span>
          </div>

          <h1 className="font-display text-3xl font-extrabold leading-[1.05] tracking-tight sm:text-4xl">
            Solo grind ends here.{" "}
            <span className="text-glow text-neon">Pick a side.</span>
            <br className="hidden sm:block" /> Carry a clan.
          </h1>

          <p className="max-w-2xl text-[14px] leading-relaxed text-text-dim">
            Every problem you solve fuels your squad. Every OA you take pushes the ladder.
            Slack off and you drag the whole roster down. Find your people — or start your own.
          </p>

          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <button
              type="button"
              className="bl-btn-primary group relative overflow-hidden h-11 px-5 text-[12px]"
            >
              <Shield className="h-4 w-4" />
              Browse Clans
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <button
              type="button"
              className="bl-btn-ghost h-11 group"
            >
              <Plus className="h-4 w-4" />
              Forge Your Clan
            </button>
            <div className="ml-1 hidden md:flex items-center gap-2 px-3 h-11 border border-line/60 bg-void/50">
              <span className="h-1.5 w-1.5 rounded-full bg-neon bl-flicker" />
              <span className="font-display text-[11px] font-semibold tracking-[0.2em] text-text-dim">
                WAR WEEK CLOSES IN
              </span>
              <span className="font-display text-[13px] font-bold text-neon tabular-nums">
                {Math.floor(weekEndsInH / 24)}d {weekEndsInH % 24}h
              </span>
            </div>
          </div>

          {/* Stat tiles */}
          <div className="mt-2 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            <StatTile
              label="ACTIVE CLANS"
              value={totalClans.toLocaleString()}
              accent="neon"
              icon={Shield}
            />
            <StatTile
              label="RECRUITING NOW"
              value={String(recruitingCount)}
              accent="ember"
              icon={Plus}
              subline="open seats"
            />
            <StatTile
              label="LIVE WARS"
              value={String(liveWars)}
              accent="blood"
              icon={Swords}
              subline="this hour"
              flicker
            />
            <StatTile
              label="SEASON CYCLE"
              value="04"
              accent="gold"
              icon={Trophy}
              subline="closes in 12d"
            />
          </div>
        </div>

        {/* Right panel: Your Clan / Join CTA + Ladder snapshot */}
        <div className="flex flex-col gap-3.5">
          {yourClan ? (
            <YourClanPanel clan={yourClan} />
          ) : (
            <JoinPromptPanel recruitingCount={recruitingCount} />
          )}
          <LadderSnapshot />
        </div>
      </div>
    </section>
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
        <span className={cn("font-display text-2xl font-extrabold tabular-nums", a.text)}>
          {value}
        </span>
        {subline && (
          <span className="font-mono text-[10px] text-text-mute">{subline}</span>
        )}
      </div>
    </div>
  )
}

// --------------------------------------------------------------------

function JoinPromptPanel({ recruitingCount }: { recruitingCount: number }) {
  return (
    <div className="relative overflow-hidden border border-blood/40 bg-gradient-to-br from-blood/15 via-void/70 to-panel/70 p-4 bl-clip-notch bl-scan">
      <div className="pointer-events-none absolute inset-0 bl-stripes opacity-40" />
      <div className="relative flex items-start gap-3">
        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center border border-blood/60 bg-void/70 bl-clip-notch">
          <Shield className="h-5 w-5 text-blood" />
          <span className="absolute inset-0 bl-pulse-ring border border-blood/50" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="font-display text-[10px] font-bold tracking-[0.22em] text-blood">
              UNAFFILIATED
            </span>
            <span className="font-mono text-[10px] text-text-mute">// no clan tag</span>
          </div>
          <h3 className="mt-1 font-display text-[16px] font-bold leading-tight">
            You&apos;re grinding alone.
          </h3>
          <p className="mt-1 text-[12.5px] leading-snug text-text-dim">
            Join a clan to share XP, climb the ladder, and turn streaks into wars.{" "}
            <span className="text-blood font-semibold">{recruitingCount}</span> clans are
            recruiting right now.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button className="inline-flex h-8 items-center gap-1.5 border border-neon/55 bg-neon/10 px-3 font-display text-[10.5px] font-bold tracking-[0.18em] text-neon hover:bg-neon/15 transition-colors">
              FIND MY CLAN
              <ChevronRight className="h-3 w-3" />
            </button>
            <button className="inline-flex h-8 items-center gap-1.5 border border-line bg-void/50 px-3 font-display text-[10.5px] font-bold tracking-[0.18em] text-text-dim hover:text-neon hover:border-neon/40 transition-colors">
              <Plus className="h-3 w-3" />
              FORGE NEW CLAN
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function YourClanPanel({ clan }: { clan: Clan }) {
  const tier = TIER_META[clan.tier]
  const goalPct = Math.min(100, (clan.weeklyXp / clan.weeklyXpGoal) * 100)
  return (
    <div className="relative overflow-hidden border border-line/60 bg-panel/70 p-4 bl-glass">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon/60 to-transparent" />
      <div className="flex items-start gap-3">
        <div className="relative flex h-14 w-14 shrink-0 items-center justify-center bl-clip-notch bg-gradient-to-br ring-1 ring-neon/45">
          <span className="font-display text-base font-extrabold text-void">
            {clan.crest.monogram}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className={cn("inline-flex items-center px-1.5 h-5 border font-display text-[9.5px] font-bold tracking-[0.18em]", tier.chip)}>
              {tier.short} · #{clan.rank}
            </span>
            <span className="font-mono text-[10px] text-text-mute">[{clan.tag}]</span>
          </div>
          <h3 className="mt-0.5 font-display text-[15px] font-bold leading-tight truncate">
            {clan.name}
          </h3>
          <div className="mt-2 flex items-center justify-between text-[10.5px] font-display tracking-[0.18em] text-text-mute">
            <span>WEEKLY XP</span>
            <span className="text-neon tabular-nums">
              {formatXp(clan.weeklyXp)} / {formatXp(clan.weeklyXpGoal)}
            </span>
          </div>
          <div className="mt-1 h-1.5 bl-bar-track overflow-hidden">
            <div className="h-full bl-shimmer" style={{ width: `${goalPct}%` }} />
          </div>
        </div>
      </div>
    </div>
  )
}

// --------------------------------------------------------------------

function LadderSnapshot() {
  // Total population
  const total = LADDER_TIERS.reduce((s, t) => s + t.clans, 0)
  return (
    <div className="relative overflow-hidden border border-line/60 bg-void/55 p-3.5 bl-glass">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Crown className="h-3.5 w-3.5 text-gold" />
          <span className="font-display text-[10.5px] font-bold tracking-[0.2em] text-text-dim">
            SEASON LADDER
          </span>
        </div>
        <span className="font-mono text-[10px] text-text-mute">{total.toLocaleString()} clans</span>
      </div>
      <div className="mt-2.5 flex flex-col gap-1.5">
        {LADDER_TIERS.map((t) => (
          <LadderRow key={t.tier} tier={t.tier} clans={t.clans} total={total} />
        ))}
      </div>
    </div>
  )
}

function LadderRow({
  tier,
  clans,
  total,
}: {
  tier: ClanTier
  clans: number
  total: number
}) {
  const meta = TIER_META[tier]
  const pct = (clans / total) * 100
  return (
    <div className="flex items-center gap-2.5">
      <span
        className={cn(
          "w-14 shrink-0 inline-flex items-center justify-center h-5 border font-display text-[9px] font-bold tracking-[0.2em] bl-clip-chevron",
          meta.chip,
        )}
      >
        {tier.toUpperCase()}
      </span>
      <div className="relative h-1.5 flex-1 bl-bar-track overflow-hidden">
        <div
          className={cn(
            "h-full bg-gradient-to-r",
            tier === "Legend"
              ? "from-blood/70 to-blood"
              : tier === "Elite"
                ? "from-neon/60 to-neon"
                : tier === "Gold"
                  ? "from-gold/60 to-gold"
                  : tier === "Silver"
                    ? "from-electric/60 to-electric"
                    : "from-ember/60 to-ember",
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-14 shrink-0 text-right font-mono text-[10px] tabular-nums text-text-dim">
        {clans.toLocaleString()}
      </span>
    </div>
  )
}
