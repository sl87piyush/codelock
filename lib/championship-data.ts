// ============================================================
// Championship & Hall of Champions — single source of truth.
// All dates are deterministic so the page is stable on rerenders.
// ============================================================

export type Track = "solo" | "duo" | "clan"
export type Lane = "open" | "crown"
export type StageStatus = "completed" | "live" | "upcoming" | "locked"
export type RegistrationStatus =
  | "not_registered"
  | "registered"
  | "qualified"
  | "knockout"
  | "finalist"
  | "champion"
  | "eliminated"

// ------------------------------------------------------------
// Season meta — current "India 2026" season
// ------------------------------------------------------------
export const SEASON = {
  id: "india-2026",
  label: "INDIA 2026",
  hashTag: "S03",
  yearLabel: "Season 03 // India",
  description:
    "The annual flagship tournament of CodeTrackX. Once a year. One champion per track. Forever in the Hall.",
  // Registration is currently OPEN. Hard deadline below drives the live countdown.
  registrationDeadline: "2026-05-20T23:59:00Z",
  totalRegistrants: 18432,
  finalsLiveDate: "2026-06-14",
  finalsViewers: 72500,
  countriesInScope: 1, // India-only flagship
} as const

// ------------------------------------------------------------
// Tracks — the three competitive paths
// ------------------------------------------------------------
export type TrackMeta = {
  id: Track
  label: string
  tagline: string
  description: string
  vibe: string
  participants: number
  slotsTotal: number
  prizePool: string
  elite?: boolean
}

export const TRACKS: TrackMeta[] = [
  {
    id: "solo",
    label: "Solo",
    tagline: "I am the best coder",
    description:
      "Pure individual skill. No teammates, no excuses. Climb the bracket alone — every match is you versus another egoist.",
    vibe: "Individual",
    participants: 12480,
    slotsTotal: 16384,
    prizePool: "₹4,00,000",
  },
  {
    id: "duo",
    label: "Duo",
    tagline: "Coordination + pair problem-solving",
    description:
      "You and one partner against another duo. Pair-program live, communicate under pressure, split the win 50/50.",
    vibe: "Pair",
    participants: 3920,
    slotsTotal: 4096,
    prizePool: "₹6,00,000",
  },
  {
    id: "clan",
    label: "Clan",
    tagline: "Team warfare. Highest prestige.",
    description:
      "Your entire clan (5+ members) vs another. The Elite Path. Win and your whole squad is enshrined — not just you.",
    vibe: "Squad",
    participants: 2032,
    slotsTotal: 2048,
    prizePool: "₹12,00,000",
    elite: true,
  },
]

// ------------------------------------------------------------
// Lanes — Open vs Crown (verified elite path)
// ------------------------------------------------------------
export type LaneMeta = {
  id: Lane
  label: string
  description: string
  requirement: string
  available: boolean
}

export const LANES: LaneMeta[] = [
  {
    id: "open",
    label: "Open Lane",
    description: "Anyone with an account. Default path. Massive field, real chaos.",
    requirement: "Account in good standing",
    available: true,
  },
  {
    id: "crown",
    label: "Crown Lane",
    description:
      "Pre-verified elite path. Smaller bracket, higher stakes, no qualifiers — straight to Round of 256.",
    requirement: "Phone verified · ELO ≥ 2400 · 90+ days active",
    available: false, // current user not yet eligible — drives scarcity
  },
]

// ------------------------------------------------------------
// Selection Path — every stage in chronological order.
// Status reflects the present moment: registration is LIVE.
// ------------------------------------------------------------
export type Stage = {
  id: string
  index: number
  title: string
  shortLabel: string
  date: string // ISO date
  dateLabel: string
  status: StageStatus
  desc: string
  fieldSize?: number
  // For "live" stages, optional progress percentage.
  progress?: number
}

export const STAGES: Stage[] = [
  {
    id: "registration",
    index: 1,
    title: "Registration",
    shortLabel: "REG",
    date: "2026-04-01",
    dateLabel: "Apr 01 → May 20",
    status: "live",
    desc: "Pick your track. Sign up before the deadline. No late entries.",
    fieldSize: 18432,
    progress: 62,
  },
  {
    id: "qualifiers",
    index: 2,
    title: "Qualifiers",
    shortLabel: "Q",
    date: "2026-05-22",
    dateLabel: "May 22 → May 28",
    status: "upcoming",
    desc: "5 ranked rounds. Top 4096 advance to the knockout bracket.",
    fieldSize: 18432,
  },
  {
    id: "ro64",
    index: 3,
    title: "Round of 64",
    shortLabel: "R64",
    date: "2026-05-30",
    dateLabel: "May 30 → Jun 01",
    status: "upcoming",
    desc: "Single-elimination. Lose once and you wait 12 months.",
    fieldSize: 4096,
  },
  {
    id: "ro16",
    index: 4,
    title: "Round of 16",
    shortLabel: "R16",
    date: "2026-06-05",
    dateLabel: "June 5 → 7",
    status: "upcoming",
    desc: "Best-of-three. Ranked broadcast on the platform.",
    fieldSize: 64,
  },
  {
    id: "semifinals",
    index: 5,
    title: "Semifinals",
    shortLabel: "SF",
    date: "2026-06-10",
    dateLabel: "June 10",
    status: "upcoming",
    desc: "Four contenders enter. Two leave. Live commentary.",
    fieldSize: 16,
  },
  {
    id: "finals",
    index: 6,
    title: "Grand Finals",
    shortLabel: "GF",
    date: "2026-06-14",
    dateLabel: "June 14",
    status: "upcoming",
    desc: "Online live finals. Ceremony streamed. One champion per track.",
    fieldSize: 4,
  },
  {
    id: "crowning",
    index: 7,
    title: "Hall of Champions",
    shortLabel: "HOC",
    date: "2026-06-15",
    dateLabel: "June 15",
    status: "locked",
    desc: "Champion enshrined permanently. Gold frame across the platform.",
    fieldSize: 1,
  },
]

// ------------------------------------------------------------
// User registration state (per track) — drives CTAs.
// ------------------------------------------------------------
export type UserTrackState = {
  status: RegistrationStatus
  registeredAt?: string
  rank?: number // current position within the track
  outOf?: number
  bestStage?: string
}

export const USER_STATE: Record<Track, UserTrackState> = {
  solo: {
    status: "registered",
    registeredAt: "2026-04-12",
    rank: 482,
    outOf: 12480,
    bestStage: "Registration confirmed",
  },
  duo: {
    status: "not_registered",
  },
  clan: {
    status: "not_registered",
  },
}

// ------------------------------------------------------------
// Live standings (top of the open lane, current track snapshot)
// ------------------------------------------------------------
export type StandingRow = {
  rank: number
  name: string
  handle: string
  score: number
  delta: number // ± since last update
  region: string
  isYou?: boolean
  flair?: "rising" | "falling" | "champion"
}

export const LIVE_STANDINGS_SOLO: StandingRow[] = [
  { rank: 1, name: "Aarav Mehta", handle: "blacknova", score: 4892, delta: 28, region: "Mumbai", flair: "champion" },
  { rank: 2, name: "Rhea Iyer", handle: "syntax_rhea", score: 4790, delta: 14, region: "Bengaluru" },
  { rank: 3, name: "Kunal Saxena", handle: "0x_kunal", score: 4744, delta: 22, region: "Delhi", flair: "rising" },
  { rank: 4, name: "Priya Banerjee", handle: "p_banerjee", score: 4691, delta: -6, region: "Kolkata", flair: "falling" },
  { rank: 5, name: "Vivaan Joshi", handle: "vivaan_j", score: 4620, delta: 18, region: "Pune" },
  { rank: 6, name: "Ananya Rao", handle: "anya.rao", score: 4588, delta: 9, region: "Hyderabad" },
  { rank: 7, name: "Dev Kapoor", handle: "dev.kapoor", score: 4532, delta: -2, region: "Chandigarh" },
  { rank: 8, name: "Ishita Nair", handle: "ish_nair", score: 4501, delta: 12, region: "Kochi" },
  // The current user — slotted at rank 482 but rendered separately
]

// ------------------------------------------------------------
// Hall of Champions — the permanent shrine.
// Newest season first, oldest last. Each season has 3 champions.
// ------------------------------------------------------------
export type Champion = {
  id: string
  season: string
  seasonLabel: string
  year: number
  track: Track
  hallRank: number // 1 = first ever champion in this track
  primaryName: string // person OR clan name OR duo joint label
  members?: { name: string; handle: string; initials: string; hue: number }[]
  handle?: string
  initials: string
  hue: number // for deterministic gradient avatars
  region: string
  finalScore: string
  defeatedInFinals: string
  signature: string // their signature problem / move / win condition
  quote: string
  badge: string // permanent profile badge label
}

export const CHAMPIONS: Champion[] = [
  // --- 2025 (most recent past) ---
  {
    id: "2025-solo",
    season: "india-2025",
    seasonLabel: "INDIA 2025",
    year: 2025,
    track: "solo",
    hallRank: 5,
    primaryName: "Yashvi Pandit",
    handle: "yashvi.code",
    initials: "YP",
    hue: 196,
    region: "Bengaluru",
    finalScore: "2840 / 3000",
    defeatedInFinals: "Karan Mehrotra",
    signature: "Solved 'Quantum Lattice' in 4m 12s — fastest final ever recorded.",
    quote: "I didn't come here to play. I came here to be the only one left.",
    badge: "CHAMPION 2025",
  },
  {
    id: "2025-duo",
    season: "india-2025",
    seasonLabel: "INDIA 2025",
    year: 2025,
    track: "duo",
    hallRank: 5,
    primaryName: "Helix",
    members: [
      { name: "Arnav Bhatia", handle: "arn_bhatia", initials: "AB", hue: 200 },
      { name: "Tara Krishnan", handle: "tara.k", initials: "TK", hue: 28 },
    ],
    initials: "HX",
    hue: 188,
    region: "Mumbai · Chennai",
    finalScore: "1920 / 2000",
    defeatedInFinals: "Duo Vortex",
    signature: "Won every round under 6 minutes. Telepathic pair-programming.",
    quote: "Two minds. One compiler. No noise.",
    badge: "DUO CHAMPION 2025",
  },
  {
    id: "2025-clan",
    season: "india-2025",
    seasonLabel: "INDIA 2025",
    year: 2025,
    track: "clan",
    hallRank: 5,
    primaryName: "Sable Vector",
    initials: "SV",
    hue: 14,
    region: "Pan-India · 7 members",
    finalScore: "5810 / 6000",
    defeatedInFinals: "Clan Indigo",
    signature: "Down 0-2 in finals. Reverse-swept Indigo with a 4m clutch round.",
    quote: "We were never the favorites. Now we're the only ones remembered.",
    badge: "CLAN CHAMPION 2025",
  },

  // --- 2024 ---
  {
    id: "2024-solo",
    season: "india-2024",
    seasonLabel: "INDIA 2024",
    year: 2024,
    track: "solo",
    hallRank: 4,
    primaryName: "Karthik Iyer",
    handle: "k.iyer.dev",
    initials: "KI",
    hue: 210,
    region: "Hyderabad",
    finalScore: "2756 / 3000",
    defeatedInFinals: "Aditi Saxena",
    signature: "Won 11 of 11 final-bracket matches without dropping a single round.",
    quote: "I trained 9 months. The finals lasted 39 minutes. Worth it.",
    badge: "CHAMPION 2024",
  },
  {
    id: "2024-duo",
    season: "india-2024",
    seasonLabel: "INDIA 2024",
    year: 2024,
    track: "duo",
    hallRank: 4,
    primaryName: "Echo.exe",
    members: [
      { name: "Mira Sen", handle: "mira_sen", initials: "MS", hue: 190 },
      { name: "Rohan Pillai", handle: "rohanp", initials: "RP", hue: 24 },
    ],
    initials: "EX",
    hue: 200,
    region: "Kolkata · Kochi",
    finalScore: "1815 / 2000",
    defeatedInFinals: "Duo Mirage",
    signature: "Coined the 'split-stream' strategy now used at every level.",
    quote: "Sync or sink.",
    badge: "DUO CHAMPION 2024",
  },
  {
    id: "2024-clan",
    season: "india-2024",
    seasonLabel: "INDIA 2024",
    year: 2024,
    track: "clan",
    hallRank: 4,
    primaryName: "Obsidian Pact",
    initials: "OP",
    hue: 8,
    region: "Pan-India · 6 members",
    finalScore: "5620 / 6000",
    defeatedInFinals: "Clan Halcyon",
    signature: "First clan to ever win without losing a single match across the bracket.",
    quote: "Eleven matches. Zero losses. One trophy.",
    badge: "CLAN CHAMPION 2024",
  },

  // --- 2023 ---
  {
    id: "2023-solo",
    season: "india-2023",
    seasonLabel: "INDIA 2023",
    year: 2023,
    track: "solo",
    hallRank: 3,
    primaryName: "Naina Kulkarni",
    handle: "naina_k",
    initials: "NK",
    hue: 200,
    region: "Pune",
    finalScore: "2698 / 3000",
    defeatedInFinals: "Vihaan Reddy",
    signature: "First woman champion in CodeTrackX history.",
    quote: "They said I was an underdog. I said I was the answer.",
    badge: "CHAMPION 2023",
  },
  {
    id: "2023-duo",
    season: "india-2023",
    seasonLabel: "INDIA 2023",
    year: 2023,
    track: "duo",
    hallRank: 3,
    primaryName: "Riftwalkers",
    members: [
      { name: "Shaurya Malhotra", handle: "shaurya_m", initials: "SM", hue: 16 },
      { name: "Diya Chowdhury", handle: "diya.c", initials: "DC", hue: 196 },
    ],
    initials: "RW",
    hue: 184,
    region: "Delhi · Ahmedabad",
    finalScore: "1762 / 2000",
    defeatedInFinals: "Duo Cipher",
    signature: "Five rounds. Five different paradigms. Total mastery.",
    quote: "We don't share a screen. We share a brain.",
    badge: "DUO CHAMPION 2023",
  },
  {
    id: "2023-clan",
    season: "india-2023",
    seasonLabel: "INDIA 2023",
    year: 2023,
    track: "clan",
    hallRank: 3,
    primaryName: "Quartz Echelon",
    initials: "QE",
    hue: 200,
    region: "Pan-India · 5 members",
    finalScore: "5450 / 6000",
    defeatedInFinals: "Clan Vortex",
    signature: "Won finals while down 2 members due to disconnect. Played 3v5.",
    quote: "We finished what we started. With whoever was left.",
    badge: "CLAN CHAMPION 2023",
  },

  // --- 2022 ---
  {
    id: "2022-solo",
    season: "india-2022",
    seasonLabel: "INDIA 2022",
    year: 2022,
    track: "solo",
    hallRank: 2,
    primaryName: "Aryaman Khatri",
    handle: "ary.khatri",
    initials: "AK",
    hue: 18,
    region: "Jaipur",
    finalScore: "2611 / 3000",
    defeatedInFinals: "Sanjana Murthy",
    signature: "Built his own training simulator — half the platform now uses it.",
    quote: "I beat the bracket because I beat myself first.",
    badge: "CHAMPION 2022",
  },
  {
    id: "2022-duo",
    season: "india-2022",
    seasonLabel: "INDIA 2022",
    year: 2022,
    track: "duo",
    hallRank: 2,
    primaryName: "Null & Void",
    members: [
      { name: "Ishaan Verma", handle: "ishaan.v", initials: "IV", hue: 188 },
      { name: "Aaditi Singh", handle: "aaditi_s", initials: "AS", hue: 200 },
    ],
    initials: "NV",
    hue: 196,
    region: "Delhi · Mumbai",
    finalScore: "1701 / 2000",
    defeatedInFinals: "Duo Apex",
    signature: "Second-ever duo crowned. Pioneered the modern coordination meta.",
    quote: "We were the prototype. Everyone since copies us.",
    badge: "DUO CHAMPION 2022",
  },
  {
    id: "2022-clan",
    season: "india-2022",
    seasonLabel: "INDIA 2022",
    year: 2022,
    track: "clan",
    hallRank: 2,
    primaryName: "Iron Lattice",
    initials: "IL",
    hue: 14,
    region: "Pan-India · 5 members",
    finalScore: "5380 / 6000",
    defeatedInFinals: "Clan Aurora",
    signature: "Defended the title. Only clan ever to win in back-to-back seasons.",
    quote: "The first one is luck. The second one is law.",
    badge: "CLAN CHAMPION 2022",
  },

  // --- 2021 (the inaugural season) ---
  {
    id: "2021-solo",
    season: "india-2021",
    seasonLabel: "INDIA 2021",
    year: 2021,
    track: "solo",
    hallRank: 1,
    primaryName: "Devansh Rao",
    handle: "devansh_r",
    initials: "DR",
    hue: 196,
    region: "Bengaluru",
    finalScore: "2540 / 3000",
    defeatedInFinals: "Aakash Mishra",
    signature: "The first. Every champion since has trained against his recordings.",
    quote: "Someone had to be first. It might as well have been me.",
    badge: "FIRST CHAMPION · 2021",
  },
  {
    id: "2021-duo",
    season: "india-2021",
    seasonLabel: "INDIA 2021",
    year: 2021,
    track: "duo",
    hallRank: 1,
    primaryName: "Iron Lattice",
    members: [
      { name: "Aarav Trivedi", handle: "aarav_t", initials: "AT", hue: 14 },
      { name: "Nisha Bhatt", handle: "n.bhatt", initials: "NB", hue: 28 },
    ],
    initials: "IL",
    hue: 14,
    region: "Bengaluru · Mumbai",
    finalScore: "1640 / 2000",
    defeatedInFinals: "Duo Phantom",
    signature: "Inaugural duo champions. Later founded Iron Lattice the clan.",
    quote: "We didn't start the game. We just defined how it's won.",
    badge: "FIRST DUO CHAMPION · 2021",
  },
  {
    id: "2021-clan",
    season: "india-2021",
    seasonLabel: "INDIA 2021",
    year: 2021,
    track: "clan",
    hallRank: 1,
    primaryName: "Aurora Sentinel",
    initials: "AS",
    hue: 196,
    region: "Pan-India · 5 members",
    finalScore: "5210 / 6000",
    defeatedInFinals: "Clan Vanguard",
    signature: "The original. Founding clan of the Championship era.",
    quote: "We built the wall. Now everyone climbs it.",
    badge: "FIRST CLAN CHAMPION · 2021",
  },
]

// ------------------------------------------------------------
// Helpers
// ------------------------------------------------------------
export function getStatusMeta(status: RegistrationStatus): {
  label: string
  color: "muted" | "neon" | "neon-soft" | "ember" | "gold" | "blood"
  desc: string
} {
  switch (status) {
    case "not_registered":
      return { label: "NOT REGISTERED", color: "muted", desc: "Open lane available" }
    case "registered":
      return { label: "REGISTERED", color: "neon", desc: "Awaiting qualifiers" }
    case "qualified":
      return { label: "QUALIFIED", color: "neon-soft", desc: "Advanced to knockout" }
    case "knockout":
      return { label: "KNOCKOUT", color: "ember", desc: "In single-elim bracket" }
    case "finalist":
      return { label: "FINALIST", color: "ember", desc: "One match from immortality" }
    case "champion":
      return { label: "CHAMPION", color: "gold", desc: "Hall of Champions secured" }
    case "eliminated":
      return { label: "ELIMINATED", color: "blood", desc: "Try again next season" }
  }
}

// Group champions by season for the Hall.
export function getChampionsBySeason(): { season: string; label: string; year: number; rows: Champion[] }[] {
  const map = new Map<string, { season: string; label: string; year: number; rows: Champion[] }>()
  for (const c of CHAMPIONS) {
    if (!map.has(c.season)) {
      map.set(c.season, { season: c.season, label: c.seasonLabel, year: c.year, rows: [] })
    }
    map.get(c.season)!.rows.push(c)
  }
  // Order: solo, duo, clan within a season for visual rhythm
  const order: Track[] = ["solo", "duo", "clan"]
  for (const group of map.values()) {
    group.rows.sort((a, b) => order.indexOf(a.track) - order.indexOf(b.track))
  }
  return Array.from(map.values()).sort((a, b) => b.year - a.year)
}

export function getTrackMeta(id: Track): TrackMeta {
  return TRACKS.find((t) => t.id === id)!
}

// Days until registration deadline (deterministic — we anchor to the
// season deadline string and let the page compute live in the client).
export function daysUntil(iso: string, now = new Date()): number {
  const target = new Date(iso).getTime()
  const diff = target - now.getTime()
  return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)))
}
