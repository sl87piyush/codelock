import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Target,
  CalendarClock,
  TrendingUp,
  ScrollText,
  ListChecks,
} from "lucide-react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { TopBar } from "@/components/dashboard/top-bar"
import {
  GlassPanel,
  PartnerAvatar,
  ScoreBar,
  Chip,
  StatTile,
} from "@/components/partner/partner-atoms"
import {
  ACTIVE_CONTRACT,
  CURRENT_USER_ID,
  TRIAL_REPORT,
  getUser,
} from "@/components/partner/partner-data"

export default async function TrainingReportPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const me = getUser(CURRENT_USER_ID)
  const partner = getUser(ACTIVE_CONTRACT.partnerBId)
  if (!me || !partner) return notFound()

  const r = TRIAL_REPORT
  const totalLost = r.timeLost.reduce((s, x) => s + x.minutes, 0)

  return (
    <div className="flex min-h-screen w-full bg-void text-text">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar title="Training Report" sector="012_REPORT" />

        <main className="relative flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
            <div className="absolute -top-32 left-1/3 h-[400px] w-[700px] bg-electric/10 blur-3xl rounded-full" />
          </div>

          <div className="relative mx-auto max-w-[1280px] space-y-6">
            <div className="flex items-center justify-between">
              <Link
                href={`/partner/duo/${ACTIVE_CONTRACT.partnerBId}`}
                className="inline-flex items-center gap-1.5 font-display text-[11px] font-bold tracking-[0.2em] text-text-dim hover:text-neon"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                BACK TO DUO BAY
              </Link>
              <span className="font-mono text-[10px] text-text-mute">
                CONTRACT_ID: {id.toUpperCase()} · WEEK {r.weekIndex}
              </span>
            </div>

            {/* Result hero */}
            <GlassPanel className="relative overflow-hidden p-6 sm:p-10" notch corners>
              <div className="pointer-events-none absolute inset-0 bl-grid opacity-25" />
              <div className="pointer-events-none absolute inset-0 bl-scanline opacity-40" />

              <div className="relative flex flex-wrap items-start justify-between gap-6">
                <div>
                  <div className="font-mono text-[10px] tracking-[0.3em] text-neon/80 uppercase">
                    // SELECTION_RESULT
                  </div>
                  <h2 className="mt-2 font-display text-4xl sm:text-5xl font-bold tracking-tight text-balance">
                    {r.copy.headline.replace(/\.$/, "")}
                    <span className="text-neon text-glow">.</span>
                  </h2>
                  <p className="mt-3 max-w-2xl text-base text-text-dim leading-relaxed">
                    Auto-generated from your trial log, time breakdown, and
                    pattern analysis. {r.copy.nextTrial}
                  </p>
                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    <Chip accent="neon" active>
                      <CheckCircle2 className="h-3 w-3" /> {r.result.toUpperCase()}
                    </Chip>
                    <Chip>WEEK {r.weekIndex}</Chip>
                    <Chip accent="ember">NEXT TRIAL · SUNDAY 8 PM IST</Chip>
                  </div>
                </div>

                {/* Trial duo summary */}
                <div className="border border-line/70 bg-panel/40 p-5 min-w-[280px]">
                  <div className="font-mono text-[10px] tracking-[0.3em] text-text-mute uppercase">
                    // DUO_SCORES
                  </div>
                  <div className="mt-3 space-y-3">
                    <DuoLine user={me} score={r.scoreA} />
                    <DuoLine user={partner} score={r.scoreB} />
                  </div>
                </div>
              </div>
            </GlassPanel>

            {/* Stat strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <StatTile
                label="DURATION USED"
                value={`${r.durationMinUsed}m`}
                sub={`of 60m allotted`}
              />
              <StatTile
                label="PROBLEMS SOLVED"
                value={`${r.problemsSolved}/${r.problemsTotal}`}
                accent="neon"
                sub="Both attempted"
              />
              <StatTile
                label="TIME LOST"
                value={`${totalLost}m`}
                accent="ember"
                sub="Recoverable in revision"
              />
              <StatTile
                label="WRONG PATTERNS"
                value={r.wrongPatterns.length}
                accent="ember"
                sub="Logged for review"
              />
            </div>

            {/* Two columns */}
            <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
              <div className="space-y-6">
                {/* Time-lost breakdown */}
                <GlassPanel className="p-6">
                  <SectionTitle
                    kicker="// TIME_LOST_BREAKDOWN"
                    title="Where the minutes went"
                    icon={Clock}
                  />
                  <div className="mt-5 space-y-3">
                    {r.timeLost.map((x, i) => {
                      const pct = (x.minutes / totalLost) * 100
                      return (
                        <div key={i}>
                          <div className="flex items-center justify-between">
                            <span className="font-display text-[12px] font-semibold tracking-tight text-text">
                              {x.reason}
                            </span>
                            <span className="font-mono text-xs text-text-dim tabular-nums">
                              {x.minutes}m · {pct.toFixed(0)}%
                            </span>
                          </div>
                          <div className="mt-1.5 h-1.5 w-full bl-bar-track">
                            <div
                              className="h-full bg-ember shadow-[0_0_14px_rgba(255,107,26,0.45)]"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </GlassPanel>

                {/* Wrong-attempt patterns */}
                <GlassPanel className="p-6">
                  <SectionTitle
                    kicker="// WRONG_ATTEMPT_PATTERNS"
                    title="Patterns flagged this trial"
                    icon={AlertTriangle}
                    accent="ember"
                  />
                  <div className="mt-5 space-y-2">
                    {r.wrongPatterns.map((p, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 border border-ember/30 bg-ember/5 px-3 py-2.5"
                      >
                        <span className="font-mono text-[10px] tracking-widest text-ember/80 mt-0.5">
                          0{i + 1}
                        </span>
                        <p className="text-sm text-text leading-relaxed">{p}</p>
                      </div>
                    ))}
                  </div>
                </GlassPanel>

                {/* Revision plan */}
                <GlassPanel className="p-6">
                  <SectionTitle
                    kicker="// SPACED_REVISION"
                    title="3 / 7 / 21 day revision plan"
                    icon={TrendingUp}
                  />
                  <div className="mt-5 grid gap-4 md:grid-cols-3">
                    <RevisionBlock
                      label="3 DAYS"
                      items={r.revisionPlan.days3}
                    />
                    <RevisionBlock
                      label="7 DAYS"
                      items={r.revisionPlan.days7}
                    />
                    <RevisionBlock
                      label="21 DAYS"
                      items={r.revisionPlan.days21}
                    />
                  </div>
                </GlassPanel>
              </div>

              <div className="space-y-5">
                {/* Score bars */}
                <GlassPanel className="p-5">
                  <SectionTitle
                    kicker="// CONTRACT_HEALTH"
                    title="Discipline · Chemistry · Clutch"
                    icon={Target}
                    compact
                  />
                  <div className="mt-4 space-y-3">
                    <ScoreBar
                      label="Discipline"
                      value={ACTIVE_CONTRACT.disciplineScore}
                    />
                    <ScoreBar
                      label="Chemistry"
                      value={ACTIVE_CONTRACT.chemistryScore}
                    />
                    <ScoreBar
                      label="Clutch (this trial)"
                      value={ACTIVE_CONTRACT.clutchScore}
                      accent="gold"
                    />
                  </div>
                </GlassPanel>

                {/* Next-week plan */}
                <GlassPanel className="p-5 bl-side-stripe">
                  <SectionTitle
                    kicker="// AUTO_NEXT_WEEK"
                    title="Generated training plan"
                    icon={ListChecks}
                    compact
                  />
                  <ul className="mt-4 space-y-2">
                    {r.nextWeekPlan.map((p, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 border border-line/70 bg-panel/40 px-3 py-2"
                      >
                        <span className="font-mono text-[10px] tracking-widest text-neon/70 mt-0.5">
                          0{i + 1}
                        </span>
                        <span className="text-sm text-text leading-relaxed">
                          {p}
                        </span>
                      </li>
                    ))}
                  </ul>
                </GlassPanel>

                {/* Next trial */}
                <GlassPanel className="p-5">
                  <SectionTitle
                    kicker="// NEXT_TRIAL"
                    title={r.copy.nextTrial}
                    icon={CalendarClock}
                    compact
                  />
                  <Link
                    href="/partner/trials"
                    className="mt-4 bl-btn-primary px-4 py-2.5 text-xs bl-clip-notch w-full"
                  >
                    Schedule Next Trial
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </GlassPanel>

                <GlassPanel className="p-5">
                  <SectionTitle
                    kicker="// EXPORT"
                    title="Save this report"
                    icon={ScrollText}
                    compact
                  />
                  <p className="mt-2 text-xs text-text-dim leading-relaxed">
                    Reports are saved to your contract history. Share-only with
                    your duo partner.
                  </p>
                  <div className="mt-3 flex gap-2">
                    <button className="bl-btn-ghost bl-clip-notch text-[10px] flex-1">
                      Save to history
                    </button>
                    <button className="bl-btn-ghost bl-clip-notch text-[10px] flex-1">
                      Send to partner
                    </button>
                  </div>
                </GlassPanel>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

function DuoLine({
  user,
  score,
}: {
  user: ReturnType<typeof getUser>
  score: number
}) {
  if (!user) return null
  return (
    <div className="flex items-center gap-3">
      <PartnerAvatar user={user} size={36} />
      <div className="min-w-0 flex-1">
        <div className="font-display text-sm font-bold tracking-tight truncate">
          {user.name.split(" ")[0]}
        </div>
        <div className="mt-1 h-1.5 w-full bl-bar-track">
          <div
            className="h-full bg-neon shadow-[0_0_10px_rgba(0,240,255,0.5)]"
            style={{ width: `${score}%` }}
          />
        </div>
      </div>
      <span className="font-display text-base font-bold text-neon tabular-nums">
        {score}
      </span>
    </div>
  )
}

function SectionTitle({
  kicker,
  title,
  icon: Icon,
  accent = "neon",
  compact = false,
}: {
  kicker: string
  title: string
  icon: React.ComponentType<{ className?: string }>
  accent?: "neon" | "ember"
  compact?: boolean
}) {
  const c = accent === "ember" ? "text-ember" : "text-neon"
  return (
    <div className="flex items-start gap-3">
      <span
        className={`inline-flex h-${compact ? "8" : "10"} w-${compact ? "8" : "10"} items-center justify-center border ${
          accent === "ember" ? "border-ember/40" : "border-neon/40"
        } bg-panel/60`}
      >
        <Icon className={`h-${compact ? "4" : "5"} w-${compact ? "4" : "5"} ${c}`} />
      </span>
      <div>
        <div className={`font-mono text-[10px] tracking-[0.28em] uppercase ${c}/80`}>
          {kicker}
        </div>
        <h3
          className={`mt-0.5 font-display ${
            compact ? "text-base" : "text-xl"
          } font-bold tracking-tight`}
        >
          {title}
        </h3>
      </div>
    </div>
  )
}

function RevisionBlock({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="border border-neon/30 bg-neon/5 p-4">
      <div className="font-display text-[10px] font-bold tracking-[0.28em] text-neon">
        {label}
      </div>
      <ul className="mt-3 space-y-2">
        {items.map((it, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-text">
            <CheckCircle2 className="h-3.5 w-3.5 text-neon shrink-0 mt-0.5" />
            <span className="leading-relaxed">{it}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
