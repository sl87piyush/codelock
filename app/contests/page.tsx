"use client"

import { useMemo, useState } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { TopBar } from "@/components/dashboard/top-bar"
import { ContestsHeader } from "@/components/contests/contests-header"
import { FeaturedBanner } from "@/components/contests/featured-banner"
import { ContestFilterBar } from "@/components/contests/contest-filter-bar"
import { ContestGrid } from "@/components/contests/contest-grid"
import { ContestRail } from "@/components/contests/contest-rail"
import { ContestDetailDrawer } from "@/components/contests/contest-detail-drawer"
import {
  CONTESTS,
  type ContestCategory,
  type ContestSort,
  type ContestStatus,
} from "@/components/contests/contests-data"

export default function ContestsPage() {
  const [status, setStatus] = useState<ContestStatus | "ALL">("ALL")
  const [category, setCategory] = useState<ContestCategory | "ALL">("ALL")
  const [sort, setSort] = useState<ContestSort>("soonest")
  const [query, setQuery] = useState("")
  const [activeId, setActiveId] = useState<string | null>(null)

  const filtered = useMemo(() => {
    let list = CONTESTS.slice()
    if (status !== "ALL") list = list.filter((c) => c.status === status)
    if (category !== "ALL") list = list.filter((c) => c.category === category)
    const q = query.trim().toLowerCase()
    if (q) {
      list = list.filter((c) => {
        const haystack = [
          c.title,
          c.tagline,
          c.description,
          c.code,
          c.category,
          c.difficulty,
          ...c.sponsors.map((s) => s.name),
        ]
          .join(" ")
          .toLowerCase()
        return haystack.includes(q)
      })
    }

    switch (sort) {
      case "soonest":
        list.sort(
          (a, b) =>
            new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime(),
        )
        break
      case "popular":
        list.sort((a, b) => b.registered - a.registered)
        break
      case "prize":
        list.sort((a, b) => {
          const av =
            a.prizeCurrency === "USD" ? a.prizePool * 5 : a.prizePool
          const bv =
            b.prizeCurrency === "USD" ? b.prizePool * 5 : b.prizePool
          return bv - av
        })
        break
      case "newest":
        list.sort(
          (a, b) =>
            new Date(b.startsAt).getTime() - new Date(a.startsAt).getTime(),
        )
        break
    }
    return list
  }, [status, category, sort, query])

  const liveCount = CONTESTS.filter((c) => c.status === "live").length
  const upcomingCount = CONTESTS.filter((c) => c.status === "upcoming").length
  const pastCount = CONTESTS.filter((c) => c.status === "past").length

  const featured =
    CONTESTS.find((c) => c.isFeatured && c.status === "live") ??
    CONTESTS.find((c) => c.isFeatured) ??
    CONTESTS.find((c) => c.status === "live") ??
    CONTESTS[0]

  const activeContest = activeId
    ? CONTESTS.find((c) => c.id === activeId) ?? null
    : null

  return (
    <div className="flex min-h-screen w-full bg-void text-text">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar title="Contests" sector="008_CONTESTS" />

        <main className="relative flex-1 px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
          <div className="mx-auto max-w-[1480px] space-y-5">
            <ContestsHeader
              liveCount={liveCount}
              upcomingCount={upcomingCount}
            />

            <FeaturedBanner contest={featured} onView={(id) => setActiveId(id)} />

            <div className="grid gap-5 xl:grid-cols-[1fr_320px]">
              <div className="space-y-5">
                <ContestFilterBar
                  status={status}
                  setStatus={setStatus}
                  category={category}
                  setCategory={setCategory}
                  sort={sort}
                  setSort={setSort}
                  query={query}
                  setQuery={setQuery}
                  liveCount={liveCount}
                  upcomingCount={upcomingCount}
                  pastCount={pastCount}
                  contests={CONTESTS}
                />

                <ContestGrid
                  status={status}
                  contests={filtered}
                  onView={(id) => setActiveId(id)}
                />
              </div>

              <ContestRail />
            </div>
          </div>
        </main>
      </div>

      <ContestDetailDrawer contest={activeContest} onClose={() => setActiveId(null)} />
    </div>
  )
}
