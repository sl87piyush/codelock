export type Division = "DIAMOND" | "PLATINUM" | "GOLD" | "SILVER" | "BRONZE"
export type Trend = "up" | "down" | "same" | "new"

export type Warrior = {
  rank: number
  prevRank: number | null
  username: string
  handle: string
  country: string
  countryFlag: string
  division: Division
  divisionTier: string // e.g. "II"
  lp: number
  totalXp: number
  wins: number
  losses: number
  winRate: number // 0-100
  streak: number
  battles: number
  badges: string[] // emoji-free short codes
  isYou?: boolean
  isPro?: boolean
}

export type Clan = {
  rank: number
  prevRank: number | null
  name: string
  tag: string
  members: number
  lp: number
  wins: number
  battles: number
  winRate: number
  isYours?: boolean
}

export type TimeFilter = "DAILY" | "WEEKLY" | "MONTHLY" | "ALL_TIME"
export type Category = "SOLO" | "CLAN" | "COMPANIES" | "COUNTRY"

export const TIME_FILTERS: { id: TimeFilter; label: string; sub: string }[] = [
  { id: "DAILY", label: "Daily", sub: "24h" },
  { id: "WEEKLY", label: "Weekly", sub: "7d" },
  { id: "MONTHLY", label: "Monthly", sub: "30d" },
  { id: "ALL_TIME", label: "All-Time", sub: "Season 04" },
]

export const CATEGORIES: { id: Category; label: string }[] = [
  { id: "SOLO", label: "Solo Warriors" },
  { id: "CLAN", label: "Clans" },
  { id: "COMPANIES", label: "Companies" },
  { id: "COUNTRY", label: "Country" },
]

export const DIVISION_META: Record<
  Division,
  { label: string; accent: string; ring: string; bg: string; minLp: number }
> = {
  DIAMOND: {
    label: "DIAMOND",
    accent: "text-neon",
    ring: "border-neon/60",
    bg: "bg-neon/10",
    minLp: 2400,
  },
  PLATINUM: {
    label: "PLATINUM",
    accent: "text-electric",
    ring: "border-electric/60",
    bg: "bg-electric/10",
    minLp: 1800,
  },
  GOLD: {
    label: "GOLD",
    accent: "text-gold",
    ring: "border-gold/60",
    bg: "bg-gold/10",
    minLp: 1200,
  },
  SILVER: {
    label: "SILVER",
    accent: "text-text",
    ring: "border-text/40",
    bg: "bg-text/5",
    minLp: 600,
  },
  BRONZE: {
    label: "BRONZE",
    accent: "text-ember",
    ring: "border-ember/40",
    bg: "bg-ember/10",
    minLp: 0,
  },
}

const W = (
  rank: number,
  prevRank: number | null,
  username: string,
  handle: string,
  country: string,
  countryFlag: string,
  division: Division,
  divisionTier: string,
  lp: number,
  totalXp: number,
  wins: number,
  losses: number,
  streak: number,
  battles: number,
  badges: string[],
  isYou = false,
  isPro = false,
): Warrior => ({
  rank,
  prevRank,
  username,
  handle,
  country,
  countryFlag,
  division,
  divisionTier,
  lp,
  totalXp,
  wins,
  losses,
  winRate: Math.round((wins / (wins + losses)) * 100),
  streak,
  battles,
  badges,
  isYou,
  isPro,
})

export const WARRIORS: Warrior[] = [
  W(1, 1, "isagi_y", "@isagi", "Japan", "JP", "DIAMOND", "I", 3128, 184220, 412, 84, 14, 496, ["MVP", "S04 KING"], false, true),
  W(2, 3, "barou_s", "@barou", "Japan", "JP", "DIAMOND", "I", 2987, 162110, 388, 92, 9, 480, ["TOP100"], false, true),
  W(3, 2, "rin_ito", "@rin", "Japan", "JP", "DIAMOND", "I", 2902, 158402, 374, 96, 6, 470, ["GLACIAL"]),
  W(4, 5, "shidou_r", "@shidou", "Japan", "JP", "DIAMOND", "II", 2718, 142880, 351, 121, 4, 472, []),
  W(5, 4, "bachira", "@bachira", "Japan", "JP", "DIAMOND", "II", 2654, 138204, 332, 130, 0, 462, ["DRIBBLER"]),
  W(6, 9, "nagi_s", "@nagi", "Japan", "JP", "DIAMOND", "II", 2540, 121440, 298, 110, 7, 408, ["GENIUS"]),
  W(7, 6, "kaiser_m", "@kaiser", "Germany", "DE", "DIAMOND", "II", 2487, 119820, 304, 128, 0, 432, []),
  W(8, 8, "noa_sn", "@noa", "Japan", "JP", "DIAMOND", "III", 2401, 110204, 281, 137, 3, 418, ["VETERAN"]),
  W(9, 7, "hiori_y", "@hiori", "Japan", "JP", "PLATINUM", "I", 2298, 98210, 262, 138, 0, 400, []),
  W(10, 11, "chigiri", "@chigiri", "Japan", "JP", "PLATINUM", "I", 2240, 94820, 248, 142, 5, 390, ["SPEED"]),
  W(11, 10, "yukimiya", "@yukimiya", "Japan", "JP", "PLATINUM", "I", 2188, 88410, 240, 150, 0, 390, []),
  W(12, 12, "kunigami", "@kunigami", "Japan", "JP", "PLATINUM", "II", 2102, 82014, 220, 154, 2, 374, ["WILD CARD"]),
  W(13, 14, "reo_mc", "@reo", "Japan", "JP", "PLATINUM", "II", 2046, 78420, 211, 159, 1, 370, []),
  W(14, 13, "karasu_t", "@karasu", "Japan", "JP", "PLATINUM", "II", 1998, 75102, 202, 168, 0, 370, []),
  W(15, 17, "tonystark", "@tonystark", "USA", "US", "PLATINUM", "II", 1842, 64020, 168, 134, 3, 302, ["RISING"], true, false),
  W(16, 16, "loki_a", "@loki", "Norway", "NO", "PLATINUM", "III", 1788, 60214, 158, 132, 0, 290, []),
  W(17, 15, "thor_o", "@thor", "Norway", "NO", "PLATINUM", "III", 1740, 58102, 156, 138, 0, 294, []),
  W(18, 19, "vision", "@vision", "USA", "US", "GOLD", "I", 1648, 51420, 138, 122, 4, 260, []),
  W(19, 18, "wanda_m", "@wanda", "Russia", "RU", "GOLD", "I", 1602, 48810, 132, 124, 0, 256, []),
  W(20, null, "natasha", "@natasha", "Russia", "RU", "GOLD", "I", 1574, 46020, 126, 120, 2, 246, ["NEW"]),
  W(21, 22, "stephen", "@strange", "USA", "US", "GOLD", "II", 1490, 42010, 118, 124, 0, 242, []),
  W(22, 21, "tchalla_w", "@tchalla", "Wakanda", "WK", "GOLD", "II", 1444, 39820, 110, 122, 0, 232, []),
  W(23, 24, "shuri_w", "@shuri", "Wakanda", "WK", "GOLD", "II", 1402, 37410, 104, 124, 1, 228, []),
  W(24, 23, "okoye_w", "@okoye", "Wakanda", "WK", "GOLD", "III", 1338, 34020, 98, 130, 0, 228, []),
  W(25, 26, "peter_p", "@spidey", "USA", "US", "GOLD", "III", 1284, 31410, 92, 132, 0, 224, ["UNDERDOG"]),
  W(26, 25, "miles_m", "@miles", "USA", "US", "SILVER", "I", 1198, 28210, 84, 128, 0, 212, []),
  W(27, 28, "gwen_s", "@gwen", "USA", "US", "SILVER", "I", 1142, 25408, 78, 132, 0, 210, []),
  W(28, 27, "may_p", "@may", "USA", "US", "SILVER", "I", 1098, 23210, 72, 134, 0, 206, []),
  W(29, 30, "ned_l", "@ned", "USA", "US", "SILVER", "II", 1024, 20840, 66, 138, 0, 204, []),
  W(30, 29, "mj_w", "@mj", "USA", "US", "SILVER", "II", 982, 18420, 62, 140, 1, 202, []),
  W(31, 31, "happy_h", "@happy", "USA", "US", "SILVER", "II", 928, 16012, 56, 144, 0, 200, []),
  W(32, 33, "pepper_p", "@pepper", "USA", "US", "SILVER", "III", 854, 14020, 50, 148, 0, 198, []),
  W(33, 32, "rhodey_j", "@rhodey", "USA", "US", "SILVER", "III", 798, 12410, 44, 150, 0, 194, []),
  W(34, 34, "harley_k", "@harley", "USA", "US", "BRONZE", "I", 712, 9810, 36, 156, 0, 192, []),
  W(35, 36, "morgan_s", "@morgan", "USA", "US", "BRONZE", "I", 658, 8210, 30, 162, 0, 192, []),
]

export const CLANS: Clan[] = [
  { rank: 1, prevRank: 1, name: "Blue Lock Strikers", tag: "BLS", members: 124, lp: 28420, wins: 2148, battles: 2480, winRate: 87, isYours: true },
  { rank: 2, prevRank: 3, name: "Ego Crushers", tag: "EGO", members: 98, lp: 26120, wins: 1842, battles: 2210, winRate: 83 },
  { rank: 3, prevRank: 2, name: "Tower Hunters", tag: "TWR", members: 86, lp: 24842, wins: 1612, battles: 2002, winRate: 81 },
  { rank: 4, prevRank: 4, name: "Apex Coders", tag: "APX", members: 142, lp: 22014, wins: 1480, battles: 1880, winRate: 79 },
  { rank: 5, prevRank: 6, name: "Glacier Wolves", tag: "GLW", members: 72, lp: 20418, wins: 1342, battles: 1742, winRate: 77 },
  { rank: 6, prevRank: 5, name: "Stack Overflow", tag: "STK", members: 168, lp: 19204, wins: 1212, battles: 1620, winRate: 75 },
  { rank: 7, prevRank: 8, name: "Algo Ronin", tag: "ALR", members: 64, lp: 17820, wins: 1108, battles: 1502, winRate: 74 },
  { rank: 8, prevRank: 7, name: "Recursion Society", tag: "REC", members: 92, lp: 16410, wins: 988, battles: 1390, winRate: 71 },
  { rank: 9, prevRank: 11, name: "Greedy Geniuses", tag: "GRD", members: 58, lp: 15208, wins: 882, battles: 1280, winRate: 69 },
  { rank: 10, prevRank: 9, name: "Heap Knights", tag: "HPK", members: 76, lp: 14008, wins: 798, battles: 1188, winRate: 67 },
  { rank: 11, prevRank: 10, name: "Trie Walkers", tag: "TRI", members: 48, lp: 12810, wins: 712, battles: 1102, winRate: 65 },
  { rank: 12, prevRank: 12, name: "Bitwise Brigade", tag: "BIT", members: 88, lp: 11620, wins: 642, battles: 1024, winRate: 63 },
]

export const SEASON_INFO = {
  name: "Season 04",
  codename: "Egoist Reign",
  daysLeft: 12,
  totalDays: 60,
  prizePool: "120,000 LP",
  participants: "84,210",
}

export const YOUR_STATS = {
  rank: 15,
  prevRank: 17,
  totalWarriors: 84210,
  percentile: 99.98,
  username: "tonystark",
  division: "PLATINUM" as Division,
  tier: "II",
  lp: 1842,
  toNext: 158, // LP to next tier
  weeklyDelta: +124,
}
