import { BookOpen, Play, Lock, CheckCircle2, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

type Topic = {
  id: string
  title: string
  status: "learning" | "locked" | "complete"
  xp: number
  progress: number
}

const topics: Topic[] = [
  { id: "01", title: "Arrays & Hashing", status: "learning", xp: 120, progress: 45 },
  { id: "02", title: "Two Pointers", status: "learning", xp: 80, progress: 15 },
  { id: "03", title: "Sliding Window", status: "locked", xp: 0, progress: 0 },
  { id: "04", title: "Stack & Queue", status: "locked", xp: 0, progress: 0 },
  { id: "05", title: "Binary Search", status: "locked", xp: 0, progress: 0 },
  { id: "06", title: "Linked Lists", status: "locked", xp: 0, progress: 0 },
]

export function LearningPath() {
  return (
    <div className="relative bl-glass overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-line/50">
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-neon" />
          <span className="font-display text-[10px] font-bold tracking-[0.28em] text-neon/80">
            YOUR LEARNING PATH
          </span>
        </div>

        <div className="mt-3 flex items-end justify-between gap-4">
          <div>
            <h3 className="font-display text-2xl font-bold tracking-tight leading-tight">
              Data Structures &amp; Algorithms
            </h3>
            <p className="mt-1.5 text-[13px] text-text-dim">
              Master the fundamentals of DSA for coding interviews and competitive programming.
            </p>
          </div>
          <div className="shrink-0 text-right">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-neon/10 border border-neon/40 text-neon">
              <Zap className="h-3.5 w-3.5" />
              <span className="font-display text-[11px] font-bold tracking-[0.2em]">
                20/20 XP
              </span>
            </div>
            <div className="mt-2 font-display text-[11px] font-bold tracking-[0.2em] text-text-dim">
              0% COMPLETE
            </div>
          </div>
        </div>

        <div className="mt-4 h-1.5 bl-bar-track">
          <div className="h-full bg-gradient-to-r from-neon to-electric w-[8%] shadow-[0_0_14px_rgba(0,240,255,0.5)]" />
        </div>
      </div>

      {/* Currently learning tag */}
      <div className="relative px-5 pt-4 pb-2 flex items-center gap-2">
        <Play className="h-3.5 w-3.5 text-neon fill-neon" />
        <span className="font-display text-[10px] font-bold tracking-[0.28em] text-neon">
          CURRENTLY LEARNING
        </span>
        <span className="h-px flex-1 bg-gradient-to-r from-neon/30 to-transparent" />
      </div>

      {/* Topic grid */}
      <div className="p-5 pt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
        {topics.map((t) => (
          <TopicRow key={t.id} topic={t} />
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-line/50 p-4 flex items-center justify-between">
        <span className="font-mono text-[11px] text-text-mute">
          06 TOPICS &middot; 120 CHALLENGES
        </span>
        <button className="bl-btn-ghost">
          VIEW FULL ROADMAP
        </button>
      </div>
    </div>
  )
}

function TopicRow({ topic }: { topic: Topic }) {
  const locked = topic.status === "locked"
  const complete = topic.status === "complete"

  return (
    <div
      className={cn(
        "relative border border-line/60 bg-panel/40 p-3 flex items-center gap-3 transition-all",
        locked && "opacity-55",
        !locked && "hover:border-neon/50 hover:bg-neon/[0.03]",
      )}
    >
      <div
        className={cn(
          "shrink-0 flex h-10 w-10 items-center justify-center font-display text-[13px] font-bold border bl-clip-notch",
          complete
            ? "bg-neon/15 border-neon/50 text-neon"
            : locked
            ? "bg-panel-2 border-line text-text-mute"
            : "bg-neon/10 border-neon/40 text-neon",
        )}
      >
        {topic.id}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h4 className={cn(
            "font-display text-[14px] font-bold tracking-tight truncate",
            locked ? "text-text-mute" : "text-text",
          )}>
            {topic.title}
          </h4>
          {complete && <CheckCircle2 className="h-3.5 w-3.5 text-neon" />}
        </div>

        {!locked ? (
          <div className="mt-1.5 h-1 bg-void/60">
            <div
              className="h-full bg-gradient-to-r from-neon to-electric"
              style={{ width: `${topic.progress}%` }}
            />
          </div>
        ) : (
          <div className="mt-1.5 font-mono text-[10px] text-text-mute tracking-wider">
            LOCKED // COMPLETE PRIOR TO UNLOCK
          </div>
        )}
      </div>

      <div className="shrink-0">
        {locked ? (
          <Lock className="h-4 w-4 text-text-mute" />
        ) : (
          <span className="font-display text-[10px] font-bold tracking-[0.18em] text-neon">
            {topic.xp} XP
          </span>
        )}
      </div>
    </div>
  )
}
