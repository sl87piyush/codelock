import { Sparkles } from "lucide-react"

export function WelcomeHero() {
  return (
    <section className="relative overflow-hidden">
      {/* Ambient orbs */}
      <div className="pointer-events-none absolute -top-24 -left-10 h-72 w-72 rounded-full bg-electric/20 blur-3xl bl-float-slow" />
      <div className="pointer-events-none absolute -top-16 right-0 h-64 w-64 rounded-full bg-neon/10 blur-3xl bl-float-slower" />

      <div className="relative flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] text-neon/70 tracking-wider">
            [ EGOIST PROTOCOL ACTIVE ]
          </span>
          <span className="h-px flex-1 bg-gradient-to-r from-neon/40 via-neon/10 to-transparent" />
        </div>

        <div className="flex flex-wrap items-end gap-4">
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight leading-[1.05] text-text text-balance">
            Welcome to the arena,{" "}
            <span className="relative inline-block text-neon text-glow bl-glitch">
              tonystark
              <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-neon to-transparent" />
            </span>
          </h2>

          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-neon/50 bg-neon/10 text-neon">
            <Sparkles className="h-3.5 w-3.5" />
            <span className="font-display text-[11px] font-bold tracking-[0.2em]">
              EARLY ADOPTER
            </span>
          </span>
        </div>

        <p className="max-w-2xl text-[14px] text-text-dim leading-relaxed">
          You&apos;re among the first warriors. Build your foundation and rise.
          Every challenge is another kill. Only the Egoists make it to the top.
        </p>
      </div>
    </section>
  )
}
