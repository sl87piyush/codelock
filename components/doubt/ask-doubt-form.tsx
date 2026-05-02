"use client"

import { useState } from "react"
import { Code2, Hash, Send, X, Coins, Sparkles, ChevronDown } from "lucide-react"
import { TOPICS, type Difficulty } from "./doubt-data"
import { DoubtAvatar } from "./doubt-avatar"
import { cn } from "@/lib/utils"

const DIFFICULTIES: { id: Difficulty; label: string; tone: string }[] = [
  { id: "EASY", label: "EASY", tone: "border-neon/50 text-neon bg-neon/10" },
  { id: "MEDIUM", label: "MEDIUM", tone: "border-gold/50 text-gold bg-gold/10" },
  { id: "HARD", label: "HARD", tone: "border-ember/50 text-ember bg-ember/10" },
  { id: "EXPERT", label: "EXPERT", tone: "border-blood/60 text-blood bg-blood/10" },
]

export function AskDoubtForm() {
  const [expanded, setExpanded] = useState(false)
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [code, setCode] = useState("")
  const [showCode, setShowCode] = useState(false)
  const [topic, setTopic] = useState<string>("arrays")
  const [difficulty, setDifficulty] = useState<Difficulty>("MEDIUM")
  const [tagInput, setTagInput] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [bounty, setBounty] = useState(0)

  const addTag = (raw: string) => {
    const t = raw.trim().replace(/^#/, "").toLowerCase()
    if (!t || tags.includes(t) || tags.length >= 5) return
    setTags([...tags, t])
    setTagInput("")
  }

  const removeTag = (t: string) => setTags(tags.filter((x) => x !== t))

  const reset = () => {
    setTitle("")
    setBody("")
    setCode("")
    setShowCode(false)
    setTagInput("")
    setTags([])
    setBounty(0)
    setExpanded(false)
  }

  if (!expanded) {
    return (
      <button
        type="button"
        onClick={() => setExpanded(true)}
        className="group relative flex w-full items-center gap-3 overflow-hidden border border-line/60 bg-panel/50 px-4 py-4 text-left transition-colors hover:border-neon/50 hover:bg-panel/70 bl-glass"
      >
        <div className="pointer-events-none absolute inset-0 bl-grid opacity-20 transition-opacity group-hover:opacity-40" />
        <DoubtAvatar initial="t" tone="neon" size="md" />
        <div className="relative flex flex-1 flex-col">
          <span className="font-display text-[11px] font-bold tracking-[0.22em] text-text-mute group-hover:text-neon/80 transition-colors">
            ASK A DOUBT
          </span>
          <span className="mt-0.5 text-[14px] text-text-dim">
            What problem is locking you out today?
          </span>
        </div>
        <div className="relative inline-flex h-9 items-center gap-2 border border-neon/50 bg-neon/10 px-3 font-display text-[11px] font-bold tracking-[0.18em] text-neon bl-clip-chevron transition-all group-hover:border-neon group-hover:bg-neon/20">
          <Sparkles className="h-3.5 w-3.5" />
          NEW DOUBT
        </div>
      </button>
    )
  }

  return (
    <div className="relative overflow-hidden border border-neon/40 bg-panel/60 bl-glass">
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-30" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon to-transparent" />
      <div className="bl-side-stripe" data-side="left" />

      <div className="relative p-4 lg:p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <DoubtAvatar initial="t" tone="neon" size="md" />
            <div>
              <div className="font-display text-[14px] font-bold tracking-tight">
                Posting as <span className="text-neon">tonystark</span>
              </div>
              <div className="font-display text-[10px] font-bold tracking-[0.22em] text-ember">
                BRONZE · 310 XP
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={reset}
            className="inline-flex h-8 w-8 items-center justify-center border border-line/70 text-text-dim hover:border-blood/60 hover:text-blood transition-colors"
            aria-label="Cancel"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-4 flex flex-col gap-3">
          {/* Title */}
          <div className="flex flex-col gap-1.5">
            <label className="font-display text-[10px] font-bold tracking-[0.22em] text-text-mute">
              TITLE <span className="text-blood">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Be specific. e.g. 'Why does my sliding window TLE on n=10^6?'"
              className="w-full border border-line/70 bg-void/50 px-3 py-2.5 text-[14px] text-text placeholder:text-text-mute outline-none transition-colors focus:border-neon/60"
            />
            <span className="font-mono text-[10px] text-text-mute">
              {title.length}/140 · clear titles get 3x more answers
            </span>
          </div>

          {/* Body */}
          <div className="flex flex-col gap-1.5">
            <label className="font-display text-[10px] font-bold tracking-[0.22em] text-text-mute">
              DETAILS <span className="text-blood">*</span>
            </label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="What did you try? Where exactly are you stuck? What's the expected vs actual behavior?"
              rows={4}
              className="w-full resize-y border border-line/70 bg-void/50 px-3 py-2.5 text-[14px] leading-relaxed text-text placeholder:text-text-mute outline-none transition-colors focus:border-neon/60"
            />
          </div>

          {/* Code attach */}
          {showCode ? (
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-1.5 font-display text-[10px] font-bold tracking-[0.22em] text-text-mute">
                  <Code2 className="h-3.5 w-3.5" />
                  CODE SNIPPET
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setShowCode(false)
                    setCode("")
                  }}
                  className="font-display text-[10px] font-bold tracking-[0.18em] text-text-mute hover:text-blood transition-colors"
                >
                  REMOVE
                </button>
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="// paste the relevant snippet"
                rows={6}
                spellCheck={false}
                className="w-full resize-y border border-line/70 bg-void/70 px-3 py-2.5 font-mono text-[12.5px] leading-relaxed text-neon/90 placeholder:text-text-mute outline-none transition-colors focus:border-neon/60"
              />
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowCode(true)}
              className="inline-flex w-fit items-center gap-1.5 border border-line/70 bg-void/40 px-3 py-1.5 font-display text-[10px] font-bold tracking-[0.18em] text-text-dim hover:border-neon/50 hover:text-neon transition-colors"
            >
              <Code2 className="h-3.5 w-3.5" />
              ATTACH CODE
            </button>
          )}

          {/* Topic + difficulty + bounty */}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <div className="flex flex-col gap-1.5">
              <label className="font-display text-[10px] font-bold tracking-[0.22em] text-text-mute">
                TOPIC
              </label>
              <div className="relative">
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full appearance-none border border-line/70 bg-void/50 px-3 py-2.5 pr-8 text-[13px] text-text outline-none focus:border-neon/60"
                >
                  {TOPICS.filter((t) => t.id !== "all").map((t) => (
                    <option key={t.id} value={t.id} className="bg-panel">
                      {t.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-text-mute" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-display text-[10px] font-bold tracking-[0.22em] text-text-mute">
                DIFFICULTY
              </label>
              <div className="flex flex-wrap gap-1.5">
                {DIFFICULTIES.map((d) => {
                  const active = difficulty === d.id
                  return (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => setDifficulty(d.id)}
                      className={cn(
                        "inline-flex h-9 items-center px-2.5 font-display text-[10px] font-bold tracking-[0.18em] transition-all border",
                        active
                          ? d.tone
                          : "border-line/60 text-text-mute hover:text-text",
                      )}
                    >
                      {d.label}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="flex items-center gap-1.5 font-display text-[10px] font-bold tracking-[0.22em] text-text-mute">
                <Coins className="h-3.5 w-3.5 text-gold" />
                BOUNTY (LP)
              </label>
              <div className="relative flex items-center">
                <input
                  type="number"
                  min={0}
                  max={500}
                  step={25}
                  value={bounty}
                  onChange={(e) => setBounty(Number(e.target.value) || 0)}
                  className="w-full border border-line/70 bg-void/50 px-3 py-2.5 text-[14px] text-gold tabular-nums outline-none focus:border-gold/60"
                />
                <span className="absolute right-3 font-display text-[10px] font-bold tracking-[0.18em] text-gold/70">
                  +LP BOOST
                </span>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-col gap-1.5">
            <label className="flex items-center gap-1.5 font-display text-[10px] font-bold tracking-[0.22em] text-text-mute">
              <Hash className="h-3.5 w-3.5" />
              TAGS · UP TO 5
            </label>
            <div className="flex flex-wrap items-center gap-1.5 border border-line/70 bg-void/50 px-2 py-2 focus-within:border-neon/60">
              {tags.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1 border border-neon/40 bg-neon/10 px-2 py-0.5 font-mono text-[11px] text-neon"
                >
                  #{t}
                  <button
                    type="button"
                    onClick={() => removeTag(t)}
                    className="text-neon/60 hover:text-blood transition-colors"
                    aria-label={`Remove tag ${t}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === ",") {
                    e.preventDefault()
                    addTag(tagInput)
                  } else if (e.key === "Backspace" && !tagInput && tags.length) {
                    removeTag(tags[tags.length - 1])
                  }
                }}
                placeholder={tags.length === 0 ? "type and hit enter…" : ""}
                className="flex-1 min-w-[120px] bg-transparent px-1 py-0.5 text-[13px] text-text placeholder:text-text-mute outline-none"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="mt-2 flex flex-col-reverse items-stretch justify-between gap-2 border-t border-line/60 pt-3 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] text-text-mute">
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-neon bl-flicker" />
              POSTED ANONYMOUSLY · OFF
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={reset}
                className="inline-flex h-10 items-center px-4 border border-line/70 bg-panel/50 font-display text-[11px] font-bold tracking-[0.18em] text-text-dim hover:text-text hover:border-line transition-colors"
              >
                CANCEL
              </button>
              <button
                type="button"
                disabled={!title.trim() || !body.trim()}
                onClick={reset}
                className="bl-btn-primary bl-clip-notch inline-flex h-10 items-center px-5 text-[11px] tracking-[0.18em] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
              >
                <Send className="h-3.5 w-3.5" />
                POST DOUBT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
