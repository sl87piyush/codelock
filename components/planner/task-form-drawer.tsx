"use client"

import { useEffect, useMemo, useState } from "react"
import { Plus, Trash2, X } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  type Category,
  CATEGORY_LIST,
  CATEGORY_META,
  type PlannerTask,
  type Priority,
  PRIORITY_LIST,
  PRIORITY_META,
  type Status,
  STATUS_LIST,
  STATUS_META,
  accentBg,
  accentBorder,
  accentText,
  fmtMediumDate,
} from "./planner-data"

/** Format an ISO string for the native <input type="date"> (YYYY-MM-DD, UTC). */
function isoToInputDate(iso: string) {
  const d = new Date(iso)
  return `${d.getUTCFullYear()}-${(d.getUTCMonth() + 1)
    .toString()
    .padStart(2, "0")}-${d.getUTCDate().toString().padStart(2, "0")}`
}

/** Format an ISO string for the native <input type="time"> (HH:MM, UTC). */
function isoToInputTime(iso: string) {
  const d = new Date(iso)
  return `${d.getUTCHours().toString().padStart(2, "0")}:${d
    .getUTCMinutes()
    .toString()
    .padStart(2, "0")}`
}

/** Combine a YYYY-MM-DD + HH:MM string into an ISO at UTC. */
function combineToIso(date: string, time: string) {
  const [y, m, d] = date.split("-").map((n) => parseInt(n, 10))
  const [hh, mm] = time.split(":").map((n) => parseInt(n, 10))
  return new Date(Date.UTC(y, (m || 1) - 1, d || 1, hh || 0, mm || 0)).toISOString()
}

export type TaskDraft = {
  id?: string
  title: string
  description: string
  category: Category
  priority: Priority
  status: Status
  date: string // YYYY-MM-DD
  startTime: string // HH:MM
  endTime: string // HH:MM
  allDay: boolean
  tags: string[]
  location: string
}

function makeDraft(seedAt?: number): TaskDraft {
  const start = seedAt ?? Date.UTC(2026, 4, 2, 9, 0, 0)
  return {
    title: "",
    description: "",
    category: "PRACTICE",
    priority: "P2",
    status: "TODO",
    date: isoToInputDate(new Date(start).toISOString()),
    startTime: isoToInputTime(new Date(start).toISOString()),
    endTime: isoToInputTime(new Date(start + 60 * 60_000).toISOString()),
    allDay: false,
    tags: [],
    location: "",
  }
}

export function fromTask(task: PlannerTask): TaskDraft {
  return {
    id: task.id,
    title: task.title,
    description: task.description ?? "",
    category: task.category,
    priority: task.priority,
    status: task.status,
    date: isoToInputDate(task.startsAt),
    startTime: isoToInputTime(task.startsAt),
    endTime: isoToInputTime(task.endsAt),
    allDay: !!task.allDay,
    tags: task.tags ?? [],
    location: task.location ?? "",
  }
}

export function draftToTask(d: TaskDraft): PlannerTask {
  const startsAt = combineToIso(d.date, d.allDay ? "00:00" : d.startTime)
  const endsAt = combineToIso(d.date, d.allDay ? "23:59" : d.endTime)
  return {
    id: d.id ?? `tk-${Math.random().toString(36).slice(2, 8)}`,
    title: d.title.trim() || "Untitled task",
    description: d.description.trim() || undefined,
    category: d.category,
    priority: d.priority,
    status: d.status,
    startsAt,
    endsAt,
    allDay: d.allDay,
    tags: d.tags.length ? d.tags : undefined,
    location: d.location.trim() || undefined,
  }
}

export function TaskFormDrawer({
  open,
  initial,
  onClose,
  onSave,
  onDelete,
}: {
  open: boolean
  /** When provided in edit mode, this is the existing task. When provided in create mode, this is just the seed time. */
  initial: { mode: "create"; seedAt?: number } | { mode: "edit"; task: PlannerTask } | null
  onClose: () => void
  onSave: (task: PlannerTask) => void
  onDelete?: (task: PlannerTask) => void
}) {
  const seed = useMemo(() => {
    if (!initial) return makeDraft()
    return initial.mode === "edit" ? fromTask(initial.task) : makeDraft(initial.seedAt)
  }, [initial])

  const [draft, setDraft] = useState<TaskDraft>(seed)
  const [tagInput, setTagInput] = useState("")
  const [error, setError] = useState<string | null>(null)

  // Sync when `initial` changes (e.g., switching from edit one task to create a new one)
  useEffect(() => {
    setDraft(seed)
    setTagInput("")
    setError(null)
  }, [seed])

  // Lock background scroll while open + close on Escape
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener("keydown", onKey)
    }
  }, [open, onClose])

  if (!open || !initial) return null

  const isEdit = initial.mode === "edit"

  function addTag() {
    const t = tagInput.trim().replace(/^#/, "").toLowerCase()
    if (!t || draft.tags.includes(t)) {
      setTagInput("")
      return
    }
    setDraft({ ...draft, tags: [...draft.tags, t] })
    setTagInput("")
  }

  function removeTag(tag: string) {
    setDraft({ ...draft, tags: draft.tags.filter((t) => t !== tag) })
  }

  function handleSave() {
    if (!draft.title.trim()) {
      setError("Give your task a title.")
      return
    }
    if (!draft.allDay) {
      const startMs = +new Date(combineToIso(draft.date, draft.startTime))
      const endMs = +new Date(combineToIso(draft.date, draft.endTime))
      if (endMs <= startMs) {
        setError("End time must be after start time.")
        return
      }
    }
    onSave(draftToTask(draft))
  }

  return (
    <div
      className="fixed inset-0 z-50 flex"
      role="dialog"
      aria-modal="true"
      aria-label={isEdit ? "Edit task" : "Create task"}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="flex-1 bg-void/70 backdrop-blur-sm bl-phase-in"
      />

      <aside className="relative ml-auto flex h-full w-full max-w-[480px] flex-col border-l border-line/60 bg-panel shadow-[0_0_50px_rgba(0,0,0,0.6)] bl-phase-in">
        <div className="pointer-events-none absolute inset-0 bl-grid opacity-25" />
        <div className="bl-side-stripe" aria-hidden />
        <div className="bl-corners" aria-hidden />

        <header className="relative flex items-start justify-between gap-3 border-b border-line/60 px-5 py-4">
          <div>
            <span className="font-display text-[9.5px] font-bold tracking-[0.24em] text-text-mute">
              {isEdit ? "// EDIT_TASK" : "// NEW_TASK"}
            </span>
            <h2 className="mt-1 font-display text-xl font-bold tracking-tight text-text">
              {isEdit ? "Edit Task" : "Create Task"}
            </h2>
            <p className="mt-1 font-mono text-[11px] text-text-mute">
              {fmtMediumDate(+new Date(combineToIso(draft.date, "00:00")))}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close drawer"
            className="flex h-8 w-8 items-center justify-center border border-line/60 text-text-dim hover:border-blood/60 hover:text-blood transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <div className="relative flex-1 overflow-y-auto px-5 py-5">
          <div className="space-y-5">
            {/* Title */}
            <Field label="Title" required>
              <input
                value={draft.title}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                placeholder="e.g. Mock OA · Google L4"
                className="h-10 w-full border border-line/60 bg-void/60 px-3 font-display text-[14px] font-semibold text-text placeholder:text-text-mute focus:border-neon/60 focus:outline-none focus:ring-1 focus:ring-neon/40"
              />
            </Field>

            {/* Description */}
            <Field label="Description">
              <textarea
                value={draft.description}
                onChange={(e) => setDraft({ ...draft, description: e.target.value })}
                rows={3}
                placeholder="Goals, context, links…"
                className="w-full resize-none border border-line/60 bg-void/60 p-3 font-mono text-[12.5px] text-text placeholder:text-text-mute focus:border-neon/60 focus:outline-none focus:ring-1 focus:ring-neon/40"
              />
            </Field>

            {/* Date + time */}
            <div className="grid grid-cols-2 gap-3">
              <Field label="Date" required>
                <input
                  type="date"
                  value={draft.date}
                  onChange={(e) => setDraft({ ...draft, date: e.target.value })}
                  className="h-10 w-full border border-line/60 bg-void/60 px-3 font-mono text-[12.5px] text-text focus:border-neon/60 focus:outline-none"
                />
              </Field>
              <Field label="All-day">
                <button
                  type="button"
                  role="switch"
                  aria-checked={draft.allDay}
                  onClick={() => setDraft({ ...draft, allDay: !draft.allDay })}
                  className={cn(
                    "flex h-10 w-full items-center justify-between border px-3 font-display text-[11px] font-bold tracking-[0.18em] transition-colors",
                    draft.allDay
                      ? "border-neon/50 bg-neon/10 text-neon"
                      : "border-line/60 bg-void/60 text-text-dim",
                  )}
                >
                  <span>{draft.allDay ? "ON" : "OFF"}</span>
                  <span
                    className={cn(
                      "h-2 w-6 rounded-full transition-colors",
                      draft.allDay ? "bg-neon" : "bg-line",
                    )}
                  />
                </button>
              </Field>
            </div>

            {!draft.allDay && (
              <div className="grid grid-cols-2 gap-3">
                <Field label="Starts">
                  <input
                    type="time"
                    value={draft.startTime}
                    onChange={(e) => setDraft({ ...draft, startTime: e.target.value })}
                    className="h-10 w-full border border-line/60 bg-void/60 px-3 font-mono text-[12.5px] text-text focus:border-neon/60 focus:outline-none"
                  />
                </Field>
                <Field label="Ends">
                  <input
                    type="time"
                    value={draft.endTime}
                    onChange={(e) => setDraft({ ...draft, endTime: e.target.value })}
                    className="h-10 w-full border border-line/60 bg-void/60 px-3 font-mono text-[12.5px] text-text focus:border-neon/60 focus:outline-none"
                  />
                </Field>
              </div>
            )}

            {/* Category */}
            <Field label="Category">
              <div className="flex flex-wrap gap-1.5">
                {CATEGORY_LIST.map((c) => {
                  const meta = CATEGORY_META[c]
                  const active = draft.category === c
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setDraft({ ...draft, category: c })}
                      aria-pressed={active}
                      className={cn(
                        "inline-flex h-8 items-center gap-1.5 px-2.5 font-display text-[10.5px] font-bold tracking-[0.18em] transition-colors",
                        active
                          ? `border ${accentBorder(meta.accent)} ${accentBg(meta.accent)} ${accentText(meta.accent)}`
                          : "border border-line/60 text-text-dim hover:text-text",
                      )}
                    >
                      {meta.label}
                    </button>
                  )
                })}
              </div>
            </Field>

            {/* Priority */}
            <Field label="Priority">
              <div className="grid grid-cols-4 gap-1.5">
                {PRIORITY_LIST.map((p) => {
                  const meta = PRIORITY_META[p]
                  const active = draft.priority === p
                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setDraft({ ...draft, priority: p })}
                      aria-pressed={active}
                      className={cn(
                        "flex h-12 flex-col items-center justify-center gap-0.5 transition-colors",
                        active
                          ? `border ${accentBorder(meta.accent)} ${accentBg(meta.accent)}`
                          : "border border-line/60 hover:border-line",
                      )}
                    >
                      <span
                        className={cn(
                          "font-display text-[11px] font-bold tracking-[0.18em]",
                          active ? accentText(meta.accent) : "text-text-dim",
                        )}
                      >
                        {p}
                      </span>
                      <span
                        className={cn(
                          "font-display text-[9px] font-bold tracking-[0.2em]",
                          active ? accentText(meta.accent) : "text-text-mute",
                        )}
                      >
                        {meta.label.toUpperCase()}
                      </span>
                    </button>
                  )
                })}
              </div>
            </Field>

            {/* Status */}
            <Field label="Status">
              <div className="grid grid-cols-2 gap-1.5">
                {STATUS_LIST.map((s) => {
                  const meta = STATUS_META[s]
                  const active = draft.status === s
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setDraft({ ...draft, status: s })}
                      aria-pressed={active}
                      className={cn(
                        "h-9 px-3 text-left font-display text-[10.5px] font-bold tracking-[0.18em] transition-colors",
                        active
                          ? `border ${accentBorder(meta.accent)} ${accentBg(meta.accent)} ${accentText(meta.accent)}`
                          : "border border-line/60 text-text-dim hover:text-text",
                      )}
                    >
                      {meta.label}
                    </button>
                  )
                })}
              </div>
            </Field>

            {/* Location */}
            <Field label="Location">
              <input
                value={draft.location}
                onChange={(e) => setDraft({ ...draft, location: e.target.value })}
                placeholder="Solo focus room, voice channel, gym…"
                className="h-10 w-full border border-line/60 bg-void/60 px-3 font-mono text-[12.5px] text-text placeholder:text-text-mute focus:border-neon/60 focus:outline-none focus:ring-1 focus:ring-neon/40"
              />
            </Field>

            {/* Tags */}
            <Field label="Tags">
              <div className="flex flex-wrap gap-1.5">
                {draft.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex h-7 items-center gap-1 border border-electric/40 bg-electric/10 px-2 font-mono text-[11px] text-electric"
                  >
                    #{tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      aria-label={`Remove tag ${tag}`}
                      className="text-electric/80 hover:text-blood transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="mt-1.5 flex gap-2">
                <input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addTag()
                    }
                  }}
                  placeholder="Add a tag and press Enter"
                  className="h-9 flex-1 border border-line/60 bg-void/60 px-3 font-mono text-[12px] text-text placeholder:text-text-mute focus:border-neon/60 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="inline-flex h-9 items-center gap-1 border border-line/60 px-3 font-display text-[10.5px] font-bold tracking-[0.18em] text-text-dim hover:border-neon/50 hover:text-neon transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" />
                  ADD
                </button>
              </div>
            </Field>

            {error && (
              <div
                role="alert"
                className="border border-blood/50 bg-blood/10 px-3 py-2 font-mono text-[12px] text-blood"
              >
                {error}
              </div>
            )}
          </div>
        </div>

        {/* Sticky footer */}
        <footer className="relative flex items-center gap-2 border-t border-line/60 bg-void/60 px-5 py-3.5">
          {isEdit && onDelete && (
            <button
              type="button"
              onClick={() => onDelete((initial as { task: PlannerTask }).task)}
              className="inline-flex h-10 items-center gap-2 border border-blood/40 bg-blood/10 px-3 font-display text-[10.5px] font-bold tracking-[0.18em] text-blood hover:bg-blood/20 transition-colors"
            >
              <Trash2 className="h-3.5 w-3.5" />
              DELETE
            </button>
          )}
          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 items-center px-4 font-display text-[10.5px] font-bold tracking-[0.18em] text-text-dim hover:text-text transition-colors"
            >
              CANCEL
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="bl-btn-primary bl-clip-notch inline-flex h-10 items-center px-5 font-display text-[10.5px] font-bold tracking-[0.18em]"
            >
              {isEdit ? "SAVE CHANGES" : "CREATE TASK"}
            </button>
          </div>
        </footer>
      </aside>
    </div>
  )
}

function Field({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <span className="mb-1.5 inline-flex items-center gap-1 font-display text-[9.5px] font-bold tracking-[0.24em] text-text-mute">
        {label}
        {required && <span className="text-blood">*</span>}
      </span>
      {children}
    </label>
  )
}
