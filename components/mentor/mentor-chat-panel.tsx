"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Send, X, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { getMentor, type MentorId } from "@/lib/mentor-data"

type Message = {
  id: string
  role: "user" | "mentor"
  text: string
  ts: number
}

type Props = {
  mentorId: MentorId | null
  open: boolean
  onClose: () => void
  /** Lock the panel into a slide-in side panel even on mobile. */
  embedded?: boolean
}

const SUGGESTED = [
  "I'm stuck on today's mission",
  "Roast my last submission",
  "What's my weakest topic right now?",
  "Give me one harder problem",
]

export function MentorChatPanel({ mentorId, open, onClose, embedded = false }: Props) {
  const mentor = getMentor(mentorId)
  const accent = mentor.accent.hex
  const [messages, setMessages] = useState<Message[]>([])
  const [draft, setDraft] = useState("")
  const [thinking, setThinking] = useState(false)
  const scrollRef = useRef<HTMLDivElement | null>(null)

  // Seed greeting whenever mentor changes / panel opens fresh.
  useEffect(() => {
    if (!open) return
    if (messages.length === 0) {
      setMessages([
        {
          id: "seed",
          role: "mentor",
          text: `${mentor.greetingTemplate}\n\nAsk me anything — I'll keep it ${mentor.personality.split(".")[0].toLowerCase()}.`,
          ts: Date.now(),
        },
      ])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, mentor.id])

  // Reset chat when mentor changes (otherwise tone gets confusing).
  useEffect(() => {
    setMessages([])
  }, [mentor.id])

  useEffect(() => {
    if (!open) return
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, thinking, open])

  // Esc to close
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onClose])

  const send = (text: string) => {
    const clean = text.trim()
    if (!clean) return
    const userMsg: Message = { id: `u-${Date.now()}`, role: "user", text: clean, ts: Date.now() }
    setMessages((m) => [...m, userMsg])
    setDraft("")
    setThinking(true)
    // Simulated mentor reply with style flexed by personality.
    const reply = composeReply(mentor.id, clean)
    const delay = 700 + Math.min(2200, clean.length * 18)
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        { id: `m-${Date.now()}`, role: "mentor", text: reply, ts: Date.now() },
      ])
      setThinking(false)
    }, delay)
  }

  if (!open) return null

  return (
    <div
      className={cn(
        "fixed z-[80] flex flex-col overflow-hidden border bg-panel/95 backdrop-blur-xl shadow-2xl",
        embedded
          ? "inset-0 sm:right-6 sm:bottom-6 sm:top-auto sm:left-auto sm:h-[640px] sm:w-[400px] sm:rounded-xl"
          : "bottom-4 right-4 left-4 top-16 sm:top-auto sm:left-auto sm:h-[640px] sm:w-[400px] sm:rounded-xl",
      )}
      style={{
        borderColor: `${accent}55`,
        boxShadow: `0 30px 80px -20px ${accent}33, 0 0 0 1px ${accent}22`,
      }}
      role="dialog"
      aria-label={`Chat with ${mentor.name}`}
    >
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-15" />

      {/* Header */}
      <header
        className="relative flex items-center gap-3 border-b border-line/60 px-4 py-3"
        style={{ background: `linear-gradient(180deg, ${accent}1a, transparent)` }}
      >
        <div
          className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md border bl-clip-notch"
          style={{ borderColor: `${accent}aa` }}
        >
          <Image src={mentor.avatar} alt="" fill sizes="40px" className="object-cover" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="font-display text-[15px] font-bold tracking-tight text-text">
              {mentor.name}
            </h3>
            <span
              className="h-1.5 w-1.5 rounded-full bl-flicker"
              style={{ background: accent, boxShadow: `0 0 8px ${accent}` }}
            />
          </div>
          <p className="font-mono text-[10px] tracking-[0.18em] text-text-mute">
            {mentor.role.toUpperCase()} · ONLINE
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close mentor chat"
          className="flex h-8 w-8 items-center justify-center rounded-md border border-line/60 text-text-dim transition-colors hover:bg-panel-2 hover:text-text"
        >
          <X className="h-4 w-4" />
        </button>
      </header>

      {/* Messages */}
      <div ref={scrollRef} className="relative flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((m) => (
          <Bubble key={m.id} message={m} accent={accent} />
        ))}
        {thinking && <ThinkingBubble accent={accent} />}
      </div>

      {/* Suggestions */}
      {messages.length <= 1 && !thinking && (
        <div className="relative flex flex-wrap gap-1.5 border-t border-line/60 px-3 py-2">
          {SUGGESTED.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => send(s)}
              className="rounded-full border border-line bg-panel-2/60 px-2.5 py-1 font-mono text-[10px] tracking-wide text-text-dim transition-colors hover:border-line-bright hover:text-text"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Composer */}
      <form
        className="relative flex items-center gap-2 border-t border-line/60 px-3 py-3"
        onSubmit={(e) => {
          e.preventDefault()
          send(draft)
        }}
      >
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={`Ask ${mentor.name}…`}
          aria-label="Message"
          className="flex-1 rounded-md border border-line bg-void/60 px-3 py-2 text-[13px] text-text placeholder:text-text-mute focus:border-line-bright focus:outline-none"
        />
        <button
          type="submit"
          disabled={!draft.trim()}
          aria-label="Send message"
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-md border transition-all",
            "disabled:opacity-40 disabled:cursor-not-allowed",
          )}
          style={{
            borderColor: `${accent}88`,
            background: `${accent}18`,
            color: accent,
            boxShadow: draft.trim() ? `0 0 12px ${accent}55` : undefined,
          }}
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  )
}

function Bubble({ message, accent }: { message: Message; accent: string }) {
  const isUser = message.role === "user"
  return (
    <div className={cn("flex gap-2", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <div
          className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
          style={{ background: `${accent}22`, border: `1px solid ${accent}55` }}
        >
          <Sparkles className="h-3 w-3" style={{ color: accent }} />
        </div>
      )}
      <div
        className={cn(
          "max-w-[78%] rounded-lg px-3 py-2 text-[13px] leading-snug whitespace-pre-line",
          isUser
            ? "border border-line-bright bg-panel-2 text-text"
            : "border bg-void/40 text-text",
        )}
        style={
          !isUser
            ? { borderColor: `${accent}55`, boxShadow: `0 0 16px ${accent}1a inset` }
            : undefined
        }
      >
        {message.text}
      </div>
    </div>
  )
}

function ThinkingBubble({ accent }: { accent: string }) {
  return (
    <div className="flex gap-2 justify-start">
      <div
        className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
        style={{ background: `${accent}22`, border: `1px solid ${accent}55` }}
      >
        <Sparkles className="h-3 w-3" style={{ color: accent }} />
      </div>
      <div
        className="rounded-lg border bg-void/40 px-3 py-2"
        style={{ borderColor: `${accent}44` }}
      >
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-1.5 w-1.5 rounded-full"
              style={{
                background: accent,
                animation: `ctx-bounce 1.1s ease-in-out ${i * 0.15}s infinite`,
              }}
            />
          ))}
        </div>
        <style jsx>{`
          @keyframes ctx-bounce {
            0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
            40% { transform: translateY(-4px); opacity: 1; }
          }
        `}</style>
      </div>
    </div>
  )
}

function composeReply(id: MentorId, prompt: string): string {
  const lower = prompt.toLowerCase()
  switch (id) {
    case "rex":
      if (lower.includes("stuck"))
        return "Stuck means you stopped thinking, not that the problem stopped working. Re-read the constraints. Brute force first. Optimise after. Ten minutes — go."
      if (lower.includes("weakest"))
        return "Your weakest topic is the one you keep avoiding. Open the planner. Sort by topics with zero submissions. That's the answer. No comfort zones."
      return "Less typing to me, more typing into the editor. Pick a problem, set 25 minutes, do not move. Report back when it's solved or when the timer kills you."
    case "nova":
      if (lower.includes("stuck"))
        return "Let's decompose. State the input, output and an example. Identify the invariant that must hold. The right data structure usually falls out of the invariant — pattern-match from there."
      if (lower.includes("weakest"))
        return "Weakness in this stage is a coverage gap, not a skill gap. Pull up your topic graph — any node with <3 solved is unsafe. We close the smallest gap first."
      return "Translate the question into 1) what we are optimising, 2) what we are constrained by, 3) what we have already seen. From those three, the algorithm is usually mechanical."
    case "vera":
      if (lower.includes("stuck"))
        return "Pretend I'm the interviewer. Walk me through your approach out loud — even the wrong ones. Articulating why you're stuck almost always shows you the way through."
      if (lower.includes("weakest"))
        return "On paper your weakest topic is graphs, but in interviews your weakest move is going silent. We fix the silence first — narrate every step you make today."
      return "Let's run this as a 30-minute mock. State the problem back to me, ask me one clarifying question, then propose two approaches with trade-offs before coding. Ready?"
    case "astra":
    default:
      if (lower.includes("stuck"))
        return "That's okay — being stuck means you're at the edge of learning. Take a breath. Read the problem out loud, slowly. Tell me one thing you understand and one thing you don't."
      if (lower.includes("weakest"))
        return "Your data says recursion is shaky right now. We don't need to fix it today — we just need to do one easy recursion problem and notice that it didn't bite. Small wins, daily."
      return "I'm with you. Let's pick something tiny and finish it cleanly so today ends on a win. What feels most doable in the next 20 minutes?"
  }
}
