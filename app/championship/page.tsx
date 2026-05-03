"use client"

import { useState } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { TopBar } from "@/components/dashboard/top-bar"
import { ChampionshipHeader } from "@/components/championship/championship-header"
import { TrackSelector } from "@/components/championship/track-selector"
import { SelectionPath } from "@/components/championship/selection-path"
import { LiveStandings } from "@/components/championship/live-standings"
import { ChampionshipRail } from "@/components/championship/championship-rail"
import type { Track, Lane } from "@/lib/championship-data"

export default function ChampionshipPage() {
  const [selectedTrack, setSelectedTrack] = useState<Track>("solo")
  const [selectedLane, setSelectedLane] = useState<Lane>("open")

  return (
    <div className="flex min-h-screen w-full bg-void text-text">
      {/* Global ambient lights */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-0 left-1/3 h-[420px] w-[1100px] -translate-x-1/2 rounded-full bg-ember/8 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-gold/5 blur-3xl" />
      </div>

      <Sidebar />

      <div className="relative flex min-w-0 flex-1 flex-col">
        <TopBar title="Championship" sector="014_CHAMPIONSHIP" />

        <main className="relative flex-1 px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
          <div className="mx-auto max-w-[1480px] space-y-6">
            <ChampionshipHeader />

            <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
              <div className="flex flex-col gap-6 min-w-0">
                <TrackSelector
                  selectedTrack={selectedTrack}
                  onSelectTrack={setSelectedTrack}
                  selectedLane={selectedLane}
                  onSelectLane={setSelectedLane}
                />

                <SelectionPath />

                <LiveStandings track={selectedTrack} />
              </div>

              <ChampionshipRail track={selectedTrack} />
            </div>

            {/* Footer mark */}
            <div className="mt-10 flex items-center gap-3">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent via-line to-transparent" />
              <span className="font-mono text-[10px] tracking-[0.3em] text-text-mute">
                CHAMPIONSHIP // INDIA 2026 // S03 // CODETRACKX
              </span>
              <span className="h-px flex-1 bg-gradient-to-r from-transparent via-line to-transparent" />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
