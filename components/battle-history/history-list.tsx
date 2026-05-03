"use client"

import { useMemo, useState } from "react"
import { History as HistoryIcon } from "lucide-react"
import { MatchRow } from "./match-row"
import {
  type AnyMatch,
  formatRelative,
} from "@/lib/battle-history-data"

type Props = {
  matches: AnyMatch[]
  onClear: () => void
}

// Group matches by relative day bucket
type Bucket = { key: string; label: string; items: AnyMatch[] }

function bucketize(matches: AnyMatch[]): Bucket[] {
  if (matches.length === 0) return []
  const now = Date.now()
  const dayMs = 24 * 60 * 60 * 1000

  const buckets = new Map<string, Bucket>()
  for (const m of matches) {
    const t = new Date(m.endedAt).getTime()
    const diffDays = Math.floor((now - t) / dayMs)

    let key: string
    let label: string
    if (diffDays <= 0) {
      key = "today"
      label = "TODAY"
    } else if (diffDays === 1) {
      key = "yesterday"
      label = "YESTERDAY"
    } else if (diffDays < 7) {
      key = "week"
      label = "THIS WEEK"
    } else if (diffDays < 30) {
      key = "month"
      label = "THIS MONTH"
    } else {
      key = "older"
      label = "EARLIER"
    }
    if (!buckets.has(key)) buckets.set(key, { key, label, items: [] })
    buckets.get(key)!.items.push(m)
  }

  // Preserve a stable display order: today → yesterday → week → month → older
  const order = ["today", "yesterday", "week", "month", "older"]
  return order
    .map((k) => buckets.get(k))
    .filter((b): b is Bucket => Boolean(b))
}

export function HistoryList({ matches, onClear }: Props) {
  const [expandAll, setExpandAll] = useState(false)
  // bumped key forces all rows to remount with the new defaultExpanded state
  const [bumpKey, setBumpKey] = useState(0)

  const buckets = useMemo(() => bucketize(matches), [matches])

  if (matches.length === 0) {
    return <EmptyState onClear={onClear} />
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Top toolbar — expand/collapse all */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 font-display text-[10.5px] font-bold tracking-[0.22em] text-text-mute">
          <HistoryIcon className="h-3.5 w-3.5 text-neon" />
          <span>
            SHOWING <span className="text-neon tabular-nums">{matches.length}</span>{" "}
            MATCHES
          </span>
        </div>
        <button
          type="button"
          onClick={() => {
            setExpandAll((v) => !v)
            setBumpKey((k) => k + 1)
          }}
          className="inline-flex h-9 items-center gap-1.5 border border-line/60 bg-void/45 px-3 font-display text-[10.5px] font-bold tracking-[0.18em] text-text-dim hover:border-neon/45 hover:text-neon transition-colors"
        >
          {expandAll ? "COLLAPSE ALL" : "EXPAND ALL"}
        </button>
      </div>

      {buckets.map((b) => (
        <section key={b.key} className="flex flex-col gap-2.5">
          <div className="flex items-center gap-3">
            <span className="font-display text-[10.5px] font-bold tracking-[0.28em] text-text-mute">
              {b.label}
            </span>
            <span className="font-mono text-[10px] text-text-mute">
              ({b.items.length})
            </span>
            <span className="h-px flex-1 bg-line/50" />
            <span className="font-mono text-[10px] text-text-mute">
              {formatRelative(b.items[0].endedAt)} → {formatRelative(b.items[b.items.length - 1].endedAt)}
            </span>
          </div>
          <ul className="flex flex-col gap-2.5">
            {b.items.map((m) => (
              <li key={m.id}>
                <MatchRow
                  key={`${m.id}-${bumpKey}`}
                  match={m}
                  defaultExpanded={expandAll}
                />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}

function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="relative overflow-hidden border border-line/60 bg-panel/55 bl-glass">
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-25" />
      <div className="relative flex flex-col items-center gap-3 p-10 text-center">
        <div className="relative flex h-14 w-14 items-center justify-center border border-line/60 bg-void/60 bl-clip-notch">
          <HistoryIcon className="h-6 w-6 text-text-mute" />
          <span className="absolute inset-0 bl-pulse-ring border border-neon/30" />
        </div>
        <h3 className="font-display text-lg font-bold tracking-tight text-text">
          No matches in the archive
        </h3>
        <p className="max-w-md text-[13px] text-text-dim">
          Try widening the date range or clearing your filters. Or stop hiding
          and queue up a fresh battle.
        </p>
        <button
          type="button"
          onClick={onClear}
          className="mt-1 inline-flex h-10 items-center gap-1.5 border border-neon/45 bg-neon/10 px-4 font-display text-[11px] font-bold tracking-[0.2em] text-neon hover:bg-neon/15 transition-colors bl-clip-chevron"
        >
          CLEAR FILTERS
        </button>
      </div>
    </div>
  )
}
