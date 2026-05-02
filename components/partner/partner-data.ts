// =====================================================================
// Lock-In Partner Program — Mock Data Layer
// =====================================================================
// All types are frontend-ready. Mock logic is deterministic so the UI
// renders the same shape on every load. No DMs, no public posts.
// =====================================================================

export type Goal =
  | "Big Tech"
  | "Product"
  | "OA Sprint"
  | "Placement Season"

export type FocusType = "Medium-focused" | "Topic-focused" | "Company-focused"

export type Pace = "Fast" | "Steady" | "Slow + Deep"

export type Language = "C++" | "Java" | "Python"

export type CommunicationStyle =
  | "Chat only"
  | "Voice weekends"
  | "Text summaries"

export type AccountabilityStyle = "Strict" | "Supportive" | "Mixed"

export type DailyCommitment = 30 | 60 | 90

export type ReliabilityTier = "Elite" | "Solid" | "Watch" | "Risk"

export type MissionType = "new" | "revision" | "fixed"

export type ContractStatus = "draft" | "active" | "completed" | "broken"

export type TrialFormat = "A" | "B" | "C"

export type TrialResult = "Qualified" | "Borderline" | "Rejected"

// ---------------------------------------------------------------------
// User Profile + Training Card
// ---------------------------------------------------------------------

export type UserProfile = {
  id: string
  name: string
  handle: string
  initials: string
  avatarHue: number          // 0..360 — used to tint avatar gradients
  city: string               // IST tz assumed
  rank: string               // internal rating (e.g. "1820 IR")
  contestRating: number
  solved: number
  reliabilityScore: number   // 0..100
  reliabilityTier: ReliabilityTier
  reliability30d: {
    onTime: number
    missed: number
    recovered: number
  }
  bio: string                // short, professional
  topTopics: string[]
  weakTopics: string[]
  badges: string[]
}

export type TrainingCard = {
  userId: string
  goal: Goal
  focus: FocusType
  level: {
    solved: number
    internalRating: number
    contestRating: number
  }
  dailyCommitment: DailyCommitment
  timeSlots: string[]        // e.g. ["20:00–21:30 IST", "23:00–00:30 IST"]
  language: Language
  pace: Pace
  communication: CommunicationStyle
  accountability: AccountabilityStyle
  noGhosting: boolean        // auto-rematch after 3 misses
  targetCompanies: string[]
  updatedAtDays: number      // days since last update
}

// ---------------------------------------------------------------------
// Matches
// ---------------------------------------------------------------------

export type CompatibilityChip =
  | "Same time window"
  | "Same focus"
  | "Similar pace"
  | "Same target companies"
  | "Same language"
  | "Matched commitment"

export type MatchSuggestion = {
  id: string                 // candidate user id
  compatibility: number      // 0..100
  chips: CompatibilityChip[]
  sharedSlots: string[]
  note: string               // 1-line professional summary
}

// ---------------------------------------------------------------------
// Contract + Missions
// ---------------------------------------------------------------------

export type DailyMission = {
  day: number                // 1..7
  dateLabel: string          // "Mon 28 Apr"
  perUser: {
    userId: string
    tasks: { id: string; label: string; type: MissionType; done: boolean }[]
  }[]
}

export type Contract = {
  id: string
  partnerAId: string
  partnerBId: string
  status: ContractStatus
  startedDaysAgo: number
  dayIndex: number           // 1..7 (current day)
  dailyTarget: string        // e.g. "1 New + 1 Revision"
  trialDayLabel: string      // e.g. "Sunday 8 PM IST"
  rules: string[]
  // Live scores
  duoStreak: number
  disciplineScore: number    // 0..100
  chemistryScore: number     // 0..100
  clutchScore: number        // 0..100
  disciplineDebt: number     // tasks owed
  recoveryMode: boolean
}

// ---------------------------------------------------------------------
// Trials
// ---------------------------------------------------------------------

export type Trial = {
  id: string
  format: TrialFormat
  title: string
  blurb: string
  durationMin: number
  problemCount: number
  topicHint?: string
  scheduledLabel?: string
}

export type TrialReport = {
  id: string
  contractId: string
  weekIndex: number
  result: TrialResult
  scoreA: number             // 0..100
  scoreB: number
  durationMinUsed: number
  problemsSolved: number
  problemsTotal: number
  timeLost: { reason: string; minutes: number }[]
  wrongPatterns: string[]
  revisionPlan: {
    days3: string[]
    days7: string[]
    days21: string[]
  }
  nextWeekPlan: string[]
  copy: {
    headline: string
    nextTrial: string
  }
}

// ---------------------------------------------------------------------
// Anti-Ghosting
// ---------------------------------------------------------------------

export type NudgeLevel = "info" | "warn" | "critical"

export type NudgeEvent = {
  id: string
  level: NudgeLevel
  daysMissed: number
  title: string
  body: string
  cta?: string
}

// =====================================================================
// SEED DATA
// =====================================================================

export const CURRENT_USER_ID = "u_self"

export const USERS: UserProfile[] = [
  {
    id: "u_self",
    name: "Tony Stark",
    handle: "tonystark",
    initials: "TS",
    avatarHue: 195,
    city: "Bengaluru, IN",
    rank: "1820 IR",
    contestRating: 1684,
    solved: 412,
    reliabilityScore: 78,
    reliabilityTier: "Solid",
    reliability30d: { onTime: 22, missed: 4, recovered: 2 },
    bio: "Final-year. Targeting Big Tech SDE-1. Disciplined, no excuses.",
    topTopics: ["Graphs", "DP", "Binary Search"],
    weakTopics: ["Segment Trees", "Bitmask DP"],
    badges: ["7-Day Lock", "Trial Survivor"],
  },
  {
    id: "u_anya",
    name: "Anya Verma",
    handle: "anyaverma",
    initials: "AV",
    avatarHue: 180,
    city: "Pune, IN",
    rank: "1880 IR",
    contestRating: 1742,
    solved: 487,
    reliabilityScore: 92,
    reliabilityTier: "Elite",
    reliability30d: { onTime: 28, missed: 1, recovered: 1 },
    bio: "Pre-final. Focused, methodical, ships every trial.",
    topTopics: ["Graphs", "Trees", "DP"],
    weakTopics: ["Geometry", "Game Theory"],
    badges: ["Elite Reliability", "3x Qualified"],
  },
  {
    id: "u_kabir",
    name: "Kabir Rao",
    handle: "kabirrao",
    initials: "KR",
    avatarHue: 210,
    city: "Hyderabad, IN",
    rank: "1755 IR",
    contestRating: 1620,
    solved: 365,
    reliabilityScore: 84,
    reliabilityTier: "Solid",
    reliability30d: { onTime: 25, missed: 3, recovered: 2 },
    bio: "Targeting product roles. Strong on revision discipline.",
    topTopics: ["Arrays", "Two Pointers", "DP"],
    weakTopics: ["Graphs hard", "DP on Trees"],
    badges: ["Revision King"],
  },
  {
    id: "u_meera",
    name: "Meera Kapoor",
    handle: "meerak",
    initials: "MK",
    avatarHue: 200,
    city: "Delhi, IN",
    rank: "1910 IR",
    contestRating: 1798,
    solved: 522,
    reliabilityScore: 88,
    reliabilityTier: "Elite",
    reliability30d: { onTime: 27, missed: 2, recovered: 1 },
    bio: "Placement season focus. Calm, precise, and consistent.",
    topTopics: ["DP", "Segment Trees", "Strings"],
    weakTopics: ["Number Theory"],
    badges: ["Clutch Closer", "Elite Reliability"],
  },
  {
    id: "u_dev",
    name: "Dev Sharma",
    handle: "devsharma",
    initials: "DS",
    avatarHue: 220,
    city: "Mumbai, IN",
    rank: "1690 IR",
    contestRating: 1568,
    solved: 298,
    reliabilityScore: 71,
    reliabilityTier: "Solid",
    reliability30d: { onTime: 20, missed: 5, recovered: 3 },
    bio: "OA sprint mode. Fast learner, prefers structured plans.",
    topTopics: ["Greedy", "Sorting"],
    weakTopics: ["DP", "Graphs"],
    badges: ["7-Day Lock"],
  },
  {
    id: "u_ira",
    name: "Ira Mathur",
    handle: "iramathur",
    initials: "IM",
    avatarHue: 188,
    city: "Chennai, IN",
    rank: "1840 IR",
    contestRating: 1701,
    solved: 451,
    reliabilityScore: 81,
    reliabilityTier: "Solid",
    reliability30d: { onTime: 24, missed: 3, recovered: 2 },
    bio: "Steady, deep solver. Loves topic-focused weeks.",
    topTopics: ["Trees", "Heaps", "DP"],
    weakTopics: ["Bitmask", "Geometry"],
    badges: ["Trial Survivor"],
  },
]

export const TRAINING_CARDS: TrainingCard[] = [
  {
    userId: "u_self",
    goal: "Big Tech",
    focus: "Medium-focused",
    level: { solved: 412, internalRating: 1820, contestRating: 1684 },
    dailyCommitment: 60,
    timeSlots: ["20:00–21:30 IST", "23:00–00:30 IST"],
    language: "C++",
    pace: "Steady",
    communication: "Text summaries",
    accountability: "Mixed",
    noGhosting: true,
    targetCompanies: ["Google", "Atlassian", "Stripe"],
    updatedAtDays: 2,
  },
  {
    userId: "u_anya",
    goal: "Big Tech",
    focus: "Medium-focused",
    level: { solved: 487, internalRating: 1880, contestRating: 1742 },
    dailyCommitment: 60,
    timeSlots: ["20:00–21:30 IST", "22:00–23:00 IST"],
    language: "C++",
    pace: "Steady",
    communication: "Text summaries",
    accountability: "Strict",
    noGhosting: true,
    targetCompanies: ["Google", "Stripe", "Meta"],
    updatedAtDays: 1,
  },
  {
    userId: "u_kabir",
    goal: "Product",
    focus: "Topic-focused",
    level: { solved: 365, internalRating: 1755, contestRating: 1620 },
    dailyCommitment: 60,
    timeSlots: ["21:00–22:00 IST"],
    language: "Java",
    pace: "Steady",
    communication: "Chat only",
    accountability: "Supportive",
    noGhosting: true,
    targetCompanies: ["Atlassian", "Razorpay", "Zomato"],
    updatedAtDays: 3,
  },
  {
    userId: "u_meera",
    goal: "Big Tech",
    focus: "Company-focused",
    level: { solved: 522, internalRating: 1910, contestRating: 1798 },
    dailyCommitment: 90,
    timeSlots: ["19:00–20:30 IST", "22:00–23:30 IST"],
    language: "C++",
    pace: "Fast",
    communication: "Voice weekends",
    accountability: "Strict",
    noGhosting: true,
    targetCompanies: ["Google", "Amazon", "Stripe"],
    updatedAtDays: 1,
  },
  {
    userId: "u_dev",
    goal: "OA Sprint",
    focus: "Medium-focused",
    level: { solved: 298, internalRating: 1690, contestRating: 1568 },
    dailyCommitment: 60,
    timeSlots: ["20:00–21:00 IST"],
    language: "Python",
    pace: "Fast",
    communication: "Chat only",
    accountability: "Supportive",
    noGhosting: true,
    targetCompanies: ["Atlassian", "Goldman", "Walmart"],
    updatedAtDays: 4,
  },
  {
    userId: "u_ira",
    goal: "Placement Season",
    focus: "Topic-focused",
    level: { solved: 451, internalRating: 1840, contestRating: 1701 },
    dailyCommitment: 90,
    timeSlots: ["20:30–22:00 IST"],
    language: "C++",
    pace: "Slow + Deep",
    communication: "Text summaries",
    accountability: "Mixed",
    noGhosting: true,
    targetCompanies: ["Google", "Atlassian", "Adobe"],
    updatedAtDays: 2,
  },
]

export const MATCHES: MatchSuggestion[] = [
  {
    id: "u_anya",
    compatibility: 96,
    chips: [
      "Same time window",
      "Same focus",
      "Similar pace",
      "Same target companies",
      "Same language",
    ],
    sharedSlots: ["20:00–21:30 IST", "22:00–23:00 IST"],
    note: "Nearly identical training card. Strict accountability matches your discipline.",
  },
  {
    id: "u_meera",
    compatibility: 88,
    chips: [
      "Same time window",
      "Same target companies",
      "Same language",
      "Matched commitment",
    ],
    sharedSlots: ["19:00–20:30 IST", "22:00–23:30 IST"],
    note: "Faster pace, but same target list. Pushes you out of comfort zone.",
  },
  {
    id: "u_ira",
    compatibility: 84,
    chips: ["Same focus", "Same language", "Matched commitment"],
    sharedSlots: ["20:30–22:00 IST"],
    note: "Deep solver. Great for topic-focused weeks like Trees or Graphs.",
  },
  {
    id: "u_kabir",
    compatibility: 78,
    chips: ["Similar pace", "Matched commitment"],
    sharedSlots: ["21:00–22:00 IST"],
    note: "Different language, but shared revision discipline. Solid second pick.",
  },
  {
    id: "u_dev",
    compatibility: 71,
    chips: ["Same focus", "Matched commitment"],
    sharedSlots: ["20:00–21:00 IST"],
    note: "OA sprint mode. Best fit if you want a fast 7-day burn.",
  },
]

// Active duo: self + Anya
export const ACTIVE_CONTRACT: Contract = {
  id: "c_001",
  partnerAId: "u_self",
  partnerBId: "u_anya",
  status: "active",
  startedDaysAgo: 3,
  dayIndex: 4,
  dailyTarget: "1 New + 1 Revision",
  trialDayLabel: "Sunday 8 PM IST",
  rules: [
    "1 new + 1 revision per day, every day",
    "1 timed Selection Trial on Sunday",
    "Miss 2 days → Discipline Score drops",
    "Miss 3 days → Recovery Mode unlocks",
    "Miss 5 days → Auto-rematch offered",
  ],
  duoStreak: 3,
  disciplineScore: 82,
  chemistryScore: 88,
  clutchScore: 74,
  disciplineDebt: 1,
  recoveryMode: false,
}

export const TODAY_MISSIONS: DailyMission = {
  day: 4,
  dateLabel: "Thu 01 May",
  perUser: [
    {
      userId: "u_self",
      tasks: [
        { id: "t1", label: "New: Graph — Course Schedule II (Medium)", type: "new", done: true },
        { id: "t2", label: "Revision: DP — House Robber III", type: "revision", done: false },
      ],
    },
    {
      userId: "u_anya",
      tasks: [
        { id: "t3", label: "New: Graph — Min Spanning Tree (Medium)", type: "new", done: true },
        { id: "t4", label: "Revision: DP — Coin Change II", type: "revision", done: true },
      ],
    },
  ],
}

export const WEEK_MISSIONS: DailyMission[] = [
  {
    day: 1,
    dateLabel: "Mon 28 Apr",
    perUser: [
      {
        userId: "u_self",
        tasks: [
          { id: "d1a", label: "New: Sliding Window — Longest Substring", type: "new", done: true },
          { id: "d1b", label: "Revision: Two Pointers — 3Sum", type: "revision", done: true },
        ],
      },
      {
        userId: "u_anya",
        tasks: [
          { id: "d1c", label: "New: Sliding Window — Min Window Substring", type: "new", done: true },
          { id: "d1d", label: "Revision: Two Pointers — Container Water", type: "revision", done: true },
        ],
      },
    ],
  },
  {
    day: 2,
    dateLabel: "Tue 29 Apr",
    perUser: [
      {
        userId: "u_self",
        tasks: [
          { id: "d2a", label: "New: BFS — Rotting Oranges", type: "new", done: true },
          { id: "d2b", label: "Revision: BFS — Word Ladder", type: "revision", done: true },
        ],
      },
      {
        userId: "u_anya",
        tasks: [
          { id: "d2c", label: "New: BFS — Walls and Gates", type: "new", done: true },
          { id: "d2d", label: "Revision: BFS — Open the Lock", type: "revision", done: true },
        ],
      },
    ],
  },
  {
    day: 3,
    dateLabel: "Wed 30 Apr",
    perUser: [
      {
        userId: "u_self",
        tasks: [
          { id: "d3a", label: "New: DFS — Number of Islands", type: "new", done: true },
          { id: "d3b", label: "Revision: DFS — Clone Graph", type: "revision", done: false },
        ],
      },
      {
        userId: "u_anya",
        tasks: [
          { id: "d3c", label: "New: DFS — Surrounded Regions", type: "new", done: true },
          { id: "d3d", label: "Revision: DFS — Course Schedule", type: "revision", done: true },
        ],
      },
    ],
  },
  TODAY_MISSIONS,
  {
    day: 5,
    dateLabel: "Fri 02 May",
    perUser: [
      {
        userId: "u_self",
        tasks: [
          { id: "d5a", label: "New: Topo Sort — Alien Dictionary", type: "new", done: false },
          { id: "d5b", label: "Revision: Topo Sort — Course Schedule II", type: "revision", done: false },
        ],
      },
      {
        userId: "u_anya",
        tasks: [
          { id: "d5c", label: "New: Topo Sort — Sequence Reconstruction", type: "new", done: false },
          { id: "d5d", label: "Revision: Topo Sort — Parallel Courses", type: "revision", done: false },
        ],
      },
    ],
  },
  {
    day: 6,
    dateLabel: "Sat 03 May",
    perUser: [
      {
        userId: "u_self",
        tasks: [
          { id: "d6a", label: "New: Union-Find — Redundant Connection", type: "new", done: false },
          { id: "d6b", label: "Revision: Union-Find — Accounts Merge", type: "revision", done: false },
        ],
      },
      {
        userId: "u_anya",
        tasks: [
          { id: "d6c", label: "New: Union-Find — Number of Provinces", type: "new", done: false },
          { id: "d6d", label: "Revision: Union-Find — Friend Circles", type: "revision", done: false },
        ],
      },
    ],
  },
  {
    day: 7,
    dateLabel: "Sun 04 May — TRIAL",
    perUser: [
      {
        userId: "u_self",
        tasks: [
          { id: "d7a", label: "Selection Trial: 2 Mediums, 60 min", type: "fixed", done: false },
        ],
      },
      {
        userId: "u_anya",
        tasks: [
          { id: "d7b", label: "Selection Trial: 2 Mediums, 60 min", type: "fixed", done: false },
        ],
      },
    ],
  },
]

export const TRIALS: Trial[] = [
  {
    id: "trial_a",
    format: "A",
    title: "Trial A — Standard",
    blurb: "Two mediums under pressure. Tests core consistency.",
    durationMin: 60,
    problemCount: 2,
    scheduledLabel: "Sunday 8:00 PM IST",
  },
  {
    id: "trial_b",
    format: "B",
    title: "Trial B — OA Simulation",
    blurb: "1 medium + 1 OA-style problem. Mimics real screening rounds.",
    durationMin: 75,
    problemCount: 2,
    scheduledLabel: "Sunday 8:00 PM IST",
  },
  {
    id: "trial_c",
    format: "C",
    title: "Trial C — Weakness Drill",
    blurb: "3 problems from one weak topic. Forces depth, not breadth.",
    durationMin: 90,
    problemCount: 3,
    topicHint: "Suggested: Segment Trees (your gap)",
    scheduledLabel: "Sunday 8:00 PM IST",
  },
]

export const TRIAL_REPORT: TrialReport = {
  id: "tr_001",
  contractId: "c_001",
  weekIndex: 1,
  result: "Qualified",
  scoreA: 78,
  scoreB: 84,
  durationMinUsed: 58,
  problemsSolved: 2,
  problemsTotal: 2,
  timeLost: [
    { reason: "Off-by-one on boundary case", minutes: 7 },
    { reason: "Re-reading constraints", minutes: 4 },
    { reason: "Debugging recursion base case", minutes: 6 },
  ],
  wrongPatterns: [
    "Skipped dry-run before coding (3 of 2 solves)",
    "Started coding before clarifying constraints",
    "Used DFS where BFS was cleaner",
  ],
  revisionPlan: {
    days3: ["Re-solve today's Trial A problem 1 (timed, 25 min)"],
    days7: [
      "3 sliding-window mediums",
      "2 BFS-on-grid mediums",
      "1 topo-sort medium",
    ],
    days21: [
      "Mixed graph set (15 problems)",
      "Segment Trees foundation (8 problems)",
      "Bitmask DP intro (5 problems)",
    ],
  },
  nextWeekPlan: [
    "Topic lock: Trees + DP on Trees",
    "Daily target: 1 New + 1 Revision",
    "Trial format: B (OA Simulation)",
    "Voice debrief: Saturday 9 PM IST",
  ],
  copy: {
    headline: "Selection Result: Qualified.",
    nextTrial: "Next trial due Sunday 8 PM IST.",
  },
}

export const NUDGES: NudgeEvent[] = [
  {
    id: "n1",
    level: "info",
    daysMissed: 0,
    title: "Discipline Debt: 1 task pending",
    body: "Clear today to keep your streak intact.",
    cta: "Open today's missions",
  },
]

// =====================================================================
// HELPERS
// =====================================================================

export function getUser(id: string): UserProfile | undefined {
  return USERS.find((u) => u.id === id)
}

export function getCard(userId: string): TrainingCard | undefined {
  return TRAINING_CARDS.find((t) => t.userId === userId)
}

export function getReliabilityMeta(tier: ReliabilityTier) {
  switch (tier) {
    case "Elite":
      return { label: "ELITE", color: "neon", desc: "Top 5% reliability" }
    case "Solid":
      return { label: "SOLID", color: "neon-soft", desc: "Consistent + dependable" }
    case "Watch":
      return { label: "WATCH", color: "ember", desc: "Recent misses logged" }
    case "Risk":
      return { label: "RISK", color: "blood", desc: "Multiple no-shows" }
  }
}

export function formatCommitment(m: DailyCommitment): string {
  return `${m} min/day`
}
