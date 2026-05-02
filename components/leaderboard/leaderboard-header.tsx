import { Crown, Flame, Trophy, Users } from "lucide-react"
import { SEASON_INFO } from "./leaderboard-data"

export function LeaderboardHeader() {
  const seasonProgress = Math.round(
    ((SEASON_INFO.totalDays - SEASON_INFO.daysLeft) / SEASON_INFO.totalDays) * 100,
  )

  return (
    <div className="relative overflow-hidden border border-line/60 bg-panel/50 bl-glass">
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-30" />
      <div className="pointer-events-none absolute inset-0 bl-scanline opacity-40" />
      <div className="pointer-events-none absolute -top-32 -right-32 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-neon/10 blur-3xl" />

      <div className="bl-corners absolute inset-0" />

      <div className="relative grid gap-6 p-6 md:p-8 lg:grid-cols-[1.4fr_1fr]">
        {/* Left — title */}
        <div className="flex flex-col">
          <div className="inline-flex w-fit items-center gap-2 border border-gold/40 bg-gold/10 px-3 py-1 font-mono text-[10px] tracking-[0.22em] text-gold bl-clip-chevron">
            <Trophy className="h-3 w-3" />
            HALL OF EGOISTS · {SEASON_INFO.name.toUpperCase()}
          </div>

          <h1 className="mt-4 font-display text-4xl font-bold leading-[0.95] tracking-tight md:text-5xl">
            Only the <span className="text-neon text-glow bl-glitch">strongest</span>
            <br />
            survive the rankings.
          </h1>

          <p className="mt-3 max-w-lg text-pretty text-[14px] leading-relaxed text-text-dim">
            {SEASON_INFO.codename} — every battle redraws the order. Climb divisions, hunt
            rivals, secure your name in the Hall.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Stat icon={Users} label="WARRIORS" value={SEASON_INFO.participants} />
            <Stat icon={Trophy} label="PRIZE POOL" value={SEASON_INFO.prizePool} accent="gold" />
            <Stat
              icon={Flame}
              label="DAYS LEFT"
              value={`${SEASON_INFO.daysLeft}d`}
              accent="ember"
            />
          </div>
        </div>

        {/* Right — season progress card */}
        <div className="relative border border-gold/40 bg-void/60 p-5 bl-clip-notch">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-transparent via-gold to-transparent" />

          <div className="flex items-center gap-2">
            <Crown className="h-4 w-4 text-gold" />
            <span className="font-display text-[10px] font-bold tracking-[0.28em] text-gold/90">
              SEASON CHAMPION TRACK
            </span>
          </div>

          <div className="mt-4 flex items-end gap-4">
            <div>
              <div className="font-display text-[10px] font-bold tracking-[0.18em] text-text-mute">
                CURRENT
              </div>
              <div className="mt-1 font-display text-3xl font-bold tracking-tight text-text">
                Day{" "}
                <span className="text-gold">
                  {SEASON_INFO.totalDays - SEASON_INFO.daysLeft}
                </span>
                <span className="text-text-mute">/{SEASON_INFO.totalDays}</span>
              </div>
            </div>
            <div className="ml-auto text-right">
              <div className="font-display text-[10px] font-bold tracking-[0.18em] text-text-mute">
                COMPLETE
              </div>
              <div className="mt-1 font-mono text-2xl font-bold text-gold">
                {seasonProgress}%
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="relative mt-4 h-2 overflow-hidden border border-line/80 bg-void">
            <div
              className="relative h-full bg-gradient-to-r from-gold/60 via-gold to-ember"
              style={{ width: `${seasonProgress}%` }}
            >
              <div className="absolute inset-0 bl-shimmer" />
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between font-mono text-[10px] tracking-[0.15em] text-text-mute">
            <span>S04 START</span>
            <span className="text-gold">FINALS · {SEASON_INFO.daysLeft}d</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function Stat({
  icon: Icon,
  label,
  value,
  accent = "neon",
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  accent?: "neon" | "gold" | "ember"
}) {
  const accentClasses = {
    neon: "border-neon/30 text-neon",
    gold: "border-gold/40 text-gold",
    ember: "border-ember/40 text-ember",
  }[accent]

  return (
    <div
      className={`inline-flex items-center gap-2 border bg-void/50 px-3 py-1.5 ${accentClasses}`}
    >
      <Icon className="h-3.5 w-3.5" />
      <span className="font-display text-[10px] font-bold tracking-[0.2em] opacity-80">
        {label}
      </span>
      <span className="font-mono text-[12px] font-bold tracking-tight text-text">
        {value}
      </span>
    </div>
  )
}
