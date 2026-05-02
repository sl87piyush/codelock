export type AssessmentStatus =
  | "LIVE"
  | "SCHEDULED"
  | "AVAILABLE"
  | "COMPLETED"
  | "LOCKED"

export type AssessmentType =
  | "CODING"
  | "MIXED"
  | "MCQ"
  | "APTITUDE"
  | "SYSTEM_DESIGN"
  | "DEBUGGING"

export type Difficulty = "EASY" | "MEDIUM" | "HARD" | "EXPERT"

export type Tier = "INTERN" | "ENTRY" | "MID" | "SENIOR" | "STAFF"

export type Section = {
  name: string
  type: AssessmentType
  questions: number
  duration: number // minutes
  weight: number // 0..1
}

export type Assessment = {
  id: string
  company: string
  companyLogo: string // single-letter / glyph for fallback
  companyAccent: "neon" | "electric" | "gold" | "ember" | "blood"
  role: string
  tier: Tier
  type: AssessmentType
  difficulty: Difficulty
  duration: number // minutes total
  questions: number
  sections: Section[]
  topics: string[]
  status: AssessmentStatus
  startsAt: string
  endsAt: string
  windowEndsAt?: string // for AVAILABLE windowed OAs
  registered: number
  popularity: number // 0..100
  passingScore: number
  attempts: number // 0,1,2 used
  maxAttempts: number
  description: string
  prerequisites?: string[]
  rewards?: { type: "XP" | "LP" | "BADGE"; amount: number; label: string }[]
  // For COMPLETED:
  result?: {
    score: number // /100
    rank: number
    percentile: number
    cleared: boolean
    timeUsed: number // mins
    correct: number
    total: number
    sectionScores: { name: string; score: number }[]
    completedAt: string
  }
  // For LIVE:
  progress?: {
    currentSection: string
    answered: number
    total: number
    timeRemaining: number // mins
  }
  hostedBy?: string
  proctored: boolean
}

export const OA_TYPES: { id: AssessmentType | "ALL"; label: string }[] = [
  { id: "ALL", label: "All Types" },
  { id: "CODING", label: "Coding" },
  { id: "MIXED", label: "Mixed" },
  { id: "MCQ", label: "MCQ" },
  { id: "APTITUDE", label: "Aptitude" },
  { id: "SYSTEM_DESIGN", label: "System Design" },
  { id: "DEBUGGING", label: "Debugging" },
]

export const DIFFICULTIES: { id: Difficulty | "ALL"; label: string }[] = [
  { id: "ALL", label: "All" },
  { id: "EASY", label: "Easy" },
  { id: "MEDIUM", label: "Medium" },
  { id: "HARD", label: "Hard" },
  { id: "EXPERT", label: "Expert" },
]

export const SORT_OPTIONS = [
  { id: "DATE", label: "Date" },
  { id: "POPULARITY", label: "Popularity" },
  { id: "DURATION", label: "Duration" },
  { id: "DIFFICULTY", label: "Difficulty" },
] as const
export type SortKey = (typeof SORT_OPTIONS)[number]["id"]

export const STATUS_TABS: { id: AssessmentStatus | "ALL"; label: string }[] = [
  { id: "ALL", label: "All" },
  { id: "LIVE", label: "Live" },
  { id: "SCHEDULED", label: "Scheduled" },
  { id: "AVAILABLE", label: "Available" },
  { id: "COMPLETED", label: "Completed" },
]

export const NOW_SEED = Date.UTC(2026, 4, 2, 12, 0, 0)
const minutes = (m: number) => m * 60_000
const hours = (h: number) => h * 3_600_000
const days = (d: number) => d * 86_400_000
const iso = (offset: number) => new Date(NOW_SEED + offset).toISOString()

// ------------------- DEMO ASSESSMENTS -------------------

export const ASSESSMENTS: Assessment[] = [
  // -- LIVE --
  {
    id: "oa-001",
    company: "Google",
    companyLogo: "G",
    companyAccent: "electric",
    role: "Software Engineer L4",
    tier: "MID",
    type: "MIXED",
    difficulty: "HARD",
    duration: 120,
    questions: 6,
    sections: [
      { name: "Coding", type: "CODING", questions: 3, duration: 75, weight: 0.7 },
      { name: "MCQ — Systems", type: "MCQ", questions: 3, duration: 45, weight: 0.3 },
    ],
    topics: ["Graphs", "DP", "OS", "Concurrency"],
    status: "LIVE",
    startsAt: iso(-minutes(38)),
    endsAt: iso(minutes(82)),
    registered: 4287,
    popularity: 98,
    passingScore: 70,
    attempts: 1,
    maxAttempts: 1,
    description:
      "L4 SWE technical screen covering algorithmic problem solving and systems-level multiple choice. No external resources permitted.",
    rewards: [
      { type: "LP", amount: 120, label: "+120 LP" },
      { type: "BADGE", amount: 1, label: "Google Loop Pass" },
    ],
    progress: {
      currentSection: "Coding",
      answered: 2,
      total: 6,
      timeRemaining: 82,
    },
    hostedBy: "Google Hiring",
    proctored: true,
  },
  // -- SCHEDULED --
  {
    id: "oa-002",
    company: "Meta",
    companyLogo: "M",
    companyAccent: "electric",
    role: "Production Engineer",
    tier: "ENTRY",
    type: "CODING",
    difficulty: "MEDIUM",
    duration: 90,
    questions: 4,
    sections: [
      { name: "DSA", type: "CODING", questions: 2, duration: 45, weight: 0.5 },
      { name: "Debugging", type: "DEBUGGING", questions: 2, duration: 45, weight: 0.5 },
    ],
    topics: ["Arrays", "HashMaps", "Linux", "Networking"],
    status: "SCHEDULED",
    startsAt: iso(hours(6)),
    endsAt: iso(hours(7) + minutes(30)),
    registered: 6921,
    popularity: 95,
    passingScore: 65,
    attempts: 0,
    maxAttempts: 1,
    description:
      "Production Engineering coding round mixing data-structures with real-world Linux/networking debugging exercises.",
    rewards: [{ type: "LP", amount: 90, label: "+90 LP" }],
    hostedBy: "Meta Hiring",
    proctored: true,
  },
  {
    id: "oa-003",
    company: "Amazon",
    companyLogo: "A",
    companyAccent: "gold",
    role: "SDE-1 Universities",
    tier: "ENTRY",
    type: "MIXED",
    difficulty: "MEDIUM",
    duration: 105,
    questions: 5,
    sections: [
      { name: "Coding", type: "CODING", questions: 2, duration: 70, weight: 0.6 },
      { name: "Work Style", type: "MCQ", questions: 24, duration: 20, weight: 0.2 },
      { name: "Logical", type: "APTITUDE", questions: 12, duration: 15, weight: 0.2 },
    ],
    topics: ["Trees", "Greedy", "Leadership Principles"],
    status: "SCHEDULED",
    startsAt: iso(hours(28)),
    endsAt: iso(hours(29) + minutes(45)),
    registered: 12480,
    popularity: 96,
    passingScore: 60,
    attempts: 0,
    maxAttempts: 1,
    description:
      "Standard Amazon SDE-1 university OA: 2 coding problems plus behavioral and logical aptitude sections.",
    rewards: [
      { type: "LP", amount: 100, label: "+100 LP" },
      { type: "BADGE", amount: 1, label: "Amazon OA Pass" },
    ],
    hostedBy: "Amazon University",
    proctored: true,
  },
  {
    id: "oa-004",
    company: "Stripe",
    companyLogo: "S",
    companyAccent: "neon",
    role: "Backend Engineer",
    tier: "MID",
    type: "CODING",
    difficulty: "HARD",
    duration: 120,
    questions: 3,
    sections: [
      { name: "Integration", type: "CODING", questions: 1, duration: 45, weight: 0.4 },
      { name: "API Design", type: "CODING", questions: 1, duration: 45, weight: 0.4 },
      { name: "Idempotency", type: "CODING", questions: 1, duration: 30, weight: 0.2 },
    ],
    topics: ["HTTP", "Webhooks", "Idempotency", "Concurrency"],
    status: "SCHEDULED",
    startsAt: iso(days(2) + hours(3)),
    endsAt: iso(days(2) + hours(5)),
    registered: 1842,
    popularity: 88,
    passingScore: 75,
    attempts: 0,
    maxAttempts: 1,
    description:
      "Stripe-style payments backend round. Implement and extend a real API surface with strict correctness on retries and idempotency.",
    rewards: [
      { type: "LP", amount: 140, label: "+140 LP" },
      { type: "XP", amount: 800, label: "+800 XP" },
    ],
    hostedBy: "Stripe Recruiting",
    proctored: true,
  },
  // -- AVAILABLE --
  {
    id: "oa-005",
    company: "Microsoft",
    companyLogo: "M",
    companyAccent: "neon",
    role: "Software Engineer II",
    tier: "MID",
    type: "CODING",
    difficulty: "MEDIUM",
    duration: 90,
    questions: 3,
    sections: [{ name: "Coding", type: "CODING", questions: 3, duration: 90, weight: 1 }],
    topics: ["Arrays", "Strings", "DP"],
    status: "AVAILABLE",
    startsAt: iso(0),
    endsAt: iso(hours(1) + minutes(30)),
    windowEndsAt: iso(days(7)),
    registered: 8410,
    popularity: 91,
    passingScore: 65,
    attempts: 0,
    maxAttempts: 2,
    description:
      "Open-window OA mirroring real Microsoft Codility-style screens. Three problems, increasing difficulty.",
    rewards: [{ type: "LP", amount: 80, label: "+80 LP" }],
    hostedBy: "Microsoft Hiring",
    proctored: false,
  },
  {
    id: "oa-006",
    company: "Apple",
    companyLogo: "A",
    companyAccent: "gold",
    role: "iOS Engineer",
    tier: "MID",
    type: "MIXED",
    difficulty: "HARD",
    duration: 100,
    questions: 5,
    sections: [
      { name: "Swift", type: "CODING", questions: 2, duration: 60, weight: 0.5 },
      { name: "iOS Concepts", type: "MCQ", questions: 15, duration: 25, weight: 0.3 },
      { name: "System Design", type: "SYSTEM_DESIGN", questions: 1, duration: 15, weight: 0.2 },
    ],
    topics: ["Swift", "Concurrency", "ARC", "UIKit", "SwiftUI"],
    status: "AVAILABLE",
    startsAt: iso(0),
    endsAt: iso(hours(1) + minutes(40)),
    windowEndsAt: iso(days(5)),
    registered: 2238,
    popularity: 84,
    passingScore: 70,
    attempts: 1,
    maxAttempts: 2,
    description:
      "Production iOS engineer screen — Swift problem-solving, concept MCQs, and a short architecture exercise.",
    rewards: [{ type: "LP", amount: 110, label: "+110 LP" }],
    hostedBy: "Apple Hiring",
    proctored: false,
  },
  {
    id: "oa-007",
    company: "Netflix",
    companyLogo: "N",
    companyAccent: "blood",
    role: "Senior Backend Engineer",
    tier: "SENIOR",
    type: "SYSTEM_DESIGN",
    difficulty: "EXPERT",
    duration: 75,
    questions: 2,
    sections: [
      {
        name: "HLD",
        type: "SYSTEM_DESIGN",
        questions: 1,
        duration: 45,
        weight: 0.6,
      },
      { name: "Trade-offs", type: "MCQ", questions: 10, duration: 30, weight: 0.4 },
    ],
    topics: ["Distributed Systems", "CDN", "Cache", "Consistency"],
    status: "AVAILABLE",
    startsAt: iso(0),
    endsAt: iso(hours(1) + minutes(15)),
    windowEndsAt: iso(days(10)),
    registered: 942,
    popularity: 79,
    passingScore: 75,
    attempts: 0,
    maxAttempts: 1,
    description:
      "Senior-level system-design challenge. Design a global media-streaming subsystem and answer follow-up trade-off MCQs.",
    rewards: [
      { type: "LP", amount: 160, label: "+160 LP" },
      { type: "BADGE", amount: 1, label: "Architect Mark" },
    ],
    prerequisites: ["DIAMOND division or above"],
    hostedBy: "Netflix Engineering",
    proctored: false,
  },
  {
    id: "oa-008",
    company: "Uber",
    companyLogo: "U",
    companyAccent: "ember",
    role: "Software Engineer",
    tier: "ENTRY",
    type: "APTITUDE",
    difficulty: "EASY",
    duration: 45,
    questions: 30,
    sections: [
      { name: "Logical", type: "APTITUDE", questions: 15, duration: 22, weight: 0.5 },
      { name: "Quantitative", type: "APTITUDE", questions: 15, duration: 23, weight: 0.5 },
    ],
    topics: ["Series", "Probability", "Geometry"],
    status: "AVAILABLE",
    startsAt: iso(0),
    endsAt: iso(minutes(45)),
    windowEndsAt: iso(days(14)),
    registered: 5621,
    popularity: 72,
    passingScore: 60,
    attempts: 0,
    maxAttempts: 3,
    description:
      "Standard aptitude pre-screen. Quick logical and quantitative reasoning before the technical loop.",
    rewards: [{ type: "LP", amount: 50, label: "+50 LP" }],
    hostedBy: "Uber Hiring",
    proctored: false,
  },
  {
    id: "oa-009",
    company: "Airbnb",
    companyLogo: "A",
    companyAccent: "blood",
    role: "Frontend Engineer",
    tier: "MID",
    type: "CODING",
    difficulty: "MEDIUM",
    duration: 90,
    questions: 2,
    sections: [
      { name: "React Build", type: "CODING", questions: 1, duration: 60, weight: 0.7 },
      { name: "JS Fundamentals", type: "MCQ", questions: 10, duration: 30, weight: 0.3 },
    ],
    topics: ["React", "Hooks", "A11y", "Perf"],
    status: "AVAILABLE",
    startsAt: iso(0),
    endsAt: iso(hours(1) + minutes(30)),
    windowEndsAt: iso(days(8)),
    registered: 3210,
    popularity: 86,
    passingScore: 65,
    attempts: 0,
    maxAttempts: 2,
    description:
      "Build a real product feature in React. Includes accessibility and performance follow-up questions.",
    rewards: [{ type: "LP", amount: 95, label: "+95 LP" }],
    hostedBy: "Airbnb Hiring",
    proctored: false,
  },
  // -- COMPLETED --
  {
    id: "oa-010",
    company: "Google",
    companyLogo: "G",
    companyAccent: "electric",
    role: "Software Engineer L3",
    tier: "ENTRY",
    type: "CODING",
    difficulty: "MEDIUM",
    duration: 90,
    questions: 4,
    sections: [{ name: "Coding", type: "CODING", questions: 4, duration: 90, weight: 1 }],
    topics: ["Trees", "Heap", "DP"],
    status: "COMPLETED",
    startsAt: iso(-days(3)),
    endsAt: iso(-days(3) + hours(1) + minutes(30)),
    registered: 9214,
    popularity: 97,
    passingScore: 65,
    attempts: 1,
    maxAttempts: 1,
    description: "Universities track L3 OA completed three days ago.",
    result: {
      score: 88,
      rank: 412,
      percentile: 95.6,
      cleared: true,
      timeUsed: 78,
      correct: 4,
      total: 4,
      sectionScores: [{ name: "Coding", score: 88 }],
      completedAt: iso(-days(3) + hours(1) + minutes(20)),
    },
    hostedBy: "Google Hiring",
    proctored: true,
  },
  {
    id: "oa-011",
    company: "Meta",
    companyLogo: "M",
    companyAccent: "electric",
    role: "Software Engineer (E4)",
    tier: "MID",
    type: "CODING",
    difficulty: "HARD",
    duration: 60,
    questions: 2,
    sections: [{ name: "Coding", type: "CODING", questions: 2, duration: 60, weight: 1 }],
    topics: ["Graphs", "DP"],
    status: "COMPLETED",
    startsAt: iso(-days(7)),
    endsAt: iso(-days(7) + hours(1)),
    registered: 6720,
    popularity: 94,
    passingScore: 70,
    attempts: 1,
    maxAttempts: 1,
    description: "Tightly timed two-problem screen.",
    result: {
      score: 64,
      rank: 1840,
      percentile: 73.2,
      cleared: false,
      timeUsed: 60,
      correct: 1,
      total: 2,
      sectionScores: [{ name: "Coding", score: 64 }],
      completedAt: iso(-days(7) + hours(1)),
    },
    hostedBy: "Meta Hiring",
    proctored: true,
  },
  {
    id: "oa-012",
    company: "Stripe",
    companyLogo: "S",
    companyAccent: "neon",
    role: "Software Engineer",
    tier: "MID",
    type: "MIXED",
    difficulty: "HARD",
    duration: 120,
    questions: 3,
    sections: [
      { name: "Integration", type: "CODING", questions: 1, duration: 60, weight: 0.5 },
      { name: "API Design", type: "CODING", questions: 1, duration: 40, weight: 0.3 },
      { name: "Concept MCQ", type: "MCQ", questions: 8, duration: 20, weight: 0.2 },
    ],
    topics: ["HTTP", "Webhooks"],
    status: "COMPLETED",
    startsAt: iso(-days(12)),
    endsAt: iso(-days(12) + hours(2)),
    registered: 1640,
    popularity: 87,
    passingScore: 75,
    attempts: 1,
    maxAttempts: 1,
    description: "Take-home style payments OA.",
    result: {
      score: 91,
      rank: 38,
      percentile: 98.4,
      cleared: true,
      timeUsed: 104,
      correct: 3,
      total: 3,
      sectionScores: [
        { name: "Integration", score: 95 },
        { name: "API Design", score: 88 },
        { name: "Concept MCQ", score: 90 },
      ],
      completedAt: iso(-days(12) + hours(1) + minutes(44)),
    },
    hostedBy: "Stripe Recruiting",
    proctored: true,
  },
  // Locked / Eligibility-gated
  {
    id: "oa-013",
    company: "OpenAI",
    companyLogo: "O",
    companyAccent: "neon",
    role: "Research Engineer",
    tier: "STAFF",
    type: "MIXED",
    difficulty: "EXPERT",
    duration: 150,
    questions: 5,
    sections: [
      { name: "Coding", type: "CODING", questions: 2, duration: 75, weight: 0.5 },
      { name: "Math", type: "APTITUDE", questions: 5, duration: 40, weight: 0.3 },
      { name: "ML Concepts", type: "MCQ", questions: 10, duration: 35, weight: 0.2 },
    ],
    topics: ["Optimization", "Linear Algebra", "Transformers"],
    status: "LOCKED",
    startsAt: iso(days(5)),
    endsAt: iso(days(5) + hours(2) + minutes(30)),
    registered: 482,
    popularity: 92,
    passingScore: 80,
    attempts: 0,
    maxAttempts: 1,
    description:
      "Elite research engineer screen. Eligibility requires Master+ division and a verified ML profile.",
    rewards: [
      { type: "LP", amount: 220, label: "+220 LP" },
      { type: "BADGE", amount: 1, label: "OpenAI Pass" },
    ],
    prerequisites: ["MASTER division", "ML Track Verified", "5+ ML contests"],
    hostedBy: "OpenAI Research",
    proctored: true,
  },
]

// ------------------- TOP PERFORMERS / TIPS -------------------

export const TOP_PERFORMERS = [
  { handle: "rin_itoshi", role: "L5 Eng @ Google", score: 100, percentile: 99.9 },
  { handle: "isagi_y", role: "SDE-2 @ Amazon", score: 98, percentile: 99.7 },
  { handle: "bachira", role: "Senior @ Meta", score: 96, percentile: 99.4 },
  { handle: "kunigami", role: "Backend @ Stripe", score: 94, percentile: 98.9 },
  { handle: "barou_s", role: "iOS @ Apple", score: 93, percentile: 98.6 },
]

export const ARENA_TIPS = [
  {
    title: "Warm up first",
    body: "Spend 10 minutes solving a familiar problem before opening a real OA — your accuracy jumps 18% on average.",
  },
  {
    title: "Read all problems first",
    body: "Pick the easiest problem you can fully clear before attempting the highest-value one.",
  },
  {
    title: "Lock the obvious cases",
    body: "Test against empty / single / max-N inputs before submitting. 60% of WA verdicts come from missed edges.",
  },
  {
    title: "Don't fight a TLE",
    body: "If a brute force passes 70%, submit it. Partial credit > wasted minutes on a 100% optimization.",
  },
]

// ------------------- USER STATS -------------------

export const ARENA_STATS = {
  readinessScore: 78, // 0..100
  readinessTrend: "+6 this week",
  readinessTier: "STRONG",
  totalTaken: 24,
  cleared: 17,
  averageScore: 76,
  bestPercentile: 98.4,
  weeklyDelta: 4,
  rankPercentile: 8.2, // top 8.2%
  streakWeeks: 6,
  upcomingRegistered: 3,
}

// ------------------- HELPERS -------------------

export function formatDuration(min: number) {
  if (min < 60) return `${min}m`
  const h = Math.floor(min / 60)
  const m = min % 60
  return m === 0 ? `${h}h` : `${h}h ${m}m`
}

export function formatRelative(iso: string, nowMs: number = NOW_SEED) {
  const target = new Date(iso).getTime()
  const diff = target - nowMs
  const abs = Math.abs(diff)
  const future = diff > 0

  const m = Math.floor(abs / 60_000)
  const h = Math.floor(m / 60)
  const d = Math.floor(h / 24)

  if (d >= 1) return future ? `in ${d}d` : `${d}d ago`
  if (h >= 1) return future ? `in ${h}h` : `${h}h ago`
  if (m >= 1) return future ? `in ${m}m` : `${m}m ago`
  return future ? "starting" : "just now"
}

export function difficultyColor(d: Difficulty) {
  switch (d) {
    case "EASY":
      return { text: "text-neon", bg: "bg-neon/10", border: "border-neon/40" }
    case "MEDIUM":
      return { text: "text-electric", bg: "bg-electric/10", border: "border-electric/40" }
    case "HARD":
      return { text: "text-ember", bg: "bg-ember/10", border: "border-ember/40" }
    case "EXPERT":
      return { text: "text-blood", bg: "bg-blood/10", border: "border-blood/50" }
  }
}

export function statusColor(s: AssessmentStatus) {
  switch (s) {
    case "LIVE":
      return { text: "text-blood", bg: "bg-blood/15", border: "border-blood/50", label: "LIVE NOW" }
    case "SCHEDULED":
      return { text: "text-electric", bg: "bg-electric/15", border: "border-electric/50", label: "SCHEDULED" }
    case "AVAILABLE":
      return { text: "text-neon", bg: "bg-neon/15", border: "border-neon/50", label: "OPEN WINDOW" }
    case "COMPLETED":
      return { text: "text-text-mute", bg: "bg-text-mute/10", border: "border-line/60", label: "COMPLETED" }
    case "LOCKED":
      return { text: "text-gold", bg: "bg-gold/10", border: "border-gold/40", label: "LOCKED" }
  }
}

export function accentClasses(a: Assessment["companyAccent"]) {
  // Static lookup so Tailwind can detect every class.
  switch (a) {
    case "neon":
      return { text: "text-neon", bg: "bg-neon/10", border: "border-neon/40" }
    case "electric":
      return { text: "text-electric", bg: "bg-electric/10", border: "border-electric/40" }
    case "gold":
      return { text: "text-gold", bg: "bg-gold/10", border: "border-gold/40" }
    case "ember":
      return { text: "text-ember", bg: "bg-ember/10", border: "border-ember/40" }
    case "blood":
      return { text: "text-blood", bg: "bg-blood/10", border: "border-blood/40" }
  }
}
