"use client"

import { useMemo, useState } from "react"
import {
  ArrowUpDown,
  ChevronDown,
  Filter,
  Search,
  Shield,
  Sparkles,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  ALL_FOCUS,
  ALL_REGIONS,
  ALL_TIERS,
  ALL_VIBES,
  TIER_META,
  type ClanFilterTab,
  type ClanFocus,
  type ClanRegion,
  type ClanSort,
  type ClanTier,
  type ClanVibe,
} from "./clan-data"

type Props = {
  // tab
  tab: ClanFilterTab
  setTab: (t: ClanFilterTab) => void
  // search
  query: string
  setQuery: (q: string) => void
  // sort
  sort: ClanSort
  setSort: (s: ClanSort) => void
  // tier filter
  tiers: Set<ClanTier>
  toggleTier: (t: ClanTier) => void
  // region filter
  regions: Set<ClanRegion>
  toggleRegion: (r: ClanRegion) => void
  // vibe filter
  vibes: Set<ClanVibe>
  toggleVibe: (v: ClanVibe) => void
  // focus filter
  focusFilters: Set<ClanFocus>
  toggleFocus: (f: ClanFocus) => void
  // toggles
  recruitingOnly: boolean
  setRecruitingOnly: (b: boolean) => void
  hasVacancyOnly: boolean
  setHasVacancyOnly: (b: boolean) => void
  // counts
  totalCount: number
  resultCount: number
  // actions
  onClearAll: () => void
}

const TABS: {
  id: ClanFilterTab
  label: string
  hint?: string
  accent: "neon" | "ember" | "blood" | "gold" | "electric"
}[] = [
  { id: "ALL", label: "ALL CLANS", accent: "neon" },
  { id: "RECRUITING", label: "RECRUITING", hint: "open seats", accent: "ember" },
  { id: "WARRING", label: "AT WAR", hint: "live now", accent: "blood" },
  { id: "RISING", label: "RISING", hint: "+rank this week", accent: "gold" },
  { id: "INVITE", label: "INVITE-ONLY", accent: "electric" },
]

const SORT_LABELS: Record<ClanSort, string> = {
  recommended: "Recommended",
  "weekly-xp": "Weekly XP",
  trending: "Trending (▲ rank)",
  newest: "Newest",
  "members-asc": "Smallest first",
  "members-desc": "Largest first",
  vacancy: "Most open seats",
  rank: "Rank #",
}

export function ClanArenaFilterBar(props: Props) {
  const [showSort, setShowSort] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)

  const activeFilterCount = useMemo(() => {
    return (
      props.tiers.size +
      props.regions.size +
      props.vibes.size +
      props.focusFilters.size +
      (props.recruitingOnly ? 1 : 0) +
      (props.hasVacancyOnly ? 1 : 0) +
      (props.tab !== "ALL" ? 1 : 0) +
      (props.query.trim() ? 1 : 0)
    )
  }, [props])

  return (
    <section className="relative overflow-hidden border border-line/60 bg-panel/55 bl-glass">
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-25" />
      <div className="relative">
        {/* Tabs */}
        <div className="flex items-stretch overflow-x-auto border-b border-line/60">
          {TABS.map((t) => {
            const active = props.tab === t.id
            const accentClass = {
              neon: "data-[on=true]:text-neon data-[on=true]:border-neon",
              ember: "data-[on=true]:text-ember data-[on=true]:border-ember",
              blood: "data-[on=true]:text-blood data-[on=true]:border-blood",
              gold: "data-[on=true]:text-gold data-[on=true]:border-gold",
              electric:
                "data-[on=true]:text-electric data-[on=true]:border-electric",
            }[t.accent]
            return (
              <button
                key={t.id}
                type="button"
                data-on={active}
                onClick={() => props.setTab(t.id)}
                className={cn(
                  "group relative inline-flex items-center gap-2 whitespace-nowrap px-4 py-3 font-display text-[11px] font-bold tracking-[0.2em] text-text-dim border-b-2 border-transparent transition-colors",
                  "hover:text-text",
                  accentClass,
                )}
              >
                {t.id === "WARRING" && (
                  <span className="h-1.5 w-1.5 rounded-full bg-blood bl-flicker" />
                )}
                {t.label}
                {t.hint && (
                  <span className="font-mono text-[9px] tracking-normal text-text-mute group-hover:text-text-dim">
                    · {t.hint}
                  </span>
                )}
              </button>
            )
          })}
          <div className="ml-auto hidden items-center gap-2 px-4 py-3 sm:flex">
            <span className="font-mono text-[10px] text-text-mute">
              {props.resultCount.toLocaleString()} / {props.totalCount.toLocaleString()} clans
            </span>
          </div>
        </div>

        {/* Toolbar row */}
        <div className="flex flex-wrap items-stretch gap-2 p-3">
          {/* Search */}
          <div className="relative flex-1 min-w-[220px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-mute" />
            <input
              type="search"
              value={props.query}
              onChange={(e) => props.setQuery(e.target.value)}
              placeholder="Search clans, tags, mottos, captains..."
              className={cn(
                "h-10 w-full pl-9 pr-9 bg-void/60 border border-line text-text placeholder:text-text-mute font-mono text-[12px]",
                "focus:outline-none focus:border-neon/50 focus:bg-void/80 focus:shadow-[0_0_0_1px_rgba(0,240,255,0.2)] transition-all",
              )}
            />
            {props.query && (
              <button
                type="button"
                onClick={() => props.setQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center text-text-mute hover:text-blood transition-colors"
                aria-label="Clear search"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Sort */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowSort((v) => !v)}
              className={cn(
                "h-10 inline-flex items-center gap-2 px-3 bg-void/60 border border-line",
                "font-display text-[11px] font-semibold tracking-[0.16em] text-text-dim",
                "hover:text-neon hover:border-neon/40 transition-colors",
              )}
            >
              <ArrowUpDown className="h-3.5 w-3.5" />
              SORT
              <span className="text-neon font-mono text-[10.5px] tracking-normal">
                {SORT_LABELS[props.sort]}
              </span>
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 transition-transform",
                  showSort && "rotate-180",
                )}
              />
            </button>
            {showSort && (
              <div className="absolute right-0 top-[calc(100%+4px)] z-20 w-[220px] border border-neon/30 bg-void/95 backdrop-blur-md py-1 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.65)]">
                {(Object.keys(SORT_LABELS) as ClanSort[]).map((opt) => {
                  const on = props.sort === opt
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        props.setSort(opt)
                        setShowSort(false)
                      }}
                      className={cn(
                        "flex w-full items-center justify-between px-3 py-2 text-left font-mono text-[11.5px] hover:bg-neon/10",
                        on ? "text-neon" : "text-text-dim hover:text-text",
                      )}
                    >
                      {SORT_LABELS[opt]}
                      {on && <span className="text-neon">●</span>}
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {/* Toggles */}
          <ToggleChip
            label="RECRUITING"
            on={props.recruitingOnly}
            onClick={() => props.setRecruitingOnly(!props.recruitingOnly)}
            icon={Sparkles}
            accent="ember"
          />
          <ToggleChip
            label="HAS SEATS"
            on={props.hasVacancyOnly}
            onClick={() => props.setHasVacancyOnly(!props.hasVacancyOnly)}
            icon={Shield}
            accent="neon"
          />

          {/* Advanced toggle */}
          <button
            type="button"
            onClick={() => setShowAdvanced((v) => !v)}
            className={cn(
              "h-10 inline-flex items-center gap-2 px-3 border bg-void/60",
              "font-display text-[11px] font-semibold tracking-[0.16em]",
              showAdvanced
                ? "text-neon border-neon/45"
                : "text-text-dim border-line hover:text-neon hover:border-neon/40",
            )}
          >
            <Filter className="h-3.5 w-3.5" />
            FILTERS
            {activeFilterCount > 0 && (
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-neon/20 px-1.5 font-display text-[10px] font-bold text-neon">
                {activeFilterCount}
              </span>
            )}
          </button>

          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={props.onClearAll}
              className="h-10 inline-flex items-center gap-1.5 px-3 border border-blood/30 bg-blood/5 font-display text-[11px] font-semibold tracking-[0.16em] text-blood/90 hover:bg-blood/10 hover:border-blood/55 transition-colors"
            >
              <X className="h-3.5 w-3.5" />
              CLEAR
            </button>
          )}
        </div>

        {/* Tier strip — always visible because it's the most-used filter */}
        <div className="flex flex-wrap items-center gap-2 px-3 pb-3">
          <span className="font-display text-[10px] font-bold tracking-[0.22em] text-text-mute mr-1">
            TIER
          </span>
          {ALL_TIERS.map((t) => {
            const meta = TIER_META[t]
            const on = props.tiers.has(t)
            return (
              <button
                key={t}
                type="button"
                onClick={() => props.toggleTier(t)}
                className={cn(
                  "inline-flex h-7 items-center gap-1.5 px-2.5 border font-display text-[10.5px] font-bold tracking-[0.18em] transition-colors",
                  on
                    ? cn(meta.chip)
                    : "bg-void/55 text-text-dim border-line hover:text-text hover:border-line-bright/60",
                )}
              >
                <span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    t === "Legend"
                      ? "bg-blood"
                      : t === "Elite"
                        ? "bg-neon"
                        : t === "Gold"
                          ? "bg-gold"
                          : t === "Silver"
                            ? "bg-electric"
                            : "bg-ember",
                  )}
                />
                {t.toUpperCase()}
              </button>
            )
          })}
          <div className="ml-auto sm:hidden font-mono text-[10px] text-text-mute">
            {props.resultCount.toLocaleString()} / {props.totalCount.toLocaleString()}
          </div>
        </div>

        {/* Advanced filter panels */}
        {showAdvanced && (
          <div className="border-t border-line/60 px-3 py-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            <ChipGroup
              label="REGION"
              options={ALL_REGIONS}
              selected={props.regions}
              onToggle={(v) => props.toggleRegion(v as ClanRegion)}
            />
            <ChipGroup
              label="VIBE"
              options={ALL_VIBES}
              selected={props.vibes}
              onToggle={(v) => props.toggleVibe(v as ClanVibe)}
            />
            <ChipGroup
              label="FOCUS"
              options={ALL_FOCUS}
              selected={props.focusFilters}
              onToggle={(v) => props.toggleFocus(v as ClanFocus)}
            />
          </div>
        )}
      </div>
    </section>
  )
}

// --------------------------------------------------------------------

function ToggleChip({
  label,
  on,
  onClick,
  icon: Icon,
  accent,
}: {
  label: string
  on: boolean
  onClick: () => void
  icon: React.ComponentType<{ className?: string }>
  accent: "neon" | "ember"
}) {
  const onMap = {
    neon: "text-neon border-neon/55 bg-neon/10",
    ember: "text-ember border-ember/55 bg-ember/10",
  } as const
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-10 inline-flex items-center gap-1.5 px-3 border bg-void/60 font-display text-[11px] font-bold tracking-[0.18em] transition-colors",
        on
          ? onMap[accent]
          : "text-text-dim border-line hover:text-text hover:border-line-bright/60",
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </button>
  )
}

function ChipGroup<T extends string>({
  label,
  options,
  selected,
  onToggle,
}: {
  label: string
  options: readonly T[]
  selected: Set<T>
  onToggle: (v: T) => void
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="font-display text-[10px] font-bold tracking-[0.22em] text-text-mute">
          {label}
        </span>
        {selected.size > 0 && (
          <span className="font-mono text-[10px] text-neon">{selected.size}</span>
        )}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => {
          const on = selected.has(opt)
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onToggle(opt)}
              className={cn(
                "inline-flex h-7 items-center px-2.5 border font-mono text-[11px] transition-colors",
                on
                  ? "border-neon/55 bg-neon/10 text-neon"
                  : "border-line bg-void/45 text-text-dim hover:text-text hover:border-line-bright/60",
              )}
            >
              {opt}
            </button>
          )
        })}
      </div>
    </div>
  )
}

