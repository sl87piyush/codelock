export type BattleModeId = "quick" | "ranked" | "custom" | "practice"

export type BattleMode = {
  id: BattleModeId
  code: string
  name: string
  tagline: string
  description: string
  stakes: string
  eta: string
  minPlayers: number
  maxPlayers: number
  ranked: boolean
  accent: "neon" | "ember" | "gold" | "violet"
  badge?: string
}

export const BATTLE_MODES: BattleMode[] = [
  {
    id: "quick",
    code: "M-01",
    name: "Quick Match",
    tagline: "No stakes · Instant queue",
    description:
      "Drop into a fast 3-round skirmish. No LP on the line — pure muscle memory, pure reps.",
    stakes: "No LP change",
    eta: "~45s queue",
    minPlayers: 2,
    maxPlayers: 4,
    ranked: false,
    accent: "neon",
  },
  {
    id: "ranked",
    code: "M-02",
    name: "Ranked Duo",
    tagline: "Best of 5 · Climb the ladder",
    description:
      "The real arena. Competitive duo battles with LP swings, promotion series, and seasonal glory.",
    stakes: "±24 LP",
    eta: "~1m 20s queue",
    minPlayers: 4,
    maxPlayers: 4,
    ranked: true,
    accent: "ember",
    badge: "FEATURED",
  },
  {
    id: "custom",
    code: "M-03",
    name: "Custom Battle",
    tagline: "Private lobby · Invite only",
    description:
      "Build the fight. Pick difficulty, map pool, timer, and invite friends or clan members.",
    stakes: "Configurable",
    eta: "On demand",
    minPlayers: 2,
    maxPlayers: 8,
    ranked: false,
    accent: "gold",
  },
  {
    id: "practice",
    code: "M-04",
    name: "Practice Arena",
    tagline: "Solo drills · AI sparring",
    description:
      "Sharpen your strike against adaptive AI. No rivals, no pressure — just reps and replays.",
    stakes: "Training only",
    eta: "Instant",
    minPlayers: 1,
    maxPlayers: 1,
    ranked: false,
    accent: "violet",
  },
]

export type TeamFormat = "solo" | "duo"

export type Region = {
  id: string
  code: string
  name: string
  ping: number
  load: "low" | "medium" | "high"
}

export const REGIONS: Region[] = [
  { id: "ap-south", code: "AP-S", name: "Asia · Mumbai", ping: 28, load: "low" },
  { id: "eu-west", code: "EU-W", name: "Europe · Frankfurt", ping: 142, load: "medium" },
  { id: "us-east", code: "US-E", name: "Americas · Virginia", ping: 218, load: "high" },
  { id: "ap-tokyo", code: "AP-T", name: "Asia · Tokyo", ping: 96, load: "medium" },
]

export type RecentMatch = {
  id: string
  mode: string
  result: "W" | "L"
  lp: number
  score: string
  opponent: string
  timeAgo: string
  duration: string
}

export const RECENT_MATCHES: RecentMatch[] = [
  { id: "m01", mode: "Ranked Duo", result: "W", lp: 24, score: "3-1", opponent: "Void Reapers", timeAgo: "12m ago", duration: "18:42" },
  { id: "m02", mode: "Ranked Duo", result: "W", lp: 22, score: "3-2", opponent: "Neon Wolves", timeAgo: "1h ago", duration: "27:10" },
  { id: "m03", mode: "Ranked Duo", result: "L", lp: -18, score: "1-3", opponent: "Apex Syndicate", timeAgo: "3h ago", duration: "21:55" },
  { id: "m04", mode: "Ranked Duo", result: "W", lp: 26, score: "3-0", opponent: "Ghost Protocol", timeAgo: "5h ago", duration: "12:08" },
  { id: "m05", mode: "Quick", result: "L", lp: 0, score: "1-2", opponent: "Random Ops", timeAgo: "Yesterday", duration: "09:44" },
]

export type PlayerEntrySnapshot = {
  handle: string
  rank: string
  division: string
  lp: number
  lpNextTier: number
  winRate: number
  wins: number
  losses: number
  streak: number
  seasonPercentile: number
  kda: string
  mvpCount: number
  dailyQuest: { label: string; progress: number; target: number }
}

export const PLAYER_SNAPSHOT: PlayerEntrySnapshot = {
  handle: "tonystark",
  rank: "Diamond",
  division: "II",
  lp: 78,
  lpNextTier: 100,
  winRate: 64,
  wins: 142,
  losses: 80,
  streak: 3,
  seasonPercentile: 4.2,
  kda: "2.14",
  mvpCount: 37,
  dailyQuest: { label: "Win 3 Ranked duels", progress: 2, target: 3 },
}

export const GLOBAL_STATS = {
  onlinePlayers: 48732,
  activeBattles: 1204,
  queueHealth: 97,
  avgQueue: "1m 04s",
  seasonDay: 42,
  seasonTotalDays: 90,
}
