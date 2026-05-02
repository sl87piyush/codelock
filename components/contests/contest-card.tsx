"use client"

import {
  Coins,
  Users,
  Clock,
  Calendar,
  Trophy,
  Share2,
  ChevronRight,
  ShieldCheck,
  Crown,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { type Contest, formatDuration, formatPrize, formatRelative } from "./contests-data"

const ACCENTS = {
  neon: {
    text: "text-neon",
    border: "border-neon/40",
    bgFade: "from-neon/10",
    barBg: "bg-neon",
    chip: "bg-neon/10 border-neon/50 text-neon",
  },
  ember: {
    text: "text-ember",
    border: "border-ember/50",
    bgFade: "from-ember/15",
    barBg: "bg-ember",
    chip: "bg-ember/10 border-ember/50 text-ember",
  },
  gold: {
    text: "text-gold",
    border: "border-gold/40",
    bgFade: "from-gold/10",
    barBg: "bg-gold",
    chip: "bg-gold/10 border-gold/50 text-gold",
  },
  electric: {
    text: "text-electric",
    border: "border-electric/40",
    bgFade: "from-electric/10",
    barBg: "bg-electric",
    chip: "bg-electric/10 border-electric/50 text-electric",
  },
} as const

export function ContestCard({
  contest,
  onView,
}: {
  contest: Contest
  onView: (id: string) => void
}) {
  const a = ACCENTS[contest.bannerAccent]
  const isLive = contest.status === "live"
  const isUpcoming = contest.status === "upcoming"
  const isPast = contest.status === "past"

  const startDate = new Date(contest.startsAt)
  const dateLabel = startDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  })
  const timeLabel = startDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "UTC",
  })

  const fillPct = contest.capacity
    ? Math.min(100, Math.round((contest.registered / contest.capacity) * 100))
    : null

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
          isPast ? "opacity-30" : "opacity-80",
        )}
      />
      <div
        className={cn(
          "pointer-events-none absolute right-0 top-0 h-32 w-1/2 bg-gradient-to-l to-transparent",
          a.bgFade,
        )}
      />

      {/* Top — status + code */}
      <div className="relative flex items-center justify-between border-b border-line/60 px-4 py-2.5">
        <div className="flex items-center gap-2">
          {isLive && (
            <span className="inline-flex h-5 items-center gap-1.5 border border-blood/60 bg-blood/15 px-2 font-display text-[9.5px] font-bold tracking-[0.22em] text-blood">
              <span className="relative h-1 w-1 rounded-full bg-blood">
                <span className="absolute inset-0 rounded-full bg-blood/60 animate-ping" />
              </span>
              LIVE
            </span>
          )}
          {isUpcoming && (
            <span
              className={cn(
                "inline-flex h-5 items-center gap-1.5 border px-2 font-display text-[9.5px] font-bold tracking-[0.22em]",
                a.chip,
              )}
            >
              UPCOMING
            </span>
          )}
          {isPast && (
            <span className="inline-flex h-5 items-center gap-1.5 border border-line/70 bg-void/60 px-2 font-display text-[9.5px] font-bold tracking-[0.22em] text-text-mute">
              CONCLUDED
            </span>
          )}
          {contest.isOfficial && (
            <span className="inline-flex h-5 items-center gap-1 border border-line/70 bg-void/60 px-1.5 font-display text-[9px] font-bold tracking-[0.18em] text-text-dim">
              <ShieldCheck className="h-3 w-3 text-electric" />
              OFFICIAL
            </span>
          )}
          {contest.isRegistered && (
            <span className="inline-flex h-5 items-center gap-1 border border-neon/50 bg-neon/10 px-1.5 font-display text-[9px] font-bold tracking-[0.18em] text-neon">
              REGISTERED
            </span>
          )}
        </div>
        <span className="font-mono text-[10px] tracking-[0.16em] text-text-mute">
          {contest.code}
        </span>
      </div>

      {/* Body */}
      <div className="relative flex-1 px-4 py-3.5">
        <div className="flex items-center gap-2 pb-1.5 font-display text-[9.5px] font-bold tracking-[0.22em] text-text-mute">
          <span>{contest.category.toUpperCase()}</span>
          <span className="h-3 w-px bg-line/70" />
          <span className={a.text}>{contest.difficulty}</span>
        </div>

        <h3 className="font-display text-[18px] font-bold leading-tight tracking-tight text-text group-hover:text-text">
          {contest.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-[13px] leading-relaxed text-text-dim">
          {contest.tagline}
        </p>

        {/* Sponsors row */}
        {contest.sponsors.length > 0 && (
          <div className="mt-3 flex items-center gap-2">
            <span className="font-display text-[9px] font-bold tracking-[0.22em] text-text-mute">
              SPONSORED BY
            </span>
            <div className="flex flex-wrap gap-1">
              {contest.sponsors.slice(0, 3).map((s) => (
                <span
                  key={s.name}
                  className={cn(
                    "inline-flex h-5 items-center gap-1 border px-1.5 font-mono text-[9.5px] tracking-[0.1em]",
                    s.tier === "TITLE"
                      ? "border-gold/50 bg-gold/10 text-gold"
                      : s.tier === "GOLD"
                        ? "border-electric/40 bg-electric/10 text-electric"
                        : "border-line/70 bg-void/60 text-text-dim",
                  )}
                >
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Stats grid */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          <Stat
            icon={Coins}
            label="PRIZE"
            value={formatPrize(contest)}
            valueClass={a.text}
          />
          <Stat
            icon={Users}
            label="ENTRANTS"
            value={contest.registered.toLocaleString()}
            valueClass="text-text"
          />
          <Stat
            icon={Clock}
            label="DURATION"
            value={formatDuration(contest.durationMin)}
            valueClass="text-text"
          />
        </div>

        {/* Capacity bar (upcoming) */}
        {isUpcoming && fillPct !== null && (
          <div className="mt-3 space-y-1">
            <div className="flex items-center justify-between font-display text-[9px] font-bold tracking-[0.2em] text-text-mute">
              <span>SEATS FILLED</span>
              <span className={a.text}>{fillPct}%</span>
            </div>
            <div className="bl-bar-track h-1 overflow-hidden">
              <div className={cn("h-full", a.barBg)} style={{ width: `${fillPct}%` }} />
            </div>
          </div>
        )}

        {/* Live progress */}
        {isLive && contest.progress !== undefined && (
          <div className="mt-3 space-y-1">
            <div className="flex items-center justify-between font-display text-[9px] font-bold tracking-[0.2em] text-text-mute">
              <span>ROUND PROGRESS</span>
              <span className={a.text}>{Math.round(contest.progress * 100)}%</span>
            </div>
            <div className="bl-bar-track h-1 overflow-hidden">
              <div
                className={cn("h-full shadow-[0_0_8px_currentColor]", a.barBg)}
                style={{ width: `${contest.progress * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Past — winner */}
        {isPast && contest.winner && (
          <div className="mt-4 flex items-center justify-between border border-gold/30 bg-gold/5 px-3 py-2">
            <div className="flex items-center gap-2">
              <Crown className="h-4 w-4 text-gold" />
              <div className="leading-tight">
                <div className="font-display text-[9px] font-bold tracking-[0.22em] text-text-mute">
                  CHAMPION
                </div>
                <div className="font-mono text-[12.5px] text-gold">{contest.winner}</div>
              </div>
            </div>
            <div className="text-right leading-tight">
              <div className="font-display text-[9px] font-bold tracking-[0.22em] text-text-mute">
                WON
              </div>
              <div className="font-display text-[13px] font-bold text-gold">
                {contest.winners?.[0]?.prize ?? "—"}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer — date + actions */}
      <div className="relative flex items-center justify-between border-t border-line/60 bg-void/30 px-4 py-2.5">
        <div className="flex items-center gap-1.5 text-[11px] text-text-dim">
          <Calendar className="h-3.5 w-3.5 text-text-mute" />
          <span className="font-mono tracking-tight">
            {dateLabel} · {timeLabel}
          </span>
          <span className="ml-1 font-display text-[10px] font-bold tracking-[0.18em] text-text-mute">
            · {formatRelative(contest.startsAt).toUpperCase()}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onView(contest.id)}
            aria-label="Share contest"
            className="inline-flex h-8 w-8 items-center justify-center border border-line/60 bg-void/40 text-text-mute hover:border-neon/40 hover:text-neon transition-colors"
          >
            <Share2 className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => onView(contest.id)}
            className={cn(
              "inline-flex h-8 items-center gap-1.5 px-3 font-display text-[10.5px] font-bold tracking-[0.18em] transition-all bl-clip-chevron",
              isLive
                ? "border border-blood/50 bg-blood/15 text-blood hover:bg-blood/25"
                : isUpcoming
                  ? "border border-neon/50 bg-neon/10 text-neon hover:bg-neon/20"
                  : "border border-line/70 bg-void/60 text-text-dim hover:border-gold/40 hover:text-gold",
            )}
          >
            {isLive ? "ENTER" : isUpcoming ? (contest.isRegistered ? "VIEW" : "REGISTER") : "RECAP"}
            <ChevronRight className="h-3 w-3" />
          </button>
        </div>
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
      <div className={cn("mt-0.5 font-display text-[14px] font-bold leading-none", valueClass)}>
        {value}
      </div>
    </div>
  )
}
