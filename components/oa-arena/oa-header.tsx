import { Activity, Award, ClipboardCheck, Flame, ShieldCheck, TrendingUp } from "lucide-react"
import { ARENA_STATS } from "./oa-arena-data"

export function OaHeader() {
  const s = ARENA_STATS
  const progress = s.readinessScore // 0..100
  const tone =
    progress >= 80
      ? { text: "text-neon", bar: "bg-neon", glow: "shadow-[0_0_30px_rgba(0,240,255,0.45)]" }
      : progress >= 60
        ? { text: "text-electric", bar: "bg-electric", glow: "shadow-[0_0_24px_rgba(124,92,255,0.4)]" }
        : { text: "text-ember", bar: "bg-ember", glow: "shadow-[0_0_24px_rgba(255,140,40,0.4)]" }

  return (
    <section className="relative overflow-hidden border border-line/60 bg-panel/60 bl-glass">
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-25" />
      <div className="pointer-events-none absolute -left-40 -top-40 h-[420px] w-[420px] rounded-full bg-neon/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[320px] w-[320px] rounded-full bg-electric/10 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon/60 to-transparent" />
      <div className="bl-corners" />

      <div className="relative grid gap-6 p-6 lg:grid-cols-[1.4fr_1fr] lg:p-7">
        {/* Left — title + readiness */}
        <div>
          <div className="inline-flex items-center gap-2 border border-neon/40 bg-neon/10 px-2.5 py-1 font-display text-[10px] font-bold tracking-[0.28em] text-neon bl-clip-chevron">
            <ClipboardCheck className="h-3 w-3" />
            ASSESSMENT_PROTOCOL · ONLINE
          </div>

          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight leading-[1.05] text-text lg:text-[40px]">
            OA <span className="text-neon text-glow">Arena</span>
          </h1>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-text-dim">
            Real-company online assessments — proctored, scored, and ranked. Earn your loop pass before the recruiter does.
          </p>

          {/* Readiness ring + bar */}
          <div className="mt-6 grid gap-4 sm:grid-cols-[auto_1fr]">
            <div className="relative flex h-[112px] w-[112px] items-center justify-center">
              <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90">
                <circle
                  cx="50"
                  cy="50"
                  r="44"
                  fill="none"
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="6"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="44"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={`${(progress / 100) * 276.46} 276.46`}
                  className={tone.text}
                />
              </svg>
              <div className={`relative text-center ${tone.glow}`}>
                <div className={`font-display text-[28px] font-bold leading-none ${tone.text}`}>
                  {progress}
                </div>
                <div className="mt-0.5 font-mono text-[9px] tracking-[0.18em] text-text-mute">/ 100</div>
              </div>
            </div>

            <div className="flex flex-col justify-center gap-2">
              <div className="flex items-center justify-between">
                <span className="font-display text-[11px] font-bold tracking-[0.22em] text-text-mute">
                  ASSESSMENT READINESS
                </span>
                <span className={`inline-flex items-center gap-1 font-display text-[11px] font-bold tracking-[0.18em] ${tone.text}`}>
                  <TrendingUp className="h-3 w-3" />
                  {s.readinessTrend}
                </span>
              </div>
              <div className="h-2 overflow-hidden border border-line/60 bg-void/60">
                <div className={`h-full ${tone.bar} bl-shimmer`} style={{ width: `${progress}%` }} />
              </div>
              <div className="flex items-center justify-between">
                <span className={`font-display text-[12px] font-bold tracking-[0.22em] ${tone.text}`}>
                  {s.readinessTier} CANDIDATE
                </span>
                <span className="font-mono text-[11px] text-text-mute">
                  Top {s.rankPercentile}% globally
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right — KPIs */}
        <div className="grid grid-cols-2 gap-3">
          <Kpi
            label="OAs CLEARED"
            value={`${s.cleared}/${s.totalTaken}`}
            sub={`${Math.round((s.cleared / s.totalTaken) * 100)}% pass rate`}
            icon={ShieldCheck}
            tone="neon"
          />
          <Kpi
            label="AVG SCORE"
            value={`${s.averageScore}`}
            sub="Last 10 attempts"
            icon={Activity}
            tone="electric"
          />
          <Kpi
            label="BEST PERCENTILE"
            value={`${s.bestPercentile}%`}
            sub="Stripe SWE round"
            icon={Award}
            tone="gold"
          />
          <Kpi
            label="WEEKLY STREAK"
            value={`${s.streakWeeks}`}
            sub={`+${s.weeklyDelta} this week`}
            icon={Flame}
            tone="ember"
          />
        </div>
      </div>
    </section>
  )
}

function Kpi({
  label,
  value,
  sub,
  icon: Icon,
  tone,
}: {
  label: string
  value: string
  sub: string
  icon: React.ComponentType<{ className?: string }>
  tone: "neon" | "electric" | "gold" | "ember"
}) {
  const accent = {
    neon: { text: "text-neon", border: "border-neon/40", bg: "bg-neon/10" },
    electric: { text: "text-electric", border: "border-electric/40", bg: "bg-electric/10" },
    gold: { text: "text-gold", border: "border-gold/40", bg: "bg-gold/10" },
    ember: { text: "text-ember", border: "border-ember/40", bg: "bg-ember/10" },
  }[tone]

  return (
    <div className="relative overflow-hidden border border-line/60 bg-void/40 p-3.5">
      <div className="pointer-events-none absolute inset-0 bl-scanline opacity-40" />
      <div className="relative flex items-center gap-1.5">
        <span
          className={`inline-flex h-5 w-5 items-center justify-center border ${accent.border} ${accent.bg}`}
        >
          <Icon className={`h-3 w-3 ${accent.text}`} />
        </span>
        <span className="font-display text-[9.5px] font-bold tracking-[0.22em] text-text-mute">
          {label}
        </span>
      </div>
      <div className={`relative mt-2 font-display text-[26px] font-bold leading-none ${accent.text}`}>
        {value}
      </div>
      <div className="relative mt-1.5 font-mono text-[10.5px] text-text-dim">{sub}</div>
    </div>
  )
}
