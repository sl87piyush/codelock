import { TrendingUp, TrendingDown, ArrowUpRight, Diamond } from "lucide-react"

export function OutcomeProjection() {
  return (
    <div className="relative overflow-hidden border border-line/80 bg-panel/60 bl-glass">
      <div className="flex items-center justify-between border-b border-line/70 px-5 py-3">
        <div className="flex items-center gap-2">
          <Diamond className="h-3.5 w-3.5 text-neon" />
          <h4 className="font-display text-[13px] font-bold tracking-[0.22em] text-text">
            LP PROJECTION
          </h4>
        </div>
        <span className="font-mono text-[10px] tracking-[0.16em] text-text-mute">
          YOUR POV · tonystark
        </span>
      </div>

      <div className="grid gap-3 p-4 sm:grid-cols-2">
        {/* WIN */}
        <div className="relative overflow-hidden border border-neon/40 bg-neon/5 p-4 bl-side-stripe">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-3.5 w-3.5 text-neon" />
            <span className="font-display text-[10px] font-bold tracking-[0.24em] text-neon">
              ON MATCH WIN
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="font-display text-[32px] font-black leading-none text-neon text-glow tabular-nums">
              +26
            </span>
            <span className="font-mono text-[11px] tracking-[0.18em] text-neon/80">LP</span>
          </div>
          <div className="mt-2 font-mono text-[11px] text-text-dim">
            Diamond II · 73% → <span className="text-neon">99%</span>
          </div>
          <div className="mt-2 inline-flex items-center gap-1 border border-gold/40 bg-gold/10 px-2 py-0.5 font-display text-[9px] font-bold tracking-[0.22em] text-gold bl-clip-chevron">
            <ArrowUpRight className="h-3 w-3" />
            PROMOTION SERIES READY
          </div>
        </div>

        {/* LOSS */}
        <div className="relative overflow-hidden border border-ember/40 bg-ember/5 p-4 bl-side-stripe bl-side-stripe-ember">
          <div className="flex items-center gap-2">
            <TrendingDown className="h-3.5 w-3.5 text-ember" />
            <span className="font-display text-[10px] font-bold tracking-[0.24em] text-ember">
              ON MATCH LOSS
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="font-display text-[32px] font-black leading-none text-ember text-glow-ember tabular-nums">
              −18
            </span>
            <span className="font-mono text-[11px] tracking-[0.18em] text-ember/80">LP</span>
          </div>
          <div className="mt-2 font-mono text-[11px] text-text-dim">
            Diamond II · 73% → <span className="text-ember">55%</span>
          </div>
          <div className="mt-2 inline-flex items-center gap-1 border border-line/70 bg-void/60 px-2 py-0.5 font-display text-[9px] font-bold tracking-[0.22em] text-text-dim bl-clip-chevron">
            NO DEMOTION RISK
          </div>
        </div>
      </div>

      {/* Rank bar */}
      <div className="relative border-t border-line/70 px-5 pt-4 pb-5">
        <div className="mb-1.5 flex items-center justify-between font-mono text-[10px] tracking-[0.16em] text-text-mute">
          <span>DIAMOND II</span>
          <span>DIAMOND I</span>
        </div>
        <div className="relative h-2.5 overflow-hidden bl-bar-track">
          {/* current */}
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-electric via-neon to-neon-soft"
            style={{ width: "73%" }}
          >
            <div className="absolute inset-0 opacity-60 bl-shimmer mix-blend-screen" />
          </div>
          {/* loss range */}
          <div
            className="absolute inset-y-0 bg-ember/40"
            style={{ left: "55%", width: "18%" }}
          />
          {/* win range */}
          <div
            className="absolute inset-y-0 bg-neon/40"
            style={{ left: "73%", width: "26%" }}
          />
          {/* current marker */}
          <div
            className="absolute inset-y-0 w-0.5 bg-text shadow-[0_0_10px_#ffffff]"
            style={{ left: "73%" }}
          />
        </div>
        <div className="mt-2 flex items-center justify-between font-mono text-[10px] text-text-dim">
          <span>
            Current: <span className="text-text">2,847 LP</span>
          </span>
          <span>
            Next promo: <span className="text-neon">+53 LP</span>
          </span>
        </div>
      </div>
    </div>
  )
}
