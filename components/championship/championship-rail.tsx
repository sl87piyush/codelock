import Link from "next/link"
import { Award, ArrowRight, Calendar, Eye, ScrollText, BadgeCheck } from "lucide-react"
import { ChampionFrame, LiveClockStripe } from "./championship-atoms"
import { CHAMPIONS, SEASON, getTrackMeta, type Track } from "@/lib/championship-data"

// =============================================================
// CHAMPIONSHIP RAIL — right-side support column.
// 1) Defending champion of the currently selected track.
// 2) Hall of Champions entry point.
// 3) Rules / qualifications drop.
// =============================================================
export function ChampionshipRail({ track }: { track: Track }) {
  // Find the latest (2025) champion for this track.
  const defending = CHAMPIONS.find((c) => c.track === track && c.year === 2025)!
  const trackMeta = getTrackMeta(track)

  return (
    <aside className="flex flex-col gap-5">
      {/* Live registration clock */}
      <LiveClockStripe targetIso={SEASON.registrationDeadline} label="REG CLOSES" />

      {/* Defending champion */}
      <section className="relative overflow-hidden border border-gold/25 bg-gradient-to-b from-[rgba(40,28,8,0.55)] to-[rgba(10,7,2,0.85)]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #fbbf24 0px, #fbbf24 1px, transparent 1px, transparent 14px)",
          }}
        />
        <div className="relative flex flex-col items-center gap-3 px-5 pb-5 pt-8 text-center">
          <span className="absolute left-0 top-0 inline-flex h-6 items-center gap-1.5 border-b border-r border-gold/50 bg-gold/10 px-2.5 font-display text-[9px] font-bold tracking-[0.22em] text-gold bl-clip-chevron">
            <BadgeCheck className="h-3 w-3" />
            DEFENDING · {trackMeta.label.toUpperCase()}
          </span>

          <ChampionFrame
            initials={defending.initials}
            hue={defending.hue}
            size={88}
            rank={defending.hallRank}
          />

          <div>
            <div className="font-display text-lg font-bold tracking-tight text-text">
              {defending.primaryName}
            </div>
            <div className="font-mono text-[10px] text-text-dim">
              {defending.seasonLabel} · {defending.region}
            </div>
          </div>

          <p className="border-t border-gold/15 pt-3 text-[12px] italic text-text-dim leading-relaxed">
            &ldquo;{defending.quote}&rdquo;
          </p>
        </div>
      </section>

      {/* Hall of Champions CTA */}
      <Link
        href="/hall-of-champions"
        className="group relative overflow-hidden border border-gold/40 bg-gradient-to-br from-[rgba(50,34,8,0.7)] via-[rgba(20,12,2,0.85)] to-[rgba(10,7,2,0.9)] p-5 transition-all hover:border-gold/70 hover:shadow-[0_0_36px_rgba(251,191,36,0.25)] bl-clip-notch"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold/15 blur-2xl"
        />
        <div className="relative flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center border border-gold/50 bg-gold/10 text-gold bl-clip-chevron">
            <Award className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <div className="font-display text-[10px] font-bold tracking-[0.22em] text-gold">
              HALL OF CHAMPIONS
            </div>
            <div className="mt-0.5 font-display text-base font-bold text-text">
              5 seasons. {CHAMPIONS.length} legends.
            </div>
            <p className="mt-1 text-[12px] text-text-dim leading-relaxed">
              Every champion in CodeTrackX history. Permanent gold frames. Every quote, every
              signature win, every margin.
            </p>
          </div>
        </div>
        <div className="relative mt-3 flex items-center gap-1.5 font-display text-[11px] font-bold tracking-[0.2em] text-gold transition-transform group-hover:translate-x-1">
          ENTER THE HALL
          <ArrowRight className="h-3.5 w-3.5" />
        </div>
      </Link>

      {/* Rules drop */}
      <section className="border border-line/60 bg-panel/60 p-5">
        <div className="flex items-center gap-2">
          <ScrollText className="h-3.5 w-3.5 text-neon" />
          <span className="font-display text-[10px] font-bold tracking-[0.22em] text-neon">
            RULES OF ENGAGEMENT
          </span>
        </div>
        <ul className="mt-3 space-y-2.5 text-[12.5px] text-text-dim leading-relaxed">
          <li className="flex gap-2">
            <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-neon" />
            <span>One season per year. India 2026 starts April 1, ends June 15.</span>
          </li>
          <li className="flex gap-2">
            <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-neon" />
            <span>Single elimination from Round of 64. Lose once and you wait twelve months.</span>
          </li>
          <li className="flex gap-2">
            <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-neon" />
            <span>You may register for multiple tracks. Champions are crowned per track.</span>
          </li>
          <li className="flex gap-2">
            <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-ember" />
            <span>Crown Lane requires ELO ≥ 2400 and 90 days of platform activity.</span>
          </li>
        </ul>
      </section>

      {/* Calendar marker */}
      <section className="flex items-center gap-3 border border-ember/30 bg-ember/5 p-4 bl-clip-chevron">
        <div className="flex h-9 w-9 items-center justify-center border border-ember/50 bg-ember/10 text-ember bl-clip-chevron">
          <Calendar className="h-4 w-4" />
        </div>
        <div className="min-w-0">
          <div className="font-display text-[10px] font-bold tracking-[0.22em] text-ember">
            BLOCK YOUR CALENDAR
          </div>
          <div className="mt-0.5 font-display text-[13px] font-bold text-text">
            Grand Finals · June 14
          </div>
          <div className="mt-0.5 flex items-center gap-1.5 font-mono text-[10px] text-text-dim">
            <Eye className="h-3 w-3" />
            72.5k peak viewers expected
          </div>
        </div>
      </section>
    </aside>
  )
}
