"use client"

import { useMemo, useState } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { TopBar } from "@/components/dashboard/top-bar"
import { DoubtHeader } from "@/components/doubt/doubt-header"
import { AskDoubtForm } from "@/components/doubt/ask-doubt-form"
import { DoubtFilterBar } from "@/components/doubt/doubt-filter-bar"
import { DoubtFeed } from "@/components/doubt/doubt-feed"
import { DoubtRail } from "@/components/doubt/doubt-rail"
import { DoubtDetailDrawer } from "@/components/doubt/doubt-detail-drawer"
import {
  DOUBTS,
  type SortId,
  type StatusFilterId,
  type TopicId,
} from "@/components/doubt/doubt-data"

const TIME_TO_MIN: Record<string, number> = {
  m: 1,
  h: 60,
  d: 60 * 24,
}

function postedAtToMinutes(s: string): number {
  // Crude parser: "12m" -> 12, "1h" -> 60, "3d" -> 4320
  const match = s.match(/^(\d+)([mhd])$/)
  if (!match) return Number.MAX_SAFE_INTEGER
  return Number(match[1]) * (TIME_TO_MIN[match[2]] ?? 1)
}

export default function DoubtPage() {
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState<SortId>("trending")
  const [status, setStatus] = useState<StatusFilterId>("all")
  const [topic, setTopic] = useState<TopicId>("all")
  const [votedIds, setVotedIds] = useState<Set<string>>(new Set())
  const [activeDoubtId, setActiveDoubtId] = useState<string | null>(null)

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    let list = DOUBTS.filter((d) => {
      if (topic !== "all" && d.topic !== topic) return false
      if (status === "open" && d.status !== "OPEN") return false
      if (status === "resolved" && d.status !== "RESOLVED") return false
      if (status === "bounty" && d.status !== "BOUNTY") return false
      if (!q) return true
      return (
        d.title.toLowerCase().includes(q) ||
        d.body.toLowerCase().includes(q) ||
        d.tags.some((t) => t.toLowerCase().includes(q)) ||
        d.author.username.toLowerCase().includes(q) ||
        d.id.toLowerCase().includes(q)
      )
    })

    list = [...list]
    if (sort === "newest") {
      list.sort((a, b) => postedAtToMinutes(a.postedAt) - postedAtToMinutes(b.postedAt))
    } else if (sort === "votes") {
      list.sort((a, b) => b.upvotes - a.upvotes)
    } else if (sort === "unanswered") {
      list = list.filter((d) => d.answers.length === 0)
      list.sort((a, b) => postedAtToMinutes(a.postedAt) - postedAtToMinutes(b.postedAt))
    } else {
      // trending: hot first, then bounty, then by upvotes/recency mix
      list.sort((a, b) => {
        const ah = (a.isHot ? 1 : 0) * 1000 + a.upvotes
        const bh = (b.isHot ? 1 : 0) * 1000 + b.upvotes
        return bh - ah
      })
    }
    return list
  }, [search, sort, status, topic])

  const activeDoubt = activeDoubtId
    ? DOUBTS.find((d) => d.id === activeDoubtId) ?? null
    : null

  const toggleVote = (id: string) => {
    setVotedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="flex min-h-screen bg-bg text-text">
      <Sidebar />

      <div className="relative flex-1 min-w-0">
        <div className="pointer-events-none fixed inset-0 bl-grid opacity-20" />
        <div className="pointer-events-none fixed -top-40 right-0 h-80 w-80 rounded-full bg-neon/5 blur-3xl" />
        <div className="pointer-events-none fixed -bottom-40 left-1/3 h-80 w-80 rounded-full bg-ember/5 blur-3xl" />

        <TopBar title="Doubts" sector="009_DOUBT_PROTOCOL" />

        <main className="relative">
          <div className="mx-auto flex max-w-[1480px] flex-col gap-6 px-4 py-6 lg:px-8 lg:py-8">
            <DoubtHeader />

            <AskDoubtForm />

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_340px]">
              <div className="flex min-w-0 flex-col gap-4">
                <div className="border border-line/60 bg-panel/40 p-4 bl-glass md:p-5">
                  <DoubtFilterBar
                    search={search}
                    setSearch={setSearch}
                    sort={sort}
                    setSort={setSort}
                    status={status}
                    setStatus={setStatus}
                    topic={topic}
                    setTopic={setTopic}
                    total={filtered.length}
                  />
                </div>

                <DoubtFeed
                  doubts={filtered}
                  votedIds={votedIds}
                  onToggleVote={toggleVote}
                  onOpen={(id) => setActiveDoubtId(id)}
                />
              </div>

              <DoubtRail />
            </div>
          </div>
        </main>
      </div>

      <DoubtDetailDrawer
        doubt={activeDoubt}
        open={!!activeDoubt}
        onClose={() => setActiveDoubtId(null)}
      />
    </div>
  )
}
