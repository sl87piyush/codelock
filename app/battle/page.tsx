"use client"

import { useState } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { TopBar } from "@/components/dashboard/top-bar"
import { BattleHeader } from "@/components/battle/battle-header"
import { RoundTrack } from "@/components/battle/round-track"
import { TeamPanel } from "@/components/battle/team-panel"
import { ProblemBrief } from "@/components/battle/problem-brief"
import { LiveFeed } from "@/components/battle/live-feed"
import { OutcomeProjection } from "@/components/battle/outcome-projection"
import { MatchStats } from "@/components/battle/match-stats"
import { BattleActions } from "@/components/battle/battle-actions"
import { PhaseToggle, type BattlePhase } from "@/components/battle/phase-toggle"
import { LobbyHeader } from "@/components/battle/pre-battle/lobby-header"
import { ReadyRoster } from "@/components/battle/pre-battle/ready-roster"
import { MatchBriefing } from "@/components/battle/pre-battle/match-briefing"
import { CountdownLauncher } from "@/components/battle/pre-battle/countdown-launcher"
import { ResultBanner } from "@/components/battle/post-battle/result-banner"
import { FinalScoreboard } from "@/components/battle/post-battle/final-scoreboard"
import { PlayerStatsTable } from "@/components/battle/post-battle/player-stats-table"
import { LpSummary } from "@/components/battle/post-battle/lp-summary"
import { PostActions } from "@/components/battle/post-battle/post-actions"
import { BLUE_TEAM, RED_TEAM } from "@/components/battle/battle-data"
import { EntryView } from "@/components/battle/entry/entry-view"

export default function BattlePage() {
  const [phase, setPhase] = useState<BattlePhase>("entry")

  const sectorLabel =
    phase === "entry"
      ? "007_ENTRY"
      : phase === "pre"
        ? "007_LOBBY"
        : phase === "live"
          ? "007_DUO_BATTLE"
          : "007_RESULT"
  const titleLabel =
    phase === "entry"
      ? "Battle Entry"
      : phase === "pre"
        ? "Match Lobby"
        : phase === "live"
          ? "Battle Arena"
          : "Battle Result"

  return (
    <div className="flex min-h-screen bg-void">
      <Sidebar />

      <div className="relative flex-1 min-w-0">
        {/* Ambient orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 left-1/3 h-[520px] w-[520px] rounded-full bg-electric/10 blur-3xl bl-float-slow" />
          <div className="absolute top-1/3 -right-24 h-[460px] w-[460px] rounded-full bg-ember/10 blur-3xl bl-float-slower" />
          <div className="absolute bottom-0 left-10 h-[360px] w-[360px] rounded-full bg-neon/10 blur-3xl bl-float-slow" />
        </div>

        <TopBar title={titleLabel} sector={sectorLabel} />

        <main className="relative px-4 py-6 md:px-6 lg:px-8 lg:py-8">
          <div className="mx-auto flex max-w-[1440px] flex-col gap-5">
            <PhaseToggle phase={phase} onChange={setPhase} />

            {phase === "entry" && (
              <EntryView onMatchFound={() => setPhase("pre")} />
            )}
            {phase === "pre" && (
              <PreBattleView onLaunch={() => setPhase("live")} />
            )}
            {phase === "live" && (
              <LiveBattleView />
            )}
            {phase === "post" && (
              <PostBattleView onRematch={() => setPhase("entry")} />
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

/* === PRE-BATTLE === */
function PreBattleView({ onLaunch }: { onLaunch: () => void }) {
  return (
    <div key="pre" className="flex flex-col gap-5 bl-phase-in">
      <LobbyHeader />
      <ReadyRoster blue={BLUE_TEAM} red={RED_TEAM} />
      <section className="grid grid-cols-1 gap-5 lg:grid-cols-[1.4fr_1fr]">
        <MatchBriefing />
        <CountdownLauncher onLaunch={onLaunch} />
      </section>
    </div>
  )
}

/* === LIVE BATTLE === */
function LiveBattleView() {
  return (
    <div key="live" className="flex flex-col gap-5 bl-phase-in">
      <BattleHeader />
      <RoundTrack />
      <section className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_380px_1fr]">
        <TeamPanel team={BLUE_TEAM} align="left" />
        <ProblemBrief />
        <TeamPanel team={RED_TEAM} align="right" />
      </section>
      <section className="grid grid-cols-1 gap-5 lg:grid-cols-[1.2fr_1fr]">
        <LiveFeed />
        <div className="flex flex-col gap-5">
          <OutcomeProjection />
          <MatchStats />
        </div>
      </section>
      <BattleActions />
    </div>
  )
}

/* === POST-BATTLE === */
function PostBattleView({ onRematch }: { onRematch: () => void }) {
  return (
    <div key="post" className="flex flex-col gap-5 bl-phase-in">
      <ResultBanner />
      <section className="grid grid-cols-1 gap-5 lg:grid-cols-[1.2fr_1fr]">
        <FinalScoreboard />
        <LpSummary />
      </section>
      <PlayerStatsTable blueTeam={BLUE_TEAM} redTeam={RED_TEAM} />
      <PostActions onRematch={onRematch} />
    </div>
  )
}
