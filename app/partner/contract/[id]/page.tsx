import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  ArrowRight,
  Lock,
  CheckCircle2,
  AlertTriangle,
  CalendarClock,
  Stamp,
  ScrollText,
} from "lucide-react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { TopBar } from "@/components/dashboard/top-bar"
import {
  GlassPanel,
  PartnerAvatar,
  ReliabilityBadge,
  Chip,
} from "@/components/partner/partner-atoms"
import {
  ACTIVE_CONTRACT,
  CURRENT_USER_ID,
  getCard,
  getUser,
  WEEK_MISSIONS,
} from "@/components/partner/partner-data"

export default async function ContractPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const partner = getUser(id)
  const me = getUser(CURRENT_USER_ID)
  const myCard = getCard(CURRENT_USER_ID)
  const partnerCard = getCard(id)
  if (!partner || !me || !myCard || !partnerCard) return notFound()

  const isActive = ACTIVE_CONTRACT.partnerBId === id
  const contract = isActive ? ACTIVE_CONTRACT : null

  return (
    <div className="flex min-h-screen w-full bg-void text-text">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar title="7-Day Lock-In Contract" sector="012_CONTRACT" />

        <main className="relative flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
            <div className="absolute -top-20 left-1/4 h-[400px] w-[700px] bg-electric/12 blur-3xl rounded-full" />
            <div className="absolute bottom-0 right-0 h-[300px] w-[400px] bg-ember/5 blur-3xl rounded-full" />
          </div>

          <div className="relative mx-auto max-w-[1180px] space-y-6">
            <Link
              href={isActive ? `/partner/duo/${id}` : `/partner/profile/${id}`}
              className="inline-flex items-center gap-1.5 font-display text-[11px] font-bold tracking-[0.2em] text-text-dim hover:text-neon"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              {isActive ? "BACK TO DUO DASHBOARD" : "BACK TO PROFILE"}
            </Link>

            {/* Contract sheet */}
            <GlassPanel className="relative overflow-hidden p-6 sm:p-10" notch corners>
              <div className="pointer-events-none absolute inset-0 bl-stripes opacity-30" />
              <div className="pointer-events-none absolute inset-0 bl-grid opacity-20" />

              {/* Header */}
              <div className="relative flex flex-wrap items-center justify-between gap-4 border-b border-line/60 pb-5">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-12 w-12 items-center justify-center border border-neon/50 bg-neon/10 bl-clip-notch">
                    <ScrollText className="h-6 w-6 text-neon" />
                  </span>
                  <div>
                    <div className="font-mono text-[10px] tracking-[0.3em] text-neon/80 uppercase">
                      // SECTION_07.LOCK_IN
                    </div>
                    <h2 className="mt-0.5 font-display text-2xl font-bold tracking-tight">
                      7-Day Lock-In Contract
                    </h2>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Chip accent={isActive ? "neon" : "muted"}>
                    {isActive ? "ACTIVE · DAY " + contract!.dayIndex : "DRAFT · UNSIGNED"}
                  </Chip>
                  <span className="font-mono text-[10px] tabular-nums text-text-mute">
                    CONTRACT_ID:{" "}
                    {isActive ? contract!.id.toUpperCase() : "PENDING"}
                  </span>
                </div>
              </div>

              {/* Parties */}
              <div className="relative mt-6 grid gap-4 md:grid-cols-[1fr_auto_1fr] items-center">
                <PartyCard user={me} role="PARTY A" />
                <div className="flex flex-col items-center gap-2 py-4">
                  <span className="font-mono text-[10px] tracking-[0.28em] text-neon/70">
                    LOCK-IN
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center border border-neon/50 bg-neon/10 bl-clip-notch">
                    <Lock className="h-5 w-5 text-neon" />
                  </div>
                  <span className="font-display text-[10px] font-bold tracking-[0.22em] text-text-mute">
                    7 DAYS
                  </span>
                </div>
                <PartyCard user={partner} role="PARTY B" align="right" />
              </div>

              {/* Terms */}
              <div className="relative mt-8 grid gap-6 lg:grid-cols-2">
                <div>
                  <SubHead label="// DAILY_RULE" />
                  <div className="mt-2 border border-neon/30 bg-neon/5 p-4">
                    <div className="font-display text-[11px] font-bold tracking-[0.22em] text-neon">
                      EVERY DAY · 7 DAYS STRAIGHT
                    </div>
                    <div className="mt-1.5 font-display text-2xl font-bold text-text">
                      {contract?.dailyTarget ?? "1 New + 1 Revision"}
                    </div>
                    <p className="mt-1.5 text-xs text-text-dim">
                      Or a fixed daily target if both parties agreed.
                    </p>
                  </div>

                  <SubHead label="// WEEKLY_OBLIGATION" className="mt-5" />
                  <div className="mt-2 border border-ember/30 bg-ember/5 p-4">
                    <div className="font-display text-[11px] font-bold tracking-[0.22em] text-ember">
                      ONE SELECTION TRIAL
                    </div>
                    <div className="mt-1.5 font-display text-lg font-bold text-text">
                      {contract?.trialDayLabel ?? "Sunday 8:00 PM IST"}
                    </div>
                    <p className="mt-1.5 text-xs text-text-dim">
                      Timed. No re-attempts. Auto-graded against partner.
                    </p>
                  </div>
                </div>

                <div>
                  <SubHead label="// SOFT_CONSEQUENCES" />
                  <div className="mt-2 space-y-2">
                    {[
                      "Discipline Score decreases on missed missions.",
                      "Chemistry Score reflects sync between partners.",
                      "Discipline Debt accumulates — must be cleared.",
                      "Recovery Mode unlocks after 3 missed days.",
                      "Auto-rematch suggested after 5 missed days.",
                    ].map((r, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 border border-line/70 bg-panel/40 px-3 py-2.5"
                      >
                        <span className="font-mono text-[10px] tracking-widest text-neon/70 mt-0.5 shrink-0">
                          0{i + 1}
                        </span>
                        <p className="text-sm text-text-dim leading-relaxed">
                          {r}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Trial schedule + sign */}
              <div className="relative mt-8 grid gap-4 md:grid-cols-2">
                <div className="border border-line/70 bg-panel/40 p-4">
                  <div className="flex items-center gap-2">
                    <CalendarClock className="h-4 w-4 text-neon" />
                    <span className="font-display text-[10px] font-bold tracking-[0.22em] text-text-mute">
                      NEXT TRIAL
                    </span>
                  </div>
                  <div className="mt-2 font-display text-lg font-bold tracking-tight">
                    {contract?.trialDayLabel ?? "Sunday 8:00 PM IST"}
                  </div>
                  <div className="mt-1 font-mono text-xs text-text-dim">
                    Trial format selected together at start of contract.
                  </div>
                </div>

                <div className="border border-line/70 bg-panel/40 p-4">
                  <div className="flex items-center gap-2">
                    <Stamp className="h-4 w-4 text-ember" />
                    <span className="font-display text-[10px] font-bold tracking-[0.22em] text-text-mute">
                      ENTRY OATH
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-text-dim leading-relaxed">
                    &ldquo;I will train every day. I will not ghost. I will show up
                    for the trial. If I break the contract, I accept the soft
                    consequences.&rdquo;
                  </p>
                </div>
              </div>

              {/* Status banner */}
              {isActive ? (
                <div className="relative mt-8 border border-neon/40 bg-neon/8 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-neon" />
                      <div>
                        <div className="font-display text-[11px] font-bold tracking-[0.22em] text-neon">
                          LOCK-IN CONTRACT STARTED
                        </div>
                        <div className="mt-0.5 text-sm text-text">
                          7 days. No excuses. Day {contract!.dayIndex} of 7.
                        </div>
                      </div>
                    </div>
                    <Link
                      href={`/partner/duo/${id}`}
                      className="bl-btn-primary px-5 py-3 text-sm bl-clip-notch"
                    >
                      Open Duo Dashboard
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="relative mt-8 border border-ember/40 bg-ember/8 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-5 w-5 text-ember" />
                      <div>
                        <div className="font-display text-[11px] font-bold tracking-[0.22em] text-ember">
                          CONTRACT NOT YET SIGNED
                        </div>
                        <div className="mt-0.5 text-sm text-text">
                          Both parties must accept before training begins.
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link
                        href="/partner/matches"
                        className="bl-btn-ghost bl-clip-notch"
                      >
                        Back to matches
                      </Link>
                      <button className="bl-btn-primary px-5 py-3 text-sm bl-clip-notch">
                        <Lock className="h-4 w-4" />
                        Sign &amp; Send Invite
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </GlassPanel>

            {/* Live progress (if active) */}
            {isActive && contract && (
              <GlassPanel className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-mono text-[10px] tracking-[0.3em] text-neon/80 uppercase">
                      // CONTRACT_PROGRESS
                    </div>
                    <h3 className="mt-1 font-display text-xl font-bold tracking-tight">
                      Day-by-day commitment
                    </h3>
                  </div>
                  <Chip accent={contract.disciplineDebt > 0 ? "ember" : "neon"} size="sm">
                    DEBT · {contract.disciplineDebt}
                  </Chip>
                </div>

                <div className="mt-5 grid grid-cols-7 gap-2">
                  {WEEK_MISSIONS.map((d) => {
                    const meDone = d.perUser
                      .find((p) => p.userId === CURRENT_USER_ID)
                      ?.tasks.every((t) => t.done)
                    const partnerDone = d.perUser
                      .find((p) => p.userId === id)
                      ?.tasks.every((t) => t.done)
                    const both = meDone && partnerDone
                    const future = d.day > contract.dayIndex
                    const today = d.day === contract.dayIndex

                    return (
                      <div
                        key={d.day}
                        className={`relative border p-3 text-center ${
                          today
                            ? "border-neon/70 bg-neon/8 shadow-[0_0_20px_rgba(0,240,255,0.2)]"
                            : both
                              ? "border-neon/30 bg-neon/5"
                              : future
                                ? "border-line/60 bg-panel/40"
                                : "border-ember/30 bg-ember/5"
                        }`}
                      >
                        <div className="font-mono text-[9px] tracking-widest text-text-mute">
                          DAY {d.day}
                        </div>
                        <div className="mt-1 font-display text-[11px] font-bold text-text">
                          {d.dateLabel.split(" ").slice(0, 2).join(" ")}
                        </div>
                        <div className="mt-2">
                          {future ? (
                            <span className="text-text-mute font-mono text-[10px]">—</span>
                          ) : both ? (
                            <CheckCircle2 className="mx-auto h-4 w-4 text-neon" />
                          ) : (
                            <AlertTriangle className="mx-auto h-4 w-4 text-ember" />
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </GlassPanel>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

function PartyCard({
  user,
  role,
  align = "left",
}: {
  user: ReturnType<typeof getUser>
  role: string
  align?: "left" | "right"
}) {
  if (!user) return null
  return (
    <div
      className={`flex items-center gap-4 border border-line/70 bg-panel/40 p-4 ${
        align === "right" ? "md:flex-row-reverse md:text-right" : ""
      }`}
    >
      <PartnerAvatar user={user} size={56} />
      <div className="min-w-0 flex-1">
        <div className="font-mono text-[10px] tracking-[0.22em] text-neon/80">
          {role}
        </div>
        <div className="mt-0.5 font-display text-base font-bold tracking-tight truncate">
          {user.name}
        </div>
        <div className="mt-0.5 font-mono text-[11px] text-text-dim truncate">
          @{user.handle} · {user.rank}
        </div>
        <div className={`mt-2 ${align === "right" ? "md:flex md:justify-end" : ""}`}>
          <ReliabilityBadge tier={user.reliabilityTier} score={user.reliabilityScore} compact />
        </div>
      </div>
    </div>
  )
}

function SubHead({ label, className }: { label: string; className?: string }) {
  return (
    <div className={`font-mono text-[10px] tracking-[0.3em] text-text-mute uppercase ${className ?? ""}`}>
      {label}
    </div>
  )
}
