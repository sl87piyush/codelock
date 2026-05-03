import Link from "next/link"
import { Crown, ArrowLeft, Trophy, Users, Shield } from "lucide-react"
import { CHAMPIONS } from "@/lib/championship-data"

// =============================================================
// HALL OF CHAMPIONS HEADER — gold-saturated banner.
// The total counts come straight from the dataset so it stays
// truthful as new seasons get added.
// =============================================================
export function HallHeader() {
  const seasons = new Set(CHAMPIONS.map((c) => c.season)).size
  const soloCount = CHAMPIONS.filter((c) => c.track === "solo").length
  const duoCount = CHAMPIONS.filter((c) => c.track === "duo").length
  const clanCount = CHAMPIONS.filter((c) => c.track === "clan").length

  return (
    <section className="relative overflow-hidden border border-gold/30 bg-gradient-to-b from-[rgba(40,28,8,0.7)] via-[rgba(20,12,2,0.85)] to-[rgba(10,7,2,0.9)]">
      {/* Gold weave */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #fbbf24 0px, #fbbf24 1px, transparent 1px, transparent 16px)",
        }}
      />
      <div className="pointer-events-none absolute -top-24 right-1/4 h-72 w-72 rounded-full bg-gold/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-1/4 h-72 w-72 rounded-full bg-ember/12 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

      <div className="relative grid gap-8 p-6 md:p-9 lg:grid-cols-[1.2fr_auto] lg:items-end">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/championship"
              className="inline-flex items-center gap-1.5 border border-line/60 bg-void/50 px-2.5 py-1 font-display text-[10px] font-bold tracking-[0.22em] text-text-dim transition-colors hover:border-gold/50 hover:text-gold bl-clip-chevron"
            >
              <ArrowLeft className="h-3 w-3" />
              CHAMPIONSHIP
            </Link>
            <span className="inline-flex h-6 items-center gap-1.5 border border-gold/60 bg-gold/10 px-2.5 font-display text-[10px] font-bold tracking-[0.22em] text-gold bl-clip-chevron">
              <Crown className="h-3 w-3" fill="currentColor" />
              HALL OF CHAMPIONS
            </span>
            <span className="font-mono text-[10px] tracking-[0.2em] text-text-mute">
              {`// SECTOR 015_HALL_OF_CHAMPIONS`}
            </span>
          </div>

          <h1 className="font-display text-4xl font-bold tracking-tight text-text md:text-6xl">
            <span className="text-gold text-glow-ember">Forever</span>{" "}
            <span className="text-text">enshrined.</span>
          </h1>

          <p className="max-w-2xl text-[14px] leading-relaxed text-text-dim text-pretty">
            Every champion in CodeTrackX history. {seasons} seasons. {CHAMPIONS.length} legends.
            One gold frame each — permanently rendered across the platform, on every profile, in
            every match brief, until the heat death of the season server.
          </p>
        </div>

        {/* Tally tiles */}
        <div className="grid grid-cols-3 gap-3 lg:w-[420px]">
          <Tally icon={Trophy} label="SOLO" value={soloCount} />
          <Tally icon={Users} label="DUO" value={duoCount} />
          <Tally icon={Shield} label="CLAN" value={clanCount} />
        </div>
      </div>
    </section>
  )
}

function Tally({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: number
}) {
  return (
    <div className="relative overflow-hidden border border-gold/30 bg-void/40 bl-corners">
      <div className="flex flex-col items-center gap-1 p-4">
        <Icon className="h-4 w-4 text-gold" />
        <div className="font-display text-3xl font-bold leading-none tabular-nums text-gold text-glow-ember">
          {value}
        </div>
        <div className="font-display text-[9px] font-bold tracking-[0.22em] text-text-mute">
          {label}
        </div>
      </div>
    </div>
  )
}
