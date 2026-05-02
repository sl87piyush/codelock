"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Swords,
  Crown,
  CalendarDays,
  Building2,
  HelpCircle,
  Target,
  Trophy,
  ClipboardCheck,
  Medal,
  Shield,
  Activity,
  Users,
  Award,
  History,
  Settings,
  ChevronLeft,
  Code2,
} from "lucide-react"
import { cn } from "@/lib/utils"

type NavItem = {
  label: string
  icon: React.ComponentType<{ className?: string }>
  href: string
  badge?: "NEW" | "HOT" | "LIVE"
  accent?: "neon" | "ember"
}

const MAIN: NavItem[] = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/", accent: "neon" },
  { label: "Challenge Arena", icon: Swords, href: "/challenge-arena", badge: "NEW", accent: "ember" },
  { label: "Championship", icon: Crown, href: "#", badge: "NEW", accent: "ember" },
  { label: "Planner", icon: CalendarDays, href: "/planner" },
  { label: "Companies", icon: Building2, href: "/companies", badge: "NEW", accent: "neon" },
  { label: "Doubts", icon: HelpCircle, href: "/doubt" },
  { label: "Battle", icon: Target, href: "/battle", badge: "LIVE", accent: "ember" },
  { label: "Contests", icon: Trophy, href: "/contests", badge: "NEW", accent: "ember" },
  { label: "OA Arena", icon: ClipboardCheck, href: "/oa-arena", badge: "NEW", accent: "ember" },
  { label: "Leaderboard", icon: Medal, href: "/leaderboard" },
  { label: "Clan Arena", icon: Shield, href: "/clans", badge: "NEW", accent: "ember" },
]

const MORE: NavItem[] = [
  { label: "Activity Heatmap", icon: Activity, href: "#", badge: "NEW", accent: "ember" },
  { label: "Lock-In Partner", icon: Users, href: "/partner", badge: "NEW", accent: "neon" },
  { label: "Hall of Champions", icon: Award, href: "#" },
  { label: "Battle History", icon: History, href: "#" },
  { label: "Settings", icon: Settings, href: "#" },
]

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        "relative flex flex-col shrink-0 border-r border-line/60 bg-void/70 backdrop-blur-xl",
        "transition-[width] duration-300 ease-out",
        collapsed ? "w-[78px]" : "w-[260px]",
      )}
    >
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-40" />
      <div className="pointer-events-none absolute top-0 right-0 h-full w-px bg-gradient-to-b from-transparent via-neon/40 to-transparent" />

      <div className="relative px-4 pt-5 pb-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative shrink-0">
            <div className="absolute inset-0 rounded-md bg-neon/30 blur-md" />
            <div className="relative flex h-10 w-10 items-center justify-center border border-neon/70 bg-void bl-clip-notch">
              <Code2 className="h-5 w-5 text-neon" />
            </div>
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <div className="font-display text-[17px] font-bold tracking-tight text-text leading-none">
                Code<span className="text-neon text-glow">TrackX</span>
              </div>
              <div className="mt-1.5 inline-flex items-center gap-1.5 font-display text-[9px] font-bold tracking-[0.22em] text-neon/80">
                <span className="h-1 w-1 rounded-full bg-neon bl-flicker shadow-[0_0_8px_#00f0ff]" />
                PRIVATE BETA
              </div>
            </div>
          )}
        </Link>
      </div>

      <nav className="relative flex-1 overflow-y-auto px-2 pb-4">
        <SectionLabel label="MAIN" collapsed={collapsed} />
        <ul className="mt-1 flex flex-col gap-0.5">
          {MAIN.map((item) => (
            <NavLink key={item.label} item={item} collapsed={collapsed} pathname={pathname} />
          ))}
        </ul>

        <div className="mt-6" />
        <SectionLabel label="MORE" collapsed={collapsed} />
        <ul className="mt-1 flex flex-col gap-0.5">
          {MORE.map((item) => (
            <NavLink key={item.label} item={item} collapsed={collapsed} pathname={pathname} />
          ))}
        </ul>
      </nav>

      <button
        type="button"
        onClick={() => setCollapsed((v) => !v)}
        className="relative flex items-center gap-2 border-t border-line/60 px-4 py-3 font-display text-[11px] font-semibold tracking-[0.18em] text-text-dim hover:text-neon transition-colors"
      >
        <ChevronLeft className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
        {!collapsed && <span>COLLAPSE</span>}
      </button>
    </aside>
  )
}

function SectionLabel({ label, collapsed }: { label: string; collapsed: boolean }) {
  if (collapsed) {
    return <div className="mx-3 my-2 h-px bg-line/60" />
  }
  return (
    <div className="px-3 pt-3 pb-1 font-display text-[10px] font-bold tracking-[0.28em] text-text-mute">
      {label}
    </div>
  )
}

function NavLink({
  item,
  collapsed,
  pathname,
}: {
  item: NavItem
  collapsed: boolean
  pathname: string
}) {
  const Icon = item.icon
  const active = item.href !== "#" && pathname === item.href
  const badgeClass =
    item.badge === "LIVE"
      ? "bg-blood/20 text-blood border border-blood/50 bl-flicker"
      : item.accent === "ember"
        ? "bg-ember/15 text-ember border border-ember/40"
        : "bg-neon/15 text-neon border border-neon/40"

  return (
    <li>
      <Link
        href={item.href}
        data-active={active ? "true" : "false"}
        className={cn(
          "bl-nav-item group flex items-center gap-3 rounded-[6px] px-3 py-2.5 text-[13.5px] font-medium text-text-dim",
          collapsed && "justify-center px-2",
        )}
      >
        <Icon
          className={cn(
            "h-[18px] w-[18px] shrink-0 transition-colors",
            active
              ? "text-neon"
              : item.accent === "ember"
                ? "text-ember"
                : "text-text-dim group-hover:text-neon",
          )}
        />
        {!collapsed && (
          <>
            <span className="truncate">{item.label}</span>
            {item.badge && (
              <span
                className={cn(
                  "ml-auto inline-flex h-[18px] items-center px-1.5 font-display text-[9px] font-bold tracking-[0.15em] bl-clip-chevron",
                  badgeClass,
                )}
              >
                {item.badge}
              </span>
            )}
          </>
        )}
      </Link>
    </li>
  )
}
