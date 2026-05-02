"use client"

import {
  ChevronUp,
  Eye,
  MessageSquare,
  Coins,
  CheckCircle2,
  Flame,
  Hash,
} from "lucide-react"
import type { Doubt } from "./doubt-data"
import { DoubtAvatar } from "./doubt-avatar"
import { cn } from "@/lib/utils"

const DIFFICULTY_TONE = {
  EASY: "border-neon/50 bg-neon/10 text-neon",
  MEDIUM: "border-gold/50 bg-gold/10 text-gold",
  HARD: "border-ember/50 bg-ember/10 text-ember",
  EXPERT: "border-blood/60 bg-blood/15 text-blood",
} as const

const STATUS_TONE = {
  OPEN: { label: "OPEN", classes: "border-neon/50 bg-neon/10 text-neon" },
  RESOLVED: {
    label: "RESOLVED",
    classes: "border-gold/50 bg-gold/10 text-gold",
  },
  BOUNTY: {
    label: "BOUNTY",
    classes: "border-ember/50 bg-ember/10 text-ember",
  },
} as const

export function DoubtCard({
  doubt,
  voted = false,
  onToggleVote,
  onOpen,
}: {
  doubt: Doubt
  voted?: boolean
  onToggleVote?: () => void
  onOpen?: () => void
}) {
  const status = STATUS_TONE[doubt.status]
  const acceptedAnswer = doubt.answers.find((a) => a.isAccepted)

  return (
    <article
      className={cn(
        "group relative overflow-hidden border bg-panel/40 transition-all bl-glass",
        "hover:border-neon/40 hover:bg-panel/60",
        doubt.status === "BOUNTY" ? "border-ember/30" : "border-line/60",
      )}
    >
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-15 transition-opacity group-hover:opacity-30" />
      {doubt.isHot && (
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ember to-transparent" />
      )}

      <div className="relative flex flex-col gap-3 p-4 sm:flex-row sm:gap-4 lg:p-5">
        {/* Vote rail */}
        <div className="flex flex-row items-center gap-3 sm:flex-col sm:gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onToggleVote?.()
            }}
            aria-pressed={voted}
            className={cn(
              "group/vote relative flex h-10 w-12 items-center justify-center border transition-all",
              voted
                ? "border-neon/60 bg-neon/15 text-neon shadow-[0_0_18px_rgba(0,240,255,0.25)]"
                : "border-line/60 bg-void/40 text-text-dim hover:border-neon/40 hover:text-neon",
            )}
            aria-label={voted ? "Remove upvote" : "Upvote"}
          >
            <ChevronUp
              className={cn(
                "h-4 w-4 transition-transform group-hover/vote:-translate-y-0.5",
                voted && "-translate-y-0.5",
              )}
            />
          </button>
          <span
            className={cn(
              "font-display text-[15px] font-bold tabular-nums sm:text-center",
              voted ? "text-neon" : "text-text",
            )}
          >
            {(doubt.upvotes + (voted ? 1 : 0)).toLocaleString()}
          </span>
          {doubt.bounty ? (
            <div className="ml-auto inline-flex items-center gap-1 border border-gold/40 bg-gold/10 px-1.5 py-0.5 font-display text-[9px] font-bold tracking-[0.18em] text-gold sm:ml-0">
              <Coins className="h-3 w-3" />+{doubt.bounty}
            </div>
          ) : null}
        </div>

        {/* Body */}
        <button
          type="button"
          onClick={onOpen}
          className="relative flex flex-1 flex-col gap-2 text-left"
        >
          {/* Status row */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span
              className={cn(
                "inline-flex h-5 items-center gap-1 border px-1.5 font-display text-[9px] font-bold tracking-[0.2em] bl-clip-chevron",
                status.classes,
              )}
            >
              {doubt.status === "RESOLVED" && <CheckCircle2 className="h-3 w-3" />}
              {doubt.status === "BOUNTY" && <Coins className="h-3 w-3" />}
              {status.label}
            </span>
            <span
              className={cn(
                "inline-flex h-5 items-center border px-1.5 font-display text-[9px] font-bold tracking-[0.2em]",
                DIFFICULTY_TONE[doubt.difficulty],
              )}
            >
              {doubt.difficulty}
            </span>
            {doubt.isHot && (
              <span className="inline-flex h-5 items-center gap-1 border border-ember/50 bg-ember/10 px-1.5 font-display text-[9px] font-bold tracking-[0.2em] text-ember">
                <Flame className="h-3 w-3" />
                HOT
              </span>
            )}
            <span className="ml-auto font-mono text-[10px] tracking-[0.18em] text-text-mute">
              #{doubt.id}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-display text-[16px] font-bold leading-snug tracking-tight text-text transition-colors group-hover:text-neon md:text-[17px]">
            {doubt.title}
          </h3>

          {/* Body preview */}
          <p className="line-clamp-2 text-[13.5px] leading-relaxed text-text-dim">
            {doubt.body}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-1">
            {doubt.tags.slice(0, 4).map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-0.5 border border-line/60 bg-void/40 px-1.5 py-0.5 font-mono text-[10px] text-text-dim"
              >
                <Hash className="h-2.5 w-2.5" />
                {t}
              </span>
            ))}
          </div>

          {/* Meta */}
          <div className="mt-1 flex flex-wrap items-center justify-between gap-2 border-t border-line/40 pt-2.5">
            <div className="flex items-center gap-2.5">
              <DoubtAvatar
                initial={doubt.author.initial}
                tone={doubt.author.avatarTone}
                size="sm"
              />
              <div className="flex flex-col leading-tight">
                <span className="font-display text-[12px] font-semibold text-text">
                  {doubt.author.username}
                </span>
                <span className="font-display text-[9px] font-bold tracking-[0.2em] text-text-mute">
                  {doubt.author.division} · {doubt.postedAt} ago
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 font-mono text-[11px] text-text-dim">
              <span className="inline-flex items-center gap-1">
                <Eye className="h-3.5 w-3.5" />
                {doubt.views.toLocaleString()}
              </span>
              <span
                className={cn(
                  "inline-flex items-center gap-1",
                  acceptedAnswer ? "text-gold" : doubt.answers.length === 0 ? "text-blood" : "text-text-dim",
                )}
              >
                <MessageSquare className="h-3.5 w-3.5" />
                {doubt.answers.length}{" "}
                {doubt.answers.length === 1 ? "answer" : "answers"}
                {acceptedAnswer && <CheckCircle2 className="h-3 w-3" />}
              </span>
            </div>
          </div>
        </button>
      </div>
    </article>
  )
}
