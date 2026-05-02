"use client"

import { useEffect, useMemo, useState } from "react"
import type { Line } from "./workspace-data"
import { CODE_LINES } from "./workspace-data"

const TOKEN_STYLE: Record<string, string> = {
  kw: "text-[#ff6b9a]",
  str: "text-[#c3ffa8]",
  num: "text-[#ffb56b]",
  com: "text-[#4a6a80] italic",
  fn: "text-[#00f0ff]",
  op: "text-[#7a94a8]",
  var: "text-[#e4f4ff]",
  cls: "text-[#ffd27a]",
  dec: "text-[#ff6b9a]",
  ws: "",
}

function renderLine(line: Line) {
  return line.map((tok, i) => (
    <span key={i} className={TOKEN_STYLE[tok.t] ?? ""}>
      {tok.v}
    </span>
  ))
}

type Props = {
  activeLine?: number
  cursorCol?: number
}

export function CodeEditor({ activeLine = 14, cursorCol = 41 }: Props) {
  const [blink, setBlink] = useState(true)
  useEffect(() => {
    const id = setInterval(() => setBlink((b) => !b), 520)
    return () => clearInterval(id)
  }, [])

  // Build a minimap preview
  const minimap = useMemo(() => {
    return CODE_LINES.map((line) => {
      const width = Math.min(
        100,
        line.reduce((s, t) => s + t.v.length, 0) * 1.1,
      )
      return Math.max(width, line.length ? 4 : 0)
    })
  }, [])

  return (
    <div className="relative flex h-full w-full overflow-hidden bg-[#050912]">
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-10" />
      <div className="pointer-events-none absolute inset-0 bl-scanline opacity-60" />

      {/* Editor body */}
      <div className="relative flex-1 overflow-auto font-mono text-[13px] leading-[1.55]">
        {/* Column guide at 80 */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 bottom-0 w-px bg-line/40"
          style={{ left: "calc(3.5rem + 80ch * 0.6)" }}
        />

        <div className="min-w-max">
          {CODE_LINES.map((line, i) => {
            const isActive = i === activeLine
            return (
              <div
                key={i}
                className={`group relative flex items-start ${
                  isActive ? "bg-neon/[0.045]" : ""
                }`}
              >
                {/* Active line accent */}
                {isActive && (
                  <span className="absolute inset-y-0 left-0 w-[2px] bg-neon shadow-[0_0_10px_rgba(0,240,255,0.8)]" />
                )}

                {/* Line number */}
                <div
                  className={`sticky left-0 z-10 w-14 select-none border-r border-line/40 bg-[#050912] px-2 py-0.5 text-right font-mono text-[11px] tabular-nums ${
                    isActive ? "text-neon" : "text-text-mute/60"
                  }`}
                >
                  {String(i + 1).padStart(3, " ")}
                </div>

                {/* Line content */}
                <pre className="flex-1 whitespace-pre px-4 py-0.5">
                  {line.length === 0 ? (
                    <span> </span>
                  ) : (
                    renderLine(line)
                  )}
                  {isActive && (
                    <span
                      className={`inline-block w-[2px] h-[1.15em] -mb-[2px] align-middle bg-neon shadow-[0_0_10px_rgba(0,240,255,0.8)] ${
                        blink ? "opacity-100" : "opacity-10"
                      }`}
                      style={{ transform: "translateY(3px)" }}
                    />
                  )}
                </pre>
              </div>
            )
          })}

          {/* Ghost suggestion line */}
          <div className="relative flex items-start opacity-40">
            <div className="w-14 border-r border-line/40 px-2 py-0.5 text-right font-mono text-[11px] text-text-mute/50 tabular-nums">
              {String(CODE_LINES.length + 1).padStart(3, " ")}
            </div>
            <pre className="px-4 py-0.5 italic text-[#4a6a80]">
              {"        # return best  ← autocomplete suggestion (Tab)"}
            </pre>
          </div>
        </div>
      </div>

      {/* Minimap */}
      <div className="relative hidden w-20 border-l border-line/50 bg-void/60 py-2 md:block">
        <div className="pointer-events-none absolute inset-0 bl-grid opacity-10" />
        <div className="relative flex flex-col gap-[1px] px-2">
          {minimap.map((w, i) => {
            const isActive = i === activeLine
            return (
              <div
                key={i}
                className="h-[3px]"
                style={{
                  width: `${w}%`,
                  background: isActive
                    ? "rgba(0,240,255,0.9)"
                    : "rgba(150,180,200,0.25)",
                  boxShadow: isActive ? "0 0 6px rgba(0,240,255,0.7)" : "none",
                }}
              />
            )
          })}
        </div>
        {/* Viewport highlight */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 border-y border-neon/40 bg-neon/5"
          style={{
            top: `${Math.max(0, (activeLine - 3) * 5)}px`,
            height: "55px",
          }}
        />
      </div>

      {/* Floating help label */}
      <div className="pointer-events-none absolute bottom-3 left-20 hidden items-center gap-1.5 border border-line/60 bg-panel/70 px-2 py-1 font-mono text-[10px] text-text-mute backdrop-blur md:flex">
        <span>Line {activeLine + 1}, Col {cursorCol}</span>
        <span className="text-text-mute/50">·</span>
        <span className="text-neon">Python 3.11</span>
      </div>
    </div>
  )
}
