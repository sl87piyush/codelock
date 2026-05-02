import { TrendingUp, ArrowUp, ArrowDown, Briefcase, Newspaper, Sparkles } from "lucide-react"
import {
  COMPANIES,
  COMPANY_NEWS,
  HIRING_SPOTLIGHT,
  TRENDING_TAGS,
  type QuestionTag,
} from "./companies-data"
import { CompanyLogo } from "./company-logo"

export function CompaniesRail({
  selectedTags,
  toggleTag,
}: {
  selectedTags: Set<QuestionTag>
  toggleTag: (t: QuestionTag) => void
}) {
  return (
    <aside className="space-y-4">
      <TrendingTags selectedTags={selectedTags} toggleTag={toggleTag} />
      <HiringSpotlight />
      <ProtocolNews />
      <PreparationKit />
    </aside>
  )
}

function TrendingTags({
  selectedTags,
  toggleTag,
}: {
  selectedTags: Set<QuestionTag>
  toggleTag: (t: QuestionTag) => void
}) {
  return (
    <div className="relative overflow-hidden border border-neon/30 bg-panel/70 bl-glass">
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-25" />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-[3px] bg-neon opacity-70" />

      <div className="relative flex items-center justify-between border-b border-line/60 px-4 py-3">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-neon" />
          <span className="font-display text-[11.5px] font-bold tracking-[0.22em] text-text">
            TRENDING TAGS
          </span>
        </div>
        <span className="font-mono text-[10px] tracking-[0.16em] text-text-mute">
          7D DELTA
        </span>
      </div>

      <ul className="relative divide-y divide-line/40">
        {TRENDING_TAGS.map((t) => {
          const active = selectedTags.has(t.tag)
          const positive = t.delta >= 0
          return (
            <li key={t.tag}>
              <button
                type="button"
                onClick={() => toggleTag(t.tag)}
                className="group flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-void/40"
                aria-pressed={active}
              >
                <span
                  className={`inline-flex h-6 items-center border px-2 font-display text-[10px] font-bold tracking-[0.2em] transition-colors ${
                    active
                      ? "border-neon/50 bg-neon/10 text-neon"
                      : "border-line/60 bg-void/50 text-text-dim group-hover:text-text"
                  }`}
                >
                  {t.tag.toUpperCase()}
                </span>
                <span className="ml-auto font-mono text-[11px] tabular-nums text-text-dim">
                  {t.count.toLocaleString()}
                </span>
                <span
                  className={`inline-flex h-5 items-center gap-0.5 border px-1.5 font-display text-[9.5px] font-bold tabular-nums tracking-[0.14em] ${
                    positive
                      ? "border-neon/40 bg-neon/10 text-neon"
                      : "border-blood/40 bg-blood/10 text-blood"
                  }`}
                >
                  {positive ? (
                    <ArrowUp className="h-2.5 w-2.5" />
                  ) : (
                    <ArrowDown className="h-2.5 w-2.5" />
                  )}
                  {Math.abs(t.delta)}%
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function HiringSpotlight() {
  // Map handles back to companies for logo data
  const items = HIRING_SPOTLIGHT.map((h) => {
    const company = COMPANIES.find((c) => c.name === h.handle)
    return { ...h, company }
  })

  return (
    <div className="relative overflow-hidden border border-blood/30 bg-panel/70 bl-glass">
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-25" />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-[3px] bg-blood opacity-70" />

      <div className="relative flex items-center justify-between border-b border-line/60 px-4 py-3">
        <div className="flex items-center gap-2">
          <Briefcase className="h-4 w-4 text-blood" />
          <span className="font-display text-[11.5px] font-bold tracking-[0.22em] text-text">
            HIRING SPOTLIGHT
          </span>
        </div>
        <span className="inline-flex h-5 items-center gap-1.5 border border-blood/40 bg-blood/10 px-1.5 font-display text-[9px] font-bold tracking-[0.18em] text-blood">
          <span className="relative h-1 w-1 rounded-full bg-blood">
            <span className="absolute inset-0 rounded-full bg-blood/60 animate-ping" />
          </span>
          LIVE
        </span>
      </div>

      <ul className="relative divide-y divide-line/40">
        {items.map((item) => (
          <li
            key={item.handle + item.role}
            className="flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-void/40"
          >
            {item.company ? (
              <CompanyLogo company={item.company} size="sm" />
            ) : (
              <div className="h-8 w-8 border border-line/60 bg-void" />
            )}
            <div className="min-w-0 flex-1 leading-tight">
              <div className="flex items-center gap-1.5">
                <span className="truncate font-mono text-[12px] text-text">
                  {item.handle}
                </span>
                <span className="font-mono text-[9.5px] tracking-[0.14em] text-text-mute">
                  {item.flag}
                </span>
              </div>
              <div className="truncate font-display text-[10px] font-bold tracking-[0.16em] text-text-dim">
                {item.role.toUpperCase()}
              </div>
            </div>
            <span className="font-display text-[10px] font-bold tracking-[0.18em] text-ember">
              {item.lp}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ProtocolNews() {
  return (
    <div className="relative overflow-hidden border border-line/60 bg-panel/70 bl-glass">
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-20" />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-[3px] bg-electric opacity-60" />

      <div className="relative flex items-center gap-2 border-b border-line/60 px-4 py-3">
        <Newspaper className="h-4 w-4 text-electric" />
        <span className="font-display text-[11.5px] font-bold tracking-[0.22em] text-text">
          PROTOCOL FEED
        </span>
      </div>

      <ul className="relative divide-y divide-line/40">
        {COMPANY_NEWS.map((n) => (
          <li key={n.id} className="px-4 py-3 transition-colors hover:bg-void/40">
            <div className="flex items-center gap-2 pb-1">
              <span className="inline-flex h-4 items-center border border-electric/40 bg-electric/10 px-1.5 font-display text-[8.5px] font-bold tracking-[0.22em] text-electric">
                {n.tag}
              </span>
              <span className="font-mono text-[9.5px] tracking-[0.14em] text-text-mute">
                {n.timeAgo}
              </span>
            </div>
            <div className="text-[12.5px] leading-snug text-text-dim">{n.title}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

function PreparationKit() {
  return (
    <div className="relative overflow-hidden border border-ember/40 bg-panel/70 bl-glass">
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-25" />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-[3px] bg-ember opacity-70" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-ember/10 to-transparent" />

      <div className="relative space-y-3 px-4 py-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-ember" />
          <span className="font-display text-[11.5px] font-bold tracking-[0.22em] text-text">
            PREP KIT
          </span>
        </div>

        <p className="text-[12.5px] leading-relaxed text-text-dim">
          Auto-generate a 7-day plan tailored to your target company&apos;s
          patterns. Tracks your weak spots and adjusts difficulty as you go.
        </p>

        <button
          type="button"
          className="inline-flex h-9 w-full items-center justify-center gap-1.5 px-3 font-display text-[11px] font-bold tracking-[0.22em] bl-btn-primary bl-clip-chevron"
        >
          BUILD MY PLAN
        </button>
      </div>
    </div>
  )
}
