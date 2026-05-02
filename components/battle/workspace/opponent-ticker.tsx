"use client"

import { useEffect, useState } from "react"
import { Activity, Shield, Swords } from "lucide-react"
import type { OpponentSnapshot } from "./workspace-data"

function ProgressChip({ snap }: { snap: OpponentSnapshot }) {
  const toneBar =
    snap.tone === "neon"
      ? "bg-neon shadow-[0_0_6px_rgba(0,240,255,0.8)]"
      : snap.tone === "ember"
        ? "bg-ember shadow-[0_0_6px_rgba(255,107,0,0.8)]"
        : "bg-gold shadow-[0_0_6px_rgba(255,200,90,0.8)]"
  const toneText =
    snap.tone === "neon" ? "text-neon" : snap.tone === "ember" ? "text-ember" : "text-gold"
  const dot =
    snap.tone === "neon"
      ? "bg-neon shadow-[0_0_6px_rgba(0,240,255,0.8)]"
      : snap.tone === "ember"
        ? "bg-ember shadow-[0_0_6px_rgba(255,107,0,0.8)]"
        : "bg-gold shadow-[0_0_6px_rgba(255,200,90,0.8)]"
  const statusColor =
    snap.status === "CLEARED"
      ? "text-neon"
      : snap.status === "STUCK"
        ? "text-blood"
        : snap.status === "DEBUGGING"
          ? "text-ember"
          : "text-text-dim"

  return (
    <div className="flex min-w-[220px] items-center gap-3 border border-line/60 bg-panel/50 px-3 h-9 bl-clip-chevron">
      <span className={`relative inline-flex h-2 w-2 rounded-full ${dot} bl-pulse`} />
      <div className="flex flex-col leading-none">
        <span className={`font-display text-[10px] font-bold tracking-[0.2em] ${toneText}`}>
          {snap.handle.toUpperCase()}
        </span>
        <span className={`font-mono text-[9px] tracking-[0.14em] ${statusColor}`}>
          {snap.status} · {snap.testsPassed}/{snap.testsTotal}
        </span>
      </div>
      <div className="ml-auto flex flex-col items-end gap-1">
        <span className="font-mono text-[10px] text-text-dim tabular-nums">
          {snap.progress}%
        </span>
        <div className="h-1 w-16 overflow-hidden bg-line/50">
          <div
            className={`h-full ${toneBar} transition-all duration-500`}
            style={{ width: `${snap.progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}

type Props = {
  teammate: OpponentSnapshot
  opponents: OpponentSnapshot[]
}

export function OpponentTicker({ teammate, opponents }: Props) {
  // Subtle live-pulse so it feels alive without being distracting
  const [pulse, setPulse] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setPulse((p) => (p + 1) % 3), 1800)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative z-20 flex items-center gap-3 border-b border-line/60 bg-void/70 backdrop-blur-md px-4 py-2 md:px-6">
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-15" />

      <div className="relative flex items-center gap-2">
        <Shield className="h-3.5 w-3.5 text-neon" />
        <span className="font-display text-[10px] font-bold tracking-[0.24em] text-text">
          ALLY
        </span>
      </div>

      <ProgressChip snap={teammate} />

      <div className="mx-2 flex items-center gap-2 text-text-mute">
        <Swords className="h-3.5 w-3.5 text-blood bl-flicker" />
        <span className="font-display text-[10px] font-bold tracking-[0.3em] text-blood">
          VS
        </span>
      </div>

      <div className="relative flex items-center gap-2">
        <Activity className={`h-3.5 w-3.5 text-ember ${pulse === 0 ? "opacity-100" : "opacity-70"}`} />
        <span className="font-display text-[10px] font-bold tracking-[0.24em] text-text">
          ENEMY
        </span>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto">
        {opponents.map((o) => (
          <ProgressChip key={o.handle} snap={o} />
        ))}
      </div>

      <div className="ml-auto hidden items-center gap-2 lg:flex">
        <span className="font-display text-[10px] font-bold tracking-[0.24em] text-text-mute">
          MOMENTUM
        </span>
        <div className="relative h-1.5 w-40 overflow-hidden bg-line/50">
          <div className="absolute inset-y-0 left-0 w-[58%] bg-gradient-to-r from-neon/90 to-neon/30" />
          <div className="absolute inset-y-0 right-0 w-[42%] bg-gradient-to-l from-ember/90 to-ember/30" />
          <div className="absolute top-0 bottom-0 left-[58%] w-px bg-white/80 shadow-[0_0_8px_#ffffff]" />
        </div>
        <span className="font-mono text-[10px] text-neon">58%</span>
      </div>
    </div>
  )
}
