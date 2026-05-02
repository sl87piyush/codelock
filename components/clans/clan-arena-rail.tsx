"use client"

import {
  Activity,
  Award,
  Bell,
  ChevronRight,
  Crown,
  Megaphone,
  Plus,
  Sparkles,
  Trophy,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { ClanCrestBadge } from "./clan-crest"
import {
  CLANS,
  RECRUIT_TICKER,
  TIER_META,
  formatXp,
  type Clan,
} from "./clan-data"

export function ClanArenaRail() {
  const top5 = [...CLANS]
    .sort((a, b) => b.weeklyXp - a.weeklyXp)
    .slice(0, 5)

  return (
    <aside className="flex flex-col gap-4">
      <ForgeCta />
      <WeeklyLeaderboard top={top5} />
      <RecruitTicker />
      <SeasonRewards />
      <ActivityPulse />
    </aside>
  )
}

// --------------------------------------------------------------------

function ForgeCta() {
  return (
    <section className="relative overflow-hidden border border-ember/40 bg-gradient-to-br from-ember/12 via-panel/70 to-panel/70 p-4 bl-glass-strong">
      <div className="pointer-events-none absolute inset-0 bl-stripes opacity-40" />
      <div className="pointer-events-none absolute -top-12 -right-8 h-32 w-32 rounded-full bg-ember/25 blur-2xl bl-float-slow" />
      <div className="relative">
        <div className="flex items-center gap-2">
          <Sparkles className="h-3.5 w-3.5 text-ember" />
          <span className="font-display text-[10px] font-bold tracking-[0.22em] text-ember">
            CAPTAIN MODE
          </span>
        </div>
        <h3 className="mt-1 font-display text-[15px] font-bold leading-tight">
          Forge your own clan.
        </h3>
        <p className="mt-1 text-[12px] leading-snug text-text-dim">
          Custom tag, motto, war strategy. Free to start at Bronze. No prereqs.
        </p>
        <button
          type="button"
          className="mt-3 inline-flex w-full items-center justify-center gap-1.5 border border-ember/55 bg-ember/15 px-3 h-9 font-display text-[10.5px] font-bold tracking-[0.18em] text-ember hover:bg-ember/25 transition-colors"
        >
          <Plus className="h-3.5 w-3.5" />
          BEGIN FORGING
        </button>
      </div>
    </section>
  )
}

// --------------------------------------------------------------------

function WeeklyLeaderboard({ top }: { top: Clan[] }) {
  return (
    <section className="relative overflow-hidden border border-line/60 bg-panel/55 bl-glass">
      <div className="flex items-center justify-between border-b border-line/60 px-3.5 py-2.5">
        <div className="flex items-center gap-2">
          <Trophy className="h-3.5 w-3.5 text-gold" />
          <h3 className="font-display text-[11px] font-bold tracking-[0.2em] text-text">
            WEEKLY LEADERBOARD
          </h3>
        </div>
        <button className="font-display text-[10px] font-bold tracking-[0.2em] text-text-mute hover:text-neon transition-colors">
          ALL →
        </button>
      </div>
      <ol className="divide-y divide-line/50">
        {top.map((c, i) => {
          const tier = TIER_META[c.tier]
          const isTop = i === 0
          return (
            <li key={c.id} className="relative">
              <div className="flex items-center gap-2.5 px-3.5 py-2.5 hover:bg-neon/5 transition-colors">
                <div
                  className={cn(
                    "flex h-7 w-6 shrink-0 items-center justify-center font-display text-[12px] font-extrabold",
                    isTop
                      ? "text-gold text-glow-ember"
                      : i === 1
                        ? "text-neon"
                        : i === 2
                          ? "text-electric"
                          : "text-text-mute",
                  )}
                >
                  {i === 0 ? <Crown className="h-3.5 w-3.5" /> : `#${i + 1}`}
                </div>
                <ClanCrestBadge crest={c.crest} size="sm" bare />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-display text-[12.5px] font-bold leading-none truncate">
                      {c.name}
                    </span>
                    <span className="font-mono text-[9.5px] text-text-mute shrink-0">
                      [{c.tag}]
                    </span>
                  </div>
                  <div className="mt-1 flex items-center gap-1.5">
                    <span
                      className={cn(
                        "inline-flex h-3.5 items-center px-1 border font-display text-[8.5px] font-bold tracking-[0.18em]",
                        tier.chip,
                      )}
                    >
                      {tier.short}
                    </span>
                    <span className="font-mono text-[10px] text-neon tabular-nums">
                      {formatXp(c.weeklyXp)} XP
                    </span>
                  </div>
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

// --------------------------------------------------------------------

function RecruitTicker() {
  return (
    <section className="relative overflow-hidden border border-line/60 bg-panel/55 bl-glass">
      <div className="flex items-center justify-between border-b border-line/60 px-3.5 py-2.5">
        <div className="flex items-center gap-2">
          <Megaphone className="h-3.5 w-3.5 text-ember" />
          <h3 className="font-display text-[11px] font-bold tracking-[0.2em] text-text">
            RECRUIT WIRE
          </h3>
        </div>
        <span className="font-mono text-[10px] text-text-mute">live</span>
      </div>
      <ul className="max-h-[260px] overflow-hidden">
        {RECRUIT_TICKER.map((r, i) => {
          const tier = TIER_META[r.tier]
          return (
            <li
              key={`${r.tag}-${i}`}
              className="flex items-start gap-2 border-b border-line/40 px-3.5 py-2 last:border-b-0 hover:bg-neon/5 transition-colors"
            >
              <span
                className={cn(
                  "mt-0.5 inline-flex h-4 items-center px-1 border font-display text-[8.5px] font-bold tracking-[0.18em]",
                  tier.chip,
                )}
              >
                {tier.short}
              </span>
              <div className="min-w-0 flex-1 leading-snug">
                <div className="font-display text-[12px] font-bold truncate">
                  {r.clan}{" "}
                  <span className="font-mono text-[9.5px] text-text-mute font-normal">
                    [{r.tag}]
                  </span>
                </div>
                <div className="font-mono text-[10.5px] text-text-dim">{r.msg}</div>
              </div>
              <button className="shrink-0 inline-flex h-5 items-center px-1.5 border border-neon/40 bg-neon/10 font-display text-[9px] font-bold tracking-[0.18em] text-neon hover:bg-neon/20 transition-colors">
                JOIN
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

// --------------------------------------------------------------------

function SeasonRewards() {
  const rewards = [
    { tier: "Legend", reward: "Crystal crest + Discord role", payout: "8000 LP" },
    { tier: "Elite", reward: "Holographic banner + emoji slot", payout: "5000 LP" },
    { tier: "Gold", reward: "Animated crest border", payout: "3000 LP" },
    { tier: "Silver", reward: "Custom motto color", payout: "1500 LP" },
  ] as const
  return (
    <section className="relative overflow-hidden border border-line/60 bg-panel/55 bl-glass">
      <div className="flex items-center justify-between border-b border-line/60 px-3.5 py-2.5">
        <div className="flex items-center gap-2">
          <Award className="h-3.5 w-3.5 text-gold" />
          <h3 className="font-display text-[11px] font-bold tracking-[0.2em] text-text">
            SEASON 04 REWARDS
          </h3>
        </div>
        <span className="font-mono text-[10px] text-text-mute">12d left</span>
      </div>
      <ul>
        {rewards.map((r) => {
          const tier = TIER_META[r.tier as keyof typeof TIER_META]
          return (
            <li
              key={r.tier}
              className="flex items-center gap-2.5 border-b border-line/40 px-3.5 py-2 last:border-b-0"
            >
              <span
                className={cn(
                  "inline-flex h-5 items-center px-1.5 border font-display text-[9px] font-bold tracking-[0.18em] bl-clip-chevron",
                  tier.chip,
                )}
              >
                {r.tier.toUpperCase()}
              </span>
              <div className="min-w-0 flex-1 leading-tight">
                <div className="font-display text-[12px] font-bold truncate">
                  {r.reward}
                </div>
                <div className="font-mono text-[10px] text-text-mute">+ {r.payout}</div>
              </div>
            </li>
          )
        })}
      </ul>
      <div className="border-t border-line/60 px-3.5 py-2.5">
        <button className="inline-flex w-full items-center justify-center gap-1 font-display text-[10px] font-bold tracking-[0.2em] text-text-dim hover:text-neon transition-colors">
          VIEW FULL REWARD LADDER
          <ChevronRight className="h-3 w-3" />
        </button>
      </div>
    </section>
  )
}

// --------------------------------------------------------------------

function ActivityPulse() {
  const events: { tag: string; clan: string; msg: string; time: string; tone: "neon" | "ember" | "blood" | "gold" }[] = [
    { tag: "VOID", clan: "Void Syndicate", msg: "took the lead vs [AURO]", time: "2m", tone: "blood" },
    { tag: "NEON", clan: "Neon Egoists", msg: "promoted 3 → 8 globally", time: "11m", tone: "neon" },
    { tag: "FRST", clan: "Frostbyte", msg: "launched · 28 seats open", time: "32m", tone: "ember" },
    { tag: "BMNK", clan: "Binary Monks", msg: "hit 90% of weekly goal", time: "1h", tone: "gold" },
    { tag: "AURO", clan: "Aurora Dynasts", msg: "challenged [VOID] — accepted", time: "2h", tone: "blood" },
  ]

  return (
    <section className="relative overflow-hidden border border-line/60 bg-panel/55 bl-glass">
      <div className="flex items-center justify-between border-b border-line/60 px-3.5 py-2.5">
        <div className="flex items-center gap-2">
          <Activity className="h-3.5 w-3.5 text-neon" />
          <h3 className="font-display text-[11px] font-bold tracking-[0.2em] text-text">
            ARENA PULSE
          </h3>
        </div>
        <Bell className="h-3.5 w-3.5 text-text-mute" />
      </div>
      <ul>
        {events.map((e, i) => (
          <li
            key={i}
            className="flex items-start gap-2.5 border-b border-line/40 px-3.5 py-2 last:border-b-0"
          >
            <span
              className={cn(
                "mt-1 h-1.5 w-1.5 shrink-0 rounded-full",
                e.tone === "neon" && "bg-neon",
                e.tone === "ember" && "bg-ember",
                e.tone === "blood" && "bg-blood bl-flicker",
                e.tone === "gold" && "bg-gold",
              )}
            />
            <div className="min-w-0 flex-1 leading-snug">
              <span className="font-mono text-[10.5px] text-text-mute">[{e.tag}]</span>{" "}
              <span className="font-display text-[12px] font-bold">{e.clan}</span>{" "}
              <span className="font-mono text-[11px] text-text-dim">{e.msg}</span>
            </div>
            <span className="shrink-0 font-mono text-[10px] text-text-mute">{e.time}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
