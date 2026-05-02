"use client"

import { useEffect } from "react"
import {
  Award,
  Calendar,
  ChevronRight,
  Clock,
  Coins,
  FileText,
  Lock,
  Play,
  Share2,
  ShieldCheck,
  Users,
  X,
} from "lucide-react"
import {
  type Assessment,
  accentClasses,
  difficultyColor,
  formatDuration,
  formatRelative,
  statusColor,
} from "./oa-arena-data"

export function OaDetailDrawer({
  assessment,
  open,
  onClose,
}: {
  assessment: Assessment | null
  open: boolean
  onClose: () => void
}) {
  // Lock body scroll
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  // ESC to close
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onClose])

  if (!assessment) return null

  const accent = accentClasses(assessment.companyAccent)
  const status = statusColor(assessment.status)
  const diff = difficultyColor(assessment.difficulty)
  const isLocked = assessment.status === "LOCKED"
  const isLive = assessment.status === "LIVE"
  const isCompleted = assessment.status === "COMPLETED"

  const startDate = new Date(assessment.startsAt)
  const endDate = new Date(assessment.endsAt)
  const dateLabel = startDate.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  })
  const startTime = startDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "UTC",
  })
  const endTime = endDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "UTC",
  })

  return (
    <>
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close panel"
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-void/80 backdrop-blur-sm transition-opacity ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="oa-drawer-title"
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-2xl flex-col border-l border-line/60 bg-panel/95 backdrop-blur-xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="pointer-events-none absolute inset-0 bl-grid opacity-15" />

        {/* Header */}
        <header className="relative flex items-start justify-between gap-3 border-b border-line/40 px-5 py-4">
          <div className="flex items-start gap-3 min-w-0">
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center border ${accent.border} ${accent.bg} bl-clip-notch`}
            >
              <span className={`font-display text-[18px] font-bold ${accent.text}`}>
                {assessment.companyLogo}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 border ${status.border} ${status.bg} px-2 py-0.5 font-display text-[10px] font-bold tracking-[0.2em] ${status.text}`}
                >
                  {isLive && (
                    <span className="h-1.5 w-1.5 rounded-full bg-blood bl-flicker shadow-[0_0_8px_#ff3344]" />
                  )}
                  {status.label}
                </span>
                <span className="font-mono text-[10.5px] text-text-mute">
                  {assessment.id.toUpperCase()}
                </span>
              </div>
              <h2
                id="oa-drawer-title"
                className="mt-1 font-display text-[20px] font-bold leading-tight tracking-tight text-text"
              >
                {assessment.role}
              </h2>
              <div className={`font-display text-[11px] font-bold tracking-[0.22em] ${accent.text}`}>
                {assessment.company.toUpperCase()} · {assessment.tier}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 border border-line/60 bg-void/60 p-2 text-text-mute hover:text-text"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        {/* Body */}
        <div className="relative flex-1 overflow-y-auto">
          <div className="p-5 space-y-6">
            {/* Description */}
            <p className="text-[13.5px] leading-relaxed text-text">{assessment.description}</p>

            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Stat icon={Clock} label="DURATION" value={formatDuration(assessment.duration)} />
              <Stat icon={FileText} label="QUESTIONS" value={`${assessment.questions}`} />
              <Stat
                icon={Users}
                label="REGISTERED"
                value={`${(assessment.registered / 1000).toFixed(1)}k`}
              />
              <Stat icon={ShieldCheck} label="PASSING" value={`${assessment.passingScore}%`} />
            </div>

            {/* Result (if completed) */}
            {isCompleted && assessment.result && (
              <Section label="YOUR RESULT" accent="text-neon">
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="border border-line/60 bg-void/40 p-4 text-center">
                    <div className="font-display text-[10px] font-bold tracking-[0.22em] text-text-mute">
                      SCORE
                    </div>
                    <div
                      className={`mt-1 font-display text-[36px] font-bold leading-none ${
                        assessment.result.cleared ? "text-neon" : "text-ember"
                      }`}
                    >
                      {assessment.result.score}
                    </div>
                    <div className="mt-1 font-mono text-[10.5px] text-text-mute">/ 100</div>
                  </div>
                  <div className="border border-line/60 bg-void/40 p-4 text-center">
                    <div className="font-display text-[10px] font-bold tracking-[0.22em] text-text-mute">
                      PERCENTILE
                    </div>
                    <div className="mt-1 font-display text-[36px] font-bold leading-none text-electric">
                      {assessment.result.percentile}%
                    </div>
                    <div className="mt-1 font-mono text-[10.5px] text-text-mute">
                      Rank #{assessment.result.rank}
                    </div>
                  </div>
                  <div className="border border-line/60 bg-void/40 p-4 text-center">
                    <div className="font-display text-[10px] font-bold tracking-[0.22em] text-text-mute">
                      VERDICT
                    </div>
                    <div
                      className={`mt-1 font-display text-[20px] font-bold tracking-[0.18em] ${
                        assessment.result.cleared ? "text-neon" : "text-ember"
                      }`}
                    >
                      {assessment.result.cleared ? "CLEARED" : "MISSED"}
                    </div>
                    <div className="mt-1 font-mono text-[10.5px] text-text-mute">
                      {assessment.result.timeUsed}m used
                    </div>
                  </div>
                </div>

                {/* Section scores */}
                {assessment.result.sectionScores.length > 1 && (
                  <div className="mt-3 space-y-2">
                    {assessment.result.sectionScores.map((s) => (
                      <div key={s.name}>
                        <div className="flex items-center justify-between font-mono text-[11px] text-text-dim">
                          <span>{s.name}</span>
                          <span className="text-text">{s.score}/100</span>
                        </div>
                        <div className="mt-1 h-1.5 overflow-hidden border border-line/60 bg-void/60">
                          <div
                            className={`h-full ${
                              s.score >= assessment.passingScore ? "bg-neon" : "bg-ember"
                            }`}
                            style={{ width: `${s.score}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Section>
            )}

            {/* Schedule */}
            <Section label="SCHEDULE" accent="text-electric">
              <div className="grid gap-2">
                <Row
                  icon={Calendar}
                  label="Date"
                  value={`${dateLabel} · ${startTime}–${endTime} UTC`}
                  hint={formatRelative(assessment.startsAt)}
                />
                {assessment.windowEndsAt && (
                  <Row
                    icon={Clock}
                    label="Window closes"
                    value={new Date(assessment.windowEndsAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      timeZone: "UTC",
                    })}
                    hint={formatRelative(assessment.windowEndsAt)}
                  />
                )}
                <Row
                  icon={Award}
                  label="Attempts"
                  value={`${assessment.attempts} of ${assessment.maxAttempts} used`}
                />
              </div>
            </Section>

            {/* Sections */}
            <Section label="ASSESSMENT STRUCTURE" accent="text-text">
              <div className="overflow-hidden border border-line/60 bg-void/40">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-line/40 bg-panel/40">
                      <Th>Section</Th>
                      <Th>Type</Th>
                      <Th>Q</Th>
                      <Th>Time</Th>
                      <Th>Weight</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {assessment.sections.map((s) => (
                      <tr key={s.name} className="border-b border-line/30 last:border-0">
                        <td className="px-3 py-2 font-display text-[12px] font-bold text-text">
                          {s.name}
                        </td>
                        <td className="px-3 py-2 font-mono text-[11px] text-text-dim uppercase">
                          {s.type.replace("_", " ")}
                        </td>
                        <td className="px-3 py-2 font-mono text-[11px] text-text">{s.questions}</td>
                        <td className="px-3 py-2 font-mono text-[11px] text-text">
                          {formatDuration(s.duration)}
                        </td>
                        <td className="px-3 py-2 font-mono text-[11px] text-electric">
                          {Math.round(s.weight * 100)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>

            {/* Topics */}
            <Section label="TOPICS COVERED" accent="text-text">
              <div className="flex flex-wrap gap-1.5">
                {assessment.topics.map((t) => (
                  <span
                    key={t}
                    className="inline-flex h-7 items-center border border-line/60 bg-void/60 px-2.5 font-mono text-[10.5px] tracking-[0.04em] text-text-dim"
                  >
                    {t}
                  </span>
                ))}
                <span
                  className={`inline-flex h-7 items-center border ${diff.border} ${diff.bg} px-2.5 font-display text-[10px] font-bold tracking-[0.18em] ${diff.text}`}
                >
                  {assessment.difficulty}
                </span>
              </div>
            </Section>

            {/* Rewards */}
            {assessment.rewards && assessment.rewards.length > 0 && (
              <Section label="REWARDS" accent="text-gold">
                <div className="flex flex-wrap gap-2">
                  {assessment.rewards.map((r) => (
                    <span
                      key={r.label}
                      className="inline-flex items-center gap-1.5 border border-gold/40 bg-gold/10 px-2.5 py-1 font-display text-[11px] font-bold tracking-[0.18em] text-gold"
                    >
                      <Coins className="h-3.5 w-3.5" />
                      {r.label}
                    </span>
                  ))}
                </div>
              </Section>
            )}

            {/* Eligibility */}
            {assessment.prerequisites && assessment.prerequisites.length > 0 && (
              <Section label="ELIGIBILITY" accent={isLocked ? "text-gold" : "text-text"}>
                <ul className="space-y-1.5">
                  {assessment.prerequisites.map((p) => (
                    <li
                      key={p}
                      className={`flex items-center gap-2 font-mono text-[12px] ${
                        isLocked ? "text-gold" : "text-text-dim"
                      }`}
                    >
                      {isLocked ? (
                        <Lock className="h-3.5 w-3.5" />
                      ) : (
                        <ShieldCheck className="h-3.5 w-3.5 text-neon" />
                      )}
                      {p}
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            {/* Rules / proctoring */}
            <Section label="RULES" accent="text-text-mute">
              <ul className="grid gap-1.5 font-mono text-[12px] text-text-dim sm:grid-cols-2">
                <li>· No external resources or AI assistants</li>
                <li>· One submission per question · best score recorded</li>
                <li>· Tab-switching {assessment.proctored ? "tracked & flagged" : "discouraged"}</li>
                <li>· {assessment.proctored ? "Webcam + mic required" : "Unproctored"}</li>
                <li>· Auto-submit on timeout</li>
                <li>· {assessment.maxAttempts} {assessment.maxAttempts === 1 ? "attempt" : "attempts"} permitted</li>
              </ul>
            </Section>
          </div>
        </div>

        {/* Footer CTA */}
        <footer className="relative flex flex-col gap-2 border-t border-line/40 bg-void/30 p-4 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 border border-line/60 bg-panel/60 px-4 py-2.5 font-display text-[11px] font-bold tracking-[0.22em] text-text hover:border-neon/50 hover:text-neon transition-colors"
          >
            <Share2 className="h-3.5 w-3.5" /> SHARE
          </button>

          <button
            type="button"
            disabled={isLocked}
            className={
              isLocked
                ? "inline-flex items-center justify-center gap-2 border border-gold/40 bg-gold/5 px-5 py-2.5 font-display text-[11px] font-bold tracking-[0.22em] text-gold cursor-not-allowed bl-clip-notch"
                : isLive
                  ? "bl-btn-primary bl-pulse bl-clip-notch inline-flex items-center justify-center gap-2 bg-blood/20 border-blood/60 hover:bg-blood/30 px-5 py-2.5 font-display text-[11px] font-bold tracking-[0.22em] text-blood"
                  : isCompleted
                    ? "inline-flex items-center justify-center gap-2 border border-line/60 bg-panel/60 px-5 py-2.5 font-display text-[11px] font-bold tracking-[0.22em] text-text hover:border-neon/50 hover:text-neon transition-colors"
                    : "bl-btn-primary bl-pulse bl-clip-notch inline-flex items-center justify-center gap-2 px-5 py-2.5 font-display text-[11px] font-bold tracking-[0.22em]"
            }
          >
            {isLocked ? (
              <>
                <Lock className="h-3.5 w-3.5" /> ELIGIBILITY REQUIRED
              </>
            ) : isLive ? (
              <>
                <Play className="h-3.5 w-3.5" /> RESUME TEST
              </>
            ) : isCompleted ? (
              <>
                REVIEW SOLUTIONS <ChevronRight className="h-3.5 w-3.5" />
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5" /> START ASSESSMENT
                <ChevronRight className="h-3.5 w-3.5" />
              </>
            )}
          </button>
        </footer>
      </aside>
    </>
  )
}

function Section({
  label,
  accent,
  children,
}: {
  label: string
  accent: string
  children: React.ReactNode
}) {
  return (
    <section>
      <div className={`mb-2 inline-block border-l-2 border-current pl-2 font-display text-[10.5px] font-bold tracking-[0.24em] ${accent}`}>
        {label}
      </div>
      {children}
    </section>
  )
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div className="border border-line/60 bg-void/40 p-3">
      <div className="flex items-center gap-1.5 font-display text-[9.5px] font-bold tracking-[0.22em] text-text-mute">
        <Icon className="h-3 w-3" /> {label}
      </div>
      <div className="mt-1 font-display text-[16px] font-bold leading-none text-text">{value}</div>
    </div>
  )
}

function Row({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  hint?: string
}) {
  return (
    <div className="flex items-center gap-3 border border-line/60 bg-void/40 px-3 py-2.5">
      <Icon className="h-4 w-4 text-text-mute" />
      <div className="flex-1 min-w-0">
        <div className="font-display text-[9.5px] font-bold tracking-[0.22em] text-text-mute">
          {label.toUpperCase()}
        </div>
        <div className="mt-0.5 font-mono text-[12px] text-text">{value}</div>
      </div>
      {hint && (
        <span className="font-mono text-[10.5px] text-electric">{hint}</span>
      )}
    </div>
  )
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th
      scope="col"
      className="px-3 py-2 text-left font-display text-[9.5px] font-bold uppercase tracking-[0.22em] text-text-mute"
    >
      {children}
    </th>
  )
}
