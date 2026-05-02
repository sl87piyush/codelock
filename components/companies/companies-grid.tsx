"use client"

import { useState } from "react"
import { Building2 } from "lucide-react"
import type { Company } from "./companies-data"
import { CompanyCard } from "./company-card"

const PAGE_SIZE = 9

export function CompaniesGrid({
  companies,
  onView,
  onToggleBookmark,
}: {
  companies: Company[]
  onView: (slug: string) => void
  onToggleBookmark: (id: string) => void
}) {
  const [pageSize, setPageSize] = useState(PAGE_SIZE)

  if (companies.length === 0) {
    return <EmptyState />
  }

  const visible = companies.slice(0, pageSize)
  const hasMore = companies.length > pageSize

  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((c) => (
          <CompanyCard
            key={c.id}
            company={c}
            onView={onView}
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
              ({Math.min(PAGE_SIZE, companies.length - pageSize)}/{companies.length - pageSize})
            </span>
          </button>
        </div>
      )}
    </div>
  )
}

function EmptyState() {
  return (
    <div className="relative flex flex-col items-center justify-center gap-3 border border-dashed border-line/70 bg-panel/40 bl-glass px-6 py-16 text-center">
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-20" />
      <div className="relative flex h-14 w-14 items-center justify-center border border-line/70 bg-void bl-clip-notch">
        <Building2 className="h-6 w-6 text-text-mute" />
      </div>
      <div className="relative space-y-1">
        <div className="font-display text-[16px] font-bold tracking-tight text-text">
          No companies match your filters
        </div>
        <div className="font-mono text-[12px] text-text-mute">
          {"// try clearing tags or switching tier tabs"}
        </div>
      </div>
    </div>
  )
}
