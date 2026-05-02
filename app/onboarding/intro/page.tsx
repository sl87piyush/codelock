"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronRight, FastForward } from "lucide-react"
import { cn } from "@/lib/utils"

const LINES = [
  "Initializing CodeTrackX Protocol…",
  "Calibrating arena parameters…",
  "Preparing your coding arena…",
  "Choose your AI Mentor to begin your journey.",
]

const LINE_DURATION = 1200

export default function OnboardingIntroPage() {
  const router = useRouter()
  const [phase, setPhase] = useState<0 | 1 | 2 | 3 | 4>(0)
  const [lineIdx, setLineIdx] = useState(0)
  const [typed, setTyped] = useState("")
  const finishedRef = useRef(false)

  // Phase 0 → 1 (grid sweep), then start typewriter loop.
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 60)
    return () => clearTimeout(t1)
  }, [])

  // Typewriter through LINES
  useEffect(() => {
    if (phase < 1) return
    if (lineIdx >= LINES.length) {
      // All typed — kick off final flash to mentor select.
      const t = setTimeout(() => setPhase(4), 700)
      return () => clearTimeout(t)
    }
    const text = LINES[lineIdx]
    let i = 0
    setTyped("")
    const charDelay = Math.max(18, Math.min(50, LINE_DURATION / Math.max(text.length, 24)))
    const interval = setInterval(() => {
      i += 1
      setTyped(text.slice(0, i))
      if (i >= text.length) {
        clearInterval(interval)
        const hold = setTimeout(() => {
          setLineIdx((n) => n + 1)
          if (lineIdx === 0) setPhase(2)
          if (lineIdx === LINES.length - 2) setPhase(3)
        }, 480)
        return () => clearTimeout(hold)
      }
    }, charDelay)
    return () => clearInterval(interval)
  }, [phase, lineIdx])

  // Final flash → push to mentor select.
  useEffect(() => {
    if (phase !== 4 || finishedRef.current) return
    finishedRef.current = true
    const t = setTimeout(() => {
      router.push("/onboarding/mentor")
    }, 650)
    return () => clearTimeout(t)
  }, [phase, router])

  const skip = () => {
    finishedRef.current = true
    router.push("/onboarding/mentor")
  }

  return (
    <section className="relative -mt-16 flex min-h-screen flex-col items-center justify-center px-6">
      {/* Boot scan line — sweeps once on mount */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 h-[2px] z-20",
          "shadow-[0_0_20px_#00f0ff]",
        )}
        style={{
          background: "linear-gradient(90deg, transparent, #00f0ff, transparent)",
          top: phase >= 1 ? "100%" : "0%",
          opacity: phase >= 2 ? 0 : 1,
          transition: "top 1100ms cubic-bezier(.4,0,.2,1), opacity 600ms",
        }}
      />

      {/* Center HUD ring — emerges in phase 1 */}
      <div className="relative flex flex-col items-center">
        <div
          aria-hidden
          className={cn(
            "relative h-[260px] w-[260px] sm:h-[320px] sm:w-[320px] rounded-full",
            "transition-all duration-1000",
          )}
          style={{
            transform: phase >= 1 ? "scale(1)" : "scale(0.6)",
            opacity: phase >= 1 ? 1 : 0,
          }}
        >
          {/* Outer ring */}
          <div
            className="absolute inset-0 rounded-full border border-neon/40"
            style={{
              boxShadow: "0 0 40px #00f0ff33, inset 0 0 24px #00f0ff22",
              animation: "ctx-ring-spin 22s linear infinite",
            }}
          />
          {/* Mid dashed ring */}
          <div
            className="absolute inset-6 rounded-full"
            style={{
              border: "1px dashed #ff6b1a99",
              animation: "ctx-ring-spin-rev 14s linear infinite",
              boxShadow: "0 0 20px #ff6b1a33",
            }}
          />
          {/* Inner pulsing core */}
          <div
            className="absolute inset-14 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, #00f0ff 0%, #00f0ff66 25%, #00f0ff11 55%, transparent 75%)",
              animation: "ctx-core-pulse 2.4s ease-in-out infinite",
            }}
          />
          {/* Tick marks */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i / 12) * 360
            return (
              <span
                key={i}
                aria-hidden
                className="absolute left-1/2 top-1/2 block h-3 w-[1.5px] origin-top -translate-x-1/2 bg-neon/70"
                style={{
                  transform: `rotate(${angle}deg) translateY(-50%)`,
                  marginTop: "-128px",
                  boxShadow: "0 0 6px #00f0ff",
                  opacity: phase >= 1 ? 0.85 : 0,
                  transition: `opacity 600ms ${i * 35}ms`,
                }}
              />
            )
          })}
          {/* Center crosshair */}
          <span
            aria-hidden
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[10px] tracking-[0.32em] text-neon"
            style={{ opacity: phase >= 2 ? 1 : 0, transition: "opacity 500ms" }}
          >
            CTX-01
          </span>
        </div>

        {/* Typewriter line */}
        <div className="mt-10 h-12 w-full max-w-xl text-center">
          <p
            className="font-mono text-[13px] sm:text-[14px] tracking-[0.06em] text-neon"
            aria-live="polite"
          >
            {typed}
            <span
              className="ml-0.5 inline-block h-[14px] w-[7px] -translate-y-[2px] bg-neon align-middle"
              style={{ animation: "ctx-caret 0.85s steps(1) infinite" }}
            />
          </p>
          <div className="mx-auto mt-3 flex items-center justify-center gap-1.5">
            {LINES.map((_, i) => (
              <span
                key={i}
                className={cn(
                  "h-[3px] w-8 rounded-full transition-all",
                  i < lineIdx ? "bg-neon" : i === lineIdx ? "bg-neon/60" : "bg-line",
                )}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Final flash overlay */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-30 bg-neon"
        style={{
          opacity: phase >= 4 ? 0.95 : 0,
          transition: "opacity 500ms",
        }}
      />

      {/* Skip button */}
      <button
        type="button"
        onClick={skip}
        className="fixed bottom-8 right-8 z-20 inline-flex items-center gap-1.5 rounded-md border border-line bg-panel-2/70 px-3 py-2 font-display text-[11px] font-bold tracking-[0.18em] text-text-dim backdrop-blur-sm transition-colors hover:border-neon/60 hover:text-neon"
      >
        <FastForward className="h-3.5 w-3.5" />
        SKIP INTRO
        <ChevronRight className="h-3.5 w-3.5" />
      </button>

      <style jsx global>{`
        @keyframes ctx-ring-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes ctx-ring-spin-rev {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes ctx-core-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(0.92); opacity: 0.75; }
        }
        @keyframes ctx-caret {
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  )
}
