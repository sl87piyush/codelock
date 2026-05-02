"use client"

import { cn } from "@/lib/utils"
import { Bot, Lock, Swords, Users, Zap } from "lucide-react"
import type { BattleMode } from "@/components/battle/entry-data"

type Props = {
  mode: BattleMode
  selected: boolean
  onSelect: (id: BattleMode["id"]) => void
}

const MODE_ICON = {
  quick: Zap,
  ranked: Swords,
  custom: Lock,
  practice: Bot,
} as const

const ACCENT_MAP = {
  neon: {
    text: "text-neon",
    border: "border-neon/60",
    bg: "bg-neon/10",
    shadowOn: "shadow-[0_0_0_1px_rgba(0,240,255,0.35),0_0_40px_-4px_rgba(0,240,255,0.4)]",
    glow: "bg-neon/15",
    accentBar: "bg-neon",
  },
  ember: {
    text: "text-ember",
    border: "border-ember/60",
    bg: "bg-ember/10",
    shadowOn: "shadow-[0_0_0_1px_rgba(255,106,61,0.35),0_0_40px_-4px_rgba(255,106,61,0.45)]",
    glow: "bg-ember/15",
    accentBar: "bg-ember",
  },
  gold: {
    text: "text-gold",
    border: "border-gold/60",
    bg: "bg-gold/10",
    shadowOn: "shadow-[0_0_0_1px_rgba(255,204,102,0.35),0_0_40px_-4px_rgba(255,204,102,0.4)]",
    glow: "bg-gold/15",
    accentBar: "bg-gold",
  },
  violet: {
    text: "text-electric",
    border: "border-electric/60",
    bg: "bg-electric/10",
    shadowOn: "shadow-[0_0_0_1px_rgba(139,178,255,0.35),0_0_40px_-4px_rgba(139,178,255,0.4)]",
    glow: "bg-electric/15",
    accentBar: "bg-electric",
  },
} as const

export function ModeCard({ mode, selected, onSelect }: Props) {
  const Icon = MODE_ICON[mode.id]
  const a = ACCENT_MAP[mode.accent]

  return (
    <button
      type="button"
      onClick={() => onSelect(mode.id)}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden border bg-panel/70 p-5 text-left transition duration-300",
        selected
          ? `${a.border} ${a.shadowOn}`
          : "border-line hover:border-line/70",
      )}
    >
      {/* Background patterns */}
      <span className="pointer-events-none absolute inset-0 bl-grid opacity-20" />
      <span
        className={cn(
          "pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full blur-3xl transition-opacity",
          a.glow,
          selected ? "opacity-100" : "opacity-30 group-hover:opacity-60",
        )}
      />
      <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line to-transparent" />

      {/* Selected indicator — side stripe */}
      {selected && (
        <span className={cn("pointer-events-none absolute left-0 top-0 h-full w-[3px]", a.accentBar)} />
      )}

      {/* Featured badge */}
      {mode.badge && (
        <span className="absolute right-3 top-3 inline-flex items-center gap-1 border border-gold/50 bg-gold/15 px-1.5 py-0.5 font-display text-[9px] font-bold tracking-[0.22em] text-gold bl-clip-chevron">
          {mode.badge}
        </span>
      )}

      {/* Head */}
      <div className="relative flex items-start gap-3">
        <div
          className={cn(
            "flex h-11 w-11 flex-shrink-0 items-center justify-center border transition",
            selected ? `${a.border} ${a.bg} ${a.text}` : "border-line/70 bg-void text-text-dim group-hover:text-text",
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] tracking-[0.16em] text-text-mute">
              {mode.code}
            </span>
            {mode.ranked && (
              <span className="font-mono text-[9px] tracking-[0.14em] text-neon/80">
                · RANKED
              </span>
            )}
          </div>
          <h3
            className={cn(
              "mt-0.5 font-display text-lg font-black tracking-tight transition",
              selected ? a.text : "text-text",
            )}
          >
            {mode.name}
          </h3>
          <p className={cn("mt-0.5 font-mono text-[10px] tracking-[0.12em]", "text-text-dim")}>
            {mode.tagline}
          </p>
        </div>
      </div>

      {/* Body */}
      <p className="relative mt-4 text-pretty text-sm leading-relaxed text-text-dim">
        {mode.description}
      </p>

      {/* Stats */}
      <div className="relative mt-5 flex items-end justify-between border-t border-line/60 pt-3">
        <div className="flex items-center gap-4">
          <Stat label="STAKES" value={mode.stakes} />
          <span className="h-8 w-px bg-line/60" />
          <Stat label="QUEUE" value={mode.eta} />
          <span className="h-8 w-px bg-line/60" />
          <Stat
            label="PLAYERS"
            value={
              mode.minPlayers === mode.maxPlayers
                ? `${mode.minPlayers}`
                : `${mode.minPlayers}-${mode.maxPlayers}`
            }
            icon={<Users className="h-3 w-3" />}
          />
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-1 border px-2 py-0.5 font-display text-[9px] font-bold tracking-[0.22em] transition bl-clip-chevron",
            selected
              ? `${a.border} ${a.bg} ${a.text}`
              : "border-line/70 bg-void/60 text-text-dim group-hover:text-text",
          )}
        >
          {selected ? "SELECTED" : "SELECT"}
        </span>
      </div>
    </button>
  )
}

function Stat({
  label,
  value,
  icon,
}: {
  label: string
  value: string
  icon?: React.ReactNode
}) {
  return (
    <div className="flex flex-col">
      <span className="font-mono text-[9px] tracking-[0.16em] text-text-mute">{label}</span>
      <span className="mt-0.5 inline-flex items-center gap-1 font-display text-xs font-bold tracking-wide text-text">
        {icon}
        {value}
      </span>
    </div>
  )
}
