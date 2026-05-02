"use client"

import { Activity, Crown, Radar, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  RECENT_ACTIVITY,
  SKILL_MATRIX,
  TOP_SOLVERS,
  PLAYER_STATS,
} from "./arena-data"

const COLOR_CLASS = {
  neon: { bar: "bg-neon", text: "text-neon", border: "border-neon/40" },
  electric: { bar: "bg-electric", text: "text-electric", border: "border-electric/40" },
  ember: { bar: "bg-ember", text: "text-ember", border: "border-ember/40" },
  blood: { bar: "bg-blood", text: "text-blood", border: "border-blood/40" },
  gold: { bar: "bg-gold", text: "text-gold", border: "border-gold/40" },
} as const

export function ArenaRail() {
  return (
    <aside className="space-y-4">
      <DailyForge />
      <SkillMatrix />
      <TopSolvers />
      <ActivityFeed />
    </aside>
  )
}

function DailyForge() {
  const pct = Math.round((PLAYER_STATS.weeklyDone / PLAYER_STATS.weeklyTarget) * 100)
  return (
    <div className="relative overflow-hidden border border-electric/45 bg-panel/70 bl-glass">
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-25" />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-[3px] bg-electric opacity-80" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-electric/12 to-transparent" />

      <div className="relative space-y-3 px-4 py-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-electric" />
          <span className="font-display text-[11.5px] font-bold tracking-[0.22em] text-text">
            DAILY FORGE
          </span>
          <span className="ml-auto font-mono text-[10px] tracking-[0.18em] text-text-mute">
            {"// renews 00:00 UTC"}
          </span>
        </div>

        <div>
          <div className="font-display text-3xl font-bold leading-none text-electric tabular-nums">
            {PLAYER_STATS.weeklyDone}
            <span className="ml-1 align-middle font-display text-[14px] font-bold tracking-[0.18em] text-text-mute">
              / {PLAYER_STATS.weeklyTarget} this week
            </span>
          </div>
          <div className="mt-1 font-mono text-[10.5px] tracking-[0.16em] text-text-mute">
            {"// keep the streak alive — 14 days strong"}
          </div>
        </div>

        <div className="bl-bar-track h-1.5 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-electric via-neon to-gold"
            style={{ width: `${pct}%` }}
          />
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <Mini label="WEEKLY XP" value={`+${PLAYER_STATS.weeklyXp}`} accent="neon" />
          <Mini label="STREAK" value={`${PLAYER_STATS.streak}d`} accent="ember" />
        </div>
      </div>
    </div>
  )
}

function SkillMatrix() {
  return (
    <div className="relative overflow-hidden border border-line/60 bg-panel/70 bl-glass">
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-20" />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-[3px] bg-neon opacity-60" />

      <div className="relative flex items-center gap-2 border-b border-line/60 px-4 py-3">
        <Radar className="h-4 w-4 text-neon" />
        <span className="font-display text-[11.5px] font-bold tracking-[0.22em] text-text">
          SKILL MATRIX
        </span>
        <span className="ml-auto font-mono text-[10px] tracking-[0.18em] text-text-mute">
          MASTERY
        </span>
      </div>

      <ul className="relative space-y-2.5 px-4 py-3">
        {SKILL_MATRIX.map((s) => {
          const cls = COLOR_CLASS[s.color]
          return (
            <li key={s.domain} className="space-y-1">
              <div className="flex items-center justify-between font-display text-[11px] font-bold tracking-[0.16em]">
                <span className="text-text-dim">{s.domain.toUpperCase()}</span>
                <span className={cn("tabular-nums", cls.text)}>{s.level}%</span>
              </div>
              <div className="bl-bar-track h-1 overflow-hidden">
                <div
                  className={cn("h-full", cls.bar, "shadow-[0_0_6px_currentColor]")}
                  style={{ width: `${s.level}%` }}
                />
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function TopSolvers() {
  return (
    <div className="relative overflow-hidden border border-gold/35 bg-panel/70 bl-glass">
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-25" />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-[3px] bg-gold opacity-65" />

      <div className="relative flex items-center justify-between border-b border-line/60 px-4 py-3">
        <div className="flex items-center gap-2">
          <Crown className="h-4 w-4 text-gold" />
          <span className="font-display text-[11.5px] font-bold tracking-[0.22em] text-text">
            ELITE SOLVERS
          </span>
        </div>
        <span className="font-mono text-[10px] tracking-[0.16em] text-text-mute">WEEKLY</span>
      </div>

      <ul className="relative divide-y divide-line/40">
        {TOP_SOLVERS.map((s, i) => {
          const rankCls =
            i === 0
              ? "text-gold"
              : i === 1
                ? "text-electric"
                : i === 2
                  ? "text-ember"
                  : "text-text-mute"
          return (
            <li
              key={s.handle}
              className="flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-void/40"
            >
              <div
                className={cn(
                  "flex h-7 w-7 items-center justify-center border border-line/60 bg-void/60 font-display text-[12px] font-bold tabular-nums",
                  rankCls,
                )}
              >
                {s.rank}
              </div>
              <div className="flex h-7 w-7 shrink-0 items-center justify-center border border-line/60 bg-void/40 font-display text-[10px] font-bold uppercase text-neon">
                {s.handle.charAt(0)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="truncate font-mono text-[12px] text-text">
                    {s.handle}
                  </span>
                  <span className="font-mono text-[9.5px] tracking-[0.14em] text-text-mute">
                    {s.flag}
                  </span>
                </div>
                <div className="font-display text-[9.5px] font-bold tracking-[0.18em] text-text-mute">
                  {s.solved} SOLVED · +{s.weekly} THIS WEEK
                </div>
              </div>
              <div className="text-right leading-tight">
                <div className="font-display text-[12px] font-bold text-gold tabular-nums">
                  {(s.xp / 1000).toFixed(0)}k
                </div>
                <div className="font-display text-[8.5px] font-bold tracking-[0.18em] text-text-mute">
                  XP
                </div>
              </div>
            </li>
          )
        })}
      </ul>

      <div className="relative border-t border-line/60 px-4 py-2 text-center">
        <button className="font-display text-[10.5px] font-bold tracking-[0.22em] text-text-dim hover:text-neon transition-colors">
          VIEW FULL LEADERBOARD →
        </button>
      </div>
    </div>
  )
}

function ActivityFeed() {
  return (
    <div className="relative overflow-hidden border border-line/60 bg-panel/70 bl-glass">
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-20" />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-[3px] bg-ember opacity-60" />

      <div className="relative flex items-center gap-2 border-b border-line/60 px-4 py-3">
        <Activity className="h-4 w-4 text-ember" />
        <span className="font-display text-[11.5px] font-bold tracking-[0.22em] text-text">
          ARENA PULSE
        </span>
        <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.18em] text-blood">
          <span className="relative h-1.5 w-1.5 rounded-full bg-blood">
            <span className="absolute inset-0 rounded-full bg-blood/60 animate-ping" />
          </span>
          LIVE
        </span>
      </div>

      <ul className="relative divide-y divide-line/40">
        {RECENT_ACTIVITY.map((n, i) => {
          const tagCls =
            n.tag === "WR"
              ? "border-gold/45 bg-gold/10 text-gold"
              : n.tag === "BOSS"
                ? "border-blood/45 bg-blood/12 text-blood"
                : n.tag === "DROP"
                  ? "border-ember/45 bg-ember/10 text-ember"
                  : n.tag === "FORGE"
                    ? "border-electric/45 bg-electric/10 text-electric"
                    : "border-neon/45 bg-neon/10 text-neon"
          return (
            <li key={i} className="px-4 py-3 transition-colors hover:bg-void/40">
              <div className="flex items-center gap-2 pb-1">
                <span
                  className={cn(
                    "inline-flex h-4 items-center border px-1.5 font-display text-[8.5px] font-bold tracking-[0.22em]",
                    tagCls,
                  )}
                >
                  {n.tag}
                </span>
                <span className="font-mono text-[9.5px] tracking-[0.14em] text-text-mute">
                  {n.time}
                </span>
              </div>
              <div className="text-[12.5px] leading-snug text-text-dim">{n.text}</div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function Mini({
  label,
  value,
  accent,
}: {
  label: string
  value: string
  accent: "neon" | "ember" | "gold" | "electric"
}) {
  const cls = COLOR_CLASS[accent]
  return (
    <div className="border border-line/60 bg-void/40 px-2 py-1.5">
      <div className="font-display text-[8.5px] font-bold tracking-[0.22em] text-text-mute">
        {label}
      </div>
      <div
        className={cn(
          "mt-0.5 font-display text-[13px] font-bold leading-none tabular-nums",
          cls.text,
        )}
      >
        {value}
      </div>
    </div>
  )
}

