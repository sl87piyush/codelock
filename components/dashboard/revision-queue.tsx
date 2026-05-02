import { BookOpen, CheckCircle2 } from "lucide-react"

const items = [
  { title: "Two Sum", topic: "Arrays", due: "today" },
  { title: "Valid Parentheses", topic: "Stack", due: "tomorrow" },
  { title: "Reverse Linked List", topic: "Linked List", due: "2d" },
  { title: "Maximum Subarray", topic: "DP", due: "3d" },
]

export function RevisionQueue() {
  return (
    <div className="relative bl-glass overflow-hidden">
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-neon" />
            <h3 className="font-display text-[14px] font-bold tracking-tight">
              Revision Queue
            </h3>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 border border-neon/40 bg-neon/10 text-neon font-display text-[10px] font-bold tracking-[0.2em]">
            <span className="h-1.5 w-1.5 rounded-full bg-neon shadow-[0_0_8px_#00f0ff] bl-flicker" />
            {items.length} ACTIVE
          </span>
        </div>

        <ul className="flex flex-col gap-1.5">
          {items.map((it, i) => (
            <li
              key={it.title}
              className="group relative border border-line/60 bg-void/40 p-2.5 flex items-center gap-3 hover:border-neon/40 hover:bg-neon/[0.03] cursor-pointer transition-colors"
            >
              <span className="font-mono text-[10px] text-text-mute w-5 text-center">
                0{i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <div className="font-display text-[13px] font-semibold text-text truncate">
                  {it.title}
                </div>
                <div className="font-mono text-[10px] text-text-mute">
                  {it.topic}
                </div>
              </div>
              <span
                className={
                  it.due === "today"
                    ? "font-display text-[10px] font-bold tracking-[0.18em] text-ember"
                    : "font-display text-[10px] font-bold tracking-[0.18em] text-text-dim"
                }
              >
                {it.due.toUpperCase()}
              </span>
              <CheckCircle2 className="h-4 w-4 text-text-mute group-hover:text-neon transition-colors" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
