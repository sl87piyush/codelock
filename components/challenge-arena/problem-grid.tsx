"use client"

import { useState } from "react"
import { Swords, Filter as FilterIcon } from "lucide-react"
import { ProblemCard } from "./problem-card"
import type { Problem } from "./arena-data"

const PAGE_SIZE = 9

export function ProblemGrid({
  problems,
  onOpen,
  onToggleBookmark,
  onClearAll,
}: {
  problems: Problem[]
  onOpen: (id: string) => void
  onToggleBookmark: (id: string) => void
  onClearAll: () => void
}) {
  const [pageSize, setPageSize] = useState(PAGE_SIZE)

  if (problems.length === 0) {
    return <EmptyState onClearAll={onClearAll} />
  }

  const visible = problems.slice(0, pageSize)
  const hasMore = problems.length > pageSize
  const remaining = problems.length - pageSize

  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((p) => (
          <ProblemCard
            key={p.id}
            problem={p}
            onOpen={onOpen}
            onToggleBookmark={onToggleBookmark}
          />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setPageSize((s) => s + PAGE_SIZE)}
            className="inline-flex h-10 items-center gap-2 border border-line/70 bg-panel/60 px-5 font-display text-[11px] font-bold tracking-[0.22em] text-text-dim hover:border-neon/50 hover:text-neon transition-all bl-clip-chevron"
          >
            LOAD MORE
            <span className="font-mono text-[10px] tabular-nums text-text-mute">
              ({Math.min(PAGE_SIZE, remaining)}/{remaining})
            </span>
          </button>
        </div>
      )}
    </div>
  )
}

function EmptyState({ onClearAll }: { onClearAll: () => void }) {
  return (
    <div className="relative flex flex-col items-center justify-center gap-3 border border-dashed border-line/70 bg-panel/40 bl-glass px-6 py-16 text-center">
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-20" />
      <div className="relative flex h-14 w-14 items-center justify-center border border-line/70 bg-void bl-clip-notch">
        <Swords className="h-6 w-6 text-text-mute" />
      </div>
      <div className="relative space-y-1">
        <div className="font-display text-[16px] font-bold tracking-tight text-text">
          No problems match the current sweep
        </div>
        <div className="font-mono text-[12px] text-text-mute">
          {"// loosen the difficulty mask or drop a tag or two"}
        </div>
      </div>
      <button
        type="button"
        onClick={onClearAll}
        className="relative mt-2 inline-flex h-9 items-center gap-2 border border-neon/50 bg-neon/10 px-4 font-display text-[11px] font-bold tracking-[0.22em] text-neon hover:bg-neon/20 transition-all bl-clip-chevron"
      >
        <FilterIcon className="h-3.5 w-3.5" />
        CLEAR ALL FILTERS
      </button>
    </div>
  )
}
