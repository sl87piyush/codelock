"use client"

import { Check, Clock3, Lock } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  type PlannerTask,
  CATEGORY_META,
  PRIORITY_META,
  accentBgSolid,
  accentText,
  fmtTime12,
} from "./planner-data"

/**
 * Compact event block used inside Day and Week timelines.
 * Supports `density="dense" | "comfortable"` so the same block can render
 * tightly in week columns and roomily in day view.
 */
export function TaskBlock({
  task,
  onClick,
  density = "comfortable",
  hideTime = false,
}: {
  task: PlannerTask
  onClick?: (task: PlannerTask) => void
  density?: "dense" | "comfortable"
  hideTime?: boolean
}) {
  const cat = CATEGORY_META[task.category]
  const prio = PRIORITY_META[task.priority]
  const isDone = task.status === "DONE"
  const isCancelled = task.status === "CANCELLED"
  const isInProgress = task.status === "IN_PROGRESS"

  return (
    <button
      type="button"
      onClick={() => onClick?.(task)}
      className={cn(
        "group/block relative h-full w-full overflow-hidden border bg-void/80 text-left transition-all",
        "hover:border-neon/60 hover:shadow-[0_0_18px_rgba(0,240,255,0.18)]",
        isCancelled
          ? "border-line/40 opacity-60"
          : isDone
            ? "border-line/60"
            : "border-line/60",
      )}
      aria-label={`${task.title} · ${fmtTime12(+new Date(task.startsAt))}`}
    >
      {/* Left accent stripe (category color) */}
      <span
        aria-hidden
        className={cn("absolute inset-y-0 left-0 w-1", accentBgSolid(cat.accent))}
      />
      {/* Priority pip on top-right */}
      <span
        aria-hidden
        className={cn(
          "absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full",
          accentBgSolid(prio.accent),
          task.priority === "P0" && "bl-flicker shadow-[0_0_6px_currentColor]",
        )}
        title={`${prio.label} priority`}
      />

      <div
        className={cn(
          "relative flex h-full flex-col",
          density === "dense" ? "gap-0.5 p-1.5 pl-2.5" : "gap-1 p-2 pl-3",
        )}
      >
        <div className="flex items-start gap-1.5">
          {isDone && (
            <span
              className="flex h-3.5 w-3.5 shrink-0 items-center justify-center border border-neon/60 bg-neon/15 text-neon"
              aria-label="Done"
            >
              <Check className="h-2.5 w-2.5" />
            </span>
          )}
          {isCancelled && (
            <span
              className="flex h-3.5 w-3.5 shrink-0 items-center justify-center border border-line/60 bg-void text-text-mute"
              aria-label="Cancelled"
            >
              <Lock className="h-2.5 w-2.5" />
            </span>
          )}
          {isInProgress && (
            <span
              className="flex h-3.5 w-3.5 shrink-0 items-center justify-center border border-electric/60 bg-electric/15 text-electric bl-flicker"
              aria-label="In progress"
            >
              <Clock3 className="h-2.5 w-2.5" />
            </span>
          )}
          <span
            className={cn(
              "min-w-0 truncate font-display font-bold leading-tight text-text",
              density === "dense" ? "text-[11px]" : "text-[12.5px]",
              isDone && "line-through decoration-neon/50 text-text-dim",
              isCancelled && "line-through text-text-mute",
            )}
          >
            {task.title}
          </span>
        </div>

        {!hideTime && (
          <div
            className={cn(
              "flex items-center gap-1.5 font-mono text-text-dim",
              density === "dense" ? "text-[9.5px]" : "text-[10.5px]",
            )}
          >
            <span className={accentText(cat.accent)}>{cat.short}</span>
            <span aria-hidden>·</span>
            <span>{fmtTime12(+new Date(task.startsAt))}</span>
          </div>
        )}
      </div>
    </button>
  )
}
