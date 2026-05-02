import { cn } from "@/lib/utils"

type AvatarTone = "neon" | "ember" | "gold" | "electric" | "blood"

const TONE_CLASSES: Record<AvatarTone, { bg: string; text: string; ring: string; glow: string }> = {
  neon: {
    bg: "bg-gradient-to-br from-neon to-electric",
    text: "text-void",
    ring: "ring-neon/40",
    glow: "bg-neon/40",
  },
  ember: {
    bg: "bg-gradient-to-br from-ember to-gold",
    text: "text-void",
    ring: "ring-ember/40",
    glow: "bg-ember/40",
  },
  gold: {
    bg: "bg-gradient-to-br from-gold to-ember",
    text: "text-void",
    ring: "ring-gold/40",
    glow: "bg-gold/40",
  },
  electric: {
    bg: "bg-gradient-to-br from-electric to-neon",
    text: "text-void",
    ring: "ring-electric/40",
    glow: "bg-electric/40",
  },
  blood: {
    bg: "bg-gradient-to-br from-blood to-ember",
    text: "text-text",
    ring: "ring-blood/40",
    glow: "bg-blood/40",
  },
}

const SIZE_CLASSES: Record<"sm" | "md" | "lg", string> = {
  sm: "h-7 w-7 text-[12px]",
  md: "h-9 w-9 text-[13px]",
  lg: "h-11 w-11 text-[15px]",
}

export function DoubtAvatar({
  initial,
  tone = "neon",
  size = "md",
  className,
}: {
  initial: string
  tone?: AvatarTone
  size?: "sm" | "md" | "lg"
  className?: string
}) {
  const t = TONE_CLASSES[tone]
  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center font-display font-bold ring-1",
        t.bg,
        t.text,
        t.ring,
        SIZE_CLASSES[size],
        className,
      )}
    >
      <span aria-hidden className={cn("absolute inset-0 -z-10 blur-md opacity-60", t.glow)} />
      {initial}
    </span>
  )
}
