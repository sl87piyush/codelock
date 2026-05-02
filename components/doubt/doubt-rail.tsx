import { Flame, Trophy, Lightbulb } from "lucide-react"
import { TRENDING_TOPICS, TOP_HELPERS } from "./doubt-data"
import { DoubtAvatar } from "./doubt-avatar"

export function DoubtRail() {
  return (
    <aside className="flex flex-col gap-4">
      <TrendingTopics />
      <TopHelpers />
      <HelperRules />
    </aside>
  )
}

function TrendingTopics() {
  return (
    <div className="relative overflow-hidden border border-line/60 bg-panel/40 bl-glass">
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-20" />
      <div className="relative px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="h-3.5 w-3.5 text-ember" />
            <h3 className="font-display text-[11px] font-bold tracking-[0.22em] text-text">
              TRENDING TOPICS
            </h3>
          </div>
          <span className="font-mono text-[10px] tracking-[0.18em] text-ember">
            24H
          </span>
        </div>

        <ul className="mt-3 flex flex-col gap-1.5">
          {TRENDING_TOPICS.map((t, i) => (
            <li
              key={t.id}
              className="group flex items-center gap-3 border border-transparent bg-void/30 px-3 py-2 transition-colors hover:border-line/60 hover:bg-void/60"
            >
              <span className="font-mono text-[11px] tabular-nums text-text-mute group-hover:text-neon transition-colors">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-1 flex-col leading-tight">
                <span className="text-[13px] font-medium text-text group-hover:text-neon transition-colors">
                  {t.label}
                </span>
                <span className="font-mono text-[10px] text-text-mute">
                  {t.count} doubts
                </span>
              </div>
              <span className="inline-flex h-5 items-center border border-ember/40 bg-ember/10 px-1.5 font-display text-[10px] font-bold tabular-nums text-ember">
                {t.delta}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function TopHelpers() {
  return (
    <div className="relative overflow-hidden border border-line/60 bg-panel/40 bl-glass">
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-20" />
      <div className="bl-side-stripe" data-side="left" />
      <div className="relative px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="h-3.5 w-3.5 text-gold" />
            <h3 className="font-display text-[11px] font-bold tracking-[0.22em] text-text">
              TOP HELPERS
            </h3>
          </div>
          <span className="font-mono text-[10px] tracking-[0.18em] text-gold">
            S04
          </span>
        </div>

        <ul className="mt-3 flex flex-col gap-1">
          {TOP_HELPERS.map((h) => {
            const rankColor =
              h.rank === 1
                ? "text-gold"
                : h.rank === 2
                  ? "text-electric"
                  : h.rank === 3
                    ? "text-ember"
                    : "text-text-mute"
            return (
              <li
                key={h.username}
                className="group flex items-center gap-3 px-2 py-2 transition-colors hover:bg-void/40"
              >
                <span className={`font-display text-[14px] font-bold tabular-nums ${rankColor}`}>
                  {h.rank}
                </span>
                <DoubtAvatar initial={h.initial} tone={h.avatarTone} size="sm" />
                <div className="flex flex-1 flex-col leading-tight">
                  <span className="text-[13px] font-medium text-text group-hover:text-neon transition-colors">
                    {h.username}
                  </span>
                  <span className="font-display text-[9px] font-bold tracking-[0.22em] text-text-mute">
                    {h.division} · {h.accepted} ACCEPTED
                  </span>
                </div>
                <span className="font-mono text-[11px] tabular-nums text-gold">
                  {h.rep}
                </span>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

function HelperRules() {
  const rules = [
    "Specific titles get 3x more answers",
    "Always paste the failing test case",
    "Tag accurately — it routes to experts",
    "Accepted answers earn +25 reputation",
    "Bounty answers compound LP gains",
  ]
  return (
    <div className="relative overflow-hidden border border-line/60 bg-void/40 bl-glass">
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-15" />
      <div className="relative px-4 py-4">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-3.5 w-3.5 text-neon" />
          <h3 className="font-display text-[11px] font-bold tracking-[0.22em] text-text">
            DOUBT PROTOCOL
          </h3>
        </div>
        <ol className="mt-3 flex flex-col gap-1.5">
          {rules.map((r, i) => (
            <li
              key={r}
              className="flex items-start gap-2.5 text-[12.5px] leading-relaxed text-text-dim"
            >
              <span className="mt-1 inline-flex h-4 w-4 shrink-0 items-center justify-center border border-neon/40 bg-neon/10 font-mono text-[9px] tabular-nums text-neon">
                {i + 1}
              </span>
              {r}
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
