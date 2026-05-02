"use client"

import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Question } from "@/lib/mentor-data"

type Props = {
  question: Question
  index: number
  total: number
  value: string | undefined
  onChange: (value: string) => void
  accentHex: string
}

export function OnboardingQuestion({ question, index, total, value, onChange, accentHex }: Props) {
  return (
    <div className="relative w-full max-w-2xl">
      {/* Step pill */}
      <div className="flex items-center gap-3">
        <span
          className="inline-flex h-6 items-center gap-1.5 rounded-sm border border-line bg-panel-2 px-2 font-mono text-[10px] tracking-[0.22em] text-text-dim"
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: accentHex, boxShadow: `0 0 8px ${accentHex}` }}
          />
          STEP {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-line to-transparent" />
      </div>

      <h2 className="mt-4 font-display text-2xl sm:text-3xl font-bold tracking-tight text-text text-balance">
        {question.prompt}
      </h2>
      <p className="mt-1.5 text-sm text-text-dim">{question.helper}</p>

      <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {question.options.map((opt) => {
          const selected = value === opt.value
          return (
            <li key={opt.value}>
              <button
                type="button"
                onClick={() => onChange(opt.value)}
                aria-pressed={selected}
                className={cn(
                  "group relative w-full text-left rounded-lg border bg-panel/70 backdrop-blur-sm",
                  "px-4 py-3.5 transition-all duration-200",
                  "hover:-translate-y-0.5 focus:outline-none",
                  selected ? "border-transparent" : "border-line hover:border-line-bright",
                )}
                style={
                  selected
                    ? {
                        boxShadow: `0 0 0 1px ${accentHex}, 0 0 22px ${accentHex}44, inset 0 0 16px ${accentHex}14`,
                      }
                    : undefined
                }
              >
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "relative flex h-5 w-5 shrink-0 items-center justify-center rounded-full border",
                      selected ? "border-transparent" : "border-line-bright",
                    )}
                    style={
                      selected
                        ? { background: accentHex, boxShadow: `0 0 12px ${accentHex}` }
                        : undefined
                    }
                  >
                    {selected && <Check className="h-3 w-3 text-void" strokeWidth={3} />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-[14.5px] text-text">{opt.label}</div>
                    {opt.hint && (
                      <div className="mt-0.5 font-mono text-[10.5px] text-text-mute tracking-wide">
                        {opt.hint}
                      </div>
                    )}
                  </div>
                </div>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
