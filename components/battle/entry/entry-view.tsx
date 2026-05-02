"use client"

import { useEffect, useState } from "react"
import { EntryHero } from "@/components/battle/entry/entry-hero"
import { PlayerStatusCard } from "@/components/battle/entry/player-status-card"
import { TeamFormatToggle } from "@/components/battle/entry/team-format-toggle"
import { RegionPicker } from "@/components/battle/entry/region-picker"
import { ModeSelector } from "@/components/battle/entry/mode-selector"
import { RecentMatchesStrip } from "@/components/battle/entry/recent-matches-strip"
import { GlobalStatsFooter } from "@/components/battle/entry/global-stats-footer"
import { FindMatchCta } from "@/components/battle/entry/find-match-cta"
import { QueueStatusPanel } from "@/components/battle/entry/queue-status-panel"
import {
  BATTLE_MODES,
  REGIONS,
  type BattleModeId,
  type TeamFormat,
} from "@/components/battle/entry-data"

type Props = {
  onMatchFound: () => void
}

export function EntryView({ onMatchFound }: Props) {
  const [mode, setMode] = useState<BattleModeId>("ranked")
  const [format, setFormat] = useState<TeamFormat>("duo")
  const [regionId, setRegionId] = useState<string>(REGIONS[0].id)

  const [queuing, setQueuing] = useState(false)
  const [elapsed, setElapsed] = useState(0)

  const selectedMode = BATTLE_MODES.find((m) => m.id === mode) ?? BATTLE_MODES[1]
  const selectedRegion = REGIONS.find((r) => r.id === regionId) ?? REGIONS[0]

  // Queue timer
  useEffect(() => {
    if (!queuing) return
    const started = Date.now()
    const id = setInterval(() => {
      setElapsed(Math.floor((Date.now() - started) / 1000))
    }, 1000)

    // Auto-promote to lobby after 6 seconds
    const t = setTimeout(() => {
      onMatchFound()
    }, 6000)

    return () => {
      clearInterval(id)
      clearTimeout(t)
    }
  }, [queuing, onMatchFound])

  const handleFindMatch = () => {
    setElapsed(0)
    setQueuing(true)
  }

  const handleCancel = () => {
    setQueuing(false)
    setElapsed(0)
  }

  return (
    <div className="flex flex-col gap-5 bl-phase-in">
      <EntryHero />

      {/* Configure row */}
      <div className="flex flex-col gap-4">
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] tracking-[0.28em] text-neon">01</span>
              <span className="font-display text-[10px] font-bold tracking-[0.28em] text-text-mute">
                / CONFIGURE YOUR LOADOUT
              </span>
            </div>
            <h2 className="mt-1 font-display text-2xl font-black tracking-tight text-text md:text-3xl">
              Profile, format, region.
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.3fr_1fr_1fr]">
          <PlayerStatusCard />
          <div className="flex flex-col gap-4">
            <TeamFormatToggle format={format} onChange={setFormat} />
            <RecentMatchesStrip />
          </div>
          <RegionPicker regionId={regionId} onChange={setRegionId} />
        </div>
      </div>

      {/* Mode selection */}
      <ModeSelector selected={mode} onSelect={setMode} />

      {/* CTA or queue */}
      {queuing ? (
        <QueueStatusPanel
          mode={selectedMode}
          format={format}
          regionCode={selectedRegion.code}
          elapsedSeconds={elapsed}
          onCancel={handleCancel}
        />
      ) : (
        <FindMatchCta
          mode={selectedMode}
          format={format}
          regionCode={selectedRegion.code}
          onFindMatch={handleFindMatch}
        />
      )}

      {/* Global footer stats */}
      <GlobalStatsFooter />
    </div>
  )
}
