"use client"

import { useState } from "react"
import {
  FlaskConical,
  Terminal,
  History,
  Check,
  X,
  Clock,
  Lock,
  CircleAlert,
  ChevronUp,
  ChevronDown,
} from "lucide-react"
import { SUBMISSIONS, TEST_CASES, type Verdict } from "./workspace-data"

type Tab = "tests" | "console" | "history"

function VerdictPill({ v }: { v: Verdict }) {
  const map: Record<Verdict, { label: string; cls: string }> = {
    AC: {
      label: "AC",
      cls: "border-neon/50 bg-neon/10 text-neon shadow-[0_0_10px_rgba(0,240,255,0.25)]",
    },
    WA: { label: "WA", cls: "border-ember/60 bg-ember/10 text-ember" },
    TLE: { label: "TLE", cls: "border-gold/60 bg-gold/10 text-gold" },
    RE: { label: "RE", cls: "border-blood/60 bg-blood/10 text-blood" },
    PENDING: {
      label: "PEND",
      cls: "border-line/60 bg-void/40 text-text-mute",
    },
  }
  const s = map[v]
  return (
    <span
      className={`inline-flex items-center border px-1.5 py-0.5 font-display text-[9px] font-bold tracking-[0.18em] ${s.cls}`}
    >
      {s.label}
    </span>
  )
}

type Props = {
  collapsed: boolean
  onToggle: () => void
  running: boolean
}

export function ConsolePanel({ collapsed, onToggle, running }: Props) {
  const [tab, setTab] = useState<Tab>("tests")
  const [openCase, setOpenCase] = useState("T1")

  const totalPassed = TEST_CASES.filter((t) => t.status === "AC").length
  const totalRunnable = TEST_CASES.filter((t) => !t.hidden).length

  return (
    <section
      className={`relative flex flex-col border-t border-line/60 bg-void/70 backdrop-blur-md transition-all ${
        collapsed ? "h-10" : "h-[44vh] min-h-[260px]"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-10" />

      {/* Header + tabs */}
      <div className="relative flex items-center gap-0 border-b border-line/60 bg-panel/30">
        {(
          [
            { id: "tests", label: "Test Cases", icon: FlaskConical },
            { id: "console", label: "Console", icon: Terminal },
            { id: "history", label: "Submissions", icon: History },
          ] as const
        ).map(({ id, label, icon: Icon }) => {
          const active = tab === id
          return (
            <button
              key={id}
              onClick={() => {
                setTab(id)
                if (collapsed) onToggle()
              }}
              className={`relative flex items-center gap-1.5 border-r border-line/60 px-3.5 h-9 transition ${
                active ? "bg-panel/60" : "hover:bg-panel/30"
              }`}
            >
              <Icon
                className={`h-3 w-3 ${active ? "text-neon" : "text-text-mute"}`}
              />
              <span
                className={`font-display text-[10px] font-bold tracking-[0.2em] ${
                  active ? "text-text" : "text-text-dim"
                }`}
              >
                {label.toUpperCase()}
              </span>
              {id === "tests" && (
                <span className="ml-1 font-mono text-[9px] text-neon">
                  {totalPassed}/{totalRunnable}
                </span>
              )}
              {id === "history" && (
                <span className="ml-1 font-mono text-[9px] text-text-mute">
                  {SUBMISSIONS.length}
                </span>
              )}
              {active && (
                <span className="absolute inset-x-0 bottom-0 h-px bg-neon shadow-[0_0_8px_rgba(0,240,255,0.8)]" />
              )}
            </button>
          )
        })}

        {/* Running strip */}
        {running && !collapsed && (
          <div className="ml-3 flex items-center gap-2">
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-neon/60 blur-[2px]" />
              <span className="relative h-2 w-2 rounded-full bg-neon bl-flicker" />
            </span>
            <span className="font-mono text-[10px] tracking-[0.18em] text-neon">
              EXECUTING ON SANDBOX
            </span>
          </div>
        )}

        {/* Collapse */}
        <button
          onClick={onToggle}
          className="ml-auto flex h-9 w-9 items-center justify-center text-text-mute transition hover:text-neon"
          aria-label={collapsed ? "Expand console" : "Collapse console"}
        >
          {collapsed ? (
            <ChevronUp className="h-3.5 w-3.5" />
          ) : (
            <ChevronDown className="h-3.5 w-3.5" />
          )}
        </button>
      </div>

      {!collapsed && (
        <div className="relative flex-1 overflow-hidden">
          {tab === "tests" && (
            <div className="flex h-full">
              {/* Left: test case list */}
              <ul className="w-48 shrink-0 overflow-y-auto border-r border-line/60 bg-void/40">
                {TEST_CASES.map((tc) => {
                  const active = openCase === tc.id
                  return (
                    <li key={tc.id}>
                      <button
                        onClick={() => setOpenCase(tc.id)}
                        disabled={tc.hidden}
                        className={`flex w-full items-center gap-2 border-b border-line/40 px-3 py-2 text-left transition ${
                          active
                            ? "bg-panel/60"
                            : "hover:bg-panel/30 disabled:opacity-60"
                        }`}
                      >
                        {tc.hidden ? (
                          <Lock className="h-3 w-3 text-text-mute" />
                        ) : tc.status === "AC" ? (
                          <span className="inline-flex h-4 w-4 items-center justify-center bg-neon/20 border border-neon/50 text-neon">
                            <Check className="h-2.5 w-2.5" />
                          </span>
                        ) : tc.status === "PENDING" ? (
                          <span className="inline-flex h-4 w-4 items-center justify-center border border-line/60 text-text-mute">
                            <Clock className="h-2.5 w-2.5" />
                          </span>
                        ) : (
                          <span className="inline-flex h-4 w-4 items-center justify-center bg-ember/20 border border-ember/50 text-ember">
                            <X className="h-2.5 w-2.5" />
                          </span>
                        )}
                        <span className="font-mono text-[11px] text-text">
                          {tc.id}
                        </span>
                        <span className="ml-auto">
                          <VerdictPill v={tc.status} />
                        </span>
                      </button>
                    </li>
                  )
                })}
                <li className="px-3 py-2">
                  <button className="flex w-full items-center gap-2 border border-dashed border-line/60 bg-void/40 px-2 py-1.5 font-mono text-[10px] text-text-mute transition hover:border-neon/40 hover:text-neon">
                    <span>+ Add custom case</span>
                  </button>
                </li>
              </ul>

              {/* Right: case detail */}
              <div className="flex-1 overflow-y-auto p-4">
                {(() => {
                  const tc =
                    TEST_CASES.find((t) => t.id === openCase) ?? TEST_CASES[0]
                  if (tc.hidden) {
                    return (
                      <div className="flex h-full flex-col items-center justify-center gap-2 py-8">
                        <Lock className="h-5 w-5 text-text-mute" />
                        <p className="font-display text-[11px] font-bold tracking-[0.22em] text-text-mute">
                          HIDDEN TEST
                        </p>
                        <p className="max-w-xs text-center font-mono text-[11px] text-text-mute/80">
                          Edge cases are revealed only after final submission.
                        </p>
                      </div>
                    )
                  }
                  return (
                    <div className="grid gap-3 md:grid-cols-3">
                      <div>
                        <div className="mb-1 flex items-center justify-between">
                          <span className="font-display text-[9px] font-bold tracking-[0.24em] text-text-mute">
                            INPUT
                          </span>
                          {tc.runtimeMs != null && (
                            <span className="font-mono text-[9px] text-text-mute">
                              {tc.runtimeMs}ms
                            </span>
                          )}
                        </div>
                        <pre className="border-l-2 border-neon/50 bg-void/80 px-2.5 py-2 font-mono text-[11.5px] text-text whitespace-pre-wrap">
                          {tc.input}
                        </pre>
                      </div>
                      <div>
                        <div className="mb-1 font-display text-[9px] font-bold tracking-[0.24em] text-text-mute">
                          EXPECTED
                        </div>
                        <pre className="border-l-2 border-gold/50 bg-void/80 px-2.5 py-2 font-mono text-[11.5px] text-gold">
                          {tc.expected}
                        </pre>
                      </div>
                      <div>
                        <div className="mb-1 flex items-center justify-between">
                          <span className="font-display text-[9px] font-bold tracking-[0.24em] text-text-mute">
                            YOUR OUTPUT
                          </span>
                          <VerdictPill v={tc.status} />
                        </div>
                        <pre
                          className={`border-l-2 bg-void/80 px-2.5 py-2 font-mono text-[11.5px] whitespace-pre-wrap ${
                            tc.status === "AC"
                              ? "border-neon/50 text-neon"
                              : "border-ember/60 text-ember"
                          }`}
                        >
                          {tc.actual ?? "—"}
                        </pre>
                        {tc.memoryKb != null && (
                          <div className="mt-2 flex items-center gap-3 font-mono text-[9px] text-text-mute">
                            <span>MEM · {(tc.memoryKb / 1024).toFixed(1)} MB</span>
                            <span>RT · {tc.runtimeMs}ms</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })()}
              </div>
            </div>
          )}

          {tab === "console" && (
            <div className="h-full overflow-y-auto bg-[#040811] p-4 font-mono text-[11.5px] leading-relaxed">
              <div className="space-y-0.5 text-text">
                <p className="text-text-mute">
                  <span className="text-neon">[ sandbox ]</span> warming runtime
                  python-3.11.4 ...
                </p>
                <p className="text-text-mute">
                  <span className="text-neon">[ sandbox ]</span> resolved modules
                  in 34ms
                </p>
                <p>
                  <span className="text-gold">&gt;</span> Running{" "}
                  <span className="text-neon">solution.py</span> with 4 cases
                </p>
                <p className="text-text-dim">────────────────────────────────</p>
                <p className="text-neon">[T1] PASS — 3 == 3 (14ms · 8.1MB)</p>
                <p className="text-neon">[T2] PASS — 1 == 1 (11ms · 7.8MB)</p>
                <p className="text-neon">[T3] PASS — 4 == 4 (9ms · 7.6MB)</p>
                <p className="text-neon">[T4] PASS — 42318 == 42318 (188ms · 12.4MB)</p>
                <p className="text-text-dim">────────────────────────────────</p>
                <p className="text-gold">
                  <span className="text-text-mute">[ verdict ]</span> 4/4 passed ·
                  aggregate 222ms
                </p>
                <p className="text-text-mute">
                  <span className="text-neon">[ sandbox ]</span> runtime stopped.
                </p>
                <p className="mt-2 flex items-center">
                  <span className="text-neon">root@bl-arena</span>
                  <span className="text-text-mute">:</span>
                  <span className="text-ember">~/battle</span>
                  <span className="text-text-mute">$ </span>
                  <span className="ml-0.5 inline-block w-[7px] h-[13px] bg-neon shadow-[0_0_6px_rgba(0,240,255,0.7)] bl-flicker" />
                </p>
              </div>
            </div>
          )}

          {tab === "history" && (
            <div className="h-full overflow-y-auto">
              <table className="w-full text-left">
                <thead className="sticky top-0 bg-panel/80 backdrop-blur-md">
                  <tr className="border-b border-line/60 text-text-mute">
                    {[
                      "#",
                      "TIME",
                      "LANG",
                      "VERDICT",
                      "PASSED",
                      "RUNTIME",
                      "MEMORY",
                    ].map((h) => (
                      <th
                        key={h}
                        className="px-3 py-2 font-display text-[9px] font-bold tracking-[0.22em]"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {SUBMISSIONS.map((s) => (
                    <tr
                      key={s.id}
                      className="border-b border-line/40 transition hover:bg-panel/40"
                    >
                      <td className="px-3 py-2 font-mono text-[11px] text-text">
                        {s.id}
                      </td>
                      <td className="px-3 py-2 font-mono text-[11px] text-text-dim">
                        T-{s.time}
                      </td>
                      <td className="px-3 py-2 font-mono text-[11px] text-text-dim">
                        {s.lang}
                      </td>
                      <td className="px-3 py-2">
                        <VerdictPill v={s.verdict} />
                      </td>
                      <td className="px-3 py-2 font-mono text-[11px] text-text">
                        {s.passed}/{s.total}
                      </td>
                      <td className="px-3 py-2 font-mono text-[11px] text-text-dim">
                        {s.runtimeMs ? `${s.runtimeMs}ms` : "—"}
                      </td>
                      <td className="px-3 py-2 font-mono text-[11px] text-text-dim">
                        {s.memoryKb ? `${(s.memoryKb / 1024).toFixed(1)}MB` : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="border-t border-line/60 bg-void/40 px-3 py-2">
                <div className="flex items-center gap-2 font-mono text-[10px] text-text-mute">
                  <CircleAlert className="h-3 w-3 text-ember" />
                  <span>
                    Max{" "}
                    <span className="text-ember">3 penalty-free submissions</span>{" "}
                    per round — then{" "}
                    <span className="text-ember">−2 LP</span> each.
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  )
}
