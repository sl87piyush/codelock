import { AlertTriangle, Eye, ChevronRight } from "lucide-react"

const areas = [
  {
    title: "Arrays",
    note: "Topic has been in progress for 7 days without completion.",
    tag: "WATCH",
  },
  {
    title: "Trees",
    note: "2 or more missed revisions. Review before continuing.",
    tag: "WATCH",
  },
]

export function AreasToImprove() {
  return (
    <div className="relative bl-glass overflow-hidden">
      <div className="p-5">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-ember" />
            <h3 className="font-display text-[14px] font-bold tracking-tight">
              Areas to Improve
            </h3>
          </div>
          <span className="flex h-6 w-6 items-center justify-center bg-ember/15 border border-ember/40 text-ember font-display text-[11px] font-bold">
            {areas.length}
          </span>
        </div>
        <p className="text-[12px] text-text-dim leading-snug">
          Rule-based analysis of your learning patterns.
        </p>

        <ul className="mt-4 flex flex-col gap-2">
          {areas.map((a) => (
            <li
              key={a.title}
              className="group relative border border-line/60 bg-void/40 p-3 hover:border-ember/40 hover:bg-ember/[0.04] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center border border-line bg-panel/60 group-hover:border-ember/50 group-hover:bg-ember/10 transition-colors">
                  <Eye className="h-4 w-4 text-text-dim group-hover:text-ember" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-display text-[14px] font-bold text-text">
                      {a.title}
                    </span>
                    <span className="inline-flex items-center px-1.5 py-0.5 bg-neon/10 border border-neon/30 text-neon font-display text-[9px] font-bold tracking-[0.18em]">
                      {a.tag}
                    </span>
                  </div>
                  <p className="text-[11.5px] text-text-dim truncate mt-0.5">
                    {a.note}
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 text-text-mute group-hover:text-ember transition-colors" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
