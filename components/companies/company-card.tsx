"use client"

import {
  ArrowUpRight,
  Bookmark,
  BookmarkCheck,
  CalendarClock,
  Flame,
  Briefcase,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { type Company, formatRecentlyAsked, tierAccent } from "./companies-data"
import { CompanyLogo } from "./company-logo"

export function CompanyCard({
  company,
  onView,
  onToggleBookmark,
}: {
  company: Company
  onView: (slug: string) => void
  onToggleBookmark: (id: string) => void
}) {
  const a = tierAccent(company.tier)
  const total = company.totalQuestions
  const easyPct = (company.easy / total) * 100
  const medPct = (company.medium / total) * 100
  const hardPct = (company.hard / total) * 100

  return (
    <article
      id={`company-${company.slug}`}
      className={cn(
        "group relative flex flex-col overflow-hidden border bg-panel/60 bl-glass transition-all",
        a.border,
        "hover:border-neon/60 hover:shadow-[0_0_28px_-6px_rgba(0,240,255,0.18)]",
      )}
    >
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-25" />
      <div
        className={cn(
          "pointer-events-none absolute inset-y-0 left-0 w-[3px] opacity-80",
          a.bar,
        )}
      />

      {/* Top row — tier badge + ticker + bookmark */}
      <div className="relative flex items-center justify-between border-b border-line/60 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "inline-flex h-5 items-center gap-1 border px-2 font-display text-[9.5px] font-bold tracking-[0.22em] bl-clip-chevron",
              a.bg,
              a.border,
              a.text,
            )}
          >
            {company.tier}
          </span>
          {company.trending && (
            <span className="inline-flex h-5 items-center gap-1 border border-ember/40 bg-ember/10 px-1.5 font-display text-[9px] font-bold tracking-[0.18em] text-ember">
              <Flame className="h-2.5 w-2.5" />
              HOT
            </span>
          )}
          {company.hiring && (
            <span className="inline-flex h-5 items-center gap-1 border border-blood/50 bg-blood/10 px-1.5 font-display text-[9px] font-bold tracking-[0.18em] text-blood">
              <Briefcase className="h-2.5 w-2.5" />
              HIRING
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-[10px] tracking-[0.16em] text-text-mute">
            {company.ticker}
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onToggleBookmark(company.id)
            }}
            className="inline-flex h-6 w-6 items-center justify-center text-text-mute hover:text-neon transition-colors"
            aria-label={company.bookmarked ? "Remove bookmark" : "Bookmark company"}
            aria-pressed={!!company.bookmarked}
          >
            {company.bookmarked ? (
              <BookmarkCheck className="h-3.5 w-3.5 text-neon" />
            ) : (
              <Bookmark className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="relative flex-1 px-4 py-4">
        <div className="flex items-start gap-3">
          <CompanyLogo company={company} size="lg" />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 pb-1 font-display text-[9.5px] font-bold tracking-[0.22em] text-text-mute">
              <span>{company.industry.toUpperCase()}</span>
            </div>
            <h3 className="font-display text-[18px] font-bold leading-tight tracking-tight text-text">
              {company.name}
            </h3>
            <p className="mt-1 line-clamp-2 text-[12.5px] leading-relaxed text-text-dim">
              {company.description}
            </p>
          </div>
        </div>

        {/* Question count headline */}
        <div className="mt-4 flex items-end justify-between border-t border-line/40 pt-3">
          <div>
            <div className="font-display text-[9px] font-bold tracking-[0.22em] text-text-mute">
              QUESTIONS TRACKED
            </div>
            <div className="flex items-baseline gap-2">
              <span
                className={cn(
                  "font-display text-3xl font-bold leading-none tabular-nums",
                  a.text,
                )}
              >
                {company.totalQuestions.toLocaleString()}
              </span>
              <span className="font-mono text-[10px] tracking-[0.14em] text-text-mute">
                AVG ACC {company.avgAcceptance}%
              </span>
            </div>
          </div>
          <div className="text-right leading-tight">
            <div className="font-display text-[9px] font-bold tracking-[0.22em] text-text-mute">
              ASKED
            </div>
            <div className="flex items-center justify-end gap-1 font-mono text-[12px] text-text">
              <CalendarClock className="h-3 w-3 text-neon" />
              {formatRecentlyAsked(company.recentlyAskedDays)}
            </div>
          </div>
        </div>

        {/* Difficulty stacked bar */}
        <div className="mt-3 space-y-1">
          <div className="flex items-center justify-between font-display text-[9px] font-bold tracking-[0.2em] text-text-mute">
            <span>DIFFICULTY MIX</span>
            <span className="font-mono tabular-nums text-text-dim">
              <span className="text-neon">{company.easy}</span>
              <span className="px-1 text-line">·</span>
              <span className="text-ember">{company.medium}</span>
              <span className="px-1 text-line">·</span>
              <span className="text-blood">{company.hard}</span>
            </span>
          </div>
          <div className="bl-bar-track flex h-1.5 overflow-hidden">
            <div
              className="bg-neon shadow-[0_0_8px_currentColor]"
              style={{ width: `${easyPct}%` }}
              aria-label={`${company.easy} easy questions`}
            />
            <div
              className="bg-ember shadow-[0_0_8px_currentColor]"
              style={{ width: `${medPct}%` }}
              aria-label={`${company.medium} medium questions`}
            />
            <div
              className="bg-blood shadow-[0_0_8px_currentColor]"
              style={{ width: `${hardPct}%` }}
              aria-label={`${company.hard} hard questions`}
            />
          </div>
        </div>

        {/* Top tags */}
        <div className="mt-3 flex flex-wrap gap-1">
          {company.topTags.slice(0, 5).map((t) => (
            <span
              key={t}
              className="inline-flex h-5 items-center border border-line/60 bg-void/40 px-1.5 font-mono text-[9.5px] tracking-[0.1em] text-text-dim"
            >
              {t.toUpperCase()}
            </span>
          ))}
        </div>
      </div>

      {/* Footer — top question + CTA */}
      <div className="relative flex items-center justify-between gap-2 border-t border-line/60 bg-void/30 px-4 py-2.5">
        <div className="min-w-0 flex-1">
          <div className="font-display text-[9px] font-bold tracking-[0.22em] text-text-mute">
            TOP QUESTION
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <span className="truncate font-mono text-[11.5px] text-text">
              {company.notableQuestions[0]?.title ?? "—"}
            </span>
            {company.notableQuestions[0] && (
              <span
                className={cn(
                  "shrink-0 font-display text-[8.5px] font-bold tracking-[0.2em]",
                  company.notableQuestions[0].difficulty === "EASY"
                    ? "text-neon"
                    : company.notableQuestions[0].difficulty === "MEDIUM"
                      ? "text-ember"
                      : "text-blood",
                )}
              >
                {company.notableQuestions[0].difficulty}
              </span>
            )}
          </div>
        </div>
        <button
          type="button"
          onClick={() => onView(company.slug)}
          className={cn(
            "inline-flex h-8 shrink-0 items-center gap-1.5 px-3 font-display text-[10.5px] font-bold tracking-[0.18em] transition-all bl-clip-chevron",
            "border border-neon/50 bg-neon/10 text-neon hover:bg-neon/20",
          )}
        >
          EXPLORE
          <ArrowUpRight className="h-3 w-3" />
        </button>
      </div>
    </article>
  )
}
