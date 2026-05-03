import { Sidebar } from "@/components/dashboard/sidebar"
import { TopBar } from "@/components/dashboard/top-bar"
import { HallHeader } from "@/components/championship/hall-header"
import { HallGrid } from "@/components/championship/hall-grid"

export default function HallOfChampionsPage() {
  return (
    <div className="flex min-h-screen w-full bg-void text-text">
      {/* Global ambient — shifted to gold/ember for the Hall */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-0 left-1/2 h-[420px] w-[1100px] -translate-x-1/2 rounded-full bg-gold/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-[500px] w-[500px] rounded-full bg-ember/5 blur-3xl" />
      </div>

      <Sidebar />

      <div className="relative flex min-w-0 flex-1 flex-col">
        <TopBar title="Hall of Champions" sector="015_HALL_OF_CHAMPIONS" />

        <main className="relative flex-1 px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
          <div className="mx-auto max-w-[1280px] space-y-6">
            <HallHeader />
            <HallGrid />

            {/* Footer mark */}
            <div className="mt-10 flex items-center gap-3">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
              <span className="font-mono text-[10px] tracking-[0.3em] text-gold/70">
                FOREVER ENSHRINED // CODETRACKX HALL OF CHAMPIONS
              </span>
              <span className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
