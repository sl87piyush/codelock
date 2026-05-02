import type { ReactNode } from "react"

/**
 * Full-screen cinematic shell for the onboarding flow. No sidebar, no top
 * bar — just void, ambient lights and content.
 */
export default function OnboardingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-void text-text">
      {/* Ambient grid */}
      <div className="pointer-events-none fixed inset-0 bl-grid opacity-30" />
      {/* Top + bottom blue glow */}
      <div className="pointer-events-none fixed -top-40 left-1/2 -translate-x-1/2 h-[460px] w-[1200px] bg-electric/15 blur-3xl rounded-full" />
      <div className="pointer-events-none fixed -bottom-40 right-0 h-[400px] w-[600px] bg-neon/10 blur-3xl rounded-full" />
      <div className="pointer-events-none fixed -bottom-40 left-0 h-[360px] w-[520px] bg-ember/10 blur-3xl rounded-full" />

      {/* Scanlines */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent 0 2px, rgba(255,255,255,0.6) 2px 3px)",
        }}
      />

      {/* Corner brackets */}
      <span aria-hidden className="pointer-events-none fixed top-4 left-4 h-5 w-5 border-t border-l border-neon/50" />
      <span aria-hidden className="pointer-events-none fixed top-4 right-4 h-5 w-5 border-t border-r border-neon/50" />
      <span aria-hidden className="pointer-events-none fixed bottom-4 left-4 h-5 w-5 border-b border-l border-neon/50" />
      <span aria-hidden className="pointer-events-none fixed bottom-4 right-4 h-5 w-5 border-b border-r border-neon/50" />

      {/* Top status bar */}
      <header className="relative z-10 flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center border border-neon/70 bg-void bl-clip-notch">
            <span className="font-display text-[11px] font-bold text-neon">CT</span>
          </span>
          <div className="font-display text-[12px] font-bold tracking-[0.28em] text-text">
            CODE<span className="text-neon">TRACK</span>X
          </div>
          <span className="ml-2 inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.22em] text-neon/80">
            <span className="h-1 w-1 rounded-full bg-neon bl-flicker shadow-[0_0_8px_#00f0ff]" />
            ONBOARDING PROTOCOL
          </span>
        </div>
        <span className="font-mono text-[10px] tracking-[0.22em] text-text-mute">
          SECURE / ENCRYPTED
        </span>
      </header>

      <main className="relative z-10">{children}</main>
    </div>
  )
}
