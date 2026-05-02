"use client"

import { useState } from "react"
import {
  Play,
  Send,
  RotateCcw,
  Wand2,
  ChevronDown,
  Keyboard,
  Maximize2,
  FileCode,
} from "lucide-react"
import { LANGUAGES } from "./workspace-data"

type Props = {
  onRun: () => void
  onSubmit: () => void
  running: boolean
  submitting: boolean
}

export function EditorToolbar({ onRun, onSubmit, running, submitting }: Props) {
  const [langOpen, setLangOpen] = useState(false)
  const [lang, setLang] = useState(LANGUAGES[0])

  return (
    <div className="relative z-20 flex items-center gap-2 border-b border-line/60 bg-panel/50 px-3 py-2 backdrop-blur-md">
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-15" />

      {/* File tab */}
      <div className="relative flex items-center gap-2 border border-neon/40 bg-void/60 px-2.5 h-7 bl-clip-chevron">
        <FileCode className="h-3 w-3 text-neon" />
        <span className="font-mono text-[11px] text-text">
          solution.{lang.ext}
        </span>
        <span className="ml-1 h-1.5 w-1.5 rounded-full bg-ember bl-flicker" />
      </div>

      {/* Language selector */}
      <div className="relative">
        <button
          onClick={() => setLangOpen((o) => !o)}
          className="relative flex items-center gap-1.5 border border-line/60 bg-void/60 px-2 h-7 font-mono text-[11px] text-text transition hover:border-neon/50"
        >
          {lang.label}
          <ChevronDown
            className={`h-3 w-3 text-text-mute transition ${
              langOpen ? "rotate-180 text-neon" : ""
            }`}
          />
        </button>
        {langOpen && (
          <div className="absolute left-0 top-[calc(100%+4px)] z-30 w-48 border border-line/70 bg-panel/95 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.7)]">
            <div className="border-b border-line/60 px-3 py-1.5 font-display text-[9px] font-bold tracking-[0.24em] text-text-mute">
              LANGUAGE
            </div>
            <ul className="max-h-64 overflow-y-auto py-1">
              {LANGUAGES.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => {
                      setLang(l)
                      setLangOpen(false)
                    }}
                    className={`flex w-full items-center justify-between px-3 py-1.5 text-left font-mono text-[11px] transition hover:bg-neon/10 ${
                      l.id === lang.id ? "text-neon" : "text-text-dim"
                    }`}
                  >
                    <span>{l.label}</span>
                    <span className="text-[9px] text-text-mute">
                      .{l.ext}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Format */}
      <button
        type="button"
        className="inline-flex items-center gap-1 border border-line/60 bg-void/50 px-2 h-7 font-mono text-[10px] text-text-dim transition hover:border-neon/50 hover:text-neon"
        title="Format (Shift+Alt+F)"
      >
        <Wand2 className="h-3 w-3" />
        FORMAT
      </button>

      {/* Reset */}
      <button
        type="button"
        className="inline-flex items-center gap-1 border border-line/60 bg-void/50 px-2 h-7 font-mono text-[10px] text-text-dim transition hover:border-ember/50 hover:text-ember"
        title="Reset to starter"
      >
        <RotateCcw className="h-3 w-3" />
        RESET
      </button>

      <div className="ml-auto flex items-center gap-2">
        <button
          type="button"
          className="inline-flex items-center gap-1 border border-line/60 bg-void/50 px-2 h-7 font-mono text-[10px] text-text-mute transition hover:border-neon/50 hover:text-neon"
          title="Keyboard shortcuts"
        >
          <Keyboard className="h-3 w-3" />
          <span className="hidden lg:inline">⌘K</span>
        </button>
        <button
          type="button"
          className="inline-flex items-center justify-center border border-line/60 bg-void/50 h-7 w-7 text-text-mute transition hover:border-neon/50 hover:text-neon"
          title="Fullscreen"
        >
          <Maximize2 className="h-3 w-3" />
        </button>

        <div className="h-5 w-px bg-line/60" />

        {/* Run */}
        <button
          type="button"
          onClick={onRun}
          disabled={running}
          className="group relative inline-flex items-center gap-1.5 border border-neon/50 bg-neon/10 px-3 h-8 font-display text-[11px] font-bold tracking-[0.18em] text-neon transition hover:bg-neon/20 hover:shadow-[0_0_18px_rgba(0,240,255,0.35)] disabled:opacity-60 bl-clip-chevron"
        >
          <span className="pointer-events-none absolute inset-0 overflow-hidden">
            <span className="bl-sweep absolute inset-0" />
          </span>
          <Play className={`h-3 w-3 ${running ? "animate-pulse" : ""}`} />
          {running ? "RUNNING…" : "RUN"}
          <span className="ml-1 hidden font-mono text-[9px] tracking-[0.12em] text-neon/60 lg:inline">
            ⌘↵
          </span>
        </button>

        {/* Submit */}
        <button
          type="button"
          onClick={onSubmit}
          disabled={submitting}
          className="bl-btn-primary bl-clip-notch inline-flex h-9 items-center gap-1.5 px-4 text-[11px] tracking-[0.18em] disabled:opacity-60"
        >
          <Send className={`h-3.5 w-3.5 ${submitting ? "animate-pulse" : ""}`} />
          {submitting ? "SUBMITTING" : "SUBMIT"}
          <span className="ml-1 hidden font-mono text-[9px] tracking-[0.12em] text-neon/70 lg:inline">
            ⌘⇧↵
          </span>
        </button>
      </div>
    </div>
  )
}
