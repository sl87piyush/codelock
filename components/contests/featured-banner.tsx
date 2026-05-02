"use client"

import { useEffect, useState } from "react"
import { Coins, Users, Clock, ChevronRight, Trophy } from "lucide-react"
import { type Contest, formatPrize, NOW_SEED } from "./contests-data"

export function FeaturedBanner({
  contest,
  onView,
}: {
  contest: Contest
  onView: (id: string) => void
}) {
  // Seed with a deterministic "now" so SSR and the first client render match.
  // After mount, switch to the real wall-clock ticker.
  const [now, setNow] = useState<number>(NOW_SEED)

  useEffect(() => {
    setNow(Date.now())
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [])

  const start = new Date(contest.startsAt).getTime()
  const end = new Date(contest.endsAt).getTime()
  const isLive = contest.status === "live"

  const target = isLive ? end : start
  const diff = Math.max(0, target - now)
  const totalSec = Math.floor(diff / 1000)
  const days = Math.floor(totalSec / 86400)
  const hours = Math.floor((totalSec % 86400) / 3600)
  const minutes = Math.floor((totalSec % 3600) / 60)
  const seconds = totalSec % 60

  const parts: { value: string; label: string }[] = []
  if (days > 0) parts.push({ value: String(days).padStart(2, "0"), label: "DAYS" })
  parts.push({ value: String(hours).padStart(2, "0"), label: "HRS" })
  parts.push({ value: String(minutes).padStart(2, "0"), label: "MIN" })
  parts.push({ value: String(seconds).padStart(2, "0"), label: "SEC" })

  const accent = contest.bannerAccent
  const accentText =
    accent === "neon"
      ? "text-neon"
      : accent === "ember"
        ? "text-ember"
        : accent === "gold"
          ? "text-gold"
          : "text-electric"
  const accentBg =
    accent === "neon"
      ? "from-neon/15"
      : accent === "ember"
        ? "from-ember/20"
        : accent === "gold"
          ? "from-gold/20"
          : "from-electric/20"
  const accentBorder =
    accent === "neon"
      ? "border-neon/50"
      : accent === "ember"
        ? "border-ember/60"
        : accent === "gold"
          ? "border-gold/60"
          : "border-electric/60"

  return (
    <section className={`relative overflow-hidden border ${accentBorder} bg-panel/70 bl-glass`}>
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-30" />
      <div className={`pointer-events-none absolute inset-y-0 right-0 w-2/3 bg-gradient-to-l ${accentBg} via-transparent to-transparent`} />
      <div className={`pointer-events-none absolute inset-y-0 left-0 w-1 ${accent === "neon" ? "bg-neon" : accent === "ember" ? "bg-ember" : accent === "gold" ? "bg-gold" : "bg-electric"} opacity-80`} />
      <div className="pointer-events-none absolute inset-0 bl-scanline opacity-30" />

      <div className="relative grid gap-6 p-6 md:p-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
        {/* Left — info */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            {isLive ? (
              <span className="inline-flex h-6 items-center gap-1.5 border border-blood/60 bg-blood/20 px-2.5 font-display text-[10px] font-bold tracking-[0.22em] text-blood">
                <span className="relative h-1.5 w-1.5 rounded-full bg-blood">
                  <span className="absolute inset-0 rounded-full bg-blood/60 animate-ping" />
                </span>
                LIVE NOW
              </span>
            ) : (
              <span className={`inline-flex h-6 items-center gap-1.5 border ${accentBorder} bg-void/60 px-2.5 font-display text-[10px] font-bold tracking-[0.22em] ${accentText}`}>
                <Trophy className="h-3 w-3" />
                FEATURED
              </span>
            )}
            <span className="font-mono text-[10px] tracking-[0.2em] text-text-mute">
              {`// ${contest.code}`}
            </span>
            <span className="font-display text-[10px] font-bold tracking-[0.18em] text-text-mute">
              {contest.category} · {contest.difficulty}
            </span>
          </div>

          <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-text md:text-4xl">
            {contest.title}
          </h2>
          <p className="max-w-xl text-[14px] leading-relaxed text-text-dim">{contest.tagline}</p>

          <div className="flex flex-wrap gap-4 pt-1">
            <Meta icon={Coins} label="PRIZE" value={formatPrize(contest)} tone={accentText} />
            <Meta
              icon={Users}
              label="REGISTERED"
              value={contest.registered.toLocaleString()}
              tone="text-text"
            />
            <Meta
              icon={Clock}
              label="DURATION"
              value={
                contest.durationMin >= 60
                  ? `${Math.round(contest.durationMin / 60)}h`
                  : `${contest.durationMin}m`
              }
              tone="text-text"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => onView(contest.id)}
              className="bl-btn-primary bl-clip-notch group inline-flex h-11 items-center gap-2 px-5 text-[12px] tracking-[0.18em]"
            >
              {isLive ? "ENTER ARENA" : contest.isRegistered ? "VIEW DETAILS" : "REGISTER NOW"}
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <button
              type="button"
              onClick={() => onView(contest.id)}
              className="inline-flex h-11 items-center gap-2 border border-line/70 bg-void/40 px-4 font-display text-[12px] font-bold tracking-[0.18em] text-text-dim hover:border-neon/50 hover:text-neon transition-colors"
            >
              VIEW SCHEDULE
            </button>
          </div>
        </div>

        {/* Right — countdown */}
        <div className="relative">
          <div className="flex items-baseline justify-between pb-2">
            <div className="font-display text-[10px] font-bold tracking-[0.28em] text-text-mute">
              {isLive ? "ENDS IN" : "STARTS IN"}
            </div>
            <div className={`font-mono text-[10px] tracking-[0.2em] ${accentText}`}>
              {isLive ? "ROUND ACTIVE" : "REG OPEN"}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {parts.map((p) => (
              <div
                key={p.label}
                className="relative overflow-hidden border border-line/70 bg-void/60 bl-corners"
              >
                <div className="flex flex-col items-center gap-1 px-2 py-3">
                  <div
                    className={`font-display text-3xl font-bold leading-none tabular-nums ${accentText} text-glow-ember`}
                  >
                    {p.value}
                  </div>
                  <div className="font-display text-[9px] font-bold tracking-[0.22em] text-text-mute">
                    {p.label}
                  </div>
                </div>
                <div
                  className={`absolute inset-x-0 bottom-0 h-px ${
                    accent === "neon"
                      ? "bg-neon/60"
                      : accent === "ember"
                        ? "bg-ember/60"
                        : accent === "gold"
                          ? "bg-gold/60"
                          : "bg-electric/60"
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Progress bar for live */}
          {isLive && contest.progress !== undefined && (
            <div className="mt-4 space-y-1.5">
              <div className="flex items-center justify-between font-display text-[9px] font-bold tracking-[0.2em] text-text-mute">
                <span>ROUND PROGRESS</span>
                <span className={accentText}>{Math.round(contest.progress * 100)}%</span>
              </div>
              <div className="bl-bar-track h-1.5 overflow-hidden">
                <div
                  className={`h-full ${
                    accent === "neon"
                      ? "bg-neon"
                      : accent === "ember"
                        ? "bg-ember"
                        : accent === "gold"
                          ? "bg-gold"
                          : "bg-electric"
                  } shadow-[0_0_8px_currentColor]`}
                  style={{ width: `${contest.progress * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function Meta({
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
    <div className="flex items-center gap-2">
      <Icon className={`h-3.5 w-3.5 ${tone}`} />
      <div className="leading-tight">
        <div className="font-display text-[9px] font-bold tracking-[0.22em] text-text-mute">
          {label}
        </div>
        <div className={`font-display text-[14px] font-bold tabular-nums ${tone}`}>{value}</div>
      </div>
    </div>
  )
}
