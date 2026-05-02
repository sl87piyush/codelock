"use client"

import { useEffect } from "react"
import {
  X,
  Coins,
  Users,
  Clock,
  Calendar,
  ShieldCheck,
  Crown,
  Share2,
  ListChecks,
  Trophy,
  Medal,
  ChevronRight,
} from "lucide-react"
import { type Contest, formatDuration, formatPrize } from "./contests-data"
import { DoubtAvatar } from "@/components/doubt/doubt-avatar"
import { cn } from "@/lib/utils"

const ACCENT_TEXT = {
  neon: "text-neon",
  ember: "text-ember",
  gold: "text-gold",
  electric: "text-electric",
} as const
const ACCENT_BORDER = {
  neon: "border-neon/50",
  ember: "border-ember/50",
  gold: "border-gold/50",
  electric: "border-electric/50",
} as const
const ACCENT_BG = {
  neon: "bg-neon",
  ember: "bg-ember",
  gold: "bg-gold",
  electric: "bg-electric",
} as const

export function ContestDetailDrawer({
  contest,
  onClose,
}: {
  contest: Contest | null
  onClose: () => void
}) {
  useEffect(() => {
    if (!contest) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [contest, onClose])

  if (!contest) return null

  const accentText = ACCENT_TEXT[contest.bannerAccent]
  const accentBorder = ACCENT_BORDER[contest.bannerAccent]
  const accentBg = ACCENT_BG[contest.bannerAccent]

  const isLive = contest.status === "live"
  const isUpcoming = contest.status === "upcoming"
  const isPast = contest.status === "past"

  const startDate = new Date(contest.startsAt)
  const endDate = new Date(contest.endsAt)

  return (
    <>
      <button
        type="button"
        aria-label="Close drawer"
        onClick={onClose}
        className="fixed inset-0 z-40 bg-void/70 backdrop-blur-sm"
      />

      <aside
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-full max-w-[920px] flex-col overflow-hidden border-l bg-void/95 backdrop-blur-xl bl-phase-in",
          accentBorder,
        )}
      >
        <div className="pointer-events-none absolute inset-0 bl-grid opacity-25" />
        <div className={cn("pointer-events-none absolute inset-y-0 left-0 w-[3px]", accentBg)} />

        {/* Drawer header */}
        <div className="relative flex items-center justify-between border-b border-line/60 bg-panel/40 px-5 py-3.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="font-mono text-[11px] tracking-[0.18em] text-text-mute">
              {contest.code}
            </span>
            <span className="h-4 w-px bg-line/70" />
            {isLive && (
              <span className="inline-flex h-5 items-center gap-1.5 border border-blood/60 bg-blood/15 px-2 font-display text-[9.5px] font-bold tracking-[0.22em] text-blood">
                <span className="relative h-1 w-1 rounded-full bg-blood">
                  <span className="absolute inset-0 rounded-full bg-blood/60 animate-ping" />
                </span>
                LIVE
              </span>
            )}
            {isUpcoming && (
              <span
                className={cn(
                  "inline-flex h-5 items-center border px-2 font-display text-[9.5px] font-bold tracking-[0.22em]",
                  accentBorder,
                  accentText,
                )}
              >
                UPCOMING
              </span>
            )}
            {isPast && (
              <span className="inline-flex h-5 items-center border border-line/70 bg-void/60 px-2 font-display text-[9.5px] font-bold tracking-[0.22em] text-text-mute">
                CONCLUDED
              </span>
            )}
            {contest.isOfficial && (
              <span className="inline-flex h-5 items-center gap-1 border border-electric/40 bg-electric/10 px-1.5 font-display text-[9px] font-bold tracking-[0.18em] text-electric">
                <ShieldCheck className="h-3 w-3" />
                OFFICIAL
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Share"
              className="inline-flex h-8 w-8 items-center justify-center border border-line/60 bg-void/40 text-text-mute hover:border-neon/40 hover:text-neon transition-colors"
            >
              <Share2 className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              aria-label="Close drawer"
              onClick={onClose}
              className="inline-flex h-8 w-8 items-center justify-center border border-line/60 bg-void/40 text-text-mute hover:border-blood/50 hover:text-blood transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Body — scrollable */}
        <div className="relative flex-1 overflow-y-auto">
          {/* Hero */}
          <div className="relative px-5 pt-5 pb-4">
            <div className="font-display text-[10px] font-bold tracking-[0.22em] text-text-mute">
              {contest.category.toUpperCase()} · {contest.difficulty}
            </div>
            <h2 className="mt-1 font-display text-3xl font-bold leading-tight tracking-tight text-text">
              {contest.title}
            </h2>
            <p className="mt-2 max-w-2xl text-[13.5px] leading-relaxed text-text-dim">
              {contest.description}
            </p>

            <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
              <Kpi icon={Coins} label="PRIZE POOL" value={formatPrize(contest)} tone={accentText} />
              <Kpi
                icon={Users}
                label="REGISTERED"
                value={contest.registered.toLocaleString()}
                tone="text-text"
              />
              <Kpi
                icon={Clock}
                label="DURATION"
                value={formatDuration(contest.durationMin)}
                tone="text-text"
              />
              <Kpi
                icon={Calendar}
                label={isLive ? "ENDS" : isPast ? "ENDED" : "STARTS"}
                value={
                  isLive || isPast
                    ? endDate.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" })
                    : startDate.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" })
                }
                tone="text-text"
              />
            </div>

            {/* Top prize callout */}
            <div
              className={cn(
                "mt-4 flex items-center gap-3 border bg-void/40 px-4 py-3",
                accentBorder,
              )}
            >
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center border bg-void bl-clip-notch",
                  accentBorder,
                )}
              >
                <Trophy className={cn("h-5 w-5", accentText)} />
              </div>
              <div className="min-w-0">
                <div className="font-display text-[9.5px] font-bold tracking-[0.22em] text-text-mute">
                  TOP PRIZE
                </div>
                <div className={cn("font-display text-[16px] font-bold tracking-tight", accentText)}>
                  {contest.topPrize}
                </div>
              </div>
              <div className="ml-auto hidden flex-wrap gap-1 sm:flex">
                {contest.sponsors.slice(0, 3).map((s) => (
                  <span
                    key={s.name}
                    className={cn(
                      "inline-flex h-6 items-center gap-1 border px-2 font-mono text-[10px]",
                      s.tier === "TITLE"
                        ? "border-gold/50 bg-gold/10 text-gold"
                        : "border-line/70 bg-void/60 text-text-dim",
                    )}
                  >
                    {s.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Primary CTA */}
            <div className="mt-4 flex flex-wrap gap-2">
              {isLive && (
                <button
                  type="button"
                  className="bl-btn-primary bl-clip-notch group inline-flex h-11 items-center gap-2 px-5 text-[12px] tracking-[0.18em]"
                >
                  ENTER ARENA
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              )}
              {isUpcoming && (
                <button
                  type="button"
                  className={cn(
                    "bl-clip-notch inline-flex h-11 items-center gap-2 border px-5 font-display text-[12px] font-bold tracking-[0.18em] transition-all",
                    contest.isRegistered
                      ? "border-neon/50 bg-neon/10 text-neon"
                      : "bl-btn-primary",
                  )}
                >
                  {contest.isRegistered ? "VIEW ROSTER" : "REGISTER NOW"}
                  <ChevronRight className="h-4 w-4" />
                </button>
              )}
              {isPast && (
                <button
                  type="button"
                  className="bl-clip-notch inline-flex h-11 items-center gap-2 border border-gold/50 bg-gold/10 px-5 font-display text-[12px] font-bold tracking-[0.18em] text-gold hover:bg-gold/20"
                >
                  VIEW FULL RECAP
                  <ChevronRight className="h-4 w-4" />
                </button>
              )}
              <button
                type="button"
                className="inline-flex h-11 items-center gap-2 border border-line/70 bg-panel/40 px-4 font-display text-[11px] font-bold tracking-[0.18em] text-text-dim hover:border-neon/40 hover:text-neon transition-all"
              >
                <Share2 className="h-3.5 w-3.5" />
                SHARE
              </button>
            </div>
          </div>

          <Divider />

          {/* Past — winners podium */}
          {isPast && contest.winners && contest.winners.length > 0 && (
            <>
              <Section title="Champions" icon={Crown}>
                <div className="grid gap-2 md:grid-cols-3">
                  {contest.winners.map((w, i) => {
                    const tone =
                      i === 0 ? "gold" : i === 1 ? "electric" : ("ember" as const)
                    const toneText = tone === "gold" ? "text-gold" : tone === "electric" ? "text-electric" : "text-ember"
                    const toneBorder = tone === "gold" ? "border-gold/50" : tone === "electric" ? "border-electric/50" : "border-ember/50"
                    const toneBg = tone === "gold" ? "bg-gold/10" : tone === "electric" ? "bg-electric/10" : "bg-ember/10"
                    return (
                      <div
                        key={w.handle}
                        className={cn(
                          "relative flex items-center gap-3 border px-3 py-2.5",
                          toneBorder,
                          toneBg,
                        )}
                      >
                        <div
                          className={cn(
                            "font-display text-2xl font-bold tabular-nums leading-none",
                            toneText,
                          )}
                        >
                          {i + 1}
                        </div>
                        <DoubtAvatar handle={w.handle} size="md" />
                        <div className="min-w-0 flex-1 leading-tight">
                          <div className="truncate font-mono text-[13px] text-text">{w.handle}</div>
                          <div className="font-display text-[9.5px] font-bold tracking-[0.18em] text-text-mute">
                            {w.division}
                          </div>
                        </div>
                        <div className={cn("font-display text-[14px] font-bold", toneText)}>
                          {w.prize}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </Section>
              <Divider />
            </>
          )}

          {/* Problems */}
          {contest.problems.length > 0 && (
            <>
              <Section title="Problem Set" icon={ListChecks}>
                <div className="overflow-hidden border border-line/60">
                  <table className="w-full border-collapse text-left">
                    <thead className="bg-void/60">
                      <tr className="font-display text-[10px] font-bold tracking-[0.2em] text-text-mute">
                        <th className="px-3 py-2 text-left">#</th>
                        <th className="px-3 py-2">PROBLEM</th>
                        <th className="px-3 py-2 text-right">DIFF</th>
                        <th className="px-3 py-2 text-right">PTS</th>
                        <th className="hidden px-3 py-2 text-right md:table-cell">SOLVED</th>
                        <th className="hidden px-3 py-2 text-right sm:table-cell">ACC</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line/40">
                      {contest.problems.map((p) => {
                        const diffColor =
                          p.difficulty === "EASY"
                            ? "text-neon"
                            : p.difficulty === "MEDIUM"
                              ? "text-electric"
                              : p.difficulty === "HARD"
                                ? "text-ember"
                                : "text-blood"
                        return (
                          <tr
                            key={p.id}
                            className="font-mono text-[12.5px] text-text-dim transition-colors hover:bg-void/40"
                          >
                            <td className="px-3 py-2.5 font-display text-[12px] font-bold text-text">
                              {p.letter}
                            </td>
                            <td className="px-3 py-2.5 text-text">{p.title}</td>
                            <td
                              className={`px-3 py-2.5 text-right font-display text-[10.5px] font-bold tracking-[0.18em] ${diffColor}`}
                            >
                              {p.difficulty}
                            </td>
                            <td className="px-3 py-2.5 text-right tabular-nums text-text">
                              {p.points}
                            </td>
                            <td className="hidden px-3 py-2.5 text-right tabular-nums md:table-cell">
                              {p.solvedBy.toLocaleString()}
                            </td>
                            <td className="hidden px-3 py-2.5 text-right tabular-nums sm:table-cell">
                              {p.acceptance}%
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </Section>
              <Divider />
            </>
          )}

          {/* Live leaderboard */}
          {(isLive || isPast) && contest.participants.length > 0 && (
            <>
              <Section title={isLive ? "Live Standings" : "Final Standings"} icon={Medal}>
                <ul className="divide-y divide-line/40 border border-line/60">
                  {contest.participants.slice(0, 10).map((p) => {
                    const rankTone =
                      p.rank === 1
                        ? "text-gold"
                        : p.rank === 2
                          ? "text-electric"
                          : p.rank === 3
                            ? "text-ember"
                            : "text-text-mute"
                    return (
                      <li
                        key={p.id}
                        className="flex items-center gap-3 bg-void/30 px-3 py-2.5 transition-colors hover:bg-void/50"
                      >
                        <div
                          className={`w-8 text-right font-display text-[14px] font-bold tabular-nums ${rankTone}`}
                        >
                          {p.rank}
                        </div>
                        <DoubtAvatar handle={p.handle} size="sm" />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <span className="truncate font-mono text-[12.5px] text-text">
                              {p.handle}
                            </span>
                            <span className="font-mono text-[9.5px] tracking-[0.14em] text-text-mute">
                              {p.flag}
                            </span>
                          </div>
                          <div className="font-display text-[9.5px] font-bold tracking-[0.18em] text-text-mute">
                            {p.division} · {p.solved} SOLVED
                          </div>
                        </div>
                        <div className="text-right leading-tight">
                          <div className="font-display text-[14px] font-bold tabular-nums text-text">
                            {p.score}
                          </div>
                          {p.delta !== undefined && p.delta !== 0 && (
                            <div
                              className={`font-display text-[9.5px] font-bold tracking-[0.18em] ${
                                p.delta > 0 ? "text-neon" : "text-blood"
                              }`}
                            >
                              {p.delta > 0 ? "▲" : "▼"} {Math.abs(p.delta)}
                            </div>
                          )}
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </Section>
              <Divider />
            </>
          )}

          {/* Schedule */}
          {contest.schedule.length > 0 && (
            <>
              <Section title="Schedule" icon={Calendar}>
                <ul className="space-y-1.5">
                  {contest.schedule.map((s, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 border border-line/60 bg-void/30 px-3 py-2"
                    >
                      <div
                        className={cn(
                          "w-20 font-mono text-[11.5px] tracking-[0.1em]",
                          accentText,
                        )}
                      >
                        {s.time}
                      </div>
                      <div className="text-[13px] text-text-dim">{s.label}</div>
                    </li>
                  ))}
                </ul>
              </Section>
              <Divider />
            </>
          )}

          {/* Rules */}
          {contest.rules.length > 0 && (
            <>
              <Section title="Rules of Engagement" icon={ShieldCheck}>
                <ol className="space-y-1.5">
                  {contest.rules.map((r, i) => (
                    <li
                      key={i}
                      className="flex gap-3 border border-line/60 bg-void/30 px-3 py-2 text-[13px] text-text-dim"
                    >
                      <span className="font-display text-[11px] font-bold tracking-[0.14em] text-text-mute">
                        R{String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ol>
              </Section>
              <div className="h-6" />
            </>
          )}
        </div>
      </aside>
    </>
  )
}

function Kpi({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  tone: string
}) {
  return (
    <div className="border border-line/60 bg-void/40 px-3 py-2 bl-corners">
      <div className="flex items-center gap-1 font-display text-[8.5px] font-bold tracking-[0.22em] text-text-mute">
        <Icon className={`h-3 w-3 ${tone}`} />
        {label}
      </div>
      <div className={`mt-0.5 font-display text-[15px] font-bold leading-none ${tone}`}>{value}</div>
    </div>
  )
}

function Section({
  title,
  icon: Icon,
  children,
}: {
  title: string
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}) {
  return (
    <section className="px-5 py-4">
      <div className="mb-3 flex items-center gap-2">
        <Icon className="h-4 w-4 text-neon" />
        <h3 className="font-display text-[14px] font-bold tracking-[0.16em] text-text uppercase">
          {title}
        </h3>
        <div className="h-px flex-1 bg-line/60" />
      </div>
      {children}
    </section>
  )
}

function Divider() {
  return <div className="mx-5 h-px bg-line/40" />
}
