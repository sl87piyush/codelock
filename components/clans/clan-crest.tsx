import { cn } from "@/lib/utils"
import type { ClanCrest } from "./clan-data"

const SIZE: Record<"sm" | "md" | "lg" | "xl", string> = {
  sm: "h-9 w-9 text-[11px]",
  md: "h-12 w-12 text-sm",
  lg: "h-16 w-16 text-base",
  xl: "h-24 w-24 text-2xl",
}

const RING: Record<NonNullable<ClanCrest["ring"]>, string> = {
  neon: "ring-neon/60 shadow-[0_0_22px_rgba(0,240,255,0.35)]",
  electric: "ring-electric/60 shadow-[0_0_22px_rgba(0,102,255,0.35)]",
  ember: "ring-ember/60 shadow-[0_0_22px_rgba(255,107,26,0.35)]",
  blood: "ring-blood/60 shadow-[0_0_22px_rgba(255,51,85,0.35)]",
  gold: "ring-gold/60 shadow-[0_0_22px_rgba(251,191,36,0.35)]",
}

export function ClanCrestBadge({
  crest,
  size = "md",
  className,
  bare = false,
}: {
  crest: ClanCrest
  size?: keyof typeof SIZE
  className?: string
  bare?: boolean
}) {
  return (
    <div
      className={cn(
        "relative shrink-0 flex items-center justify-center font-display font-extrabold text-void uppercase",
        "bl-clip-notch bg-gradient-to-br ring-1",
        SIZE[size],
        crest.from,
        crest.via,
        crest.to,
        bare ? "ring-white/20" : crest.ring ? RING[crest.ring] : "ring-white/20",
        className,
      )}
      aria-hidden
    >
      <span className="absolute inset-0 bl-stripes opacity-30 mix-blend-overlay" />
      <span className="relative">{crest.monogram}</span>
    </div>
  )
}
