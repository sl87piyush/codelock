"use client"

import { useMemo } from "react"
import { CalendarOff, Check, Clock3, MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  type PlannerTask,
  CATEGORY_META,
  NOW_SEED,
  PRIORITY_META,
  STATUS_META,
  accentBg,
  accentBgSolid,
  accentBorder,
  accentText,
  fmtDuration,
  durationMinutes,
  fmtTime12,
  fmtShortDate,
  isSameUTCDay,
  startOfDayUTC,
  fmtLongDate,
} from "../planner-data"

const D = 86_400_000

function dayLabel(ms: number) {
  const today = startOfDayUTC(NOW_SEED)
  const day = startOfDayUTC(ms)
  if (day === today) return "Today"
  if (day === today + D) return "Tomorrow"
  if (day === today - D) return "Yesterday"
  return fmtLongDate(ms)
}

export function ListView({
  tasks,
  onSelectTask,
  onToggleDone,
  onDelete,
}: {
  tasks: PlannerTask[]
  onSelectTask: (t: PlannerTask) => void
  onToggleDone: (t: PlannerTask) => void
  onDelete: (t: PlannerTask) => void
}) {
  // Group by day (using each task's date), preserving the incoming sort order within each group
  const groups = useMemo(() => {
    const map = new Map<number, PlannerTask[]>()
    for (const t of tasks) {
      const key = startOfDayUTC(+new Date(t.startsAt))
      const arr = map.get(key) || []
      arr.push(t)
      map.set(key, arr)
    }
    return Array.from(map.entries()).sort(([a], [b]) => a - b)
  }, [tasks])

  if (tasks.length === 0) {
    return (
      <Empty className="border border-dashed border-line/60 bg-void/30">
        <EmptyHeader>
          <EmptyMedia variant="icon" className="border border-line/60 bg-void/60">
            <CalendarOff className="h-5 w-5 text-text-mute" />
          </EmptyMedia>
          <EmptyTitle>No tasks match your filters</EmptyTitle>
          <EmptyDescription>
            Try clearing filters, widening the search, or scheduling a new task.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    )
  }

  return (
    <section className="relative overflow-hidden border border-line/60 bg-panel/40 bl-glass">
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-15" />

      {/* Desktop column headers */}
      <div className="relative hidden border-b border-line/60 bg-void/40 px-4 py-2.5 md:grid md:grid-cols-[28px_1fr_140px_120px_140px_56px] md:items-center md:gap-3">
        <span className="sr-only">Status</span>
        <span className="font-display text-[9.5px] font-bold tracking-[0.22em] text-text-mute">
          TASK
        </span>
        <span className="font-display text-[9.5px] font-bold tracking-[0.22em] text-text-mute">
          CATEGORY
        </span>
        <span className="font-display text-[9.5px] font-bold tracking-[0.22em] text-text-mute">
          PRIORITY
        </span>
        <span className="font-display text-[9.5px] font-bold tracking-[0.22em] text-text-mute">
          WHEN
        </span>
        <span className="sr-only">Actions</span>
      </div>

      <div className="relative">
        {groups.map(([dayMs, dayTasks]) => (
          <div key={dayMs}>
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line/60 bg-void/80 px-4 py-1.5 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-neon" />
                <span className="font-display text-[10px] font-bold tracking-[0.22em] text-neon">
                  {dayLabel(dayMs).toUpperCase()}
                </span>
                <span className="font-mono text-[10px] text-text-mute">
                  · {fmtShortDate(dayMs)}
                </span>
              </div>
              <span className="font-mono text-[10px] text-text-mute">
                {dayTasks.length} task{dayTasks.length === 1 ? "" : "s"}
              </span>
            </div>

            <ul className="divide-y divide-line/40">
              {dayTasks.map((t) => (
                <ListRow
                  key={t.id}
                  task={t}
                  onSelectTask={onSelectTask}
                  onToggleDone={onToggleDone}
                  onDelete={onDelete}
                />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

function ListRow({
  task,
  onSelectTask,
  onToggleDone,
  onDelete,
}: {
  task: PlannerTask
  onSelectTask: (t: PlannerTask) => void
  onToggleDone: (t: PlannerTask) => void
  onDelete: (t: PlannerTask) => void
}) {
  const cat = CATEGORY_META[task.category]
  const prio = PRIORITY_META[task.priority]
  const stat = STATUS_META[task.status]
  const isDone = task.status === "DONE"
  const isOverdue =
    +new Date(task.endsAt) < NOW_SEED && task.status !== "DONE" && task.status !== "CANCELLED"
  const isToday = isSameUTCDay(+new Date(task.startsAt), NOW_SEED)
  const minutes = durationMinutes(task.startsAt, task.endsAt)

  return (
    <li className="group relative grid grid-cols-1 items-start gap-3 px-4 py-3 transition-colors hover:bg-neon/[0.03] md:grid-cols-[28px_1fr_140px_120px_140px_56px] md:items-center">
      {/* Done toggle */}
      <button
        type="button"
        onClick={() => onToggleDone(task)}
        aria-label={isDone ? "Mark as not done" : "Mark as done"}
        className={cn(
          "flex h-5 w-5 shrink-0 items-center justify-center border transition-all",
          isDone
            ? "border-neon/60 bg-neon/20 text-neon"
            : "border-line/60 bg-void/60 text-transparent hover:border-neon/50 hover:text-neon/40",
        )}
      >
        <Check className="h-3 w-3" />
      </button>

      {/* Title + tags */}
      <button
        type="button"
        onClick={() => onSelectTask(task)}
        className="min-w-0 text-left"
      >
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "font-display text-[14px] font-bold tracking-tight text-text",
              isDone && "line-through text-text-dim decoration-neon/50",
              task.status === "CANCELLED" && "line-through text-text-mute",
            )}
          >
            {task.title}
          </span>
          {task.status === "IN_PROGRESS" && (
            <span className="inline-flex items-center gap-1 border border-electric/50 bg-electric/15 px-1.5 py-0.5 font-display text-[9px] font-bold tracking-[0.18em] text-electric">
              <Clock3 className="h-2.5 w-2.5 bl-flicker" />
              LIVE
            </span>
          )}
          {isOverdue && (
            <span className="inline-flex items-center border border-blood/60 bg-blood/15 px-1.5 py-0.5 font-display text-[9px] font-bold tracking-[0.18em] text-blood">
              OVERDUE
            </span>
          )}
        </div>
        {(task.description || task.tags?.length) && (
          <div className="mt-1 flex flex-wrap items-center gap-1.5">
            {task.description && (
              <span className="font-mono text-[11px] text-text-dim line-clamp-1">
                {task.description}
              </span>
            )}
            {task.tags?.map((tag) => (
              <span
                key={tag}
                className="inline-flex h-4 items-center border border-line/60 px-1.5 font-mono text-[9.5px] text-text-mute"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
        {/* Mobile-only meta strip */}
        <div className="mt-1.5 flex items-center gap-2 md:hidden">
          <CategoryPill category={task.category} />
          <PriorityPill priority={task.priority} />
          <span className="font-mono text-[10px] text-text-dim">
            {fmtTime12(+new Date(task.startsAt))} · {fmtDuration(minutes)}
          </span>
        </div>
      </button>

      {/* Category */}
      <div className="hidden md:block">
        <CategoryPill category={task.category} />
      </div>

      {/* Priority */}
      <div className="hidden md:flex items-center gap-2">
        <PriorityPill priority={task.priority} />
        <span className={cn("font-mono text-[10px]", accentText(stat.accent))}>{stat.label}</span>
      </div>

      {/* When */}
      <div className="hidden md:flex flex-col leading-tight">
        <span className={cn("font-mono text-[11.5px]", isToday ? "text-neon" : "text-text-dim")}>
          {fmtTime12(+new Date(task.startsAt))}
        </span>
        <span className="font-mono text-[10px] text-text-mute">{fmtDuration(minutes)}</span>
      </div>

      {/* Actions */}
      <div className="hidden items-center justify-end gap-1 md:flex">
        <button
          type="button"
          onClick={() => onSelectTask(task)}
          aria-label="Edit task"
          className="flex h-7 w-7 items-center justify-center border border-line/60 text-text-dim hover:border-neon/50 hover:text-neon transition-colors"
        >
          <Pencil className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={() => onDelete(task)}
          aria-label="Delete task"
          className="flex h-7 w-7 items-center justify-center border border-line/60 text-text-dim hover:border-blood/60 hover:text-blood transition-colors"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Mobile actions */}
      <button
        type="button"
        onClick={() => onSelectTask(task)}
        aria-label="Open task actions"
        className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center border border-line/60 text-text-dim md:hidden"
      >
        <MoreHorizontal className="h-3.5 w-3.5" />
      </button>
    </li>
  )
}

function CategoryPill({ category }: { category: PlannerTask["category"] }) {
  const meta = CATEGORY_META[category]
  return (
    <span
      className={cn(
        "inline-flex h-5 items-center gap-1.5 border px-1.5 font-display text-[9.5px] font-bold tracking-[0.18em]",
        accentBorder(meta.accent),
        accentBg(meta.accent),
        accentText(meta.accent),
      )}
    >
      <span className={cn("h-1.5 w-1.5", accentBgSolid(meta.accent))} />
      {meta.label}
    </span>
  )
}

function PriorityPill({ priority }: { priority: PlannerTask["priority"] }) {
  const meta = PRIORITY_META[priority]
  return (
    <span
      className={cn(
        "inline-flex h-5 items-center gap-1.5 border px-1.5 font-display text-[9.5px] font-bold tracking-[0.18em]",
        accentBorder(meta.accent),
        accentBg(meta.accent),
        accentText(meta.accent),
      )}
    >
      <span className="font-mono">{priority}</span>
      {meta.label}
    </span>
  )
}
