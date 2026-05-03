import { TrendingUp, TrendingDown, Minus, Crown, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"
import { LIVE_STANDINGS_SOLO, USER_STATE, type Track, type StandingRow } from "@/lib/championship-data"

// =============================================================
// LIVE STANDINGS — top 8 of the open lane snapshot, plus the
// current user pinned at the bottom for context.
// =============================================================
export function LiveStandings({ track }: { track: Track }) {
  // We only have live standings authored for solo right now;
  // for duo/clan we still render the same table as a snapshot
  // since the design system + state is what matters for layout.
  const rows = LIVE_STANDINGS_SOLO
  const userState = USER_STATE[track]

  return (
    <section className="relative overflow-hidden border border-line/60 bg-panel/60 bl-glass">
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-20" />

      <div className="relative flex flex-wrap items-end justify-between gap-3 p-5 md:p-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex h-6 items-center gap-1.5 border border-blood/50 bg-blood/15 px-2.5 font-display text-[10px] font-bold tracking-[0.22em] text-blood bl-clip-chevron">
              <span className="relative h-1.5 w-1.5 rounded-full bg-blood">
                <span className="absolute inset-0 rounded-full bg-blood/60 animate-ping" />
              </span>
              LIVE STANDINGS
            </span>
            <span className="font-mono text-[10px] tracking-[0.2em] text-text-mute">
              {`// SNAPSHOT · ${track.toUpperCase()} · OPEN LANE`}
            </span>
          </div>
          <h2 className="mt-2 font-display text-xl font-bold tracking-tight text-text">
            Top of the bracket — <span className="text-neon">right now</span>.
          </h2>
        </div>
        <div className="font-mono text-[10px] tracking-wider text-text-dim">
          UPDATED EVERY 30s
        </div>
      </div>

      {/* Header row */}
      <div className="relative grid grid-cols-[44px_1fr_92px_64px_120px] gap-3 border-y border-line/60 bg-void/40 px-5 py-2 font-display text-[10px] font-bold tracking-[0.22em] text-text-mute md:px-6">
        <span>RANK</span>
        <span>PLAYER</span>
        <span className="text-right">SCORE</span>
        <span className="text-right">Δ</span>
        <span className="text-right">REGION</span>
      </div>

      <ul className="relative">
        {rows.map((r) => (
          <StandingRowLine key={r.rank} row={r} />
        ))}

        {/* Divider before "you" */}
        {userState.rank && userState.rank > rows.length && (
          <li className="relative grid grid-cols-[44px_1fr_92px_64px_120px] items-center gap-3 px-5 py-1 md:px-6">
            <span className="col-span-5 flex items-center gap-2 py-1 font-mono text-[10px] tracking-[0.22em] text-text-mute">
              <span className="h-px flex-1 bg-line/60" />
              <span>···</span>
              <span className="h-px flex-1 bg-line/60" />
            </span>
          </li>
        )}

        {/* Current user (pinned) */}
        {userState.rank && (
          <StandingRowLine
            row={{
              rank: userState.rank,
              name: "You",
              handle: "tonystark",
              score: 3884,
              delta: 12,
              region: "Mumbai",
              isYou: true,
            }}
            highlight
          />
        )}
      </ul>
    </section>
  )
}

function StandingRowLine({ row, highlight = false }: { row: StandingRow; highlight?: boolean }) {
  const DeltaIcon = row.delta > 0 ? TrendingUp : row.delta < 0 ? TrendingDown : Minus
  const deltaColor =
    row.delta > 0 ? "text-neon" : row.delta < 0 ? "text-blood" : "text-text-mute"

  return (
    <li
      className={cn(
        "relative grid grid-cols-[44px_1fr_92px_64px_120px] items-center gap-3 border-b border-line/40 px-5 py-3 md:px-6 transition-colors",
        highlight
          ? "bg-neon/5 border-neon/40"
          : "hover:bg-void/40",
      )}
    >
      {/* Rank */}
      <div className="flex items-center gap-2">
        {row.flair === "champion" && row.rank === 1 ? (
          <Crown className="h-4 w-4 text-gold drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]" fill="currentColor" />
        ) : null}
        <span
          className={cn(
            "font-display text-sm font-bold tabular-nums",
            row.rank === 1 ? "text-gold" : row.rank <= 3 ? "text-neon" : "text-text",
          )}
        >
          #{row.rank}
        </span>
      </div>

      {/* Player */}
      <div className="flex items-center gap-3 min-w-0">
        <div
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center font-display text-xs font-bold bl-clip-chevron",
            highlight
              ? "border border-neon/60 bg-neon/15 text-neon"
              : "border border-line/70 bg-void/60 text-text",
          )}
        >
          {row.name.split(" ").map((p) => p[0]).join("").slice(0, 2)}
        </div>
        <div className="min-w-0">
          <div className="font-display text-sm font-semibold text-text truncate">
            {row.name}
            {row.isYou && (
              <span className="ml-2 inline-flex h-4 items-center border border-neon/60 bg-neon/15 px-1.5 font-display text-[9px] font-bold tracking-[0.18em] text-neon bl-clip-chevron">
                YOU
              </span>
            )}
          </div>
          <div className="font-mono text-[11px] text-text-dim truncate">@{row.handle}</div>
        </div>
      </div>

      {/* Score */}
      <span className="text-right font-display text-sm font-bold tabular-nums text-text">
        {row.score.toLocaleString()}
      </span>

      {/* Delta */}
      <span className={cn("flex items-center justify-end gap-1 font-mono text-[12px] tabular-nums", deltaColor)}>
        <DeltaIcon className="h-3 w-3" />
        {row.delta > 0 ? "+" : ""}
        {row.delta}
      </span>

      {/* Region */}
      <span className="flex items-center justify-end gap-1.5 text-text-dim">
        <MapPin className="h-3 w-3 text-text-mute" />
        <span className="font-display text-[11px] tracking-wide">{row.region}</span>
      </span>
    </li>
  )
}
