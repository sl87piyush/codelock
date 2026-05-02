"use client"

import { ChevronRight } from "lucide-react"
import { type Assessment, accentClasses } from "./oa-arena-data"

export function PastResultsTable({
  assessments,
  onView,
}: {
  assessments: Assessment[]
  onView: (id: string) => void
}) {
  if (assessments.length === 0) return null

  return (
    <section className="relative overflow-hidden border border-line/60 bg-panel/60 bl-glass">
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-15" />
      <div className="relative">
        <header className="flex items-center justify-between border-b border-line/40 px-5 py-3.5">
          <div className="flex items-baseline gap-2">
            <h2 className="font-display text-[14px] font-bold tracking-[0.22em] text-text">
              YOUR PAST ATTEMPTS
            </h2>
            <span className="font-mono text-[10.5px] text-text-mute">
              · {assessments.length} {assessments.length === 1 ? "result" : "results"}
            </span>
          </div>
          <span className="font-mono text-[10px] tracking-[0.22em] text-text-mute uppercase">
            Sorted by completion · newest first
          </span>
        </header>

        {/* Mobile cards */}
        <div className="grid gap-2.5 p-3 md:hidden">
          {assessments.map((a) => (
            <MobileRow key={a.id} a={a} onView={onView} />
          ))}
        </div>

        {/* Desktop table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full">
            <thead>
              <tr className="border-b border-line/40 bg-void/30">
                <Th className="w-[34%]">Assessment</Th>
                <Th>Score</Th>
                <Th>Percentile</Th>
                <Th>Rank</Th>
                <Th>Time</Th>
                <Th>Verdict</Th>
                <Th className="w-[60px]" />
              </tr>
            </thead>
            <tbody>
              {assessments.map((a) => {
                const r = a.result!
                const accent = accentClasses(a.companyAccent)
                return (
                  <tr
                    key={a.id}
                    className="group cursor-pointer border-b border-line/30 transition-colors hover:bg-neon/5"
                    onClick={() => onView(a.id)}
                  >
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center border ${accent.border} ${accent.bg} bl-clip-notch`}
                        >
                          <span className={`font-display text-[14px] font-bold ${accent.text}`}>
                            {a.companyLogo}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <div className="font-display text-[12.5px] font-bold tracking-tight text-text">
                            {a.role}
                          </div>
                          <div className={`font-mono text-[10.5px] ${accent.text}`}>
                            {a.company.toUpperCase()} · {a.id.toUpperCase()}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <span
                        className={`font-display text-[18px] font-bold leading-none ${
                          r.cleared ? "text-neon" : "text-ember"
                        }`}
                      >
                        {r.score}
                      </span>
                      <span className="ml-0.5 font-mono text-[10px] text-text-mute">/100</span>
                    </td>
                    <td className="px-3 py-3 font-mono text-[12px] text-text">{r.percentile}%</td>
                    <td className="px-3 py-3 font-mono text-[12px] text-text-dim">#{r.rank}</td>
                    <td className="px-3 py-3 font-mono text-[12px] text-text-dim">
                      {r.timeUsed}m / {a.duration}m
                    </td>
                    <td className="px-3 py-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 font-display text-[10px] font-bold tracking-[0.18em] border ${
                          r.cleared
                            ? "text-neon border-neon/40 bg-neon/10"
                            : "text-ember border-ember/40 bg-ember/10"
                        }`}
                      >
                        {r.cleared ? "CLEARED" : "MISSED"}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-right">
                      <ChevronRight className="ml-auto h-4 w-4 text-text-mute transition-transform group-hover:translate-x-0.5 group-hover:text-neon" />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

function Th({ children, className }: { children?: React.ReactNode; className?: string }) {
  return (
    <th
      scope="col"
      className={`px-3 py-2.5 text-left font-display text-[10px] font-bold uppercase tracking-[0.22em] text-text-mute ${className ?? ""}`}
    >
      {children}
    </th>
  )
}

function MobileRow({ a, onView }: { a: Assessment; onView: (id: string) => void }) {
  const r = a.result!
  const accent = accentClasses(a.companyAccent)
  return (
    <button
      type="button"
      onClick={() => onView(a.id)}
      className="flex items-center gap-3 border border-line/60 bg-void/40 p-3 text-left transition-colors hover:border-neon/50"
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center border ${accent.border} ${accent.bg} bl-clip-notch`}
      >
        <span className={`font-display text-[15px] font-bold ${accent.text}`}>{a.companyLogo}</span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate font-display text-[13px] font-bold tracking-tight text-text">
          {a.role}
        </div>
        <div className="font-mono text-[10.5px] text-text-mute">
          {a.company.toUpperCase()} · {r.percentile}%ile · #{r.rank}
        </div>
      </div>
      <div className="text-right">
        <div
          className={`font-display text-[18px] font-bold leading-none ${
            r.cleared ? "text-neon" : "text-ember"
          }`}
        >
          {r.score}
        </div>
        <div
          className={`mt-1 font-display text-[9px] font-bold tracking-[0.18em] ${
            r.cleared ? "text-neon" : "text-ember"
          }`}
        >
          {r.cleared ? "CLEARED" : "MISSED"}
        </div>
      </div>
    </button>
  )
}
