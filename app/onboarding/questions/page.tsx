"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { getMentor, QUESTIONS, type OnboardingAnswers } from "@/lib/mentor-data"
import { useOnboarding } from "@/lib/use-onboarding"
import { OnboardingQuestion } from "@/components/mentor/onboarding-question"
import { cn } from "@/lib/utils"

export default function OnboardingQuestionsPage() {
  const router = useRouter()
  const { state, setAnswers } = useOnboarding()

  // Guard — if no mentor yet, push back.
  useEffect(() => {
    if (!state.mentorId && typeof window !== "undefined") {
      router.replace("/onboarding/mentor")
    }
  }, [state.mentorId, router])

  const mentor = getMentor(state.mentorId)
  const accent = mentor.accent.hex

  const [step, setStep] = useState(0)
  const [local, setLocal] = useState<OnboardingAnswers>(state.answers ?? {})

  const current = QUESTIONS[step]
  const value = local[current.key]
  const canNext = Boolean(value)
  const isLast = step === QUESTIONS.length - 1

  const progress = useMemo(() => {
    const answered = QUESTIONS.filter((q) => local[q.key]).length
    return Math.round((answered / QUESTIONS.length) * 100)
  }, [local])

  const onPick = (val: string) => {
    setLocal((prev) => ({ ...prev, [current.key]: val }))
  }

  const next = () => {
    setAnswers(local)
    if (isLast) {
      router.push("/onboarding/generating")
    } else {
      setStep((s) => Math.min(QUESTIONS.length - 1, s + 1))
    }
  }

  const prev = () => {
    if (step === 0) {
      router.push("/onboarding/mentor")
    } else {
      setStep((s) => Math.max(0, s - 1))
    }
  }

  return (
    <section className="relative mx-auto max-w-5xl px-6 pt-2 pb-32">
      {/* Mentor presence card */}
      <div
        className="mb-8 flex items-center gap-3 rounded-lg border bg-panel/70 px-4 py-3 backdrop-blur-sm"
        style={{ borderColor: `${accent}55`, boxShadow: `0 0 0 1px ${accent}1a` }}
      >
        <div
          className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md border bl-clip-notch"
          style={{ borderColor: `${accent}aa` }}
        >
          <Image src={mentor.avatar} alt="" fill sizes="40px" className="object-cover" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[10px] tracking-[0.22em] text-text-mute">
            YOUR MENTOR
          </p>
          <p className="mt-0.5 font-display text-[14px] font-bold tracking-tight text-text">
            {mentor.name} <span className="text-text-mute font-normal">— {mentor.role}</span>
          </p>
        </div>
        <div className="hidden sm:block min-w-[180px]">
          <div className="mb-1 flex items-center justify-between">
            <span className="font-mono text-[9px] tracking-[0.22em] text-text-mute">CALIBRATION</span>
            <span className="font-mono text-[10px]" style={{ color: accent }}>{progress}%</span>
          </div>
          <div className="h-1 w-full overflow-hidden rounded-full bg-panel-2">
            <div
              className="h-full transition-all duration-500"
              style={{
                width: `${progress}%`,
                background: `linear-gradient(90deg, ${accent}, ${accent}88)`,
                boxShadow: `0 0 10px ${accent}66`,
              }}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <OnboardingQuestion
          question={current}
          index={step}
          total={QUESTIONS.length}
          value={value}
          onChange={onPick}
          accentHex={accent}
        />
      </div>

      {/* Sticky nav bar */}
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-line/60 bg-void/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
          <button
            type="button"
            onClick={prev}
            className="inline-flex items-center gap-1.5 rounded-md border border-line bg-panel-2 px-3 py-2 font-display text-[11px] font-bold tracking-[0.18em] text-text-dim transition-colors hover:border-line-bright hover:text-text"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            BACK
          </button>

          <div className="hidden sm:flex items-center gap-1.5">
            {QUESTIONS.map((q, i) => (
              <span
                key={q.key}
                className={cn(
                  "h-[3px] w-8 rounded-full transition-all",
                  i < step
                    ? "bg-text"
                    : i === step
                      ? ""
                      : "bg-line",
                )}
                style={
                  i === step ? { background: accent, boxShadow: `0 0 8px ${accent}` } : undefined
                }
              />
            ))}
          </div>

          <button
            type="button"
            onClick={next}
            disabled={!canNext}
            className={cn(
              "inline-flex items-center gap-2 px-5 py-2.5 font-display text-[12px] font-bold tracking-[0.22em]",
              "bl-clip-chevron transition-all",
              !canNext && "cursor-not-allowed opacity-50",
            )}
            style={
              canNext
                ? {
                    background: accent,
                    color: "#001018",
                    boxShadow: `0 0 24px ${accent}66`,
                  }
                : { background: "var(--panel-2)", color: "var(--text-mute)" }
            }
          >
            {isLast ? "GENERATE PLAN" : "NEXT"}
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </section>
  )
}
