import { Route } from "lucide-react"
import { StageNode } from "./championship-atoms"
import { STAGES } from "@/lib/championship-data"

// =============================================================
// SELECTION PATH — horizontal timeline of every stage from
// Registration to the Hall of Champions. Connector line with a
// neon→ember progress fill marks where the season is right now.
// =============================================================
export function SelectionPath() {
  // Compute progress percentage based on stage statuses.
  // Completed stages = 100%, the live stage contributes its own
  // progress, upcoming stages = 0%.
  const liveIdx = STAGES.findIndex((s) => s.status === "live")
  const completedCount = STAGES.filter((s) => s.status === "completed").length
  const liveProgress = liveIdx >= 0 ? (STAGES[liveIdx].progress ?? 0) / 100 : 0
  const progressUnits = completedCount + liveProgress
  const progressPct = (progressUnits / STAGES.length) * 100

  return (
    <section className="relative overflow-hidden border border-line/60 bg-panel/60 bl-glass">
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-25" />

      <div className="relative space-y-2 p-5 md:p-7">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex h-6 items-center gap-1.5 border border-neon/40 bg-neon/10 px-2.5 font-display text-[10px] font-bold tracking-[0.22em] text-neon bl-clip-chevron">
            <Route className="h-3 w-3" />
            SELECTION PATH
          </span>
          <span className="font-mono text-[10px] tracking-[0.2em] text-text-mute">
            {`// 7 STAGES · APR → JUN`}
          </span>
        </div>
        <h2 className="font-display text-2xl font-bold tracking-tight text-text">
          From <span className="text-neon">18,432 entries</span> to{" "}
          <span className="text-gold">one champion</span>.
        </h2>
        <p className="max-w-2xl text-[13px] text-text-dim leading-relaxed">
          Single-elimination from Round of 64 onward. Every match is recorded. Every loss costs you
          twelve months. Every win is a step closer to permanent enshrinement.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative px-5 pb-9 md:px-7 md:pb-12">
        <div className="relative overflow-x-auto">
          <ol className="relative grid min-w-[940px] grid-cols-7 gap-2">
            {/* Connector line */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-[7.143%] right-[7.143%] top-[34px] h-px bg-line/60"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute left-[7.143%] top-[34px] h-px bg-gradient-to-r from-neon-soft via-neon to-ember shadow-[0_0_12px_rgba(0,240,255,0.6)]"
              style={{
                width: `calc(${progressPct}% * 0.857)`,
                transition: "width 600ms ease",
              }}
            />

            {STAGES.map((s) => (
              <StageNode key={s.id} stage={s} />
            ))}
          </ol>
        </div>

        {/* Bottom legend */}
        <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-line/60 pt-4 font-display text-[10px] font-bold tracking-[0.22em] text-text-mute">
          <LegendDot color="neon-soft" label="COMPLETED" />
          <LegendDot color="ember" label="LIVE NOW" />
          <LegendDot color="line" label="UPCOMING" />
          <LegendDot color="muted" label="LOCKED" />
          <span className="ml-auto font-mono tabular-nums text-text-dim">
            {progressPct.toFixed(1)}% SEASON COMPLETE
          </span>
        </div>
      </div>
    </section>
  )
}

function LegendDot({
  color,
  label,
}: {
  color: "neon-soft" | "ember" | "line" | "muted"
  label: string
}) {
  const cls =
    color === "neon-soft"
      ? "bg-neon-soft shadow-[0_0_10px_rgba(56,189,248,0.6)]"
      : color === "ember"
        ? "bg-ember shadow-[0_0_10px_rgba(255,107,26,0.6)]"
        : color === "line"
          ? "bg-line"
          : "bg-text-mute/50"
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`h-2 w-2 rounded-full ${cls}`} />
      {label}
    </span>
  )
}
