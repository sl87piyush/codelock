import { BookOpen, Cpu, Database, Layers, Flame, Trophy } from "lucide-react"
import { cn } from "@/lib/utils"

const TOPICS = [
  { label: "Dynamic Programming", icon: Layers },
  { label: "Two Pointers", icon: Cpu },
  { label: "Segment Tree", icon: Database },
]

export function ProblemBrief() {
  return (
    <div className="relative flex h-full flex-col overflow-hidden border border-neon/30 bg-panel/70 bl-glass">
      <div className="pointer-events-none absolute inset-0 bl-dots opacity-20" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon/60 to-transparent" />

      {/* VS Scoreboard */}
      <div className="relative border-b border-line/70 px-4 py-4">
        <div className="flex items-center justify-center gap-5 md:gap-7">
          <div className="flex flex-col items-center">
            <span className="font-display text-[9px] font-bold tracking-[0.3em] text-neon/80">
              BLUE
            </span>
            <span className="font-display text-[56px] font-black leading-none text-neon text-glow tabular-nums">
              2
            </span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <div className="relative flex h-10 w-10 items-center justify-center border border-line-bright/60 bg-void font-display text-[16px] font-black tracking-wider text-text bl-clip-notch">
              VS
              <span className="pointer-events-none absolute -inset-0.5 rounded-sm border border-neon/30 blur-sm" />
            </div>
            <span className="font-mono text-[10px] tracking-[0.2em] text-text-mute">
              ROUND 4/5
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-display text-[9px] font-bold tracking-[0.3em] text-ember/90">
              RED
            </span>
            <span className="font-display text-[56px] font-black leading-none text-ember text-glow-ember tabular-nums">
              1
            </span>
          </div>
        </div>
      </div>

      {/* Problem meta */}
      <div className="relative flex flex-1 flex-col gap-4 px-5 py-5">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-neon/40 bg-neon/10 text-neon bl-clip-notch">
            <BookOpen className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] tracking-[0.2em] text-text-mute">
                CURRENT PROBLEM
              </span>
              <span className="inline-flex items-center gap-1 border border-blood/50 bg-blood/10 px-1.5 py-0.5 font-display text-[9px] font-bold tracking-[0.22em] text-blood bl-clip-chevron">
                <Flame className="h-3 w-3" />
                HARD
              </span>
            </div>
            <h3 className="mt-1 font-display text-[20px] font-bold leading-tight tracking-tight text-text text-balance">
              Longest Synchronized Subarray
            </h3>
          </div>
        </div>

        {/* Problem summary */}
        <p className="text-[12.5px] leading-relaxed text-text-dim">
          Given two arrays of equal length, find the longest contiguous subarray where the
          elements of both arrays are in strictly increasing order. Return the length and the
          starting index.
        </p>

        {/* Topic tags */}
        <div className="flex flex-wrap gap-1.5">
          {TOPICS.map((t) => {
            const Icon = t.icon
            return (
              <span
                key={t.label}
                className="inline-flex items-center gap-1.5 border border-line/70 bg-void/50 px-2 py-1 font-mono text-[10.5px] tracking-[0.05em] text-text-dim"
              >
                <Icon className="h-3 w-3 text-neon/80" />
                {t.label}
              </span>
            )
          })}
        </div>

        {/* Constraints */}
        <div className="grid grid-cols-3 gap-2">
          <MetaBlock label="N" value="10⁵" />
          <MetaBlock label="TIME" value="2.0s" />
          <MetaBlock label="MEM" value="256MB" />
        </div>

        {/* Reward pool */}
        <div
          className={cn(
            "relative flex items-center justify-between border border-gold/30 bg-gold/5 px-4 py-3",
          )}
        >
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-gold drop-shadow-[0_0_8px_rgba(251,191,36,0.7)]" />
            <span className="font-display text-[10px] font-bold tracking-[0.24em] text-gold">
              ROUND STAKE
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-[18px] font-black tabular-nums text-gold">
              +28
            </span>
            <span className="font-mono text-[10px] tracking-[0.18em] text-gold/70">LP</span>
          </div>
        </div>

        {/* Round progress */}
        <div className="mt-auto">
          <div className="mb-1.5 flex items-center justify-between font-mono text-[10px] tracking-[0.16em] text-text-mute">
            <span>ROUND PROGRESS</span>
            <span className="text-text">23 / 48 TESTS</span>
          </div>
          <div className="bl-bar-track relative h-2 overflow-hidden">
            <div
              className="relative h-full bg-gradient-to-r from-electric via-neon to-neon-soft"
              style={{ width: "48%" }}
            >
              <div className="absolute inset-0 opacity-60 bl-shimmer mix-blend-screen" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MetaBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center border border-line/70 bg-void/50 py-2">
      <span className="font-display text-[9px] font-bold tracking-[0.24em] text-text-mute">
        {label}
      </span>
      <span className="font-display text-[14px] font-bold tabular-nums text-text">{value}</span>
    </div>
  )
}
