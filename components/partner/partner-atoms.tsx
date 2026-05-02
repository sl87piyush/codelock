import { cn } from "@/lib/utils"
import type { ReliabilityTier, UserProfile } from "./partner-data"
import { getReliabilityMeta } from "./partner-data"

// ---------------------------------------------------------------------
// Avatar — deterministic gradient based on user.avatarHue
// ---------------------------------------------------------------------
export function PartnerAvatar({
  user,
  size = 44,
  className,
}: {
  user: UserProfile
  size?: number
  className?: string
}) {
  const h = user.avatarHue
  const a = `hsl(${h} 90% 65%)`
  const b = `hsl(${(h + 35) % 360} 90% 45%)`
  return (
    <span
      className={cn(
        "relative inline-flex items-center justify-center font-display font-bold text-void shrink-0",
        className,
      )}
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, ${a}, ${b})`,
        fontSize: size * 0.36,
        clipPath:
          "polygon(10% 0, 100% 0, 100% 90%, 90% 100%, 0 100%, 0 10%)",
      }}
    >
      {user.initials}
      <span
        aria-hidden
        className="absolute inset-0 -z-10 blur-md opacity-60"
        style={{ background: `radial-gradient(circle, ${a}, transparent 70%)` }}
      />
    </span>
  )
}

// ---------------------------------------------------------------------
// Reliability Badge
// ---------------------------------------------------------------------
export function ReliabilityBadge({
  tier,
  score,
  compact = false,
}: {
  tier: ReliabilityTier
  score?: number
  compact?: boolean
}) {
  const meta = getReliabilityMeta(tier)
  const colorClass =
    meta.color === "neon"
      ? "border-neon/60 text-neon bg-neon/10 shadow-[0_0_18px_rgba(0,240,255,0.25)]"
      : meta.color === "neon-soft"
        ? "border-neon-soft/50 text-neon-soft bg-neon-soft/10"
        : meta.color === "ember"
          ? "border-ember/50 text-ember bg-ember/10"
          : "border-blood/60 text-blood bg-blood/10"

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border px-2 py-0.5 font-display text-[10px] font-bold tracking-[0.2em] bl-clip-chevron",
        colorClass,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {meta.label}
      {!compact && score !== undefined && (
        <span className="font-mono text-[10px] tabular-nums opacity-80">
          {score}
        </span>
      )}
    </span>
  )
}

// ---------------------------------------------------------------------
// Section Header
// ---------------------------------------------------------------------
export function SectionHeader({
  kicker,
  title,
  desc,
  right,
}: {
  kicker?: string
  title: string
  desc?: string
  right?: React.ReactNode
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        {kicker && (
          <div className="font-mono text-[10px] tracking-[0.3em] text-neon/70 uppercase">
            {kicker}
          </div>
        )}
        <h2 className="mt-1 font-display text-xl sm:text-2xl font-bold tracking-tight text-text">
          {title}
        </h2>
        {desc && (
          <p className="mt-1.5 max-w-2xl text-sm text-text-dim leading-relaxed">
            {desc}
          </p>
        )}
      </div>
      {right}
    </div>
  )
}

// ---------------------------------------------------------------------
// Glass Panel
// ---------------------------------------------------------------------
export function GlassPanel({
  className,
  children,
  notch = false,
  corners = false,
}: {
  className?: string
  children: React.ReactNode
  notch?: boolean
  corners?: boolean
}) {
  return (
    <div
      className={cn(
        "relative bl-glass",
        notch && "bl-clip-notch",
        corners && "bl-corners",
        className,
      )}
    >
      {children}
    </div>
  )
}

// ---------------------------------------------------------------------
// Stat Tile
// ---------------------------------------------------------------------
export function StatTile({
  label,
  value,
  sub,
  accent = "neon",
}: {
  label: string
  value: string | number
  sub?: string
  accent?: "neon" | "ember" | "gold"
}) {
  const accentClass =
    accent === "ember"
      ? "text-ember"
      : accent === "gold"
        ? "text-gold"
        : "text-neon"
  return (
    <div className="bl-glass relative p-4 bl-side-stripe">
      <div className="font-display text-[10px] font-bold tracking-[0.22em] text-text-mute">
        {label}
      </div>
      <div
        className={cn(
          "mt-2 font-display text-2xl font-bold tabular-nums",
          accentClass,
        )}
      >
        {value}
      </div>
      {sub && (
        <div className="mt-1 font-mono text-[10px] text-text-dim tracking-wider">
          {sub}
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------
// Score Bar
// ---------------------------------------------------------------------
export function ScoreBar({
  label,
  value,
  max = 100,
  accent = "neon",
}: {
  label: string
  value: number
  max?: number
  accent?: "neon" | "ember" | "gold" | "blood"
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100))
  const fillClass =
    accent === "ember"
      ? "bg-ember shadow-[0_0_14px_rgba(255,107,26,0.55)]"
      : accent === "gold"
        ? "bg-gold shadow-[0_0_14px_rgba(251,191,36,0.55)]"
        : accent === "blood"
          ? "bg-blood shadow-[0_0_14px_rgba(255,51,85,0.55)]"
          : "bg-neon shadow-[0_0_14px_rgba(0,240,255,0.55)]"
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="font-display text-[11px] font-semibold tracking-[0.18em] text-text-dim uppercase">
          {label}
        </span>
        <span className="font-mono text-xs tabular-nums text-text">
          {value}
          <span className="text-text-mute">/{max}</span>
        </span>
      </div>
      <div className="mt-1.5 h-1.5 w-full bl-bar-track">
        <div
          className={cn("h-full transition-all", fillClass)}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------
// Chip
// ---------------------------------------------------------------------
export function Chip({
  children,
  active = false,
  accent = "neon",
  size = "md",
}: {
  children: React.ReactNode
  active?: boolean
  accent?: "neon" | "ember" | "muted"
  size?: "sm" | "md"
}) {
  const base =
    "inline-flex items-center gap-1.5 border font-display font-semibold tracking-[0.12em] uppercase transition-colors"
  const sizes = size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-[11px]"
  const tone =
    accent === "ember"
      ? active
        ? "border-ember/60 bg-ember/15 text-ember"
        : "border-ember/30 bg-ember/5 text-ember/85"
      : accent === "muted"
        ? "border-line bg-panel/60 text-text-dim"
        : active
          ? "border-neon/60 bg-neon/15 text-neon"
          : "border-neon/25 bg-neon/5 text-neon/90"
  return <span className={cn(base, sizes, tone)}>{children}</span>
}
