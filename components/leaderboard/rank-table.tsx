"use client"

import { useEffect, useMemo, useState } from "react"
import { ChevronLeft, ChevronRight, Search } from "lucide-react"
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { RankRow } from "./rank-row"
import type { Warrior } from "./leaderboard-data"
import { cn } from "@/lib/utils"

const PAGE_SIZE = 10

export function RankTable({
  warriors,
  search,
}: {
  warriors: Warrior[]
  search: string
}) {
  const [page, setPage] = useState(1)
  const totalPages = Math.max(1, Math.ceil(warriors.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const start = (safePage - 1) * PAGE_SIZE
  const visible = useMemo(
    () => warriors.slice(start, start + PAGE_SIZE),
    [warriors, start],
  )

  // Reset to page 1 when filters change the dataset length
  useEffect(() => {
    setPage(1)
  }, [warriors.length])

  return (
    <div className="relative overflow-hidden border border-line/60 bg-panel/40 bl-glass">
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-20" />

      {/* Header */}
      <div className="relative flex items-center justify-between border-b border-line/60 px-4 py-3 md:px-5">
        <div className="flex items-center gap-2">
          <h2 className="font-display text-[12px] font-bold tracking-[0.28em] text-text">
            FULL RANKINGS
          </h2>
          <span className="inline-flex items-center border border-neon/40 bg-neon/10 px-1.5 py-0.5 font-mono text-[10px] tracking-[0.15em] text-neon">
            {warriors.length}
          </span>
        </div>
        <div className="font-mono text-[10px] tracking-[0.18em] text-text-mute">
          PAGE {safePage} / {totalPages}
        </div>
      </div>

      {/* Column headers (md+) */}
      <div className="relative hidden border-b border-line/40 bg-void/40 md:grid md:grid-cols-[64px_minmax(220px,1.6fr)_120px_120px_140px_120px_60px] md:gap-4 md:px-5">
        <ColHeader>RANK</ColHeader>
        <ColHeader>WARRIOR</ColHeader>
        <ColHeader>DIVISION</ColHeader>
        <ColHeader>LP</ColHeader>
        <ColHeader>WIN RATE</ColHeader>
        <ColHeader>BATTLES</ColHeader>
        <ColHeader className="text-right">Δ</ColHeader>
      </div>

      {/* Rows */}
      <div className="relative">
        {visible.length === 0 ? (
          <Empty className="py-16">
            <EmptyHeader>
              <EmptyMedia variant="icon" className="border border-line/60 bg-void">
                <Search className="text-text-mute" />
              </EmptyMedia>
              <EmptyTitle className="font-display tracking-tight">
                No warriors match
              </EmptyTitle>
              <EmptyDescription>
                {search
                  ? `No results for "${search}". Try a different name or clear filters.`
                  : "Adjust your filters to find warriors."}
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          visible.map((w) => <RankRow key={w.username} warrior={w} />)
        )}
      </div>

      {/* Pagination */}
      {warriors.length > PAGE_SIZE && (
        <div className="relative flex items-center justify-between gap-3 border-t border-line/60 px-4 py-3 md:px-5">
          <div className="font-mono text-[11px] tracking-[0.15em] text-text-mute">
            SHOWING {start + 1}–{Math.min(start + PAGE_SIZE, warriors.length)} OF{" "}
            {warriors.length}
          </div>
          <div className="flex items-center gap-1">
            <PageBtn
              disabled={safePage === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </PageBtn>
            {pageNumbers(safePage, totalPages).map((n, i) =>
              n === "…" ? (
                <span
                  key={`g-${i}`}
                  className="px-1 font-mono text-[11px] text-text-mute"
                >
                  …
                </span>
              ) : (
                <PageBtn
                  key={n}
                  active={n === safePage}
                  onClick={() => setPage(n as number)}
                >
                  {n}
                </PageBtn>
              ),
            )}
            <PageBtn
              disabled={safePage === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </PageBtn>
          </div>
        </div>
      )}
    </div>
  )
}

function ColHeader({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "py-2 font-display text-[10px] font-bold tracking-[0.22em] text-text-mute",
        className,
      )}
    >
      {children}
    </div>
  )
}

function PageBtn({
  children,
  active,
  disabled,
  onClick,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "inline-flex h-8 min-w-[32px] items-center justify-center px-2 font-display text-[11px] font-bold tracking-[0.1em] transition-all",
        active
          ? "bg-neon text-void shadow-[0_0_18px_rgba(0,240,255,0.4)]"
          : "border border-line/60 bg-void/60 text-text-dim hover:border-neon/40 hover:text-text",
        disabled && "opacity-40 pointer-events-none",
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

function pageNumbers(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const pages: (number | "…")[] = [1]
  if (current > 3) pages.push("…")
  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)
  for (let i = start; i <= end; i++) pages.push(i)
  if (current < total - 2) pages.push("…")
  pages.push(total)
  return pages
}
