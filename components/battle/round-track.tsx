import { Zap } from "lucide-react"
import { cn } from "@/lib/utils"

type Outcome = "blue" | "red" | "live" | "upcoming"

const ROUNDS: { label: string; result: Outcome; note?: string }[] = [
  { label: "R1", result: "blue", note: "2 Sum Extended" },
  { label: "R2", result: "red", note: "Cycle Detect" },
  { label: "R3", result: "blue", note: "Trie Search" },
  { label: "R4", result: "live", note: "Sync Subarray" },
  { label: "R5", result: "upcoming", note: "TBD" },
]

export function RoundTrack() {
  const blueWins = ROUNDS.filter((r) => r.result === "blue").length
  const redWins = ROUNDS.filter((r) => r.result === "red").length

  return (
    <div className="relative overflow-hidden border border-line/80 bg-panel/60 bl-glass">
      <div className="pointer-events-none absolute inset-0 bl-stripes opacity-60" />
      <div className="relative flex flex-col gap-5 px-5 py-5 md:flex-row md:items-center md:gap-8 md:px-7">
        {/* Left score */}
        <div className="flex items-baseline gap-3 md:flex-col md:items-start md:gap-0">
          <div className="font-display text-[10px] font-bold tracking-[0.3em] text-neon/80">
            BLUE LOCK STRIKERS
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-[44px] font-black leading-none text-neon text-glow tabular-nums">
              {blueWins}
            </span>
            <span className="font-mono text-[10px] tracking-[0.2em] text-text-mute">WINS</span>
          </div>
        </div>

        {/* Rounds */}
        <div className="flex flex-1 items-center justify-center gap-2">
          {ROUNDS.map((r) => (
            <RoundChip key={r.label} round={r} />
          ))}
        </div>

        {/* Right score */}
        <div className="flex items-baseline gap-3 md:flex-col md:items-end md:gap-0">
          <div className="font-display text-[10px] font-bold tracking-[0.3em] text-ember/90">
            EGO CRUSHERS
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-[10px] tracking-[0.2em] text-text-mute">WINS</span>
            <span className="font-display text-[44px] font-black leading-none text-ember text-glow-ember tabular-nums">
              {redWins}
            </span>
          </div>
        </div>
      </div>

      {/* Sudden death banner if tied 2-2 next round - not the case, but leave styled chip  */}
      {blueWins === 2 && redWins === 2 && (
        <div className="relative flex items-center justify-center gap-2 border-t border-ember/40 bg-ember/10 py-2">
          <Zap className="h-3.5 w-3.5 text-ember" />
          <span className="font-display text-[11px] font-bold tracking-[0.28em] text-ember">
            SUDDEN DEATH ACTIVATED
          </span>
        </div>
      )}
    </div>
  )
}

function RoundChip({ round }: { round: (typeof ROUNDS)[number] }) {
  const base =
    "group relative flex h-14 w-14 md:h-16 md:w-20 flex-col items-center justify-center border font-display text-[10px] font-bold tracking-[0.2em] bl-clip-chevron"

  if (round.result === "blue") {
    return (
      <div className={cn(base, "border-neon/70 bg-neon/10 text-neon")}>
        <span className="text-[9px] text-neon/70">{round.label}</span>
        <span className="mt-0.5 text-[16px] leading-none text-glow">W</span>
      </div>
    )
  }
  if (round.result === "red") {
    return (
      <div className={cn(base, "border-ember/60 bg-ember/10 text-ember")}>
        <span className="text-[9px] text-ember/70">{round.label}</span>
        <span className="mt-0.5 text-[16px] leading-none text-glow-ember">L</span>
      </div>
    )
  }
  if (round.result === "live") {
    return (
      <div
        className={cn(
          base,
          "border-blood/70 bg-blood/15 text-blood bl-pulse-ember",
        )}
      >
        <span className="text-[9px] text-blood/80">{round.label}</span>
        <span className="mt-0.5 text-[11px] leading-none bl-flicker">LIVE</span>
      </div>
    )
  }
  return (
    <div className={cn(base, "border-line/70 bg-void/40 text-text-mute")}>
      <span className="text-[9px]">{round.label}</span>
      <span className="mt-0.5 text-[14px] leading-none">—</span>
    </div>
  )
}
