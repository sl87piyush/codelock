"use client"

import { useEffect, useState } from "react"
import { ChevronRight, Clock, Play, Users, FileText, ShieldCheck } from "lucide-react"
import { type Assessment, NOW_SEED, accentClasses, formatDuration } from "./oa-arena-data"

export function ActiveAssessmentBanner({
  assessment,
  onView,
}: {
  assessment: Assessment
  onView: (id: string) => void
}) {
  // Hydration-safe ticker
  const [now, setNow] = useState<number>(NOW_SEED)
  useEffect(() => {
    setNow(Date.now())
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [])

  const isLive = assessment.status === "LIVE"
  const startMs = new Date(assessment.startsAt).getTime()
  const endMs = new Date(assessment.endsAt).getTime()
  const targetMs = isLive ? endMs : startMs
  const diff = Math.max(0, targetMs - now)
  const total = isLive ? endMs - startMs : 0
  const elapsedPct = isLive && total > 0 ? Math.min(100, ((now - startMs) / total) * 100) : 0

  const dDay = Math.floor(diff / 86_400_000)
  const dHour = Math.floor((diff % 86_400_000) / 3_600_000)
  const dMin = Math.floor((diff % 3_600_000) / 60_000)
  const dSec = Math.floor((diff % 60_000) / 1_000)

  const accent = accentClasses(assessment.companyAccent)
  const headline = isLive ? "ASSESSMENT IN PROGRESS" : "STARTING SOON"
  const cta = isLive ? "RESUME TEST" : "ENTER WAITING ROOM"

  return (
    <section className="relative overflow-hidden border border-blood/40 bg-panel/70 bl-glass">
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-25" />
      <div className="pointer-events-none absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full bg-blood/15 blur-3xl" />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-blood/60 via-blood to-blood/60" />
      <div className="bl-corners" />

      <div className="relative grid gap-5 p-5 lg:grid-cols-[1.5fr_1fr] lg:p-6">
        {/* Left: meta */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 border border-blood/60 bg-blood/15 px-2.5 py-1 font-display text-[10px] font-bold tracking-[0.22em] text-blood bl-clip-chevron">
              <span className="h-1.5 w-1.5 rounded-full bg-blood bl-flicker shadow-[0_0_8px_#ff3344]" />
              {headline}
            </span>
            {assessment.proctored && (
              <span className="inline-flex items-center gap-1 border border-gold/50 bg-gold/10 px-2 py-0.5 font-display text-[10px] font-bold tracking-[0.18em] text-gold">
                <ShieldCheck className="h-3 w-3" /> PROCTORED
              </span>
            )}
            <span
              className={`inline-flex items-center gap-1 border ${accent.border} ${accent.bg} px-2 py-0.5 font-display text-[10px] font-bold tracking-[0.18em] ${accent.text}`}
            >
              {assessment.company.toUpperCase()}
            </span>
          </div>

          <div>
            <div className="font-mono text-[11px] tracking-[0.18em] text-text-mute">
              {assessment.id.toUpperCase()} · {assessment.role}
            </div>
            <h2 className="mt-1 font-display text-[26px] font-bold leading-tight tracking-tight text-text lg:text-[32px]">
              {assessment.company}{" "}
              <span className={accent.text}>{assessment.role}</span>
            </h2>
            <p className="mt-2 max-w-xl text-[13.5px] leading-relaxed text-text-dim">
              {assessment.description}
            </p>
          </div>

          {/* Progress bar (live only) */}
          {isLive && assessment.progress && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-display text-[10px] font-bold tracking-[0.22em] text-text-mute">
                  CURRENT · {assessment.progress.currentSection.toUpperCase()}
                </span>
                <span className="font-mono text-[11px] text-text">
                  {assessment.progress.answered}/{assessment.progress.total} answered ·{" "}
                  <span className="text-blood">{Math.round(elapsedPct)}% elapsed</span>
                </span>
              </div>
              <div className="h-1.5 overflow-hidden border border-line/60 bg-void/60">
                <div
                  className="h-full bg-blood bl-shimmer"
                  style={{ width: `${elapsedPct}%` }}
                />
              </div>
            </div>
          )}

          {/* Mini stats */}
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            <Mini icon={Clock} label="DURATION" value={formatDuration(assessment.duration)} />
            <Mini icon={FileText} label="QUESTIONS" value={`${assessment.questions}`} />
            <Mini icon={Users} label="REGISTERED" value={`${(assessment.registered / 1000).toFixed(1)}k`} />
            <Mini icon={ShieldCheck} label="PASS" value={`${assessment.passingScore}%`} />
          </div>
        </div>

        {/* Right: countdown + CTA */}
        <div className="relative flex flex-col gap-4">
          <div className="border border-line/60 bg-void/50 p-4 bl-clip-notch">
            <div className="font-display text-[10px] font-bold tracking-[0.28em] text-text-mute">
              {isLive ? "TIME REMAINING" : "TIME UNTIL START"}
            </div>
            <div className="mt-3 grid grid-cols-4 gap-2 text-center">
              <Stamp value={dDay} label="DAYS" />
              <Stamp value={dHour} label="HRS" />
              <Stamp value={dMin} label="MIN" />
              <Stamp value={dSec} label="SEC" pulse />
            </div>
          </div>

          <button
            type="button"
            onClick={() => onView(assessment.id)}
            className="group bl-btn-primary bl-pulse bl-clip-notch inline-flex h-12 items-center justify-center gap-2 px-5 font-display text-[12.5px] font-bold tracking-[0.18em]"
          >
            <Play className="h-4 w-4" />
            {cta}
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>

          <div className="flex items-center justify-between font-mono text-[10.5px] text-text-mute">
            <span>HOST · {assessment.hostedBy ?? assessment.company}</span>
            <span>ATTEMPT {assessment.attempts + 1}/{assessment.maxAttempts}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function Stamp({ value, label, pulse }: { value: number; label: string; pulse?: boolean }) {
  return (
    <div className="relative overflow-hidden border border-line/60 bg-panel/70 px-1 py-2">
      <div
        className={`font-display text-[26px] font-bold leading-none tabular-nums text-blood ${pulse ? "bl-flicker" : ""}`}
      >
        {String(value).padStart(2, "0")}
      </div>
      <div className="mt-1 font-display text-[8px] font-bold tracking-[0.22em] text-text-mute">
        {label}
      </div>
    </div>
  )
}

function Mini({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-2 border border-line/60 bg-void/40 px-2.5 py-2">
      <Icon className="h-3.5 w-3.5 text-text-mute" />
      <div className="min-w-0">
        <div className="font-display text-[8.5px] font-bold tracking-[0.22em] text-text-mute leading-none">
          {label}
        </div>
        <div className="mt-0.5 font-mono text-[12px] text-text leading-none">{value}</div>
      </div>
    </div>
  )
}
