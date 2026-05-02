"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { MENTORS, type MentorId } from "@/lib/mentor-data"
import { useOnboarding } from "@/lib/use-onboarding"
import { MentorCard } from "@/components/mentor/mentor-card"
import { cn } from "@/lib/utils"

export default function OnboardingMentorPage() {
  const router = useRouter()
  const { state, setMentor } = useOnboarding()
  const [selected, setSelected] = useState<MentorId | null>(state.mentorId)

  const handleSelect = (id: MentorId) => setSelected(id)

  const proceed = () => {
    if (!selected) return
    setMentor(selected)
    router.push("/onboarding/questions")
  }

  return (
    <section className="relative mx-auto max-w-7xl px-6 pt-4 pb-16">
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-1.5 rounded-sm border border-line bg-panel-2/70 px-2.5 py-1 font-mono text-[10px] tracking-[0.22em] text-neon backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-neon shadow-[0_0_8px_#00f0ff]" />
          STEP 01 — MENTOR SELECTION
        </span>
        <h1 className="mt-4 font-display text-3xl sm:text-5xl font-bold tracking-tight text-text text-balance">
          Choose your <span className="text-neon">AI Mentor</span>
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm sm:text-base text-text-dim text-pretty">
          They will set the tone of your journey. You can change mentor later
          from the Mentor Chamber, but they will remember every conversation.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {MENTORS.map((m) => (
          <MentorCard
            key={m.id}
            mentor={m}
            selected={selected === m.id}
            onSelect={handleSelect}
          />
        ))}
      </div>

      {/* Sticky proceed bar */}
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-line/60 bg-void/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
          <div className="min-w-0 flex-1">
            <p className="font-mono text-[10px] tracking-[0.22em] text-text-mute">
              {selected ? "SELECTED MENTOR" : "AWAITING SELECTION"}
            </p>
            <p className="mt-0.5 font-display text-[14px] font-bold tracking-tight text-text">
              {selected ? MENTORS.find((m) => m.id === selected)?.name : "Pick one to continue"}
            </p>
          </div>
          <button
            type="button"
            onClick={proceed}
            disabled={!selected}
            className={cn(
              "inline-flex items-center gap-2 px-5 py-2.5 font-display text-[12px] font-bold tracking-[0.22em]",
              "bl-clip-chevron transition-all",
              selected
                ? "bg-neon text-void hover:bg-neon-soft shadow-[0_0_24px_#00f0ff66]"
                : "bg-panel-2 text-text-mute cursor-not-allowed",
            )}
          >
            CONFIRM MENTOR
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </section>
  )
}
