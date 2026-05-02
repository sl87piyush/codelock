"use client"

import { ChevronRight, Crown, Clock, Zap, Star, Flame } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  DIFFICULTY_META,
  formatCount,
  formatTime,
  type Problem,
} from "./arena-data"

export function FeaturedGauntlet({
  daily,
  bossBattle,
  onOpen,
}: {
  daily: Problem | null
  bossBattle: Problem | null
  onOpen: (id: string) => void
}) {
  if (!daily && !bossBattle) return null

  return (
    <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
      {daily && <DailyCard problem={daily} onOpen={onOpen} />}
      {bossBattle && <BossCard problem={bossBattle} onOpen={onOpen} />}
    </div>
  )
}

const DIFFICULTY_CLASS = {
  neon: { border: "border-neon/50", text: "text-neon", bgFade: "from-neon/15" },
  electric: {
    border: "border-electric/50",
    text: "text-electric",
    bgFade: "from-electric/15",
  },
  ember: { border: "border-ember/50", text: "text-ember", bgFade: "from-ember/15" },
  blood: { border: "border-blood/55", text: "text-blood", bgFade: "from-blood/20" },
  gold: { border: "border-gold/50", text: "text-gold", bgFade: "from-gold/15" },
} as const

function DailyCard({
  problem,
  onOpen,
}: {
  problem: Problem
  onOpen: (id: string) => void
}) {
  const diff = DIFFICULTY_META[problem.difficulty]
  const cls = DIFFICULTY_CLASS[diff.accent]

  return (
    <article
      className={cn(
        "relative overflow-hidden border bg-panel/70 bl-glass-strong bl-scan",
        cls.border,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-30" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-2/3 bg-gradient-to-l from-electric/15 via-neon/5 to-transparent" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-electric/20 blur-3xl bl-float-slow" />

      <div className="relative flex flex-col gap-4 p-5 md:p-6 lg:flex-row lg:items-center">
        <div className="flex-1 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex h-6 items-center gap-1.5 border border-electric/55 bg-electric/15 px-2.5 font-display text-[10px] font-bold tracking-[0.22em] text-electric bl-clip-chevron">
              <Star className="h-3 w-3" />
              DAILY GAUNTLET
            </span>
            <span
              className={cn(
                "inline-flex h-6 items-center gap-1.5 border bg-void/60 px-2.5 font-display text-[10px] font-bold tracking-[0.2em]",
                cls.border,
                cls.text,
              )}
            >
              {problem.difficulty.toUpperCase()} · {diff.short}
            </span>
            <span className="font-mono text-[10px] tracking-[0.16em] text-text-mute">
              {problem.code}
            </span>
            {problem.isHot && (
              <span className="inline-flex h-6 items-center gap-1 border border-ember/45 bg-ember/10 px-2 font-display text-[10px] font-bold tracking-[0.2em] text-ember">
                <Flame className="h-3 w-3" />
                HOT
              </span>
            )}
          </div>

          <h2 className="font-display text-2xl font-bold leading-tight tracking-tight text-text md:text-3xl">
            {problem.title}
          </h2>
          <p className="max-w-2xl text-[13.5px] leading-relaxed text-text-dim">
            {problem.tagline}
          </p>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {problem.tags.slice(0, 5).map((t) => (
              <span
                key={t}
                className="inline-flex h-5 items-center border border-line/70 bg-void/60 px-1.5 font-mono text-[10px] tracking-tight text-text-dim"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            <button
              type="button"
              onClick={() => onOpen(problem.id)}
              className="bl-btn-primary h-10 px-5 text-[12px] bl-clip-chevron"
            >
              ACCEPT THE GAUNTLET
              <ChevronRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="bl-btn-ghost h-10 px-4 bl-clip-chevron"
            >
              SCOUT REPORT
            </button>
          </div>
        </div>

        {/* Stat plate */}
        <div className="grid w-full grid-cols-3 gap-2 lg:w-[320px]">
          <Plate
            icon={Clock}
            label="EST. TIME"
            value={formatTime(problem.estimatedMinutes)}
            accent="neon"
          />
          <Plate
            icon={Zap}
            label="XP"
            value={problem.xp.toString()}
            accent="electric"
          />
          <Plate
            icon={Crown}
            label="ACCEPT"
            value={`${problem.acceptanceRate}%`}
            accent="ember"
          />
          <div className="col-span-3 border border-line/60 bg-void/40 px-3 py-2">
            <div className="flex items-center justify-between font-display text-[9px] font-bold tracking-[0.2em] text-text-mute">
              <span>SOLVED BY</span>
              <span className="text-text">
                {formatCount(problem.solvedCount)} / {formatCount(problem.attempts)}
              </span>
            </div>
            <div className="mt-1.5 bl-bar-track h-1 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-electric to-neon"
                style={{
                  width: `${Math.min(100, (problem.solvedCount / problem.attempts) * 100)}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

function BossCard({
  problem,
  onOpen,
}: {
  problem: Problem
  onOpen: (id: string) => void
}) {
  return (
    <article className="relative overflow-hidden border border-blood/55 bg-panel/70 bl-glass-strong">
      <div className="pointer-events-none absolute inset-0 bl-stripes opacity-50" />
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-25" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-2/3 bg-gradient-to-l from-blood/20 via-ember/5 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-[3px] bg-blood opacity-90 shadow-[0_0_18px_#ff3355]" />

      <div className="relative flex h-full flex-col gap-3 p-5">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-6 items-center gap-1.5 border border-blood/60 bg-blood/15 px-2.5 font-display text-[10px] font-bold tracking-[0.22em] text-blood bl-flicker">
            <Flame className="h-3 w-3" />
            BOSS BATTLE
          </span>
          <span className="font-mono text-[10px] tracking-[0.18em] text-text-mute">
            {problem.code}
          </span>
        </div>

        <h2 className="font-display text-xl font-bold leading-tight tracking-tight text-text">
          {problem.title}
        </h2>
        <p className="line-clamp-2 text-[12.5px] leading-relaxed text-text-dim">
          {problem.tagline}
        </p>

        <div className="mt-auto flex items-center gap-3 pt-2">
          <div className="flex-1 border border-line/60 bg-void/40 px-3 py-1.5">
            <div className="font-display text-[9px] font-bold tracking-[0.22em] text-text-mute">
              REWARD
            </div>
            <div className="font-display text-[14px] font-bold text-gold tabular-nums">
              {problem.xp} XP · LEGENDARY
            </div>
          </div>
          <button
            type="button"
            onClick={() => onOpen(problem.id)}
            className="inline-flex h-10 items-center gap-2 border border-blood/55 bg-blood/15 px-4 font-display text-[11px] font-bold tracking-[0.2em] text-blood transition-all hover:bg-blood/25 hover:shadow-[0_0_20px_rgba(255,51,85,0.4)] bl-clip-chevron"
          >
            ENGAGE
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </article>
  )
}

function Plate({
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
    neon: { text: "text-neon", border: "border-neon/40" },
    ember: { text: "text-ember", border: "border-ember/40" },
    gold: { text: "text-gold", border: "border-gold/40" },
    electric: { text: "text-electric", border: "border-electric/40" },
  }[accent]

  return (
    <div className={cn("border bg-void/40 px-2.5 py-2", accents.border)}>
      <div className="flex items-center gap-1 font-display text-[8.5px] font-bold tracking-[0.22em] text-text-mute">
        <Icon className={cn("h-3 w-3", accents.text)} />
        {label}
      </div>
      <div
        className={cn(
          "mt-0.5 font-display text-[15px] font-bold leading-none tabular-nums",
          accents.text,
        )}
      >
        {value}
      </div>
    </div>
  )
}
