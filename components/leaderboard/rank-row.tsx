import { Flame, Minus, Sparkles, TrendingDown, TrendingUp } from "lucide-react"
import { DIVISION_META, type Warrior } from "./leaderboard-data"
import { cn } from "@/lib/utils"

export function RankRow({ warrior }: { warrior: Warrior }) {
  const div = DIVISION_META[warrior.division]
  const delta =
    warrior.prevRank == null ? null : warrior.prevRank - warrior.rank
  const isYou = warrior.isYou

  return (
    <div
      className={cn(
        "group relative grid grid-cols-[44px_1fr_auto] items-center gap-3 border-b border-line/40 px-4 py-3 transition-all hover:bg-panel/60 md:grid-cols-[64px_minmax(220px,1.6fr)_120px_120px_140px_120px_60px] md:gap-4 md:px-5",
        isYou && "bg-neon/[0.06] hover:bg-neon/[0.1] border-l-2 border-l-neon",
      )}
    >
      {isYou && (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-neon/10 via-transparent to-transparent" />
      )}

      {/* Rank */}
      <div className="relative flex items-center gap-2">
        <span
          className={cn(
            "font-display text-2xl font-bold leading-none tracking-tight md:text-3xl",
            warrior.rank <= 3
              ? warrior.rank === 1
                ? "text-gold"
                : warrior.rank === 2
                  ? "text-text"
                  : "text-ember"
              : "text-text",
          )}
        >
          {warrior.rank.toString().padStart(2, "0")}
        </span>
      </div>

      {/* Player */}
      <div className="flex min-w-0 items-center gap-3">
        <div className="relative shrink-0">
          {isYou && (
            <div className="absolute inset-0 rounded-full bg-neon/20 blur-md" />
          )}
          <div
            className={cn(
              "relative flex h-10 w-10 items-center justify-center border bg-void font-display text-base font-bold bl-clip-notch md:h-11 md:w-11",
              isYou ? "border-neon text-neon" : `${div.ring} ${div.accent}`,
            )}
          >
            {warrior.username.slice(0, 1).toUpperCase()}
          </div>
          {warrior.isPro && (
            <div className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center border border-gold bg-void">
              <Sparkles className="h-2.5 w-2.5 text-gold" />
            </div>
          )}
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="truncate font-display text-[14px] font-semibold text-text md:text-[15px]">
              {warrior.username}
            </span>
            {isYou && (
              <span className="inline-flex h-4 items-center border border-neon/60 bg-neon/15 px-1.5 font-display text-[9px] font-bold tracking-[0.18em] text-neon">
                YOU
              </span>
            )}
            {warrior.streak >= 5 && (
              <span className="hidden items-center gap-0.5 font-mono text-[10px] text-ember sm:inline-flex">
                <Flame className="h-3 w-3" />
                {warrior.streak}
              </span>
            )}
          </div>
          <div className="mt-0.5 flex items-center gap-2 font-mono text-[11px] text-text-mute">
            <span className="truncate">{warrior.handle}</span>
            <span className="hidden h-3 w-px bg-line/60 sm:inline-block" />
            <span className="hidden tracking-[0.1em] sm:inline">
              {warrior.countryFlag} {warrior.country}
            </span>
          </div>

          {/* Mobile-only condensed stats */}
          <div className="mt-1 flex items-center gap-3 font-mono text-[10px] text-text-dim md:hidden">
            <span>
              <span className={div.accent}>
                {div.label.slice(0, 3)} {warrior.divisionTier}
              </span>
            </span>
            <span>{warrior.lp.toLocaleString()} LP</span>
            <span>{warrior.winRate}%</span>
          </div>
        </div>
      </div>

      {/* Division (md+) */}
      <div className="hidden md:block">
        <span
          className={cn(
            "inline-flex items-center gap-1 border px-2 py-1 font-display text-[10px] font-bold tracking-[0.18em]",
            div.ring,
            div.bg,
            div.accent,
          )}
        >
          {div.label} {warrior.divisionTier}
        </span>
      </div>

      {/* LP (md+) */}
      <div className="hidden md:block">
        <div className="font-display text-base font-bold tracking-tight text-text">
          {warrior.lp.toLocaleString()}
          <span className="ml-1 font-mono text-[10px] tracking-[0.15em] text-text-mute">
            LP
          </span>
        </div>
      </div>

      {/* Win rate (md+) */}
      <div className="hidden md:block">
        <div className="flex items-center gap-2">
          <div className="relative h-1.5 w-20 overflow-hidden border border-line/80 bg-void">
            <div
              className={cn(
                "h-full",
                warrior.winRate >= 80
                  ? "bg-neon"
                  : warrior.winRate >= 65
                    ? "bg-electric"
                    : warrior.winRate >= 50
                      ? "bg-gold"
                      : "bg-ember",
              )}
              style={{ width: `${warrior.winRate}%` }}
            />
          </div>
          <span className="font-mono text-[12px] font-semibold tracking-tight text-text">
            {warrior.winRate}%
          </span>
        </div>
        <div className="mt-1 font-mono text-[10px] tracking-[0.1em] text-text-mute">
          {warrior.wins}W · {warrior.losses}L
        </div>
      </div>

      {/* Battles (md+) */}
      <div className="hidden md:block">
        <div className="font-mono text-[13px] font-semibold text-text">
          {warrior.battles.toLocaleString()}
        </div>
        <div className="mt-0.5 font-mono text-[10px] tracking-[0.1em] text-text-mute">
          BATTLES
        </div>
      </div>

      {/* Trend */}
      <div className="flex items-center justify-end">
        <DeltaPill delta={delta} isNew={warrior.prevRank == null} />
      </div>
    </div>
  )
}

function DeltaPill({
  delta,
  isNew,
}: {
  delta: number | null
  isNew: boolean
}) {
  if (isNew) {
    return (
      <span className="inline-flex items-center gap-0.5 border border-gold/50 bg-gold/10 px-1.5 py-0.5 font-display text-[10px] font-bold tracking-[0.15em] text-gold">
        NEW
      </span>
    )
  }
  if (delta == null || delta === 0) {
    return (
      <span className="inline-flex items-center gap-0.5 font-mono text-[11px] text-text-mute">
        <Minus className="h-3 w-3" />
      </span>
    )
  }
  const up = delta > 0
  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 font-mono text-[11px] font-bold",
        up ? "text-neon" : "text-ember",
      )}
    >
      {up ? (
        <TrendingUp className="h-3.5 w-3.5" />
      ) : (
        <TrendingDown className="h-3.5 w-3.5" />
      )}
      {Math.abs(delta)}
    </span>
  )
}
