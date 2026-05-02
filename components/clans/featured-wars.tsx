"use client"

import { Activity, ChevronRight, Clock, Swords } from "lucide-react"
import { cn } from "@/lib/utils"
import { ClanCrestBadge } from "./clan-crest"
import { WAR_SLATE, type WarSlot } from "./clan-data"

export function FeaturedWars() {
  const live = WAR_SLATE.filter((w) => w.status === "Live")
  const next = WAR_SLATE.find((w) => w.status === "Scheduled")
  const recent = WAR_SLATE.find((w) => w.status === "Final")

  return (
    <section className="relative overflow-hidden border border-line/60 bg-panel/55 p-4 sm:p-5 bl-glass">
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-25" />
      <div className="relative">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-7 w-7 items-center justify-center border border-blood/55 bg-blood/10 bl-clip-notch">
              <Swords className="h-3.5 w-3.5 text-blood" />
              <span className="absolute inset-0 bl-pulse-ring border border-blood/60" />
            </span>
            <div className="leading-tight">
              <h2 className="font-display text-[15px] font-bold">Clan War Slate</h2>
              <p className="text-[11px] text-text-mute">
                Live battles + the next 24h
              </p>
            </div>
          </div>
          <button className="bl-btn-ghost h-8 px-3 text-[10.5px]">
            <Activity className="h-3.5 w-3.5" />
            ALL WARS
            <ChevronRight className="h-3 w-3" />
          </button>
        </div>

        <div className="mt-4 grid gap-3 lg:grid-cols-3">
          {live.slice(0, 2).map((w) => (
            <WarTile key={w.id} war={w} variant="live" />
          ))}
          {next && <WarTile war={next} variant="scheduled" />}
          {/* Fill the third slot with recent if no scheduled */}
          {!next && recent && <WarTile war={recent} variant="final" />}
        </div>
      </div>
    </section>
  )
}

function WarTile({
  war,
  variant,
}: {
  war: WarSlot
  variant: "live" | "scheduled" | "final"
}) {
  const aLeading = (war.a.score ?? 0) > (war.b.score ?? 0)
  const bLeading = (war.b.score ?? 0) > (war.a.score ?? 0)
  const total = (war.a.score ?? 0) + (war.b.score ?? 0)
  const aPct = total === 0 ? 50 : ((war.a.score ?? 0) / total) * 100

  const variantMeta = {
    live: {
      border: "border-blood/45",
      label: "LIVE NOW",
      labelChip: "bg-blood/20 text-blood border-blood/55 bl-flicker",
      time: war.endsInH != null ? `${war.endsInH}h LEFT` : "—",
    },
    scheduled: {
      border: "border-neon/35",
      label: "STARTS SOON",
      labelChip: "bg-neon/15 text-neon border-neon/45",
      time: war.startsInH != null ? `IN ${war.startsInH}h` : "SOON",
    },
    final: {
      border: "border-line",
      label: "FINAL",
      labelChip: "bg-panel-2 text-text-dim border-line",
      time: war.endedDaysAgo != null ? `${war.endedDaysAgo}d AGO` : "—",
    },
  }[variant]

  return (
    <article
      className={cn(
        "relative overflow-hidden border bg-void/55 p-3.5 bl-glass",
        variantMeta.border,
        variant === "live" && "bl-scan",
      )}
    >
      <div className="flex items-center justify-between">
        <span
          className={cn(
            "inline-flex h-5 items-center gap-1 px-1.5 border font-display text-[9.5px] font-bold tracking-[0.2em]",
            variantMeta.labelChip,
          )}
        >
          {variant === "live" && <span className="h-1 w-1 rounded-full bg-current" />}
          {variantMeta.label}
        </span>
        <span className="inline-flex items-center gap-1 font-mono text-[10px] text-text-mute">
          <Clock className="h-3 w-3" />
          {variantMeta.time}
        </span>
      </div>

      {/* Combatants */}
      <div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-center gap-2">
        <Combatant
          side="left"
          name={war.a.name}
          tag={war.a.tag}
          rank={war.a.rank}
          crest={war.a.crest}
          leading={aLeading}
        />
        <div className="flex flex-col items-center">
          <span className="font-display text-[9px] font-bold tracking-[0.2em] text-text-mute">
            VS
          </span>
          <Swords className="mt-0.5 h-4 w-4 text-text-dim" />
        </div>
        <Combatant
          side="right"
          name={war.b.name}
          tag={war.b.tag}
          rank={war.b.rank}
          crest={war.b.crest}
          leading={bLeading}
        />
      </div>

      {/* Score bar */}
      {variant !== "scheduled" && (
        <div className="mt-3">
          <div className="flex items-baseline justify-between font-display text-[11px] tabular-nums">
            <span className={cn("font-bold", aLeading ? "text-neon" : "text-text-dim")}>
              {war.a.score}
            </span>
            <span className={cn("font-bold", bLeading ? "text-neon" : "text-text-dim")}>
              {war.b.score}
            </span>
          </div>
          <div className="mt-1 relative h-1.5 bl-bar-track overflow-hidden flex">
            <div
              className={cn(
                "h-full",
                aLeading
                  ? "bg-gradient-to-r from-neon/70 to-neon"
                  : "bg-gradient-to-r from-electric/40 to-electric/70",
              )}
              style={{ width: `${aPct}%` }}
            />
            <div
              className={cn(
                "h-full",
                bLeading
                  ? "bg-gradient-to-l from-blood/80 to-blood"
                  : "bg-gradient-to-l from-blood/35 to-blood/55",
              )}
              style={{ width: `${100 - aPct}%` }}
            />
          </div>
        </div>
      )}

      {variant === "scheduled" && (
        <div className="mt-3 flex items-center justify-between rounded-sm border border-neon/30 bg-neon/5 px-2.5 py-1.5">
          <span className="font-display text-[10px] font-bold tracking-[0.2em] text-neon">
            FIRST BATTLE FORMING
          </span>
          <button className="font-display text-[10px] font-bold tracking-[0.2em] text-text-dim hover:text-neon transition-colors">
            WATCH →
          </button>
        </div>
      )}
    </article>
  )
}

function Combatant({
  side,
  name,
  tag,
  rank,
  crest,
  leading,
}: {
  side: "left" | "right"
  name: string
  tag: string
  rank: number
  crest: WarSlot["a"]["crest"]
  leading: boolean
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2.5 min-w-0",
        side === "right" && "flex-row-reverse text-right",
      )}
    >
      <ClanCrestBadge crest={crest} size="sm" />
      <div className="min-w-0">
        <div className="flex items-center gap-1.5 min-w-0">
          {side === "left" && (
            <span className="font-mono text-[10px] text-text-mute shrink-0">
              [{tag}]
            </span>
          )}
          <span
            className={cn(
              "font-display text-[12.5px] font-bold leading-none truncate",
              leading ? "text-neon" : "text-text",
            )}
          >
            {name}
          </span>
          {side === "right" && (
            <span className="font-mono text-[10px] text-text-mute shrink-0">
              [{tag}]
            </span>
          )}
        </div>
        <div className="mt-1 font-mono text-[10px] text-text-mute">#{rank}</div>
      </div>
    </div>
  )
}
