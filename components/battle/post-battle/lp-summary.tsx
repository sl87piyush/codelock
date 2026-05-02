import { ArrowDownRight, ArrowUpRight, Gem, Sparkles, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

export function LpSummary() {
  return (
    <div className="relative overflow-hidden border border-line bg-panel/60 bl-glass bl-corners">
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-20" />
      <div className="relative">
        <header className="flex items-center justify-between border-b border-line/60 px-5 py-3 bl-side-stripe">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-neon" />
            <span className="font-display text-[13px] font-bold tracking-[0.2em] text-text text-glow">
              RATING ADJUSTMENT
            </span>
          </div>
          <span className="font-mono text-[10px] tracking-[0.14em] text-text-mute">
            LP FLOW
          </span>
        </header>

        <div className="grid grid-cols-1 gap-px bg-line/30 md:grid-cols-2">
          <LpCard
            tone="neon"
            teamName="Blue Lock Strikers"
            direction="up"
            amount={28}
            fromLp={2819}
            toLp={2847}
            rankFrom="Diamond II"
            rankTo="Diamond II"
            badge="PROMOTION SERIES UNLOCKED"
          />
          <LpCard
            tone="ember"
            teamName="Ego Crushers"
            direction="down"
            amount={18}
            fromLp={2919}
            toLp={2901}
            rankFrom="Diamond I"
            rankTo="Diamond I"
            badge="HOLDING TIER · 18 LP TO DEMOTION ZONE"
          />
        </div>
      </div>
    </div>
  )
}

function LpCard({
  tone,
  teamName,
  direction,
  amount,
  fromLp,
  toLp,
  rankFrom,
  rankTo,
  badge,
}: {
  tone: "neon" | "ember"
  teamName: string
  direction: "up" | "down"
  amount: number
  fromLp: number
  toLp: number
  rankFrom: string
  rankTo: string
  badge: string
}) {
  const isUp = direction === "up"
  const accentText = tone === "neon" ? "text-neon" : "text-ember"
  const Arrow = isUp ? ArrowUpRight : ArrowDownRight

  // Rank progress within tier (demo: next tier at 3000)
  const nextTierAt = 3000
  const tierFloor = 2700
  const pct = Math.max(0, Math.min(100, ((toLp - tierFloor) / (nextTierAt - tierFloor)) * 100))

  return (
    <div className="relative bg-void/50 p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Gem className={cn("h-3.5 w-3.5", accentText)} />
          <span className="font-display text-[12px] font-bold tracking-tight text-text">
            {teamName}
          </span>
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-1 border px-2 py-0.5 font-display text-[10px] font-bold tracking-[0.2em]",
            isUp
              ? "border-neon/50 bg-neon/10 text-neon"
              : "border-ember/50 bg-ember/10 text-ember",
          )}
        >
          <Arrow className="h-3 w-3" />
          {isUp ? `+${amount}` : `−${amount}`} LP
        </span>
      </div>

      {/* LP delta */}
      <div className="mt-4 flex items-baseline gap-2">
        <span className="font-mono text-[12px] tracking-[0.14em] text-text-mute">
          {fromLp.toLocaleString()}
        </span>
        <Arrow className={cn("h-3.5 w-3.5", accentText)} />
        <span
          className={cn(
            "font-display text-[32px] font-black leading-none tabular-nums bl-count-flicker",
            accentText,
          )}
        >
          {toLp.toLocaleString()}
        </span>
        <span className="font-mono text-[10px] tracking-[0.14em] text-text-mute">LP</span>
      </div>

      {/* Rank progress bar */}
      <div className="mt-4">
        <div className="mb-1 flex items-center justify-between font-mono text-[10px] tracking-[0.14em] text-text-dim">
          <span>{rankFrom}</span>
          <span>→ {rankTo === rankFrom ? "Next tier" : rankTo}</span>
        </div>
        <div className="bl-bar-track relative h-2 overflow-hidden">
          <div
            className={cn(
              "h-full",
              tone === "neon"
                ? "bg-gradient-to-r from-electric via-neon to-neon-soft"
                : "bg-gradient-to-r from-ember via-ember-soft to-gold",
            )}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Status badge */}
      <div
        className={cn(
          "mt-4 inline-flex items-center gap-2 border px-2 py-1 font-display text-[9.5px] font-bold tracking-[0.2em]",
          isUp ? "border-gold/40 bg-gold/10 text-gold" : "border-line bg-void text-text-dim",
        )}
      >
        <Sparkles className="h-3 w-3" />
        {badge}
      </div>
    </div>
  )
}
