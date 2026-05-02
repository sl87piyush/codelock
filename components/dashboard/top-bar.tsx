import { Bell, ChevronDown, Flame } from "lucide-react"

type TopBarProps = {
  title?: string
  sector?: string
}

export function TopBar({ title = "Dashboard", sector = "001_DASHBOARD" }: TopBarProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-line/60 bg-void/70 backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-neon/50 to-transparent" />

      <div className="flex items-center gap-4 px-6 lg:px-8 h-[68px]">
        {/* Page title */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-[10px] font-bold tracking-[0.3em] text-text-mute">
                SECTOR
              </span>
              <span className="font-mono text-[10px] text-neon/70">
                {`// ${sector}`}
              </span>
            </div>
            <h1 className="font-display text-2xl font-bold tracking-tight leading-none">
              {title}
            </h1>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-3">
          {/* Streak tag */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 border border-ember/30 bg-ember/5">
            <Flame className="h-4 w-4 text-ember" />
            <span className="font-display text-[13px] font-bold text-ember tabular-nums">
              0
            </span>
            <span className="font-display text-[10px] font-semibold tracking-[0.2em] text-ember/80">
              STREAK
            </span>
          </div>

          {/* Notifications */}
          <button className="relative flex h-10 w-10 items-center justify-center border border-line bg-panel/60 hover:border-neon/60 hover:bg-neon/5 transition-colors">
            <Bell className="h-[18px] w-[18px] text-text-dim" />
            <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-blood px-1 font-display text-[10px] font-bold text-white shadow-[0_0_12px_rgba(255,51,85,0.6)]">
              4
            </span>
          </button>

          {/* User chip */}
          <button className="group flex items-center gap-2.5 pr-2 pl-1.5 py-1 border border-line bg-panel/60 hover:border-neon/50 transition-colors">
            <span className="relative flex h-8 w-8 items-center justify-center bg-gradient-to-br from-neon to-electric font-display text-sm font-bold text-void">
              t
              <span className="absolute inset-0 blur-md bg-neon/40 -z-10" />
            </span>
            <div className="hidden sm:flex flex-col items-start leading-tight">
              <span className="font-display text-[13px] font-semibold text-text">
                tonystark
              </span>
              <span className="font-display text-[9px] font-bold tracking-[0.22em] text-ember">
                BRONZE
              </span>
            </div>
            <ChevronDown className="h-4 w-4 text-text-dim group-hover:text-neon transition-colors" />
          </button>
        </div>
      </div>
    </header>
  )
}
