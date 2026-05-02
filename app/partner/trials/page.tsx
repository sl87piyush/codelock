"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  Trophy,
  Clock,
  Lock,
  Play,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { TopBar } from "@/components/dashboard/top-bar"
import {
  GlassPanel,
  Chip,
  StatTile,
} from "@/components/partner/partner-atoms"
import { TRIALS, type TrialFormat } from "@/components/partner/partner-data"
import { cn } from "@/lib/utils"

type Phase = "select" | "ready" | "running" | "locked"

export default function TrialsPage() {
  const [selected, setSelected] = useState<TrialFormat>("A")
  const [phase, setPhase] = useState<Phase>("select")
  const [secondsLeft, setSecondsLeft] = useState(0)

  const trial = TRIALS.find((t) => t.format === selected)!

  useEffect(() => {
    if (phase !== "running") return
    const i = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(i)
          setPhase("locked")
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(i)
  }, [phase])

  const startTrial = () => {
    setSecondsLeft(trial.durationMin * 60)
    setPhase("running")
  }

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`
  }

  return (
    <div className="flex min-h-screen w-full bg-void text-text">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar title="Selection Trials" sector="012_TRIAL_ROOM" />

        <main className="relative flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
            <div className="absolute -top-32 left-1/3 h-[400px] w-[700px] bg-ember/8 blur-3xl rounded-full" />
            <div className="absolute bottom-0 right-0 h-[300px] w-[500px] bg-electric/10 blur-3xl rounded-full" />
          </div>

          <div className="relative mx-auto max-w-[1280px] space-y-6">
            <Link
              href="/partner"
              className="inline-flex items-center gap-1.5 font-display text-[11px] font-bold tracking-[0.2em] text-text-dim hover:text-neon"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              BACK TO PROGRAM
            </Link>

            {/* Header */}
            <GlassPanel className="p-6" notch corners>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-12 w-12 items-center justify-center border border-ember/50 bg-ember/10 bl-clip-notch">
                    <Trophy className="h-6 w-6 text-ember" />
                  </span>
                  <div>
                    <div className="font-mono text-[10px] tracking-[0.3em] text-ember/80 uppercase">
                      // WEEKLY_SELECTION_TRIAL
                    </div>
                    <h2 className="mt-0.5 font-display text-2xl font-bold tracking-tight">
                      Choose your format. Lock in.
                    </h2>
                    <p className="mt-1 max-w-2xl text-sm text-text-dim leading-relaxed">
                      One trial per week. Timed. No retries. Submission auto-locks
                      when the clock hits zero.
                    </p>
                  </div>
                </div>
                <Chip accent="ember">SUNDAY 8:00 PM IST</Chip>
              </div>
            </GlassPanel>

            {/* Format select */}
            {(phase === "select" || phase === "ready") && (
              <>
                <div className="grid gap-4 md:grid-cols-3">
                  {TRIALS.map((t) => (
                    <FormatCard
                      key={t.id}
                      format={t.format}
                      title={t.title}
                      blurb={t.blurb}
                      durationMin={t.durationMin}
                      problemCount={t.problemCount}
                      topicHint={t.topicHint}
                      selected={selected === t.format}
                      onSelect={() => {
                        setSelected(t.format)
                        setPhase("ready")
                      }}
                    />
                  ))}
                </div>

                {phase === "ready" && (
                  <GlassPanel className="p-6 bl-side-stripe-ember">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <div className="font-mono text-[10px] tracking-[0.3em] text-ember/80 uppercase">
                          // READY_TO_START · TRIAL {selected}
                        </div>
                        <h3 className="mt-1 font-display text-xl font-bold tracking-tight">
                          {trial.title} · {trial.durationMin} min · {trial.problemCount} problems
                        </h3>
                        <p className="mt-1 text-sm text-text-dim">
                          Once you start, the clock cannot be paused. Submissions
                          lock at 00:00.
                        </p>
                      </div>
                      <button
                        onClick={startTrial}
                        className="bl-btn-primary px-5 py-3 text-sm bl-clip-notch"
                      >
                        <Play className="h-4 w-4" />
                        Start Trial
                      </button>
                    </div>
                  </GlassPanel>
                )}
              </>
            )}

            {/* Trial running room */}
            {phase === "running" && (
              <GlassPanel className="relative overflow-hidden p-6 sm:p-8" notch>
                <div className="pointer-events-none absolute inset-0 bl-grid opacity-30" />
                <div className="pointer-events-none absolute inset-0 bl-scanline opacity-50" />

                <div className="relative grid gap-6 lg:grid-cols-[1fr_320px]">
                  <div className="space-y-5">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line/60 pb-4">
                      <div>
                        <div className="font-mono text-[10px] tracking-[0.3em] text-neon/80 uppercase">
                          // TRIAL_IN_SESSION
                        </div>
                        <h3 className="mt-1 font-display text-xl font-bold tracking-tight">
                          {trial.title}
                        </h3>
                      </div>
                      <Chip accent="ember">{trial.problemCount} PROBLEMS</Chip>
                    </div>

                    {/* Mock problem placeholders */}
                    <div className="space-y-3">
                      {Array.from({ length: trial.problemCount }).map((_, i) => (
                        <ProblemRow key={i} index={i + 1} />
                      ))}
                    </div>
                  </div>

                  {/* Timer */}
                  <aside className="space-y-4">
                    <div className="border border-ember/50 bg-ember/8 p-5 text-center">
                      <div className="font-mono text-[10px] tracking-[0.3em] text-ember/80">
                        // TIME_REMAINING
                      </div>
                      <div className="mt-3 font-mono text-5xl font-bold tabular-nums text-ember bl-count-flicker">
                        {formatTime(secondsLeft)}
                      </div>
                      <div className="mt-2 font-display text-[10px] font-bold tracking-[0.22em] text-ember/80">
                        SUBMISSIONS LOCK AT 00:00
                      </div>
                    </div>

                    <div className="border border-line/70 bg-panel/40 p-4 space-y-2">
                      <div className="flex items-center gap-2 text-text-dim">
                        <AlertTriangle className="h-3.5 w-3.5 text-ember" />
                        <span className="font-mono text-[11px]">
                          No tab-switching. No external sources.
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-text-dim">
                        <CheckCircle2 className="h-3.5 w-3.5 text-neon" />
                        <span className="font-mono text-[11px]">
                          Code, test, submit. Each problem locks on submit.
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => setPhase("locked")}
                      className="bl-btn-ghost bl-clip-notch w-full"
                    >
                      <Lock className="h-3.5 w-3.5" />
                      End &amp; Lock Submissions
                    </button>
                  </aside>
                </div>
              </GlassPanel>
            )}

            {/* Locked / submitted */}
            {phase === "locked" && (
              <GlassPanel className="p-8 text-center" notch>
                <Lock className="mx-auto h-10 w-10 text-neon" />
                <h3 className="mt-4 font-display text-2xl font-bold tracking-tight">
                  Submissions locked.
                </h3>
                <p className="mt-2 text-sm text-text-dim max-w-lg mx-auto">
                  Your trial has been recorded. The Training Report is being
                  generated now — based on your time-lost, wrong-attempt patterns,
                  and topic gaps.
                </p>

                <div className="mt-6 grid grid-cols-3 gap-3 max-w-md mx-auto">
                  <StatTile label="FORMAT" value={`Trial ${selected}`} />
                  <StatTile label="DURATION" value={`${trial.durationMin}m`} />
                  <StatTile label="PROBLEMS" value={trial.problemCount} accent="ember" />
                </div>

                <div className="mt-6 flex justify-center gap-3">
                  <button
                    onClick={() => setPhase("select")}
                    className="bl-btn-ghost bl-clip-notch"
                  >
                    Run Another Trial
                  </button>
                  <Link
                    href="/partner/report/c_001"
                    className="bl-btn-primary px-5 py-3 text-sm bl-clip-notch"
                  >
                    View Training Report
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </GlassPanel>
            )}

            {/* Tips footer */}
            <GlassPanel className="p-5">
              <div className="font-mono text-[10px] tracking-[0.3em] text-text-mute uppercase">
                // SELECTION_RULES
              </div>
              <div className="mt-3 grid gap-3 sm:grid-cols-3 text-sm text-text-dim">
                <Rule n="01" body="One trial per week. No re-attempts." />
                <Rule n="02" body="Score is auto-graded against your partner's." />
                <Rule n="03" body="Failing 2 trials in a row triggers Recovery Mode." />
              </div>
            </GlassPanel>
          </div>
        </main>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------

function FormatCard({
  format,
  title,
  blurb,
  durationMin,
  problemCount,
  topicHint,
  selected,
  onSelect,
}: {
  format: TrialFormat
  title: string
  blurb: string
  durationMin: number
  problemCount: number
  topicHint?: string
  selected: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "relative bl-glass bl-clip-notch p-5 text-left transition-all",
        selected
          ? "border-neon/70 shadow-[0_0_30px_rgba(0,240,255,0.25)] -translate-y-0.5"
          : "hover:-translate-y-0.5",
      )}
      aria-pressed={selected}
    >
      <div className="flex items-center justify-between">
        <span className="font-display text-[10px] font-bold tracking-[0.3em] text-neon/80">
          TRIAL · {format}
        </span>
        {selected && (
          <Chip size="sm" accent="neon" active>
            SELECTED
          </Chip>
        )}
      </div>
      <h3 className="mt-3 font-display text-lg font-bold tracking-tight">
        {title}
      </h3>
      <p className="mt-1.5 text-[13px] text-text-dim leading-relaxed">{blurb}</p>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <Spec icon={Clock} label="Duration" value={`${durationMin} min`} />
        <Spec icon={Trophy} label="Problems" value={problemCount.toString()} />
      </div>

      {topicHint && (
        <div className="mt-3 border border-ember/30 bg-ember/5 px-3 py-1.5 font-mono text-[11px] text-ember">
          {topicHint}
        </div>
      )}
    </button>
  )
}

function Spec({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-2 border border-line/70 bg-panel/40 px-2.5 py-2">
      <Icon className="h-3.5 w-3.5 text-neon" />
      <div>
        <div className="font-display text-[9px] font-bold tracking-[0.22em] text-text-mute">
          {label}
        </div>
        <div className="font-display text-sm font-bold text-text">{value}</div>
      </div>
    </div>
  )
}

function ProblemRow({ index }: { index: number }) {
  return (
    <div className="border border-line/70 bg-panel/40 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] tracking-widest text-neon/70">
            P{String(index).padStart(2, "0")}
          </span>
          <h4 className="font-display text-sm font-bold tracking-tight">
            Problem {index} — Locked Sample
          </h4>
        </div>
        <Chip size="sm">MEDIUM</Chip>
      </div>
      <p className="mt-2 font-mono text-[11px] text-text-dim leading-relaxed">
        Problem statement is hidden until trial begins. This is a placeholder for the trial room shell.
      </p>
      <div className="mt-3 flex items-center gap-2">
        <button className="bl-btn-ghost bl-clip-notch text-[10px] py-1.5 px-3" disabled>
          Open Editor
        </button>
        <button className="bl-btn-ghost bl-clip-notch text-[10px] py-1.5 px-3" disabled>
          Submit
        </button>
      </div>
    </div>
  )
}

function Rule({ n, body }: { n: string; body: string }) {
  return (
    <div className="flex items-start gap-3 border border-line/70 bg-panel/40 px-3 py-2.5">
      <span className="font-mono text-[10px] tracking-widest text-neon/70 mt-0.5">
        {n}
      </span>
      <span className="text-[13px] leading-relaxed">{body}</span>
    </div>
  )
}
