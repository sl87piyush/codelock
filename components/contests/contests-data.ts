export type ContestStatus = "live" | "upcoming" | "past"
export type ContestCategory =
  | "Algorithms"
  | "DataStructures"
  | "SystemDesign"
  | "Frontend"
  | "AI/ML"
  | "Blockchain"
  | "Database"
  | "Hackathon"

export type ContestDifficulty = "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "ELITE"

export type ContestParticipant = {
  id: string
  handle: string
  rank: number
  score: number
  solved: number
  division: "BRONZE" | "SILVER" | "GOLD" | "PLATINUM" | "DIAMOND"
  flag: string
  delta?: number // rank change
}

export type ContestProblem = {
  id: string
  letter: string
  title: string
  difficulty: "EASY" | "MEDIUM" | "HARD" | "EXPERT"
  points: number
  solvedBy: number
  acceptance: number
}

export type ContestSponsor = {
  name: string
  tier: "TITLE" | "GOLD" | "SILVER"
}

export type Contest = {
  id: string
  code: string
  title: string
  tagline: string
  description: string
  status: ContestStatus
  category: ContestCategory
  difficulty: ContestDifficulty
  startsAt: string // ISO
  endsAt: string // ISO
  durationMin: number
  registered: number
  capacity?: number
  prizePool: number
  prizeCurrency: "LP" | "USD"
  topPrize: string
  isOfficial: boolean
  isFeatured?: boolean
  isRegistered?: boolean
  participants: ContestParticipant[]
  problems: ContestProblem[]
  sponsors: ContestSponsor[]
  rules: string[]
  schedule: { time: string; label: string }[]
  bannerAccent: "neon" | "ember" | "gold" | "electric"
  // For ongoing — progress 0..1
  progress?: number
  // For past — winner handle + final rank breakdown
  winner?: string
  winners?: { handle: string; prize: string; division: string }[]
}

// Fixed seed so server-rendered and client-rendered HTML are identical
// (avoids hydration mismatches caused by Date.now() varying between SSR and CSR).
export const NOW_SEED = Date.UTC(2026, 4, 2, 12, 0, 0)
const minutes = (m: number) => 60_000 * m
const hours = (h: number) => 3_600_000 * h
const days = (d: number) => 86_400_000 * d
const iso = (offset: number) => new Date(NOW_SEED + offset).toISOString()

const sampleParticipants = (n: number, baseRank = 1): ContestParticipant[] => {
  const handles = [
    "tonystark",
    "isagi_y",
    "bachira",
    "rin_itoshi",
    "kaiser_m",
    "barou_s",
    "shidou_r",
    "nagi_s",
    "reo_m",
    "chigiri_h",
    "kunigami_r",
    "natalie_v",
    "neo_dev",
    "vortex_42",
    "ghost_writer",
    "phantom_x",
    "shadow_one",
    "ripple_z",
    "quark_b",
    "atlas_q",
  ]
  const flags = ["JP", "US", "IN", "DE", "BR", "FR", "KR", "CN", "UK", "ES"]
  const divs: ContestParticipant["division"][] = [
    "DIAMOND",
    "DIAMOND",
    "PLATINUM",
    "PLATINUM",
    "GOLD",
    "GOLD",
    "GOLD",
    "SILVER",
    "SILVER",
    "BRONZE",
  ]
  return Array.from({ length: n }, (_, i) => ({
    id: `p-${i}`,
    handle: handles[i % handles.length],
    rank: baseRank + i,
    score: Math.max(60, 980 - i * 18 + (i % 3) * 7),
    solved: Math.max(0, 6 - Math.floor(i / 3)),
    division: divs[i % divs.length],
    flag: flags[i % flags.length],
    delta: i === 0 ? 2 : i % 4 === 0 ? -1 : i % 3 === 0 ? 1 : 0,
  }))
}

const sampleProblems: ContestProblem[] = [
  {
    id: "p1",
    letter: "A",
    title: "Synchronized Echo",
    difficulty: "EASY",
    points: 100,
    solvedBy: 1842,
    acceptance: 84,
  },
  {
    id: "p2",
    letter: "B",
    title: "Lattice Survivors",
    difficulty: "MEDIUM",
    points: 250,
    solvedBy: 906,
    acceptance: 52,
  },
  {
    id: "p3",
    letter: "C",
    title: "Quantum Bridge",
    difficulty: "MEDIUM",
    points: 300,
    solvedBy: 612,
    acceptance: 38,
  },
  {
    id: "p4",
    letter: "D",
    title: "Hypergraph Pulse",
    difficulty: "HARD",
    points: 500,
    solvedBy: 184,
    acceptance: 17,
  },
  {
    id: "p5",
    letter: "E",
    title: "Specter Cascade",
    difficulty: "HARD",
    points: 600,
    solvedBy: 47,
    acceptance: 6,
  },
  {
    id: "p6",
    letter: "F",
    title: "Eclipse Protocol",
    difficulty: "EXPERT",
    points: 900,
    solvedBy: 9,
    acceptance: 2,
  },
]

export const CONTESTS: Contest[] = [
  // ---------- LIVE ----------
  {
    id: "ct-2099",
    code: "EGO-S04-FINALE",
    title: "Egoist Finale: Round 12",
    tagline: "The last 64 strikers compete for the season crown",
    description:
      "Six problems, three hours, one survivor. The Egoist Finale is the climactic round of Season 04. Every submission rewrites the leaderboard in real time, and the top 16 advance directly into the World Five qualifier.",
    status: "live",
    category: "Algorithms",
    difficulty: "ELITE",
    startsAt: iso(-hours(1) - minutes(20)),
    endsAt: iso(hours(1) + minutes(40)),
    durationMin: 180,
    registered: 4862,
    capacity: 5000,
    prizePool: 50000,
    prizeCurrency: "LP",
    topPrize: "20,000 LP + Diamond I Promotion",
    isOfficial: true,
    isFeatured: true,
    isRegistered: true,
    bannerAccent: "ember",
    progress: 0.43,
    participants: sampleParticipants(20),
    problems: sampleProblems,
    sponsors: [
      { name: "BLUE LOCK ENGINE", tier: "TITLE" },
      { name: "NEONFORGE", tier: "GOLD" },
      { name: "STARK INDUSTRIES", tier: "GOLD" },
      { name: "QUANTUM LABS", tier: "SILVER" },
    ],
    rules: [
      "Six problems weighted by difficulty. Highest cumulative score wins.",
      "Wrong submissions incur a +5 minute time penalty.",
      "External libraries beyond the standard runtime are forbidden.",
      "Real-time scoreboard freezes in the final 30 minutes.",
      "Top 16 finishers earn direct seeding into the World Five qualifier.",
    ],
    schedule: [
      { time: "T-00:00", label: "Contest Launch" },
      { time: "T+02:30", label: "Scoreboard Freeze" },
      { time: "T+03:00", label: "Final Submission Deadline" },
      { time: "T+03:30", label: "Results & Promotions" },
    ],
  },
  {
    id: "ct-2098",
    code: "WX-FRONTEND-DUEL",
    title: "Frontend Duel: Pixel Perfect",
    tagline: "Hand-crafted interfaces under a 2-hour pressure cooker",
    description:
      "A short-form UI sprint. You're given three pixel references — recreate them with semantic markup, accessibility, and zero layout shift. Judging is automated against design tokens.",
    status: "live",
    category: "Frontend",
    difficulty: "INTERMEDIATE",
    startsAt: iso(-minutes(45)),
    endsAt: iso(minutes(75)),
    durationMin: 120,
    registered: 1284,
    prizePool: 8000,
    prizeCurrency: "LP",
    topPrize: "3,000 LP + Pixel Mastery Badge",
    isOfficial: true,
    bannerAccent: "neon",
    progress: 0.37,
    participants: sampleParticipants(20),
    problems: sampleProblems.slice(0, 3),
    sponsors: [
      { name: "NEONFORGE", tier: "TITLE" },
      { name: "ATLAS TYPE", tier: "GOLD" },
    ],
    rules: [
      "Three UI references, increasing complexity.",
      "No third-party UI libraries. Tailwind permitted.",
      "Solutions are scored on token accuracy, accessibility, and CLS.",
    ],
    schedule: [
      { time: "T-00:00", label: "References Released" },
      { time: "T+01:30", label: "Auto-Judge Begins" },
      { time: "T+02:00", label: "Final Cutoff" },
    ],
  },

  // ---------- UPCOMING ----------
  {
    id: "ct-2100",
    code: "WC-OPEN-25",
    title: "World Code Open 2026",
    tagline: "The largest open contest of the year — 50,000 strikers across 132 countries",
    description:
      "An invite-free global championship. Eight problems span data structures, optimization, and applied AI. The top 100 advance to the Final Stage in Tokyo with full travel coverage.",
    status: "upcoming",
    category: "Algorithms",
    difficulty: "ELITE",
    startsAt: iso(days(2) + hours(4)),
    endsAt: iso(days(2) + hours(9)),
    durationMin: 300,
    registered: 38420,
    capacity: 50000,
    prizePool: 250000,
    prizeCurrency: "USD",
    topPrize: "$100,000 + World Open Crown",
    isOfficial: true,
    isFeatured: true,
    bannerAccent: "gold",
    participants: [],
    problems: [],
    sponsors: [
      { name: "STARK INDUSTRIES", tier: "TITLE" },
      { name: "QUANTUM LABS", tier: "GOLD" },
      { name: "NEONFORGE", tier: "GOLD" },
      { name: "ATLAS TYPE", tier: "SILVER" },
      { name: "AURORA OS", tier: "SILVER" },
    ],
    rules: [
      "Open registration until T-1h.",
      "Eight problems across algorithms, optimization, and applied AI.",
      "Top 100 receive in-person finals invitation.",
      "Plagiarism is met with permanent ban.",
    ],
    schedule: [
      { time: "T-24:00", label: "Practice Round Available" },
      { time: "T-01:00", label: "Registration Closes" },
      { time: "T+00:00", label: "Contest Begins" },
      { time: "T+05:00", label: "Final Submission" },
      { time: "T+06:00", label: "Top 100 Announced" },
    ],
  },
  {
    id: "ct-2101",
    code: "AI-FORGE-7",
    title: "AI Forge Seven",
    tagline: "Architect end-to-end ML pipelines under timed constraints",
    description:
      "A long-form contest where teams design retrieval, fine-tuning, and inference pipelines. Submissions are evaluated on benchmark accuracy and runtime cost.",
    status: "upcoming",
    category: "AI/ML",
    difficulty: "ADVANCED",
    startsAt: iso(days(5) + hours(2)),
    endsAt: iso(days(5) + hours(10)),
    durationMin: 480,
    registered: 6420,
    capacity: 10000,
    prizePool: 30000,
    prizeCurrency: "USD",
    topPrize: "$15,000 + Forge Architect Title",
    isOfficial: true,
    bannerAccent: "neon",
    participants: [],
    problems: [],
    sponsors: [
      { name: "QUANTUM LABS", tier: "TITLE" },
      { name: "STARK INDUSTRIES", tier: "GOLD" },
    ],
    rules: [
      "Teams of up to 3.",
      "Provided dataset must be respected — no external data.",
      "Submission includes inference cost report.",
    ],
    schedule: [
      { time: "T-24:00", label: "Dataset Released" },
      { time: "T+00:00", label: "Pipeline Build Begins" },
      { time: "T+08:00", label: "Final Submission & Cost Audit" },
    ],
  },
  {
    id: "ct-2102",
    code: "SYS-DUEL-XII",
    title: "Systems Duel XII",
    tagline: "Architect distributed systems under chaos engineering loads",
    description:
      "A 6-hour design and benchmark contest. You receive a starter cluster and a chaos schedule — your job is to keep p99 latency under target while the runtime injects faults.",
    status: "upcoming",
    category: "SystemDesign",
    difficulty: "ELITE",
    startsAt: iso(days(8) + hours(1)),
    endsAt: iso(days(8) + hours(7)),
    durationMin: 360,
    registered: 1842,
    capacity: 3000,
    prizePool: 25000,
    prizeCurrency: "LP",
    topPrize: "10,000 LP + Architect Diamond Badge",
    isOfficial: true,
    bannerAccent: "electric",
    participants: [],
    problems: [],
    sponsors: [
      { name: "AURORA OS", tier: "TITLE" },
      { name: "NEONFORGE", tier: "SILVER" },
    ],
    rules: [
      "Starter cluster provided via Aurora OS.",
      "Chaos schedule is hidden until T-00:00.",
      "Scoring weights p99 latency, error rate, and uptime.",
    ],
    schedule: [
      { time: "T-12:00", label: "Cluster Provisioned" },
      { time: "T+00:00", label: "Chaos Begins" },
      { time: "T+06:00", label: "Final Audit" },
    ],
  },
  {
    id: "ct-2103",
    code: "DB-CLASH-NIGHT",
    title: "Database Clash: Night Edition",
    tagline: "Optimize SQL, vectors, and graph queries against punishing leaderboards",
    description:
      "A nighttime sprint contest. Eight queries spanning SQL, vector search, and graph traversal. Score is a function of correctness and runtime cost.",
    status: "upcoming",
    category: "Database",
    difficulty: "INTERMEDIATE",
    startsAt: iso(days(1) + hours(20)),
    endsAt: iso(days(1) + hours(23)),
    durationMin: 180,
    registered: 940,
    capacity: 2000,
    prizePool: 5000,
    prizeCurrency: "LP",
    topPrize: "2,000 LP + Query Master Badge",
    isOfficial: false,
    bannerAccent: "ember",
    participants: [],
    problems: [],
    sponsors: [{ name: "AURORA OS", tier: "GOLD" }],
    rules: [
      "Eight queries — three SQL, three vector, two graph.",
      "Queries are auto-judged by runtime cost vs reference.",
      "Late submissions accepted with point decay.",
    ],
    schedule: [
      { time: "T-00:00", label: "Queries Released" },
      { time: "T+02:30", label: "Score Decay Begins" },
      { time: "T+03:00", label: "Final Cutoff" },
    ],
  },

  // ---------- PAST ----------
  {
    id: "ct-2080",
    code: "EGO-S04-R11",
    title: "Egoist Finale: Round 11",
    tagline: "Last week's qualifier round",
    description:
      "The penultimate round of Season 04. 4,200 strikers competed for the final 64 spots in the Finale.",
    status: "past",
    category: "Algorithms",
    difficulty: "ADVANCED",
    startsAt: iso(-days(7)),
    endsAt: iso(-days(7) + hours(3)),
    durationMin: 180,
    registered: 4218,
    prizePool: 30000,
    prizeCurrency: "LP",
    topPrize: "12,000 LP + Finale Seat",
    isOfficial: true,
    winner: "kaiser_m",
    bannerAccent: "ember",
    winners: [
      { handle: "kaiser_m", prize: "12,000 LP", division: "DIAMOND" },
      { handle: "rin_itoshi", prize: "7,000 LP", division: "DIAMOND" },
      { handle: "isagi_y", prize: "4,000 LP", division: "DIAMOND" },
    ],
    participants: sampleParticipants(20),
    problems: sampleProblems,
    sponsors: [{ name: "BLUE LOCK ENGINE", tier: "TITLE" }],
    rules: [],
    schedule: [],
  },
  {
    id: "ct-2079",
    code: "WC-MONTHLY-04",
    title: "Monthly World Cup #04",
    tagline: "April's open monthly — 12,000 entrants",
    description:
      "The April edition of the open monthly. Five problems in two and a half hours. natalie_v locked the win in the final 6 minutes.",
    status: "past",
    category: "Algorithms",
    difficulty: "INTERMEDIATE",
    startsAt: iso(-days(14)),
    endsAt: iso(-days(14) + hours(2) + minutes(30)),
    durationMin: 150,
    registered: 12042,
    prizePool: 12000,
    prizeCurrency: "USD",
    topPrize: "$5,000",
    isOfficial: true,
    winner: "natalie_v",
    bannerAccent: "neon",
    winners: [
      { handle: "natalie_v", prize: "$5,000", division: "DIAMOND" },
      { handle: "ghost_writer", prize: "$3,000", division: "PLATINUM" },
      { handle: "vortex_42", prize: "$1,500", division: "PLATINUM" },
    ],
    participants: sampleParticipants(20),
    problems: sampleProblems.slice(0, 5),
    sponsors: [{ name: "STARK INDUSTRIES", tier: "TITLE" }],
    rules: [],
    schedule: [],
  },
  {
    id: "ct-2078",
    code: "FE-PIXEL-03",
    title: "Frontend Duel #03",
    tagline: "Sponsored by NeonForge",
    description:
      "Three intricate UI references — one of which involved live audio waveforms. Decided by a 4-millisecond CLS gap.",
    status: "past",
    category: "Frontend",
    difficulty: "BEGINNER",
    startsAt: iso(-days(21)),
    endsAt: iso(-days(21) + hours(2)),
    durationMin: 120,
    registered: 1820,
    prizePool: 4000,
    prizeCurrency: "LP",
    topPrize: "1,800 LP",
    isOfficial: false,
    winner: "phantom_x",
    bannerAccent: "neon",
    winners: [
      { handle: "phantom_x", prize: "1,800 LP", division: "PLATINUM" },
      { handle: "ripple_z", prize: "1,200 LP", division: "GOLD" },
      { handle: "atlas_q", prize: "800 LP", division: "GOLD" },
    ],
    participants: sampleParticipants(15),
    problems: sampleProblems.slice(0, 3),
    sponsors: [{ name: "NEONFORGE", tier: "TITLE" }],
    rules: [],
    schedule: [],
  },
  {
    id: "ct-2077",
    code: "BLOCK-RAID-07",
    title: "Block Raid VII",
    tagline: "Smart-contract optimization gauntlet",
    description:
      "Six contracts, gas-cost optimization, security review, and a chaotic final puzzle. Decided by a single hex-character difference.",
    status: "past",
    category: "Blockchain",
    difficulty: "ADVANCED",
    startsAt: iso(-days(28)),
    endsAt: iso(-days(28) + hours(4)),
    durationMin: 240,
    registered: 980,
    prizePool: 20000,
    prizeCurrency: "USD",
    topPrize: "$10,000",
    isOfficial: true,
    winner: "shadow_one",
    bannerAccent: "gold",
    winners: [
      { handle: "shadow_one", prize: "$10,000", division: "DIAMOND" },
      { handle: "nagi_s", prize: "$5,000", division: "DIAMOND" },
      { handle: "barou_s", prize: "$2,500", division: "PLATINUM" },
    ],
    participants: sampleParticipants(20),
    problems: sampleProblems,
    sponsors: [{ name: "QUANTUM LABS", tier: "TITLE" }],
    rules: [],
    schedule: [],
  },
  {
    id: "ct-2076",
    code: "HACK-FUSION-12",
    title: "Hackfest Fusion XII",
    tagline: "48-hour hackathon — 1,200 teams",
    description:
      "Cross-discipline hackathon spanning AI, frontend, and infrastructure. Team Atlas-Q clinched it with a real-time multimodal coding agent.",
    status: "past",
    category: "Hackathon",
    difficulty: "ADVANCED",
    startsAt: iso(-days(40)),
    endsAt: iso(-days(40) + hours(48)),
    durationMin: 2880,
    registered: 4842,
    prizePool: 80000,
    prizeCurrency: "USD",
    topPrize: "$40,000",
    isOfficial: true,
    winner: "atlas_q",
    bannerAccent: "electric",
    winners: [
      { handle: "atlas_q", prize: "$40,000", division: "DIAMOND" },
      { handle: "neo_dev", prize: "$20,000", division: "DIAMOND" },
      { handle: "quark_b", prize: "$10,000", division: "PLATINUM" },
    ],
    participants: sampleParticipants(20),
    problems: [],
    sponsors: [{ name: "STARK INDUSTRIES", tier: "TITLE" }],
    rules: [],
    schedule: [],
  },
]

export const CONTEST_CATEGORIES: { id: ContestCategory | "ALL"; label: string }[] = [
  { id: "ALL", label: "All" },
  { id: "Algorithms", label: "Algorithms" },
  { id: "DataStructures", label: "Data Structures" },
  { id: "SystemDesign", label: "System Design" },
  { id: "Frontend", label: "Frontend" },
  { id: "AI/ML", label: "AI / ML" },
  { id: "Blockchain", label: "Blockchain" },
  { id: "Database", label: "Database" },
  { id: "Hackathon", label: "Hackathon" },
]

export const CONTEST_SORTS = [
  { id: "soonest", label: "Soonest" },
  { id: "popular", label: "Most Registered" },
  { id: "prize", label: "Highest Prize" },
  { id: "newest", label: "Newest" },
] as const
export type ContestSort = (typeof CONTEST_SORTS)[number]["id"]

export const PLAYER_STATS = {
  registered: 4,
  competing: 1,
  bestRank: 7,
  totalLP: 8420,
  badges: 12,
}

export const TOP_WINNERS = [
  { handle: "kaiser_m", flag: "DE", titles: 14, lpEarned: 184_200, division: "DIAMOND" as const },
  { handle: "natalie_v", flag: "BR", titles: 11, lpEarned: 162_800, division: "DIAMOND" as const },
  { handle: "rin_itoshi", flag: "JP", titles: 10, lpEarned: 158_400, division: "DIAMOND" as const },
  { handle: "isagi_y", flag: "JP", titles: 9, lpEarned: 142_900, division: "DIAMOND" as const },
  { handle: "atlas_q", flag: "US", titles: 8, lpEarned: 128_700, division: "PLATINUM" as const },
]

export const CONTEST_NEWS = [
  {
    id: "n1",
    tag: "PROTOCOL",
    title: "Season 05 announcement: 18 ranked contests, double prize pool",
    timeAgo: "2h ago",
  },
  {
    id: "n2",
    tag: "PARTNER",
    title: "Stark Industries renews title sponsorship through 2027",
    timeAgo: "1d ago",
  },
  {
    id: "n3",
    tag: "RULES",
    title: "Updated plagiarism detection: same-AST clones now auto-banned",
    timeAgo: "3d ago",
  },
]

export function formatPrize(c: Contest) {
  if (c.prizeCurrency === "USD") {
    return `$${(c.prizePool / 1000).toFixed(c.prizePool >= 100000 ? 0 : 1)}k`
  }
  if (c.prizePool >= 1000) {
    return `${(c.prizePool / 1000).toFixed(c.prizePool % 1000 === 0 ? 0 : 1)}k LP`
  }
  return `${c.prizePool} LP`
}

export function formatDuration(min: number) {
  if (min >= 60 * 24) {
    const d = Math.round(min / (60 * 24))
    return `${d}d`
  }
  if (min >= 60) {
    const h = Math.floor(min / 60)
    const m = min % 60
    return m === 0 ? `${h}h` : `${h}h ${m}m`
  }
  return `${min}m`
}

export function formatRelative(iso: string, nowMs: number = NOW_SEED) {
  const target = new Date(iso).getTime()
  const diff = target - nowMs
  const abs = Math.abs(diff)
  const sign = diff < 0 ? "ago" : ""
  const mins = Math.floor(abs / 60_000)
  if (mins < 60) return `${mins}m ${sign}`.trim()
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ${sign}`.trim()
  const days = Math.floor(hrs / 24)
  return `${days}d ${sign}`.trim()
}
