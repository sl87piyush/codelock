import { Flame, ChevronRight, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { type Company, tierAccent } from "./companies-data"
import { CompanyLogo } from "./company-logo"

export function FeaturedCompanies({ companies }: { companies: Company[] }) {
  if (companies.length === 0) return null

  return (
    <section className="relative space-y-3">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Flame className="h-4 w-4 text-ember" />
          <h2 className="font-display text-xl font-bold tracking-tight text-text">
            Most Asked This Week
          </h2>
        </div>
        <span className="inline-flex h-6 items-center gap-1.5 border border-ember/40 bg-ember/10 px-2 font-display text-[10px] font-bold tracking-[0.18em] text-ember">
          <TrendingUp className="h-3 w-3" />
          TRENDING
        </span>
        <div className="h-px flex-1 bg-line/60" />
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {companies.slice(0, 4).map((c) => (
          <FeaturedTile key={c.id} company={c} />
        ))}
      </div>
    </section>
  )
}

function FeaturedTile({ company }: { company: Company }) {
  const a = tierAccent(company.tier)
  return (
    <a
      href={`#company-${company.slug}`}
      className={cn(
        "group relative flex items-center gap-3 overflow-hidden border bg-panel/60 bl-glass p-3 transition-all",
        a.border,
        "hover:border-neon/60 hover:-translate-y-0.5",
      )}
    >
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-20" />
      <div
        className={cn(
          "pointer-events-none absolute inset-y-0 left-0 w-[3px] opacity-80",
          a.bar,
        )}
      />

      <CompanyLogo company={company} size="md" />

      <div className="relative min-w-0 flex-1 leading-tight">
        <div className="flex items-center gap-1.5">
          <span className="truncate font-display text-[14px] font-bold text-text">
            {company.name}
          </span>
          <span className={cn("font-display text-[8.5px] font-bold tracking-[0.22em]", a.text)}>
            {company.tier}
          </span>
        </div>
        <div className="mt-1 flex items-center gap-1.5 font-mono text-[10px] tracking-tight text-text-mute">
          <span className="tabular-nums text-text-dim">{company.totalQuestions}</span>
          <span>QUESTIONS</span>
          <span className="text-line">·</span>
          <span className="tabular-nums">{company.avgAcceptance}%</span>
        </div>
      </div>

      <ChevronRight className="relative h-4 w-4 shrink-0 text-text-mute transition-colors group-hover:text-neon" />
    </a>
  )
}
