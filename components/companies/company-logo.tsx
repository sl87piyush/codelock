import { cn } from "@/lib/utils"
import type { Company } from "./companies-data"

type Size = "sm" | "md" | "lg"

const SIZE_MAP: Record<Size, { box: string; text: string; halo: string }> = {
  sm: { box: "h-8 w-8", text: "text-[12px]", halo: "blur-md" },
  md: { box: "h-12 w-12", text: "text-[16px]", halo: "blur-lg" },
  lg: { box: "h-16 w-16", text: "text-[22px]", halo: "blur-xl" },
}

export function CompanyLogo({
  company,
  size = "md",
  className,
}: {
  company: Pick<Company, "monogram" | "brandColor" | "brandColorTo" | "name">
  size?: Size
  className?: string
}) {
  const s = SIZE_MAP[size]
  return (
    <div className={cn("relative shrink-0", s.box, className)}>
      <div
        aria-hidden
        className={cn("absolute inset-0 rounded-md opacity-60", s.halo)}
        style={{
          background: `radial-gradient(circle at 30% 30%, ${company.brandColor}, transparent 70%)`,
        }}
      />
      <div
        className={cn(
          "relative flex h-full w-full items-center justify-center bl-clip-notch border border-line-bright/40",
          "font-display font-bold tracking-tight text-white",
          s.text,
        )}
        style={{
          background: `linear-gradient(135deg, ${company.brandColor} 0%, ${company.brandColorTo} 100%)`,
          boxShadow: `inset 0 1px 0 rgba(255,255,255,0.25), 0 0 0 1px rgba(0,0,0,0.4)`,
        }}
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_50%)]"
        />
        <span className="relative drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
          {company.monogram}
        </span>
      </div>
    </div>
  )
}
