"use client"

import { useEffect, useState } from "react"
import { WorkspaceHud } from "@/components/battle/workspace/workspace-hud"
import { OpponentTicker } from "@/components/battle/workspace/opponent-ticker"
import { ProblemPanel } from "@/components/battle/workspace/problem-panel"
import { CodeEditor } from "@/components/battle/workspace/code-editor"
import { EditorToolbar } from "@/components/battle/workspace/editor-toolbar"
import { ConsolePanel } from "@/components/battle/workspace/console-panel"
import { StatusBar } from "@/components/battle/workspace/status-bar"
import { VerdictOverlay } from "@/components/battle/workspace/verdict-overlay"
import { OPPONENTS, TEAMMATE, type Verdict } from "@/components/battle/workspace/workspace-data"

// Cycle submission verdicts on repeated clicks for demo flavor
const VERDICT_CYCLE: Verdict[] = ["AC", "WA", "TLE", "RE"]

export default function WorkspacePage() {
  const [problemCollapsed, setProblemCollapsed] = useState(false)
  const [consoleCollapsed, setConsoleCollapsed] = useState(false)
  const [running, setRunning] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [verdict, setVerdict] = useState<Verdict | null>(null)
  const [verdictIdx, setVerdictIdx] = useState(0)

  // Keyboard shortcuts — ⌘↵ to run, ⌘⇧↵ to submit, ⌘B to toggle problem
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const meta = e.metaKey || e.ctrlKey
      if (meta && e.key === "Enter" && e.shiftKey) {
        e.preventDefault()
        handleSubmit()
      } else if (meta && e.key === "Enter") {
        e.preventDefault()
        handleRun()
      } else if (meta && e.key.toLowerCase() === "b") {
        e.preventDefault()
        setProblemCollapsed((c) => !c)
      } else if (meta && e.key.toLowerCase() === "j") {
        e.preventDefault()
        setConsoleCollapsed((c) => !c)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleRun() {
    if (running) return
    setRunning(true)
    setConsoleCollapsed(false)
    setTimeout(() => setRunning(false), 1400)
  }

  function handleSubmit() {
    if (submitting) return
    setSubmitting(true)
    setTimeout(() => {
      const v = VERDICT_CYCLE[verdictIdx % VERDICT_CYCLE.length]
      setVerdict(v)
      setVerdictIdx((i) => i + 1)
      setSubmitting(false)
    }, 1500)
  }

  return (
    <div className="bl-phase-in flex h-screen w-screen flex-col overflow-hidden bg-void text-text font-sans">
      <WorkspaceHud />
      <OpponentTicker teammate={TEAMMATE} opponents={OPPONENTS} />

      {/* Main workspace — 2 panels */}
      <main className="relative flex min-h-0 flex-1 overflow-hidden">
        <ProblemPanel
          collapsed={problemCollapsed}
          onToggle={() => setProblemCollapsed((c) => !c)}
        />

        {/* Editor + console */}
        <div className="flex min-h-0 flex-1 flex-col">
          <EditorToolbar
            onRun={handleRun}
            onSubmit={handleSubmit}
            running={running}
            submitting={submitting}
          />

          <div className="relative min-h-0 flex-1">
            <CodeEditor />
            {/* Running scanner over editor */}
            {running && (
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div
                  className="absolute inset-x-0 h-16"
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent, rgba(0,240,255,0.08), transparent)",
                    animation: "bl-scan-y 1.4s linear infinite",
                  }}
                />
                <style>{`@keyframes bl-scan-y { 0% { top: -10%; } 100% { top: 110%; } }`}</style>
              </div>
            )}
          </div>

          <ConsolePanel
            collapsed={consoleCollapsed}
            onToggle={() => setConsoleCollapsed((c) => !c)}
            running={running}
          />
        </div>
      </main>

      <StatusBar />

      <VerdictOverlay
        verdict={verdict}
        onClose={() => setVerdict(null)}
        passed={verdict === "AC" ? 4 : verdict === "WA" ? 2 : verdict === "TLE" ? 3 : 0}
        total={4}
      />
    </div>
  )
}
