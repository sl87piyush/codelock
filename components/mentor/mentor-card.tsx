"use client"

import Image from "next/image"
import { Check, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Mentor } from "@/lib/mentor-data"

type Props = {
  mentor: Mentor
  selected: boolean
  onSelect: (id: Mentor["id"]) => void
  /** When true the card adopts a horizontal compact layout for /mentor. */
  compact?: boolean
}

export function MentorCard({ mentor, selected, onSelect, compact = false }: Props) {
  const a = mentor.accent
  return (
    <button
      type="button"
      onClick={() => onSelect(mentor.id)}
      data-selected={selected ? "true" : "false"}
      aria-pressed={selected}
      className={cn(
        "group relative flex flex-col text-left overflow-hidden",
        "border bg-panel/80 backdrop-blur-sm transition-all duration-300 ease-out",
        "hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-0",
        selected ? a.border : "border-line",
        compact ? "rounded-lg p-4 gap-3" : "rounded-xl p-5 gap-4",
      )}
      style={{
        boxShadow: selected
          ? `0 0 0 1px ${a.hex}, 0 0 32px ${a.hex}55, inset 0 0 24px ${a.hex}1a`
          : undefined,
      }}
    >
      {/* Ambient glow that lifts on hover/select */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500",
          "group-hover:opacity-100",
          selected && "opacity-100",
        )}
        style={{
          background: `radial-gradient(70% 50% at 50% 0%, ${a.hex}22, transparent 70%)`,
        }}
      />

      {/* Top corner notches */}
      <span aria-hidden className={cn("pointer-events-none absolute top-2 left-2 h-3 w-3 border-t border-l", a.border)} />
      <span aria-hidden className={cn("pointer-events-none absolute top-2 right-2 h-3 w-3 border-t border-r", a.border)} />

      <div className={cn("relative flex items-start gap-4", compact && "items-center")}>
        <div
          className={cn(
            "relative shrink-0 overflow-hidden border bl-clip-notch",
            a.border,
            compact ? "h-14 w-14 rounded-md" : "h-20 w-20 rounded-lg",
          )}
        >
          <Image
            src={mentor.avatar}
            alt={`${mentor.name} avatar`}
            fill
            sizes="80px"
            className="object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 mix-blend-screen opacity-40"
            style={{
              background: `linear-gradient(180deg, transparent 0%, ${a.hex}33 100%)`,
            }}
          />
          {selected && (
            <div
              className="absolute -right-1 -bottom-1 flex h-6 w-6 items-center justify-center rounded-full bg-void"
              style={{ boxShadow: `0 0 10px ${a.hex}` }}
            >
              <Check className={cn("h-3.5 w-3.5", a.text)} strokeWidth={3} />
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-2">
            <h3 className={cn("font-display font-bold tracking-tight text-text", compact ? "text-base" : "text-xl")}>
              {mentor.name}
            </h3>
            <span className={cn("font-display text-[10px] font-bold tracking-[0.18em]", a.text)}>
              {mentor.role.toUpperCase()}
            </span>
          </div>
          <p className={cn("mt-1 text-text-dim leading-snug", compact ? "text-xs" : "text-sm")}>
            &ldquo;{mentor.tagline}&rdquo;
          </p>
        </div>
      </div>

      {!compact && (
        <>
          <div className="relative space-y-1.5 text-[12.5px]">
            <Row label="PERSONALITY" value={mentor.personality} />
            <Row label="BEST FOR" value={mentor.bestFor} />
          </div>

          <div className="relative flex flex-wrap gap-1.5">
            {mentor.traits.map((t) => (
              <span
                key={t}
                className={cn(
                  "inline-flex items-center gap-1 rounded-sm border px-2 py-1 font-mono text-[10px] tracking-wide text-text-dim",
                  selected ? a.border : "border-line",
                  selected ? a.bg : "bg-panel-2/60",
                )}
              >
                <span className={cn("h-1 w-1 rounded-full", selected ? a.text : "bg-text-mute")} />
                {t}
              </span>
            ))}
          </div>

          <div className="relative mt-1 flex items-center justify-between border-t border-line/60 pt-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-mute">
              {selected ? "Selected" : "Tap to select"}
            </span>
            <span
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5 font-display text-[11px] font-bold tracking-[0.18em]",
                "bl-clip-chevron transition-all",
                selected ? a.bg : "bg-panel-2",
                selected ? a.text : "text-text",
                selected ? a.border : "border border-line",
              )}
            >
              {selected ? (
                <>
                  <Sparkles className="h-3 w-3" />
                  LOCKED IN
                </>
              ) : (
                <>SELECT</>
              )}
            </span>
          </div>
        </>
      )}
    </button>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start gap-2">
      <span className="mt-0.5 font-mono text-[9px] tracking-[0.22em] text-text-mute shrink-0 w-24">
        {label}
      </span>
      <span className="text-text-dim">{value}</span>
    </div>
  )
}
