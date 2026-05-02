import { Coins, Lock, ScrollText, Swords, Timer, Trophy, Users } from "lucide-react"

export function MatchBriefing() {
  return (
    <div className="relative overflow-hidden border border-line bg-panel/60 bl-glass bl-corners">
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-20" />
      <div className="relative">
        <header className="flex items-center justify-between border-b border-line/60 px-5 py-3 bl-side-stripe">
          <div className="flex items-center gap-2">
            <ScrollText className="h-4 w-4 text-neon" />
            <span className="font-display text-[13px] font-bold tracking-[0.2em] text-text text-glow">
              MATCH BRIEFING
            </span>
          </div>
          <span className="font-mono text-[10px] tracking-[0.14em] text-text-mute">
            PROTOCOL v3.2
          </span>
        </header>

        <div className="grid grid-cols-2 gap-px bg-line/30 md:grid-cols-3">
          <Info icon={Swords} label="MODE" value="Duo Battle" sub="2 vs 2" />
          <Info icon={Trophy} label="FORMAT" value="Best of 5" sub="Sudden death on 2-2" />
          <Info icon={Timer} label="ROUND LIMIT" value="15:00" sub="Per round" />
          <Info icon={Coins} label="STAKES" value="+28 LP" sub="Winner takes" tone="gold" />
          <Info icon={Lock} label="DIFFICULTY" value="Hard" sub="Mixed topics" tone="ember" />
          <Info icon={Users} label="SPECTATORS" value="312" sub="Public arena" />
        </div>

        {/* Rules */}
        <div className="border-t border-line/60 px-5 py-4">
          <div className="mb-2 flex items-center gap-2">
            <span className="font-display text-[10px] font-bold tracking-[0.22em] text-text-mute">
              RULES
            </span>
            <span className="font-mono text-[10px] text-neon/70">{"// arbitrated"}</span>
          </div>
          <ul className="grid grid-cols-1 gap-2 font-mono text-[11.5px] leading-relaxed text-text-dim md:grid-cols-2">
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 bg-neon" />
              One active coder per team per round. Teammate supports via chat only.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 bg-neon" />
              Each team gets 1 timeout (60s) per match. Cannot stack.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 bg-ember" />
              Copy-paste from external sources auto-disqualifies the round.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 bg-ember" />
              Surrender forfeits current round, not the whole match.
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

function Info({
  icon: Icon,
  label,
  value,
  sub,
  tone = "neon",
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  sub: string
  tone?: "neon" | "ember" | "gold"
}) {
  const toneMap = {
    neon: "text-neon",
    ember: "text-ember",
    gold: "text-gold",
  }
  return (
    <div className="flex flex-col gap-1 bg-void/50 px-4 py-3.5">
      <div className="flex items-center gap-1.5">
        <Icon className={`h-3.5 w-3.5 ${toneMap[tone]}`} />
        <span className="font-display text-[9.5px] font-bold tracking-[0.22em] text-text-mute">
          {label}
        </span>
      </div>
      <span className={`font-display text-[18px] font-bold leading-none ${toneMap[tone]}`}>
        {value}
      </span>
      <span className="font-mono text-[10.5px] tracking-[0.08em] text-text-dim">{sub}</span>
    </div>
  )
}
