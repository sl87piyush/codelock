"use client"

import {
  GitBranch,
  Wifi,
  Cpu,
  Circle,
  MessageSquare,
  Command,
} from "lucide-react"

export function StatusBar() {
  return (
    <footer className="relative z-20 flex items-center gap-4 border-t border-line/60 bg-panel/50 px-3 h-7 backdrop-blur">
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-15" />

      <div className="relative flex items-center gap-1.5 border-r border-line/60 pr-3">
        <GitBranch className="h-3 w-3 text-text-mute" />
        <span className="font-mono text-[10px] text-text-dim">
          battle/BL-A7X-4429
        </span>
      </div>

      <div className="relative flex items-center gap-3 font-mono text-[10px] text-text-mute">
        <span className="flex items-center gap-1">
          <Circle className="h-2 w-2 fill-neon text-neon" />
          Synced
        </span>
        <span>UTF-8</span>
        <span>LF</span>
        <span>Spaces: 4</span>
        <span className="text-neon">Python 3.11</span>
      </div>

      <div className="ml-auto flex items-center gap-3 font-mono text-[10px] text-text-mute">
        <span className="flex items-center gap-1">
          <Cpu className="h-3 w-3" />
          <span className="text-neon">sandbox-3</span>
        </span>
        <span className="flex items-center gap-1">
          <Wifi className="h-3 w-3 text-neon" />
          <span>28ms</span>
        </span>
        <span className="flex items-center gap-1">
          <MessageSquare className="h-3 w-3 text-ember" />
          <span className="text-ember">ally typing…</span>
        </span>
        <span className="flex items-center gap-1">
          <Command className="h-3 w-3" />
          <span>⌘K shortcuts</span>
        </span>
      </div>
    </footer>
  )
}
