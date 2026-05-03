"use client"

import { useId, useState } from "react"
import {
  ChevronDown,
  Clock,
  Crown,
  Hash,
  PlayCircle,
  Shield,
  Sparkles,
  Swords,
  Target,
  TrendingDown,
  TrendingUp,
  Trophy,
  Users,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  type AnyMatch,
  type ClanWarMatch,
  type CombatantPreview,
  type DuoMatch,
  type SoloMatch,
  DIFFICULTY_META,
  MODE_META,
  OUTCOME_META,
  formatAbsolute,
  formatDuration,
  formatRelative,
} from "@/lib/battle-history-data"

type Props = {
  match: AnyMatch
  defaultExpanded?: boolean
}

export function MatchRow({ match, defaultExpanded = false }: Props) {
  const [open, setOpen] = useState(defaultExpanded)
  const detailsId = useId()

  const outcome = OUTCOME_META[match.outcome]
  const mode = MODE_META[match.mode]

  return (
    <article
      className={cn(
        "group relative overflow-hidden border bg-panel/55 bl-glass transition-colors",
        match.outcome === "WIN" && "border-neon/30 hover:border-neon/55",
        match.outcome === "LOSS" && "border-blood/30 hover:border-blood/55",
        match.outcome === "DRAW" && "border-gold/30 hover:border-gold/55",
      )}
    >
      {/* outcome stripe */}
      <div
        className={cn(
          "absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b",
          outcome.barClass,
        )}
        aria-hidden
      />

      {/* Header (always visible, click to toggle) */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={detailsId}
        className="relative w-full text-left"
      >
        <div className="flex flex-col gap-3 p-4 pl-5 sm:p-5 sm:pl-6 lg:flex-row lg:items-center lg:gap-5">
          {/* Outcome + mode */}
          <div className="flex items-center gap-3 lg:w-[200px] lg:shrink-0">
            <span
              className={cn(
                "inline-flex h-7 items-center gap-1.5 border px-2 font-display text-[10px] font-bold tracking-[0.22em] bl-clip-chevron",
                outcome.chipClass,
              )}
            >
              {match.outcome === "WIN" && <Trophy className="h-3 w-3" />}
              {match.outcome === "LOSS" && <TrendingDown className="h-3 w-3" />}
              {match.outcome === "DRAW" && <Sparkles className="h-3 w-3" />}
              {outcome.label}
            </span>
            <span
              className={cn(
                "inline-flex h-7 items-center gap-1.5 border px-2 font-display text-[10px] font-bold tracking-[0.18em]",
                mode.accent === "neon" && "border-neon/45 bg-neon/10 text-neon",
                mode.accent === "electric" &&
                  "border-electric/45 bg-electric/10 text-electric",
                mode.accent === "blood" &&
                  "border-blood/45 bg-blood/10 text-blood",
                mode.accent === "ember" &&
                  "border-ember/45 bg-ember/10 text-ember",
                mode.accent === "gold" && "border-gold/45 bg-gold/10 text-gold",
              )}
            >
              {match.mode === "SOLO" && <Target className="h-3 w-3" />}
              {match.mode === "DUO" && <Swords className="h-3 w-3" />}
              {match.mode === "CLAN_WAR" && <Shield className="h-3 w-3" />}
              {mode.short}
            </span>
          </div>

          {/* Combatants */}
          <div className="min-w-0 flex-1">
            <CombatantsLine match={match} />
          </div>

          {/* Score */}
          <ScoreBlock
            yourScore={match.yourScore}
            oppScore={match.oppScore}
            outcome={match.outcome}
            bestOf={match.bestOf}
          />

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 lg:w-[260px] lg:shrink-0 lg:flex-col lg:items-end lg:gap-1">
            {/* LP delta */}
            <LpDelta lp={match.lpDelta} />
            {/* Duration */}
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-text-dim">
              <Clock className="h-3 w-3 text-text-mute" />
              {formatDuration(match.durationMin)}
            </span>
            {/* Date */}
            <span
              className="font-mono text-[11px] text-text-mute"
              title={formatAbsolute(match.endedAt)}
            >
              {formatRelative(match.endedAt)}
            </span>
          </div>

          {/* Chevron */}
          <span
            className={cn(
              "inline-flex h-8 w-8 shrink-0 items-center justify-center border border-line/60 bg-void/40 text-text-dim transition-transform",
              open && "rotate-180 border-neon/45 text-neon",
            )}
            aria-hidden
          >
            <ChevronDown className="h-4 w-4" />
          </span>
        </div>
      </button>

      {/* Details (collapsed) */}
      {open && (
        <div
          id={detailsId}
          className="relative border-t border-line/60 bg-void/40 px-4 py-5 sm:px-6"
        >
          <div className="pointer-events-none absolute inset-0 bl-grid opacity-20" />
          <div className="relative grid gap-5 lg:grid-cols-[1fr_1.2fr]">
            {/* Left: rounds + meta */}
            <div className="flex flex-col gap-4">
              <MetaStrip match={match} />
              <RoundsList match={match} />
            </div>
            {/* Right: problems + extras */}
            <div className="flex flex-col gap-4">
              <ProblemsList match={match} />
              {match.mode === "CLAN_WAR" && (
                <ContributorsList match={match} />
              )}
              {match.recap && (
                <a
                  href={match.recap}
                  className="bl-btn-ghost h-10 w-fit"
                  onClick={(e) => e.stopPropagation()}
                >
                  <PlayCircle className="h-4 w-4" />
                  WATCH REPLAY
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </article>
  )
}

// --------------------------------------------------------------------
// Sub-components
// --------------------------------------------------------------------

function CombatantsLine({ match }: { match: AnyMatch }) {
  if (match.mode === "SOLO") return <SoloCombatants match={match} />
  if (match.mode === "DUO") return <DuoCombatants match={match} />
  return <ClanCombatants match={match} />
}

function SoloCombatants({ match }: { match: SoloMatch }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <CrestSolo combatant={match.you} self />
      <span className="font-display text-[10px] font-bold tracking-[0.3em] text-text-mute">
        VS
      </span>
      <CrestSolo combatant={match.opponent} />
    </div>
  )
}

function DuoCombatants({ match }: { match: DuoMatch }) {
  return (
    <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2">
      <TeamCluster
        teamName={match.yourTeam.name}
        members={match.yourTeam.members}
        self
      />
      <span className="font-display text-[10px] font-bold tracking-[0.3em] text-text-mute">
        VS
      </span>
      <TeamCluster
        teamName={match.oppTeam.name}
        members={match.oppTeam.members}
      />
    </div>
  )
}

function ClanCombatants({ match }: { match: ClanWarMatch }) {
  return (
    <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2">
      <ClanCrestBlock clan={match.yourClan} self />
      <span className="font-display text-[10px] font-bold tracking-[0.3em] text-text-mute">
        VS
      </span>
      <ClanCrestBlock clan={match.oppClan} />
      {match.weekTag && (
        <span className="ml-1 inline-flex h-5 items-center gap-1 border border-line/60 bg-void/50 px-1.5 font-mono text-[10px] text-text-mute">
          <Hash className="h-2.5 w-2.5" />
          {match.weekTag}
        </span>
      )}
    </div>
  )
}

function CrestSolo({
  combatant,
  self,
}: {
  combatant: CombatantPreview & { name: string }
  self?: boolean
}) {
  return (
    <div className="flex min-w-0 items-center gap-2.5">
      <div
        className={cn(
          "relative flex h-9 w-9 shrink-0 items-center justify-center bl-clip-notch bg-gradient-to-br",
          combatant.from,
          combatant.to,
          self ? "ring-1 ring-neon/55" : "ring-1 ring-line/60",
        )}
        aria-hidden
      >
        <span className="font-display text-[11px] font-extrabold text-void">
          {combatant.initials}
        </span>
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="truncate font-display text-[13px] font-bold text-text">
            {combatant.name}
          </span>
          {self && (
            <span className="inline-flex h-4 items-center px-1 border border-neon/45 bg-neon/10 font-display text-[8.5px] font-bold tracking-[0.18em] text-neon">
              YOU
            </span>
          )}
        </div>
        <span className="font-mono text-[10.5px] text-text-mute tabular-nums">
          {combatant.rating} ELO
        </span>
      </div>
    </div>
  )
}

function TeamCluster({
  teamName,
  members,
  self,
}: {
  teamName: string
  members: (CombatantPreview & { name: string; role?: string })[]
  self?: boolean
}) {
  return (
    <div className="flex min-w-0 items-center gap-2.5">
      <div className="flex -space-x-2">
        {members.map((m, i) => (
          <div
            key={`${m.name}-${i}`}
            className={cn(
              "relative flex h-8 w-8 shrink-0 items-center justify-center bl-clip-notch bg-gradient-to-br ring-1",
              m.from,
              m.to,
              self ? "ring-neon/55" : "ring-line/60",
            )}
            title={`${m.name} · ${m.rating} ELO${m.role ? ` · ${m.role}` : ""}`}
            aria-label={`${m.name}, ${m.rating} ELO`}
          >
            <span className="font-display text-[10px] font-extrabold text-void">
              {m.initials}
            </span>
          </div>
        ))}
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="truncate font-display text-[13px] font-bold text-text">
            {teamName}
          </span>
          {self && (
            <span className="inline-flex h-4 items-center px-1 border border-neon/45 bg-neon/10 font-display text-[8.5px] font-bold tracking-[0.18em] text-neon">
              YOU
            </span>
          )}
        </div>
        <span className="font-mono text-[10.5px] text-text-mute">
          {members.map((m) => m.name).join(" · ")}
        </span>
      </div>
    </div>
  )
}

function ClanCrestBlock({
  clan,
  self,
}: {
  clan: ClanWarMatch["yourClan"]
  self?: boolean
}) {
  return (
    <div className="flex min-w-0 items-center gap-2.5">
      <div
        className={cn(
          "relative flex h-10 w-10 shrink-0 items-center justify-center bl-clip-notch bg-gradient-to-br ring-1",
          clan.from,
          clan.to,
          self ? "ring-neon/55" : "ring-blood/45",
        )}
        aria-hidden
      >
        <span className="font-display text-[12px] font-extrabold text-void">
          {clan.monogram}
        </span>
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="truncate font-display text-[13px] font-bold text-text">
            {clan.name}
          </span>
          <span className="inline-flex h-4 items-center px-1 border border-line/60 bg-void/50 font-mono text-[9.5px] text-text-mute">
            [{clan.tag}]
          </span>
          {self && (
            <span className="inline-flex h-4 items-center px-1 border border-neon/45 bg-neon/10 font-display text-[8.5px] font-bold tracking-[0.18em] text-neon">
              YOU
            </span>
          )}
        </div>
        <span className="inline-flex items-center gap-2 font-mono text-[10.5px] text-text-mute tabular-nums">
          <Crown className="h-2.5 w-2.5 text-gold" /> #{clan.rank}
          <Users className="h-2.5 w-2.5 text-text-mute" />{" "}
          {clan.membersPlayed} played
        </span>
      </div>
    </div>
  )
}

function ScoreBlock({
  yourScore,
  oppScore,
  outcome,
  bestOf,
}: {
  yourScore: number
  oppScore: number
  outcome: AnyMatch["outcome"]
  bestOf: number
}) {
  const youColor =
    outcome === "WIN"
      ? "text-neon text-glow"
      : outcome === "LOSS"
        ? "text-text"
        : "text-gold"
  const oppColor =
    outcome === "LOSS"
      ? "text-blood text-glow-ember"
      : outcome === "WIN"
        ? "text-text-dim"
        : "text-gold"
  return (
    <div className="flex items-center gap-3 lg:w-[160px] lg:shrink-0 lg:justify-center">
      <div className="flex flex-col items-end leading-none">
        <span className="font-display text-[9px] font-bold tracking-[0.22em] text-text-mute">
          YOU
        </span>
        <span
          className={cn(
            "font-display text-[26px] font-extrabold tabular-nums",
            youColor,
          )}
        >
          {yourScore}
        </span>
      </div>
      <span className="font-display text-base text-text-mute">:</span>
      <div className="flex flex-col items-start leading-none">
        <span className="font-display text-[9px] font-bold tracking-[0.22em] text-text-mute">
          OPP
        </span>
        <span
          className={cn(
            "font-display text-[26px] font-extrabold tabular-nums",
            oppColor,
          )}
        >
          {oppScore}
        </span>
      </div>
      <span className="ml-1 hidden font-mono text-[10px] text-text-mute md:inline">
        Bo{bestOf}
      </span>
    </div>
  )
}

function LpDelta({ lp }: { lp: number }) {
  if (lp === 0) {
    return (
      <span className="inline-flex items-center gap-1.5 font-mono text-[11.5px] font-bold tabular-nums text-gold">
        <Sparkles className="h-3 w-3" />
        ±0 LP
      </span>
    )
  }
  const positive = lp > 0
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-mono text-[11.5px] font-bold tabular-nums",
        positive ? "text-neon" : "text-blood",
      )}
    >
      {positive ? (
        <TrendingUp className="h-3 w-3" />
      ) : (
        <TrendingDown className="h-3 w-3" />
      )}
      {positive ? "+" : ""}
      {lp} LP
    </span>
  )
}

// --------------------------------------------------------------------
// Expanded details
// --------------------------------------------------------------------

function MetaStrip({ match }: { match: AnyMatch }) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      <MetaCell label="MATCH ID" value={match.id} mono />
      <MetaCell label="DURATION" value={formatDuration(match.durationMin)} />
      <MetaCell
        label="RATING"
        value={`${match.ratingBefore} → ${match.ratingAfter}`}
        accent={match.ratingAfter > match.ratingBefore ? "neon" : "blood"}
      />
      <MetaCell label="ENDED" value={formatAbsolute(match.endedAt)} mono />
      {match.mvp && (
        <div className="col-span-2 sm:col-span-4 flex items-center gap-2 border border-gold/35 bg-gold/5 px-3 py-2">
          <Crown className="h-3.5 w-3.5 text-gold" />
          <span className="font-display text-[10.5px] font-bold tracking-[0.2em] text-gold">
            MVP
          </span>
          <span className="font-display text-[12.5px] font-bold text-text">
            {match.mvp}
          </span>
        </div>
      )}
    </div>
  )
}

function MetaCell({
  label,
  value,
  mono,
  accent,
}: {
  label: string
  value: string
  mono?: boolean
  accent?: "neon" | "blood"
}) {
  const tone =
    accent === "neon"
      ? "text-neon"
      : accent === "blood"
        ? "text-blood"
        : "text-text"
  return (
    <div className="border border-line/60 bg-void/45 px-3 py-2">
      <div className="font-display text-[9px] font-bold tracking-[0.22em] text-text-mute">
        {label}
      </div>
      <div
        className={cn(
          "mt-1 truncate font-display text-[12px] font-bold",
          mono && "font-mono text-[11.5px] tabular-nums",
          tone,
        )}
      >
        {value}
      </div>
    </div>
  )
}

function RoundsList({ match }: { match: AnyMatch }) {
  return (
    <div className="border border-line/60 bg-void/45">
      <div className="flex items-center justify-between border-b border-line/60 px-3 py-2">
        <span className="font-display text-[10.5px] font-bold tracking-[0.22em] text-text-dim">
          ROUND BREAKDOWN
        </span>
        <span className="font-mono text-[10px] text-text-mute">
          Bo{match.bestOf} · {match.rounds.length} rounds
        </span>
      </div>
      <ol className="flex flex-col">
        {match.rounds.map((r) => {
          const o = OUTCOME_META[r.outcome]
          return (
            <li
              key={r.index}
              className="flex items-center gap-3 border-b border-line/40 px-3 py-2 last:border-b-0"
            >
              <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center border border-line/60 bg-panel/60 font-display text-[10px] font-bold tabular-nums text-text-dim">
                R{r.index}
              </span>
              <span
                className={cn(
                  "inline-flex h-5 items-center px-1.5 border font-display text-[9px] font-bold tracking-[0.2em]",
                  o.chipClass,
                )}
              >
                {o.label}
              </span>
              <div className="ml-auto flex items-center gap-3 font-mono text-[12px] tabular-nums">
                <span
                  className={cn(
                    "font-display font-bold",
                    r.outcome === "WIN" ? "text-neon" : "text-text",
                  )}
                >
                  {r.yourScore}
                </span>
                <span className="text-text-mute">:</span>
                <span
                  className={cn(
                    "font-display font-bold",
                    r.outcome === "LOSS" ? "text-blood" : "text-text-dim",
                  )}
                >
                  {r.oppScore}
                </span>
                <span className="ml-2 inline-flex items-center gap-1 text-text-mute">
                  <Clock className="h-2.5 w-2.5" />
                  {formatDuration(r.durationMin)}
                </span>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

function ProblemsList({ match }: { match: AnyMatch }) {
  return (
    <div className="border border-line/60 bg-void/45">
      <div className="flex items-center justify-between border-b border-line/60 px-3 py-2">
        <span className="font-display text-[10.5px] font-bold tracking-[0.22em] text-text-dim">
          PROBLEMS
        </span>
        <span className="font-mono text-[10px] text-text-mute">
          {match.problems.filter((p) => p.solvedBy !== "none").length} /{" "}
          {match.problems.length} solved
        </span>
      </div>
      <ul className="flex flex-col">
        {match.problems.map((p) => {
          const meta = DIFFICULTY_META[p.difficulty]
          const solver =
            p.solvedBy === "you"
              ? { label: "YOU", tone: "text-neon" }
              : p.solvedBy === "ally"
                ? { label: "ALLY", tone: "text-electric" }
                : p.solvedBy === "opponent"
                  ? { label: "OPP", tone: "text-blood" }
                  : { label: "—", tone: "text-text-mute" }
          const unsolved = p.solvedBy === "none"
          return (
            <li
              key={p.id}
              className="flex items-center gap-3 border-b border-line/40 px-3 py-2 last:border-b-0"
            >
              <span
                className={cn(
                  "inline-flex h-5 items-center px-1.5 border font-display text-[9px] font-bold tracking-[0.2em] shrink-0",
                  meta.chip,
                )}
              >
                {p.difficulty.toUpperCase()}
              </span>
              <span
                className={cn(
                  "min-w-0 truncate text-[12.5px]",
                  unsolved ? "text-text-mute line-through" : "text-text",
                )}
              >
                {p.name}
              </span>
              <span className="ml-auto flex items-center gap-2.5 font-mono text-[10.5px] tabular-nums shrink-0">
                <span
                  className={cn(
                    "inline-flex h-5 items-center px-1.5 font-display text-[9px] font-bold tracking-[0.2em]",
                    solver.tone,
                  )}
                >
                  {solver.label}
                </span>
                <span className="text-text-mute">
                  {p.solvedInMin === null ? "—" : `${p.solvedInMin}m`}
                </span>
                <span className="text-gold">+{p.points}</span>
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function ContributorsList({ match }: { match: ClanWarMatch }) {
  return (
    <div className="border border-line/60 bg-void/45">
      <div className="flex items-center justify-between border-b border-line/60 px-3 py-2">
        <span className="font-display text-[10.5px] font-bold tracking-[0.22em] text-text-dim">
          TOP CONTRIBUTORS
        </span>
        <span className="font-mono text-[10px] text-text-mute">
          {match.yourClan.tag} · {match.yourClan.totalXp.toLocaleString()} XP
        </span>
      </div>
      <ul className="flex flex-col">
        {match.topContributors.map((c, i) => (
          <li
            key={c.name}
            className="flex items-center gap-3 border-b border-line/40 px-3 py-2 last:border-b-0"
          >
            <span
              className={cn(
                "inline-flex h-6 w-6 shrink-0 items-center justify-center border font-display text-[10px] font-bold tabular-nums",
                i === 0
                  ? "border-gold/55 bg-gold/10 text-gold"
                  : "border-line/60 bg-panel/60 text-text-dim",
              )}
            >
              {i + 1}
            </span>
            <span className="truncate font-display text-[12.5px] font-bold text-text">
              {c.name}
            </span>
            <span className="ml-auto flex items-center gap-3 font-mono text-[11px] tabular-nums">
              <span className="text-neon">{c.xp.toLocaleString()} XP</span>
              <span className="text-text-mute">{c.problems} solved</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
