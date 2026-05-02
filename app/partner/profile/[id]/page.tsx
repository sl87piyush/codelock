import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  Lock,
  Clock,
  Code2,
  Activity,
  MessageSquare,
  ShieldAlert,
  Building2,
  Target,
  Layers,
  CheckCircle2,
  XCircle,
  RefreshCcw,
  Award,
} from "lucide-react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { TopBar } from "@/components/dashboard/top-bar"
import {
  GlassPanel,
  PartnerAvatar,
  ReliabilityBadge,
  Chip,
  StatTile,
} from "@/components/partner/partner-atoms"
import { getUser, getCard, MATCHES } from "@/components/partner/partner-data"

export default async function PartnerProfilePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const user = getUser(id)
  const card = getCard(id)
  const match = MATCHES.find((m) => m.id === id)
  if (!user || !card) return notFound()

  return (
    <div className="flex min-h-screen w-full bg-void text-text">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar title="Partner Profile" sector="012_PROFILE" />

        <main className="relative flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
            <div className="absolute -top-20 left-1/3 h-[400px] w-[700px] bg-electric/10 blur-3xl rounded-full" />
          </div>

          <div className="relative mx-auto max-w-[1180px] space-y-6">
            <Link
              href="/partner/matches"
              className="inline-flex items-center gap-1.5 font-display text-[11px] font-bold tracking-[0.2em] text-text-dim hover:text-neon"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              BACK TO MATCHES
            </Link>

            {/* Hero */}
            <GlassPanel className="p-6 sm:p-8" notch corners>
              <div className="flex flex-wrap items-start gap-6">
                <PartnerAvatar user={user} size={96} />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="font-display text-3xl font-bold tracking-tight">
                      {user.name}
                    </h2>
                    <ReliabilityBadge
                      tier={user.reliabilityTier}
                      score={user.reliabilityScore}
                    />
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[12px] text-text-dim">
                    <span>@{user.handle}</span>
                    <span className="opacity-50">·</span>
                    <span>{user.city}</span>
                    <span className="opacity-50">·</span>
                    <span>{user.rank}</span>
                    <span className="opacity-50">·</span>
                    <span>Contest {user.contestRating}</span>
                  </div>
                  <p className="mt-3 max-w-2xl text-sm text-text-dim leading-relaxed">
                    {user.bio}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {user.badges.map((b) => (
                      <Chip key={b} size="sm" accent="ember">
                        <Award className="h-3 w-3" />
                        {b}
                      </Chip>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2 shrink-0">
                  {match && (
                    <>
                      <div className="font-mono text-[10px] tracking-[0.2em] text-neon/80">
                        COMPATIBILITY
                      </div>
                      <div className="font-display text-4xl font-bold text-neon tabular-nums text-glow leading-none">
                        {match.compatibility}
                      </div>
                    </>
                  )}
                  <Link
                    href={`/partner/contract/${user.id}`}
                    className="bl-btn-primary px-5 py-3 text-sm bl-clip-notch mt-2"
                  >
                    <Lock className="h-4 w-4" />
                    Invite to Lock-In
                  </Link>
                </div>
              </div>
            </GlassPanel>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <StatTile label="RELIABILITY" value={user.reliabilityScore} sub="Last 30 days" />
              <StatTile
                label="ON-TIME"
                value={user.reliability30d.onTime}
                sub={`Missed ${user.reliability30d.missed}`}
              />
              <StatTile
                label="RECOVERED"
                value={user.reliability30d.recovered}
                accent="ember"
                sub="Used recovery mode"
              />
              <StatTile
                label="SOLVED"
                value={user.solved}
                sub={`${card.level.contestRating} contest`}
              />
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
              {/* Training card snapshot */}
              <GlassPanel className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-mono text-[10px] tracking-[0.3em] text-neon/80 uppercase">
                      // TRAINING_CARD_SNAPSHOT
                    </div>
                    <h3 className="mt-1 font-display text-xl font-bold tracking-tight">
                      How they train
                    </h3>
                  </div>
                  <span className="font-mono text-[10px] text-text-mute">
                    Updated {card.updatedAtDays}d ago
                  </span>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <Field icon={Target} label="Goal" value={card.goal} />
                  <Field icon={Layers} label="Focus" value={card.focus} />
                  <Field icon={Clock} label="Daily" value={`${card.dailyCommitment} min/day`} />
                  <Field icon={Code2} label="Language" value={card.language} />
                  <Field icon={Activity} label="Pace" value={card.pace} />
                  <Field icon={MessageSquare} label="Comms" value={card.communication} />
                  <Field icon={ShieldAlert} label="Style" value={card.accountability} />
                  <Field
                    icon={Building2}
                    label="Targets"
                    value={card.targetCompanies.join(", ")}
                  />
                </div>

                {/* Time slots */}
                <div className="mt-5 border-t border-line/60 pt-4">
                  <div className="font-display text-[10px] font-bold tracking-[0.22em] text-text-mute">
                    PREFERRED SCHEDULE (IST)
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {card.timeSlots.map((s) => (
                      <span
                        key={s}
                        className="border border-neon/30 bg-neon/5 px-3 py-1 font-mono text-xs tabular-nums text-neon"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Compatibility chips */}
                {match && (
                  <div className="mt-5 border-t border-line/60 pt-4">
                    <div className="font-display text-[10px] font-bold tracking-[0.22em] text-text-mute">
                      WHY YOU&apos;RE COMPATIBLE
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {match.chips.map((c) => (
                        <Chip key={c} size="sm">
                          {c}
                        </Chip>
                      ))}
                    </div>
                  </div>
                )}
              </GlassPanel>

              {/* Side: topics + reliability breakdown */}
              <div className="space-y-5">
                <GlassPanel className="p-5">
                  <div className="font-mono text-[10px] tracking-[0.3em] text-neon/80 uppercase">
                    // TOP_TOPICS
                  </div>
                  <div className="mt-3 space-y-2">
                    {user.topTopics.map((t) => (
                      <div
                        key={t}
                        className="flex items-center gap-2 border border-line/70 bg-panel/40 px-3 py-2"
                      >
                        <CheckCircle2 className="h-4 w-4 text-neon" />
                        <span className="font-display text-sm font-semibold tracking-tight">
                          {t}
                        </span>
                      </div>
                    ))}
                  </div>
                </GlassPanel>

                <GlassPanel className="p-5">
                  <div className="font-mono text-[10px] tracking-[0.3em] text-ember/80 uppercase">
                    // GAP_LIST
                  </div>
                  <div className="mt-3 space-y-2">
                    {user.weakTopics.map((t) => (
                      <div
                        key={t}
                        className="flex items-center gap-2 border border-line/70 bg-panel/40 px-3 py-2"
                      >
                        <XCircle className="h-4 w-4 text-ember" />
                        <span className="font-display text-sm font-semibold tracking-tight">
                          {t}
                        </span>
                      </div>
                    ))}
                  </div>
                </GlassPanel>

                <GlassPanel className="p-5">
                  <div className="font-mono text-[10px] tracking-[0.3em] text-text-mute uppercase">
                    // RELIABILITY_BREAKDOWN
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    <Mini label="On-time" value={user.reliability30d.onTime.toString()} accent="neon" />
                    <Mini label="Missed" value={user.reliability30d.missed.toString()} accent="ember" />
                    <Mini label="Recovered" value={user.reliability30d.recovered.toString()} accent="neon" />
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-xs text-text-dim">
                    <RefreshCcw className="h-3.5 w-3.5 text-neon" />
                    Auto-rematch enabled
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

function Field({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div className="flex items-start gap-3 border border-line/70 bg-panel/40 px-3 py-2.5">
      <Icon className="h-4 w-4 text-neon shrink-0 mt-0.5" />
      <div className="min-w-0 flex-1">
        <div className="font-display text-[10px] font-bold tracking-[0.22em] text-text-mute">
          {label}
        </div>
        <div className="mt-0.5 font-display text-sm font-semibold tracking-tight text-text truncate">
          {value}
        </div>
      </div>
    </div>
  )
}

function Mini({
  label,
  value,
  accent,
}: {
  label: string
  value: string
  accent: "neon" | "ember"
}) {
  const c = accent === "ember" ? "text-ember" : "text-neon"
  return (
    <div className="border border-line/70 bg-panel/40 px-2 py-2 text-center">
      <div className={`font-display text-lg font-bold tabular-nums ${c}`}>
        {value}
      </div>
      <div className="mt-0.5 font-display text-[9px] font-bold tracking-[0.22em] text-text-mute">
        {label}
      </div>
    </div>
  )
}
