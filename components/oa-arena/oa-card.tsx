"use client"

import { Calendar, ChevronRight, Clock, Coins, FileText, Lock, Play, ShieldCheck, Users } from "lucide-react"
import {
  type Assessment,
  accentClasses,
  difficultyColor,
  formatDuration,
  formatRelative,
  statusColor,
} from "./oa-arena-data"

export function OaCard({
  assessment,
  onView,
}: {
  assessment: Assessment
  onView: (id: string) => void
}) {
  const accent = accentClasses(assessment.companyAccent)
  const status = statusColor(assessment.status)
  const diff = difficultyColor(assessment.difficulty)
  const isLive = assessment.status === "LIVE"
  const isLocked = assessment.status === "LOCKED"
  const isCompleted = assessment.status === "COMPLETED"
  const isAvailable = assessment.status === "AVAILABLE"
  const isScheduled = assessment.status === "SCHEDULED"

  const startDate = new Date(assessment.startsAt)
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

  return (
    <article
      className="group relative flex flex-col overflow-hidden border border-line/60 bg-panel/60 bl-glass transition-colors hover:border-neon/50"
      aria-labelledby={`oa-${assessment.id}-title`}
    >
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-20" />

      {/* Top bar: status */}
      <div className={`relative flex items-center justify-between border-b border-line/40 px-4 py-2 ${status.bg}`}>
        <span className={`inline-flex items-center gap-1.5 font-display text-[10px] font-bold tracking-[0.22em] ${status.text}`}>
          {isLive && <span className="h-1.5 w-1.5 rounded-full bg-blood bl-flicker shadow-[0_0_8px_#ff3344]" />}
          {status.label}
        </span>
        <span className="font-mono text-[10px] tracking-[0.16em] text-text-mute">
          {assessment.id.toUpperCase()}
        </span>
      </div>

      {/* Header */}
      <div className="relative flex items-start gap-3 p-4">
        {/* Logo */}
        <div
          className={`relative flex h-11 w-11 shrink-0 items-center justify-center border ${accent.border} ${accent.bg} bl-clip-notch`}
        >
          <span className={`font-display text-[18px] font-bold ${accent.text}`}>
            {assessment.companyLogo}
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center font-display text-[10px] font-bold tracking-[0.18em] ${accent.text}`}
            >
              {assessment.company.toUpperCase()}
            </span>
            <span className="font-mono text-[10px] text-text-mute">·</span>
            <span className="font-mono text-[10px] text-text-mute uppercase">
              {assessment.tier}
            </span>
          </div>
          <h3
            id={`oa-${assessment.id}-title`}
            className="mt-0.5 truncate font-display text-[15px] font-bold tracking-tight text-text"
          >
            {assessment.role}
          </h3>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px]">
            <span className={`inline-flex items-center border ${diff.border} ${diff.bg} px-1.5 py-0.5 font-display text-[9.5px] font-bold tracking-[0.18em] ${diff.text}`}>
              {assessment.difficulty}
            </span>
            <span className="font-mono text-text-mute">·</span>
            <span className="font-mono text-text-dim uppercase">
              {assessment.type.replace("_", " ")}
            </span>
            {assessment.proctored && (
              <>
                <span className="font-mono text-text-mute">·</span>
                <span className="inline-flex items-center gap-1 font-mono text-[10.5px] text-gold">
                  <ShieldCheck className="h-3 w-3" /> PROCTORED
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="relative flex flex-1 flex-col gap-3 px-4 pb-4">
        <p className="line-clamp-2 text-[12.5px] leading-relaxed text-text-dim">
          {assessment.description}
        </p>

        {/* Topics */}
        {assessment.topics.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {assessment.topics.slice(0, 4).map((t) => (
              <span
                key={t}
                className="inline-flex h-5 items-center border border-line/60 bg-void/60 px-1.5 font-mono text-[9.5px] tracking-[0.06em] text-text-dim"
              >
                {t}
              </span>
            ))}
            {assessment.topics.length > 4 && (
              <span className="inline-flex h-5 items-center px-1.5 font-mono text-[9.5px] text-text-mute">
                +{assessment.topics.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Stats grid */}
        <div className="grid grid-cols-4 gap-2 border-y border-line/40 py-2.5">
          <Mini icon={Clock} label={formatDuration(assessment.duration)} />
          <Mini icon={FileText} label={`${assessment.questions} Q`} />
          <Mini
            icon={Users}
            label={`${assessment.registered >= 1000 ? `${(assessment.registered / 1000).toFixed(1)}k` : assessment.registered}`}
          />
          <Mini icon={ShieldCheck} label={`${assessment.passingScore}%`} />
        </div>

        {/* Status-specific content */}
        {isLive && assessment.progress && (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-display text-[9.5px] font-bold tracking-[0.22em] text-blood">
                {assessment.progress.currentSection.toUpperCase()} ·{" "}
                {assessment.progress.answered}/{assessment.progress.total}
              </span>
              <span className="font-mono text-[10.5px] text-blood">
                {formatDuration(assessment.progress.timeRemaining)} left
              </span>
            </div>
            <div className="h-1 overflow-hidden border border-line/60 bg-void/60">
              <div
                className="h-full bg-blood bl-shimmer"
                style={{
                  width: `${(assessment.progress.answered / assessment.progress.total) * 100}%`,
                }}
              />
            </div>
          </div>
        )}

        {isCompleted && assessment.result && (
          <div className="flex items-center justify-between border border-line/60 bg-void/40 px-3 py-2">
            <div className="flex items-center gap-3">
              <div
                className={`font-display text-[22px] font-bold leading-none ${
                  assessment.result.cleared ? "text-neon" : "text-ember"
                }`}
              >
                {assessment.result.score}
              </div>
              <div className="border-l border-line/60 pl-3">
                <div className="font-display text-[9px] font-bold tracking-[0.22em] text-text-mute">
                  PERCENTILE
                </div>
                <div className="font-mono text-[12.5px] text-text">
                  {assessment.result.percentile}%
                </div>
              </div>
            </div>
            <span
              className={`font-display text-[10px] font-bold tracking-[0.22em] ${
                assessment.result.cleared ? "text-neon" : "text-ember"
              }`}
            >
              {assessment.result.cleared ? "CLEARED" : "MISSED CUT"}
            </span>
          </div>
        )}

        {(isScheduled || isAvailable) && (
          <div className="flex items-center justify-between font-mono text-[11px] text-text-dim">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-text-mute" />
              {dateLabel} · {timeLabel} UTC
            </span>
            <span className={status.text}>{formatRelative(assessment.startsAt)}</span>
          </div>
        )}

        {assessment.rewards && assessment.rewards.length > 0 && !isCompleted && (
          <div className="flex flex-wrap items-center gap-1.5">
            <Coins className="h-3.5 w-3.5 text-gold" />
            {assessment.rewards.map((r) => (
              <span
                key={r.label}
                className="inline-flex items-center border border-gold/40 bg-gold/10 px-1.5 py-0.5 font-display text-[9.5px] font-bold tracking-[0.18em] text-gold"
              >
                {r.label}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="relative border-t border-line/40 p-3">
        <button
          type="button"
          onClick={() => onView(assessment.id)}
          disabled={isLocked}
          className={
            isLocked
              ? "inline-flex w-full items-center justify-center gap-2 border border-gold/40 bg-gold/5 px-4 py-2.5 font-display text-[11px] font-bold tracking-[0.2em] text-gold cursor-not-allowed"
              : isLive
                ? "bl-btn-primary inline-flex w-full items-center justify-center gap-2 bg-blood/20 border border-blood/60 hover:bg-blood/30 px-4 py-2.5 font-display text-[11px] font-bold tracking-[0.2em] text-blood"
                : isCompleted
                  ? "inline-flex w-full items-center justify-center gap-2 border border-line/60 bg-void/60 px-4 py-2.5 font-display text-[11px] font-bold tracking-[0.2em] text-text hover:border-neon/50 hover:text-neon transition-colors"
                  : "bl-btn-primary inline-flex w-full items-center justify-center gap-2 px-4 py-2.5 font-display text-[11px] font-bold tracking-[0.2em]"
          }
          aria-label={
            isLocked
              ? "Locked — eligibility required"
              : isLive
                ? `Resume ${assessment.role}`
                : isCompleted
                  ? `View results for ${assessment.role}`
                  : `Start ${assessment.role}`
          }
        >
          {isLocked ? (
            <>
              <Lock className="h-3.5 w-3.5" /> ELIGIBILITY REQUIRED
            </>
          ) : isLive ? (
            <>
              <Play className="h-3.5 w-3.5" /> RESUME TEST
              <ChevronRight className="h-3.5 w-3.5" />
            </>
          ) : isCompleted ? (
            <>
              VIEW RESULT <ChevronRight className="h-3.5 w-3.5" />
            </>
          ) : isScheduled ? (
            <>
              VIEW DETAILS <ChevronRight className="h-3.5 w-3.5" />
            </>
          ) : (
            <>
              <Play className="h-3.5 w-3.5" /> START NOW
              <ChevronRight className="h-3.5 w-3.5" />
            </>
          )}
        </button>
      </div>
    </article>
  )
}

function Mini({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
}) {
  return (
    <div className="flex items-center gap-1 font-mono text-[10.5px] text-text-dim">
      <Icon className="h-3 w-3 text-text-mute" />
      <span className="truncate">{label}</span>
    </div>
  )
}
