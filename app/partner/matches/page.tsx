"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Filter, Search, SlidersHorizontal, Lock, User as UserIcon } from "lucide-react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { TopBar } from "@/components/dashboard/top-bar"
import {
  GlassPanel,
  PartnerAvatar,
  ReliabilityBadge,
  Chip,
} from "@/components/partner/partner-atoms"
import {
  MATCHES,
  USERS,
  TRAINING_CARDS,
  getCard,
  getUser,
  type Language,
  type Pace,
} from "@/components/partner/partner-data"
import { cn } from "@/lib/utils"

type FocusFilter = "all" | "Medium-focused" | "Topic-focused" | "Company-focused"
type RelFilter = "all" | "Elite" | "Solid"

export default function MatchesPage() {
  const [query, setQuery] = useState("")
  const [focusFilter, setFocusFilter] = useState<FocusFilter>("all")
  const [langFilter, setLangFilter] = useState<Language | "all">("all")
  const [paceFilter, setPaceFilter] = useState<Pace | "all">("all")
  const [relFilter, setRelFilter] = useState<RelFilter>("all")

  const filtered = useMemo(() => {
    return MATCHES.filter((m) => {
      const u = getUser(m.id)
      const c = getCard(m.id)
      if (!u || !c) return false
      if (focusFilter !== "all" && c.focus !== focusFilter) return false
      if (langFilter !== "all" && c.language !== langFilter) return false
      if (paceFilter !== "all" && c.pace !== paceFilter) return false
      if (relFilter !== "all" && u.reliabilityTier !== relFilter) return false
      const q = query.trim().toLowerCase()
      if (q) {
        const hay = [
          u.name,
          u.handle,
          u.bio,
          c.targetCompanies.join(" "),
          c.focus,
          c.language,
          c.pace,
        ]
          .join(" ")
          .toLowerCase()
        if (!hay.includes(q)) return false
      }
      return true
    }).sort((a, b) => b.compatibility - a.compatibility)
  }, [query, focusFilter, langFilter, paceFilter, relFilter])

  return (
    <div className="flex min-h-screen w-full bg-void text-text">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar title="Top Matches" sector="012_MATCHING" />
        <main className="relative flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
            <div className="absolute -top-32 right-1/4 h-[400px] w-[700px] bg-electric/10 blur-3xl rounded-full" />
          </div>

          <div className="relative mx-auto max-w-[1280px] space-y-6">
            <Link
              href="/partner"
              className="inline-flex items-center gap-1.5 font-display text-[11px] font-bold tracking-[0.2em] text-text-dim hover:text-neon"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              BACK TO PROGRAM
            </Link>

            {/* Header */}
            <GlassPanel className="p-6" notch>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <div className="font-mono text-[10px] tracking-[0.3em] text-neon/80 uppercase">
                    // SHORTLIST
                  </div>
                  <h2 className="mt-1 font-display text-2xl font-bold tracking-tight">
                    {filtered.length} candidates passed your filter
                  </h2>
                  <p className="mt-1 max-w-2xl text-sm text-text-dim leading-relaxed">
                    Ranked by compatibility. No social feeds, no random DMs —
                    you only see partners who fit your card.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Chip>SORTED · COMPATIBILITY</Chip>
                  <Chip accent="ember">{MATCHES.length} TOTAL</Chip>
                </div>
              </div>
            </GlassPanel>

            {/* Filter bar */}
            <GlassPanel className="p-4">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 border border-line bg-panel/40 px-3 py-2 flex-1 min-w-[220px] focus-within:border-neon/60">
                  <Search className="h-4 w-4 text-text-mute" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by name, company, focus…"
                    className="flex-1 bg-transparent font-mono text-xs text-text placeholder:text-text-mute focus:outline-none"
                  />
                </div>

                <FilterSelect
                  icon={SlidersHorizontal}
                  label="Focus"
                  value={focusFilter}
                  onChange={(v) => setFocusFilter(v as FocusFilter)}
                  options={[
                    { v: "all", l: "All focus" },
                    { v: "Medium-focused", l: "Medium-focused" },
                    { v: "Topic-focused", l: "Topic-focused" },
                    { v: "Company-focused", l: "Company-focused" },
                  ]}
                />
                <FilterSelect
                  icon={Filter}
                  label="Lang"
                  value={langFilter}
                  onChange={(v) => setLangFilter(v as Language | "all")}
                  options={[
                    { v: "all", l: "All langs" },
                    { v: "C++", l: "C++" },
                    { v: "Java", l: "Java" },
                    { v: "Python", l: "Python" },
                  ]}
                />
                <FilterSelect
                  icon={Filter}
                  label="Pace"
                  value={paceFilter}
                  onChange={(v) => setPaceFilter(v as Pace | "all")}
                  options={[
                    { v: "all", l: "All pace" },
                    { v: "Fast", l: "Fast" },
                    { v: "Steady", l: "Steady" },
                    { v: "Slow + Deep", l: "Slow + Deep" },
                  ]}
                />
                <FilterSelect
                  icon={Filter}
                  label="Reliability"
                  value={relFilter}
                  onChange={(v) => setRelFilter(v as RelFilter)}
                  options={[
                    { v: "all", l: "All reliability" },
                    { v: "Elite", l: "Elite only" },
                    { v: "Solid", l: "Solid+" },
                  ]}
                />
              </div>
            </GlassPanel>

            {/* Cards grid */}
            {filtered.length === 0 ? (
              <GlassPanel className="p-10 text-center">
                <UserIcon className="mx-auto h-8 w-8 text-text-mute" />
                <h3 className="mt-3 font-display text-lg font-bold">
                  No candidates match these filters
                </h3>
                <p className="mt-1 text-sm text-text-dim">
                  Try widening your time window or pace.
                </p>
              </GlassPanel>
            ) : (
              <div className="grid gap-5 md:grid-cols-2">
                {filtered.map((m) => (
                  <MatchCard key={m.id} matchId={m.id} compatibility={m.compatibility} chips={m.chips} note={m.note} sharedSlots={m.sharedSlots} />
                ))}
              </div>
            )}

            <p className="text-center text-xs text-text-mute">
              {USERS.length - 1} other users in pool · Re-run after updating your card for better matches.
            </p>
          </div>
        </main>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------

function MatchCard({
  matchId,
  compatibility,
  chips,
  note,
  sharedSlots,
}: {
  matchId: string
  compatibility: number
  chips: string[]
  note: string
  sharedSlots: string[]
}) {
  const u = getUser(matchId)
  const c = TRAINING_CARDS.find((t) => t.userId === matchId)
  if (!u || !c) return null

  return (
    <div className="group relative bl-glass bl-clip-notch p-5 bl-side-stripe transition-transform hover:-translate-y-0.5">
      <div className="flex items-start gap-4">
        <PartnerAvatar user={u} size={56} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-[16px] font-bold tracking-tight text-text truncate">
              {u.name}
            </h3>
            <ReliabilityBadge tier={u.reliabilityTier} score={u.reliabilityScore} compact />
          </div>
          <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 font-mono text-[11px] text-text-dim">
            <span>@{u.handle}</span>
            <span className="opacity-50">·</span>
            <span>{u.city}</span>
          </div>
          <p className="mt-2 text-[13px] text-text-dim leading-relaxed line-clamp-2">
            {note}
          </p>
        </div>
        <div className="flex flex-col items-end shrink-0">
          <span className="font-mono text-[10px] tracking-[0.2em] text-neon/80">
            COMPATIBILITY
          </span>
          <span className="mt-0.5 font-display text-2xl font-bold text-neon tabular-nums text-glow">
            {compatibility}
          </span>
        </div>
      </div>

      {/* Level summary */}
      <div className="mt-4 grid grid-cols-3 gap-2">
        <Mini label="Solved" value={c.level.solved.toString()} />
        <Mini label="IR" value={c.level.internalRating.toString()} />
        <Mini label="Daily" value={`${c.dailyCommitment}m`} />
      </div>

      {/* Compatibility chips */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {chips.map((ch) => (
          <Chip key={ch} size="sm">
            {ch}
          </Chip>
        ))}
      </div>

      {/* Shared slots */}
      <div className="mt-4 border-t border-line/60 pt-3">
        <div className="font-mono text-[10px] tracking-[0.22em] text-text-mute uppercase">
          // SHARED_WINDOWS
        </div>
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {sharedSlots.map((s) => (
            <span
              key={s}
              className="border border-neon/30 bg-neon/5 px-2 py-0.5 font-mono text-[11px] tabular-nums text-neon"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-5 flex items-center gap-2">
        <Link
          href={`/partner/contract/${matchId}`}
          className="bl-btn-primary px-4 py-2.5 text-xs bl-clip-notch flex-1"
        >
          <Lock className="h-3.5 w-3.5" />
          Invite to Lock-In
        </Link>
        <Link
          href={`/partner/profile/${matchId}`}
          className="bl-btn-ghost bl-clip-notch"
        >
          View Profile
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  )
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-line/70 bg-panel/40 px-2 py-1.5 text-center">
      <div className="font-display text-[9px] font-bold tracking-[0.22em] text-text-mute">
        {label}
      </div>
      <div className="font-display text-sm font-bold text-text tabular-nums">
        {value}
      </div>
    </div>
  )
}

function FilterSelect({
  icon: Icon,
  label,
  value,
  onChange,
  options,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  onChange: (v: string) => void
  options: { v: string; l: string }[]
}) {
  return (
    <label className={cn("relative flex items-center gap-2 border border-line bg-panel/40 pl-3 pr-2 hover:border-neon/40")}>
      <Icon className="h-3.5 w-3.5 text-text-mute" />
      <span className="font-display text-[10px] font-bold tracking-[0.18em] text-text-mute uppercase">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-transparent py-2 pr-2 font-mono text-xs text-text focus:outline-none"
      >
        {options.map((o) => (
          <option key={o.v} value={o.v} className="bg-panel">
            {o.l}
          </option>
        ))}
      </select>
    </label>
  )
}
