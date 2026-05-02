"use client"

import { useState } from "react"
import { Inbox, Loader2 } from "lucide-react"
import type { Doubt } from "./doubt-data"
import { DoubtCard } from "./doubt-card"

const PAGE_SIZE = 6

export function DoubtFeed({
  doubts,
  votedIds,
  onToggleVote,
  onOpen,
}: {
  doubts: Doubt[]
  votedIds: Set<string>
  onToggleVote: (id: string) => void
  onOpen: (id: string) => void
}) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  const visible = doubts.slice(0, visibleCount)
  const hasMore = visibleCount < doubts.length

  if (doubts.length === 0) {
    return (
      <div className="relative overflow-hidden border border-line/60 bg-panel/40 px-6 py-16 bl-glass">
        <div className="pointer-events-none absolute inset-0 bl-grid opacity-30" />
        <div className="bl-corners absolute inset-0" />
        <div className="relative mx-auto flex max-w-md flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center border border-line/70 bg-void/60">
            <Inbox className="h-5 w-5 text-text-mute" />
          </div>
          <h3 className="mt-4 font-display text-xl font-bold tracking-tight text-text">
            No doubts match
          </h3>
          <p className="mt-2 text-pretty text-[13px] leading-relaxed text-text-dim">
            Try a different topic, clear your filters, or be the first to ask a doubt
            in this category.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {visible.map((d) => (
        <DoubtCard
          key={d.id}
          doubt={d}
          voted={votedIds.has(d.id)}
          onToggleVote={() => onToggleVote(d.id)}
          onOpen={() => onOpen(d.id)}
        />
      ))}

      {hasMore && (
        <div className="flex items-center justify-center pt-2">
          <button
            type="button"
            onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
            className="group inline-flex h-11 items-center gap-2 border border-line/70 bg-panel/50 px-5 font-display text-[11px] font-bold tracking-[0.2em] text-text-dim transition-all hover:border-neon/60 hover:bg-neon/5 hover:text-neon"
          >
            <Loader2 className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
            LOAD {Math.min(PAGE_SIZE, doubts.length - visibleCount)} MORE
            <span className="font-mono text-[10px] text-text-mute group-hover:text-neon/70">
              · {doubts.length - visibleCount} REMAINING
            </span>
          </button>
        </div>
      )}

      {!hasMore && doubts.length > PAGE_SIZE && (
        <div className="flex items-center justify-center gap-2 pt-2 font-mono text-[11px] tracking-[0.18em] text-text-mute">
          <span className="h-px w-12 bg-line/60" />
          END OF FEED
          <span className="h-px w-12 bg-line/60" />
        </div>
      )}
    </div>
  )
}
