"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import type {
  Stage,
  StageStatus,
  RegistrationStatus,
  TrackMeta,
  Track,
  Champion,
} from "@/lib/championship-data"
import { getStatusMeta } from "@/lib/championship-data"
import { Crown, Users, User, Shield, Clock, Lock, Check } from "lucide-react"

// =============================================================
// LIVE COUNTDOWN — D / H / M / S to a target ISO timestamp.
// Renders zeros until mounted to avoid hydration mismatch.
// =============================================================
export function LiveCountdown({
  targetIso,
  variant = "ember",
  compact = false,
}: {
  targetIso: string
  variant?: "ember" | "neon"
  compact?: boolean
}) {
  const [now, setNow] = useState<number | null>(null)

  useEffect(() => {
    setNow(Date.now())
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  const target = new Date(targetIso).getTime()
  const diff = Math.max(0, target - (now ?? target))
  const days = Math.floor(diff / 86400000)
  const hours = Math.floor((diff % 86400000) / 3600000)
  const mins = Math.floor((diff % 3600000) / 60000)
  const secs = Math.floor((diff % 60000) / 1000)

  const cells = [
    { label: "DAYS", v: days },
    { label: "HRS", v: hours },
    { label: "MIN", v: mins },
    { label: "SEC", v: secs },
  ]

  const accent =
    variant === "ember"
      ? "text-ember border-ember/40 shadow-[0_0_24px_rgba(255,107,26,0.25)]"
      : "text-neon border-neon/40 shadow-[0_0_24px_rgba(0,240,255,0.25)]"

  return (
    <div className={cn("flex items-stretch", compact ? "gap-1.5" : "gap-2 sm:gap-3")}>
      {cells.map((c, i) => (
        <div
          key={c.label}
          className={cn(
            "relative flex min-w-0 flex-col items-center justify-center border bg-void/60 backdrop-blur-md bl-clip-notch",
            accent,
            compact ? "px-2.5 py-2 sm:px-3" : "px-3 py-3 sm:px-5 sm:py-4",
          )}
        >
          <span
            className={cn(
              "font-display font-bold tabular-nums leading-none",
              compact ? "text-2xl sm:text-3xl" : "text-3xl sm:text-5xl",
            )}
          >
            {String(c.v).padStart(2, "0")}
          </span>
          <span
            className={cn(
              "mt-1.5 font-display font-bold tracking-[0.22em] text-text-mute",
              compact ? "text-[8px]" : "text-[9px] sm:text-[10px]",
            )}
          >
            {c.label}
          </span>
          {i < cells.length - 1 && (
            <span
              aria-hidden
              className="pointer-events-none absolute -right-1.5 top-1/2 -translate-y-1/2 font-display text-text-mute"
            >
              :
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

// =============================================================
// STATUS PILL — track registration state (REGISTERED, QUALIFIED…)
// =============================================================
export function StatusPill({
  status,
  size = "md",
}: {
  status: RegistrationStatus
  size?: "sm" | "md"
}) {
  const meta = getStatusMeta(status)
  const colorClass =
    meta.color === "neon"
      ? "border-neon/60 text-neon bg-neon/10"
      : meta.color === "neon-soft"
        ? "border-neon-soft/60 text-neon-soft bg-neon-soft/10"
        : meta.color === "ember"
          ? "border-ember/60 text-ember bg-ember/10"
          : meta.color === "gold"
            ? "border-gold/70 text-gold bg-gold/10 shadow-[0_0_18px_rgba(251,191,36,0.25)]"
            : meta.color === "blood"
              ? "border-blood/60 text-blood bg-blood/10"
              : "border-line bg-panel/60 text-text-dim"

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border font-display font-bold tracking-[0.2em] bl-clip-chevron",
        size === "sm" ? "px-2 py-0.5 text-[9px]" : "px-2.5 py-1 text-[10px]",
        colorClass,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {meta.label}
    </span>
  )
}

// =============================================================
// TRACK ICON — per-track lucide icon
// =============================================================
export function TrackIcon({ track, className }: { track: Track; className?: string }) {
  const Icon = track === "solo" ? User : track === "duo" ? Users : Shield
  return <Icon className={className} />
}

// =============================================================
// TRACK CARD — Solo / Duo / Clan picker (large, click-to-select)
// =============================================================
export function TrackCard({
  track,
  active,
  registrationStatus,
  rank,
  onSelect,
}: {
  track: TrackMeta
  active: boolean
  registrationStatus: RegistrationStatus
  rank?: number
  onSelect: () => void
}) {
  const filled = (track.participants / track.slotsTotal) * 100
  const elite = track.elite

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden text-left transition-all",
        "border bg-panel/40 backdrop-blur-md bl-clip-notch",
        active
          ? elite
            ? "border-ember/60 shadow-[0_0_36px_rgba(255,107,26,0.35)] scale-[1.01]"
            : "border-neon/60 shadow-[0_0_36px_rgba(0,240,255,0.3)] scale-[1.01]"
          : "border-line/60 hover:border-neon/40 hover:shadow-[0_0_24px_rgba(0,240,255,0.15)]",
      )}
    >
      {/* Stripes for elite */}
      {elite && (
        <div className="pointer-events-none absolute inset-0 opacity-30 bl-stripes" />
      )}
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-20" />

      {/* Selection corner */}
      {active && (
        <div className="absolute right-3 top-3 z-10 flex h-6 w-6 items-center justify-center bg-neon text-void shadow-[0_0_18px_#00f0ff]">
          <Check className="h-3.5 w-3.5" strokeWidth={3} />
        </div>
      )}

      {/* Elite ribbon */}
      {elite && (
        <div className="absolute -right-10 top-5 z-10 rotate-45 bg-ember/90 px-10 py-1 font-display text-[9px] font-bold tracking-[0.22em] text-void shadow-[0_0_22px_rgba(255,107,26,0.55)]">
          ELITE PATH
        </div>
      )}

      <div className="relative flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center border bl-clip-chevron",
              elite
                ? "border-ember/60 bg-ember/10 text-ember"
                : "border-neon/50 bg-neon/10 text-neon",
            )}
          >
            <TrackIcon track={track.id} className="h-5 w-5" />
          </div>
          <StatusPill status={registrationStatus} size="sm" />
        </div>

        <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-text">
          {track.label}
        </h3>
        <p
          className={cn(
            "mt-1 font-display text-[11px] font-semibold tracking-[0.18em]",
            elite ? "text-ember" : "text-neon",
          )}
        >
          {track.tagline.toUpperCase()}
        </p>

        <p className="mt-3 text-sm text-text-dim leading-relaxed text-pretty">
          {track.description}
        </p>

        <div className="mt-5 grid grid-cols-2 gap-2">
          <div className="border-l border-line/60 pl-2.5">
            <div className="font-display text-[9px] tracking-[0.22em] text-text-mute">
              FIELD
            </div>
            <div className="mt-0.5 font-display text-sm font-bold tabular-nums text-text">
              {track.participants.toLocaleString()}
              <span className="text-text-mute">/{track.slotsTotal.toLocaleString()}</span>
            </div>
          </div>
          <div className="border-l border-line/60 pl-2.5">
            <div className="font-display text-[9px] tracking-[0.22em] text-text-mute">
              PRIZE POOL
            </div>
            <div
              className={cn(
                "mt-0.5 font-display text-sm font-bold tabular-nums",
                elite ? "text-ember" : "text-neon",
              )}
            >
              {track.prizePool}
            </div>
          </div>
        </div>

        {/* Capacity bar */}
        <div className="mt-3.5">
          <div className="relative h-1 w-full bl-bar-track">
            <div
              className={cn(
                "h-full transition-all",
                elite
                  ? "bg-ember shadow-[0_0_12px_rgba(255,107,26,0.6)]"
                  : "bg-neon shadow-[0_0_12px_rgba(0,240,255,0.6)]",
              )}
              style={{ width: `${filled}%` }}
            />
          </div>
          <div className="mt-1 flex items-center justify-between font-mono text-[10px] tracking-wider text-text-mute">
            <span>{filled.toFixed(1)}% FILLED</span>
            {rank && (
              <span className="text-text-dim">
                YOUR RANK: <span className="text-text">#{rank}</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  )
}

// =============================================================
// STAGE NODE — single stop on the timeline.
// Connector line is rendered by the parent, NOT here.
// =============================================================
export function StageNode({ stage }: { stage: Stage }) {
  const live = stage.status === "live"
  const completed = stage.status === "completed"
  const upcoming = stage.status === "upcoming"
  const locked = stage.status === "locked"

  const dotClass = completed
    ? "bg-neon-soft border-neon-soft shadow-[0_0_18px_rgba(56,189,248,0.6)]"
    : live
      ? "bg-ember border-ember shadow-[0_0_28px_rgba(255,107,26,0.7)] bl-pulse-ember"
      : locked
        ? "bg-panel border-line"
        : "bg-panel border-neon/40"

  const titleClass = locked
    ? "text-text-mute"
    : live
      ? "text-ember text-glow-ember"
      : completed
        ? "text-text"
        : "text-text"

  return (
    <li className="relative flex flex-col items-center text-center">
      {/* Index badge above */}
      <span
        className={cn(
          "mb-3 inline-flex items-center gap-1 border px-1.5 py-0.5 font-display text-[9px] font-bold tracking-[0.22em] bl-clip-chevron",
          live
            ? "border-ember/60 bg-ember/10 text-ember"
            : completed
              ? "border-neon-soft/50 bg-neon-soft/10 text-neon-soft"
              : "border-line text-text-mute",
        )}
      >
        {locked ? <Lock className="h-2.5 w-2.5" /> : `STAGE ${stage.index}`}
      </span>

      {/* Dot */}
      <span
        className={cn(
          "relative z-10 flex h-7 w-7 items-center justify-center border-2 transition-transform",
          dotClass,
        )}
      >
        {completed && <Check className="h-3 w-3 text-void" strokeWidth={3} />}
        {live && (
          <>
            <span className="absolute inset-0 rounded-full border-2 border-ember/60 bl-pulse-ring" />
          </>
        )}
      </span>

      {/* Body */}
      <div className="mt-3 max-w-[180px]">
        <div
          className={cn(
            "font-display text-sm font-bold tracking-tight",
            titleClass,
          )}
        >
          {stage.title}
        </div>
        <div
          className={cn(
            "mt-1 font-mono text-[10px] tracking-wider",
            locked ? "text-text-mute/70" : "text-text-dim",
          )}
        >
          {stage.dateLabel}
        </div>
        {live && stage.progress !== undefined && (
          <div className="mt-2">
            <div className="h-1 w-full bl-bar-track">
              <div
                className="h-full bg-ember shadow-[0_0_10px_rgba(255,107,26,0.6)] transition-all"
                style={{ width: `${stage.progress}%` }}
              />
            </div>
            <div className="mt-1 font-mono text-[9px] tracking-wider text-ember/80">
              {stage.progress}% COMPLETE
            </div>
          </div>
        )}
        {!live && stage.fieldSize !== undefined && (
          <div className="mt-1 font-display text-[10px] tracking-[0.18em] text-text-mute">
            {stage.fieldSize.toLocaleString()} {stage.fieldSize === 1 ? "CHAMPION" : "SEEDS"}
          </div>
        )}
        {upcoming && (
          <div className="mt-1 font-display text-[10px] tracking-[0.18em] text-text-mute">
            UPCOMING
          </div>
        )}
      </div>
    </li>
  )
}

// =============================================================
// CHAMPION AVATAR FRAME — gold notched portrait used in Hall.
// =============================================================
export function ChampionFrame({
  initials,
  hue,
  size = 96,
  rank,
}: {
  initials: string
  hue: number
  size?: number
  rank?: number
}) {
  const a = `hsl(${hue} 90% 65%)`
  const b = `hsl(${(hue + 35) % 360} 80% 45%)`
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      {/* Outer gold ring */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #fde68a, #fbbf24 40%, #b45309 100%)",
          clipPath:
            "polygon(14% 0, 100% 0, 100% 86%, 86% 100%, 0 100%, 0 14%)",
          boxShadow:
            "0 0 30px rgba(251, 191, 36, 0.45), 0 0 60px rgba(251, 191, 36, 0.18)",
        }}
      />
      {/* Inner cut for portrait */}
      <div
        className="absolute"
        style={{
          inset: 4,
          background: `linear-gradient(135deg, ${a}, ${b})`,
          clipPath:
            "polygon(13% 0, 100% 0, 100% 87%, 87% 100%, 0 100%, 0 13%)",
        }}
      />
      <span
        className="absolute inset-0 flex items-center justify-center font-display font-bold text-void"
        style={{ fontSize: size * 0.32 }}
      >
        {initials}
      </span>
      {/* Crown */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
        <Crown
          className="h-5 w-5 text-gold drop-shadow-[0_0_10px_rgba(251,191,36,0.7)]"
          strokeWidth={2.4}
          fill="currentColor"
        />
      </div>
      {/* Hall rank — bottom right */}
      {rank !== undefined && (
        <div className="absolute -bottom-2 -right-2 flex h-7 min-w-7 items-center justify-center border border-gold/60 bg-void px-1.5 font-display text-[10px] font-bold tracking-[0.12em] text-gold bl-clip-chevron">
          #{rank}
        </div>
      )}
    </div>
  )
}

// =============================================================
// CHAMPION CARD — used inside Hall of Champions year groups.
// =============================================================
export function ChampionCard({ champion }: { champion: Champion }) {
  const trackLabel =
    champion.track === "solo" ? "SOLO" : champion.track === "duo" ? "DUO" : "CLAN"

  return (
    <article className="group relative flex flex-col gap-5 overflow-hidden border border-gold/15 bg-gradient-to-b from-[rgba(40,28,8,0.55)] to-[rgba(10,7,2,0.85)] p-6 transition-all hover:border-gold/40 hover:shadow-[0_0_40px_rgba(251,191,36,0.18)] sm:flex-row sm:items-center sm:p-7">
      {/* Subtle gold pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #fbbf24 0px, #fbbf24 1px, transparent 1px, transparent 14px)",
        }}
      />

      <ChampionFrame
        initials={champion.initials}
        hue={champion.hue}
        size={104}
        rank={champion.hallRank}
      />

      <div className="relative min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 border border-gold/50 bg-gold/10 px-2 py-0.5 font-display text-[9px] font-bold tracking-[0.22em] text-gold bl-clip-chevron">
            <Crown className="h-2.5 w-2.5" />
            {trackLabel} CHAMPION
          </span>
          <span className="font-mono text-[10px] tracking-[0.2em] text-text-mute">
            {champion.seasonLabel}
          </span>
        </div>

        <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-text">
          {champion.primaryName}
        </h3>
        {champion.handle && (
          <div className="font-mono text-xs text-text-dim">@{champion.handle}</div>
        )}
        {champion.members && (
          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-text-dim">
            <span className="font-display text-[10px] tracking-[0.2em] text-text-mute">
              MEMBERS
            </span>
            {champion.members.map((m, i) => (
              <span key={m.handle} className="text-text">
                {m.name}
                {i < champion.members!.length - 1 && (
                  <span className="text-text-mute"> · </span>
                )}
              </span>
            ))}
          </div>
        )}

        <p className="mt-4 max-w-2xl border-l-2 border-gold/40 pl-3 text-sm italic text-text-dim leading-relaxed">
          &ldquo;{champion.quote}&rdquo;
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div>
            <div className="font-display text-[9px] tracking-[0.22em] text-text-mute">
              FINAL SCORE
            </div>
            <div className="mt-1 font-display text-sm font-bold tabular-nums text-gold">
              {champion.finalScore}
            </div>
          </div>
          <div>
            <div className="font-display text-[9px] tracking-[0.22em] text-text-mute">
              DEFEATED
            </div>
            <div className="mt-1 font-display text-sm font-bold text-text">
              {champion.defeatedInFinals}
            </div>
          </div>
          <div>
            <div className="font-display text-[9px] tracking-[0.22em] text-text-mute">
              FROM
            </div>
            <div className="mt-1 font-display text-sm font-bold text-text">
              {champion.region}
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-start gap-2 border-t border-gold/15 pt-3 text-[12px] text-text-dim leading-relaxed">
          <span className="mt-0.5 inline-flex h-4 items-center font-display text-[9px] tracking-[0.22em] text-gold/80">
            SIGNATURE
          </span>
          <span className="text-text">{champion.signature}</span>
        </div>
      </div>
    </article>
  )
}

// =============================================================
// LANE TOGGLE — Open vs Crown, with the Crown lane locked.
// =============================================================
export function LaneToggle({
  current,
  onChange,
}: {
  current: "open" | "crown"
  onChange: (l: "open" | "crown") => void
}) {
  const items: { id: "open" | "crown"; label: string; locked?: boolean }[] = [
    { id: "open", label: "OPEN LANE" },
    { id: "crown", label: "CROWN LANE", locked: true },
  ]
  return (
    <div className="inline-flex border border-line/60 bg-void/60 p-0.5 bl-clip-chevron">
      {items.map((it) => {
        const active = current === it.id
        return (
          <button
            key={it.id}
            type="button"
            onClick={() => !it.locked && onChange(it.id)}
            disabled={it.locked}
            className={cn(
              "relative inline-flex items-center gap-1.5 px-3 py-1.5 font-display text-[10px] font-bold tracking-[0.2em] transition-all",
              active && "bg-neon/15 text-neon shadow-[0_0_18px_rgba(0,240,255,0.25)]",
              !active && !it.locked && "text-text-dim hover:text-neon",
              it.locked && "cursor-not-allowed text-text-mute",
            )}
          >
            {it.locked && <Lock className="h-2.5 w-2.5" />}
            {it.label}
          </button>
        )
      })}
    </div>
  )
}

// =============================================================
// LIVE CLOCK STRIPE — small in-card "REGISTRATION CLOSES IN" line
// =============================================================
export function LiveClockStripe({
  targetIso,
  label,
}: {
  targetIso: string
  label: string
}) {
  return (
    <div className="flex items-center gap-2 border border-ember/30 bg-ember/5 px-3 py-1.5 bl-clip-chevron">
      <Clock className="h-3.5 w-3.5 text-ember" />
      <span className="font-display text-[10px] font-bold tracking-[0.2em] text-ember">
        {label}
      </span>
      <LiveCountdown targetIso={targetIso} compact variant="ember" />
    </div>
  )
}
