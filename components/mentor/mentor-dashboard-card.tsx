"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Sparkles, MessageCircle, ScrollText, Play, Map } from "lucide-react"
import { cn } from "@/lib/utils"
import { getMentor } from "@/lib/mentor-data"
import { useOnboarding } from "@/lib/use-onboarding"
import { MentorChatPanel } from "./mentor-chat-panel"

export function MentorDashboardCard() {
  const { state, status } = useOnboarding()
  const [chatOpen, setChatOpen] = useState(false)

  if (status !== "returning" || !state.mentorId) {
    return <FirstTimeMentorCard />
  }

  const mentor = getMentor(state.mentorId)
  const accent = mentor.accent.hex
  const journey = state.journey
  const dailyMessage = buildDailyMessage(mentor.id, journey)

  return (
    <>
      <section
        aria-label={`${mentor.name}'s daily briefing`}
        className="relative overflow-hidden rounded-xl border bg-panel/80 backdrop-blur-sm"
        style={{
          borderColor: `${accent}55`,
          boxShadow: `0 0 0 1px ${accent}22, 0 20px 50px -25px ${accent}55`,
        }}
      >
        <div className="pointer-events-none absolute inset-0 bl-grid opacity-20" />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-12 -right-12 h-40 w-40 rounded-full blur-3xl"
          style={{ background: `${accent}33` }}
        />

        {/* Top strip */}
        <div
          className="relative flex items-center justify-between border-b border-line/60 px-4 py-2"
          style={{ background: `linear-gradient(90deg, ${accent}10, transparent)` }}
        >
          <span className="inline-flex items-center gap-1.5 font-display text-[10px] font-bold tracking-[0.22em]" style={{ color: accent }}>
            <span className="h-1 w-1 rounded-full bl-flicker" style={{ background: accent, boxShadow: `0 0 8px ${accent}` }} />
            MENTOR LINK · ACTIVE
          </span>
          <span className="font-mono text-[9px] tracking-[0.22em] text-text-mute">
            DAY 01
          </span>
        </div>

        <div className="relative flex gap-4 p-4">
          <div
            className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md border bl-clip-notch"
            style={{ borderColor: `${accent}99` }}
          >
            <Image src={mentor.avatar} alt={mentor.name} fill sizes="64px" className="object-cover" />
            <div
              aria-hidden
              className="absolute inset-0 mix-blend-screen opacity-40"
              style={{ background: `linear-gradient(180deg, transparent 0%, ${accent}55 100%)` }}
            />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="font-display text-lg font-bold tracking-tight text-text">
                {mentor.name}
              </h3>
              <span className="font-mono text-[10px] tracking-[0.16em] text-text-mute">
                {mentor.role.toUpperCase()}
              </span>
            </div>
            <p className="mt-1.5 text-[13px] leading-snug text-text-dim">
              <span style={{ color: accent }}>{mentor.name} says:</span> {dailyMessage}
            </p>
          </div>
        </div>

        {/* Goal + mission compact rows */}
        <div className="relative grid grid-cols-2 gap-3 border-t border-line/60 px-4 py-3">
          <Stat
            label="CURRENT GOAL"
            value={journey?.goalLabel ?? "Set your goal"}
            icon={<Map className="h-3.5 w-3.5" />}
            accent={accent}
          />
          <Stat
            label="TODAY'S MISSION"
            value={journey?.firstMission.title.replace(/^Mission \d+\s*[—-]\s*/, "") ?? "Begin onboarding"}
            icon={<Sparkles className="h-3.5 w-3.5" />}
            accent={accent}
          />
        </div>

        {/* Actions */}
        <div className="relative grid grid-cols-3 gap-2 border-t border-line/60 p-3">
          <Link
            href="/mentor"
            className={cn(
              "group flex items-center justify-center gap-1.5 rounded-md py-2 font-display text-[11px] font-bold tracking-[0.16em]",
              "transition-all bl-clip-chevron",
            )}
            style={{
              color: "#001018",
              background: `linear-gradient(135deg, ${accent} 0%, ${accent}cc 100%)`,
              boxShadow: `0 0 16px ${accent}55`,
            }}
          >
            <Play className="h-3.5 w-3.5" />
            START MISSION
          </Link>
          <button
            type="button"
            onClick={() => setChatOpen(true)}
            className="flex items-center justify-center gap-1.5 rounded-md border border-line bg-panel-2 py-2 font-display text-[11px] font-bold tracking-[0.16em] text-text transition-colors hover:border-line-bright"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            ASK MENTOR
          </button>
          <Link
            href="/mentor"
            className="flex items-center justify-center gap-1.5 rounded-md border border-line bg-panel-2 py-2 font-display text-[11px] font-bold tracking-[0.16em] text-text transition-colors hover:border-line-bright"
          >
            <ScrollText className="h-3.5 w-3.5" />
            FULL PLAN
          </Link>
        </div>
      </section>

      <MentorChatPanel mentorId={mentor.id} open={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  )
}

function Stat({
  label,
  value,
  icon,
  accent,
}: {
  label: string
  value: string
  icon: React.ReactNode
  accent: string
}) {
  return (
    <div>
      <div className="flex items-center gap-1.5 font-mono text-[9px] tracking-[0.22em] text-text-mute">
        <span style={{ color: accent }}>{icon}</span>
        {label}
      </div>
      <div className="mt-1 text-[13px] font-medium text-text leading-snug line-clamp-2">
        {value}
      </div>
    </div>
  )
}

function FirstTimeMentorCard() {
  return (
    <section className="relative overflow-hidden rounded-xl border border-neon/40 bg-panel/80 p-4 backdrop-blur-sm">
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-15" />
      <div className="relative flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-neon/50 bg-neon/10">
          <Sparkles className="h-5 w-5 text-neon" />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-sm font-bold tracking-tight text-text">
            You haven&apos;t chosen your mentor yet
          </h3>
          <p className="mt-1 text-[12px] leading-snug text-text-dim">
            Pick an AI guide and we&apos;ll build a personalised plan in 60 seconds.
          </p>
          <Link
            href="/onboarding/intro"
            className="mt-3 inline-flex items-center gap-1.5 rounded-md border border-neon/60 bg-neon/15 px-3 py-1.5 font-display text-[11px] font-bold tracking-[0.16em] text-neon hover:bg-neon/25 transition-colors"
          >
            BEGIN ONBOARDING
          </Link>
        </div>
      </div>
    </section>
  )
}

function buildDailyMessage(
  id: ReturnType<typeof getMentor>["id"],
  journey: ReturnType<typeof useOnboarding>["state"]["journey"],
): string {
  const topic = journey?.weeklyTopics?.[0] ?? "your foundation"
  const minutes = journey?.dailyMinutes ?? 60
  switch (id) {
    case "rex":
      return `Lock-in time. ${minutes} minutes on the clock today, hitting ${topic}. No headphones off until the mission ships.`
    case "nova":
      return `We're on Phase 1: ${topic}. Today's session covers the core pattern, one calibration problem and a 2-line journal entry. ${minutes} min.`
    case "vera":
      return `Today is a mock-style sprint on ${topic}. Solve out loud — I'll grade communication and code. ${minutes} min.`
    case "astra":
    default:
      return `You're starting from where you are, and that's perfect. Today we'll begin with ${topic} — ${minutes} mindful minutes, one concept and one easy challenge.`
  }
}
