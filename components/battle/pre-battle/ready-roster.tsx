"use client"

import { CheckCircle2, Clock, Crown, Loader2, Wifi } from "lucide-react"
import type { Team, Player } from "@/components/battle/team-panel"
import { cn } from "@/lib/utils"

type Readiness = "ready" | "waiting" | "syncing"

const READINESS: Record<string, Readiness> = {
  tonystark: "ready",
  nightowl: "ready",
  isagi_y: "ready",
  bachira: "syncing",
}

export function ReadyRoster({ blue, red }: { blue: Team; red: Team }) {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      <SideRoster team={blue} />
      <SideRoster team={red} />
    </div>
  )
}

function SideRoster({ team }: { team: Team }) {
  const isBlue = team.accent === "neon"
  const accentText = isBlue ? "text-neon" : "text-ember"
  const accentBorder = isBlue ? "border-neon/40" : "border-ember/40"
  const stripe = isBlue ? "bl-side-stripe" : "bl-side-stripe bl-side-stripe-ember"
  const readyCount = team.players.filter((p) => READINESS[p.handle] === "ready").length

  return (
    <div
      className={cn(
        "relative overflow-hidden border bg-panel/60 bl-glass bl-corners",
        accentBorder,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-25" />
      <div className={cn("relative", stripe)}>
        <header className={cn("flex items-center justify-between border-b border-line/60 px-5 py-3", isBlue ? "bg-neon/5" : "bg-ember/5")}>
          <div className="flex items-center gap-3">
            <span className={cn("font-display text-[13px] font-bold tracking-tight", accentText)}>
              {team.name}
            </span>
            <span
              className={cn(
                "inline-flex h-[18px] items-center border px-1.5 font-display text-[9px] font-bold tracking-[0.2em] bl-clip-chevron",
                isBlue ? "border-neon/40 bg-neon/10 text-neon" : "border-ember/40 bg-ember/10 text-ember",
              )}
            >
              SEED {team.seed}
            </span>
          </div>
          <span className="font-mono text-[11px] tracking-[0.14em] text-text-dim">
            READY <span className={accentText}>{readyCount}</span>/2
          </span>
        </header>

        <div className="flex flex-col gap-3 p-4 md:p-5">
          {team.players.map((p, i) => (
            <PlayerReadyRow key={p.handle} player={p} accent={team.accent} isCaptain={i === 0} />
          ))}
        </div>
      </div>
    </div>
  )
}

function PlayerReadyRow({
  player,
  accent,
  isCaptain,
}: {
  player: Player
  accent: "neon" | "ember"
  isCaptain: boolean
}) {
  const isBlue = accent === "neon"
  const readiness = READINESS[player.handle] ?? "waiting"

  return (
    <div className="relative overflow-hidden border border-line/70 bg-void/50 p-4">
      <div className="flex items-center gap-3">
        <div className="relative shrink-0">
          {isCaptain && (
            <Crown className="absolute -top-3 left-1/2 h-3.5 w-3.5 -translate-x-1/2 text-gold drop-shadow-[0_0_8px_rgba(251,191,36,0.7)]" />
          )}
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center border font-display text-[18px] font-black bl-clip-notch",
              isBlue ? "border-neon/60 bg-neon/10 text-neon" : "border-ember/60 bg-ember/10 text-ember",
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
            <span
              className={cn(
                "px-1 py-px font-display text-[9px] font-bold tracking-[0.18em]",
                isBlue ? "text-neon" : "text-ember",
              )}
            >
              {player.role}
            </span>
          </div>
          <div className="mt-0.5 flex items-center gap-2 font-mono text-[10.5px] tracking-[0.1em] text-text-dim">
            <span>{player.rank}</span>
            <span className="text-text-mute">·</span>
            <span className="text-text">{player.lp.toLocaleString()} LP</span>
            <span className="text-text-mute">·</span>
            <Wifi className="h-3 w-3 text-neon" />
            <span className="text-text-dim">12ms</span>
          </div>
        </div>

        <ReadinessPill state={readiness} />
      </div>
    </div>
  )
}

function ReadinessPill({ state }: { state: Readiness }) {
  const map = {
    ready: {
      icon: CheckCircle2,
      label: "READY",
      tone: "text-neon border-neon/50 bg-neon/10 text-glow",
      spin: false,
    },
    waiting: {
      icon: Clock,
      label: "WAITING",
      tone: "text-text-mute border-line bg-void",
      spin: false,
    },
    syncing: {
      icon: Loader2,
      label: "SYNCING",
      tone: "text-gold border-gold/40 bg-gold/10",
      spin: true,
    },
  } as const
  const entry = map[state]
  const Icon = entry.icon
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1 border px-2 py-1 font-display text-[10px] font-bold tracking-[0.18em]",
        entry.tone,
      )}
    >
      <Icon className={cn("h-3.5 w-3.5", entry.spin && "animate-spin")} />
      {entry.label}
    </span>
  )
}
