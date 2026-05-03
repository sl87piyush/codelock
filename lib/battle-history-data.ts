// ====================================================================
// BATTLE HISTORY — Data layer
// Records of every match the player has fought across all formats.
// Solo 1v1, Duo 2v2, Clan Wars. Used by /battle-history.
// ====================================================================

export type MatchMode = "SOLO" | "DUO" | "CLAN_WAR"
export type MatchOutcome = "WIN" | "LOSS" | "DRAW"

export type Difficulty = "Easy" | "Medium" | "Hard" | "Insane"

export type ProblemRecord = {
  id: string
  name: string
  difficulty: Difficulty
  // -1 if not solved by you / your side; minutes otherwise
  solvedInMin: number | null
  solvedBy: "you" | "ally" | "opponent" | "none"
  points: number
}

export type RoundRecord = {
  index: number
  yourScore: number
  oppScore: number
  outcome: MatchOutcome
  durationMin: number
}

export type CombatantPreview = {
  initials: string
  rating: number
  // gradient class fragments for crest
  from: string
  to: string
  ring?: "neon" | "electric" | "ember" | "blood" | "gold"
}

export type ClanCombatant = {
  name: string
  tag: string
  monogram: string
  from: string
  to: string
  rank: number
  membersPlayed: number
  totalXp: number
}

type BaseMatch = {
  id: string
  // ISO timestamp of match end
  endedAt: string
  // duration of the entire match in minutes
  durationMin: number
  outcome: MatchOutcome
  // your side score / opponent side score (final)
  yourScore: number
  oppScore: number
  // ladder point delta for you (or your clan in CLAN_WAR)
  lpDelta: number
  ratingBefore: number
  ratingAfter: number
  // best-of N (1, 3, 5)
  bestOf: 1 | 3 | 5
  rounds: RoundRecord[]
  problems: ProblemRecord[]
  // optional MVP for the match (your side)
  mvp?: string
  // free-form replay or recap link
  recap?: string
}

export type SoloMatch = BaseMatch & {
  mode: "SOLO"
  you: CombatantPreview & { name: string }
  opponent: CombatantPreview & { name: string }
}

export type DuoMatch = BaseMatch & {
  mode: "DUO"
  yourTeam: {
    name: string
    members: (CombatantPreview & { name: string; role?: string })[]
  }
  oppTeam: {
    name: string
    members: (CombatantPreview & { name: string; role?: string })[]
  }
}

export type ClanWarMatch = BaseMatch & {
  mode: "CLAN_WAR"
  yourClan: ClanCombatant
  oppClan: ClanCombatant
  // top contributors for narrative on expand
  topContributors: { name: string; xp: number; problems: number }[]
  weekTag?: string
}

export type AnyMatch = SoloMatch | DuoMatch | ClanWarMatch

// --------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------

export const MODE_META: Record<
  MatchMode,
  {
    label: string
    short: string
    accent: "neon" | "ember" | "blood" | "gold" | "electric"
    sector: string
  }
> = {
  SOLO: { label: "Solo 1v1", short: "1v1", accent: "neon", sector: "SOLO" },
  DUO: { label: "Duo 2v2", short: "2v2", accent: "electric", sector: "DUO" },
  CLAN_WAR: {
    label: "Clan War",
    short: "WAR",
    accent: "blood",
    sector: "CLAN",
  },
}

export const OUTCOME_META: Record<
  MatchOutcome,
  {
    label: string
    accent: "neon" | "blood" | "gold"
    chipClass: string
    barClass: string
  }
> = {
  WIN: {
    label: "VICTORY",
    accent: "neon",
    chipClass: "border-neon/55 bg-neon/10 text-neon",
    barClass: "from-neon/60 to-neon",
  },
  LOSS: {
    label: "DEFEAT",
    accent: "blood",
    chipClass: "border-blood/55 bg-blood/10 text-blood",
    barClass: "from-blood/60 to-blood",
  },
  DRAW: {
    label: "DRAW",
    accent: "gold",
    chipClass: "border-gold/55 bg-gold/10 text-gold",
    barClass: "from-gold/60 to-gold",
  },
}

export const DIFFICULTY_META: Record<
  Difficulty,
  { color: string; chip: string }
> = {
  Easy: {
    color: "text-neon",
    chip: "border-neon/40 bg-neon/10 text-neon",
  },
  Medium: {
    color: "text-gold",
    chip: "border-gold/45 bg-gold/10 text-gold",
  },
  Hard: {
    color: "text-ember",
    chip: "border-ember/45 bg-ember/10 text-ember",
  },
  Insane: {
    color: "text-blood",
    chip: "border-blood/55 bg-blood/10 text-blood",
  },
}

// Format minutes to short display (e.g. 73 -> "1h 13m", 26 -> "26m")
export function formatDuration(min: number): string {
  if (min < 60) return `${min}m`
  const h = Math.floor(min / 60)
  const m = min % 60
  return m === 0 ? `${h}h` : `${h}h ${m}m`
}

// Relative date display: "2h ago", "Yesterday", "3d ago", "Mar 14"
export function formatRelative(iso: string, now = Date.now()): string {
  const t = new Date(iso).getTime()
  const diff = now - t
  const min = Math.round(diff / 60_000)
  if (min < 1) return "just now"
  if (min < 60) return `${min}m ago`
  const h = Math.round(min / 60)
  if (h < 24) return `${h}h ago`
  const d = Math.round(h / 24)
  if (d === 1) return "Yesterday"
  if (d < 7) return `${d}d ago`
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })
}

// Absolute date display: "Mar 14, 2026 · 21:42"
export function formatAbsolute(iso: string): string {
  const d = new Date(iso)
  const date = d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
  const time = d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
  return `${date} · ${time}`
}

// --------------------------------------------------------------------
// Seed data
// --------------------------------------------------------------------

const HOUR = 60 * 60 * 1000
const DAY = 24 * HOUR
// fixed reference so the page is deterministic (May 3 2026, 21:00 UTC)
const NOW = new Date("2026-05-03T21:00:00Z").getTime()
const ago = (ms: number) => new Date(NOW - ms).toISOString()

export const SOLO_MATCHES: SoloMatch[] = [
  {
    id: "S-7782",
    mode: "SOLO",
    endedAt: ago(40 * 60 * 1000),
    durationMin: 38,
    outcome: "WIN",
    yourScore: 3,
    oppScore: 1,
    lpDelta: 24,
    ratingBefore: 1842,
    ratingAfter: 1866,
    bestOf: 5,
    you: {
      name: "alone_egoist",
      initials: "AE",
      rating: 1866,
      from: "from-neon",
      to: "to-electric",
      ring: "neon",
    },
    opponent: {
      name: "void_walker",
      initials: "VW",
      rating: 1798,
      from: "from-ember",
      to: "to-blood",
      ring: "ember",
    },
    rounds: [
      { index: 1, yourScore: 1, oppScore: 0, outcome: "WIN", durationMin: 7 },
      { index: 2, yourScore: 0, oppScore: 1, outcome: "LOSS", durationMin: 9 },
      { index: 3, yourScore: 1, oppScore: 0, outcome: "WIN", durationMin: 11 },
      { index: 4, yourScore: 1, oppScore: 0, outcome: "WIN", durationMin: 11 },
    ],
    problems: [
      {
        id: "p1",
        name: "Sliding Window Median",
        difficulty: "Hard",
        solvedInMin: 9,
        solvedBy: "you",
        points: 100,
      },
      {
        id: "p2",
        name: "Two Pointers Drift",
        difficulty: "Medium",
        solvedInMin: 4,
        solvedBy: "opponent",
        points: 60,
      },
      {
        id: "p3",
        name: "Topological Cascade",
        difficulty: "Hard",
        solvedInMin: 11,
        solvedBy: "you",
        points: 100,
      },
      {
        id: "p4",
        name: "Bit Manipulation Chain",
        difficulty: "Medium",
        solvedInMin: 8,
        solvedBy: "you",
        points: 60,
      },
    ],
    mvp: "alone_egoist",
    recap: "/replays/s-7782",
  },
  {
    id: "S-7771",
    mode: "SOLO",
    endedAt: ago(5 * HOUR),
    durationMin: 22,
    outcome: "LOSS",
    yourScore: 0,
    oppScore: 3,
    lpDelta: -18,
    ratingBefore: 1860,
    ratingAfter: 1842,
    bestOf: 3,
    you: {
      name: "alone_egoist",
      initials: "AE",
      rating: 1842,
      from: "from-neon",
      to: "to-electric",
    },
    opponent: {
      name: "kira.exe",
      initials: "KX",
      rating: 1923,
      from: "from-blood",
      to: "to-ember",
      ring: "blood",
    },
    rounds: [
      { index: 1, yourScore: 0, oppScore: 1, outcome: "LOSS", durationMin: 6 },
      { index: 2, yourScore: 0, oppScore: 1, outcome: "LOSS", durationMin: 7 },
      { index: 3, yourScore: 0, oppScore: 1, outcome: "LOSS", durationMin: 9 },
    ],
    problems: [
      {
        id: "p1",
        name: "Segment Tree Lazy Prop",
        difficulty: "Insane",
        solvedInMin: 6,
        solvedBy: "opponent",
        points: 140,
      },
      {
        id: "p2",
        name: "Heavy-Light Decomp",
        difficulty: "Hard",
        solvedInMin: 7,
        solvedBy: "opponent",
        points: 100,
      },
      {
        id: "p3",
        name: "Convex Hull Trick",
        difficulty: "Hard",
        solvedInMin: 9,
        solvedBy: "opponent",
        points: 100,
      },
    ],
  },
  {
    id: "S-7765",
    mode: "SOLO",
    endedAt: ago(DAY + 2 * HOUR),
    durationMin: 31,
    outcome: "WIN",
    yourScore: 2,
    oppScore: 1,
    lpDelta: 19,
    ratingBefore: 1841,
    ratingAfter: 1860,
    bestOf: 3,
    you: {
      name: "alone_egoist",
      initials: "AE",
      rating: 1860,
      from: "from-neon",
      to: "to-electric",
    },
    opponent: {
      name: "byte_storm",
      initials: "BS",
      rating: 1810,
      from: "from-electric",
      to: "to-neon",
      ring: "electric",
    },
    rounds: [
      { index: 1, yourScore: 1, oppScore: 0, outcome: "WIN", durationMin: 9 },
      { index: 2, yourScore: 0, oppScore: 1, outcome: "LOSS", durationMin: 12 },
      { index: 3, yourScore: 1, oppScore: 0, outcome: "WIN", durationMin: 10 },
    ],
    problems: [
      {
        id: "p1",
        name: "DP on Trees",
        difficulty: "Hard",
        solvedInMin: 9,
        solvedBy: "you",
        points: 100,
      },
      {
        id: "p2",
        name: "Mo's Algorithm",
        difficulty: "Insane",
        solvedInMin: 12,
        solvedBy: "opponent",
        points: 140,
      },
      {
        id: "p3",
        name: "Suffix Automaton",
        difficulty: "Hard",
        solvedInMin: 10,
        solvedBy: "you",
        points: 100,
      },
    ],
    mvp: "alone_egoist",
  },
  {
    id: "S-7752",
    mode: "SOLO",
    endedAt: ago(2 * DAY + 4 * HOUR),
    durationMin: 14,
    outcome: "WIN",
    yourScore: 1,
    oppScore: 0,
    lpDelta: 12,
    ratingBefore: 1829,
    ratingAfter: 1841,
    bestOf: 1,
    you: {
      name: "alone_egoist",
      initials: "AE",
      rating: 1841,
      from: "from-neon",
      to: "to-electric",
    },
    opponent: {
      name: "null_runner",
      initials: "NR",
      rating: 1755,
      from: "from-ember",
      to: "to-gold",
    },
    rounds: [
      { index: 1, yourScore: 1, oppScore: 0, outcome: "WIN", durationMin: 14 },
    ],
    problems: [
      {
        id: "p1",
        name: "Trie Prefix Match",
        difficulty: "Medium",
        solvedInMin: 14,
        solvedBy: "you",
        points: 60,
      },
    ],
  },
  {
    id: "S-7740",
    mode: "SOLO",
    endedAt: ago(3 * DAY + HOUR),
    durationMin: 26,
    outcome: "DRAW",
    yourScore: 1,
    oppScore: 1,
    lpDelta: 0,
    ratingBefore: 1829,
    ratingAfter: 1829,
    bestOf: 3,
    you: {
      name: "alone_egoist",
      initials: "AE",
      rating: 1829,
      from: "from-neon",
      to: "to-electric",
    },
    opponent: {
      name: "ghost_proto",
      initials: "GP",
      rating: 1832,
      from: "from-gold",
      to: "to-ember",
      ring: "gold",
    },
    rounds: [
      { index: 1, yourScore: 1, oppScore: 0, outcome: "WIN", durationMin: 11 },
      { index: 2, yourScore: 0, oppScore: 1, outcome: "LOSS", durationMin: 9 },
      { index: 3, yourScore: 0, oppScore: 0, outcome: "DRAW", durationMin: 6 },
    ],
    problems: [
      {
        id: "p1",
        name: "Union Find Rollback",
        difficulty: "Hard",
        solvedInMin: 11,
        solvedBy: "you",
        points: 100,
      },
      {
        id: "p2",
        name: "KMP Variant",
        difficulty: "Medium",
        solvedInMin: 9,
        solvedBy: "opponent",
        points: 60,
      },
      {
        id: "p3",
        name: "Game Theory Grid",
        difficulty: "Insane",
        solvedInMin: null,
        solvedBy: "none",
        points: 0,
      },
    ],
  },
  {
    id: "S-7721",
    mode: "SOLO",
    endedAt: ago(5 * DAY + 6 * HOUR),
    durationMin: 19,
    outcome: "WIN",
    yourScore: 2,
    oppScore: 0,
    lpDelta: 21,
    ratingBefore: 1808,
    ratingAfter: 1829,
    bestOf: 3,
    you: {
      name: "alone_egoist",
      initials: "AE",
      rating: 1829,
      from: "from-neon",
      to: "to-electric",
    },
    opponent: {
      name: "stack_witch",
      initials: "SW",
      rating: 1789,
      from: "from-blood",
      to: "to-ember",
    },
    rounds: [
      { index: 1, yourScore: 1, oppScore: 0, outcome: "WIN", durationMin: 9 },
      { index: 2, yourScore: 1, oppScore: 0, outcome: "WIN", durationMin: 10 },
    ],
    problems: [
      {
        id: "p1",
        name: "Interval Scheduling",
        difficulty: "Medium",
        solvedInMin: 9,
        solvedBy: "you",
        points: 60,
      },
      {
        id: "p2",
        name: "Min-Cost Flow",
        difficulty: "Hard",
        solvedInMin: 10,
        solvedBy: "you",
        points: 100,
      },
    ],
    mvp: "alone_egoist",
  },
]

export const DUO_MATCHES: DuoMatch[] = [
  {
    id: "D-3318",
    mode: "DUO",
    endedAt: ago(2 * HOUR + 15 * 60 * 1000),
    durationMin: 44,
    outcome: "WIN",
    yourScore: 3,
    oppScore: 2,
    lpDelta: 28,
    ratingBefore: 1880,
    ratingAfter: 1908,
    bestOf: 5,
    yourTeam: {
      name: "Locked-In",
      members: [
        {
          name: "alone_egoist",
          initials: "AE",
          rating: 1908,
          from: "from-neon",
          to: "to-electric",
          role: "Captain",
        },
        {
          name: "raze.dev",
          initials: "RZ",
          rating: 1854,
          from: "from-electric",
          to: "to-neon",
          role: "Sweeper",
        },
      ],
    },
    oppTeam: {
      name: "Null Pointers",
      members: [
        {
          name: "axiom_07",
          initials: "AX",
          rating: 1872,
          from: "from-blood",
          to: "to-ember",
        },
        {
          name: "kintsugi",
          initials: "KT",
          rating: 1845,
          from: "from-ember",
          to: "to-blood",
        },
      ],
    },
    rounds: [
      { index: 1, yourScore: 1, oppScore: 0, outcome: "WIN", durationMin: 8 },
      { index: 2, yourScore: 0, oppScore: 1, outcome: "LOSS", durationMin: 9 },
      { index: 3, yourScore: 1, oppScore: 0, outcome: "WIN", durationMin: 11 },
      { index: 4, yourScore: 0, oppScore: 1, outcome: "LOSS", durationMin: 7 },
      { index: 5, yourScore: 1, oppScore: 0, outcome: "WIN", durationMin: 9 },
    ],
    problems: [
      {
        id: "p1",
        name: "Parallel BFS",
        difficulty: "Medium",
        solvedInMin: 8,
        solvedBy: "ally",
        points: 60,
      },
      {
        id: "p2",
        name: "Persistent Trie",
        difficulty: "Hard",
        solvedInMin: 9,
        solvedBy: "opponent",
        points: 100,
      },
      {
        id: "p3",
        name: "Centroid Decomp",
        difficulty: "Insane",
        solvedInMin: 11,
        solvedBy: "you",
        points: 140,
      },
      {
        id: "p4",
        name: "FFT Multiplication",
        difficulty: "Hard",
        solvedInMin: 7,
        solvedBy: "opponent",
        points: 100,
      },
      {
        id: "p5",
        name: "DP Bitmask Subset",
        difficulty: "Hard",
        solvedInMin: 9,
        solvedBy: "you",
        points: 100,
      },
    ],
    mvp: "alone_egoist",
    recap: "/replays/d-3318",
  },
  {
    id: "D-3309",
    mode: "DUO",
    endedAt: ago(DAY + 5 * HOUR),
    durationMin: 36,
    outcome: "LOSS",
    yourScore: 1,
    oppScore: 2,
    lpDelta: -16,
    ratingBefore: 1896,
    ratingAfter: 1880,
    bestOf: 3,
    yourTeam: {
      name: "Locked-In",
      members: [
        {
          name: "alone_egoist",
          initials: "AE",
          rating: 1880,
          from: "from-neon",
          to: "to-electric",
          role: "Captain",
        },
        {
          name: "neo.kn",
          initials: "NK",
          rating: 1812,
          from: "from-gold",
          to: "to-ember",
          role: "Anchor",
        },
      ],
    },
    oppTeam: {
      name: "Heap Overflow",
      members: [
        {
          name: "lambda.x",
          initials: "LX",
          rating: 1932,
          from: "from-blood",
          to: "to-ember",
        },
        {
          name: "syn.tax",
          initials: "ST",
          rating: 1888,
          from: "from-ember",
          to: "to-gold",
        },
      ],
    },
    rounds: [
      { index: 1, yourScore: 0, oppScore: 1, outcome: "LOSS", durationMin: 12 },
      { index: 2, yourScore: 1, oppScore: 0, outcome: "WIN", durationMin: 13 },
      { index: 3, yourScore: 0, oppScore: 1, outcome: "LOSS", durationMin: 11 },
    ],
    problems: [
      {
        id: "p1",
        name: "Number Theory: Mobius",
        difficulty: "Hard",
        solvedInMin: 12,
        solvedBy: "opponent",
        points: 100,
      },
      {
        id: "p2",
        name: "Game DP Minimax",
        difficulty: "Medium",
        solvedInMin: 13,
        solvedBy: "ally",
        points: 60,
      },
      {
        id: "p3",
        name: "Aho-Corasick",
        difficulty: "Insane",
        solvedInMin: 11,
        solvedBy: "opponent",
        points: 140,
      },
    ],
  },
  {
    id: "D-3294",
    mode: "DUO",
    endedAt: ago(4 * DAY + 3 * HOUR),
    durationMin: 51,
    outcome: "WIN",
    yourScore: 3,
    oppScore: 0,
    lpDelta: 32,
    ratingBefore: 1864,
    ratingAfter: 1896,
    bestOf: 5,
    yourTeam: {
      name: "Locked-In",
      members: [
        {
          name: "alone_egoist",
          initials: "AE",
          rating: 1896,
          from: "from-neon",
          to: "to-electric",
          role: "Captain",
        },
        {
          name: "raze.dev",
          initials: "RZ",
          rating: 1842,
          from: "from-electric",
          to: "to-neon",
          role: "Sweeper",
        },
      ],
    },
    oppTeam: {
      name: "Lint Lords",
      members: [
        {
          name: "praxis",
          initials: "PX",
          rating: 1801,
          from: "from-ember",
          to: "to-blood",
        },
        {
          name: "octet",
          initials: "OC",
          rating: 1784,
          from: "from-gold",
          to: "to-ember",
        },
      ],
    },
    rounds: [
      { index: 1, yourScore: 1, oppScore: 0, outcome: "WIN", durationMin: 14 },
      { index: 2, yourScore: 1, oppScore: 0, outcome: "WIN", durationMin: 17 },
      { index: 3, yourScore: 1, oppScore: 0, outcome: "WIN", durationMin: 20 },
    ],
    problems: [
      {
        id: "p1",
        name: "Treap Implicit",
        difficulty: "Hard",
        solvedInMin: 14,
        solvedBy: "you",
        points: 100,
      },
      {
        id: "p2",
        name: "Z-Function Pattern",
        difficulty: "Medium",
        solvedInMin: 17,
        solvedBy: "ally",
        points: 60,
      },
      {
        id: "p3",
        name: "Link-Cut Tree",
        difficulty: "Insane",
        solvedInMin: 20,
        solvedBy: "you",
        points: 140,
      },
    ],
    mvp: "raze.dev",
    recap: "/replays/d-3294",
  },
  {
    id: "D-3271",
    mode: "DUO",
    endedAt: ago(7 * DAY + 2 * HOUR),
    durationMin: 28,
    outcome: "WIN",
    yourScore: 2,
    oppScore: 1,
    lpDelta: 22,
    ratingBefore: 1842,
    ratingAfter: 1864,
    bestOf: 3,
    yourTeam: {
      name: "Locked-In",
      members: [
        {
          name: "alone_egoist",
          initials: "AE",
          rating: 1864,
          from: "from-neon",
          to: "to-electric",
          role: "Captain",
        },
        {
          name: "neo.kn",
          initials: "NK",
          rating: 1799,
          from: "from-gold",
          to: "to-ember",
          role: "Anchor",
        },
      ],
    },
    oppTeam: {
      name: "Race Condition",
      members: [
        {
          name: "mux.0",
          initials: "MX",
          rating: 1820,
          from: "from-blood",
          to: "to-ember",
        },
        {
          name: "yield.x",
          initials: "YX",
          rating: 1788,
          from: "from-electric",
          to: "to-neon",
        },
      ],
    },
    rounds: [
      { index: 1, yourScore: 1, oppScore: 0, outcome: "WIN", durationMin: 9 },
      { index: 2, yourScore: 0, oppScore: 1, outcome: "LOSS", durationMin: 8 },
      { index: 3, yourScore: 1, oppScore: 0, outcome: "WIN", durationMin: 11 },
    ],
    problems: [
      {
        id: "p1",
        name: "DSU on Tree",
        difficulty: "Hard",
        solvedInMin: 9,
        solvedBy: "you",
        points: 100,
      },
      {
        id: "p2",
        name: "Sparse Table RMQ",
        difficulty: "Medium",
        solvedInMin: 8,
        solvedBy: "opponent",
        points: 60,
      },
      {
        id: "p3",
        name: "Manacher's",
        difficulty: "Hard",
        solvedInMin: 11,
        solvedBy: "ally",
        points: 100,
      },
    ],
  },
]

export const CLAN_WAR_MATCHES: ClanWarMatch[] = [
  {
    id: "W-241",
    mode: "CLAN_WAR",
    endedAt: ago(8 * HOUR),
    durationMin: 120,
    outcome: "WIN",
    yourScore: 14,
    oppScore: 11,
    lpDelta: 180,
    ratingBefore: 4820,
    ratingAfter: 5000,
    bestOf: 1,
    yourClan: {
      name: "Egoist Mafia",
      tag: "EGOMA",
      monogram: "EG",
      from: "from-neon",
      to: "to-electric",
      rank: 12,
      membersPlayed: 8,
      totalXp: 14_240,
    },
    oppClan: {
      name: "Heap Overflow",
      tag: "HEAP",
      monogram: "HO",
      from: "from-blood",
      to: "to-ember",
      rank: 9,
      membersPlayed: 8,
      totalXp: 11_980,
    },
    rounds: [
      {
        index: 1,
        yourScore: 5,
        oppScore: 4,
        outcome: "WIN",
        durationMin: 40,
      },
      {
        index: 2,
        yourScore: 4,
        oppScore: 5,
        outcome: "LOSS",
        durationMin: 40,
      },
      {
        index: 3,
        yourScore: 5,
        oppScore: 2,
        outcome: "WIN",
        durationMin: 40,
      },
    ],
    problems: [
      {
        id: "p1",
        name: "Network Flow Saga",
        difficulty: "Insane",
        solvedInMin: 38,
        solvedBy: "ally",
        points: 140,
      },
      {
        id: "p2",
        name: "Persistent Segment Tree",
        difficulty: "Hard",
        solvedInMin: 24,
        solvedBy: "you",
        points: 100,
      },
      {
        id: "p3",
        name: "Suffix Array Sort",
        difficulty: "Hard",
        solvedInMin: 31,
        solvedBy: "ally",
        points: 100,
      },
      {
        id: "p4",
        name: "DP Probabilistic",
        difficulty: "Medium",
        solvedInMin: 18,
        solvedBy: "opponent",
        points: 60,
      },
    ],
    topContributors: [
      { name: "alone_egoist", xp: 2_340, problems: 6 },
      { name: "raze.dev", xp: 1_980, problems: 5 },
      { name: "neo.kn", xp: 1_720, problems: 5 },
    ],
    weekTag: "S04 · W09",
    recap: "/replays/w-241",
  },
  {
    id: "W-238",
    mode: "CLAN_WAR",
    endedAt: ago(3 * DAY + 12 * HOUR),
    durationMin: 120,
    outcome: "LOSS",
    yourScore: 9,
    oppScore: 13,
    lpDelta: -120,
    ratingBefore: 4940,
    ratingAfter: 4820,
    bestOf: 1,
    yourClan: {
      name: "Egoist Mafia",
      tag: "EGOMA",
      monogram: "EG",
      from: "from-neon",
      to: "to-electric",
      rank: 14,
      membersPlayed: 7,
      totalXp: 9_540,
    },
    oppClan: {
      name: "Race Condition",
      tag: "RACE",
      monogram: "RC",
      from: "from-blood",
      to: "to-ember",
      rank: 6,
      membersPlayed: 8,
      totalXp: 12_220,
    },
    rounds: [
      {
        index: 1,
        yourScore: 3,
        oppScore: 5,
        outcome: "LOSS",
        durationMin: 40,
      },
      {
        index: 2,
        yourScore: 4,
        oppScore: 4,
        outcome: "DRAW",
        durationMin: 40,
      },
      {
        index: 3,
        yourScore: 2,
        oppScore: 4,
        outcome: "LOSS",
        durationMin: 40,
      },
    ],
    problems: [
      {
        id: "p1",
        name: "Geometry Sweep Line",
        difficulty: "Insane",
        solvedInMin: null,
        solvedBy: "none",
        points: 0,
      },
      {
        id: "p2",
        name: "Heavy Path Decomp",
        difficulty: "Hard",
        solvedInMin: 28,
        solvedBy: "ally",
        points: 100,
      },
      {
        id: "p3",
        name: "Segment Tree Beats",
        difficulty: "Insane",
        solvedInMin: 34,
        solvedBy: "opponent",
        points: 140,
      },
      {
        id: "p4",
        name: "Min-Cut Max-Flow",
        difficulty: "Hard",
        solvedInMin: 26,
        solvedBy: "opponent",
        points: 100,
      },
    ],
    topContributors: [
      { name: "raze.dev", xp: 1_640, problems: 4 },
      { name: "alone_egoist", xp: 1_580, problems: 4 },
      { name: "kira.exe", xp: 1_320, problems: 3 },
    ],
    weekTag: "S04 · W08",
  },
  {
    id: "W-235",
    mode: "CLAN_WAR",
    endedAt: ago(6 * DAY + 4 * HOUR),
    durationMin: 120,
    outcome: "WIN",
    yourScore: 16,
    oppScore: 8,
    lpDelta: 220,
    ratingBefore: 4720,
    ratingAfter: 4940,
    bestOf: 1,
    yourClan: {
      name: "Egoist Mafia",
      tag: "EGOMA",
      monogram: "EG",
      from: "from-neon",
      to: "to-electric",
      rank: 15,
      membersPlayed: 8,
      totalXp: 16_880,
    },
    oppClan: {
      name: "Lint Lords",
      tag: "LINT",
      monogram: "LL",
      from: "from-gold",
      to: "to-ember",
      rank: 18,
      membersPlayed: 7,
      totalXp: 8_240,
    },
    rounds: [
      {
        index: 1,
        yourScore: 6,
        oppScore: 2,
        outcome: "WIN",
        durationMin: 40,
      },
      {
        index: 2,
        yourScore: 5,
        oppScore: 3,
        outcome: "WIN",
        durationMin: 40,
      },
      {
        index: 3,
        yourScore: 5,
        oppScore: 3,
        outcome: "WIN",
        durationMin: 40,
      },
    ],
    problems: [
      {
        id: "p1",
        name: "FFT Convolution",
        difficulty: "Hard",
        solvedInMin: 22,
        solvedBy: "you",
        points: 100,
      },
      {
        id: "p2",
        name: "Treap Range Update",
        difficulty: "Hard",
        solvedInMin: 28,
        solvedBy: "ally",
        points: 100,
      },
      {
        id: "p3",
        name: "Eulerian Path",
        difficulty: "Medium",
        solvedInMin: 18,
        solvedBy: "ally",
        points: 60,
      },
      {
        id: "p4",
        name: "Polynomial Hashing",
        difficulty: "Medium",
        solvedInMin: 14,
        solvedBy: "ally",
        points: 60,
      },
    ],
    topContributors: [
      { name: "alone_egoist", xp: 3_120, problems: 8 },
      { name: "raze.dev", xp: 2_440, problems: 6 },
      { name: "neo.kn", xp: 2_180, problems: 6 },
    ],
    weekTag: "S04 · W07",
    recap: "/replays/w-235",
  },
]

// All matches sorted newest -> oldest
export const ALL_MATCHES: AnyMatch[] = [
  ...SOLO_MATCHES,
  ...DUO_MATCHES,
  ...CLAN_WAR_MATCHES,
].sort(
  (a, b) => new Date(b.endedAt).getTime() - new Date(a.endedAt).getTime(),
)

// --------------------------------------------------------------------
// Aggregate stats for the page header
// --------------------------------------------------------------------

export type HistoryStats = {
  total: number
  wins: number
  losses: number
  draws: number
  winRate: number
  netLp: number
  bestStreak: number
  currentStreak: { count: number; outcome: MatchOutcome }
  byMode: Record<MatchMode, { played: number; wins: number; winRate: number }>
}

export function computeStats(matches: AnyMatch[]): HistoryStats {
  const total = matches.length
  const wins = matches.filter((m) => m.outcome === "WIN").length
  const losses = matches.filter((m) => m.outcome === "LOSS").length
  const draws = matches.filter((m) => m.outcome === "DRAW").length
  const netLp = matches.reduce((s, m) => s + m.lpDelta, 0)

  const byMode = {
    SOLO: { played: 0, wins: 0, winRate: 0 },
    DUO: { played: 0, wins: 0, winRate: 0 },
    CLAN_WAR: { played: 0, wins: 0, winRate: 0 },
  } as HistoryStats["byMode"]

  for (const m of matches) {
    byMode[m.mode].played += 1
    if (m.outcome === "WIN") byMode[m.mode].wins += 1
  }
  ;(["SOLO", "DUO", "CLAN_WAR"] as MatchMode[]).forEach((k) => {
    byMode[k].winRate =
      byMode[k].played === 0
        ? 0
        : Math.round((byMode[k].wins / byMode[k].played) * 100)
  })

  // streaks (chronological order, oldest first)
  const chronological = [...matches].sort(
    (a, b) => new Date(a.endedAt).getTime() - new Date(b.endedAt).getTime(),
  )
  let bestStreak = 0
  let curr = 0
  for (const m of chronological) {
    if (m.outcome === "WIN") {
      curr += 1
      if (curr > bestStreak) bestStreak = curr
    } else {
      curr = 0
    }
  }

  // current streak from the latest end backward, same outcome (W/L)
  const newestFirst = [...matches].sort(
    (a, b) => new Date(b.endedAt).getTime() - new Date(a.endedAt).getTime(),
  )
  let currCount = 0
  let currOutcome: MatchOutcome = "WIN"
  if (newestFirst.length > 0) {
    currOutcome = newestFirst[0].outcome
    for (const m of newestFirst) {
      if (m.outcome === currOutcome) currCount += 1
      else break
    }
  }

  return {
    total,
    wins,
    losses,
    draws,
    winRate: total === 0 ? 0 : Math.round((wins / total) * 100),
    netLp,
    bestStreak,
    currentStreak: { count: currCount, outcome: currOutcome },
    byMode,
  }
}
