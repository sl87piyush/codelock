"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  RotateCcw,
  Replace,
  Sparkles,
  Target,
  AlertTriangle,
  TrendingUp,
  Lightbulb,
} from "lucide-react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { TopBar } from "@/components/dashboard/top-bar"
import { MENTORS, getMentor, buildJourney, type MentorId } from "@/lib/mentor-data"
import { useOnboarding } from "@/lib/use-onboarding"
import { MentorChatPanel } from "@/components/mentor/mentor-chat-panel"
import { cn } from "@/lib/utils"

export default function MentorChamberPage() {
  const { state, status, changeMentor, setJourney } = useOnboarding()
  const [showSwitch, setShowSwitch] = useState(false)

  // Returning users with no mentor: nudge to onboarding.
  if (status === "first" || !state.mentorId) {
    return (
      <div className="flex min-h-screen w-full bg-void">
        <Sidebar />
        <div className="relative flex-1 flex flex-col min-w-0">
          <TopBar />
          <main className="relative flex-1 p-8 flex items-center justify-center">
            <div className="max-w-md text-center">
              <Sparkles className="mx-auto h-8 w-8 text-neon" />
              <h1 className="mt-4 font-display text-2xl font-bold text-text">
                Mentor Chamber locked
              </h1>
              <p className="mt-2 text-sm text-text-dim">
                Run the onboarding protocol to summon your first AI mentor.
              </p>
              <Link
                href="/onboarding/intro"
                className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 font-display text-[12px] font-bold tracking-[0.22em] bl-clip-chevron bg-neon text-void"
              >
                BEGIN ONBOARDING
              </Link>
            </div>
          </main>
        </div>
      </div>
    )
  }

  const mentor = getMentor(state.mentorId)
  const accent = mentor.accent.hex
  const journey = state.journey

  const handleChangeMentor = (id: MentorId) => {
    changeMentor(id)
    setShowSwitch(false)
  }

  const regenerate = () => {
    if (!journey) return
    const fresh = buildJourney(state.mentorId!, state.answers ?? {})
    setJourney(fresh)
  }

  return (
    <div className="flex min-h-screen w-full bg-void">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 h-[420px] w-[1200px] blur-3xl rounded-full"
          style={{ background: `${accent}22` }}
        />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] bg-electric/10 blur-3xl rounded-full" />
      </div>

      <Sidebar />

      <div className="relative flex-1 flex flex-col min-w-0">
        <TopBar />

        <main className="relative flex-1 p-6 lg:p-8">
          <span aria-hidden className="pointer-events-none absolute top-2 left-2 h-4 w-4 border-t border-l border-neon/40" />
          <span aria-hidden className="pointer-events-none absolute top-2 right-2 h-4 w-4 border-t border-r border-neon/40" />

          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.22em] text-text-mute hover:text-neon transition-colors"
              >
                <ArrowLeft className="h-3 w-3" />
                BACK TO DASHBOARD
              </Link>
              <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-text">
                Mentor <span style={{ color: accent }}>Chamber</span>
              </h1>
              <p className="mt-1 text-sm text-text-dim">
                Your living briefing room. Chat, view your plan, and re-tune your journey.
              </p>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowSwitch((v) => !v)}
                className="inline-flex items-center gap-1.5 rounded-md border border-line bg-panel-2 px-3 py-2 font-display text-[11px] font-bold tracking-[0.18em] text-text-dim transition-colors hover:border-line-bright hover:text-text"
              >
                <Replace className="h-3.5 w-3.5" />
                CHANGE MENTOR
              </button>
              <button
                type="button"
                onClick={regenerate}
                className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 font-display text-[11px] font-bold tracking-[0.18em]"
                style={{
                  background: `${accent}1a`,
                  border: `1px solid ${accent}55`,
                  color: accent,
                }}
              >
                <RotateCcw className="h-3.5 w-3.5" />
                REGENERATE PLAN
              </button>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {/* Mentor profile + chat (left, 7) */}
            <div className="col-span-12 xl:col-span-7 flex flex-col gap-6">
              <ProfilePanel mentorId={mentor.id} />
              <ChatPanelEmbedded mentorId={mentor.id} />
            </div>

            {/* Plan rail (right, 5) */}
            <aside className="col-span-12 xl:col-span-5 flex flex-col gap-6">
              <CurrentGoal goalLabel={journey?.goalLabel ?? "—"} accent={accent} />
              <SevenDayPlan topics={journey?.weeklyTopics ?? []} accent={accent} />
              <WeakAreas accent={accent} />
              <RecommendedNext accent={accent} />
              <InterviewTips accent={accent} mentorName={mentor.name} />
              <div className="md:hidden flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => setShowSwitch((v) => !v)}
                  className="w-full inline-flex items-center justify-center gap-1.5 rounded-md border border-line bg-panel-2 px-3 py-2 font-display text-[11px] font-bold tracking-[0.18em] text-text-dim"
                >
                  <Replace className="h-3.5 w-3.5" />
                  CHANGE MENTOR
                </button>
                <button
                  type="button"
                  onClick={regenerate}
                  className="w-full inline-flex items-center justify-center gap-1.5 rounded-md px-3 py-2 font-display text-[11px] font-bold tracking-[0.18em]"
                  style={{
                    background: `${accent}1a`,
                    border: `1px solid ${accent}55`,
                    color: accent,
                  }}
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  REGENERATE PLAN
                </button>
              </div>
            </aside>
          </div>

          {/* Mentor switcher dialog */}
          {showSwitch && (
            <div
              role="dialog"
              aria-label="Switch mentor"
              className="fixed inset-0 z-[90] flex items-center justify-center bg-void/80 backdrop-blur-md p-6"
              onClick={() => setShowSwitch(false)}
            >
              <div
                className="relative w-full max-w-3xl rounded-xl border border-neon/40 bg-panel/95 p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="font-display text-xl font-bold text-text">Switch your mentor</h2>
                <p className="mt-1 text-sm text-text-dim">
                  Your plan stays the same — only the tone of guidance changes.
                </p>
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {MENTORS.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => handleChangeMentor(m.id)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg border p-3 text-left transition-colors",
                        m.id === mentor.id ? "border-line-bright bg-panel-2" : "border-line bg-panel-2/40 hover:border-line-bright",
                      )}
                    >
                      <div
                        className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md border bl-clip-notch"
                        style={{ borderColor: `${m.accent.hex}aa` }}
                      >
                        <Image src={m.avatar} alt="" fill sizes="48px" className="object-cover" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-display text-[14px] font-bold text-text">{m.name}</div>
                        <div className="text-[11px] text-text-dim line-clamp-1">{m.personality}</div>
                      </div>
                      {m.id === mentor.id && (
                        <span className="ml-auto font-mono text-[9px] tracking-[0.22em] text-neon">CURRENT</span>
                      )}
                    </button>
                  ))}
                </div>
                <div className="mt-5 text-right">
                  <button
                    type="button"
                    onClick={() => setShowSwitch(false)}
                    className="font-mono text-[11px] tracking-[0.18em] text-text-mute hover:text-text"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------

function ProfilePanel({ mentorId }: { mentorId: MentorId }) {
  const mentor = getMentor(mentorId)
  const accent = mentor.accent.hex
  return (
    <section
      className="relative overflow-hidden rounded-xl border bg-panel/70 p-5 backdrop-blur-sm"
      style={{ borderColor: `${accent}55` }}
    >
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-15" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 -right-20 h-60 w-60 rounded-full blur-3xl"
        style={{ background: `${accent}33` }}
      />
      <div className="relative flex flex-col sm:flex-row gap-5">
        <div
          className="relative h-28 w-28 shrink-0 overflow-hidden rounded-lg border-2 bl-clip-notch self-start"
          style={{ borderColor: `${accent}cc`, boxShadow: `0 0 30px ${accent}44` }}
        >
          <Image src={mentor.avatar} alt={mentor.name} fill sizes="112px" className="object-cover" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h2 className="font-display text-2xl font-bold tracking-tight text-text">{mentor.name}</h2>
            <span
              className="rounded-sm border px-2 py-0.5 font-mono text-[9px] tracking-[0.22em]"
              style={{ borderColor: `${accent}55`, color: accent, background: `${accent}10` }}
            >
              {mentor.role.toUpperCase()}
            </span>
          </div>
          <p className="mt-1 text-sm text-text-dim italic">&ldquo;{mentor.tagline}&rdquo;</p>
          <p className="mt-3 text-[13px] text-text leading-snug">{mentor.style}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {mentor.traits.map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1 rounded-sm border px-2 py-1 font-mono text-[10px] tracking-wide"
                style={{
                  borderColor: `${accent}44`,
                  color: accent,
                  background: `${accent}0d`,
                }}
              >
                <span className="h-1 w-1 rounded-full" style={{ background: accent }} />
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ChatPanelEmbedded({ mentorId }: { mentorId: MentorId }) {
  return (
    <section className="relative overflow-hidden rounded-xl border border-line/60 bg-panel/40 backdrop-blur-sm">
      <header className="flex items-center justify-between border-b border-line/60 px-4 py-2.5">
        <span className="font-mono text-[10px] tracking-[0.22em] text-text-mute">CONVERSATION</span>
        <span className="font-mono text-[9px] tracking-[0.22em] text-text-mute">END-TO-END · LOCAL</span>
      </header>
      <div className="relative h-[520px]">
        <EmbeddedChat mentorId={mentorId} />
      </div>
    </section>
  )
}

function EmbeddedChat({ mentorId }: { mentorId: MentorId }) {
  // Reuse the slide-in chat panel by mounting it always-open inside this card.
  // It's positioned with `embedded` to fill the parent.
  return (
    <div className="absolute inset-0">
      <MentorChatPanel mentorId={mentorId} open onClose={() => {}} embedded />
    </div>
  )
}

function CurrentGoal({ goalLabel, accent }: { goalLabel: string; accent: string }) {
  return (
    <Tile
      icon={<Target className="h-4 w-4" />}
      label="CURRENT GOAL"
      accent={accent}
      body={
        <p className="text-[15px] font-medium text-text">{goalLabel}</p>
      }
    />
  )
}

function SevenDayPlan({ topics, accent }: { topics: string[]; accent: string }) {
  return (
    <Tile
      icon={<Sparkles className="h-4 w-4" />}
      label="7-DAY PLAN"
      accent={accent}
      body={
        <ol className="space-y-1.5">
          {topics.map((t, i) => (
            <li
              key={t}
              className="flex items-center gap-2.5 rounded-md border border-line bg-void/40 px-2.5 py-1.5 text-[12.5px] text-text"
            >
              <span
                className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-sm font-mono text-[9px] font-bold"
                style={{ background: `${accent}1a`, color: accent, border: `1px solid ${accent}44` }}
              >
                D{i + 1}
              </span>
              {t}
            </li>
          ))}
        </ol>
      }
    />
  )
}

function WeakAreas({ accent }: { accent: string }) {
  const items = [
    { name: "Recursion / Backtracking", level: 28 },
    { name: "Dynamic Programming", level: 35 },
    { name: "Graph BFS/DFS", level: 52 },
  ]
  return (
    <Tile
      icon={<AlertTriangle className="h-4 w-4" />}
      label="WEAK AREAS"
      accent={accent}
      body={
        <ul className="space-y-2">
          {items.map((it) => (
            <li key={it.name}>
              <div className="flex items-center justify-between text-[12px]">
                <span className="text-text">{it.name}</span>
                <span className="font-mono text-[10px] text-text-mute">{it.level}%</span>
              </div>
              <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-panel-2">
                <div
                  className="h-full"
                  style={{
                    width: `${it.level}%`,
                    background: `linear-gradient(90deg, ${accent}, ${accent}88)`,
                    boxShadow: `0 0 8px ${accent}55`,
                  }}
                />
              </div>
            </li>
          ))}
        </ul>
      }
    />
  )
}

function RecommendedNext({ accent }: { accent: string }) {
  const next = [
    "Hash Map — Anagram Groups",
    "Binary Search — Rotated Array",
    "Sliding Window — Longest Substring",
  ]
  return (
    <Tile
      icon={<TrendingUp className="h-4 w-4" />}
      label="RECOMMENDED NEXT"
      accent={accent}
      body={
        <ul className="space-y-1.5">
          {next.map((n) => (
            <li
              key={n}
              className="flex items-center justify-between rounded-md border border-line bg-void/40 px-3 py-2 text-[12.5px] text-text"
            >
              <span>{n}</span>
              <span className="font-mono text-[9px] tracking-[0.22em]" style={{ color: accent }}>
                MEDIUM
              </span>
            </li>
          ))}
        </ul>
      }
    />
  )
}

function InterviewTips({ accent, mentorName }: { accent: string; mentorName: string }) {
  return (
    <Tile
      icon={<Lightbulb className="h-4 w-4" />}
      label="INTERVIEW READINESS TIPS"
      accent={accent}
      body={
        <ul className="space-y-1.5 text-[12.5px] text-text-dim leading-relaxed">
          <li>• Talk through every assumption out loud before coding.</li>
          <li>• Always state brute force first — then optimise.</li>
          <li>• Re-state the problem in your own words to {mentorName} once a day.</li>
        </ul>
      }
    />
  )
}

function Tile({
  icon,
  label,
  body,
  accent,
}: {
  icon: React.ReactNode
  label: string
  body: React.ReactNode
  accent: string
}) {
  return (
    <section className="relative overflow-hidden rounded-xl border border-line/60 bg-panel/60 p-4 backdrop-blur-sm">
      <div className="mb-3 flex items-center gap-1.5 font-mono text-[10px] tracking-[0.22em] text-text-mute">
        <span style={{ color: accent }}>{icon}</span>
        {label}
      </div>
      {body}
    </section>
  )
}
