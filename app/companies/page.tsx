"use client"

import { useMemo, useState } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { TopBar } from "@/components/dashboard/top-bar"
import { CompaniesHeader } from "@/components/companies/companies-header"
import { FeaturedCompanies } from "@/components/companies/featured-companies"
import {
  CompaniesFilterBar,
  type DifficultyFilter,
} from "@/components/companies/companies-filter-bar"
import { CompaniesGrid } from "@/components/companies/companies-grid"
import { CompaniesRail } from "@/components/companies/companies-rail"
import {
  COMPANIES,
  type Company,
  type CompanySort,
  type CompanyTier,
  type QuestionTag,
} from "@/components/companies/companies-data"

export default function CompaniesPage() {
  const [query, setQuery] = useState("")
  const [tier, setTier] = useState<CompanyTier | "ALL">("ALL")
  const [difficulty, setDifficulty] = useState<DifficultyFilter>("ALL")
  const [selectedTags, setSelectedTags] = useState<Set<QuestionTag>>(new Set())
  const [hiringOnly, setHiringOnly] = useState(false)
  const [sort, setSort] = useState<CompanySort>("trending")
  const [bookmarkOverrides, setBookmarkOverrides] = useState<Record<string, boolean>>({})

  const toggleTag = (t: QuestionTag) => {
    setSelectedTags((prev) => {
      const next = new Set(prev)
      if (next.has(t)) next.delete(t)
      else next.add(t)
      return next
    })
  }

  const clearTags = () => setSelectedTags(new Set())

  const onToggleBookmark = (id: string) => {
    setBookmarkOverrides((prev) => {
      const company = COMPANIES.find((c) => c.id === id)
      const current = prev[id] ?? company?.bookmarked ?? false
      return { ...prev, [id]: !current }
    })
  }

  // Apply bookmark overrides and filter/sort
  const enriched: Company[] = useMemo(
    () =>
      COMPANIES.map((c) => ({
        ...c,
        bookmarked:
          bookmarkOverrides[c.id] !== undefined ? bookmarkOverrides[c.id] : !!c.bookmarked,
      })),
    [bookmarkOverrides],
  )

  const filtered = useMemo(() => {
    let list = enriched.slice()

    if (tier !== "ALL") list = list.filter((c) => c.tier === tier)
    if (hiringOnly) list = list.filter((c) => c.hiring)

    if (difficulty !== "ALL") {
      // Show companies whose dominant or significant share is in that bucket (>= 25%)
      list = list.filter((c) => {
        const total = c.totalQuestions || 1
        const ratio =
          difficulty === "EASY"
            ? c.easy / total
            : difficulty === "MEDIUM"
              ? c.medium / total
              : c.hard / total
        return ratio >= 0.2
      })
    }

    if (selectedTags.size > 0) {
      list = list.filter((c) => c.topTags.some((t) => selectedTags.has(t)))
    }

    const q = query.trim().toLowerCase()
    if (q) {
      list = list.filter((c) => {
        const haystack = [
          c.name,
          c.ticker,
          c.industry,
          c.tier,
          c.description,
          ...c.topTags,
          ...c.notableQuestions.map((nq) => nq.title),
        ]
          .join(" ")
          .toLowerCase()
        return haystack.includes(q)
      })
    }

    switch (sort) {
      case "trending":
        list.sort((a, b) => {
          if (!!b.trending !== !!a.trending) return (b.trending ? 1 : 0) - (a.trending ? 1 : 0)
          return a.recentlyAskedDays - b.recentlyAskedDays
        })
        break
      case "questions-desc":
        list.sort((a, b) => b.totalQuestions - a.totalQuestions)
        break
      case "questions-asc":
        list.sort((a, b) => a.totalQuestions - b.totalQuestions)
        break
      case "alpha":
        list.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "hardest":
        list.sort((a, b) => {
          const ar = a.hard / (a.totalQuestions || 1)
          const br = b.hard / (b.totalQuestions || 1)
          return br - ar
        })
        break
    }

    return list
  }, [enriched, tier, hiringOnly, difficulty, selectedTags, query, sort])

  const featured = useMemo(
    () =>
      enriched
        .filter((c) => c.trending)
        .sort((a, b) => a.recentlyAskedDays - b.recentlyAskedDays)
        .slice(0, 4),
    [enriched],
  )

  const onView = (slug: string) => {
    // Placeholder: in a full app, this would navigate to /companies/[slug]
    if (typeof window !== "undefined") {
      window.location.hash = `company-${slug}`
    }
  }

  return (
    <div className="flex min-h-screen w-full bg-void text-text">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar title="Companies" sector="009_COMPANIES" />

        <main className="relative flex-1 px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
          <div className="mx-auto max-w-[1480px] space-y-5">
            <CompaniesHeader />

            <FeaturedCompanies companies={featured} />

            <div className="grid gap-5 xl:grid-cols-[1fr_320px]">
              <div className="space-y-5">
                <CompaniesFilterBar
                  query={query}
                  setQuery={setQuery}
                  tier={tier}
                  setTier={setTier}
                  difficulty={difficulty}
                  setDifficulty={setDifficulty}
                  selectedTags={selectedTags}
                  toggleTag={toggleTag}
                  clearTags={clearTags}
                  hiringOnly={hiringOnly}
                  setHiringOnly={setHiringOnly}
                  sort={sort}
                  setSort={setSort}
                  totalResults={filtered.length}
                  companies={enriched}
                />

                <CompaniesGrid
                  companies={filtered}
                  onView={onView}
                  onToggleBookmark={onToggleBookmark}
                />
              </div>

              <CompaniesRail selectedTags={selectedTags} toggleTag={toggleTag} />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
