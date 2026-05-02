"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { getMentor } from "@/lib/mentor-data"
import { useOnboarding } from "@/lib/use-onboarding"
import { MentorChatPanel } from "./mentor-chat-panel"

/**
 * Subtle bottom-right Ask Mentor floating button. Hidden on:
 *  - any /onboarding/* route (the user hasn't picked a mentor yet)
 *  - the dedicated /mentor page (the chat is already there)
 *  - if onboarding is not yet completed
 */
export function FloatingAskMentor() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname() ?? ""
  const { state, status } = useOnboarding()

  if (status !== "returning") return null
  if (pathname.startsWith("/onboarding")) return null
  if (pathname.startsWith("/mentor")) return null
  if (!state.mentorId) return null

  const mentor = getMentor(state.mentorId)
  const accent = mentor.accent.hex

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={`Ask ${mentor.name}`}
        aria-expanded={open}
        className={cn(
          "fixed bottom-5 right-5 z-[70] flex items-center gap-2.5 pl-1.5 pr-4 py-1.5 rounded-full",
          "border bg-panel/90 backdrop-blur-md shadow-2xl",
          "transition-all duration-200 hover:-translate-y-0.5 group",
        )}
        style={{
          borderColor: `${accent}66`,
          boxShadow: `0 12px 30px -10px ${accent}66, 0 0 0 1px ${accent}33`,
        }}
      >
        <span
          className="relative flex h-9 w-9 items-center justify-center rounded-full overflow-hidden"
          style={{
            background: `${accent}22`,
            border: `1px solid ${accent}88`,
          }}
        >
          <Image src={mentor.avatar} alt="" fill sizes="36px" className="object-cover" />
          <span
            className="absolute -right-0.5 -bottom-0.5 h-2.5 w-2.5 rounded-full bl-flicker"
            style={{
              background: accent,
              boxShadow: `0 0 8px ${accent}, 0 0 0 2px var(--panel)`,
            }}
          />
        </span>
        <span className="hidden sm:flex flex-col text-left">
          <span className="font-display text-[12px] font-bold tracking-[0.16em] text-text leading-none">
            ASK {mentor.name.toUpperCase()}
          </span>
          <span className="mt-0.5 font-mono text-[9px] tracking-wide text-text-mute">
            {mentor.role}
          </span>
        </span>
        <MessageCircle
          className="hidden sm:block h-4 w-4 transition-transform group-hover:scale-110"
          style={{ color: accent }}
        />
      </button>

      <MentorChatPanel mentorId={state.mentorId} open={open} onClose={() => setOpen(false)} />
    </>
  )
}
