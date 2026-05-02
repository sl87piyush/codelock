import { Zap, Flame, Trophy, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

type Stat = {
  label: string
  value: string
  sub: string
  icon: React.ComponentType<{ className?: string }>
  accent: "neon" | "ember" | "gold" | "electric"
}

const stats: Stat[] = [
  {
    label: "TOTAL XP",
    value: "310",
    sub: "190 to Level 2",
    icon: Zap,
    accent: "neon",
  },
  {
    label: "STREAK",
    value: "0",
    sub: "Complete a challenge to ignite",
    icon: Flame,
    accent: "ember",
  },
  {
    label: "LEVEL",
    value: "01",
    sub: "Keep solving to rank up",
    icon: Trophy,
    accent: "gold",
  },
  {
    label: "DIVISION",
    value: "BRONZE",
    sub: "Climb with consistent kills",
    icon: TrendingUp,
    accent: "electric",
  },
]

const accentMap: Record<Stat["accent"], { text: string; border: string; glow: string; bar: string; icon: string }> = {
  neon: {
    text: "text-neon",
    border: "border-neon/40",
    glow: "shadow-[0_0_30px_-5px_rgba(0,240,255,0.5)]",
    bar: "from-neon to-electric",
    icon: "text-neon",
  },
  ember: {
    text: "text-ember",
    border: "border-ember/40",
    glow: "shadow-[0_0_30px_-5px_rgba(255,107,26,0.45)]",
    bar: "from-ember to-ember-soft",
    icon: "text-ember",
  },
  gold: {
    text: "text-gold",
    border: "border-gold/40",
    glow: "shadow-[0_0_30px_-5px_rgba(251,191,36,0.45)]",
    bar: "from-gold to-ember",
    icon: "text-gold",
  },
  electric: {
    text: "text-neon-soft",
    border: "border-electric/50",
    glow: "shadow-[0_0_30px_-5px_rgba(14,165,233,0.55)]",
    bar: "from-electric to-blue-mid",
    icon: "text-electric",
  },
}

export function StatsRow() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s, i) => (
        <StatCard key={s.label} stat={s} index={i} />
      ))}
    </div>
  )
}

function StatCard({ stat, index }: { stat: Stat; index: number }) {
  const a = accentMap[stat.accent]
  const Icon = stat.icon
  const isBronze = stat.label === "DIVISION"

  return (
    <div
      className={cn(
        "group relative bl-glass bl-corners p-5 overflow-hidden transition-all duration-300 hover:-translate-y-0.5",
        a.glow,
      )}
    >
      {/* Scanline on hover */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bl-scan" />

      {/* Mini ID */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className={cn("h-4 w-4", a.icon)} />
          <span className={cn("font-display text-[10px] font-bold tracking-[0.28em]", a.text)}>
            {stat.label}
          </span>
        </div>
        <span className="font-mono text-[10px] text-text-mute">
          0{index + 1}
        </span>
      </div>

      {/* Value */}
      <div className="mt-4 flex items-baseline gap-2">
        <span
          className={cn(
            "font-display font-bold leading-none tabular-nums",
            isBronze ? "text-[28px] tracking-tight" : "text-[52px] tracking-tighter",
            a.text,
            stat.accent === "neon" && "text-glow",
            stat.accent === "ember" && "text-glow-ember",
          )}
        >
          {stat.value}
        </span>
      </div>

      {/* Sub */}
      <p className="mt-2 text-[12px] text-text-dim leading-snug">
        {stat.sub}
      </p>

      {/* Accent bar */}
      <div className="mt-4 flex items-center gap-2">
        <div className={cn("h-[3px] flex-1 bg-gradient-to-r", a.bar)} />
        <div className={cn("h-[3px] w-6 bg-gradient-to-r opacity-60", a.bar)} />
        <div className={cn("h-[3px] w-2 bg-gradient-to-r opacity-30", a.bar)} />
      </div>
    </div>
  )
}
