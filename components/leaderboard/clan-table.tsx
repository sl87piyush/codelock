import { Minus, Shield, TrendingDown, TrendingUp, Users } from "lucide-react"
import { CLANS } from "./leaderboard-data"
import { cn } from "@/lib/utils"

export function ClanTable() {
  return (
    <div className="relative overflow-hidden border border-line/60 bg-panel/40 bl-glass">
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-20" />

      <div className="relative flex items-center justify-between border-b border-line/60 px-4 py-3 md:px-5">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-neon" />
          <h2 className="font-display text-[12px] font-bold tracking-[0.28em] text-text">
            CLAN STANDINGS
          </h2>
          <span className="inline-flex items-center border border-neon/40 bg-neon/10 px-1.5 py-0.5 font-mono text-[10px] tracking-[0.15em] text-neon">
            {CLANS.length}
          </span>
        </div>
      </div>

      <div className="hidden border-b border-line/40 bg-void/40 md:grid md:grid-cols-[64px_minmax(240px,2fr)_120px_120px_140px_60px] md:gap-4 md:px-5">
        {["RANK", "CLAN", "MEMBERS", "LP", "WIN RATE", "Δ"].map((c) => (
          <div
            key={c}
            className="py-2 font-display text-[10px] font-bold tracking-[0.22em] text-text-mute"
          >
            {c}
          </div>
        ))}
      </div>

      <div className="relative">
        {CLANS.map((clan) => {
          const delta =
            clan.prevRank == null ? null : clan.prevRank - clan.rank
          return (
            <div
              key={clan.tag}
              className={cn(
                "grid grid-cols-[44px_1fr_auto] items-center gap-3 border-b border-line/40 px-4 py-3 transition-colors hover:bg-panel/60 md:grid-cols-[64px_minmax(240px,2fr)_120px_120px_140px_60px] md:gap-4 md:px-5",
                clan.isYours && "bg-neon/[0.06] border-l-2 border-l-neon",
              )}
            >
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "font-display text-2xl font-bold leading-none tracking-tight md:text-3xl",
                    clan.rank === 1 && "text-gold",
                    clan.rank === 2 && "text-text",
                    clan.rank === 3 && "text-ember",
                    clan.rank > 3 && "text-text",
                  )}
                >
                  {clan.rank.toString().padStart(2, "0")}
                </span>
              </div>

              <div className="flex min-w-0 items-center gap-3">
                <div
                  className={cn(
                    "flex h-11 w-11 shrink-0 items-center justify-center border bg-void font-display text-[11px] font-bold tracking-[0.1em] bl-clip-notch",
                    clan.isYours ? "border-neon text-neon" : "border-line/70 text-text",
                  )}
                >
                  {clan.tag}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="truncate font-display text-[15px] font-semibold text-text">
                      {clan.name}
                    </span>
                    {clan.isYours && (
                      <span className="inline-flex h-4 items-center border border-neon/60 bg-neon/15 px-1.5 font-display text-[9px] font-bold tracking-[0.18em] text-neon">
                        YOURS
                      </span>
                    )}
                  </div>
                  <div className="mt-0.5 flex items-center gap-3 font-mono text-[11px] text-text-mute md:hidden">
                    <span>{clan.members}m</span>
                    <span>{clan.lp.toLocaleString()} LP</span>
                    <span>{clan.winRate}%</span>
                  </div>
                </div>
              </div>

              <div className="hidden md:flex md:items-center md:gap-2">
                <Users className="h-3.5 w-3.5 text-text-mute" />
                <span className="font-mono text-[13px] font-semibold text-text">
                  {clan.members}
                </span>
              </div>

              <div className="hidden font-display text-base font-bold text-text md:block">
                {clan.lp.toLocaleString()}
                <span className="ml-1 font-mono text-[10px] text-text-mute">LP</span>
              </div>

              <div className="hidden md:block">
                <div className="flex items-center gap-2">
                  <div className="relative h-1.5 w-20 overflow-hidden border border-line/80 bg-void">
                    <div
                      className={cn(
                        "h-full",
                        clan.winRate >= 80
                          ? "bg-neon"
                          : clan.winRate >= 65
                            ? "bg-electric"
                            : "bg-gold",
                      )}
                      style={{ width: `${clan.winRate}%` }}
                    />
                  </div>
                  <span className="font-mono text-[12px] font-semibold text-text">
                    {clan.winRate}%
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-end">
                {delta == null || delta === 0 ? (
                  <Minus className="h-3 w-3 text-text-mute" />
                ) : delta > 0 ? (
                  <span className="inline-flex items-center gap-0.5 font-mono text-[11px] font-bold text-neon">
                    <TrendingUp className="h-3.5 w-3.5" />
                    {delta}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-0.5 font-mono text-[11px] font-bold text-ember">
                    <TrendingDown className="h-3.5 w-3.5" />
                    {Math.abs(delta)}
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
