import Link from "next/link"
import { Award, ChevronRight, Lightbulb, Medal, TrendingUp } from "lucide-react"
import { ARENA_TIPS, TOP_PERFORMERS } from "./oa-arena-data"

export function OaRail() {
  return (
    <aside className="space-y-5">
      <TopPerformers />
      <ArenaTips />
      <LeaderboardCta />
    </aside>
  )
}

function TopPerformers() {
  return (
    <section className="relative overflow-hidden border border-line/60 bg-panel/60 bl-glass">
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-15" />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-gold/0 via-gold/60 to-gold/0" />
      <header className="relative flex items-center justify-between border-b border-line/40 px-4 py-3">
        <div className="flex items-center gap-2">
          <Award className="h-4 w-4 text-gold" />
          <h3 className="font-display text-[12px] font-bold tracking-[0.22em] text-text">
            HALL OF SCORERS
          </h3>
        </div>
        <span className="font-mono text-[10px] tracking-[0.18em] text-text-mute uppercase">
          This Week
        </span>
      </header>
      <ol className="relative">
        {TOP_PERFORMERS.map((p, i) => {
          const accent =
            i === 0
              ? "text-gold"
              : i === 1
                ? "text-text"
                : i === 2
                  ? "text-ember"
                  : "text-text-dim"
          return (
            <li
              key={p.handle}
              className="flex items-center justify-between border-b border-line/30 px-4 py-2.5 last:border-b-0"
            >
              <div className="flex items-center gap-3">
                <span className={`font-display text-[14px] font-bold tabular-nums ${accent}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <div className="font-display text-[12px] font-bold tracking-tight text-text">
                    {p.handle}
                  </div>
                  <div className="font-mono text-[10px] text-text-mute truncate">{p.role}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-display text-[14px] font-bold leading-none text-neon">
                  {p.score}
                </div>
                <div className="mt-0.5 font-mono text-[9.5px] text-text-mute">
                  {p.percentile}%ile
                </div>
              </div>
            </li>
          )
        })}
      </ol>
      <Link
        href="/leaderboard"
        className="group relative flex items-center justify-between border-t border-line/40 px-4 py-2.5 font-display text-[10.5px] font-bold tracking-[0.22em] text-text-dim hover:text-neon transition-colors"
      >
        <span className="inline-flex items-center gap-2">
          <Medal className="h-3.5 w-3.5" />
          GLOBAL LEADERBOARD
        </span>
        <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </section>
  )
}

function ArenaTips() {
  return (
    <section className="relative overflow-hidden border border-line/60 bg-panel/60 bl-glass">
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-15" />
      <header className="relative flex items-center justify-between border-b border-line/40 px-4 py-3">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-electric" />
          <h3 className="font-display text-[12px] font-bold tracking-[0.22em] text-text">
            ARENA PROTOCOL
          </h3>
        </div>
        <span className="font-mono text-[10px] tracking-[0.18em] text-electric uppercase">
          Tips
        </span>
      </header>
      <ol className="relative space-y-0">
        {ARENA_TIPS.map((t, i) => (
          <li
            key={t.title}
            className="flex gap-3 border-b border-line/30 px-4 py-3 last:border-b-0"
          >
            <span className="font-mono text-[11px] tabular-nums text-electric pt-0.5">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <div className="font-display text-[12px] font-bold tracking-tight text-text">
                {t.title}
              </div>
              <p className="mt-0.5 text-[12px] leading-relaxed text-text-dim">{t.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

function LeaderboardCta() {
  return (
    <section className="relative overflow-hidden border border-neon/40 bg-panel/70 bl-glass">
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-25" />
      <div className="pointer-events-none absolute -right-12 -top-12 h-[180px] w-[180px] rounded-full bg-neon/15 blur-3xl" />
      <div className="relative p-4">
        <div className="inline-flex items-center gap-1.5 border border-neon/40 bg-neon/10 px-2 py-0.5 font-display text-[9.5px] font-bold tracking-[0.22em] text-neon">
          <TrendingUp className="h-3 w-3" /> RANK BOOST
        </div>
        <h3 className="mt-2 font-display text-[16px] font-bold tracking-tight text-text">
          Climb the OA <span className="text-neon">Leaderboard</span>
        </h3>
        <p className="mt-1.5 text-[12px] leading-relaxed text-text-dim">
          Each cleared OA grants LP based on percentile. Top 1% unlocks priority recruiter visibility.
        </p>
        <Link
          href="/leaderboard"
          className="bl-btn-primary bl-clip-notch mt-3 inline-flex items-center gap-2 px-3.5 py-2 font-display text-[10.5px] font-bold tracking-[0.22em]"
        >
          VIEW STANDINGS
          <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  )
}
