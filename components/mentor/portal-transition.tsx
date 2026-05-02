"use client"

import { useEffect, useMemo, useState } from "react"
import { cn } from "@/lib/utils"

type Props = {
  /** Hex color for the portal core. Defaults to neon cyan. */
  accentHex?: string
  /** Secondary hex used for the rim. Defaults to ember orange. */
  secondaryHex?: string
  /** Caption shown below the portal. */
  caption?: string
  /** Total duration of the animation in ms before `onComplete` fires. */
  duration?: number
  /** Fired once when the animation finishes. */
  onComplete?: () => void
  /** When false the portal is unmounted. */
  open?: boolean
}

export function PortalTransition({
  accentHex = "#00f0ff",
  secondaryHex = "#ff6b1a",
  caption = "Entering CodeTrackX Arena…",
  duration = 2600,
  onComplete,
  open = true,
}: Props) {
  const [phase, setPhase] = useState<0 | 1 | 2 | 3>(0)

  useEffect(() => {
    if (!open) return
    setPhase(0)
    const t1 = setTimeout(() => setPhase(1), 150)
    const t2 = setTimeout(() => setPhase(2), Math.max(800, duration * 0.45))
    const t3 = setTimeout(() => setPhase(3), Math.max(1400, duration * 0.85))
    const t4 = setTimeout(() => onComplete?.(), duration)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
  }, [open, duration, onComplete])

  // Pre-compute particle positions once.
  const particles = useMemo(
    () =>
      Array.from({ length: 38 }, (_, i) => {
        const angle = (i / 38) * Math.PI * 2 + (i % 3) * 0.07
        const radius = 320 + (i % 5) * 60 + ((i * 13) % 90)
        const delay = (i % 12) * 60
        const dur = 1100 + (i % 7) * 110
        return {
          id: i,
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius,
          delay,
          dur,
          color: i % 3 === 0 ? secondaryHex : accentHex,
        }
      }),
    [accentHex, secondaryHex],
  )

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void"
      role="status"
      aria-live="polite"
    >
      {/* Background grid + radial gradient */}
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-30" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${accentHex}22, transparent 55%)`,
          opacity: phase >= 1 ? 1 : 0,
        }}
      />

      {/* Inrushing particles */}
      <div className="relative h-[60vh] w-full flex items-center justify-center">
        <div className="relative">
          {particles.map((p) => (
            <span
              key={p.id}
              aria-hidden
              className="absolute left-0 top-0 block h-[3px] w-[3px] rounded-full"
              style={{
                background: p.color,
                boxShadow: `0 0 8px ${p.color}`,
                transform:
                  phase >= 1
                    ? `translate3d(0,0,0) scale(0.6)`
                    : `translate3d(${p.x}px, ${p.y}px, 0) scale(1)`,
                transition: `transform ${p.dur}ms cubic-bezier(.6,.05,.2,1) ${p.delay}ms, opacity 600ms`,
                opacity: phase >= 3 ? 0 : phase >= 1 ? 0.9 : 0,
              }}
            />
          ))}

          {/* Outer rotating rim */}
          <div
            aria-hidden
            className={cn(
              "absolute inset-0 m-auto h-[260px] w-[260px] rounded-full border",
              "transition-all duration-1000",
            )}
            style={{
              borderColor: `${accentHex}66`,
              boxShadow: `0 0 40px ${accentHex}33, inset 0 0 32px ${accentHex}33`,
              transform: phase >= 1 ? "scale(1) rotate(180deg)" : "scale(0.4) rotate(0deg)",
              opacity: phase >= 1 ? 1 : 0,
            }}
          />

          {/* Mid pulsing ring */}
          <div
            aria-hidden
            className="absolute inset-0 m-auto h-[180px] w-[180px] rounded-full"
            style={{
              border: `1px dashed ${secondaryHex}88`,
              boxShadow: `0 0 28px ${secondaryHex}55`,
              transform: phase >= 1 ? "scale(1)" : "scale(0.2)",
              transition: "transform 900ms cubic-bezier(.6,.05,.2,1) 200ms",
              animation: phase >= 1 ? "ctx-portal-spin 5s linear infinite" : undefined,
            }}
          />

          {/* Core */}
          <div
            aria-hidden
            className="relative h-[260px] w-[260px] rounded-full"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${accentHex} 0%, ${accentHex}88 18%, ${accentHex}22 38%, transparent 62%)`,
              transform: phase >= 1 ? "scale(1)" : "scale(0)",
              transition: "transform 1100ms cubic-bezier(.6,.05,.2,1)",
              filter: phase >= 2 ? "brightness(1.4)" : "brightness(1)",
            }}
          />

          {/* Final flash */}
          <div
            aria-hidden
            className="absolute inset-0 m-auto h-[260px] w-[260px] rounded-full"
            style={{
              background: `radial-gradient(circle at 50% 50%, #fff 0%, ${accentHex} 30%, transparent 70%)`,
              opacity: phase >= 3 ? 1 : 0,
              transform: phase >= 3 ? "scale(8)" : "scale(1)",
              transition: "transform 700ms cubic-bezier(.4,0,.2,1), opacity 700ms",
            }}
          />
        </div>
      </div>

      {/* Caption */}
      <div
        className="pointer-events-none absolute bottom-[12vh] left-1/2 -translate-x-1/2 text-center"
        style={{ opacity: phase >= 1 && phase < 3 ? 1 : 0, transition: "opacity 500ms" }}
      >
        <p className="font-display text-sm sm:text-base font-bold tracking-[0.32em] text-text">
          {caption.toUpperCase()}
        </p>
        <div className="mx-auto mt-3 flex h-1 w-48 overflow-hidden rounded-full bg-panel-2">
          <div
            className="h-full"
            style={{
              background: `linear-gradient(90deg, ${accentHex}, ${secondaryHex})`,
              width: phase >= 2 ? "100%" : phase >= 1 ? "55%" : "10%",
              transition: "width 900ms cubic-bezier(.4,0,.2,1)",
            }}
          />
        </div>
      </div>

      <style jsx global>{`
        @keyframes ctx-portal-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
