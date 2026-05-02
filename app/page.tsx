import { Sidebar } from "@/components/dashboard/sidebar"
import { TopBar } from "@/components/dashboard/top-bar"
import { WelcomeHero } from "@/components/dashboard/welcome-hero"
import { StatsRow } from "@/components/dashboard/stats-row"
import { RecommendedStep } from "@/components/dashboard/recommended-step"
import { LevelProgress } from "@/components/dashboard/level-progress"
import { InterviewReadiness } from "@/components/dashboard/interview-readiness"
import { LearningPath } from "@/components/dashboard/learning-path"
import { RivalsNearby } from "@/components/dashboard/rivals-nearby"
import { DailyGoals } from "@/components/dashboard/daily-goals"
import { SpacedRepetition } from "@/components/dashboard/spaced-repetition"
import { AreasToImprove } from "@/components/dashboard/areas-to-improve"
import { RevisionQueue } from "@/components/dashboard/revision-queue"
import { StartSolving } from "@/components/dashboard/start-solving"
import { MentorDashboardCard } from "@/components/mentor/mentor-dashboard-card"

export default function Page() {
  return (
    <div className="flex min-h-screen w-full bg-void">
      {/* Global ambient lights */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[420px] w-[1200px] bg-electric/10 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] bg-neon/5 blur-3xl rounded-full" />
      </div>

      <Sidebar />

      <div className="relative flex-1 flex flex-col min-w-0">
        <TopBar />

        <main className="relative flex-1 p-6 lg:p-8">
          {/* Decorative corner marks */}
          <div className="pointer-events-none absolute top-2 left-2 h-4 w-4 border-t border-l border-neon/40" />
          <div className="pointer-events-none absolute top-2 right-2 h-4 w-4 border-t border-r border-neon/40" />

          {/* 12-col grid: main (8) + right rail (4) */}
          <div className="grid grid-cols-12 gap-6">
            {/* ============== MAIN COLUMN ============== */}
            <div className="col-span-12 xl:col-span-8 flex flex-col gap-6 min-w-0">
              <WelcomeHero />

              <StatsRow />

              <RecommendedStep />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <LevelProgress />
                <InterviewReadiness />
              </div>

              <LearningPath />

              <StartSolving />
            </div>

            {/* ============== RIGHT RAIL ============== */}
            <aside className="col-span-12 xl:col-span-4 flex flex-col gap-6 min-w-0">
              <MentorDashboardCard />
              <DailyGoals />
              <RivalsNearby />
              <SpacedRepetition />
              <AreasToImprove />
              <RevisionQueue />
            </aside>
          </div>

          {/* Footer strip */}
          <div className="mt-10 flex items-center gap-3">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-line to-transparent" />
            <span className="font-mono text-[10px] tracking-[0.3em] text-text-mute">
              CODETRACKX // EGOIST PROTOCOL v0.1 // 04.21.2026
            </span>
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-line to-transparent" />
          </div>
        </main>
      </div>
    </div>
  )
}
