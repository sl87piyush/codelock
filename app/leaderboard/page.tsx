"use client"

import { useMemo, useState } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { TopBar } from "@/components/dashboard/top-bar"
import { LeaderboardHeader } from "@/components/leaderboard/leaderboard-header"
import { YourRankCard } from "@/components/leaderboard/your-rank-card"
import { FilterBar } from "@/components/leaderboard/filter-bar"
import { Podium } from "@/components/leaderboard/podium"
import { RankTable } from "@/components/leaderboard/rank-table"
import { ClanTable } from "@/components/leaderboard/clan-table"
import { WARRIORS, type Category, type TimeFilter } from "@/components/leaderboard/leaderboard-data"

export default function LeaderboardPage() {
  const [category, setCategory] = useState<Category>("SOLO")
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("WEEKLY")
  const [search, setSearch] = useState("")
  const [divisionFilter, setDivisionFilter] = useState<string | null>(null)

  // Filtered warriors based on search + division
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return WARRIORS.filter((w) => {
      if (divisionFilter && w.division !== divisionFilter) return false
      if (!q) return true
      return (
        w.username.toLowerCase().includes(q) ||
        w.handle.toLowerCase().includes(q) ||
        w.country.toLowerCase().includes(q) ||
        w.division.toLowerCase().includes(q)
      )
    })
  }, [search, divisionFilter])

  const top3 = WARRIORS.slice(0, 3)

  return (
    <div className="flex min-h-screen bg-bg text-text">
      <Sidebar />

      <div className="relative flex-1 min-w-0">
        <div className="pointer-events-none fixed inset-0 bl-grid opacity-20" />
        <div className="pointer-events-none fixed -top-40 right-0 h-80 w-80 rounded-full bg-gold/5 blur-3xl" />
        <div className="pointer-events-none fixed -bottom-40 left-1/3 h-80 w-80 rounded-full bg-neon/5 blur-3xl" />

        <TopBar title="Leaderboard" sector="010_HALL_OF_EGOISTS" />

        <main className="relative">
          <div className="mx-auto flex max-w-[1480px] flex-col gap-6 px-4 py-6 lg:px-8 lg:py-8">
            <LeaderboardHeader />

            <YourRankCard />

            <div className="border border-line/60 bg-panel/40 p-4 bl-glass md:p-5">
              <FilterBar
                category={category}
                setCategory={setCategory}
                timeFilter={timeFilter}
                setTimeFilter={setTimeFilter}
                search={search}
                setSearch={setSearch}
                divisionFilter={divisionFilter}
                setDivisionFilter={setDivisionFilter}
              />
            </div>

            {category === "SOLO" && (
              <>
                {/* Show podium only when not actively searching */}
                {!search && !divisionFilter && <Podium top3={top3} />}
                <RankTable warriors={filtered} search={search} />
              </>
            )}

            {category === "CLAN" && <ClanTable />}

            {category === "COMPANIES" && (
              <CategoryComingSoon
                title="Companies Leaderboard"
                description="Top warriors aggregated by their hiring company. Climbing the company ladder gets you visibility with their recruiters."
              />
            )}

            {category === "COUNTRY" && (
              <CategoryComingSoon
                title="Country Leaderboard"
                description="National pride is on the line. See which country's coders are dominating the arena this season."
              />
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

function CategoryComingSoon({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="relative overflow-hidden border border-line/60 bg-panel/40 px-6 py-16 bl-glass">
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-30" />
      <div className="bl-corners absolute inset-0" />

      <div className="relative mx-auto flex max-w-md flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 border border-gold/40 bg-gold/10 px-3 py-1 font-mono text-[10px] tracking-[0.22em] text-gold bl-clip-chevron">
          COMING SOON
        </div>
        <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-text">
          {title}
        </h3>
        <p className="mt-2 text-pretty text-[14px] leading-relaxed text-text-dim">
          {description}
        </p>
      </div>
    </div>
  )
}
