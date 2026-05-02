// ====================================================================
// CLAN ARENA — Data layer
// The lobby/marketplace for the squad-vs-squad meta on the platform.
// ====================================================================

export type ClanTier = "Bronze" | "Silver" | "Gold" | "Elite" | "Legend"

export type ClanRegion =
  | "Global"
  | "Americas"
  | "EMEA"
  | "APAC"
  | "South Asia"
  | "Sea"
  | "ANZ"

export type ClanVibe =
  | "Tryhard"
  | "Casual"
  | "Mentor-Led"
  | "Speedrun"
  | "Interview-Prep"
  | "Olympiad"
  | "Open-Source"
  | "Beginner-Friendly"

export type JoinPolicy = "Open" | "Apply" | "Invite-Only" | "Closed"

export type WarStatus = "Live" | "Scheduled" | "Idle" | "Recovering"

export type ClanFocus =
  | "DSA"
  | "System Design"
  | "Competitive"
  | "Interview"
  | "OA Prep"
  | "ML/AI"
  | "Frontend"
  | "Backend"
  | "Security"

export type ClanSort =
  | "recommended"
  | "weekly-xp"
  | "trending"
  | "newest"
  | "members-asc"
  | "members-desc"
  | "vacancy"
  | "rank"

export type ClanFilterTab = "ALL" | "RECRUITING" | "WARRING" | "RISING" | "INVITE"

export type ClanCrest = {
  // Two-letter monogram drawn over a brand gradient
  monogram: string
  from: string // tailwind class fragment, e.g. "from-neon"
  via?: string
  to: string // tailwind class fragment, e.g. "to-electric"
  // Optional shape ring color — used as a stroke around the crest
  ring?: "neon" | "electric" | "ember" | "blood" | "gold"
}

export type WarOpponent = {
  id: string
  name: string
  tag: string
  crest: ClanCrest
  rank: number
  weeklyXp: number
}

export type ClanMemberPreview = {
  initials: string
  rank: "Captain" | "Officer" | "Egoist" | "Recruit"
  online: boolean
}

export type Clan = {
  id: string
  slug: string
  name: string
  tag: string // e.g. [TITAN], [VOID]
  motto: string
  description: string
  crest: ClanCrest

  // Identity
  region: ClanRegion
  vibe: ClanVibe[]
  focus: ClanFocus[]
  language: "English" | "Hindi" | "Mandarin" | "Spanish" | "Multi"
  foundedDays: number // days since founding

  // Ladder
  tier: ClanTier
  rank: number // global rank
  rankDelta: number // movement vs last week (+/-)
  seasonLp: number // ladder points

  // Activity
  weeklyXp: number
  weeklyXpGoal: number
  totalXp: number
  problemsThisWeek: number
  warsWon: number
  warsTotal: number

  // Members
  memberCount: number
  capacity: number
  onlineCount: number
  topContributorXp: number
  membersPreview: ClanMemberPreview[]

  // Recruitment
  joinPolicy: JoinPolicy
  recruiting: boolean
  minRating?: number // gate by elo

  // War status
  warStatus: WarStatus
  currentOpponent?: WarOpponent
  warEndsInH?: number
  warScore?: { ours: number; theirs: number }

  // Surfacing
  isFeatured?: boolean
  isOfficial?: boolean
  isHot?: boolean
  isRising?: boolean
  isRecommended?: boolean
}

export const TIER_META: Record<
  ClanTier,
  {
    rank: number
    short: string
    accent: "neon" | "electric" | "gold" | "ember" | "blood"
    glow: "glow-neon" | "glow-ember"
    border: string
    text: string
    bgFade: string
    chip: string
    sublabel: string
  }
> = {
  Bronze: {
    rank: 0,
    short: "BRZ",
    accent: "ember",
    glow: "glow-ember",
    border: "border-ember/40",
    text: "text-ember",
    bgFade: "from-ember/15",
    chip: "bg-ember/15 text-ember border-ember/40",
    sublabel: "Forging foundation",
  },
  Silver: {
    rank: 1,
    short: "SLV",
    accent: "electric",
    glow: "glow-neon",
    border: "border-electric/45",
    text: "text-electric",
    bgFade: "from-electric/15",
    chip: "bg-electric/15 text-electric border-electric/45",
    sublabel: "Climbing fast",
  },
  Gold: {
    rank: 2,
    short: "GLD",
    accent: "gold",
    glow: "glow-ember",
    border: "border-gold/45",
    text: "text-gold",
    bgFade: "from-gold/15",
    chip: "bg-gold/15 text-gold border-gold/45",
    sublabel: "Top quartile",
  },
  Elite: {
    rank: 3,
    short: "ELT",
    accent: "neon",
    glow: "glow-neon",
    border: "border-neon/55",
    text: "text-neon",
    bgFade: "from-neon/15",
    chip: "bg-neon/15 text-neon border-neon/55",
    sublabel: "Apex contender",
  },
  Legend: {
    rank: 4,
    short: "LGND",
    accent: "blood",
    glow: "glow-ember",
    border: "border-blood/55",
    text: "text-blood",
    bgFade: "from-blood/20",
    chip: "bg-blood/20 text-blood border-blood/55",
    sublabel: "Hall of titans",
  },
}

export const VIBE_META: Record<ClanVibe, string> = {
  Tryhard: "No carry. Pull weight.",
  Casual: "Vibes-first, streaks-second.",
  "Mentor-Led": "Captains review every PR.",
  Speedrun: "Daily timed sprints.",
  "Interview-Prep": "Mock loops + behavioral.",
  Olympiad: "ICPC, IOI, Codeforces grind.",
  "Open-Source": "Ship together, commit together.",
  "Beginner-Friendly": "Onboards from zero.",
}

export const FOCUS_META: Record<ClanFocus, string> = {
  DSA: "Data Structures & Algorithms",
  "System Design": "Distributed systems & scale",
  Competitive: "CP rating climb",
  Interview: "FAANG+ loops",
  "OA Prep": "Online Assessments",
  "ML/AI": "Models, RAG, agents",
  Frontend: "Web platform craft",
  Backend: "Services & databases",
  Security: "Appsec, crypto, CTF",
}

// --------------------------------------------------------------------
// SAMPLE CLANS
// --------------------------------------------------------------------

export const CLANS: Clan[] = [
  {
    id: "c-001",
    slug: "void-syndicate",
    name: "Void Syndicate",
    tag: "VOID",
    motto: "We are the unmatched.",
    description:
      "Top-200 globally. Brutal weekly mocks, mentor-led system design clinics, and a no-passenger rule. If you log off mid-streak, you owe a writeup.",
    crest: { monogram: "VS", from: "from-blood", to: "to-ember", ring: "blood" },
    region: "Global",
    vibe: ["Tryhard", "Mentor-Led", "Interview-Prep"],
    focus: ["DSA", "System Design", "Interview"],
    language: "English",
    foundedDays: 412,
    tier: "Legend",
    rank: 3,
    rankDelta: 1,
    seasonLp: 12480,
    weeklyXp: 184250,
    weeklyXpGoal: 200000,
    totalXp: 4_812_900,
    problemsThisWeek: 1284,
    warsWon: 47,
    warsTotal: 52,
    memberCount: 48,
    capacity: 50,
    onlineCount: 22,
    topContributorXp: 18_400,
    membersPreview: [
      { initials: "KZ", rank: "Captain", online: true },
      { initials: "AR", rank: "Officer", online: true },
      { initials: "MV", rank: "Officer", online: false },
      { initials: "JT", rank: "Egoist", online: true },
      { initials: "SP", rank: "Egoist", online: true },
    ],
    joinPolicy: "Invite-Only",
    recruiting: false,
    minRating: 2200,
    warStatus: "Live",
    currentOpponent: {
      id: "c-014",
      name: "Aurora Dynasts",
      tag: "AURO",
      crest: { monogram: "AD", from: "from-gold", to: "to-ember" },
      rank: 7,
      weeklyXp: 169_400,
    },
    warEndsInH: 18,
    warScore: { ours: 412, theirs: 388 },
    isFeatured: true,
    isHot: true,
  },
  {
    id: "c-002",
    slug: "neon-egoists",
    name: "Neon Egoists",
    tag: "NEON",
    motto: "Outshine, then outscale.",
    description:
      "Elite-tier clan optimized for CP rating climbs. Daily ladder ranking at 9pm IST, weekly Codeforces div-1 sim, and a Discord that never sleeps.",
    crest: { monogram: "NE", from: "from-neon", to: "to-electric", ring: "neon" },
    region: "Global",
    vibe: ["Tryhard", "Speedrun", "Olympiad"],
    focus: ["Competitive", "DSA"],
    language: "English",
    foundedDays: 287,
    tier: "Elite",
    rank: 8,
    rankDelta: 3,
    seasonLp: 9840,
    weeklyXp: 162_300,
    weeklyXpGoal: 175_000,
    totalXp: 2_140_500,
    problemsThisWeek: 1042,
    warsWon: 32,
    warsTotal: 41,
    memberCount: 42,
    capacity: 50,
    onlineCount: 19,
    topContributorXp: 14_220,
    membersPreview: [
      { initials: "RK", rank: "Captain", online: true },
      { initials: "DM", rank: "Officer", online: true },
      { initials: "LT", rank: "Egoist", online: false },
      { initials: "PA", rank: "Egoist", online: true },
    ],
    joinPolicy: "Apply",
    recruiting: true,
    minRating: 1800,
    warStatus: "Scheduled",
    warEndsInH: 32,
    isHot: true,
    isRising: true,
    isRecommended: true,
  },
  {
    id: "c-003",
    slug: "kernel-cartel",
    name: "Kernel Cartel",
    tag: "KRNL",
    motto: "Below the abstraction.",
    description:
      "OS, networks, distributed systems. We read papers and ship low-level. Weekly book club. Strong backend mentorship pipeline.",
    crest: { monogram: "KC", from: "from-electric", to: "to-blue-deep", ring: "electric" },
    region: "EMEA",
    vibe: ["Mentor-Led", "Tryhard"],
    focus: ["System Design", "Backend", "Security"],
    language: "English",
    foundedDays: 198,
    tier: "Elite",
    rank: 14,
    rankDelta: -2,
    seasonLp: 8240,
    weeklyXp: 128_900,
    weeklyXpGoal: 150_000,
    totalXp: 1_840_300,
    problemsThisWeek: 612,
    warsWon: 24,
    warsTotal: 36,
    memberCount: 36,
    capacity: 50,
    onlineCount: 12,
    topContributorXp: 11_200,
    membersPreview: [
      { initials: "TR", rank: "Captain", online: true },
      { initials: "GH", rank: "Officer", online: false },
      { initials: "BL", rank: "Egoist", online: true },
    ],
    joinPolicy: "Apply",
    recruiting: true,
    minRating: 1600,
    warStatus: "Recovering",
    warEndsInH: 96,
  },
  {
    id: "c-004",
    slug: "aurora-dynasts",
    name: "Aurora Dynasts",
    tag: "AURO",
    motto: "Code at dawn. Conquer by dusk.",
    description:
      "Top-10 weekly. Asia-Pacific powerhouse. Synchronized morning sessions, intense code review culture, and a captain who once solo-soloed an ICPC regional.",
    crest: { monogram: "AD", from: "from-gold", to: "to-ember", ring: "gold" },
    region: "APAC",
    vibe: ["Tryhard", "Speedrun"],
    focus: ["Competitive", "DSA", "Interview"],
    language: "English",
    foundedDays: 365,
    tier: "Legend",
    rank: 7,
    rankDelta: 0,
    seasonLp: 10_120,
    weeklyXp: 169_400,
    weeklyXpGoal: 180_000,
    totalXp: 3_220_900,
    problemsThisWeek: 1184,
    warsWon: 38,
    warsTotal: 49,
    memberCount: 47,
    capacity: 50,
    onlineCount: 24,
    topContributorXp: 16_800,
    membersPreview: [
      { initials: "HK", rank: "Captain", online: true },
      { initials: "YN", rank: "Officer", online: true },
      { initials: "MZ", rank: "Officer", online: true },
      { initials: "QS", rank: "Egoist", online: false },
    ],
    joinPolicy: "Invite-Only",
    recruiting: false,
    minRating: 2000,
    warStatus: "Live",
    currentOpponent: {
      id: "c-001",
      name: "Void Syndicate",
      tag: "VOID",
      crest: { monogram: "VS", from: "from-blood", to: "to-ember" },
      rank: 3,
      weeklyXp: 184_250,
    },
    warEndsInH: 18,
    warScore: { ours: 388, theirs: 412 },
    isFeatured: true,
    isHot: true,
  },
  {
    id: "c-005",
    slug: "binary-monks",
    name: "Binary Monks",
    tag: "BMNK",
    motto: "Discipline over dopamine.",
    description:
      "Mentor-led. Quiet, deliberate, brutal consistency. 30 problems/week minimum. Shared anki deck for patterns. Ideal for serious interview prep.",
    crest: { monogram: "BM", from: "from-neon-soft", to: "to-neon", ring: "neon" },
    region: "South Asia",
    vibe: ["Mentor-Led", "Interview-Prep"],
    focus: ["DSA", "Interview", "OA Prep"],
    language: "English",
    foundedDays: 142,
    tier: "Gold",
    rank: 38,
    rankDelta: 6,
    seasonLp: 6240,
    weeklyXp: 92_400,
    weeklyXpGoal: 120_000,
    totalXp: 642_300,
    problemsThisWeek: 482,
    warsWon: 14,
    warsTotal: 22,
    memberCount: 32,
    capacity: 50,
    onlineCount: 9,
    topContributorXp: 7800,
    membersPreview: [
      { initials: "AV", rank: "Captain", online: true },
      { initials: "RN", rank: "Officer", online: false },
      { initials: "PM", rank: "Egoist", online: true },
    ],
    joinPolicy: "Apply",
    recruiting: true,
    minRating: 1400,
    warStatus: "Idle",
    isRising: true,
    isRecommended: true,
  },
  {
    id: "c-006",
    slug: "stack-overflowers",
    name: "Stack Overflowers",
    tag: "STKO",
    motto: "Bug-free? Doubt it. Ship it anyway.",
    description:
      "Casual but consistent. Friday postmortem nights, weekend hackathons, and a chill mentor pool. Great for working professionals.",
    crest: { monogram: "SO", from: "from-ember", to: "to-blood", ring: "ember" },
    region: "Americas",
    vibe: ["Casual", "Mentor-Led"],
    focus: ["Backend", "Frontend", "Interview"],
    language: "English",
    foundedDays: 98,
    tier: "Gold",
    rank: 52,
    rankDelta: 2,
    seasonLp: 5320,
    weeklyXp: 68_400,
    weeklyXpGoal: 100_000,
    totalXp: 412_800,
    problemsThisWeek: 312,
    warsWon: 9,
    warsTotal: 18,
    memberCount: 28,
    capacity: 50,
    onlineCount: 8,
    topContributorXp: 5400,
    membersPreview: [
      { initials: "EJ", rank: "Captain", online: true },
      { initials: "MK", rank: "Officer", online: true },
    ],
    joinPolicy: "Open",
    recruiting: true,
    warStatus: "Idle",
  },
  {
    id: "c-007",
    slug: "phantom-protocol",
    name: "Phantom Protocol",
    tag: "PHTM",
    motto: "Unseen. Unstoppable.",
    description:
      "Security-first clan. CTF veterans, appsec engineers, crypto nerds. Picks one CVE deep-dive each week. Quiet but elite.",
    crest: { monogram: "PP", from: "from-blood", to: "to-blue-deep", ring: "blood" },
    region: "EMEA",
    vibe: ["Tryhard", "Mentor-Led"],
    focus: ["Security", "Backend", "System Design"],
    language: "English",
    foundedDays: 220,
    tier: "Elite",
    rank: 19,
    rankDelta: 1,
    seasonLp: 7820,
    weeklyXp: 118_600,
    weeklyXpGoal: 140_000,
    totalXp: 1_204_800,
    problemsThisWeek: 540,
    warsWon: 22,
    warsTotal: 33,
    memberCount: 30,
    capacity: 40,
    onlineCount: 11,
    topContributorXp: 9800,
    membersPreview: [
      { initials: "RZ", rank: "Captain", online: false },
      { initials: "HS", rank: "Officer", online: true },
      { initials: "MK", rank: "Egoist", online: true },
    ],
    joinPolicy: "Apply",
    recruiting: true,
    minRating: 1700,
    warStatus: "Scheduled",
    warEndsInH: 48,
  },
  {
    id: "c-008",
    slug: "rookie-revolution",
    name: "Rookie Revolution",
    tag: "ROOK",
    motto: "From zero to ranked.",
    description:
      "Officially endorsed onboarding clan. Patient mentors, structured 12-week ladder, and weekly progress check-ins. Designed for first-timers.",
    crest: { monogram: "RR", from: "from-neon", to: "to-blue-mid", ring: "neon" },
    region: "Global",
    vibe: ["Beginner-Friendly", "Mentor-Led"],
    focus: ["DSA", "OA Prep"],
    language: "Multi",
    foundedDays: 64,
    tier: "Silver",
    rank: 84,
    rankDelta: 12,
    seasonLp: 3840,
    weeklyXp: 54_200,
    weeklyXpGoal: 80_000,
    totalXp: 218_400,
    problemsThisWeek: 612,
    warsWon: 4,
    warsTotal: 9,
    memberCount: 56,
    capacity: 80,
    onlineCount: 17,
    topContributorXp: 2400,
    membersPreview: [
      { initials: "LA", rank: "Captain", online: true },
      { initials: "TM", rank: "Officer", online: true },
      { initials: "JK", rank: "Egoist", online: true },
    ],
    joinPolicy: "Open",
    recruiting: true,
    warStatus: "Idle",
    isOfficial: true,
    isRising: true,
  },
  {
    id: "c-009",
    slug: "lambda-legion",
    name: "Lambda Legion",
    tag: "LMBD",
    motto: "Compose, don't repeat.",
    description:
      "FP-loving backend builders. Strong on type systems, distributed primitives, and elegant code review. Captains hire from FAANG.",
    crest: { monogram: "LL", from: "from-electric", to: "to-neon", ring: "electric" },
    region: "Americas",
    vibe: ["Mentor-Led", "Interview-Prep"],
    focus: ["Backend", "System Design", "Interview"],
    language: "English",
    foundedDays: 312,
    tier: "Gold",
    rank: 28,
    rankDelta: -1,
    seasonLp: 6840,
    weeklyXp: 102_400,
    weeklyXpGoal: 130_000,
    totalXp: 920_300,
    problemsThisWeek: 412,
    warsWon: 18,
    warsTotal: 31,
    memberCount: 34,
    capacity: 40,
    onlineCount: 10,
    topContributorXp: 8800,
    membersPreview: [
      { initials: "BR", rank: "Captain", online: true },
      { initials: "VS", rank: "Officer", online: false },
      { initials: "AT", rank: "Egoist", online: true },
    ],
    joinPolicy: "Apply",
    recruiting: true,
    minRating: 1600,
    warStatus: "Recovering",
    warEndsInH: 72,
  },
  {
    id: "c-010",
    slug: "graph-gods",
    name: "Graph Gods",
    tag: "GRPH",
    motto: "Every edge counts.",
    description:
      "Specialists in graph theory and combinatorial optimization. ICPC veterans. Clinic every Sunday on a single problem.",
    crest: { monogram: "GG", from: "from-gold", to: "to-neon", ring: "gold" },
    region: "EMEA",
    vibe: ["Olympiad", "Tryhard"],
    focus: ["Competitive", "DSA"],
    language: "English",
    foundedDays: 175,
    tier: "Elite",
    rank: 22,
    rankDelta: 4,
    seasonLp: 7420,
    weeklyXp: 114_300,
    weeklyXpGoal: 130_000,
    totalXp: 1_018_400,
    problemsThisWeek: 504,
    warsWon: 19,
    warsTotal: 28,
    memberCount: 24,
    capacity: 30,
    onlineCount: 12,
    topContributorXp: 10_400,
    membersPreview: [
      { initials: "OL", rank: "Captain", online: true },
      { initials: "MV", rank: "Officer", online: true },
    ],
    joinPolicy: "Apply",
    recruiting: true,
    minRating: 1900,
    warStatus: "Live",
    currentOpponent: {
      id: "c-007",
      name: "Phantom Protocol",
      tag: "PHTM",
      crest: { monogram: "PP", from: "from-blood", to: "to-blue-deep" },
      rank: 19,
      weeklyXp: 118_600,
    },
    warEndsInH: 22,
    warScore: { ours: 268, theirs: 254 },
    isHot: true,
  },
  {
    id: "c-011",
    slug: "delta-protocol",
    name: "Delta Protocol",
    tag: "DLTA",
    motto: "Iterate. Compound. Repeat.",
    description:
      "Data + ML focus. RAG, agentic loops, eval pipelines. Strong project culture. Builds shipped to prod monthly.",
    crest: { monogram: "DP", from: "from-neon", to: "to-electric", ring: "neon" },
    region: "Americas",
    vibe: ["Mentor-Led", "Open-Source"],
    focus: ["ML/AI", "Backend"],
    language: "English",
    foundedDays: 122,
    tier: "Gold",
    rank: 41,
    rankDelta: 8,
    seasonLp: 5980,
    weeklyXp: 86_400,
    weeklyXpGoal: 110_000,
    totalXp: 542_800,
    problemsThisWeek: 318,
    warsWon: 12,
    warsTotal: 19,
    memberCount: 26,
    capacity: 40,
    onlineCount: 9,
    topContributorXp: 6800,
    membersPreview: [
      { initials: "NT", rank: "Captain", online: true },
      { initials: "IK", rank: "Officer", online: true },
    ],
    joinPolicy: "Apply",
    recruiting: true,
    warStatus: "Scheduled",
    warEndsInH: 64,
    isRising: true,
  },
  {
    id: "c-012",
    slug: "midnight-merge",
    name: "Midnight Merge",
    tag: "MDNT",
    motto: "We push at 2am.",
    description:
      "Open-source loving night owls. Sustained streaks, async-first culture. Big on documentation and small commits.",
    crest: { monogram: "MM", from: "from-blue-deep", to: "to-electric", ring: "electric" },
    region: "Global",
    vibe: ["Open-Source", "Casual"],
    focus: ["Frontend", "Backend"],
    language: "English",
    foundedDays: 88,
    tier: "Silver",
    rank: 76,
    rankDelta: -3,
    seasonLp: 4200,
    weeklyXp: 58_300,
    weeklyXpGoal: 90_000,
    totalXp: 264_900,
    problemsThisWeek: 248,
    warsWon: 6,
    warsTotal: 14,
    memberCount: 22,
    capacity: 40,
    onlineCount: 5,
    topContributorXp: 4200,
    membersPreview: [
      { initials: "WK", rank: "Captain", online: false },
      { initials: "FC", rank: "Officer", online: true },
    ],
    joinPolicy: "Open",
    recruiting: true,
    warStatus: "Idle",
  },
  {
    id: "c-013",
    slug: "nova-sentinels",
    name: "Nova Sentinels",
    tag: "NOVA",
    motto: "Defend the streak.",
    description:
      "Cooperative DSA grind. Buddy-system enforced. Each member is paired weekly. Strong accountability culture.",
    crest: { monogram: "NS", from: "from-electric", to: "to-blue-mid", ring: "electric" },
    region: "South Asia",
    vibe: ["Mentor-Led", "Interview-Prep"],
    focus: ["DSA", "Interview", "OA Prep"],
    language: "Hindi",
    foundedDays: 156,
    tier: "Gold",
    rank: 33,
    rankDelta: 5,
    seasonLp: 6420,
    weeklyXp: 96_800,
    weeklyXpGoal: 120_000,
    totalXp: 712_400,
    problemsThisWeek: 528,
    warsWon: 16,
    warsTotal: 24,
    memberCount: 38,
    capacity: 50,
    onlineCount: 14,
    topContributorXp: 7400,
    membersPreview: [
      { initials: "AK", rank: "Captain", online: true },
      { initials: "PK", rank: "Officer", online: true },
      { initials: "RS", rank: "Egoist", online: false },
    ],
    joinPolicy: "Apply",
    recruiting: true,
    minRating: 1500,
    warStatus: "Scheduled",
    warEndsInH: 40,
    isRising: true,
    isRecommended: true,
  },
  {
    id: "c-014",
    slug: "heap-hooligans",
    name: "Heap Hooligans",
    tag: "HEAP",
    motto: "Sort yourself out.",
    description:
      "Casual + memes + grind. Friendly, low-pressure, but consistent. Great for college students balancing coursework.",
    crest: { monogram: "HH", from: "from-ember", to: "to-gold", ring: "ember" },
    region: "South Asia",
    vibe: ["Casual", "Beginner-Friendly"],
    focus: ["DSA", "OA Prep"],
    language: "English",
    foundedDays: 72,
    tier: "Silver",
    rank: 91,
    rankDelta: 14,
    seasonLp: 3640,
    weeklyXp: 48_200,
    weeklyXpGoal: 75_000,
    totalXp: 184_300,
    problemsThisWeek: 318,
    warsWon: 3,
    warsTotal: 10,
    memberCount: 44,
    capacity: 60,
    onlineCount: 13,
    topContributorXp: 2800,
    membersPreview: [
      { initials: "TG", rank: "Captain", online: true },
      { initials: "DV", rank: "Officer", online: false },
      { initials: "SB", rank: "Egoist", online: true },
    ],
    joinPolicy: "Open",
    recruiting: true,
    warStatus: "Idle",
    isRising: true,
  },
  {
    id: "c-015",
    slug: "dragon-recursion",
    name: "Dragon Recursion",
    tag: "DRGN",
    motto: "Fold the problem until it folds.",
    description:
      "Mandarin-speaking competitive grind. Olympiad lineage. Daily 2hr block contests, strict attendance.",
    crest: { monogram: "DR", from: "from-blood", to: "to-ember", ring: "blood" },
    region: "APAC",
    vibe: ["Olympiad", "Tryhard"],
    focus: ["Competitive", "DSA"],
    language: "Mandarin",
    foundedDays: 244,
    tier: "Elite",
    rank: 16,
    rankDelta: -1,
    seasonLp: 8120,
    weeklyXp: 124_800,
    weeklyXpGoal: 145_000,
    totalXp: 1_412_500,
    problemsThisWeek: 612,
    warsWon: 21,
    warsTotal: 30,
    memberCount: 28,
    capacity: 30,
    onlineCount: 16,
    topContributorXp: 11_200,
    membersPreview: [
      { initials: "LX", rank: "Captain", online: true },
      { initials: "WJ", rank: "Officer", online: true },
    ],
    joinPolicy: "Invite-Only",
    recruiting: false,
    minRating: 1900,
    warStatus: "Recovering",
    warEndsInH: 80,
  },
  {
    id: "c-016",
    slug: "raster-rebels",
    name: "Raster Rebels",
    tag: "RSTR",
    motto: "Pixels and patterns.",
    description:
      "Frontend craft, design systems, CSS deep dives. Weekly UI rebuild jam. Lots of build-in-public energy.",
    crest: { monogram: "RR", from: "from-neon-soft", to: "to-electric", ring: "neon" },
    region: "Americas",
    vibe: ["Open-Source", "Casual"],
    focus: ["Frontend"],
    language: "English",
    foundedDays: 110,
    tier: "Silver",
    rank: 68,
    rankDelta: 2,
    seasonLp: 4540,
    weeklyXp: 62_400,
    weeklyXpGoal: 90_000,
    totalXp: 312_800,
    problemsThisWeek: 188,
    warsWon: 7,
    warsTotal: 13,
    memberCount: 24,
    capacity: 40,
    onlineCount: 7,
    topContributorXp: 4800,
    membersPreview: [
      { initials: "MR", rank: "Captain", online: false },
      { initials: "JD", rank: "Officer", online: true },
    ],
    joinPolicy: "Open",
    recruiting: true,
    warStatus: "Idle",
  },
  {
    id: "c-017",
    slug: "outback-overflow",
    name: "Outback Overflow",
    tag: "OBOV",
    motto: "Cricket bats and code rats.",
    description:
      "ANZ-based, daily 7am sprints, evening retros. Builds in Rust, Go, Python. Mentor pipeline into AU big-tech.",
    crest: { monogram: "OO", from: "from-ember", to: "to-gold", ring: "ember" },
    region: "ANZ",
    vibe: ["Mentor-Led", "Speedrun"],
    focus: ["Backend", "Interview", "OA Prep"],
    language: "English",
    foundedDays: 134,
    tier: "Gold",
    rank: 47,
    rankDelta: 1,
    seasonLp: 5680,
    weeklyXp: 78_300,
    weeklyXpGoal: 105_000,
    totalXp: 412_900,
    problemsThisWeek: 268,
    warsWon: 11,
    warsTotal: 18,
    memberCount: 26,
    capacity: 35,
    onlineCount: 8,
    topContributorXp: 6400,
    membersPreview: [
      { initials: "BJ", rank: "Captain", online: true },
      { initials: "EM", rank: "Officer", online: true },
    ],
    joinPolicy: "Apply",
    recruiting: true,
    minRating: 1500,
    warStatus: "Scheduled",
    warEndsInH: 56,
  },
  {
    id: "c-018",
    slug: "quantum-quill",
    name: "Quantum Quill",
    tag: "QNTM",
    motto: "Write papers. Ship code.",
    description:
      "Research-leaning. Members publish papers and contribute to OSS ML libraries. Slow grind, deep results.",
    crest: { monogram: "QQ", from: "from-blue-deep", to: "to-neon", ring: "electric" },
    region: "Global",
    vibe: ["Mentor-Led", "Open-Source"],
    focus: ["ML/AI", "Backend"],
    language: "English",
    foundedDays: 410,
    tier: "Elite",
    rank: 25,
    rankDelta: 0,
    seasonLp: 7180,
    weeklyXp: 108_400,
    weeklyXpGoal: 130_000,
    totalXp: 1_640_200,
    problemsThisWeek: 412,
    warsWon: 17,
    warsTotal: 26,
    memberCount: 28,
    capacity: 35,
    onlineCount: 9,
    topContributorXp: 9100,
    membersPreview: [
      { initials: "VR", rank: "Captain", online: false },
      { initials: "MX", rank: "Officer", online: true },
    ],
    joinPolicy: "Invite-Only",
    recruiting: false,
    minRating: 1800,
    warStatus: "Idle",
  },
  {
    id: "c-019",
    slug: "frostbyte",
    name: "Frostbyte",
    tag: "FRST",
    motto: "Cool heads. Hot grind.",
    description:
      "Just launched. Aggressive recruiting. Captain placed top-100 ICPC last year. Ground-floor opportunity.",
    crest: { monogram: "FB", from: "from-neon-soft", to: "to-electric", ring: "neon" },
    region: "EMEA",
    vibe: ["Tryhard", "Beginner-Friendly"],
    focus: ["DSA", "Competitive"],
    language: "English",
    foundedDays: 14,
    tier: "Bronze",
    rank: 142,
    rankDelta: 28,
    seasonLp: 1240,
    weeklyXp: 28_400,
    weeklyXpGoal: 50_000,
    totalXp: 38_900,
    problemsThisWeek: 184,
    warsWon: 1,
    warsTotal: 3,
    memberCount: 12,
    capacity: 40,
    onlineCount: 6,
    topContributorXp: 1800,
    membersPreview: [
      { initials: "OL", rank: "Captain", online: true },
      { initials: "AK", rank: "Officer", online: true },
    ],
    joinPolicy: "Open",
    recruiting: true,
    warStatus: "Idle",
    isRising: true,
  },
  {
    id: "c-020",
    slug: "pixel-pirates",
    name: "Pixel Pirates",
    tag: "PXPR",
    motto: "Loot the leaderboard.",
    description:
      "Casual + competitive blend. SEA-based, English/Spanish friendly. Weekly group OA grinds.",
    crest: { monogram: "PP", from: "from-ember", to: "to-blood", ring: "ember" },
    region: "Sea",
    vibe: ["Casual", "Speedrun"],
    focus: ["OA Prep", "DSA"],
    language: "Multi",
    foundedDays: 56,
    tier: "Silver",
    rank: 88,
    rankDelta: 7,
    seasonLp: 3920,
    weeklyXp: 52_400,
    weeklyXpGoal: 80_000,
    totalXp: 162_300,
    problemsThisWeek: 312,
    warsWon: 4,
    warsTotal: 11,
    memberCount: 30,
    capacity: 50,
    onlineCount: 11,
    topContributorXp: 3400,
    membersPreview: [
      { initials: "JR", rank: "Captain", online: true },
      { initials: "KM", rank: "Officer", online: false },
    ],
    joinPolicy: "Open",
    recruiting: true,
    warStatus: "Idle",
    isRising: true,
  },
  {
    id: "c-021",
    slug: "apex-architects",
    name: "Apex Architects",
    tag: "APEX",
    motto: "Design first. Code second.",
    description:
      "System design specialists. Mock interviews 4x/week. Strong network of senior engineers from Stripe, Netflix, Datadog.",
    crest: { monogram: "AA", from: "from-gold", to: "to-ember", ring: "gold" },
    region: "Americas",
    vibe: ["Mentor-Led", "Interview-Prep"],
    focus: ["System Design", "Interview"],
    language: "English",
    foundedDays: 268,
    tier: "Elite",
    rank: 12,
    rankDelta: 1,
    seasonLp: 8980,
    weeklyXp: 142_800,
    weeklyXpGoal: 165_000,
    totalXp: 1_924_500,
    problemsThisWeek: 412,
    warsWon: 26,
    warsTotal: 35,
    memberCount: 32,
    capacity: 35,
    onlineCount: 14,
    topContributorXp: 12_400,
    membersPreview: [
      { initials: "DE", rank: "Captain", online: true },
      { initials: "CR", rank: "Officer", online: true },
      { initials: "SK", rank: "Officer", online: false },
    ],
    joinPolicy: "Apply",
    recruiting: true,
    minRating: 1900,
    warStatus: "Live",
    currentOpponent: {
      id: "c-002",
      name: "Neon Egoists",
      tag: "NEON",
      crest: { monogram: "NE", from: "from-neon", to: "to-electric" },
      rank: 8,
      weeklyXp: 162_300,
    },
    warEndsInH: 28,
    warScore: { ours: 318, theirs: 342 },
    isHot: true,
  },
]

// --------------------------------------------------------------------
// LADDER + WAR + RECRUIT TICKER
// --------------------------------------------------------------------

export const LADDER_TIERS: { tier: ClanTier; minLp: number; clans: number }[] = [
  { tier: "Legend", minLp: 10_000, clans: 12 },
  { tier: "Elite", minLp: 7_000, clans: 86 },
  { tier: "Gold", minLp: 5_000, clans: 312 },
  { tier: "Silver", minLp: 3_000, clans: 814 },
  { tier: "Bronze", minLp: 0, clans: 2418 },
]

export const RECRUIT_TICKER: {
  clan: string
  tag: string
  msg: string
  tier: ClanTier
}[] = [
  { clan: "Neon Egoists", tag: "NEON", msg: "is recruiting 8 elite contestants", tier: "Elite" },
  { clan: "Apex Architects", tag: "APEX", msg: "open 3 senior seats", tier: "Elite" },
  { clan: "Binary Monks", tag: "BMNK", msg: "needs 18 grinders for fall season", tier: "Gold" },
  { clan: "Frostbyte", tag: "FRST", msg: "just launched, 28 seats open", tier: "Bronze" },
  { clan: "Nova Sentinels", tag: "NOVA", msg: "buddy-system pairing window open", tier: "Gold" },
  { clan: "Outback Overflow", tag: "OBOV", msg: "ANZ time-zone seats live", tier: "Gold" },
  { clan: "Heap Hooligans", tag: "HEAP", msg: "16 chill seats — no pressure", tier: "Silver" },
]

export type WarSlot = {
  id: string
  status: "Live" | "Scheduled" | "Final"
  startsInH?: number
  endsInH?: number
  endedDaysAgo?: number
  a: { name: string; tag: string; crest: ClanCrest; rank: number; score: number }
  b: { name: string; tag: string; crest: ClanCrest; rank: number; score: number }
}

export const WAR_SLATE: WarSlot[] = [
  {
    id: "w-101",
    status: "Live",
    endsInH: 18,
    a: {
      name: "Void Syndicate",
      tag: "VOID",
      crest: { monogram: "VS", from: "from-blood", to: "to-ember" },
      rank: 3,
      score: 412,
    },
    b: {
      name: "Aurora Dynasts",
      tag: "AURO",
      crest: { monogram: "AD", from: "from-gold", to: "to-ember" },
      rank: 7,
      score: 388,
    },
  },
  {
    id: "w-102",
    status: "Live",
    endsInH: 28,
    a: {
      name: "Apex Architects",
      tag: "APEX",
      crest: { monogram: "AA", from: "from-gold", to: "to-ember" },
      rank: 12,
      score: 318,
    },
    b: {
      name: "Neon Egoists",
      tag: "NEON",
      crest: { monogram: "NE", from: "from-neon", to: "to-electric" },
      rank: 8,
      score: 342,
    },
  },
  {
    id: "w-103",
    status: "Scheduled",
    startsInH: 14,
    a: {
      name: "Kernel Cartel",
      tag: "KRNL",
      crest: { monogram: "KC", from: "from-electric", to: "to-blue-deep" },
      rank: 14,
      score: 0,
    },
    b: {
      name: "Lambda Legion",
      tag: "LMBD",
      crest: { monogram: "LL", from: "from-electric", to: "to-neon" },
      rank: 28,
      score: 0,
    },
  },
  {
    id: "w-104",
    status: "Final",
    endedDaysAgo: 1,
    a: {
      name: "Graph Gods",
      tag: "GRPH",
      crest: { monogram: "GG", from: "from-gold", to: "to-neon" },
      rank: 22,
      score: 462,
    },
    b: {
      name: "Phantom Protocol",
      tag: "PHTM",
      crest: { monogram: "PP", from: "from-blood", to: "to-blue-deep" },
      rank: 19,
      score: 418,
    },
  },
]

// --------------------------------------------------------------------
// "YOUR CLAN" — null when user is not in one (drives the join CTA)
// --------------------------------------------------------------------

export const YOUR_CLAN: Clan | null = null
// To preview the "in-clan" UX, swap with: CLANS.find(c => c.id === "c-005") ?? null

// --------------------------------------------------------------------
// FILTER OPTION CONSTANTS — surfaced in UI
// --------------------------------------------------------------------

export const ALL_TIERS: ClanTier[] = ["Bronze", "Silver", "Gold", "Elite", "Legend"]
export const ALL_REGIONS: ClanRegion[] = [
  "Global",
  "Americas",
  "EMEA",
  "APAC",
  "South Asia",
  "Sea",
  "ANZ",
]
export const ALL_VIBES: ClanVibe[] = [
  "Tryhard",
  "Casual",
  "Mentor-Led",
  "Speedrun",
  "Interview-Prep",
  "Olympiad",
  "Open-Source",
  "Beginner-Friendly",
]
export const ALL_FOCUS: ClanFocus[] = [
  "DSA",
  "System Design",
  "Competitive",
  "Interview",
  "OA Prep",
  "ML/AI",
  "Frontend",
  "Backend",
  "Security",
]

// --------------------------------------------------------------------
// FORMATTING HELPERS
// --------------------------------------------------------------------

export function formatXp(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(n >= 10_000 ? 0 : 1)}K`
  return String(n)
}

export function formatRankDelta(d: number): { sign: string; abs: number } {
  if (d === 0) return { sign: "—", abs: 0 }
  if (d > 0) return { sign: "▲", abs: d }
  return { sign: "▼", abs: Math.abs(d) }
}

export function tierProgressFromLp(lp: number): { tier: ClanTier; nextTier: ClanTier | null; pct: number } {
  // Walk from Legend down — find the highest tier whose minLp <= lp
  const sorted = [...LADDER_TIERS].sort((a, b) => b.minLp - a.minLp)
  let currentIdx = sorted.findIndex((t) => lp >= t.minLp)
  if (currentIdx === -1) currentIdx = sorted.length - 1
  const current = sorted[currentIdx]
  const above = currentIdx > 0 ? sorted[currentIdx - 1] : null
  if (!above) return { tier: current.tier, nextTier: null, pct: 100 }
  const span = above.minLp - current.minLp
  const into = lp - current.minLp
  return {
    tier: current.tier,
    nextTier: above.tier,
    pct: Math.max(0, Math.min(100, (into / span) * 100)),
  }
}
