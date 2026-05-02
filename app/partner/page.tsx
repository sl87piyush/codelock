import Link from "next/link"
import { Sidebar } from "@/components/dashboard/sidebar"
import { TopBar } from "@/components/dashboard/top-bar"
import {
  ArrowRight,
  ScrollText,
  Users,
  ShieldCheck,
  Lock,
  Target,
  CalendarClock,
  TrendingUp,
} from "lucide-react"
import {
  GlassPanel,
  SectionHeader,
  StatTile,
  Chip,
} from "@/components/partner/partner-atoms"

export default function PartnerLandingPage() {
  return (
    <div className="flex min-h-screen w-full bg-void text-text">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar title="Lock-In Partner" sector="012_LOCK_IN_PROGRAM" />

        <main className="relative flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {/* Ambient lights */}
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
            <div className="absolute -top-40 left-1/3 h-[500px] w-[900px] -translate-x-1/2 bg-electric/10 blur-3xl rounded-full bl-float-slow" />
            <div className="absolute top-40 right-0 h-[400px] w-[400px] bg-neon/5 blur-3xl rounded-full bl-float-slower" />
          </div>

          <div className="relative mx-auto max-w-[1280px] space-y-10">
            {/* ============== HERO ============== */}
            <section className="relative">
              <GlassPanel className="overflow-hidden p-6 sm:p-10 lg:p-14" notch corners>
                <div className="pointer-events-none absolute inset-0 bl-grid opacity-30" />
                <div className="pointer-events-none absolute inset-0 bl-scanline opacity-40" />

                <div className="relative grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
                  <div>
                    <div className="inline-flex items-center gap-2 border border-neon/40 bg-neon/5 px-3 py-1 bl-clip-chevron">
                      <span className="h-1.5 w-1.5 rounded-full bg-neon bl-flicker shadow-[0_0_10px_#00f0ff]" />
                      <span className="font-display text-[10px] font-bold tracking-[0.28em] text-neon">
                        SELECTION PROGRAM // ACTIVE
                      </span>
                    </div>

                    <h1 className="mt-5 font-display text-4xl sm:text-5xl lg:text-[56px] font-bold leading-[1.05] tracking-tight text-balance">
                      Find a serious partner.{" "}
                      <span className="text-neon text-glow">Lock in for 7 days.</span>
                    </h1>

                    <p className="mt-5 max-w-xl text-base sm:text-lg text-text-dim leading-relaxed text-pretty">
                      Structured training. Accountability. Weekly trials. This
                      isn&apos;t a chat room — it&apos;s a contract. Match by discipline,
                      not popularity.
                    </p>

                    <div className="mt-7 flex flex-wrap items-center gap-3">
                      <Link
                        href="/partner/training-card"
                        className="bl-btn-primary px-5 py-3 text-sm bl-clip-notch"
                      >
                        <ScrollText className="h-4 w-4" />
                        Create Training Card
                      </Link>
                      <Link
                        href="/partner/matches"
                        className="bl-btn-ghost bl-clip-notch"
                      >
                        Browse Matches
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-2">
                      <Chip>NO RANDOM DMs</Chip>
                      <Chip>NO PUBLIC POSTS</Chip>
                      <Chip accent="ember">7-DAY CONTRACT</Chip>
                      <Chip accent="ember">WEEKLY TRIAL</Chip>
                    </div>
                  </div>

                  {/* HUD card */}
                  <div className="relative">
                    <div className="absolute -inset-4 bg-neon/5 blur-2xl rounded-full" />
                    <div className="relative bl-glass-strong bl-clip-notch p-5">
                      <div className="flex items-center justify-between">
                        <div className="font-mono text-[10px] tracking-[0.3em] text-neon/80">
                          // SELECTION_PROTOCOL
                        </div>
                        <span className="font-display text-[10px] font-bold tracking-[0.2em] text-text-mute">
                          v0.1
                        </span>
                      </div>

                      <div className="mt-4 space-y-3">
                        <ProtocolRow n="01" label="Match" value="Compatibility ≥ 75%" />
                        <ProtocolRow n="02" label="Sign" value="7-Day Lock-In Contract" />
                        <ProtocolRow n="03" label="Train" value="1 New + 1 Revision daily" />
                        <ProtocolRow n="04" label="Trial" value="Sunday 8 PM IST" />
                        <ProtocolRow n="05" label="Report" value="Auto-generated" />
                      </div>

                      <div className="mt-5 grid grid-cols-3 gap-2">
                        <Stamp label="Active" value="218" />
                        <Stamp label="Qualified" value="71%" />
                        <Stamp label="Avg Rel." value="84" />
                      </div>
                    </div>
                  </div>
                </div>
              </GlassPanel>
            </section>

            {/* ============== STATS BAND ============== */}
            <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <StatTile label="ACTIVE DUOS" value="218" sub="Across 6 cohorts" />
              <StatTile label="WEEKLY TRIALS" value="146" accent="ember" sub="This Sunday" />
              <StatTile label="QUALIFIED RATE" value="71%" sub="Last 30 days" />
              <StatTile label="GHOST RATE" value="3.2%" accent="ember" sub="Auto-rematch active" />
            </section>

            {/* ============== HOW IT WORKS ============== */}
            <section className="space-y-5">
              <SectionHeader
                kicker="// HOW_IT_WORKS"
                title="A serious training contract — in three steps."
                desc="Designed for DSA and System Design candidates who want discipline, not distractions."
              />

              <div className="grid gap-4 md:grid-cols-3">
                <StepCard
                  n="01"
                  title="Create Training Card"
                  desc="Define your goal, level, daily commitment, time slots, language, pace, and accountability style. This card defines how seriously you train."
                  icon={ScrollText}
                  href="/partner/training-card"
                  cta="Build my card"
                />
                <StepCard
                  n="02"
                  title="Match with a partner"
                  desc="See top compatibility matches. Reliability badge, shared time windows, same target companies. Discipline first — popularity last."
                  icon={Users}
                  href="/partner/matches"
                  cta="Browse matches"
                  accent="ember"
                />
                <StepCard
                  n="03"
                  title="Lock-In Contract"
                  desc="Sign a 7-day contract. Daily missions, one Selection Trial. Discipline Score, Chemistry Score, Clutch Score — all measured."
                  icon={Lock}
                  href="/partner/contract/u_anya"
                  cta="See contract"
                />
              </div>
            </section>

            {/* ============== PRINCIPLES ============== */}
            <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Principle
                icon={ShieldCheck}
                title="Reliability over reach"
                body="Matching is based on discipline, not popularity. A 92 reliability score beats 500 followers."
              />
              <Principle
                icon={Target}
                title="Measurable progress"
                body="Discipline, Chemistry, Clutch. Three numbers. They move only when you train."
              />
              <Principle
                icon={CalendarClock}
                title="Weekly Selection Trial"
                body="A timed test every Sunday. Pass it, and you keep your spot in the program."
              />
              <Principle
                icon={TrendingUp}
                title="No-ghosting protocol"
                body="Miss 3 days → Recovery Mode. Miss 5 days → auto-rematch. Soft consequences, zero toxicity."
              />
            </section>

            {/* ============== CTA STRIP ============== */}
            <section>
              <div className="bl-glass-strong bl-clip-notch relative overflow-hidden p-8 sm:p-10">
                <div className="pointer-events-none absolute inset-0 bl-stripes opacity-50" />
                <div className="relative flex flex-wrap items-center justify-between gap-6">
                  <div>
                    <div className="font-mono text-[10px] tracking-[0.3em] text-ember/80 uppercase">
                      // ENTRY_GATE
                    </div>
                    <h3 className="mt-1 font-display text-2xl sm:text-3xl font-bold tracking-tight text-balance">
                      If you enter this program,{" "}
                      <span className="text-ember text-glow-ember">
                        you are here to train.
                      </span>
                    </h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <Link
                      href="/partner/training-card"
                      className="bl-btn-primary px-5 py-3 text-sm bl-clip-notch"
                    >
                      Create Training Card
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------

function ProtocolRow({ n, label, value }: { n: string; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 border border-line/60 bg-panel/40 px-3 py-2.5">
      <span className="font-mono text-[10px] tracking-widest text-neon/70 w-6">
        {n}
      </span>
      <span className="font-display text-[12px] font-bold tracking-[0.18em] uppercase text-text">
        {label}
      </span>
      <span className="ml-auto font-mono text-[11px] text-text-dim tabular-nums">
        {value}
      </span>
    </div>
  )
}

function Stamp({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-neon/20 bg-neon/5 px-2 py-2 text-center">
      <div className="font-display text-base font-bold text-neon tabular-nums">
        {value}
      </div>
      <div className="mt-0.5 font-display text-[9px] font-bold tracking-[0.22em] text-text-mute">
        {label}
      </div>
    </div>
  )
}

function StepCard({
  n,
  title,
  desc,
  icon: Icon,
  href,
  cta,
  accent = "neon",
}: {
  n: string
  title: string
  desc: string
  icon: React.ComponentType<{ className?: string }>
  href: string
  cta: string
  accent?: "neon" | "ember"
}) {
  const accentBorder = accent === "ember" ? "border-ember/40" : "border-neon/40"
  const accentText = accent === "ember" ? "text-ember" : "text-neon"
  return (
    <div className="group relative bl-glass bl-clip-notch p-6 bl-side-stripe transition-transform hover:-translate-y-0.5">
      <div className="flex items-start justify-between">
        <span
          className={`inline-flex h-10 w-10 items-center justify-center border ${accentBorder} bg-panel/60`}
        >
          <Icon className={`h-5 w-5 ${accentText}`} />
        </span>
        <span className="font-mono text-xs tracking-[0.3em] text-text-mute">
          STEP {n}
        </span>
      </div>
      <h3 className="mt-5 font-display text-lg font-bold tracking-tight text-text">
        {title}
      </h3>
      <p className="mt-2 text-sm text-text-dim leading-relaxed">{desc}</p>
      <Link
        href={href}
        className={`mt-5 inline-flex items-center gap-1.5 font-display text-[12px] font-bold tracking-[0.18em] ${accentText} hover:opacity-80`}
      >
        {cta}
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  )
}

function Principle({
  icon: Icon,
  title,
  body,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  body: string
}) {
  return (
    <div className="bl-glass p-5">
      <Icon className="h-5 w-5 text-neon" />
      <h4 className="mt-4 font-display text-[15px] font-bold tracking-tight text-text">
        {title}
      </h4>
      <p className="mt-1.5 text-[13px] text-text-dim leading-relaxed">{body}</p>
    </div>
  )
}
