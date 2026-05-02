// Deterministic seed for SSR/CSR consistency.
// All demo dates are computed relative to this value.
export const NOW_SEED = Date.UTC(2026, 4, 2, 9, 0, 0) // May 2, 2026 09:00 UTC

export type Category =
  | "PRACTICE"
  | "BATTLE"
  | "CONTEST"
  | "OA"
  | "STUDY"
  | "HEALTH"
  | "PERSONAL"
  | "BUFFER"

export type Priority = "P0" | "P1" | "P2" | "P3"

export type Status = "TODO" | "IN_PROGRESS" | "DONE" | "CANCELLED"

export type Accent = "neon" | "electric" | "gold" | "ember" | "blood" | "mute"

export type PlannerTask = {
  id: string
  title: string
  description?: string
  category: Category
  priority: Priority
  status: Status
  startsAt: string // ISO
  endsAt: string // ISO
  allDay?: boolean
  location?: string
  tags?: string[]
  link?: string
}

// === Metadata =============================================================

export const CATEGORY_META: Record<
  Category,
  { label: string; accent: Accent; short: string }
> = {
  PRACTICE: { label: "Practice", accent: "neon", short: "PRC" },
  BATTLE: { label: "Battle", accent: "blood", short: "BTL" },
  CONTEST: { label: "Contest", accent: "gold", short: "CST" },
  OA: { label: "Mock OA", accent: "ember", short: "OA" },
  STUDY: { label: "Study", accent: "electric", short: "STD" },
  HEALTH: { label: "Health", accent: "neon", short: "HLT" },
  PERSONAL: { label: "Personal", accent: "gold", short: "PER" },
  BUFFER: { label: "Buffer", accent: "mute", short: "BUF" },
}

export const PRIORITY_META: Record<
  Priority,
  { label: string; accent: Accent; rank: number }
> = {
  P0: { label: "Critical", accent: "blood", rank: 0 },
  P1: { label: "High", accent: "ember", rank: 1 },
  P2: { label: "Medium", accent: "electric", rank: 2 },
  P3: { label: "Low", accent: "neon", rank: 3 },
}

export const STATUS_META: Record<Status, { label: string; accent: Accent }> = {
  TODO: { label: "To Do", accent: "mute" },
  IN_PROGRESS: { label: "In Progress", accent: "electric" },
  DONE: { label: "Done", accent: "neon" },
  CANCELLED: { label: "Cancelled", accent: "mute" },
}

// === Color class lookups (Tailwind needs literal class names) =============

export function accentText(a: Accent) {
  switch (a) {
    case "neon":
      return "text-neon"
    case "electric":
      return "text-electric"
    case "gold":
      return "text-gold"
    case "ember":
      return "text-ember"
    case "blood":
      return "text-blood"
    case "mute":
      return "text-text-mute"
  }
}

export function accentBg(a: Accent) {
  switch (a) {
    case "neon":
      return "bg-neon/15"
    case "electric":
      return "bg-electric/15"
    case "gold":
      return "bg-gold/15"
    case "ember":
      return "bg-ember/15"
    case "blood":
      return "bg-blood/15"
    case "mute":
      return "bg-text-mute/10"
  }
}

export function accentBgSolid(a: Accent) {
  switch (a) {
    case "neon":
      return "bg-neon"
    case "electric":
      return "bg-electric"
    case "gold":
      return "bg-gold"
    case "ember":
      return "bg-ember"
    case "blood":
      return "bg-blood"
    case "mute":
      return "bg-text-mute"
  }
}

export function accentBorder(a: Accent) {
  switch (a) {
    case "neon":
      return "border-neon/50"
    case "electric":
      return "border-electric/50"
    case "gold":
      return "border-gold/50"
    case "ember":
      return "border-ember/50"
    case "blood":
      return "border-blood/50"
    case "mute":
      return "border-text-mute/40"
  }
}

// === Date helpers (all UTC for SSR safety) =================================

const M = 60_000
const H = 3_600_000
const D = 86_400_000

export const minutes = (n: number) => n * M
export const hours = (n: number) => n * H
export const days = (n: number) => n * D

/** Build an ISO at NOW_SEED's date offset by `dayOffset`, at `hour:minute` UTC. */
export function dayAt(dayOffset: number, hour: number, minute = 0) {
  const base = new Date(NOW_SEED)
  base.setUTCHours(0, 0, 0, 0)
  return new Date(base.getTime() + days(dayOffset) + hours(hour) + minutes(minute)).toISOString()
}

/** Start of UTC day for a given ms timestamp. */
export function startOfDayUTC(ms: number) {
  const d = new Date(ms)
  d.setUTCHours(0, 0, 0, 0)
  return d.getTime()
}

/** Start of UTC week (Monday) for a given ms timestamp. */
export function startOfWeekUTC(ms: number) {
  const d = new Date(startOfDayUTC(ms))
  const dow = d.getUTCDay() // 0=Sun, 1=Mon, ..., 6=Sat
  const diff = (dow + 6) % 7 // days back to Monday
  return d.getTime() - diff * D
}

/** Start of UTC month for a given ms timestamp. */
export function startOfMonthUTC(ms: number) {
  const d = new Date(ms)
  return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1)
}

export function isSameUTCDay(a: number, b: number) {
  return startOfDayUTC(a) === startOfDayUTC(b)
}

const WEEKDAY_SHORT = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
const WEEKDAY_LONG = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]
const MONTH_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]
const MONTH_LONG = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export function fmtWeekdayShort(ms: number) {
  return WEEKDAY_SHORT[new Date(ms).getUTCDay()]
}
export function fmtWeekdayLong(ms: number) {
  return WEEKDAY_LONG[new Date(ms).getUTCDay()]
}
export function fmtMonthShort(ms: number) {
  return MONTH_SHORT[new Date(ms).getUTCMonth()]
}
export function fmtMonthLong(ms: number) {
  return MONTH_LONG[new Date(ms).getUTCMonth()]
}

export function fmtDayNumber(ms: number) {
  return new Date(ms).getUTCDate()
}

/** "Sat May 2" */
export function fmtShortDate(ms: number) {
  const d = new Date(ms)
  return `${WEEKDAY_SHORT[d.getUTCDay()].slice(0, 3)} ${MONTH_SHORT[d.getUTCMonth()]} ${d.getUTCDate()}`
}

/** "May 2, 2026" */
export function fmtMediumDate(ms: number) {
  const d = new Date(ms)
  return `${MONTH_SHORT[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`
}

/** "Saturday, May 2" */
export function fmtLongDate(ms: number) {
  const d = new Date(ms)
  return `${WEEKDAY_LONG[d.getUTCDay()]}, ${MONTH_LONG[d.getUTCMonth()]} ${d.getUTCDate()}`
}

/** "9:00 AM" — 12-hour, deterministic */
export function fmtTime12(ms: number) {
  const d = new Date(ms)
  let h = d.getUTCHours()
  const m = d.getUTCMinutes()
  const ampm = h >= 12 ? "PM" : "AM"
  h = h % 12
  if (h === 0) h = 12
  return `${h}:${m.toString().padStart(2, "0")} ${ampm}`
}

/** "09:00" — 24-hour */
export function fmtTime24(ms: number) {
  const d = new Date(ms)
  return `${d.getUTCHours().toString().padStart(2, "0")}:${d.getUTCMinutes().toString().padStart(2, "0")}`
}

export function durationMinutes(startsAt: string, endsAt: string) {
  return Math.max(0, Math.round((new Date(endsAt).getTime() - new Date(startsAt).getTime()) / M))
}

export function fmtDuration(mins: number) {
  if (mins < 60) return `${mins}m`
  const h = Math.floor(mins / 60)
  const m = mins % 60
  return m === 0 ? `${h}h` : `${h}h ${m}m`
}

// Range labels for the view header
export function fmtWeekRange(weekStartMs: number) {
  const start = new Date(weekStartMs)
  const end = new Date(weekStartMs + 6 * D)
  const sameMonth = start.getUTCMonth() === end.getUTCMonth()
  const sameYear = start.getUTCFullYear() === end.getUTCFullYear()
  if (sameMonth) {
    return `${MONTH_SHORT[start.getUTCMonth()]} ${start.getUTCDate()} – ${end.getUTCDate()}, ${start.getUTCFullYear()}`
  }
  if (sameYear) {
    return `${MONTH_SHORT[start.getUTCMonth()]} ${start.getUTCDate()} – ${MONTH_SHORT[end.getUTCMonth()]} ${end.getUTCDate()}, ${start.getUTCFullYear()}`
  }
  return `${MONTH_SHORT[start.getUTCMonth()]} ${start.getUTCDate()}, ${start.getUTCFullYear()} – ${MONTH_SHORT[end.getUTCMonth()]} ${end.getUTCDate()}, ${end.getUTCFullYear()}`
}

export function fmtMonthRange(monthStartMs: number) {
  const d = new Date(monthStartMs)
  return `${MONTH_LONG[d.getUTCMonth()]} ${d.getUTCFullYear()}`
}

// === Demo tasks ===========================================================
//
// All times are UTC.  We use NOW_SEED = May 2, 2026 (Saturday).
// dayOffset 0 = today (May 2).
//
// Coverage spans the previous and next ~14 days plus a few items farther out
// so every view (day / week / month / list) renders meaningful content.

export const DEMO_TASKS: PlannerTask[] = [
  // ---- Yesterday (offset -1, May 1) ----
  {
    id: "tk-001",
    title: "Sliding Window mastery drill",
    description: "Solve 10 medium array problems with strict time budget.",
    category: "PRACTICE",
    priority: "P2",
    status: "DONE",
    startsAt: dayAt(-1, 8, 0),
    endsAt: dayAt(-1, 9, 30),
    tags: ["arrays", "two-pointers"],
  },
  {
    id: "tk-002",
    title: "DP study session — Knapsack patterns",
    category: "STUDY",
    priority: "P1",
    status: "DONE",
    startsAt: dayAt(-1, 14, 0),
    endsAt: dayAt(-1, 16, 0),
    tags: ["dp"],
    location: "Solo focus room",
  },
  {
    id: "tk-003",
    title: "Ranked Duo Battle vs Ego Crushers",
    category: "BATTLE",
    priority: "P0",
    status: "DONE",
    startsAt: dayAt(-1, 19, 30),
    endsAt: dayAt(-1, 20, 30),
  },

  // ---- Today (offset 0, May 2 — Saturday) ----
  {
    id: "tk-101",
    title: "Morning warm-up · 3 easy problems",
    description: "Quick fingers + algorithm reflexes before deep work.",
    category: "PRACTICE",
    priority: "P3",
    status: "DONE",
    startsAt: dayAt(0, 7, 0),
    endsAt: dayAt(0, 8, 0),
  },
  {
    id: "tk-102",
    title: "Graph algorithms deep-dive",
    description: "Dijkstra, Bellman-Ford, Floyd-Warshall — implement from scratch.",
    category: "STUDY",
    priority: "P1",
    status: "IN_PROGRESS",
    startsAt: dayAt(0, 9, 0),
    endsAt: dayAt(0, 11, 30),
    tags: ["graphs", "shortest-path"],
  },
  {
    id: "tk-103",
    title: "Stand-up sync with Lock-In Partner",
    category: "PERSONAL",
    priority: "P2",
    status: "TODO",
    startsAt: dayAt(0, 12, 0),
    endsAt: dayAt(0, 12, 30),
    location: "Voice channel #lockin-04",
  },
  {
    id: "tk-104",
    title: "Workout — push day",
    category: "HEALTH",
    priority: "P2",
    status: "TODO",
    startsAt: dayAt(0, 13, 0),
    endsAt: dayAt(0, 14, 0),
  },
  {
    id: "tk-105",
    title: "Mock OA · Google L4",
    description: "Full 90-min simulation with proctoring strict mode.",
    category: "OA",
    priority: "P0",
    status: "TODO",
    startsAt: dayAt(0, 15, 0),
    endsAt: dayAt(0, 16, 30),
    tags: ["google", "mock"],
  },
  {
    id: "tk-106",
    title: "Review OA performance · note weak spots",
    category: "STUDY",
    priority: "P1",
    status: "TODO",
    startsAt: dayAt(0, 17, 0),
    endsAt: dayAt(0, 17, 45),
  },
  {
    id: "tk-107",
    title: "Codeforces Round #921 (Div. 2)",
    description: "Live contest. Target: solve A, B, C cleanly.",
    category: "CONTEST",
    priority: "P1",
    status: "TODO",
    startsAt: dayAt(0, 19, 30),
    endsAt: dayAt(0, 21, 30),
    tags: ["codeforces", "live"],
  },
  {
    id: "tk-108",
    title: "Read · System Design Primer ch. 4",
    category: "STUDY",
    priority: "P3",
    status: "TODO",
    startsAt: dayAt(0, 22, 0),
    endsAt: dayAt(0, 22, 45),
  },

  // ---- Tomorrow (offset +1, Sun May 3) ----
  {
    id: "tk-201",
    title: "Recovery — light run + stretch",
    category: "HEALTH",
    priority: "P3",
    status: "TODO",
    startsAt: dayAt(1, 7, 30),
    endsAt: dayAt(1, 8, 30),
  },
  {
    id: "tk-202",
    title: "Trees & Tries patterns review",
    category: "PRACTICE",
    priority: "P2",
    status: "TODO",
    startsAt: dayAt(1, 10, 0),
    endsAt: dayAt(1, 12, 0),
    tags: ["trees", "tries"],
  },
  {
    id: "tk-203",
    title: "1:1 mentor session — career strategy",
    category: "PERSONAL",
    priority: "P1",
    status: "TODO",
    startsAt: dayAt(1, 14, 0),
    endsAt: dayAt(1, 15, 0),
  },
  {
    id: "tk-204",
    title: "Buffer / decompress",
    category: "BUFFER",
    priority: "P3",
    status: "TODO",
    startsAt: dayAt(1, 16, 0),
    endsAt: dayAt(1, 18, 0),
  },

  // ---- Mon May 4 ----
  {
    id: "tk-301",
    title: "Ranked Solo Battle queue",
    category: "BATTLE",
    priority: "P1",
    status: "TODO",
    startsAt: dayAt(2, 9, 0),
    endsAt: dayAt(2, 10, 30),
  },
  {
    id: "tk-302",
    title: "DP medium grind · 8 problems",
    category: "PRACTICE",
    priority: "P1",
    status: "TODO",
    startsAt: dayAt(2, 11, 0),
    endsAt: dayAt(2, 13, 0),
    tags: ["dp", "medium"],
  },
  {
    id: "tk-303",
    title: "Resume polish — recruiter feedback",
    category: "PERSONAL",
    priority: "P2",
    status: "TODO",
    startsAt: dayAt(2, 15, 0),
    endsAt: dayAt(2, 16, 0),
  },

  // ---- Tue May 5 ----
  {
    id: "tk-401",
    title: "Meta Phone Screen — mock interview",
    description: "45-min coding round simulation with peer.",
    category: "OA",
    priority: "P0",
    status: "TODO",
    startsAt: dayAt(3, 10, 0),
    endsAt: dayAt(3, 10, 45),
    tags: ["meta", "interview"],
  },
  {
    id: "tk-402",
    title: "Postmortem — Meta mock notes",
    category: "STUDY",
    priority: "P1",
    status: "TODO",
    startsAt: dayAt(3, 11, 0),
    endsAt: dayAt(3, 11, 45),
  },
  {
    id: "tk-403",
    title: "Workout — pull day",
    category: "HEALTH",
    priority: "P2",
    status: "TODO",
    startsAt: dayAt(3, 18, 0),
    endsAt: dayAt(3, 19, 0),
  },

  // ---- Wed May 6 ----
  {
    id: "tk-501",
    title: "Segment Tree implementation challenge",
    category: "PRACTICE",
    priority: "P1",
    status: "TODO",
    startsAt: dayAt(4, 9, 30),
    endsAt: dayAt(4, 12, 0),
    tags: ["segment-tree", "lazy"],
  },
  {
    id: "tk-502",
    title: "Championship qualifier match",
    category: "CONTEST",
    priority: "P0",
    status: "TODO",
    startsAt: dayAt(4, 19, 0),
    endsAt: dayAt(4, 21, 0),
    tags: ["championship", "qualifier"],
  },

  // ---- Thu May 7 ----
  {
    id: "tk-601",
    title: "Mock OA · Stripe SWE",
    category: "OA",
    priority: "P0",
    status: "TODO",
    startsAt: dayAt(5, 14, 0),
    endsAt: dayAt(5, 16, 0),
    tags: ["stripe"],
  },

  // ---- Fri May 8 ----
  {
    id: "tk-701",
    title: "Weekly retrospective + planning",
    category: "PERSONAL",
    priority: "P2",
    status: "TODO",
    startsAt: dayAt(6, 17, 0),
    endsAt: dayAt(6, 18, 0),
  },
  {
    id: "tk-702",
    title: "Friday-night Battle — Ranked Duo",
    category: "BATTLE",
    priority: "P1",
    status: "TODO",
    startsAt: dayAt(6, 21, 0),
    endsAt: dayAt(6, 22, 30),
  },

  // ---- Following week (offset +9, Mon) ----
  {
    id: "tk-801",
    title: "AlgoRumble Spring Open",
    category: "CONTEST",
    priority: "P0",
    status: "TODO",
    startsAt: dayAt(9, 18, 0),
    endsAt: dayAt(9, 21, 0),
    tags: ["championship"],
    allDay: false,
  },

  // ---- Far future ----
  {
    id: "tk-901",
    title: "Hall of Champions ceremony",
    category: "PERSONAL",
    priority: "P2",
    status: "TODO",
    startsAt: dayAt(20, 18, 0),
    endsAt: dayAt(20, 20, 0),
    allDay: false,
  },

  // ---- Past (offset -3, -5, -7) for completion stats ----
  {
    id: "tk-p01",
    title: "Heap & Priority Queue drill",
    category: "PRACTICE",
    priority: "P2",
    status: "DONE",
    startsAt: dayAt(-3, 9, 0),
    endsAt: dayAt(-3, 10, 30),
  },
  {
    id: "tk-p02",
    title: "Binary Search advanced",
    category: "PRACTICE",
    priority: "P1",
    status: "DONE",
    startsAt: dayAt(-3, 14, 0),
    endsAt: dayAt(-3, 16, 0),
  },
  {
    id: "tk-p03",
    title: "Mock OA · Amazon SDE",
    category: "OA",
    priority: "P0",
    status: "DONE",
    startsAt: dayAt(-5, 15, 0),
    endsAt: dayAt(-5, 16, 30),
  },
  {
    id: "tk-p04",
    title: "Recovery rest day",
    category: "HEALTH",
    priority: "P3",
    status: "DONE",
    startsAt: dayAt(-5, 9, 0),
    endsAt: dayAt(-5, 10, 0),
    allDay: true,
  },
  {
    id: "tk-p05",
    title: "Skipped: Late-night session",
    category: "STUDY",
    priority: "P3",
    status: "CANCELLED",
    startsAt: dayAt(-7, 22, 0),
    endsAt: dayAt(-7, 23, 30),
  },
]

// === Sort options =========================================================

export type SortKey = "DUE_ASC" | "DUE_DESC" | "PRIORITY" | "CATEGORY" | "STATUS"

export const SORT_OPTIONS: { id: SortKey; label: string }[] = [
  { id: "DUE_ASC", label: "Due date · Earliest" },
  { id: "DUE_DESC", label: "Due date · Latest" },
  { id: "PRIORITY", label: "Priority · Critical first" },
  { id: "CATEGORY", label: "Category · A → Z" },
  { id: "STATUS", label: "Status" },
]

export function sortTasks(tasks: PlannerTask[], key: SortKey) {
  const arr = [...tasks]
  switch (key) {
    case "DUE_ASC":
      arr.sort((a, b) => +new Date(a.startsAt) - +new Date(b.startsAt))
      break
    case "DUE_DESC":
      arr.sort((a, b) => +new Date(b.startsAt) - +new Date(a.startsAt))
      break
    case "PRIORITY":
      arr.sort(
        (a, b) =>
          PRIORITY_META[a.priority].rank - PRIORITY_META[b.priority].rank ||
          +new Date(a.startsAt) - +new Date(b.startsAt),
      )
      break
    case "CATEGORY":
      arr.sort((a, b) =>
        CATEGORY_META[a.category].label.localeCompare(CATEGORY_META[b.category].label),
      )
      break
    case "STATUS":
      arr.sort(
        (a, b) =>
          STATUS_RANK[a.status] - STATUS_RANK[b.status] ||
          +new Date(a.startsAt) - +new Date(b.startsAt),
      )
      break
  }
  return arr
}

const STATUS_RANK: Record<Status, number> = {
  IN_PROGRESS: 0,
  TODO: 1,
  DONE: 2,
  CANCELLED: 3,
}

// === Category quick-links for stats ========================================

export const CATEGORY_LIST: Category[] = [
  "PRACTICE",
  "BATTLE",
  "CONTEST",
  "OA",
  "STUDY",
  "HEALTH",
  "PERSONAL",
  "BUFFER",
]

export const PRIORITY_LIST: Priority[] = ["P0", "P1", "P2", "P3"]

export const STATUS_LIST: Status[] = ["TODO", "IN_PROGRESS", "DONE", "CANCELLED"]
