"use client"

import { ArrowRight, Lock } from "lucide-react"
import { TrackCard, LaneToggle, StatusPill } from "./championship-atoms"
import {
  TRACKS,
  USER_STATE,
  type Track,
  type Lane,
} from "@/lib/championship-data"

// =============================================================
// TRACK SELECTOR — pick your path: Solo / Duo / Clan
// Combined with the Open / Crown lane toggle and a primary CTA
// that adapts based on the user's registration status.
// =============================================================
export function TrackSelector({
  selectedTrack,
  onSelectTrack,
  selectedLane,
  onSelectLane,
}: {
  selectedTrack: Track
  onSelectTrack: (t: Track) => void
  selectedLane: Lane
  onSelectLane: (l: Lane) => void
}) {
  const userState = USER_STATE[selectedTrack]
  const trackMeta = TRACKS.find((t) => t.id === selectedTrack)!

  const ctaLabel =
    userState.status === "registered"
      ? "VIEW MY BRACKET"
      : userState.status === "qualified"
        ? "ENTER QUALIFIERS"
        : userState.status === "champion"
          ? "VIEW HALL OF CHAMPIONS"
          : userState.status === "eliminated"
            ? "WATCH THE FINALS"
            : `REGISTER FOR ${trackMeta.label.toUpperCase()}`

  const ctaSub =
    userState.status === "registered"
      ? `Locked in. Rank #${userState.rank} of ${userState.outOf?.toLocaleString()}.`
      : userState.status === "not_registered"
        ? "Open lane · Free · Phone verification required"
        : "Track your progress in real time."

  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="font-display text-[10px] font-bold tracking-[0.28em] text-text-mute">
            STEP 01 // CHOOSE YOUR PATH
          </div>
          <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-text">
            Pick your <span className="text-neon text-glow">track</span>.
          </h2>
          <p className="mt-1 max-w-xl text-[13px] text-text-dim leading-relaxed">
            Three tracks. One season. You can register for more than one — but only one trophy per
            track exists, and only one of you will lift it.
          </p>
        </div>
        <LaneToggle current={selectedLane} onChange={onSelectLane} />
      </div>

      {/* Track cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {TRACKS.map((t) => (
          <TrackCard
            key={t.id}
            track={t}
            active={t.id === selectedTrack}
            registrationStatus={USER_STATE[t.id].status}
            rank={USER_STATE[t.id].rank}
            onSelect={() => onSelectTrack(t.id)}
          />
        ))}
      </div>

      {/* Primary CTA strip */}
      <div className="relative overflow-hidden border border-neon/30 bg-gradient-to-r from-panel/90 via-panel/70 to-panel/90 bl-clip-notch">
        <div className="pointer-events-none absolute inset-0 bl-stripes opacity-50" />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-neon shadow-[0_0_18px_#00f0ff]" />

        <div className="relative flex flex-wrap items-center gap-4 p-5 sm:p-6">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-display text-[10px] font-bold tracking-[0.22em] text-text-mute">
                {trackMeta.label.toUpperCase()} · {selectedLane === "open" ? "OPEN LANE" : "CROWN LANE"}
              </span>
              <StatusPill status={userState.status} size="sm" />
            </div>
            <div className="mt-1 font-display text-lg font-bold text-text">{ctaSub}</div>
          </div>

          {selectedLane === "crown" ? (
            <div className="flex items-center gap-2 border border-line/60 bg-void/60 px-4 py-3 bl-clip-chevron">
              <Lock className="h-4 w-4 text-text-mute" />
              <div className="text-left">
                <div className="font-display text-[10px] font-bold tracking-[0.22em] text-text-mute">
                  CROWN LANE LOCKED
                </div>
                <div className="font-mono text-[10px] text-text-dim">
                  Need ELO ≥ 2400 + 90d activity
                </div>
              </div>
            </div>
          ) : (
            <button
              type="button"
              className="bl-btn-primary group inline-flex items-center gap-2 px-5 py-3 text-[12px] bl-clip-chevron"
            >
              {ctaLabel}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
