"use client"

import { useMemo, useState } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { TopBar } from "@/components/dashboard/top-bar"
import { ClanArenaHeader } from "@/components/clans/clan-arena-header"
import { FeaturedWars } from "@/components/clans/featured-wars"
import { ClanArenaFilterBar } from "@/components/clans/clan-arena-filter-bar"
import { ClanGrid } from "@/components/clans/clan-grid"
import { ClanArenaRail } from "@/components/clans/clan-arena-rail"
import {
  CLANS,
  TIER_META,
  type Clan,
  type ClanFilterTab,
  type ClanFocus,
  type ClanRegion,
  type ClanSort,
  type ClanTier,
  type ClanVibe,
} from "@/components/clans/clan-data"

export default function ClansPage() {
  // Filters & sort
  const [tab, setTab] = useState<ClanFilterTab>("ALL")
  const [query, setQuery] = useState("")
  const [sort, setSort] = useState<ClanSort>("recommended")
  const [tiers, setTiers] = useState<Set<ClanTier>>(new Set())
  const [regions, setRegions] = useState<Set<ClanRegion>>(new Set())
  const [vibes, setVibes] = useState<Set<ClanVibe>>(new Set())
  const [focusFilters, setFocusFilters] = useState<Set<ClanFocus>>(new Set())
  const [recruitingOnly, setRecruitingOnly] = useState(false)
  const [hasVacancyOnly, setHasVacancyOnly] = useState(false)

  const liveWars = useMemo(
    () => CLANS.filter((c) => c.warStatus === "Live").length,
    [],
  )
  const recruitingCount = useMemo(
    () => CLANS.reduce((sum, c) => sum + (c.recruiting ? c.capacity - c.memberCount : 0), 0),
    [],
  )

  const filtered: Clan[] = useMemo(() => {
    let list = CLANS.slice()

    // Tab filter
    switch (tab) {
      case "RECRUITING":
        list = list.filter((c) => c.recruiting && c.memberCount < c.capacity)
        break
      case "WARRING":
        list = list.filter((c) => c.warStatus === "Live")
        break
      case "RISING":
        list = list.filter((c) => c.rankDelta > 0)
        break
      case "INVITE":
        list = list.filter((c) => c.joinPolicy === "Invite-Only")
        break
      case "ALL":
      default:
        break
    }

    // Multi-select filters
    if (tiers.size > 0) list = list.filter((c) => tiers.has(c.tier))
    if (regions.size > 0) list = list.filter((c) => regions.has(c.region))
    if (vibes.size > 0)
      list = list.filter((c) => c.vibe.some((v) => vibes.has(v)))
    if (focusFilters.size > 0)
      list = list.filter((c) => c.focus.some((f) => focusFilters.has(f)))

    if (recruitingOnly) list = list.filter((c) => c.recruiting)
    if (hasVacancyOnly) list = list.filter((c) => c.memberCount < c.capacity)

    // Search
    const q = query.trim().toLowerCase()
    if (q) {
      list = list.filter((c) => {
        const haystack = [
          c.name,
          c.tag,
          c.motto,
          c.description,
          c.region,
          c.tier,
          c.language,
          c.joinPolicy,
          ...c.vibe,
          ...c.focus,
        ]
          .join(" ")
          .toLowerCase()
        return haystack.includes(q)
      })
    }

    // Sort
    switch (sort) {
      case "weekly-xp":
        list.sort((a, b) => b.weeklyXp - a.weeklyXp)
        break
      case "trending":
        list.sort((a, b) => b.rankDelta - a.rankDelta)
        break
      case "newest":
        list.sort((a, b) => a.foundedDays - b.foundedDays)
        break
      case "members-asc":
        list.sort((a, b) => a.memberCount - b.memberCount)
        break
      case "members-desc":
        list.sort((a, b) => b.memberCount - a.memberCount)
        break
      case "vacancy":
        list.sort(
          (a, b) =>
            b.capacity - b.memberCount - (a.capacity - a.memberCount),
        )
        break
      case "rank":
        list.sort((a, b) => a.rank - b.rank)
        break
      case "recommended":
      default:
        list.sort((a, b) => {
          // Featured > recommended > rising > hot > tier rank > weekly XP
          const score = (c: Clan) =>
            (c.isFeatured ? 16 : 0) +
            (c.isRecommended ? 8 : 0) +
            (c.isRising ? 4 : 0) +
            (c.isHot ? 2 : 0) +
            TIER_META[c.tier].rank +
            c.weeklyXp / 100_000
          return score(b) - score(a)
        })
        break
    }
    return list
  }, [tab, query, sort, tiers, regions, vibes, focusFilters, recruitingOnly, hasVacancyOnly])

  // Toggle helpers
  const toggleTier = (t: ClanTier) =>
    setTiers((prev) => {
      const n = new Set(prev)
      n.has(t) ? n.delete(t) : n.add(t)
      return n
    })
  const toggleRegion = (r: ClanRegion) =>
    setRegions((prev) => {
      const n = new Set(prev)
      n.has(r) ? n.delete(r) : n.add(r)
      return n
    })
  const toggleVibe = (v: ClanVibe) =>
    setVibes((prev) => {
      const n = new Set(prev)
      n.has(v) ? n.delete(v) : n.add(v)
      return n
    })
  const toggleFocus = (f: ClanFocus) =>
    setFocusFilters((prev) => {
      const n = new Set(prev)
      n.has(f) ? n.delete(f) : n.add(f)
      return n
    })

  const onClearAll = () => {
    setTab("ALL")
    setQuery("")
    setTiers(new Set())
    setRegions(new Set())
    setVibes(new Set())
    setFocusFilters(new Set())
    setRecruitingOnly(false)
    setHasVacancyOnly(false)
  }

  const onJoin = (id: string) => {
    if (typeof window !== "undefined") {
      console.log("[v0] join clan:", id)
    }
  }

  return (
    <div className="flex min-h-screen w-full bg-void text-text">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar title="Clan Arena" sector="011_CLAN_ARENA" />

        <main className="relative flex-1 px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
          <div className="mx-auto max-w-[1480px] space-y-5">
            <ClanArenaHeader
              totalClans={CLANS.length}
              recruitingCount={recruitingCount}
              liveWars={liveWars}
              weekIndex={9}
              weekEndsInH={4 * 24 + 11}
            />

            <FeaturedWars />

            <div className="grid gap-5 xl:grid-cols-[1fr_320px]">
              <div className="space-y-5">
                <ClanArenaFilterBar
                  tab={tab}
                  setTab={setTab}
                  query={query}
                  setQuery={setQuery}
                  sort={sort}
                  setSort={setSort}
                  tiers={tiers}
                  toggleTier={toggleTier}
                  regions={regions}
                  toggleRegion={toggleRegion}
                  vibes={vibes}
                  toggleVibe={toggleVibe}
                  focusFilters={focusFilters}
                  toggleFocus={toggleFocus}
                  recruitingOnly={recruitingOnly}
                  setRecruitingOnly={setRecruitingOnly}
                  hasVacancyOnly={hasVacancyOnly}
                  setHasVacancyOnly={setHasVacancyOnly}
                  totalCount={CLANS.length}
                  resultCount={filtered.length}
                  onClearAll={onClearAll}
                />

                <ClanGrid
                  clans={filtered}
                  onJoin={onJoin}
                  onClearAll={onClearAll}
                />
              </div>

              <ClanArenaRail />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
