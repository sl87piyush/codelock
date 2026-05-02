"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  ScrollText,
  Target,
  Layers,
  Gauge,
  Clock,
  Code2,
  Activity,
  MessageSquare,
  ShieldAlert,
  Building2,
} from "lucide-react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { TopBar } from "@/components/dashboard/top-bar"
import { GlassPanel, Chip } from "@/components/partner/partner-atoms"
import { cn } from "@/lib/utils"
import type {
  AccountabilityStyle,
  CommunicationStyle,
  DailyCommitment,
  FocusType,
  Goal,
  Language,
  Pace,
} from "@/components/partner/partner-data"

const GOALS: Goal[] = ["Big Tech", "Product", "OA Sprint", "Placement Season"]
const FOCUSES: FocusType[] = [
  "Medium-focused",
  "Topic-focused",
  "Company-focused",
]
const COMMITMENTS: DailyCommitment[] = [30, 60, 90]
const TIME_SLOTS = [
  "06:00–07:30 IST",
  "08:00–09:30 IST",
  "12:30–13:30 IST",
  "19:00–20:30 IST",
  "20:00–21:30 IST",
  "21:00–22:30 IST",
  "22:00–23:30 IST",
  "23:00–00:30 IST",
]
const LANGUAGES: Language[] = ["C++", "Java", "Python"]
const PACES: Pace[] = ["Fast", "Steady", "Slow + Deep"]
const COMMS: CommunicationStyle[] = [
  "Chat only",
  "Voice weekends",
  "Text summaries",
]
const ACCS: AccountabilityStyle[] = ["Strict", "Supportive", "Mixed"]

export default function TrainingCardPage() {
  const [goal, setGoal] = useState<Goal>("Big Tech")
  const [focus, setFocus] = useState<FocusType>("Medium-focused")
  const [solved, setSolved] = useState(412)
  const [internalRating, setInternalRating] = useState(1820)
  const [contestRating, setContestRating] = useState(1684)
  const [commitment, setCommitment] = useState<DailyCommitment>(60)
  const [slots, setSlots] = useState<Set<string>>(
    new Set(["20:00–21:30 IST", "23:00–00:30 IST"]),
  )
  const [language, setLanguage] = useState<Language>("C++")
  const [pace, setPace] = useState<Pace>("Steady")
  const [comm, setComm] = useState<CommunicationStyle>("Text summaries")
  const [acc, setAcc] = useState<AccountabilityStyle>("Mixed")
  const [noGhosting, setNoGhosting] = useState(true)
  const [companies, setCompanies] = useState("Google, Atlassian, Stripe")

  const completion = useMemo(() => {
    let n = 0
    if (goal) n++
    if (focus) n++
    if (solved && internalRating) n++
    if (commitment) n++
    if (slots.size > 0) n++
    if (language) n++
    if (pace) n++
    if (comm) n++
    if (acc) n++
    if (companies.trim().length > 0) n++
    return Math.round((n / 10) * 100)
  }, [goal, focus, solved, internalRating, commitment, slots, language, pace, comm, acc, companies])

  const toggleSlot = (s: string) =>
    setSlots((prev) => {
      const n = new Set(prev)
      n.has(s) ? n.delete(s) : n.add(s)
      return n
    })

  return (
    <div className="flex min-h-screen w-full bg-void text-text">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar title="Training Card" sector="012_TRAINING_CARD" />

        <main className="relative flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
            <div className="absolute -top-32 left-1/4 h-[400px] w-[700px] bg-electric/10 blur-3xl rounded-full" />
          </div>

          <div className="relative mx-auto max-w-[1280px] space-y-6">
            {/* Breadcrumb */}
            <Link
              href="/partner"
              className="inline-flex items-center gap-1.5 font-display text-[11px] font-bold tracking-[0.2em] text-text-dim hover:text-neon"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              BACK TO PROGRAM
            </Link>

            {/* Header strip */}
            <GlassPanel className="p-5 sm:p-6" notch>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="inline-flex h-12 w-12 items-center justify-center border border-neon/50 bg-neon/10 bl-clip-notch">
                    <ScrollText className="h-6 w-6 text-neon" />
                  </span>
                  <div>
                    <div className="font-mono text-[10px] tracking-[0.3em] text-neon/80 uppercase">
                      // SELECTION_FORM
                    </div>
                    <h2 className="mt-0.5 font-display text-2xl font-bold tracking-tight">
                      Build your Training Card
                    </h2>
                    <p className="mt-1 text-sm text-text-dim max-w-2xl">
                      This card defines how seriously you train. Matching is
                      based on discipline, not popularity.
                    </p>
                  </div>
                </div>

                {/* Completion */}
                <div className="min-w-[200px]">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-[10px] font-bold tracking-[0.22em] text-text-mute">
                      CARD READINESS
                    </span>
                    <span className="font-mono text-xs tabular-nums text-neon">
                      {completion}%
                    </span>
                  </div>
                  <div className="mt-1.5 h-1.5 w-full bl-bar-track">
                    <div
                      className="h-full bg-neon shadow-[0_0_14px_rgba(0,240,255,0.55)] transition-all"
                      style={{ width: `${completion}%` }}
                    />
                  </div>
                </div>
              </div>
            </GlassPanel>

            <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
              {/* ============== FORM ============== */}
              <div className="space-y-5">
                <FormSection
                  icon={Target}
                  title="Goal"
                  hint="Why are you training?"
                >
                  <ChipGroup
                    options={GOALS}
                    value={goal}
                    onChange={(v) => setGoal(v as Goal)}
                  />
                </FormSection>

                <FormSection
                  icon={Layers}
                  title="Focus"
                  hint="What do you want each week to look like?"
                >
                  <ChipGroup
                    options={FOCUSES}
                    value={focus}
                    onChange={(v) => setFocus(v as FocusType)}
                  />
                </FormSection>

                <FormSection
                  icon={Gauge}
                  title="Current Level"
                  hint="Be honest. Matching depends on it."
                >
                  <div className="grid gap-3 sm:grid-cols-3">
                    <NumberField
                      label="Solved Count"
                      value={solved}
                      onChange={setSolved}
                    />
                    <NumberField
                      label="Internal Rating"
                      value={internalRating}
                      onChange={setInternalRating}
                    />
                    <NumberField
                      label="Contest Rating"
                      value={contestRating}
                      onChange={setContestRating}
                    />
                  </div>
                </FormSection>

                <FormSection
                  icon={Clock}
                  title="Daily Commitment"
                  hint="How much time will you guarantee, every day?"
                >
                  <ChipGroup
                    options={COMMITMENTS.map((c) => `${c} mins`)}
                    value={`${commitment} mins`}
                    onChange={(v) =>
                      setCommitment(parseInt(v) as DailyCommitment)
                    }
                  />
                </FormSection>

                <FormSection
                  icon={Clock}
                  title="Preferred Time Slots (IST)"
                  hint="Pick 1–3 windows you'll defend daily."
                >
                  <div className="flex flex-wrap gap-2">
                    {TIME_SLOTS.map((s) => {
                      const active = slots.has(s)
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => toggleSlot(s)}
                          className={cn(
                            "border px-3 py-1.5 font-mono text-xs tabular-nums transition-colors",
                            active
                              ? "border-neon/70 bg-neon/15 text-neon shadow-[0_0_14px_rgba(0,240,255,0.25)]"
                              : "border-line/80 bg-panel/40 text-text-dim hover:border-neon/40 hover:text-text",
                          )}
                        >
                          {s}
                        </button>
                      )
                    })}
                  </div>
                </FormSection>

                <FormSection icon={Code2} title="Language">
                  <ChipGroup
                    options={LANGUAGES}
                    value={language}
                    onChange={(v) => setLanguage(v as Language)}
                  />
                </FormSection>

                <FormSection icon={Activity} title="Pace">
                  <ChipGroup
                    options={PACES}
                    value={pace}
                    onChange={(v) => setPace(v as Pace)}
                  />
                </FormSection>

                <FormSection icon={MessageSquare} title="Communication">
                  <ChipGroup
                    options={COMMS}
                    value={comm}
                    onChange={(v) => setComm(v as CommunicationStyle)}
                  />
                </FormSection>

                <FormSection
                  icon={ShieldAlert}
                  title="Accountability Style"
                  hint="How do you want your partner to push you?"
                >
                  <ChipGroup
                    options={ACCS}
                    value={acc}
                    onChange={(v) => setAcc(v as AccountabilityStyle)}
                  />
                </FormSection>

                <FormSection icon={Building2} title="Target Companies">
                  <input
                    type="text"
                    value={companies}
                    onChange={(e) => setCompanies(e.target.value)}
                    placeholder="e.g. Google, Stripe, Atlassian"
                    className="w-full border border-line bg-panel/60 px-3 py-2.5 font-mono text-sm text-text placeholder:text-text-mute focus:border-neon/60 focus:outline-none focus:ring-1 focus:ring-neon/40"
                  />
                </FormSection>

                <FormSection
                  icon={ShieldAlert}
                  title="No-Ghosting Rule"
                  hint="Auto-rematch after repeated misses."
                >
                  <button
                    type="button"
                    onClick={() => setNoGhosting((v) => !v)}
                    className={cn(
                      "flex w-full items-center justify-between border px-4 py-3 transition-colors",
                      noGhosting
                        ? "border-neon/60 bg-neon/5"
                        : "border-line bg-panel/40",
                    )}
                  >
                    <div className="text-left">
                      <div className="font-display text-[13px] font-bold tracking-tight text-text">
                        Auto-rematch after 3 misses
                      </div>
                      <div className="mt-0.5 text-xs text-text-dim">
                        We&apos;ll quietly suggest a new partner if discipline drops.
                      </div>
                    </div>
                    <span
                      className={cn(
                        "relative inline-flex h-6 w-11 items-center rounded-full border transition-colors",
                        noGhosting
                          ? "border-neon/60 bg-neon/30"
                          : "border-line bg-panel/60",
                      )}
                    >
                      <span
                        className={cn(
                          "inline-block h-4 w-4 rounded-full bg-text transition-transform",
                          noGhosting ? "translate-x-6" : "translate-x-1",
                        )}
                      />
                    </span>
                  </button>
                </FormSection>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <p className="text-xs text-text-mute max-w-md">
                    By submitting, you agree to the No-Ghosting Protocol and
                    weekly Selection Trial requirement.
                  </p>
                  <Link
                    href="/partner/matches"
                    className="bl-btn-primary px-5 py-3 text-sm bl-clip-notch"
                  >
                    Submit & Find Matches
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* ============== LIVE PREVIEW ============== */}
              <aside className="space-y-5 xl:sticky xl:top-24 xl:self-start">
                <GlassPanel className="p-5" corners>
                  <div className="flex items-center justify-between">
                    <div className="font-mono text-[10px] tracking-[0.3em] text-neon/80">
                      // CARD_PREVIEW
                    </div>
                    <span className="font-display text-[10px] font-bold tracking-[0.2em] text-text-mute">
                      LIVE
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-lg font-bold tracking-tight">
                    Your Training Card
                  </h3>

                  <dl className="mt-4 divide-y divide-line/60">
                    <PreviewRow label="Goal" value={goal} />
                    <PreviewRow label="Focus" value={focus} />
                    <PreviewRow
                      label="Level"
                      value={`${solved} solved · ${internalRating} IR`}
                    />
                    <PreviewRow
                      label="Daily"
                      value={`${commitment} min/day`}
                    />
                    <PreviewRow
                      label="Slots"
                      value={
                        slots.size
                          ? Array.from(slots).slice(0, 2).join(" · ") +
                            (slots.size > 2 ? ` +${slots.size - 2}` : "")
                          : "—"
                      }
                    />
                    <PreviewRow label="Language" value={language} />
                    <PreviewRow label="Pace" value={pace} />
                    <PreviewRow label="Comms" value={comm} />
                    <PreviewRow label="Style" value={acc} />
                    <PreviewRow
                      label="Targets"
                      value={
                        companies.trim() ? companies.split(",")[0]?.trim() + (companies.split(",").length > 1 ? ` +${companies.split(",").length - 1}` : "") : "—"
                      }
                    />
                  </dl>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {noGhosting && <Chip size="sm">NO-GHOSTING</Chip>}
                    <Chip size="sm" accent="ember">
                      WEEKLY TRIAL
                    </Chip>
                    <Chip size="sm">7-DAY LOCK</Chip>
                  </div>
                </GlassPanel>

                <GlassPanel className="p-5">
                  <div className="font-mono text-[10px] tracking-[0.3em] text-text-mute uppercase">
                    // RULE_OF_THUMB
                  </div>
                  <p className="mt-3 text-sm text-text-dim leading-relaxed">
                    The fields you skip are the cracks a partner falls through.
                    Fill them all. This card defines how seriously you train.
                  </p>
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

function FormSection({
  icon: Icon,
  title,
  hint,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <GlassPanel className="p-5 bl-side-stripe">
      <div className="flex items-start gap-3">
        <span className="inline-flex h-8 w-8 items-center justify-center border border-neon/40 bg-panel/60 shrink-0">
          <Icon className="h-4 w-4 text-neon" />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-[15px] font-bold tracking-tight text-text">
            {title}
          </h3>
          {hint && (
            <p className="mt-0.5 text-xs text-text-dim">{hint}</p>
          )}
          <div className="mt-3">{children}</div>
        </div>
      </div>
    </GlassPanel>
  )
}

function ChipGroup({
  options,
  value,
  onChange,
}: {
  options: readonly string[]
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const active = value === o
        return (
          <button
            key={o}
            type="button"
            onClick={() => onChange(o)}
            className={cn(
              "border px-3 py-1.5 font-display text-xs font-semibold tracking-[0.12em] uppercase transition-colors",
              active
                ? "border-neon/70 bg-neon/15 text-neon shadow-[0_0_14px_rgba(0,240,255,0.25)]"
                : "border-line/80 bg-panel/40 text-text-dim hover:border-neon/40 hover:text-text",
            )}
          >
            {o}
          </button>
        )
      })}
    </div>
  )
}

function NumberField({
  label,
  value,
  onChange,
}: {
  label: string
  value: number
  onChange: (v: number) => void
}) {
  return (
    <label className="block">
      <span className="font-display text-[10px] font-bold tracking-[0.22em] text-text-mute">
        {label}
      </span>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
        className="mt-1 w-full border border-line bg-panel/60 px-3 py-2.5 font-mono text-sm tabular-nums text-text focus:border-neon/60 focus:outline-none focus:ring-1 focus:ring-neon/40"
      />
    </label>
  )
}

function PreviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="font-display text-[10px] font-bold tracking-[0.22em] text-text-mute">
        {label}
      </span>
      <span className="font-mono text-xs text-text text-right max-w-[60%] truncate">
        {value}
      </span>
    </div>
  )
}
