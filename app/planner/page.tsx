"use client"

import { useMemo, useState } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { TopBar } from "@/components/dashboard/top-bar"
import { PlannerHeader } from "@/components/planner/planner-header"
import { ViewSwitcher, type ViewMode } from "@/components/planner/view-switcher"
import { PlannerToolbar, DEFAULT_FILTERS, type FilterState } from "@/components/planner/planner-toolbar"
import { DayView } from "@/components/planner/views/day-view"
import { WeekView } from "@/components/planner/views/week-view"
import { MonthView } from "@/components/planner/views/month-view"
import { ListView } from "@/components/planner/views/list-view"
import { PlannerRail } from "@/components/planner/planner-rail"
import { TaskFormDrawer } from "@/components/planner/task-form-drawer"
import {
  DEMO_TASKS,
  NOW_SEED,
  type PlannerTask,
  sortTasks,
} from "@/components/planner/planner-data"

export default function PlannerPage() {
  const [tasks, setTasks] = useState<PlannerTask[]>(DEMO_TASKS)
  const [view, setView] = useState<ViewMode>("WEEK")
  const [cursor, setCursor] = useState<number>(NOW_SEED)
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS)
  const [drawerInitial, setDrawerInitial] = useState<
    { mode: "create"; seedAt?: number } | { mode: "edit"; task: PlannerTask } | null
  >(null)

  // === Filtering pipeline ===================================================
  const filteredTasks = useMemo(() => {
    let result = [...tasks]
    if (filters.search.trim()) {
      const q = filters.search.trim().toLowerCase()
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.description?.toLowerCase().includes(q) ||
          t.tags?.some((tag) => tag.toLowerCase().includes(q)) ||
          t.location?.toLowerCase().includes(q),
      )
    }
    if (filters.category !== "ALL") result = result.filter((t) => t.category === filters.category)
    if (filters.priority !== "ALL") result = result.filter((t) => t.priority === filters.priority)
    if (filters.status !== "ALL") result = result.filter((t) => t.status === filters.status)
    return sortTasks(result, filters.sort)
  }, [tasks, filters])

  // === Mutations ============================================================
  function handleCreate(seedAt?: number) {
    setDrawerInitial({ mode: "create", seedAt })
  }

  function handleEdit(task: PlannerTask) {
    setDrawerInitial({ mode: "edit", task })
  }

  function handleSave(saved: PlannerTask) {
    setTasks((prev) => {
      const exists = prev.some((t) => t.id === saved.id)
      return exists ? prev.map((t) => (t.id === saved.id ? saved : t)) : [...prev, saved]
    })
    setDrawerInitial(null)
  }

  function handleDelete(task: PlannerTask) {
    setTasks((prev) => prev.filter((t) => t.id !== task.id))
    setDrawerInitial(null)
  }

  function handleToggleDone(task: PlannerTask) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === task.id ? { ...t, status: t.status === "DONE" ? "TODO" : "DONE" } : t,
      ),
    )
  }

  return (
    <div className="flex min-h-screen w-full bg-void text-text">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar title="Planner" sector="009_PLANNER" />

        <main className="relative flex-1 px-6 py-6 lg:px-8 lg:py-8">
          <div className="pointer-events-none fixed inset-0 -z-10 bl-grid opacity-30" />

          <div className="mx-auto max-w-[1440px] space-y-5">
            <PlannerHeader tasks={tasks} />

            <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
              <div className="space-y-4">
                <ViewSwitcher
                  view={view}
                  onViewChange={setView}
                  cursor={cursor}
                  onCursorChange={setCursor}
                  onJumpToday={() => setCursor(NOW_SEED)}
                />

                <PlannerToolbar
                  filters={filters}
                  onChange={setFilters}
                  onCreate={() => handleCreate()}
                  taskCount={tasks.length}
                  filteredCount={filteredTasks.length}
                />

                {view === "DAY" && (
                  <DayView
                    cursor={cursor}
                    tasks={filteredTasks}
                    onSelectTask={handleEdit}
                    onCreate={handleCreate}
                  />
                )}
                {view === "WEEK" && (
                  <WeekView
                    cursor={cursor}
                    tasks={filteredTasks}
                    onSelectTask={handleEdit}
                    onCreate={handleCreate}
                  />
                )}
                {view === "MONTH" && (
                  <MonthView
                    cursor={cursor}
                    tasks={filteredTasks}
                    onSelectTask={handleEdit}
                    onSelectDay={(ms) => {
                      setCursor(ms)
                      setView("DAY")
                    }}
                  />
                )}
                {view === "LIST" && (
                  <ListView
                    tasks={filteredTasks}
                    onSelectTask={handleEdit}
                    onToggleDone={handleToggleDone}
                    onDelete={handleDelete}
                  />
                )}
              </div>

              <PlannerRail tasks={tasks} onSelectTask={handleEdit} />
            </div>
          </div>
        </main>
      </div>

      <TaskFormDrawer
        open={drawerInitial !== null}
        initial={drawerInitial}
        onClose={() => setDrawerInitial(null)}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </div>
  )
}
