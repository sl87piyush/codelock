"use client"

import { useState } from "react"
import { Plus, Search, ShieldOff } from "lucide-react"
import { ClanCard } from "./clan-card"
import type { Clan } from "./clan-data"

const PAGE_SIZE = 9

type Props = {
  clans: Clan[]
  onJoin?: (id: string) => void
  onClearAll: () => void
}

export function ClanGrid({ clans, onJoin, onClearAll }: Props) {
  const [page, setPage] = useState(1)
  const visible = clans.slice(0, page * PAGE_SIZE)
  const hasMore = visible.length < clans.length

  if (clans.length === 0) {
    return <EmptyState onClearAll={onClearAll} />
  }

  return (
    <section>
      <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-3">
        {visible.map((c) => (
          <ClanCard key={c.id} clan={c} onJoin={onJoin} />
        ))}
      </div>

      {hasMore && (
        <div className="mt-5 flex items-center justify-center">
          <button
            type="button"
            onClick={() => setPage((p) => p + 1)}
            className="bl-btn-ghost h-11 px-5 group"
          >
            <Plus className="h-3.5 w-3.5" />
            LOAD MORE CLANS
            <span className="font-mono text-[10px] text-text-mute group-hover:text-neon transition-colors">
              ({clans.length - visible.length} more)
            </span>
          </button>
        </div>
      )}
    </section>
  )
}

function EmptyState({ onClearAll }: { onClearAll: () => void }) {
  return (
    <section className="relative overflow-hidden border border-dashed border-line bg-panel/40 p-10 text-center bl-glass">
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-25" />
      <div className="relative mx-auto flex max-w-md flex-col items-center gap-3">
        <div className="relative flex h-14 w-14 items-center justify-center border border-blood/40 bg-blood/5 bl-clip-notch">
          <ShieldOff className="h-6 w-6 text-blood" />
          <Search className="absolute -bottom-1 -right-1 h-4 w-4 text-text-mute bg-panel" />
        </div>
        <h3 className="font-display text-[16px] font-bold">No clans match those filters.</h3>
        <p className="text-[13px] text-text-dim">
          Loosen your tier or region picks, or kill the search and start fresh.
          Or — start your own and recruit them yourself.
        </p>
        <div className="mt-1 flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={onClearAll}
            className="bl-btn-ghost h-10 px-4"
          >
            CLEAR FILTERS
          </button>
          <button type="button" className="bl-btn-primary h-10 px-4 text-[11px]">
            <Plus className="h-3.5 w-3.5" />
            FORGE NEW CLAN
          </button>
        </div>
      </div>
    </section>
  )
}
