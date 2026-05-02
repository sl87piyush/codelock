"use client"

import { useMemo, useState } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { TopBar } from "@/components/dashboard/top-bar"
import { ArenaHeader } from "@/components/challenge-arena/arena-header"
import { FeaturedGauntlet } from "@/components/challenge-arena/featured-gauntlet"
import { ArenaFilterBar } from "@/components/challenge-arena/arena-filter-bar"
import { ProblemGrid } from "@/components/challenge-arena/problem-grid"
import { ArenaRail } from "@/components/challenge-arena/arena-rail"
import {
  PROBLEMS,
  DIFFICULTY_META,
  type ArenaSort,
  type ArenaStatus,
  type Difficulty,
  type Domain,
  type Problem,
} from "@/components/challenge-arena/arena-data"

export default function ChallengeArenaPage() {
  const [status, setStatus] = useState<ArenaStatus>("ALL")
  const [difficulties, setDifficulties] = useState<Set<Difficulty>>(new Set())
  const [domains, setDomains] = useState<Set<Domain>>(new Set())
  const [tags, setTags] = useState<Set<string>>(new Set())
  const [sort, setSort] = useState<ArenaSort>("recommended")
  const [query, setQuery] = useState("")
  const [bookmarkedOnly, setBookmarkedOnly] = useState(false)
  const [premiumOnly, setPremiumOnly] = useState(false)
  const [bookmarkOverride, setBookmarkOverride] = useState<Map<string, boolean>>(
    new Map(),
  )

  const problems = useMemo<Problem[]>(() => {
    if (bookmarkOverride.size === 0) return PROBLEMS
    return PROBLEMS.map((p) =>
      bookmarkOverride.has(p.id)
        ? { ...p, bookmarked: bookmarkOverride.get(p.id)! }
        : p,
    )
  }, [bookmarkOverride])

  const filtered = useMemo(() => {
    let list = problems.slice()

    if (status !== "ALL") list = list.filter((p) => p.status === status)
    if (difficulties.size > 0)
      list = list.filter((p) => difficulties.has(p.difficulty))
    if (domains.size > 0) list = list.filter((p) => domains.has(p.domain))
    if (tags.size > 0)
      list = list.filter((p) => p.tags.some((t) => tags.has(t)))
    if (bookmarkedOnly) list = list.filter((p) => p.bookmarked)
    if (premiumOnly) list = list.filter((p) => p.isPremium)

    const q = query.trim().toLowerCase()
    if (q) {
      list = list.filter((p) => {
        const haystack = [
          p.title,
          p.tagline,
          p.description,
          p.code,
          p.domain,
          p.difficulty,
          p.author,
          ...p.tags,
          ...p.companies,
        ]
          .join(" ")
          .toLowerCase()
        return haystack.includes(q)
      })
    }

    switch (sort) {
      case "newest":
        list.sort(
          (a, b) =>
            (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0) ||
            b.solvedCount - a.solvedCount,
        )
        break
      case "popular":
        list.sort((a, b) => b.solvedCount - a.solvedCount)
        break
      case "difficulty-asc":
        list.sort(
          (a, b) =>
            DIFFICULTY_META[a.difficulty].rank -
            DIFFICULTY_META[b.difficulty].rank,
        )
        break
      case "difficulty-desc":
        list.sort(
          (a, b) =>
            DIFFICULTY_META[b.difficulty].rank -
            DIFFICULTY_META[a.difficulty].rank,
        )
        break
      case "shortest":
        list.sort((a, b) => a.estimatedMinutes - b.estimatedMinutes)
        break
      case "highest-xp":
        list.sort((a, b) => b.xp - a.xp)
        break
      case "recommended":
      default:
        // Featured > daily > new > hot > rating
        list.sort((a, b) => {
          const score = (p: Problem) =>
            (p.isFeatured ? 8 : 0) +
            (p.isDaily ? 4 : 0) +
            (p.isNew ? 2 : 0) +
            (p.isHot ? 1 : 0) +
            p.rating / 10
          return score(b) - score(a)
        })
        break
    }
    return list
  }, [
    problems,
    status,
    difficulties,
    domains,
    tags,
    bookmarkedOnly,
    premiumOnly,
    query,
    sort,
  ])

  const toggleDifficulty = (d: Difficulty) => {
    setDifficulties((prev) => {
      const next = new Set(prev)
      if (next.has(d)) next.delete(d)
      else next.add(d)
      return next
    })
  }
  const toggleDomain = (d: Domain) => {
    setDomains((prev) => {
      const next = new Set(prev)
      if (next.has(d)) next.delete(d)
      else next.add(d)
      return next
    })
  }
  const toggleTag = (t: string) => {
    setTags((prev) => {
      const next = new Set(prev)
      if (next.has(t)) next.delete(t)
      else next.add(t)
      return next
    })
  }
  const onClearAll = () => {
    setStatus("ALL")
    setDifficulties(new Set())
    setDomains(new Set())
    setTags(new Set())
    setBookmarkedOnly(false)
    setPremiumOnly(false)
    setQuery("")
  }
  const toggleBookmark = (id: string) => {
    setBookmarkOverride((prev) => {
      const current =
        prev.get(id) ?? PROBLEMS.find((p) => p.id === id)?.bookmarked ?? false
      const next = new Map(prev)
      next.set(id, !current)
      return next
    })
  }

  // Featured + boss derived from full problem set
  const daily = problems.find((p) => p.isDaily) ?? problems.find((p) => p.isFeatured) ?? null
  const bossBattle =
    problems.find(
      (p) =>
        p.isFeatured &&
        (p.difficulty === "Grandmaster" || p.difficulty === "Legendary") &&
        p.id !== daily?.id,
    ) ??
    problems.find(
      (p) =>
        (p.difficulty === "Grandmaster" || p.difficulty === "Legendary") &&
        p.id !== daily?.id,
    ) ??
    null

  const legendaryCount = problems.filter(
    (p) => p.difficulty === "Grandmaster" || p.difficulty === "Legendary",
  ).length
  const newThisWeek = problems.filter((p) => p.isNew).length

  const onOpen = (id: string) => {
    // Hook-up point for a future detail drawer / route
    if (typeof window !== "undefined") {
      console.log("[v0] open problem:", id)
    }
  }

  return (
    <div className="flex min-h-screen w-full bg-void text-text">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar title="Challenge Arena" sector="002_CHALLENGE_ARENA" />

        <main className="relative flex-1 px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
          <div className="mx-auto max-w-[1480px] space-y-5">
            <ArenaHeader
              totalProblems={problems.length}
              legendaryCount={legendaryCount}
              newThisWeek={newThisWeek}
            />

            <FeaturedGauntlet daily={daily} bossBattle={bossBattle} onOpen={onOpen} />

            <div className="grid gap-5 xl:grid-cols-[1fr_320px]">
              <div className="space-y-5">
                <ArenaFilterBar
                  status={status}
                  setStatus={setStatus}
                  difficulties={difficulties}
                  toggleDifficulty={toggleDifficulty}
                  domains={domains}
                  toggleDomain={toggleDomain}
                  tags={tags}
                  toggleTag={toggleTag}
                  sort={sort}
                  setSort={setSort}
                  query={query}
                  setQuery={setQuery}
                  bookmarkedOnly={bookmarkedOnly}
                  setBookmarkedOnly={setBookmarkedOnly}
                  premiumOnly={premiumOnly}
                  setPremiumOnly={setPremiumOnly}
                  totalCount={problems.length}
                  resultCount={filtered.length}
                  problems={problems}
                  onClearAll={onClearAll}
                />

                <ProblemGrid
                  problems={filtered}
                  onOpen={onOpen}
                  onToggleBookmark={toggleBookmark}
                  onClearAll={onClearAll}
                />
              </div>

              <ArenaRail />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
