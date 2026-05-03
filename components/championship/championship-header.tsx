import { Crown, Trophy, Globe2, Users2, Radio } from "lucide-react"
import { LiveCountdown } from "./championship-atoms"
import { SEASON } from "@/lib/championship-data"

// =============================================================
// CHAMPIONSHIP HERO — the once-a-year flagship banner.
// Showcases season label, registration countdown, and the four
// scoreboard stats that define the prestige of the event.
// =============================================================
export function ChampionshipHeader() {
  return (
    <section className="relative overflow-hidden border border-line/60 bg-panel/70 bl-glass">
      {/* Backdrops */}
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-30" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #fbbf24 0px, #fbbf24 1px, transparent 1px, transparent 18px)",
        }}
      />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-ember/12 via-transparent to-transparent" />
      <div className="pointer-events-none absolute -top-24 right-1/3 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-ember/60 to-transparent" />

      <div className="relative grid gap-8 p-6 md:p-9 lg:grid-cols-[1.2fr_auto] lg:items-end">
        {/* Title block */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex h-6 items-center gap-1.5 border border-gold/60 bg-gold/10 px-2.5 font-display text-[10px] font-bold tracking-[0.22em] text-gold bl-clip-chevron">
              <Crown className="h-3 w-3" fill="currentColor" />
              CHAMPIONSHIP {SEASON.hashTag}
            </span>
            <span className="inline-flex h-6 items-center gap-1.5 border border-blood/50 bg-blood/15 px-2.5 font-display text-[10px] font-bold tracking-[0.22em] text-blood">
              <Radio className="h-3 w-3" />
              REGISTRATION OPEN
            </span>
            <span className="font-mono text-[10px] tracking-[0.2em] text-text-mute">
              {`// SECTOR 014_CHAMPIONSHIP`}
            </span>
          </div>

          <h1 className="font-display text-4xl font-bold tracking-tight text-text md:text-6xl">
            <span className="text-text">{SEASON.label}</span>
            <span className="ml-2 text-ember text-glow-ember">·</span>
            <br className="hidden md:block" />
            <span className="text-ember text-glow-ember">One Champion.</span>{" "}
            <span className="text-text">Forever.</span>
          </h1>

          <p className="max-w-2xl text-[14px] leading-relaxed text-text-dim text-pretty">
            {SEASON.description}
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="font-display text-[10px] font-bold tracking-[0.22em] text-text-mute">
              REGISTRATION CLOSES IN
            </span>
          </div>

          <LiveCountdown targetIso={SEASON.registrationDeadline} variant="ember" />
        </div>

        {/* Scoreboard stats */}
        <div className="grid grid-cols-2 gap-3 lg:w-[420px]">
          <StatTile
            icon={Users2}
            label="Registrants"
            value={SEASON.totalRegistrants.toLocaleString()}
            accent="neon"
          />
          <StatTile
            icon={Trophy}
            label="Tracks"
            value="3"
            sub="Solo · Duo · Clan"
            accent="ember"
          />
          <StatTile
            icon={Crown}
            label="Finals"
            value="June 14"
            sub="Online · Live"
            accent="gold"
          />
          <StatTile
            icon={Globe2}
            label="Region"
            value="India"
            sub={`${(SEASON.finalsViewers / 1000).toFixed(0)}k peak viewers`}
            accent="electric"
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
  sub,
  accent,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  sub?: string
  accent: "neon" | "ember" | "gold" | "electric"
}) {
  const accents = {
    neon: { text: "text-neon", border: "border-neon/40", glow: "text-glow" },
    ember: { text: "text-ember", border: "border-ember/40", glow: "text-glow-ember" },
    gold: { text: "text-gold", border: "border-gold/50", glow: "text-glow-ember" },
    electric: { text: "text-electric", border: "border-electric/40", glow: "" },
  }[accent]

  return (
    <div className={`relative overflow-hidden border ${accents.border} bg-void/40 bl-corners`}>
      <div className="flex flex-col gap-1.5 p-3">
        <div className="flex items-center gap-1.5 font-display text-[9px] font-bold tracking-[0.22em] text-text-mute">
          <Icon className={`h-3.5 w-3.5 ${accents.text}`} />
          {label}
        </div>
        <div className={`font-display text-2xl font-bold leading-none tabular-nums ${accents.text} ${accents.glow}`}>
          {value}
        </div>
        {sub && (
          <div className="font-mono text-[10px] tracking-wider text-text-mute">{sub}</div>
        )}
      </div>
    </div>
  )
}
