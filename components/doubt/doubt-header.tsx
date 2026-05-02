import { HelpCircle, CheckCircle2, Coins, TrendingUp } from "lucide-react"
import { YOUR_DOUBT_STATS } from "./doubt-data"

const STATS = [
  {
    label: "OPEN DOUBTS",
    value: "428",
    sub: "across all topics",
    icon: HelpCircle,
    accent: "neon" as const,
  },
  {
    label: "RESOLVED THIS WEEK",
    value: "1,206",
    sub: "94% acceptance rate",
    icon: CheckCircle2,
    accent: "gold" as const,
  },
  {
    label: "ACTIVE BOUNTIES",
    value: "37",
    sub: "earn LP by helping",
    icon: Coins,
    accent: "ember" as const,
  },
  {
    label: "YOUR REPUTATION",
    value: YOUR_DOUBT_STATS.reputation.toLocaleString(),
    sub: `${YOUR_DOUBT_STATS.resolved} of ${YOUR_DOUBT_STATS.asked} asked resolved`,
    icon: TrendingUp,
    accent: "electric" as const,
  },
] as const

const ACCENT_MAP = {
  neon: { text: "text-neon", bar: "bg-neon", glow: "bg-neon/20" },
  gold: { text: "text-gold", bar: "bg-gold", glow: "bg-gold/20" },
  ember: { text: "text-ember", bar: "bg-ember", glow: "bg-ember/20" },
  electric: { text: "text-electric", bar: "bg-electric", glow: "bg-electric/20" },
}

export function DoubtHeader() {
  return (
    <section className="relative overflow-hidden border border-line/60 bg-panel/40 bl-glass">
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-30" />
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-neon/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-12 h-72 w-72 rounded-full bg-ember/10 blur-3xl" />
      <div className="bl-side-stripe" data-side="left" />

      <div className="relative px-5 py-6 lg:px-8 lg:py-8">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-neon bl-flicker shadow-[0_0_8px_#00f0ff]" />
            <span className="font-mono text-[10px] tracking-[0.28em] text-neon/80">
              {"// DOUBT_PROTOCOL · LIVE"}
            </span>
          </div>

          <h1 className="font-display text-3xl font-bold tracking-tight leading-tight text-text md:text-4xl lg:text-[44px]">
            Ask. Answer. <span className="text-neon text-glow">Conquer.</span>
          </h1>
          <p className="max-w-[68ch] text-pretty text-[14px] leading-relaxed text-text-dim">
            Drop a doubt and the arena hunts the answer. Help others to climb the helper
            ranks and earn reputation that compounds across every season.
          </p>
        </div>

        {/* Stats grid */}
        <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {STATS.map((s) => {
            const Icon = s.icon
            const a = ACCENT_MAP[s.accent]
            return (
              <div
                key={s.label}
                className="relative overflow-hidden border border-line/60 bg-void/50 p-4 bl-corners"
              >
                <div className={`pointer-events-none absolute inset-x-0 top-0 h-px ${a.bar}`} />
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-col">
                    <span className="font-display text-[10px] font-bold tracking-[0.22em] text-text-mute">
                      {s.label}
                    </span>
                    <span
                      className={`mt-2 font-display text-3xl font-bold leading-none tabular-nums ${a.text}`}
                    >
                      {s.value}
                    </span>
                    <span className="mt-2 font-mono text-[10px] text-text-dim">{s.sub}</span>
                  </div>
                  <div className={`relative flex h-9 w-9 items-center justify-center border border-line/70 bg-panel/60`}>
                    <span className={`absolute inset-0 -z-10 blur-md ${a.glow}`} />
                    <Icon className={`h-4 w-4 ${a.text}`} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
