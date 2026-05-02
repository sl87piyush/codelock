import { Target, TrendingDown, ChevronDown } from "lucide-react"

export function InterviewReadiness() {
  const score = 32
  const max = 100
  const pct = (score / max) * 100
  return (
    <div className="relative bl-glass overflow-hidden">
      {/* Top accent bar (ember = declining) */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-ember to-transparent" />

      <div className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-ember" />
              <h3 className="font-display text-[15px] font-bold tracking-tight">
                Interview Readiness
              </h3>
            </div>
            <p className="mt-1.5 text-[12px] text-text-dim leading-snug max-w-[240px]">
              Your preparation score based on learning patterns.
            </p>
          </div>

          <span className="inline-flex items-center gap-1 px-2 py-1 border border-ember/40 bg-ember/10 text-ember font-display text-[10px] font-bold tracking-[0.18em]">
            <TrendingDown className="h-3 w-3" />
            DECLINING
          </span>
        </div>

        {/* Score */}
        <div className="mt-5 flex items-end gap-3">
          <div className="font-display text-[72px] font-bold leading-none tabular-nums text-ember text-glow-ember">
            {score}
          </div>
          <div className="pb-2">
            <div className="font-display text-[18px] font-bold text-text-dim leading-none">
              /{max}
            </div>
            <div className="mt-1 inline-flex items-center px-2 py-0.5 border border-ember/40 bg-ember/5 text-ember font-display text-[9px] font-bold tracking-[0.22em]">
              DEVELOPING
            </div>
          </div>
        </div>

        {/* Bar */}
        <div className="mt-5">
          <div className="h-2 bl-bar-track">
            <div
              className="h-full bg-gradient-to-r from-ember to-ember-soft shadow-[0_0_14px_rgba(255,107,26,0.5)]"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="mt-2 flex items-center justify-between font-display text-[10px] font-bold tracking-[0.2em] text-text-mute">
            <span>NOT READY</span>
            <span>STRONG CANDIDATE</span>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-5 flex items-center gap-3 py-3 border-t border-line/60">
          <button className="inline-flex items-center gap-2 font-display text-[11px] font-bold tracking-[0.2em] text-text-dim hover:text-neon transition-colors">
            <ChevronDown className="h-3.5 w-3.5" />
            VIEW SCORE BREAKDOWN
          </button>
        </div>
      </div>
    </div>
  )
}
