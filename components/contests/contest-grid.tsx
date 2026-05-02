"use client"

import { useState } from "react"
import { Trophy } from "lucide-react"
import type { Contest, ContestStatus } from "./contests-data"
import { ContestCard } from "./contest-card"

const PAGE_SIZE = 6

export function ContestGrid({
  status,
  contests,
  onView,
}: {
  status: ContestStatus | "ALL"
  contests: Contest[]
  onView: (id: string) => void
}) {
  const [pageSize, setPageSize] = useState(PAGE_SIZE)

  // Group by status when "ALL" is selected, otherwise show flat list
  if (status === "ALL") {
    const live = contests.filter((c) => c.status === "live")
    const upcoming = contests.filter((c) => c.status === "upcoming")
    const past = contests.filter((c) => c.status === "past")

    return (
      <div className="space-y-8">
        {live.length > 0 && (
          <Section title="Live Now" accent="blood" count={live.length}>
            <Grid contests={live} onView={onView} />
          </Section>
        )}
        {upcoming.length > 0 && (
          <Section title="Upcoming" accent="neon" count={upcoming.length}>
            <Grid contests={upcoming} onView={onView} />
          </Section>
        )}
        {past.length > 0 && (
          <Section title="Past Contests" accent="text-mute" count={past.length}>
            <Grid contests={past} onView={onView} />
          </Section>
        )}
        {contests.length === 0 && <EmptyState />}
      </div>
    )
  }

  const visible = contests.slice(0, pageSize)
  const hasMore = contests.length > pageSize

  if (contests.length === 0) {
    return <EmptyState />
  }

  return (
    <div className="space-y-5">
      <Grid contests={visible} onView={onView} />
      {hasMore && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setPageSize((s) => s + PAGE_SIZE)}
            className="inline-flex h-10 items-center gap-2 border border-line/70 bg-panel/60 px-5 font-display text-[11px] font-bold tracking-[0.22em] text-text-dim hover:border-neon/50 hover:text-neon transition-all bl-clip-chevron"
          >
            LOAD MORE
            <span className="font-mono text-[10px] tabular-nums text-text-mute">
              ({Math.min(PAGE_SIZE, contests.length - pageSize)}/{contests.length - pageSize})
            </span>
          </button>
        </div>
      )}
    </div>
  )
}

function Grid({
  contests,
  onView,
}: {
  contests: Contest[]
  onView: (id: string) => void
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {contests.map((c) => (
        <ContestCard key={c.id} contest={c} onView={onView} />
      ))}
    </div>
  )
}

function Section({
  title,
  accent,
  count,
  children,
}: {
  title: string
  accent: "blood" | "neon" | "text-mute"
  count: number
  children: React.ReactNode
}) {
  const accentMap = {
    blood: { text: "text-blood", border: "border-blood/50", bg: "bg-blood/10" },
    neon: { text: "text-neon", border: "border-neon/50", bg: "bg-neon/10" },
    "text-mute": { text: "text-text-mute", border: "border-line/70", bg: "bg-void/60" },
  } as const
  const a = accentMap[accent]

  return (
    <section className="space-y-3">
      <div className="flex items-center gap-3">
        <h2 className="font-display text-xl font-bold tracking-tight text-text">{title}</h2>
        <span
          className={`inline-flex h-6 items-center gap-1.5 border ${a.border} ${a.bg} px-2 font-display text-[10px] font-bold tracking-[0.18em] ${a.text}`}
        >
          {accent === "blood" && (
            <span className="relative h-1.5 w-1.5 rounded-full bg-blood">
              <span className="absolute inset-0 rounded-full bg-blood/60 animate-ping" />
            </span>
          )}
          {count}
        </span>
        <div className="h-px flex-1 bg-line/60" />
      </div>
      {children}
    </section>
  )
}

function EmptyState() {
  return (
    <div className="relative flex flex-col items-center justify-center gap-3 border border-dashed border-line/70 bg-panel/40 bl-glass px-6 py-16 text-center">
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-20" />
      <div className="relative flex h-14 w-14 items-center justify-center border border-line/70 bg-void bl-clip-notch">
        <Trophy className="h-6 w-6 text-text-mute" />
      </div>
      <div className="relative space-y-1">
        <div className="font-display text-[16px] font-bold tracking-tight text-text">
          No contests match your filters
        </div>
        <div className="font-mono text-[12px] text-text-mute">
          {"// try clearing the search or switching status tabs"}
        </div>
      </div>
    </div>
  )
}
