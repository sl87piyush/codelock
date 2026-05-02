"use client"

import { use, useMemo, useState } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Circle,
  Flame,
  Zap,
  Heart,
  Trophy,
  AlertTriangle,
  Send,
  Clock,
  Target,
  PlayCircle,
  CalendarClock,
  ShieldCheck,
} from "lucide-react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { TopBar } from "@/components/dashboard/top-bar"
import {
  GlassPanel,
  PartnerAvatar,
  ReliabilityBadge,
  ScoreBar,
  Chip,
  StatTile,
} from "@/components/partner/partner-atoms"
import {
  ACTIVE_CONTRACT,
  CURRENT_USER_ID,
  TODAY_MISSIONS,
  WEEK_MISSIONS,
  getCard,
  getUser,
  NUDGES,
} from "@/components/partner/partner-data"
import { cn } from "@/lib/utils"

type ChatMsg = {
  id: string
  authorId: string
  text: string
  type: "checkin" | "summary" | "trial" | "system"
  timeLabel: string
}

const SEED_CHAT: ChatMsg[] = [
  {
    id: "m1",
    authorId: "u_anya",
    text: "Mission 1 done — Min Spanning Tree. Solved in 32 min, no hint.",
    type: "checkin",
    timeLabel: "08:14 PM IST",
  },
  {
    id: "m2",
    authorId: "u_self",
    text: "Solved Course Schedule II. Got tripped on cycle detect once.",
    type: "checkin",
    timeLabel: "08:42 PM IST",
  },
  {
    id: "m3",
    authorId: "u_anya",
    text: "Daily summary: 1 New + 1 Revision. Topic: Graphs. Time used: 58m.",
    type: "summary",
    timeLabel: "09:02 PM IST",
  },
  {
    id: "m4",
    authorId: "u_self",
    text: "Trial slot confirmed: Sunday 8 PM IST · Format A.",
    type: "trial",
    timeLabel: "09:18 PM IST",
  },
]

export default function DuoDashboardPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const partner = getUser(id)
  const me = getUser(CURRENT_USER_ID)
  const myCard = getCard(CURRENT_USER_ID)
  const partnerCard = getCard(id)

  const [chat, setChat] = useState<ChatMsg[]>(SEED_CHAT)
  const [draft, setDraft] = useState("")
  const [tasks, setTasks] = useState(TODAY_MISSIONS)

  if (!partner || !me || !myCard || !partnerCard) return notFound()
  if (ACTIVE_CONTRACT.partnerBId !== id) {
    // Mock fallback — pretend any partner has an active duo
  }

  const toggleTask = (userId: string, taskId: string) => {
    setTasks((prev) => ({
      ...prev,
      perUser: prev.perUser.map((p) =>
        p.userId !== userId
          ? p
          : {
              ...p,
              tasks: p.tasks.map((t) =>
                t.id !== taskId ? t : { ...t, done: !t.done },
              ),
            },
      ),
    }))
  }

  const myTasks =
    tasks.perUser.find((p) => p.userId === CURRENT_USER_ID)?.tasks ?? []
  const partnerTasks =
    tasks.perUser.find((p) => p.userId === id)?.tasks ?? []

  const myDone = myTasks.filter((t) => t.done).length
  const partnerDone = partnerTasks.filter((t) => t.done).length

  const sendCheckIn = () => {
    if (!draft.trim()) return
    setChat((prev) => [
      ...prev,
      {
        id: `m_${prev.length + 1}`,
        authorId: CURRENT_USER_ID,
        text: draft.trim(),
        type: "checkin",
        timeLabel: "Now",
      },
    ])
    setDraft("")
  }

  const sharedSlots = useMemo(
    () =>
      myCard.timeSlots.filter((s) => partnerCard.timeSlots.includes(s)),
    [myCard, partnerCard],
  )

  return (
    <div className="flex min-h-screen w-full bg-void text-text">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar title="Duo Dashboard" sector="012_DUO_BAY" />

        <main className="relative flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
            <div className="absolute -top-32 left-1/2 h-[400px] w-[900px] -translate-x-1/2 bg-electric/10 blur-3xl rounded-full" />
          </div>

          <div className="relative mx-auto max-w-[1320px] space-y-6">
            <div className="flex items-center justify-between">
              <Link
                href="/partner/matches"
                className="inline-flex items-center gap-1.5 font-display text-[11px] font-bold tracking-[0.2em] text-text-dim hover:text-neon"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                BACK TO MATCHES
              </Link>
              <Link
                href={`/partner/contract/${id}`}
                className="bl-btn-ghost bl-clip-notch"
              >
                View Contract
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            {/* Header / Duo banner */}
            <GlassPanel className="relative overflow-hidden p-6" notch corners>
              <div className="pointer-events-none absolute inset-0 bl-grid opacity-25" />

              <div className="relative flex flex-wrap items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center -space-x-3">
                    <PartnerAvatar user={me} size={56} />
                    <PartnerAvatar user={partner} size={56} />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] tracking-[0.3em] text-neon/80 uppercase">
                      // DUO_BAY · CONTRACT {ACTIVE_CONTRACT.id.toUpperCase()}
                    </div>
                    <h2 className="mt-0.5 font-display text-2xl font-bold tracking-tight">
                      {me.name.split(" ")[0]} × {partner.name.split(" ")[0]}
                    </h2>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <ReliabilityBadge tier={me.reliabilityTier} score={me.reliabilityScore} compact />
                      <span className="text-text-mute">·</span>
                      <ReliabilityBadge tier={partner.reliabilityTier} score={partner.reliabilityScore} compact />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 border border-ember/40 bg-ember/5 px-3 py-1.5">
                    <Flame className="h-4 w-4 text-ember" />
                    <span className="font-display text-lg font-bold text-ember tabular-nums">
                      {ACTIVE_CONTRACT.duoStreak}
                    </span>
                    <span className="font-display text-[10px] font-bold tracking-[0.22em] text-ember/80">
                      DUO STREAK
                    </span>
                  </div>
                  <Chip accent="neon">
                    DAY {ACTIVE_CONTRACT.dayIndex} OF 7
                  </Chip>
                </div>
              </div>
            </GlassPanel>

            {/* Nudge banner if any */}
            {NUDGES.length > 0 && (
              <div className="border border-ember/40 bg-ember/8 p-4 flex flex-wrap items-center gap-3">
                <AlertTriangle className="h-4 w-4 text-ember" />
                <div className="flex-1 min-w-[200px]">
                  <div className="font-display text-[11px] font-bold tracking-[0.22em] text-ember">
                    {NUDGES[0].title}
                  </div>
                  <div className="mt-0.5 text-sm text-text-dim">
                    {NUDGES[0].body}
                  </div>
                </div>
                {NUDGES[0].cta && (
                  <button className="bl-btn-ghost bl-clip-notch">
                    {NUDGES[0].cta}
                  </button>
                )}
              </div>
            )}

            {/* Score grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <StatTile
                label="DUO STREAK"
                value={ACTIVE_CONTRACT.duoStreak}
                accent="ember"
                sub="days locked-in"
              />
              <StatTile
                label="DISCIPLINE"
                value={ACTIVE_CONTRACT.disciplineScore}
                sub="Showed up · stayed locked"
              />
              <StatTile
                label="CHEMISTRY"
                value={ACTIVE_CONTRACT.chemistryScore}
                sub="Sync · check-ins · pace"
              />
              <StatTile
                label="CLUTCH"
                value={ACTIVE_CONTRACT.clutchScore}
                accent="gold"
                sub="Trial performance"
              />
            </div>

            {/* MAIN GRID */}
            <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
              {/* Left column: missions + chat */}
              <div className="space-y-6">
                {/* Today's Missions */}
                <GlassPanel className="p-6">
                  <div className="flex flex-wrap items-end justify-between gap-3">
                    <div>
                      <div className="font-mono text-[10px] tracking-[0.3em] text-neon/80 uppercase">
                        // TODAY · {tasks.dateLabel}
                      </div>
                      <h3 className="mt-1 font-display text-xl font-bold tracking-tight">
                        Today&apos;s Missions
                      </h3>
                    </div>
                    <Chip>
                      {myDone + partnerDone}/{myTasks.length + partnerTasks.length} CLEARED
                    </Chip>
                  </div>

                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    <MissionColumn
                      user={me}
                      tasks={myTasks}
                      onToggle={(tid) => toggleTask(CURRENT_USER_ID, tid)}
                      isMe
                    />
                    <MissionColumn
                      user={partner}
                      tasks={partnerTasks}
                      onToggle={(tid) => toggleTask(id, tid)}
                    />
                  </div>
                </GlassPanel>

                {/* Discipline Debt panel */}
                <GlassPanel className="p-6">
                  <div className="flex flex-wrap items-end justify-between gap-3">
                    <div>
                      <div className="font-mono text-[10px] tracking-[0.3em] text-text-mute uppercase">
                        // DEBT_PANEL
                      </div>
                      <h3 className="mt-1 font-display text-lg font-bold tracking-tight">
                        Discipline Debt
                      </h3>
                    </div>
                    <Chip accent={ACTIVE_CONTRACT.disciplineDebt > 0 ? "ember" : "neon"}>
                      {ACTIVE_CONTRACT.disciplineDebt} TASKS OWED
                    </Chip>
                  </div>

                  <div className="mt-4 space-y-3">
                    <ScoreBar
                      label="Discipline"
                      value={ACTIVE_CONTRACT.disciplineScore}
                      accent={
                        ACTIVE_CONTRACT.disciplineScore < 60 ? "ember" : "neon"
                      }
                    />
                    <ScoreBar
                      label="Chemistry"
                      value={ACTIVE_CONTRACT.chemistryScore}
                    />
                    <ScoreBar
                      label="Clutch"
                      value={ACTIVE_CONTRACT.clutchScore}
                      accent="gold"
                    />
                  </div>

                  <p className="mt-4 text-sm text-text-dim leading-relaxed">
                    {ACTIVE_CONTRACT.disciplineDebt > 0
                      ? `Discipline Debt: ${ACTIVE_CONTRACT.disciplineDebt} task. Clear today to stay on track.`
                      : "No debt. You and your partner are fully synced."}
                  </p>
                </GlassPanel>

                {/* In-app chat */}
                <GlassPanel className="p-0 overflow-hidden">
                  <div className="flex items-center justify-between border-b border-line/60 px-5 py-3">
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-neon bl-flicker shadow-[0_0_10px_#00f0ff]" />
                      <div className="font-mono text-[10px] tracking-[0.3em] text-neon/80 uppercase">
                        // STRUCTURED_CHAT
                      </div>
                    </div>
                    <span className="font-display text-[10px] font-bold tracking-[0.22em] text-text-mute">
                      CHECK-INS · SUMMARIES · TRIAL ONLY
                    </span>
                  </div>

                  <div className="max-h-[360px] overflow-y-auto p-5 space-y-3">
                    {chat.map((m) => {
                      const author = getUser(m.authorId)
                      if (!author) return null
                      const mine = m.authorId === CURRENT_USER_ID
                      const typeColor =
                        m.type === "summary"
                          ? "border-neon/30 bg-neon/5"
                          : m.type === "trial"
                            ? "border-ember/30 bg-ember/5"
                            : "border-line/70 bg-panel/40"

                      return (
                        <div
                          key={m.id}
                          className={cn(
                            "flex items-start gap-3",
                            mine && "flex-row-reverse",
                          )}
                        >
                          <PartnerAvatar user={author} size={32} />
                          <div className={cn("flex-1 min-w-0", mine && "text-right")}>
                            <div className={cn("flex items-center gap-2", mine && "justify-end")}>
                              <span className="font-display text-[11px] font-bold tracking-tight text-text">
                                {author.name.split(" ")[0]}
                              </span>
                              <span className="font-mono text-[10px] text-text-mute">
                                {m.timeLabel}
                              </span>
                              <Chip size="sm" accent={m.type === "trial" ? "ember" : "muted"}>
                                {m.type.toUpperCase()}
                              </Chip>
                            </div>
                            <div
                              className={cn(
                                "mt-1.5 inline-block max-w-[88%] border px-3 py-2 text-[13px] leading-relaxed text-text",
                                typeColor,
                              )}
                            >
                              {m.text}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <div className="border-t border-line/60 p-3 flex items-center gap-2">
                    <input
                      type="text"
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && sendCheckIn()}
                      placeholder="Post a check-in, daily summary, or trial note…"
                      className="flex-1 border border-line bg-panel/40 px-3 py-2 font-mono text-xs text-text placeholder:text-text-mute focus:border-neon/60 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={sendCheckIn}
                      className="bl-btn-primary px-4 py-2 text-xs bl-clip-notch"
                    >
                      <Send className="h-3.5 w-3.5" />
                      Post
                    </button>
                  </div>
                  <div className="border-t border-line/60 px-3 py-2 font-mono text-[10px] text-text-mute">
                    Free-form DMs are disabled. Only structured posts.
                  </div>
                </GlassPanel>
              </div>

              {/* Right column */}
              <aside className="space-y-5">
                {/* Next trial */}
                <GlassPanel className="p-5 bl-side-stripe-ember">
                  <div className="font-mono text-[10px] tracking-[0.3em] text-ember/80 uppercase">
                    // NEXT_TRIAL
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <CalendarClock className="h-5 w-5 text-ember" />
                    <div>
                      <div className="font-display text-base font-bold tracking-tight">
                        {ACTIVE_CONTRACT.trialDayLabel}
                      </div>
                      <div className="mt-0.5 font-mono text-[11px] text-text-dim">
                        Format pending — choose together.
                      </div>
                    </div>
                  </div>
                  <Link
                    href="/partner/trials"
                    className="mt-4 bl-btn-primary px-4 py-2.5 text-xs bl-clip-notch w-full"
                  >
                    Schedule Trial
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </GlassPanel>

                {/* Quick actions */}
                <GlassPanel className="p-5">
                  <div className="font-mono text-[10px] tracking-[0.3em] text-text-mute uppercase">
                    // QUICK_ACTIONS
                  </div>
                  <div className="mt-3 space-y-2">
                    <ActionRow
                      icon={PlayCircle}
                      title="Start Sync Solve"
                      desc="60-min session, same problem set."
                      accent="neon"
                    />
                    <ActionRow
                      icon={Trophy}
                      title="Schedule Trial"
                      desc="Lock in Sunday 8 PM IST."
                      accent="ember"
                      href="/partner/trials"
                    />
                    <ActionRow
                      icon={ShieldCheck}
                      title="Enter Recovery Mode"
                      desc="Reduced load · 2 days only."
                      accent="muted"
                    />
                  </div>
                </GlassPanel>

                {/* Gap list */}
                <GlassPanel className="p-5">
                  <div className="font-mono text-[10px] tracking-[0.3em] text-text-mute uppercase">
                    // GAP_LIST · SHARED
                  </div>
                  <div className="mt-3 space-y-2">
                    {[...new Set([...me.weakTopics, ...partner.weakTopics])].map((g) => (
                      <div
                        key={g}
                        className="flex items-center gap-2 border border-line/70 bg-panel/40 px-3 py-1.5"
                      >
                        <Target className="h-3.5 w-3.5 text-ember shrink-0" />
                        <span className="font-display text-sm font-semibold tracking-tight">
                          {g}
                        </span>
                      </div>
                    ))}
                  </div>
                </GlassPanel>

                {/* Shared schedule */}
                <GlassPanel className="p-5">
                  <div className="font-mono text-[10px] tracking-[0.3em] text-text-mute uppercase">
                    // SHARED_SCHEDULE
                  </div>
                  <div className="mt-3 space-y-1.5">
                    {sharedSlots.map((s) => (
                      <div
                        key={s}
                        className="flex items-center gap-2 border border-neon/30 bg-neon/5 px-3 py-1.5"
                      >
                        <Clock className="h-3.5 w-3.5 text-neon" />
                        <span className="font-mono text-xs tabular-nums text-neon">
                          {s}
                        </span>
                      </div>
                    ))}
                  </div>
                </GlassPanel>

                {/* Partner score legend */}
                <GlassPanel className="p-5">
                  <div className="font-mono text-[10px] tracking-[0.3em] text-text-mute uppercase">
                    // SCORE_LEGEND
                  </div>
                  <div className="mt-3 space-y-2 text-xs text-text-dim">
                    <LegendRow icon={Zap} label="Discipline" desc="Daily missions cleared" />
                    <LegendRow icon={Heart} label="Chemistry" desc="Check-ins & sync" />
                    <LegendRow icon={Trophy} label="Clutch" desc="Trial performance" />
                  </div>
                </GlassPanel>
              </aside>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------

function MissionColumn({
  user,
  tasks,
  onToggle,
  isMe = false,
}: {
  user: ReturnType<typeof getUser>
  tasks: { id: string; label: string; type: string; done: boolean }[]
  onToggle: (id: string) => void
  isMe?: boolean
}) {
  if (!user) return null
  const done = tasks.filter((t) => t.done).length
  return (
    <div className="border border-line/70 bg-panel/40 p-4">
      <div className="flex items-center gap-3">
        <PartnerAvatar user={user} size={36} />
        <div className="min-w-0 flex-1">
          <div className="font-display text-sm font-bold tracking-tight text-text truncate">
            {user.name.split(" ")[0]}
            {isMe && (
              <span className="ml-2 font-mono text-[10px] text-neon">(YOU)</span>
            )}
          </div>
          <div className="mt-0.5 font-mono text-[10px] text-text-dim">
            {done}/{tasks.length} done
          </div>
        </div>
      </div>

      <ul className="mt-4 space-y-2">
        {tasks.map((t) => (
          <li key={t.id}>
            <button
              type="button"
              onClick={() => isMe && onToggle(t.id)}
              disabled={!isMe}
              className={cn(
                "flex w-full items-start gap-2.5 border px-3 py-2 text-left transition-colors",
                t.done
                  ? "border-neon/40 bg-neon/8"
                  : "border-line/80 bg-panel/40",
                isMe && "hover:border-neon/60",
                !isMe && "cursor-not-allowed opacity-90",
              )}
            >
              {t.done ? (
                <CheckCircle2 className="h-4 w-4 text-neon shrink-0 mt-0.5" />
              ) : (
                <Circle className="h-4 w-4 text-text-mute shrink-0 mt-0.5" />
              )}
              <div className="min-w-0 flex-1">
                <div className="font-mono text-[10px] tracking-widest text-text-mute uppercase">
                  {t.type}
                </div>
                <div
                  className={cn(
                    "mt-0.5 text-[13px] leading-snug",
                    t.done ? "text-text" : "text-text-dim",
                  )}
                >
                  {t.label}
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ActionRow({
  icon: Icon,
  title,
  desc,
  accent,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  desc: string
  accent: "neon" | "ember" | "muted"
  href?: string
}) {
  const accentClass =
    accent === "ember"
      ? "border-ember/40 hover:border-ember/70 hover:bg-ember/5"
      : accent === "muted"
        ? "border-line hover:border-text-dim/60 hover:bg-panel/60"
        : "border-neon/40 hover:border-neon/70 hover:bg-neon/5"
  const iconClass =
    accent === "ember"
      ? "text-ember"
      : accent === "muted"
        ? "text-text-dim"
        : "text-neon"

  const inner = (
    <div
      className={cn(
        "flex items-start gap-3 border bg-panel/30 px-3 py-2.5 transition-colors w-full text-left",
        accentClass,
      )}
    >
      <Icon className={cn("h-4 w-4 shrink-0 mt-0.5", iconClass)} />
      <div className="min-w-0 flex-1">
        <div className="font-display text-sm font-bold tracking-tight text-text">
          {title}
        </div>
        <div className="mt-0.5 font-mono text-[11px] text-text-dim">
          {desc}
        </div>
      </div>
      <ArrowRight className="h-3.5 w-3.5 text-text-mute mt-0.5" />
    </div>
  )

  if (href) return <Link href={href}>{inner}</Link>
  return <button type="button">{inner}</button>
}

function LegendRow({
  icon: Icon,
  label,
  desc,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  desc: string
}) {
  return (
    <div className="flex items-start gap-2">
      <Icon className="h-3.5 w-3.5 text-neon mt-0.5 shrink-0" />
      <div>
        <span className="font-display text-[12px] font-bold text-text">
          {label}
        </span>
        <span className="ml-2 text-[11px] text-text-dim">{desc}</span>
      </div>
    </div>
  )
}
