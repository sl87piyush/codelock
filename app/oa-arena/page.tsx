"use client"

import { useMemo, useState } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { TopBar } from "@/components/dashboard/top-bar"
import { ActiveAssessmentBanner } from "@/components/oa-arena/active-assessment-banner"
import { OaDetailDrawer } from "@/components/oa-arena/oa-detail-drawer"
import { OaFilterBar, type Filters } from "@/components/oa-arena/oa-filter-bar"
import { OaGrid } from "@/components/oa-arena/oa-grid"
import { OaHeader } from "@/components/oa-arena/oa-header"
import { OaRail } from "@/components/oa-arena/oa-rail"
import { PastResultsTable } from "@/components/oa-arena/past-results-table"
import {
  ASSESSMENTS,
  type AssessmentStatus,
} from "@/components/oa-arena/oa-arena-data"

export default function OaArenaPage() {
  const [filters, setFilters] = useState<Filters>({
    status: "ALL",
    type: "ALL",
    difficulty: "ALL",
    sort: "DATE",
    search: "",
    company: "ALL",
  })
  const [openId, setOpenId] = useState<string | null>(null)

  const counts = useMemo(() => {
    const c: Record<AssessmentStatus | "ALL", number> = {
      ALL: ASSESSMENTS.length,
      LIVE: 0,
      SCHEDULED: 0,
      AVAILABLE: 0,
      COMPLETED: 0,
      LOCKED: 0,
    }
    ASSESSMENTS.forEach((a) => {
      c[a.status] += 1
    })
    return c
  }, [])

  const filtered = useMemo(() => {
    let list = [...ASSESSMENTS]

    if (filters.status !== "ALL") list = list.filter((a) => a.status === filters.status)
    if (filters.type !== "ALL") list = list.filter((a) => a.type === filters.type)
    if (filters.difficulty !== "ALL") list = list.filter((a) => a.difficulty === filters.difficulty)
    if (filters.company !== "ALL") list = list.filter((a) => a.company === filters.company)

    const q = filters.search.trim().toLowerCase()
    if (q) {
      list = list.filter((a) => {
        return (
          a.company.toLowerCase().includes(q) ||
          a.role.toLowerCase().includes(q) ||
          a.id.toLowerCase().includes(q) ||
          a.topics.some((t) => t.toLowerCase().includes(q))
        )
      })
    }

    const diffOrder = { EASY: 0, MEDIUM: 1, HARD: 2, EXPERT: 3 }

    switch (filters.sort) {
      case "POPULARITY":
        list.sort((a, b) => b.popularity - a.popularity)
        break
      case "DURATION":
        list.sort((a, b) => a.duration - b.duration)
        break
      case "DIFFICULTY":
        list.sort((a, b) => diffOrder[a.difficulty] - diffOrder[b.difficulty])
        break
      case "DATE":
      default:
        list.sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime())
    }

    return list
  }, [filters])

  const liveAssessment = ASSESSMENTS.find((a) => a.status === "LIVE")
  const nextScheduled = ASSESSMENTS.filter((a) => a.status === "SCHEDULED").sort(
    (a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime(),
  )[0]
  const featured = liveAssessment ?? nextScheduled

  // For past results table — only show when status is ALL or COMPLETED
  const showPastResults =
    filters.status === "ALL" || filters.status === "COMPLETED"
  const pastResults = filtered
    .filter((a) => a.status === "COMPLETED" && a.result)
    .sort(
      (a, b) =>
        new Date(b.result!.completedAt).getTime() -
        new Date(a.result!.completedAt).getTime(),
    )

  // The grid shows everything except past-results entries (when we're showing them as a table)
  const gridItems =
    filters.status === "COMPLETED" ? [] : filtered.filter((a) => a.status !== "COMPLETED")

  // When viewing ALL, show top 3 past results in the table. When viewing COMPLETED, show all.
  const pastResultsToShow =
    filters.status === "COMPLETED" ? pastResults : pastResults.slice(0, 3)

  const groupByStatus = filters.status === "ALL" && !filters.search

  const open = openId !== null
  const activeAssessment = ASSESSMENTS.find((a) => a.id === openId) ?? null

  return (
    <div className="flex h-screen w-full overflow-hidden bg-void">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar title="OA Arena" sector="009_OA_ARENA" />

        <main className="relative flex-1 overflow-y-auto">
          <div className="pointer-events-none fixed inset-0 bl-grid opacity-[0.06]" />

          <div className="mx-auto max-w-[1440px] space-y-5 p-5 lg:p-6">
            <OaHeader />

            {featured && (
              <ActiveAssessmentBanner assessment={featured} onView={(id) => setOpenId(id)} />
            )}

            <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
              <div className="space-y-5">
                <OaFilterBar filters={filters} setFilters={setFilters} counts={counts} />

                {gridItems.length > 0 && (
                  <OaGrid
                    assessments={gridItems}
                    groupByStatus={groupByStatus}
                    onView={(id) => setOpenId(id)}
                  />
                )}

                {showPastResults && pastResultsToShow.length > 0 && (
                  <PastResultsTable
                    assessments={pastResultsToShow}
                    onView={(id) => setOpenId(id)}
                  />
                )}

                {gridItems.length === 0 && pastResultsToShow.length === 0 && (
                  <OaGrid
                    assessments={[]}
                    groupByStatus={false}
                    onView={(id) => setOpenId(id)}
                  />
                )}
              </div>

              <OaRail />
            </div>
          </div>
        </main>
      </div>

      <OaDetailDrawer
        assessment={activeAssessment}
        open={open}
        onClose={() => setOpenId(null)}
      />
    </div>
  )
}
