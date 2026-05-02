"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { CheckCircle2, Loader2, ArrowRight, Map, Trophy, Clock, Languages, Code2 } from "lucide-react"
import { buildJourney, getMentor, type PersonalJourney } from "@/lib/mentor-data"
import { useOnboarding } from "@/lib/use-onboarding"
import { PortalTransition } from "@/components/mentor/portal-transition"
import { cn } from "@/lib/utils"

const PHASES = [
  "Analyzing your profile…",
  "Building your first mission…",
  "Connecting you with your mentor…",
  "Entering the Arena…",
]

export default function OnboardingGeneratingPage() {
  const router = useRouter()
  const { state, setJourney, completeOnboarding } = useOnboarding()
  const mentor = getMentor(state.mentorId)
  const accent = mentor.accent.hex
  const secondary = mentor.id === "rex" ? "#00f0ff" : "#ff6b1a"

  const [phase, setPhase] = useState(0)
  const [showJourney, setShowJourney] = useState(false)
  const [portalOpen, setPortalOpen] = useState(false)

  // Compute the journey synchronously but reveal it gradually for drama.
  const journey = useMemo<PersonalJourney>(
    () => buildJourney(mentor.id, state.answers ?? {}),
    [mentor.id, state.answers],
  )

  // Persist the journey on first render so refresh-mid-generation doesn't lose it.
  useEffect(() => {
    setJourney(journey)
  }, [journey, setJourney])

  // Guard: must have a mentor.
  useEffect(() => {
    if (!state.mentorId && typeof window !== "undefined") {
      router.replace("/onboarding/mentor")
    }
  }, [state.mentorId, router])

  // Phase ticker: 4 lines, then reveal journey.
  useEffect(() => {
    if (phase >= PHASES.length) {
      const t = setTimeout(() => setShowJourney(true), 250)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setPhase((p) => p + 1), 950)
    return () => clearTimeout(t)
  }, [phase])

  const enterArena = () => {
    setPortalOpen(true)
  }

  const finalize = () => {
    completeOnboarding(journey)
    router.push("/")
  }

  return (
    <section className="relative mx-auto max-w-3xl px-6 pt-2 pb-24">
      {!showJourney ? (
        <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
          {/* Mentor portrait pulsing */}
          <div className="relative mb-8">
            <div
              aria-hidden
              className="absolute inset-0 -m-6 rounded-full"
              style={{
                background: `radial-gradient(circle at 50% 50%, ${accent}55, transparent 65%)`,
                animation: "ctx-pulse 2.4s ease-in-out infinite",
              }}
            />
            <div
              className="relative h-28 w-28 overflow-hidden rounded-xl border-2 bl-clip-notch"
              style={{ borderColor: `${accent}cc`, boxShadow: `0 0 30px ${accent}66` }}
            >
              <Image src={mentor.avatar} alt={mentor.name} fill sizes="112px" className="object-cover" />
            </div>
            <div
              aria-hidden
              className="absolute inset-0 -m-3 rounded-xl border"
              style={{
                borderColor: `${accent}55`,
                animation: "ctx-ring-spin 8s linear infinite",
              }}
            />
          </div>

          <p className="font-mono text-[11px] tracking-[0.32em] text-text-mute">
            {mentor.name.toUpperCase()} IS PROFILING YOU
          </p>

          <ul className="mt-6 w-full max-w-sm space-y-3 text-left">
            {PHASES.map((line, i) => {
              const done = i < phase
              const active = i === phase
              return (
                <li
                  key={line}
                  className="flex items-center gap-3 rounded-md border border-line bg-panel/60 px-3 py-2.5 backdrop-blur-sm transition-colors"
                  style={
                    active ? { borderColor: `${accent}66`, boxShadow: `0 0 14px ${accent}33` } : undefined
                  }
                >
                  {done ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: accent }} />
                  ) : active ? (
                    <Loader2 className="h-4 w-4 shrink-0 animate-spin" style={{ color: accent }} />
                  ) : (
                    <span className="h-4 w-4 shrink-0 rounded-full border border-line" />
                  )}
                  <span
                    className={cn(
                      "font-mono text-[12px] tracking-wide",
                      done ? "text-text" : active ? "text-text" : "text-text-mute",
                    )}
                  >
                    {line}
                  </span>
                </li>
              )
            })}
          </ul>

          <style jsx>{`
            @keyframes ctx-pulse {
              0%, 100% { transform: scale(1); opacity: 0.9; }
              50% { transform: scale(1.08); opacity: 1; }
            }
            @keyframes ctx-ring-spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      ) : (
        <div className="animate-[ctx-fade_500ms_ease-out]">
          {/* Header */}
          <div className="text-center">
            <span
              className="inline-flex items-center gap-1.5 rounded-sm border bg-panel-2/70 px-2.5 py-1 font-mono text-[10px] tracking-[0.22em] backdrop-blur-sm"
              style={{ borderColor: `${accent}55`, color: accent }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent, boxShadow: `0 0 8px ${accent}` }} />
              JOURNEY GENERATED
            </span>
            <h1 className="mt-4 font-display text-3xl sm:text-4xl font-bold tracking-tight text-text text-balance">
              Your <span style={{ color: accent }}>{journey.pathName}</span> is locked in
            </h1>
            <p className="mx-auto mt-2 max-w-xl text-sm text-text-dim">
              {journey.pathSummary}
            </p>
          </div>

          {/* Stat row */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatTile icon={<Trophy className="h-3.5 w-3.5" />} label="GOAL" value={journey.goalLabel} accent={accent} />
            <StatTile icon={<Clock className="h-3.5 w-3.5" />} label="DAILY" value={`${journey.dailyMinutes} min`} accent={accent} />
            <StatTile icon={<Code2 className="h-3.5 w-3.5" />} label="LANGUAGE" value={journey.stack} accent={accent} />
            <StatTile icon={<Languages className="h-3.5 w-3.5" />} label="GUIDANCE" value={journey.language} accent={accent} />
          </div>

          {/* First mission */}
          <div
            className="relative mt-6 overflow-hidden rounded-xl border bg-panel/70 p-5 backdrop-blur-sm"
            style={{ borderColor: `${accent}66`, boxShadow: `0 0 0 1px ${accent}22, 0 22px 50px -25px ${accent}66` }}
          >
            <div className="pointer-events-none absolute inset-0 bl-grid opacity-20" />
            <div
              aria-hidden
              className="pointer-events-none absolute -top-12 -right-12 h-40 w-40 rounded-full blur-3xl"
              style={{ background: `${accent}33` }}
            />
            <div className="relative flex items-start justify-between gap-4">
              <div>
                <span className="font-mono text-[10px] tracking-[0.22em]" style={{ color: accent }}>
                  {journey.firstMission.code}
                </span>
                <h2 className="mt-1 font-display text-xl font-bold tracking-tight text-text">
                  {journey.firstMission.title}
                </h2>
              </div>
              <span
                className="shrink-0 rounded-md border px-2.5 py-1 font-display text-[11px] font-bold tracking-[0.18em]"
                style={{ borderColor: `${accent}66`, color: accent, background: `${accent}10` }}
              >
                +{journey.firstMission.xp} XP
              </span>
            </div>
            <p className="relative mt-2 text-sm text-text-dim">{journey.firstMission.summary}</p>

            <ul className="relative mt-4 space-y-2">
              {journey.firstMission.tasks.map((t, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 rounded-md border border-line bg-void/40 px-3 py-2 text-[13px] text-text"
                >
                  <span
                    className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-sm font-mono text-[9px] font-bold"
                    style={{ background: `${accent}22`, color: accent, border: `1px solid ${accent}55` }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Weekly topic strip */}
          <div className="mt-6">
            <div className="mb-2 flex items-center gap-2">
              <Map className="h-3.5 w-3.5 text-text-mute" />
              <span className="font-mono text-[10px] tracking-[0.22em] text-text-mute">
                7-DAY TOPIC PATH
              </span>
              <div className="h-px flex-1 bg-line" />
            </div>
            <ol className="grid grid-cols-2 sm:grid-cols-7 gap-1.5">
              {journey.weeklyTopics.map((t, i) => (
                <li
                  key={t}
                  className="rounded-md border border-line bg-panel/50 px-2.5 py-2 backdrop-blur-sm"
                >
                  <div className="font-mono text-[9px] tracking-[0.22em] text-text-mute">
                    DAY {i + 1}
                  </div>
                  <div className="mt-0.5 text-[12px] font-medium text-text leading-snug">{t}</div>
                </li>
              ))}
            </ol>
          </div>

          {/* CTA */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={enterArena}
              className="inline-flex items-center gap-2 px-7 py-3 font-display text-[12px] font-bold tracking-[0.24em] bl-clip-chevron transition-all"
              style={{
                background: accent,
                color: "#001018",
                boxShadow: `0 0 30px ${accent}88`,
              }}
            >
              ENTER THE ARENA
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => router.push("/onboarding/questions")}
              className="font-mono text-[11px] tracking-[0.18em] text-text-mute hover:text-text-dim transition-colors"
            >
              Adjust answers
            </button>
          </div>
          <style jsx>{`
            @keyframes ctx-fade {
              from { opacity: 0; transform: translateY(8px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </div>
      )}

      <PortalTransition
        open={portalOpen}
        accentHex={accent}
        secondaryHex={secondary}
        caption="Entering CodeTrackX Arena"
        duration={2400}
        onComplete={finalize}
      />
    </section>
  )
}

function StatTile({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode
  label: string
  value: string
  accent: string
}) {
  return (
    <div
      className="rounded-lg border bg-panel/60 p-3 backdrop-blur-sm"
      style={{ borderColor: `${accent}33` }}
    >
      <div className="flex items-center gap-1.5 font-mono text-[9px] tracking-[0.22em] text-text-mute">
        <span style={{ color: accent }}>{icon}</span>
        {label}
      </div>
      <div className="mt-1.5 text-[14px] font-bold text-text leading-tight">{value}</div>
    </div>
  )
}
