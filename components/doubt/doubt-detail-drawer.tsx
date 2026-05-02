"use client"

import { useEffect, useState } from "react"
import {
  X,
  ChevronUp,
  CheckCircle2,
  Coins,
  Eye,
  Flame,
  Hash,
  MessageSquare,
  Send,
  Code2,
} from "lucide-react"
import type { Answer, Doubt } from "./doubt-data"
import { DoubtAvatar } from "./doubt-avatar"
import { cn } from "@/lib/utils"

const DIFFICULTY_TONE = {
  EASY: "border-neon/50 bg-neon/10 text-neon",
  MEDIUM: "border-gold/50 bg-gold/10 text-gold",
  HARD: "border-ember/50 bg-ember/10 text-ember",
  EXPERT: "border-blood/60 bg-blood/15 text-blood",
} as const

const STATUS_TONE = {
  OPEN: "border-neon/50 bg-neon/10 text-neon",
  RESOLVED: "border-gold/50 bg-gold/10 text-gold",
  BOUNTY: "border-ember/50 bg-ember/10 text-ember",
} as const

export function DoubtDetailDrawer({
  doubt,
  open,
  onClose,
}: {
  doubt: Doubt | null
  open: boolean
  onClose: () => void
}) {
  const [comment, setComment] = useState("")
  const [voted, setVoted] = useState(false)
  const [answerVotes, setAnswerVotes] = useState<Record<string, boolean>>({})

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open, onClose])

  // Reset interaction state per doubt
  useEffect(() => {
    setComment("")
    setVoted(false)
    setAnswerVotes({})
  }, [doubt?.id])

  if (!doubt) return null

  const sortedAnswers = [...doubt.answers].sort((a, b) => {
    if (a.isAccepted !== b.isAccepted) return a.isAccepted ? -1 : 1
    return b.upvotes - a.upvotes
  })

  return (
    <div
      aria-hidden={!open}
      className={cn(
        "fixed inset-0 z-50 transition-opacity",
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-void/80 backdrop-blur-sm"
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="doubt-detail-title"
        className={cn(
          "absolute right-0 top-0 flex h-full w-full max-w-[820px] flex-col border-l border-neon/30 bg-bg shadow-[-30px_0_60px_rgba(0,0,0,0.6)] transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="pointer-events-none absolute inset-0 bl-grid opacity-15" />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-neon to-transparent" />

        {/* Header */}
        <header className="relative flex items-center justify-between gap-3 border-b border-line/60 bg-panel/60 px-5 py-3 bl-glass">
          <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] text-neon/80">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-neon bl-flicker shadow-[0_0_8px_#00f0ff]" />
            {`// DOUBT_DETAIL · ${doubt.id}`}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center border border-line/70 bg-void/40 text-text-dim hover:border-blood/60 hover:text-blood transition-colors"
            aria-label="Close drawer"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        {/* Body — scroll */}
        <div className="relative flex-1 overflow-y-auto">
          <div className="px-5 py-5 lg:px-7 lg:py-6">
            {/* Question section */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span
                className={cn(
                  "inline-flex h-5 items-center gap-1 border px-1.5 font-display text-[9px] font-bold tracking-[0.2em] bl-clip-chevron",
                  STATUS_TONE[doubt.status],
                )}
              >
                {doubt.status === "RESOLVED" && <CheckCircle2 className="h-3 w-3" />}
                {doubt.status === "BOUNTY" && <Coins className="h-3 w-3" />}
                {doubt.status}
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
              {doubt.bounty ? (
                <span className="inline-flex h-5 items-center gap-1 border border-gold/50 bg-gold/10 px-1.5 font-display text-[9px] font-bold tracking-[0.2em] text-gold">
                  <Coins className="h-3 w-3" />
                  +{doubt.bounty} LP BOUNTY
                </span>
              ) : null}
            </div>

            <h2
              id="doubt-detail-title"
              className="mt-3 font-display text-[22px] font-bold leading-snug tracking-tight text-text md:text-[26px]"
            >
              {doubt.title}
            </h2>

            <div className="mt-3 flex flex-wrap items-center gap-3 border-y border-line/60 py-3">
              <div className="flex items-center gap-2.5">
                <DoubtAvatar
                  initial={doubt.author.initial}
                  tone={doubt.author.avatarTone}
                  size="md"
                />
                <div className="flex flex-col leading-tight">
                  <span className="text-[14px] font-semibold text-text">
                    {doubt.author.username}
                  </span>
                  <span className="font-display text-[10px] font-bold tracking-[0.22em] text-text-mute">
                    {doubt.author.division} · ASKED {doubt.postedAt} AGO
                  </span>
                </div>
              </div>
              <div className="ml-auto flex items-center gap-3 font-mono text-[11px] text-text-dim">
                <span className="inline-flex items-center gap-1">
                  <Eye className="h-3.5 w-3.5" />
                  {doubt.views.toLocaleString()}
                </span>
                <span className="inline-flex items-center gap-1">
                  <MessageSquare className="h-3.5 w-3.5" />
                  {doubt.answers.length}
                </span>
              </div>
            </div>

            {/* Vote + body */}
            <div className="mt-4 grid grid-cols-[auto_1fr] gap-4">
              <VoteRail
                count={doubt.upvotes + (voted ? 1 : 0)}
                voted={voted}
                onToggle={() => setVoted((v) => !v)}
              />
              <div className="flex flex-col gap-3">
                <p className="text-pretty text-[14.5px] leading-relaxed text-text">
                  {doubt.body}
                </p>
                {doubt.code && (
                  <CodeBlock language={doubt.language ?? "code"} code={doubt.code} />
                )}
                <div className="flex flex-wrap items-center gap-1">
                  {doubt.tags.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-0.5 border border-line/60 bg-void/40 px-1.5 py-0.5 font-mono text-[10px] text-text-dim"
                    >
                      <Hash className="h-2.5 w-2.5" />
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Answers section */}
            <div className="mt-7 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="font-display text-[14px] font-bold tracking-tight text-text">
                  {doubt.answers.length}{" "}
                  {doubt.answers.length === 1 ? "Answer" : "Answers"}
                </h3>
                {doubt.answers.find((a) => a.isAccepted) && (
                  <span className="inline-flex items-center gap-1 border border-gold/50 bg-gold/10 px-1.5 py-0.5 font-display text-[9px] font-bold tracking-[0.2em] text-gold">
                    <CheckCircle2 className="h-3 w-3" />
                    ACCEPTED
                  </span>
                )}
              </div>
              <span className="font-mono text-[10px] tracking-[0.18em] text-text-mute">
                SORTED BY VOTES
              </span>
            </div>

            <div className="mt-3 flex flex-col gap-3">
              {sortedAnswers.length === 0 ? (
                <EmptyAnswers />
              ) : (
                sortedAnswers.map((a) => (
                  <AnswerItem
                    key={a.id}
                    answer={a}
                    voted={!!answerVotes[a.id]}
                    onToggleVote={() =>
                      setAnswerVotes((prev) => ({ ...prev, [a.id]: !prev[a.id] }))
                    }
                  />
                ))
              )}
            </div>
          </div>
        </div>

        {/* Composer footer */}
        <footer className="relative border-t border-line/60 bg-panel/60 px-5 py-3 bl-glass">
          <div className="flex items-end gap-2">
            <DoubtAvatar initial="t" tone="neon" size="md" />
            <div className="flex-1">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Drop your answer or ask a clarifying question…"
                rows={2}
                className="w-full resize-none border border-line/70 bg-void/50 px-3 py-2 text-[13.5px] leading-relaxed text-text placeholder:text-text-mute outline-none transition-colors focus:border-neon/60"
              />
            </div>
            <button
              type="button"
              disabled={!comment.trim()}
              onClick={() => setComment("")}
              className="bl-btn-primary bl-clip-notch inline-flex h-10 items-center px-4 text-[11px] tracking-[0.18em] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
            >
              <Send className="h-3.5 w-3.5" />
              REPLY
            </button>
          </div>
        </footer>
      </aside>
    </div>
  )
}

function VoteRail({
  count,
  voted,
  onToggle,
  accepted,
}: {
  count: number
  voted: boolean
  onToggle: () => void
  accepted?: boolean
}) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={voted}
        className={cn(
          "group/v relative flex h-10 w-12 items-center justify-center border transition-all",
          voted
            ? "border-neon/60 bg-neon/15 text-neon shadow-[0_0_18px_rgba(0,240,255,0.25)]"
            : "border-line/60 bg-void/40 text-text-dim hover:border-neon/40 hover:text-neon",
        )}
        aria-label={voted ? "Remove upvote" : "Upvote"}
      >
        <ChevronUp
          className={cn(
            "h-4 w-4 transition-transform group-hover/v:-translate-y-0.5",
            voted && "-translate-y-0.5",
          )}
        />
      </button>
      <span
        className={cn(
          "font-display text-[15px] font-bold tabular-nums",
          voted ? "text-neon" : "text-text",
        )}
      >
        {count.toLocaleString()}
      </span>
      {accepted && (
        <span className="mt-1 inline-flex h-6 w-6 items-center justify-center border border-gold/60 bg-gold/15 text-gold">
          <CheckCircle2 className="h-3.5 w-3.5" />
        </span>
      )}
    </div>
  )
}

function AnswerItem({
  answer,
  voted,
  onToggleVote,
}: {
  answer: Answer
  voted: boolean
  onToggleVote: () => void
}) {
  return (
    <article
      className={cn(
        "relative overflow-hidden border bg-panel/30 p-4 bl-glass",
        answer.isAccepted ? "border-gold/40 bg-gold/5" : "border-line/60",
      )}
    >
      {answer.isAccepted && (
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
      )}
      <div className="grid grid-cols-[auto_1fr] gap-4">
        <VoteRail
          count={answer.upvotes + (voted ? 1 : 0)}
          voted={voted}
          onToggle={onToggleVote}
          accepted={answer.isAccepted}
        />
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <DoubtAvatar
                initial={answer.author.initial}
                tone={answer.author.avatarTone}
                size="sm"
              />
              <div className="flex flex-col leading-tight">
                <span className="text-[13px] font-semibold text-text">
                  {answer.author.username}
                </span>
                <span className="font-display text-[9px] font-bold tracking-[0.22em] text-text-mute">
                  {answer.author.division} · {answer.postedAt} AGO
                </span>
              </div>
            </div>
            {answer.isAccepted && (
              <span className="inline-flex items-center gap-1 border border-gold/50 bg-gold/10 px-1.5 py-0.5 font-display text-[9px] font-bold tracking-[0.2em] text-gold">
                <CheckCircle2 className="h-3 w-3" />
                ACCEPTED
              </span>
            )}
          </div>
          <p className="text-pretty text-[14px] leading-relaxed text-text">
            {answer.body}
          </p>
          {answer.code && (
            <CodeBlock language={answer.language ?? "code"} code={answer.code} />
          )}
          <div className="flex items-center gap-3 border-t border-line/40 pt-2 font-mono text-[11px] text-text-dim">
            <button
              type="button"
              className="inline-flex items-center gap-1 hover:text-neon transition-colors"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              {answer.comments} comments
            </button>
            <button
              type="button"
              className="ml-auto font-display text-[10px] font-bold tracking-[0.18em] hover:text-neon transition-colors"
            >
              REPLY
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

function CodeBlock({ language, code }: { language: string; code: string }) {
  return (
    <div className="relative overflow-hidden border border-neon/20 bg-void/80">
      <div className="pointer-events-none absolute inset-0 bl-scanline opacity-30" />
      <div className="relative flex items-center justify-between border-b border-line/60 px-3 py-1.5">
        <div className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.22em] text-neon/80">
          <Code2 className="h-3 w-3" />
          {language.toUpperCase()}
        </div>
        <span className="font-mono text-[10px] tracking-[0.18em] text-text-mute">
          {code.split("\n").length} LINES
        </span>
      </div>
      <pre className="relative max-h-[320px] overflow-auto px-3 py-2 font-mono text-[12px] leading-relaxed text-neon/90">
        {code}
      </pre>
    </div>
  )
}

function EmptyAnswers() {
  return (
    <div className="relative overflow-hidden border border-line/60 bg-void/30 px-5 py-8 bl-corners">
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-20" />
      <div className="relative mx-auto flex max-w-md flex-col items-center text-center">
        <div className="flex h-10 w-10 items-center justify-center border border-line/70 bg-void/60">
          <MessageSquare className="h-4 w-4 text-text-mute" />
        </div>
        <h4 className="mt-3 font-display text-[15px] font-bold tracking-tight text-text">
          No answers yet
        </h4>
        <p className="mt-1.5 text-pretty text-[12.5px] leading-relaxed text-text-dim">
          Be the first to crack this. Accepted answers earn{" "}
          <span className="text-gold">+25 reputation</span> and visibility on the
          helper leaderboard.
        </p>
      </div>
    </div>
  )
}
