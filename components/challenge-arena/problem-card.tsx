"use client"

import {
  Bookmark,
  Building2,
  CheckCircle2,
  ChevronRight,
  Clock,
  Crown,
  Flame,
  Sparkles,
  Star,
  Users,
  Zap,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  DIFFICULTY_META,
  DOMAIN_META,
  formatCount,
  formatTime,
  type Problem,
} from "./arena-data"

const ACCENTS = {
  neon: {
    text: "text-neon",
    border: "border-neon/40",
    borderActive: "border-neon/60",
    bgFade: "from-neon/10",
    barBg: "bg-neon",
    chip: "border-neon/50 bg-neon/10 text-neon",
    softBg: "bg-neon/5",
  },
  electric: {
    text: "text-electric",
    border: "border-electric/40",
    borderActive: "border-electric/60",
    bgFade: "from-electric/10",
    barBg: "bg-electric",
    chip: "border-electric/50 bg-electric/10 text-electric",
    softBg: "bg-electric/5",
  },
  ember: {
    text: "text-ember",
    border: "border-ember/45",
    borderActive: "border-ember/60",
    bgFade: "from-ember/12",
    barBg: "bg-ember",
    chip: "border-ember/50 bg-ember/10 text-ember",
    softBg: "bg-ember/5",
  },
  blood: {
    text: "text-blood",
    border: "border-blood/50",
    borderActive: "border-blood/65",
    bgFade: "from-blood/15",
    barBg: "bg-blood",
    chip: "border-blood/55 bg-blood/12 text-blood",
    softBg: "bg-blood/8",
  },
  gold: {
    text: "text-gold",
    border: "border-gold/45",
    borderActive: "border-gold/60",
    bgFade: "from-gold/12",
    barBg: "bg-gold",
    chip: "border-gold/50 bg-gold/10 text-gold",
    softBg: "bg-gold/5",
  },
} as const

export function ProblemCard({
  problem,
  onOpen,
  onToggleBookmark,
}: {
  problem: Problem
  onOpen: (id: string) => void
  onToggleBookmark: (id: string) => void
}) {
  const diff = DIFFICULTY_META[problem.difficulty]
  const dom = DOMAIN_META[problem.domain]
  const a = ACCENTS[diff.accent]
  const isSolved = problem.status === "solved"
  const isAttempted = problem.status === "attempted"

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden border bg-panel/60 bl-glass transition-all",
        a.border,
        "hover:border-neon/60 hover:shadow-[0_0_28px_-6px_rgba(0,240,255,0.18)]",
      )}
    >
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-25" />
      <div
        className={cn(
          "pointer-events-none absolute inset-y-0 left-0 w-[3px]",
          a.barBg,
          isSolved ? "opacity-90" : "opacity-70",
        )}
      />
      <div
        className={cn(
          "pointer-events-none absolute right-0 top-0 h-32 w-1/2 bg-gradient-to-l to-transparent",
          a.bgFade,
        )}
      />

      {/* Top — status + code + bookmark */}
      <div className="relative flex items-center justify-between gap-2 border-b border-line/60 px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          {isSolved && (
            <span className="inline-flex h-5 items-center gap-1 border border-electric/55 bg-electric/12 px-1.5 font-display text-[9.5px] font-bold tracking-[0.22em] text-electric">
              <CheckCircle2 className="h-3 w-3" />
              SOLVED
            </span>
          )}
          {isAttempted && (
            <span className="inline-flex h-5 items-center gap-1 border border-ember/45 bg-ember/10 px-1.5 font-display text-[9.5px] font-bold tracking-[0.22em] text-ember">
              IN PROGRESS
            </span>
          )}
          {problem.isNew && (
            <span className="inline-flex h-5 items-center gap-1 border border-neon/45 bg-neon/10 px-1.5 font-display text-[9.5px] font-bold tracking-[0.22em] text-neon">
              <Sparkles className="h-3 w-3" />
              NEW
            </span>
          )}
          {problem.isHot && (
            <span className="inline-flex h-5 items-center gap-1 border border-blood/45 bg-blood/12 px-1.5 font-display text-[9.5px] font-bold tracking-[0.22em] text-blood">
              <Flame className="h-3 w-3" />
              HOT
            </span>
          )}
          {problem.isPremium && (
            <span className="inline-flex h-5 items-center gap-1 border border-gold/50 bg-gold/10 px-1.5 font-display text-[9.5px] font-bold tracking-[0.22em] text-gold">
              <Crown className="h-3 w-3" />
              ELITE
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-[10px] tracking-[0.16em] text-text-mute">
            {problem.code}
          </span>
          <button
            type="button"
            onClick={() => onToggleBookmark(problem.id)}
            aria-label={problem.bookmarked ? "Remove bookmark" : "Bookmark problem"}
            className={cn(
              "flex h-6 w-6 items-center justify-center border transition-colors",
              problem.bookmarked
                ? "border-neon/50 bg-neon/10 text-neon"
                : "border-line/60 text-text-mute hover:border-neon/40 hover:text-neon",
            )}
          >
            <Bookmark
              className={cn("h-3 w-3", problem.bookmarked && "fill-neon")}
            />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="relative flex-1 px-4 py-3.5">
        {/* Domain + difficulty meta */}
        <div className="flex items-center gap-2 pb-1.5">
          <span
            className={cn(
              "inline-flex h-5 items-center border px-1.5 font-display text-[9.5px] font-bold tracking-[0.22em]",
              a.chip,
            )}
          >
            {diff.short} · {problem.difficulty.toUpperCase()}
          </span>
          <span className="inline-flex h-5 items-center border border-line/70 bg-void/60 px-1.5 font-display text-[9.5px] font-bold tracking-[0.22em] text-text-dim">
            {dom.abbr}
          </span>
          <span className="font-mono text-[10px] tracking-tight text-text-mute">
            {problem.domain}
          </span>
        </div>

        <h3 className="font-display text-[17px] font-bold leading-snug tracking-tight text-text">
          {problem.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-[13px] leading-relaxed text-text-dim">
          {problem.tagline}
        </p>

        {/* Tags */}
        {problem.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {problem.tags.slice(0, 4).map((t) => (
              <span
                key={t}
                className="inline-flex h-5 items-center border border-line/70 bg-void/40 px-1.5 font-mono text-[10px] tracking-tight text-text-dim"
              >
                {t}
              </span>
            ))}
            {problem.tags.length > 4 && (
              <span className="inline-flex h-5 items-center px-1 font-mono text-[10px] tracking-tight text-text-mute">
                +{problem.tags.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Stats grid */}
        <div className="mt-3.5 grid grid-cols-3 gap-2">
          <Stat
            icon={Clock}
            label="EST"
            value={formatTime(problem.estimatedMinutes)}
            valueClass="text-text"
          />
          <Stat
            icon={Zap}
            label="XP"
            value={problem.xp.toString()}
            valueClass={a.text}
          />
          <Stat
            icon={Users}
            label="ACCEPT"
            value={`${problem.acceptanceRate}%`}
            valueClass="text-text"
          />
        </div>

        {/* Progress (in progress) */}
        {isAttempted && problem.progress !== undefined && (
          <div className="mt-3 space-y-1">
            <div className="flex items-center justify-between font-display text-[9px] font-bold tracking-[0.22em] text-text-mute">
              <span>RESUME PROGRESS</span>
              <span className="text-ember">{Math.round(problem.progress * 100)}%</span>
            </div>
            <div className="bl-bar-track h-1 overflow-hidden">
              <div
                className="h-full bg-ember shadow-[0_0_8px_currentColor]"
                style={{ width: `${problem.progress * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Companies */}
        {problem.companies.length > 0 && (
          <div className="mt-3 flex items-center gap-2">
            <Building2 className="h-3 w-3 text-text-mute" />
            <div className="flex min-w-0 flex-wrap gap-1">
              {problem.companies.slice(0, 3).map((c) => (
                <span
                  key={c}
                  className="inline-flex h-5 items-center border border-line/60 bg-void/40 px-1.5 font-mono text-[10px] tracking-tight text-text-dim"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer — author + actions */}
      <div className="relative flex items-center justify-between gap-2 border-t border-line/60 bg-void/30 px-4 py-2.5">
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center border border-line/60 bg-void/60 font-display text-[10px] font-bold uppercase text-neon">
            {problem.author.charAt(0)}
          </div>
          <div className="min-w-0 leading-tight">
            <div className="font-mono text-[11px] truncate text-text-dim">
              {problem.author}
            </div>
            <div className="flex items-center gap-1 font-display text-[9px] font-bold tracking-[0.18em] text-text-mute">
              <Star className="h-2.5 w-2.5 text-gold" />
              {problem.rating.toFixed(1)} · {formatCount(problem.solvedCount)} solves
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onOpen(problem.id)}
          className={cn(
            "inline-flex h-8 items-center gap-1.5 px-3 font-display text-[10.5px] font-bold tracking-[0.18em] transition-all bl-clip-chevron",
            isSolved
              ? "border border-electric/50 bg-electric/12 text-electric hover:bg-electric/20"
              : isAttempted
                ? "border border-ember/55 bg-ember/15 text-ember hover:bg-ember/25"
                : "border border-neon/50 bg-neon/10 text-neon hover:bg-neon/20",
          )}
        >
          {isSolved ? "REVIEW" : isAttempted ? "RESUME" : "ENGAGE"}
          <ChevronRight className="h-3 w-3" />
        </button>
      </div>
    </article>
  )
}

function Stat({
  icon: Icon,
  label,
  value,
  valueClass,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  valueClass: string
}) {
  return (
    <div className="border border-line/60 bg-void/30 px-2 py-2">
      <div className="flex items-center gap-1 font-display text-[8.5px] font-bold tracking-[0.22em] text-text-mute">
        <Icon className="h-3 w-3" />
        {label}
      </div>
      <div
        className={cn(
          "mt-0.5 font-display text-[14px] font-bold leading-none tabular-nums",
          valueClass,
        )}
      >
        {value}
      </div>
    </div>
  )
}
