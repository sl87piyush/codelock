"use client"

import { useState } from "react"
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from "@/components/ui/empty"
import { ClipboardCheck, ChevronDown } from "lucide-react"
import type { Assessment, AssessmentStatus } from "./oa-arena-data"
import { OaCard } from "./oa-card"

const PAGE_SIZE = 6

export function OaGrid({
  assessments,
  groupByStatus,
  onView,
}: {
  assessments: Assessment[]
  groupByStatus: boolean
  onView: (id: string) => void
}) {
  const [page, setPage] = useState(1)

  if (assessments.length === 0) {
    return (
      <Empty className="border border-dashed border-line/60 bg-void/30">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <ClipboardCheck className="h-6 w-6 text-text-mute" />
          </EmptyMedia>
          <EmptyTitle className="font-display tracking-tight">
            No assessments match your filters
          </EmptyTitle>
          <EmptyDescription>
            Try clearing some filters or switching to a different status tab.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    )
  }

  if (groupByStatus) {
    const groups: { id: AssessmentStatus; label: string; accent: string }[] = [
      { id: "LIVE", label: "Live Now", accent: "text-blood" },
      { id: "SCHEDULED", label: "Upcoming", accent: "text-electric" },
      { id: "AVAILABLE", label: "Open Window", accent: "text-neon" },
      { id: "COMPLETED", label: "Past Results", accent: "text-text-dim" },
      { id: "LOCKED", label: "Eligibility Locked", accent: "text-gold" },
    ]
    return (
      <div className="space-y-7">
        {groups.map((g) => {
          const items = assessments.filter((a) => a.status === g.id)
          if (items.length === 0) return null
          return (
            <section key={g.id} className="space-y-3">
              <header className="flex items-baseline justify-between border-b border-line/40 pb-2">
                <h2 className={`font-display text-[14px] font-bold tracking-[0.22em] ${g.accent}`}>
                  {g.label.toUpperCase()}
                </h2>
                <span className="font-mono text-[10.5px] text-text-mute">
                  {items.length} {items.length === 1 ? "assessment" : "assessments"}
                </span>
              </header>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {items.map((a) => (
                  <OaCard key={a.id} assessment={a} onView={onView} />
                ))}
              </div>
            </section>
          )
        })}
      </div>
    )
  }

  const visible = assessments.slice(0, page * PAGE_SIZE)
  const hasMore = visible.length < assessments.length

  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((a) => (
          <OaCard key={a.id} assessment={a} onView={onView} />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setPage((p) => p + 1)}
            className="group inline-flex items-center gap-2 border border-line/60 bg-panel/50 px-5 py-2.5 font-display text-[11px] font-bold tracking-[0.22em] text-text hover:border-neon/50 hover:text-neon transition-colors"
          >
            LOAD {Math.min(PAGE_SIZE, assessments.length - visible.length)} MORE
            <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
          </button>
        </div>
      )}

      <div className="text-center font-mono text-[10.5px] text-text-mute">
        Showing {visible.length} of {assessments.length}
      </div>
    </div>
  )
}
