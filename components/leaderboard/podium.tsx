import { Crown, Flame, ShieldCheck, Star } from "lucide-react"
import { DIVISION_META, type Warrior } from "./leaderboard-data"
import { cn } from "@/lib/utils"

export function Podium({ top3 }: { top3: Warrior[] }) {
  // Order on screen: 2 (left, shorter) — 1 (center, tallest) — 3 (right, shortest)
  const left = top3.find((w) => w.rank === 2)
  const center = top3.find((w) => w.rank === 1)
  const right = top3.find((w) => w.rank === 3)
  if (!left || !center || !right) return null

  return (
    <div className="relative overflow-hidden border border-line/60 bg-panel/40 bl-glass">
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-30" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      <div className="bl-corners absolute inset-0" />

      {/* Header */}
      <div className="relative flex items-center justify-between border-b border-line/60 px-5 py-3">
        <div className="flex items-center gap-2">
          <Crown className="h-4 w-4 text-gold" />
          <h2 className="font-display text-[12px] font-bold tracking-[0.28em] text-gold">
            TOP 3 EGOISTS
          </h2>
        </div>
        <div className="font-mono text-[10px] tracking-[0.18em] text-text-mute">
          // SEASON_PODIUM
        </div>
      </div>

      {/* Podium */}
      <div className="relative grid grid-cols-3 gap-3 px-4 pt-6 pb-2 md:gap-6 md:px-8">
        <PodiumColumn warrior={left} place={2} height="md" />
        <PodiumColumn warrior={center} place={1} height="lg" />
        <PodiumColumn warrior={right} place={3} height="sm" />
      </div>
    </div>
  )
}

function PodiumColumn({
  warrior,
  place,
  height,
}: {
  warrior: Warrior
  place: 1 | 2 | 3
  height: "sm" | "md" | "lg"
}) {
  const div = DIVISION_META[warrior.division]
  const accentMap = {
    1: { ring: "border-gold", glow: "bg-gold/30", text: "text-gold", bar: "from-gold/80 to-gold/20" },
    2: { ring: "border-text/60", glow: "bg-text/15", text: "text-text", bar: "from-text/60 to-text/10" },
    3: { ring: "border-ember/60", glow: "bg-ember/25", text: "text-ember", bar: "from-ember/70 to-ember/10" },
  }[place]

  const heights = { sm: "h-24", md: "h-32", lg: "h-44" }
  const podiumHeight = heights[height]

  const Medal = place === 1 ? Crown : place === 2 ? ShieldCheck : Flame

  return (
    <div className="flex flex-col items-center">
      {/* Crown / medal floating */}
      <div className="relative">
        <div className={cn("absolute inset-0 rounded-full blur-2xl", accentMap.glow)} />
        <div
          className={cn(
            "relative flex h-7 items-center gap-1 border bg-void px-2 font-display text-[10px] font-bold tracking-[0.2em]",
            accentMap.ring,
            accentMap.text,
          )}
        >
          <Medal className="h-3 w-3" />
          {place === 1 ? "CHAMPION" : place === 2 ? "RUNNER-UP" : "BRONZE"}
        </div>
      </div>

      {/* Avatar */}
      <div className="relative mt-3">
        <div className={cn("absolute inset-0 rounded-full blur-xl", accentMap.glow)} />
        <div
          className={cn(
            "relative flex items-center justify-center border-2 bg-void font-display font-bold bl-clip-notch",
            accentMap.ring,
            accentMap.text,
            place === 1 ? "h-20 w-20 text-3xl" : "h-16 w-16 text-2xl",
          )}
        >
          {warrior.username.slice(0, 1).toUpperCase()}
        </div>
        <div
          className={cn(
            "absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center border-2 bg-void font-display text-sm font-bold",
            accentMap.ring,
            accentMap.text,
          )}
        >
          {place}
        </div>
      </div>

      {/* Name */}
      <div className="mt-3 text-center">
        <div
          className={cn(
            "truncate font-display font-bold leading-tight",
            place === 1 ? "text-lg text-text" : "text-base text-text",
          )}
        >
          {warrior.username}
        </div>
        <div className="mt-0.5 truncate font-mono text-[10px] tracking-tight text-text-mute">
          {warrior.handle}
        </div>
      </div>

      {/* Division pill */}
      <div
        className={cn(
          "mt-2 inline-flex items-center gap-1 border px-2 py-0.5 font-display text-[9px] font-bold tracking-[0.2em]",
          div.ring,
          div.bg,
          div.accent,
        )}
      >
        {div.label} {warrior.divisionTier}
      </div>

      {/* LP */}
      <div className="mt-1 flex items-baseline gap-1">
        <span className={cn("font-display text-xl font-bold leading-none", accentMap.text)}>
          {warrior.lp.toLocaleString()}
        </span>
        <span className="font-mono text-[10px] tracking-[0.15em] text-text-mute">LP</span>
      </div>

      {/* Pedestal */}
      <div className="relative mt-3 w-full">
        <div
          className={cn(
            "relative w-full border bl-clip-notch",
            podiumHeight,
            accentMap.ring,
          )}
        >
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-b opacity-60",
              accentMap.bar,
            )}
          />
          <div className="pointer-events-none absolute inset-0 bl-scanline opacity-50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className={cn(
                "font-display font-bold leading-none tracking-tight bl-glitch",
                accentMap.text,
                place === 1 ? "text-7xl text-glow" : "text-5xl",
              )}
            >
              {place}
            </span>
          </div>

          {/* Stat row at base */}
          <div className="absolute inset-x-0 bottom-2 flex items-center justify-around font-mono text-[10px] tracking-[0.1em] text-text">
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 text-gold" />
              {warrior.wins}W
            </div>
            <div className="text-text-mute">{warrior.winRate}%</div>
          </div>
        </div>
      </div>
    </div>
  )
}
