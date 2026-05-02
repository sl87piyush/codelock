import {
  CheckCircle2,
  XCircle,
  TimerReset,
  Zap,
  Shield,
  Upload,
  Lock,
  Flag,
} from "lucide-react"
import { cn } from "@/lib/utils"

type Event = {
  time: string
  tone: "neon" | "ember" | "gold" | "blood" | "dim"
  icon: React.ComponentType<{ className?: string }>
  actor: string
  verb: string
  detail?: string
}

const EVENTS: Event[] = [
  {
    time: "-14:32",
    tone: "dim",
    icon: TimerReset,
    actor: "SYSTEM",
    verb: "Round 4 began",
    detail: "Longest Synchronized Subarray · HARD · 28 LP at stake",
  },
  {
    time: "-13:58",
    tone: "neon",
    icon: Lock,
    actor: "nightowl",
    verb: "locked in approach",
    detail: "Segment Tree + DP",
  },
  {
    time: "-12:40",
    tone: "ember",
    icon: XCircle,
    actor: "bachira",
    verb: "failed submission",
    detail: "Runtime Error · index out of bounds on test #14",
  },
  {
    time: "-11:20",
    tone: "neon",
    icon: Upload,
    actor: "tonystark",
    verb: "submitted",
    detail: "6 / 8 tests passed · 1 TLE, 1 WA",
  },
  {
    time: "-09:48",
    tone: "gold",
    icon: CheckCircle2,
    actor: "nightowl",
    verb: "cleared all test cases",
    detail: "16/16 passed · executed in 0.42s · +1 bonus for first clear",
  },
  {
    time: "-07:12",
    tone: "neon",
    icon: Zap,
    actor: "BLUE LOCK STRIKERS",
    verb: "took Round 3",
    detail: "+24 LP · isagi_y TLE on segment tree rebuild",
  },
  {
    time: "-04:02",
    tone: "ember",
    icon: Flag,
    actor: "EGO CRUSHERS",
    verb: "took Round 2",
    detail: "-21 LP · isagi_y cleared in 3:44",
  },
  {
    time: "-00:00",
    tone: "dim",
    icon: Shield,
    actor: "SYSTEM",
    verb: "Match initialized",
    detail: "Best of 5 · ELO delta 54 · sudden death enabled at 2–2",
  },
]

export function LiveFeed() {
  return (
    <div className="relative flex h-full flex-col overflow-hidden border border-line/80 bg-panel/60 bl-glass">
      <div className="flex items-center justify-between border-b border-line/70 px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="relative h-2 w-2 rounded-full bg-blood bl-flicker shadow-[0_0_10px_#ff3355]" />
          <h4 className="font-display text-[13px] font-bold tracking-[0.22em] text-text">
            MATCH FEED
          </h4>
        </div>
        <span className="font-mono text-[10px] tracking-[0.18em] text-text-mute">
          AUTO-SCROLL · {EVENTS.length} EVENTS
        </span>
      </div>

      <div className="relative flex-1 overflow-y-auto">
        <ul className="relative flex flex-col">
          {/* timeline rail */}
          <div className="pointer-events-none absolute top-0 bottom-0 left-[72px] w-px bg-gradient-to-b from-transparent via-line-bright/60 to-transparent" />
          {EVENTS.map((ev, i) => (
            <FeedItem key={i} ev={ev} />
          ))}
        </ul>
      </div>
    </div>
  )
}

function FeedItem({ ev }: { ev: Event }) {
  const toneClass = {
    neon: "text-neon border-neon/50 bg-neon/10 shadow-[0_0_14px_rgba(0,240,255,0.25)]",
    ember: "text-ember border-ember/50 bg-ember/10 shadow-[0_0_14px_rgba(255,107,26,0.2)]",
    gold: "text-gold border-gold/50 bg-gold/10 shadow-[0_0_14px_rgba(251,191,36,0.2)]",
    blood: "text-blood border-blood/50 bg-blood/10",
    dim: "text-text-dim border-line bg-void/60",
  }[ev.tone]
  const actorTone = {
    neon: "text-neon",
    ember: "text-ember",
    gold: "text-gold",
    blood: "text-blood",
    dim: "text-text",
  }[ev.tone]
  const Icon = ev.icon

  return (
    <li className="group relative flex items-start gap-3 border-b border-line/40 px-5 py-3 transition hover:bg-void/40">
      <span className="w-[48px] shrink-0 font-mono text-[11px] tabular-nums text-text-mute">
        {ev.time}
      </span>
      <span
        className={cn(
          "relative z-10 inline-flex h-7 w-7 shrink-0 items-center justify-center border bl-clip-notch",
          toneClass,
        )}
      >
        <Icon className="h-3.5 w-3.5" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5 text-[12.5px]">
          <span className={cn("font-display font-bold tracking-wide", actorTone)}>
            {ev.actor}
          </span>
          <span className="text-text">{ev.verb}</span>
        </div>
        {ev.detail && (
          <div className="mt-0.5 font-mono text-[10.5px] leading-relaxed text-text-dim">
            {ev.detail}
          </div>
        )}
      </div>
    </li>
  )
}
