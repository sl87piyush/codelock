"use client"

import { BATTLE_MODES, type BattleModeId } from "@/components/battle/entry-data"
import { ModeCard } from "@/components/battle/entry/mode-card"

type Props = {
  selected: BattleModeId
  onSelect: (id: BattleModeId) => void
}

export function ModeSelector({ selected, onSelect }: Props) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-end justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] tracking-[0.28em] text-neon">02</span>
            <span className="font-display text-[10px] font-bold tracking-[0.28em] text-text-mute">
              / SELECT BATTLE MODE
            </span>
          </div>
          <h2 className="mt-1 font-display text-2xl font-black tracking-tight text-text md:text-3xl">
            Choose your war.
          </h2>
        </div>
        <span className="hidden font-mono text-[10px] tracking-[0.18em] text-text-dim md:inline">
          {`${BATTLE_MODES.length} MODES · ${BATTLE_MODES.filter((m) => m.ranked).length} RANKED`}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {BATTLE_MODES.map((mode) => (
          <ModeCard
            key={mode.id}
            mode={mode}
            selected={selected === mode.id}
            onSelect={onSelect}
          />
        ))}
      </div>
    </section>
  )
}
