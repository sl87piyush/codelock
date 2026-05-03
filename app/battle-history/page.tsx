"use client"

import { useMemo, useState } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { TopBar } from "@/components/dashboard/top-bar"
import { HistoryHeader } from "@/components/battle-history/history-header"
import {
  HistoryFilters,
  type DateRange,
  type ModeTab,
  type OutcomeFilter,
  type SortMode,
} from "@/components/battle-history/history-filters"
import { HistoryList } from "@/components/battle-history/history-list"
import {
  ALL_MATCHES,
  computeStats,
  type AnyMatch,
} from "@/lib/battle-history-data"

const NOW = new Date("2026-05-03T21:00:00Z").getTime()
const DAY = 24 * 60 * 60 * 1000

function inRange(iso: string, range: DateRange): boolean {
  if (range === "ALL" || range === "SEASON") return true
  const t = new Date(iso).getTime()
  const diff = NOW - t
  switch (range) {
    case "24H":
      return diff <= DAY
    case "7D":
      return diff <= 7 * DAY
    case "30D":
      return diff <= 30 * DAY
  }
}

function searchMatches(query: string, m: AnyMatch): boolean {
  if (!query) return true
  const q = query.toLowerCase()
  const hay: string[] = [m.id, m.mode]
  if (m.mode === "SOLO") {
    hay.push(m.you.name, m.opponent.name)
  } else if (m.mode === "DUO") {
    hay.push(m.yourTeam.name, m.oppTeam.name)
    hay.push(...m.yourTeam.members.map((x) => x.name))
    hay.push(...m.oppTeam.members.map((x) => x.name))
  } else {
    hay.push(
      m.yourClan.name,
      m.yourClan.tag,
      m.oppClan.name,
      m.oppClan.tag,
      m.weekTag ?? "",
    )
  }
  hay.push(...m.problems.map((p) => p.name))
  if (m.mvp) hay.push(m.mvp)
  return hay.join(" ").toLowerCase().includes(q)
}

export default function BattleHistoryPage() {
  const [tab, setTab] = useState<ModeTab>("ALL")
  const [query, setQuery] = useState("")
  const [outcome, setOutcome] = useState<OutcomeFilter>("ALL")
  const [range, setRange] = useState<DateRange>("ALL")
  const [sort, setSort] = useState<SortMode>("NEWEST")

  // Counts per tab — based on the current OUTCOME + RANGE + SEARCH (not mode tab)
  // so the badges reflect what is actually available within other constraints.
  const baseFiltered = useMemo<AnyMatch[]>(() => {
    return ALL_MATCHES.filter((m) => {
      if (outcome !== "ALL" && m.outcome !== outcome) return false
      if (!inRange(m.endedAt, range)) return false
      if (!searchMatches(query, m)) return false
      return true
    })
  }, [outcome, range, query])

  const counts = useMemo<Record<ModeTab, number>>(() => {
    const c: Record<ModeTab, number> = {
      ALL: baseFiltered.length,
      SOLO: 0,
      DUO: 0,
      CLAN_WAR: 0,
    }
    for (const m of baseFiltered) c[m.mode] += 1
    return c
  }, [baseFiltered])

  const filtered = useMemo<AnyMatch[]>(() => {
    let list =
      tab === "ALL"
        ? baseFiltered
        : baseFiltered.filter((m) => m.mode === tab)

    list = list.slice() // copy before sort
    switch (sort) {
      case "OLDEST":
        list.sort(
          (a, b) =>
            new Date(a.endedAt).getTime() - new Date(b.endedAt).getTime(),
        )
        break
      case "LP_DESC":
        list.sort((a, b) => b.lpDelta - a.lpDelta)
        break
      case "LP_ASC":
        list.sort((a, b) => a.lpDelta - b.lpDelta)
        break
      case "DURATION":
        list.sort((a, b) => b.durationMin - a.durationMin)
        break
      case "NEWEST":
      default:
        list.sort(
          (a, b) =>
            new Date(b.endedAt).getTime() - new Date(a.endedAt).getTime(),
        )
        break
    }
    return list
  }, [baseFiltered, tab, sort])

  const stats = useMemo(() => computeStats(ALL_MATCHES), [])

  const onClear = () => {
    setTab("ALL")
    setQuery("")
    setOutcome("ALL")
    setRange("ALL")
    setSort("NEWEST")
  }

  const rangeLabel = useMemo(() => {
    switch (range) {
      case "24H":
        return "LAST 24H"
      case "7D":
        return "LAST 7 DAYS"
      case "30D":
        return "LAST 30 DAYS"
      case "SEASON":
        return "SEASON 04"
      case "ALL":
      default:
        return "ALL TIME"
    }
  }, [range])

  return (
    <div className="flex min-h-screen w-full bg-void text-text">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar title="Battle History" sector="014_BATTLE_HISTORY" />

        <main className="relative flex-1 px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
          {/* ambient orbs */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-24 left-1/3 h-[420px] w-[420px] rounded-full bg-neon/8 blur-3xl bl-float-slow" />
            <div className="absolute top-1/3 -right-24 h-[380px] w-[380px] rounded-full bg-blood/8 blur-3xl bl-float-slower" />
          </div>

          <div className="relative mx-auto max-w-[1480px] space-y-5">
            <HistoryHeader stats={stats} rangeLabel={rangeLabel} />

            <HistoryFilters
              tab={tab}
              setTab={setTab}
              counts={counts}
              query={query}
              setQuery={setQuery}
              outcome={outcome}
              setOutcome={setOutcome}
              range={range}
              setRange={setRange}
              sort={sort}
              setSort={setSort}
              resultCount={filtered.length}
              totalCount={ALL_MATCHES.length}
              onClear={onClear}
            />

            <HistoryList matches={filtered} onClear={onClear} />
          </div>
        </main>
      </div>
    </div>
  )
}
