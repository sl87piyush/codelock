import Link from "next/link"
import { MessageSquare, Eye, TimerOff, Code2 } from "lucide-react"

export function BattleActions() {
  return (
    <div className="relative overflow-hidden border border-neon/40 bg-panel/70 bl-glass">
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-30" />

      <div className="relative flex flex-col gap-3 p-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Primary CTA */}
        <Link
          href="/battle/workspace"
          className="bl-btn-primary bl-pulse bl-clip-notch inline-flex h-12 items-center px-6 text-[12.5px] tracking-[0.18em]"
        >
          <Code2 className="h-4 w-4" />
          OPEN CODE ARENA
        </Link>

        {/* Secondary actions */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="bl-btn-ghost relative bl-clip-chevron"
          >
            <MessageSquare className="h-3.5 w-3.5" />
            TEAM CHAT
            <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full border border-blood/70 bg-blood/90 font-mono text-[9px] font-bold text-void">
              3
            </span>
          </button>
          <button type="button" className="bl-btn-ghost bl-clip-chevron">
            <Eye className="h-3.5 w-3.5" />
            SPECTATE
          </button>
          <button type="button" className="bl-btn-ghost bl-clip-chevron">
            <TimerOff className="h-3.5 w-3.5" />
            TIMEOUT
            <span className="ml-0.5 font-mono text-[10px] text-text-mute">1 LEFT</span>
          </button>
        </div>
      </div>
    </div>
  )
}
