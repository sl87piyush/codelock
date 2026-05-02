import { Crown, Newspaper, Coins } from "lucide-react"
import { TOP_WINNERS, CONTEST_NEWS } from "./contests-data"
import { DoubtAvatar } from "@/components/doubt/doubt-avatar"

export function ContestRail() {
  return (
    <aside className="space-y-4">
      <TopWinners />
      <ProtocolNews />
      <PrizeBank />
    </aside>
  )
}

function TopWinners() {
  return (
    <div className="relative overflow-hidden border border-gold/30 bg-panel/70 bl-glass">
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-25" />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-[3px] bg-gold opacity-60" />

      <div className="relative flex items-center justify-between border-b border-line/60 px-4 py-3">
        <div className="flex items-center gap-2">
          <Crown className="h-4 w-4 text-gold" />
          <span className="font-display text-[11.5px] font-bold tracking-[0.22em] text-text">
            HALL OF CHAMPIONS
          </span>
        </div>
        <span className="font-mono text-[10px] tracking-[0.16em] text-text-mute">SEASON 04</span>
      </div>

      <ul className="relative divide-y divide-line/40">
        {TOP_WINNERS.map((w, i) => {
          const rankColor =
            i === 0 ? "text-gold" : i === 1 ? "text-electric" : i === 2 ? "text-ember" : "text-text-mute"
          return (
            <li
              key={w.handle}
              className="flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-void/40"
            >
              <div
                className={`flex h-7 w-7 items-center justify-center border border-line/60 bg-void/60 font-display text-[12px] font-bold tabular-nums ${rankColor}`}
              >
                {i + 1}
              </div>
              <DoubtAvatar handle={w.handle} size="sm" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="truncate font-mono text-[12.5px] text-text">{w.handle}</span>
                  <span className="font-mono text-[9.5px] tracking-[0.14em] text-text-mute">
                    {w.flag}
                  </span>
                </div>
                <div className="font-display text-[9.5px] font-bold tracking-[0.18em] text-text-mute">
                  {w.titles} TITLES · {w.division}
                </div>
              </div>
              <div className="text-right leading-tight">
                <div className="font-display text-[12px] font-bold text-gold">
                  {(w.lpEarned / 1000).toFixed(1)}k
                </div>
                <div className="font-display text-[8.5px] font-bold tracking-[0.18em] text-text-mute">
                  LP EARNED
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function ProtocolNews() {
  return (
    <div className="relative overflow-hidden border border-line/60 bg-panel/70 bl-glass">
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-20" />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-[3px] bg-neon opacity-60" />

      <div className="relative flex items-center gap-2 border-b border-line/60 px-4 py-3">
        <Newspaper className="h-4 w-4 text-neon" />
        <span className="font-display text-[11.5px] font-bold tracking-[0.22em] text-text">
          PROTOCOL FEED
        </span>
      </div>

      <ul className="relative divide-y divide-line/40">
        {CONTEST_NEWS.map((n) => (
          <li key={n.id} className="px-4 py-3 transition-colors hover:bg-void/40">
            <div className="flex items-center gap-2 pb-1">
              <span className="inline-flex h-4 items-center border border-neon/40 bg-neon/10 px-1.5 font-display text-[8.5px] font-bold tracking-[0.22em] text-neon">
                {n.tag}
              </span>
              <span className="font-mono text-[9.5px] tracking-[0.14em] text-text-mute">
                {n.timeAgo}
              </span>
            </div>
            <div className="text-[12.5px] leading-snug text-text-dim">{n.title}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

function PrizeBank() {
  return (
    <div className="relative overflow-hidden border border-electric/40 bg-panel/70 bl-glass">
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-25" />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-[3px] bg-electric opacity-70" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-electric/10 to-transparent" />

      <div className="relative space-y-3 px-4 py-4">
        <div className="flex items-center gap-2">
          <Coins className="h-4 w-4 text-electric" />
          <span className="font-display text-[11.5px] font-bold tracking-[0.22em] text-text">
            ACTIVE PRIZE BANK
          </span>
        </div>

        <div>
          <div className="font-display text-3xl font-bold leading-none text-electric tabular-nums">
            $387k
            <span className="ml-1 align-middle font-display text-[12px] font-bold tracking-[0.18em] text-text-mute">
              + 245k LP
            </span>
          </div>
          <div className="mt-1 font-mono text-[10.5px] tracking-[0.16em] text-text-mute">
            {"// across 7 active contests"}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <Mini label="LARGEST" value="$100k" />
          <Mini label="SMALLEST" value="2k LP" />
          <Mini label="AVG" value="$28k" />
        </div>
      </div>
    </div>
  )
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-line/60 bg-void/40 px-2 py-1.5">
      <div className="font-display text-[8.5px] font-bold tracking-[0.22em] text-text-mute">
        {label}
      </div>
      <div className="mt-0.5 font-display text-[12px] font-bold text-text">{value}</div>
    </div>
  )
}
