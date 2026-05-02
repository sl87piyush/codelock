import { Crown, Star, CheckCircle2, Loader2, Bug, Code, Pencil } from "lucide-react"
import { cn } from "@/lib/utils"

export type PlayerStatus = "passed" | "compiling" | "typing" | "debugging" | "idle"

export type Player = {
  handle: string
  role: "CAPTAIN" | "STRIKER" | "MIDFIELDER" | "DEFENDER"
  rank: string
  lp: number
  tests: { passed: number; total: number }
  submissions: number
  attempts: number
  wpm: number
  accuracy: number
  status: PlayerStatus
  initial: string
}

export type Team = {
  name: string
  tagline: string
  accent: "neon" | "ember"
  seed: string
  players: [Player, Player]
  roundScore: number
  matchupElo: number
}

export function TeamPanel({ team, align }: { team: Team; align: "left" | "right" }) {
  const isBlue = team.accent === "neon"
  const accentText = isBlue ? "text-neon" : "text-ember"
  const accentBorder = isBlue ? "border-neon/40" : "border-ember/40"
  const accentBg = isBlue ? "bg-neon/5" : "bg-ember/5"
  const stripe = isBlue ? "bl-side-stripe" : "bl-side-stripe bl-side-stripe-ember"
  const glow = isBlue ? "text-glow" : "text-glow-ember"
  const rightSide = align === "right"

  return (
    <div
      className={cn(
        "relative overflow-hidden border bg-panel/60 bl-glass bl-corners",
        accentBorder,
      )}
    >
      <div className={cn("pointer-events-none absolute inset-0 bl-grid opacity-30")} />
      <div className={cn("relative", stripe)}>
        {/* Team header */}
        <div
          className={cn(
            "relative flex items-center gap-4 border-b border-line/60 px-5 py-4",
            accentBg,
          )}
        >
          <div
            className={cn(
              "flex h-12 w-12 shrink-0 items-center justify-center border font-display text-[20px] font-black bl-clip-notch",
              isBlue
                ? "border-neon/70 bg-neon/10 text-neon glow-neon"
                : "border-ember/70 bg-ember/10 text-ember glow-ember",
            )}
          >
            {isBlue ? "B" : "R"}
          </div>
          <div className={cn("min-w-0 flex-1", rightSide && "md:text-right")}>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className={cn("font-display text-[16px] font-bold tracking-tight text-text", glow)}>
                {team.name}
              </h3>
              <span
                className={cn(
                  "inline-flex h-[18px] items-center px-1.5 font-display text-[9px] font-bold tracking-[0.18em] bl-clip-chevron",
                  isBlue
                    ? "bg-neon/15 text-neon border border-neon/40"
                    : "bg-ember/15 text-ember border border-ember/40",
                )}
              >
                SEED {team.seed}
              </span>
            </div>
            <div className="mt-0.5 font-mono text-[11px] text-text-dim">{team.tagline}</div>
          </div>
          {/* Round wins indicator */}
          <div className={cn("flex flex-col items-center gap-0.5", rightSide && "md:order-first")}>
            <span className="font-display text-[9px] font-bold tracking-[0.24em] text-text-mute">
              ROUND
            </span>
            <span
              className={cn(
                "font-display text-[28px] font-black leading-none tabular-nums",
                accentText,
                glow,
              )}
            >
              {team.roundScore}
            </span>
          </div>
        </div>

        {/* Players */}
        <div className="flex flex-col gap-3 p-4 md:p-5">
          {team.players.map((p, i) => (
            <PlayerRow key={p.handle} player={p} accent={team.accent} showCrown={i === 0} />
          ))}
        </div>

        {/* Matchup meta */}
        <div className="relative flex items-center justify-between border-t border-line/60 px-5 py-3">
          <div className="flex items-center gap-2">
            <Star className={cn("h-3.5 w-3.5", accentText)} />
            <span className="font-mono text-[10px] tracking-[0.18em] text-text-dim">
              TEAM ELO
            </span>
          </div>
          <span className={cn("font-display text-[15px] font-bold tabular-nums", accentText)}>
            {team.matchupElo.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  )
}

function PlayerRow({
  player,
  accent,
  showCrown,
}: {
  player: Player
  accent: "neon" | "ember"
  showCrown: boolean
}) {
  const isBlue = accent === "neon"
  const pct = Math.round((player.tests.passed / player.tests.total) * 100)

  return (
    <div
      className={cn(
        "relative overflow-hidden border border-line/70 bg-void/50 p-4 transition",
        "hover:border-line-bright/80",
      )}
    >
      {/* Row head */}
      <div className="flex items-start gap-3">
        <div className="relative shrink-0">
          {showCrown && (
            <Crown
              className={cn(
                "absolute -top-3 left-1/2 h-3.5 w-3.5 -translate-x-1/2",
                "text-gold drop-shadow-[0_0_8px_rgba(251,191,36,0.7)]",
              )}
            />
          )}
          <div
            className={cn(
              "flex h-11 w-11 items-center justify-center border font-display text-[18px] font-black bl-clip-notch",
              isBlue
                ? "border-neon/60 bg-neon/10 text-neon"
                : "border-ember/60 bg-ember/10 text-ember",
            )}
          >
            {player.initial}
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="truncate font-display text-[14px] font-bold text-text">
              {player.handle}
            </span>
            <StatusPill status={player.status} accent={accent} />
          </div>
          <div className="mt-0.5 flex items-center gap-2 font-mono text-[10.5px] tracking-[0.1em] text-text-dim">
            <span
              className={cn(
                "inline-block px-1.5 py-px font-display font-bold tracking-[0.18em]",
                isBlue ? "text-neon" : "text-ember",
              )}
            >
              {player.role}
            </span>
            <span className="text-text-mute">·</span>
            <span className="text-text-dim">{player.rank}</span>
            <span className="text-text-mute">·</span>
            <span className="text-text">{player.lp.toLocaleString()} LP</span>
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-end">
          <span className="font-display text-[9px] font-bold tracking-[0.22em] text-text-mute">
            TESTS
          </span>
          <span
            className={cn(
              "font-mono text-[15px] font-bold leading-none tabular-nums",
              pct === 100 ? "text-neon text-glow" : "text-text",
            )}
          >
            {player.tests.passed}
            <span className="text-text-mute">/{player.tests.total}</span>
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-3 bl-bar-track relative h-2 overflow-hidden">
        <div
          className={cn(
            "relative h-full transition-[width] duration-700",
            isBlue
              ? "bg-gradient-to-r from-electric via-neon to-neon-soft"
              : "bg-gradient-to-r from-ember via-ember-soft to-gold",
          )}
          style={{ width: `${pct}%` }}
        >
          <div className="absolute inset-0 opacity-60 bl-shimmer mix-blend-screen" />
        </div>
      </div>

      {/* Stats strip */}
      <div className="mt-3 grid grid-cols-4 gap-2">
        <Stat label="SUBS" value={player.submissions} />
        <Stat label="ATTEMPTS" value={player.attempts} />
        <Stat label="WPM" value={player.wpm} />
        <Stat label="ACC" value={`${player.accuracy}%`} />
      </div>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex flex-col items-center justify-center border border-line/60 bg-void/60 py-1.5">
      <span className="font-display text-[8.5px] font-bold tracking-[0.22em] text-text-mute">
        {label}
      </span>
      <span className="font-mono text-[12px] font-bold tabular-nums text-text">{value}</span>
    </div>
  )
}

function StatusPill({ status, accent }: { status: PlayerStatus; accent: "neon" | "ember" }) {
  const isBlue = accent === "neon"

  const map: Record<
    PlayerStatus,
    { label: string; icon: React.ComponentType<{ className?: string }>; tone: string }
  > = {
    passed: {
      label: "CLEARED",
      icon: CheckCircle2,
      tone: "text-neon border-neon/50 bg-neon/10",
    },
    compiling: {
      label: "COMPILING",
      icon: Loader2,
      tone: isBlue
        ? "text-neon border-neon/50 bg-neon/10"
        : "text-ember border-ember/50 bg-ember/10",
    },
    typing: {
      label: "TYPING",
      icon: Pencil,
      tone: "text-gold border-gold/40 bg-gold/10",
    },
    debugging: {
      label: "DEBUGGING",
      icon: Bug,
      tone: "text-blood border-blood/40 bg-blood/10",
    },
    idle: {
      label: "IDLE",
      icon: Code,
      tone: "text-text-mute border-line bg-void",
    },
  }
  const entry = map[status]
  const Icon = entry.icon
  const spin = status === "compiling" ? "animate-spin" : ""
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 border px-1.5 py-0.5 font-display text-[9px] font-bold tracking-[0.18em]",
        entry.tone,
      )}
    >
      <Icon className={cn("h-3 w-3", spin)} />
      {entry.label}
    </span>
  )
}
