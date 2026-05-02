import { Building2, Briefcase, Flame, ListChecks, Sparkles } from "lucide-react"
import { COMPANY_STATS } from "./companies-data"

export function CompaniesHeader() {
  return (
    <section className="relative overflow-hidden border border-line/60 bg-panel/70 bl-glass">
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-30" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-neon/10 via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-neon/60 to-transparent" />

      <div className="relative grid gap-6 p-6 md:p-8 lg:grid-cols-[1fr_auto] lg:items-end">
        {/* Title block */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-6 items-center gap-1.5 border border-neon/50 bg-neon/10 px-2.5 font-display text-[10px] font-bold tracking-[0.22em] text-neon bl-clip-chevron">
              <Sparkles className="h-3 w-3" />
              COMPANIES PROTOCOL
            </span>
            <span className="font-mono text-[10px] tracking-[0.2em] text-text-mute">
              {"// SECTOR 009"}
            </span>
          </div>
          <h1 className="font-display text-4xl font-bold tracking-tight text-text md:text-5xl">
            Crack <span className="text-neon text-glow">every</span> interview.
          </h1>
          <p className="max-w-2xl text-[14px] leading-relaxed text-text-dim">
            Curated company-tagged questions from real onsites. Filter by tier,
            tag, or difficulty — drill the patterns each company actually loves,
            and walk in with the answers already in your bones.
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="inline-flex h-7 items-center gap-1.5 border border-blood/50 bg-blood/15 px-2.5 font-display text-[11px] font-bold tracking-[0.16em] text-blood">
              <span className="relative h-1.5 w-1.5 rounded-full bg-blood">
                <span className="absolute inset-0 rounded-full bg-blood/60 animate-ping" />
              </span>
              {COMPANY_STATS.hiringNow} HIRING NOW
            </span>
            <span className="inline-flex h-7 items-center gap-1.5 border border-ember/40 bg-ember/10 px-2.5 font-display text-[11px] font-bold tracking-[0.16em] text-ember">
              <Flame className="h-3 w-3" />
              {COMPANY_STATS.trendingNow} TRENDING
            </span>
            <span className="inline-flex h-7 items-center gap-1.5 border border-neon/40 bg-neon/10 px-2.5 font-display text-[11px] font-bold tracking-[0.16em] text-neon">
              VERIFIED FROM 12,400+ ONSITES
            </span>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatTile
            icon={Building2}
            label="Companies"
            value={String(COMPANY_STATS.totalCompanies)}
            accent="neon"
          />
          <StatTile
            icon={ListChecks}
            label="Questions"
            value={`${(COMPANY_STATS.totalQuestions / 1000).toFixed(1)}k`}
            accent="electric"
          />
          <StatTile
            icon={Briefcase}
            label="Hiring"
            value={String(COMPANY_STATS.hiringNow)}
            accent="ember"
          />
          <StatTile
            icon={Flame}
            label="Trending"
            value={String(COMPANY_STATS.trendingNow)}
            accent="gold"
          />
        </div>
      </div>
    </section>
  )
}

function StatTile({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  accent: "neon" | "ember" | "gold" | "electric"
}) {
  const accents = {
    neon: { text: "text-neon", border: "border-neon/40", glow: "text-glow" },
    ember: { text: "text-ember", border: "border-ember/40", glow: "text-glow-ember" },
    gold: { text: "text-gold", border: "border-gold/40", glow: "text-glow-ember" },
    electric: { text: "text-electric", border: "border-electric/40", glow: "" },
  }[accent]

  return (
    <div className={`relative overflow-hidden border ${accents.border} bg-void/40 bl-corners`}>
      <div className="flex flex-col gap-1.5 p-3">
        <div className="flex items-center gap-1.5 font-display text-[9px] font-bold tracking-[0.22em] text-text-mute">
          <Icon className={`h-3.5 w-3.5 ${accents.text}`} />
          {label}
        </div>
        <div className={`font-display text-2xl font-bold leading-none ${accents.text} ${accents.glow}`}>
          {value}
        </div>
      </div>
    </div>
  )
}
