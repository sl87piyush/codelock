"use client"

import Link from "next/link"
import {
  Activity,
  ChevronRight,
  Crown,
  Flame,
  Globe2,
  Lock,
  Shield,
  Sparkles,
  Swords,
  Users,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { ClanCrestBadge } from "./clan-crest"
import {
  TIER_META,
  formatRankDelta,
  formatXp,
  type Clan,
} from "./clan-data"

type Props = {
  clan: Clan
  onJoin?: (id: string) => void
}

export function ClanCard({ clan, onJoin }: Props) {
  const tier = TIER_META[clan.tier]
  const goalPct = Math.min(100, (clan.weeklyXp / clan.weeklyXpGoal) * 100)
  const memberPct = Math.min(100, (clan.memberCount / clan.capacity) * 100)
  const winrate = clan.warsTotal === 0 ? 0 : Math.round((clan.warsWon / clan.warsTotal) * 100)
  const delta = formatRankDelta(clan.rankDelta)
  const isFull = clan.memberCount >= clan.capacity
  const seatsOpen = Math.max(0, clan.capacity - clan.memberCount)

  const accentBorder = tier.border
  const accentText = tier.text

  return (
    <article
      className={cn(
        "group relative overflow-hidden border bg-panel/55 bl-glass transition-all",
        "hover:border-neon/45 hover:shadow-[0_0_0_1px_rgba(0,240,255,0.18),0_22px_60px_-30px_rgba(0,240,255,0.4)]",
        accentBorder,
      )}
    >
      {/* Tier-tinted top sheen */}
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent",
          tier.accent === "blood"
            ? "via-blood/70"
            : tier.accent === "neon"
              ? "via-neon/70"
              : tier.accent === "gold"
                ? "via-gold/70"
                : tier.accent === "electric"
                  ? "via-electric/70"
                  : "via-ember/70",
        )}
      />
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-15" />

      {/* Header band */}
      <div className="relative flex items-start gap-3 p-4">
        <ClanCrestBadge crest={clan.crest} size="lg" />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <span
              className={cn(
                "inline-flex h-5 items-center gap-1 px-1.5 border font-display text-[9.5px] font-bold tracking-[0.18em]",
                tier.chip,
              )}
            >
              <Crown className="h-2.5 w-2.5" />
              {clan.tier.toUpperCase()} · #{clan.rank}
            </span>
            <RankDeltaPill sign={delta.sign} abs={delta.abs} delta={clan.rankDelta} />
            {clan.isOfficial && (
              <span className="inline-flex h-5 items-center gap-1 px-1.5 border border-neon/50 bg-neon/10 font-display text-[9px] font-bold tracking-[0.18em] text-neon">
                <Shield className="h-2.5 w-2.5" />
                OFFICIAL
              </span>
            )}
            {clan.isHot && (
              <span className="inline-flex h-5 items-center gap-1 px-1.5 border border-blood/45 bg-blood/10 font-display text-[9px] font-bold tracking-[0.18em] text-blood bl-flicker">
                <Flame className="h-2.5 w-2.5" />
                HOT
              </span>
            )}
            {clan.isRising && !clan.isHot && (
              <span className="inline-flex h-5 items-center gap-1 px-1.5 border border-gold/45 bg-gold/10 font-display text-[9px] font-bold tracking-[0.18em] text-gold">
                ▲ RISING
              </span>
            )}
          </div>

          <h3 className="mt-1.5 font-display text-[17px] font-bold leading-tight tracking-tight">
            <Link
              href={`/clans/${clan.slug}`}
              className="hover:text-neon transition-colors"
            >
              {clan.name}
            </Link>
          </h3>
          <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 font-mono text-[10.5px] text-text-mute">
            <span className="text-neon/80">[{clan.tag}]</span>
            <span>·</span>
            <span className="inline-flex items-center gap-1">
              <Globe2 className="h-3 w-3" />
              {clan.region}
            </span>
            <span>·</span>
            <span>{clan.language}</span>
          </div>
        </div>
      </div>

      {/* Motto */}
      <div className="relative px-4">
        <blockquote
          className={cn(
            "border-l-2 pl-2.5 font-display text-[12px] italic leading-snug",
            tier.accent === "blood"
              ? "border-blood/60"
              : tier.accent === "neon"
                ? "border-neon/60"
                : tier.accent === "gold"
                  ? "border-gold/60"
                  : tier.accent === "electric"
                    ? "border-electric/60"
                    : "border-ember/60",
            accentText,
          )}
        >
          &quot;{clan.motto}&quot;
        </blockquote>
      </div>

      {/* Description */}
      <p className="relative mt-2.5 px-4 line-clamp-2 text-[12.5px] leading-relaxed text-text-dim">
        {clan.description}
      </p>

      {/* Focus tags */}
      <div className="relative mt-3 flex flex-wrap gap-1 px-4">
        {clan.focus.slice(0, 4).map((f) => (
          <span
            key={f}
            className="inline-flex h-5 items-center px-1.5 border border-line bg-void/60 font-mono text-[10px] text-text-dim"
          >
            {f}
          </span>
        ))}
        {clan.vibe.slice(0, 2).map((v) => (
          <span
            key={v}
            className="inline-flex h-5 items-center px-1.5 border border-neon/30 bg-neon/5 font-mono text-[10px] text-neon"
          >
            {v}
          </span>
        ))}
      </div>

      {/* Weekly XP bar */}
      <div className="relative mt-3.5 px-4">
        <div className="flex items-baseline justify-between">
          <span className="font-display text-[10px] font-bold tracking-[0.2em] text-text-mute">
            WEEKLY XP
          </span>
          <span className="font-mono text-[11px] tabular-nums text-text">
            <span className="text-neon">{formatXp(clan.weeklyXp)}</span>
            <span className="text-text-mute"> / {formatXp(clan.weeklyXpGoal)}</span>
          </span>
        </div>
        <div className="mt-1 relative h-2 bl-bar-track overflow-hidden">
          <div
            className={cn(
              "h-full bl-shimmer",
              goalPct >= 90 && "shadow-[0_0_18px_rgba(0,240,255,0.45)]",
            )}
            style={{ width: `${goalPct}%` }}
          />
          {/* Goal tick */}
          <div className="pointer-events-none absolute inset-y-0 right-0 w-px bg-neon/60" />
        </div>
        <div className="mt-1 flex items-center justify-between font-mono text-[10px] text-text-mute">
          <span className="inline-flex items-center gap-1">
            <Activity className="h-3 w-3 text-neon/80" />
            {clan.problemsThisWeek.toLocaleString()} problems · top contrib {formatXp(clan.topContributorXp)}
          </span>
          <span>{Math.round(goalPct)}% of goal</span>
        </div>
      </div>

      {/* Stats grid */}
      <div className="relative mt-3.5 grid grid-cols-3 border-y border-line/60 bg-void/40">
        <Stat label="MEMBERS" value={`${clan.memberCount}/${clan.capacity}`} />
        <Stat label="WAR W/L" value={`${clan.warsWon}-${clan.warsTotal - clan.warsWon}`} sub={`${winrate}%`} />
        <Stat label="SEASON LP" value={formatXp(clan.seasonLp)} />
      </div>

      {/* Members preview + capacity bar */}
      <div className="relative px-4 pt-3">
        <div className="flex items-center justify-between">
          <span className="font-display text-[10px] font-bold tracking-[0.2em] text-text-mute">
            ROSTER
          </span>
          <span className="inline-flex items-center gap-1 font-mono text-[10px] text-text-mute">
            <span className="h-1.5 w-1.5 rounded-full bg-neon bl-flicker" />
            {clan.onlineCount} online
          </span>
        </div>
        <div className="mt-1.5 flex items-center gap-2">
          <div className="flex -space-x-1.5">
            {clan.membersPreview.slice(0, 5).map((m, i) => (
              <span
                key={`${m.initials}-${i}`}
                className={cn(
                  "relative inline-flex h-7 w-7 items-center justify-center rounded-full border-2 border-panel font-display text-[10px] font-bold",
                  m.rank === "Captain"
                    ? "bg-gradient-to-br from-gold to-ember text-void"
                    : m.rank === "Officer"
                      ? "bg-gradient-to-br from-neon to-electric text-void"
                      : "bg-panel-2 text-text",
                )}
                title={`${m.initials} · ${m.rank}`}
              >
                {m.initials}
                {m.online && (
                  <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-neon shadow-[0_0_6px_#00f0ff] border border-panel" />
                )}
              </span>
            ))}
            {clan.memberCount > 5 && (
              <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-full border-2 border-panel bg-void/70 font-mono text-[9.5px] text-text-dim">
                +{clan.memberCount - 5}
              </span>
            )}
          </div>
          <div className="flex-1">
            <div className="h-1.5 bl-bar-track overflow-hidden">
              <div
                className={cn(
                  "h-full",
                  isFull
                    ? "bg-blood"
                    : memberPct > 80
                      ? "bg-gradient-to-r from-ember to-blood"
                      : "bg-gradient-to-r from-electric to-neon",
                )}
                style={{ width: `${memberPct}%` }}
              />
            </div>
            <div className="mt-1 font-mono text-[10px] text-text-mute">
              {isFull ? (
                <span className="text-blood">FULL ROSTER</span>
              ) : (
                <>
                  <span className="text-neon">{seatsOpen}</span> seats open
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* War status footer */}
      <WarStatusBlock clan={clan} />

      {/* CTA row */}
      <div className="relative flex items-stretch border-t border-line/60">
        <Link
          href={`/clans/${clan.slug}`}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 font-display text-[11px] font-bold tracking-[0.18em] text-text-dim hover:text-neon hover:bg-neon/5 transition-colors"
        >
          VIEW CLAN
          <ChevronRight className="h-3 w-3" />
        </Link>
        <button
          type="button"
          onClick={() => onJoin?.(clan.id)}
          disabled={isFull || clan.joinPolicy === "Closed"}
          className={cn(
            "flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 font-display text-[11px] font-bold tracking-[0.18em] border-l border-line/60 transition-all",
            clan.joinPolicy === "Open" && !isFull
              ? "text-void bg-gradient-to-r from-neon to-electric hover:from-neon-soft hover:to-neon shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]"
              : clan.joinPolicy === "Apply" && !isFull
                ? "text-ember bg-ember/10 hover:bg-ember/20 border-l-ember/30"
                : clan.joinPolicy === "Invite-Only"
                  ? "text-text-dim bg-panel-2/60 cursor-not-allowed"
                  : "text-text-mute bg-void/40 cursor-not-allowed",
          )}
        >
          {clan.joinPolicy === "Open" && !isFull && (
            <>
              <Sparkles className="h-3 w-3" />
              JOIN INSTANTLY
            </>
          )}
          {clan.joinPolicy === "Apply" && !isFull && (
            <>
              <Users className="h-3 w-3" />
              APPLY
            </>
          )}
          {clan.joinPolicy === "Invite-Only" && (
            <>
              <Lock className="h-3 w-3" />
              INVITE ONLY
            </>
          )}
          {(isFull || clan.joinPolicy === "Closed") && (
            <>
              <Lock className="h-3 w-3" />
              {isFull ? "FULL" : "CLOSED"}
            </>
          )}
        </button>
      </div>
    </article>
  )
}

// --------------------------------------------------------------------

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="px-3 py-2.5 border-r border-line/60 last:border-r-0">
      <div className="font-display text-[9.5px] font-bold tracking-[0.22em] text-text-mute">
        {label}
      </div>
      <div className="mt-0.5 flex items-baseline gap-1.5">
        <span className="font-display text-[14px] font-bold tabular-nums text-text">
          {value}
        </span>
        {sub && <span className="font-mono text-[10px] text-neon">{sub}</span>}
      </div>
    </div>
  )
}

function RankDeltaPill({
  sign,
  abs,
  delta,
}: {
  sign: string
  abs: number
  delta: number
}) {
  if (delta === 0) {
    return (
      <span className="inline-flex h-5 items-center px-1.5 border border-line bg-void/60 font-mono text-[10px] text-text-mute">
        — flat
      </span>
    )
  }
  const up = delta > 0
  return (
    <span
      className={cn(
        "inline-flex h-5 items-center gap-0.5 px-1.5 border font-mono text-[10px]",
        up
          ? "border-neon/45 bg-neon/10 text-neon"
          : "border-blood/45 bg-blood/10 text-blood",
      )}
    >
      <span className="font-display font-bold">{sign}</span>
      {abs}
    </span>
  )
}

function WarStatusBlock({ clan }: { clan: Clan }) {
  if (clan.warStatus === "Live" && clan.currentOpponent) {
    const winning = (clan.warScore?.ours ?? 0) >= (clan.warScore?.theirs ?? 0)
    return (
      <div className="relative mt-3 mx-4 mb-3 border border-blood/40 bg-blood/5 p-2.5 bl-scan">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 font-display text-[9.5px] font-bold tracking-[0.2em] text-blood">
            <span className="h-1 w-1 rounded-full bg-blood bl-flicker" />
            WAR LIVE · {clan.warEndsInH}h LEFT
          </span>
          <span
            className={cn(
              "font-display text-[10px] font-bold tracking-[0.2em]",
              winning ? "text-neon" : "text-blood",
            )}
          >
            {winning ? "▲ AHEAD" : "▼ BEHIND"}
          </span>
        </div>
        <div className="mt-1.5 flex items-center justify-between gap-2">
          <span className="font-mono text-[11px] text-text">
            <span className="text-text-mute">vs </span>
            <span className="text-blood">[{clan.currentOpponent.tag}]</span>{" "}
            {clan.currentOpponent.name}
          </span>
          <span className="font-display text-[12px] font-bold tabular-nums">
            <span className={winning ? "text-neon" : "text-text"}>
              {clan.warScore?.ours ?? 0}
            </span>
            <span className="text-text-mute mx-1">:</span>
            <span className={!winning ? "text-blood" : "text-text"}>
              {clan.warScore?.theirs ?? 0}
            </span>
          </span>
        </div>
      </div>
    )
  }
  if (clan.warStatus === "Scheduled") {
    return (
      <div className="relative mt-3 mx-4 mb-3 border border-neon/30 bg-neon/5 p-2.5">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 font-display text-[9.5px] font-bold tracking-[0.2em] text-neon">
            <Swords className="h-3 w-3" />
            NEXT WAR IN {clan.warEndsInH}h
          </span>
          <span className="font-mono text-[10px] text-text-mute">match forming...</span>
        </div>
      </div>
    )
  }
  if (clan.warStatus === "Recovering") {
    return (
      <div className="relative mt-3 mx-4 mb-3 border border-line bg-void/55 p-2.5">
        <div className="flex items-center justify-between">
          <span className="font-display text-[9.5px] font-bold tracking-[0.2em] text-text-dim">
            COOLDOWN
          </span>
          <span className="font-mono text-[10px] text-text-mute">
            next match · {clan.warEndsInH}h
          </span>
        </div>
      </div>
    )
  }
  // Idle
  return (
    <div className="relative mt-3 mx-4 mb-3 border border-line bg-void/55 p-2.5">
      <div className="flex items-center justify-between">
        <span className="font-display text-[9.5px] font-bold tracking-[0.2em] text-text-dim">
          IDLE
        </span>
        <span className="font-mono text-[10px] text-text-mute">no active war</span>
      </div>
    </div>
  )
}
