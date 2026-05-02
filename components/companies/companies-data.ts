export type CompanyTier =
  | "TITAN" // FAANG / mega-caps
  | "UNICORN" // Late-stage private
  | "ELITE" // Top public engineering brands
  | "QUANT" // High-frequency trading / quant
  | "RISING" // Hot startups
  | "GLOBAL" // International leaders

export type CompanyIndustry =
  | "Search & Cloud"
  | "Social"
  | "E-Commerce"
  | "Productivity"
  | "Consumer Hardware"
  | "Streaming"
  | "FinTech"
  | "Mobility"
  | "AI Research"
  | "Crypto"
  | "Data Cloud"
  | "Quant Trading"
  | "Investment Bank"
  | "Creative Tools"
  | "Music"
  | "SaaS"
  | "Database"
  | "Dev Tools"
  | "Hardware"
  | "EV"

export type QuestionTag =
  | "Arrays"
  | "Strings"
  | "Hash Map"
  | "Two Pointers"
  | "Sliding Window"
  | "Binary Search"
  | "Stack"
  | "Linked List"
  | "Trees"
  | "Graphs"
  | "Heap"
  | "Trie"
  | "Backtracking"
  | "Greedy"
  | "DP"
  | "Bit Manipulation"
  | "System Design"
  | "Concurrency"
  | "Math"
  | "OOP"
  | "SQL"

export type CompanySort =
  | "trending"
  | "questions-desc"
  | "questions-asc"
  | "alpha"
  | "hardest"

export type Company = {
  id: string
  slug: string
  name: string
  ticker: string
  industry: CompanyIndustry
  tier: CompanyTier
  description: string
  monogram: string // Initials for the logo tile
  brandColor: string // hex used in the gradient tile
  brandColorTo: string // gradient end
  totalQuestions: number
  easy: number
  medium: number
  hard: number
  avgAcceptance: number // %
  hiring: boolean
  trending?: boolean // featured / hot
  bookmarked?: boolean
  topTags: QuestionTag[]
  recentlyAskedDays: number // how many days ago the latest question was asked
  notableQuestions: { id: string; title: string; difficulty: "EASY" | "MEDIUM" | "HARD"; askedCount: number }[]
}

export const COMPANY_TIERS: { id: CompanyTier | "ALL"; label: string }[] = [
  { id: "ALL", label: "All Tiers" },
  { id: "TITAN", label: "Titan" },
  { id: "UNICORN", label: "Unicorn" },
  { id: "ELITE", label: "Elite" },
  { id: "QUANT", label: "Quant" },
  { id: "RISING", label: "Rising" },
  { id: "GLOBAL", label: "Global" },
]

export const COMPANY_TAGS: QuestionTag[] = [
  "Arrays",
  "Strings",
  "Hash Map",
  "Two Pointers",
  "Sliding Window",
  "Binary Search",
  "Stack",
  "Linked List",
  "Trees",
  "Graphs",
  "Heap",
  "Trie",
  "Backtracking",
  "Greedy",
  "DP",
  "Bit Manipulation",
  "System Design",
  "Concurrency",
  "Math",
  "OOP",
  "SQL",
]

export const COMPANY_SORTS: { id: CompanySort; label: string }[] = [
  { id: "trending", label: "Trending" },
  { id: "questions-desc", label: "Most Questions" },
  { id: "questions-asc", label: "Fewest Questions" },
  { id: "alpha", label: "A → Z" },
  { id: "hardest", label: "Hardest First" },
]

export const COMPANIES: Company[] = [
  // ─── TITANS ────────────────────────────────────────────
  {
    id: "c-google",
    slug: "google",
    name: "Google",
    ticker: "GOOG",
    industry: "Search & Cloud",
    tier: "TITAN",
    description:
      "Search, Cloud, Android. Loves graph problems, system design, and tricky DP. Onsite is famously 4–5 rounds.",
    monogram: "G",
    brandColor: "#4285F4",
    brandColorTo: "#0B5FFF",
    totalQuestions: 624,
    easy: 168,
    medium: 312,
    hard: 144,
    avgAcceptance: 47,
    hiring: true,
    trending: true,
    bookmarked: true,
    topTags: ["Graphs", "DP", "Trees", "System Design", "Hash Map"],
    recentlyAskedDays: 1,
    notableQuestions: [
      { id: "q1", title: "Snake Game II", difficulty: "MEDIUM", askedCount: 84 },
      { id: "q2", title: "Decode String", difficulty: "MEDIUM", askedCount: 71 },
      { id: "q3", title: "Word Squares", difficulty: "HARD", askedCount: 58 },
    ],
  },
  {
    id: "c-meta",
    slug: "meta",
    name: "Meta",
    ticker: "META",
    industry: "Social",
    tier: "TITAN",
    description:
      "Facebook, Instagram, WhatsApp, Reality Labs. Heavy on arrays, strings, and graph traversal. Coding bar is sharp and fast.",
    monogram: "M",
    brandColor: "#0866FF",
    brandColorTo: "#1877F2",
    totalQuestions: 512,
    easy: 142,
    medium: 268,
    hard: 102,
    avgAcceptance: 51,
    hiring: true,
    trending: true,
    topTags: ["Arrays", "Graphs", "Trees", "Hash Map", "Strings"],
    recentlyAskedDays: 2,
    notableQuestions: [
      { id: "q1", title: "Valid Palindrome II", difficulty: "EASY", askedCount: 142 },
      { id: "q2", title: "Random Pick with Weight", difficulty: "MEDIUM", askedCount: 98 },
      { id: "q3", title: "Minimum Remove to Make Valid", difficulty: "MEDIUM", askedCount: 96 },
    ],
  },
  {
    id: "c-amazon",
    slug: "amazon",
    name: "Amazon",
    ticker: "AMZN",
    industry: "E-Commerce",
    tier: "TITAN",
    description:
      "AWS, Retail, Devices. Famous for behavioral + LP rounds plus 2 coding rounds. Expect graph BFS and design.",
    monogram: "A",
    brandColor: "#FF9900",
    brandColorTo: "#FF6A00",
    totalQuestions: 786,
    easy: 224,
    medium: 402,
    hard: 160,
    avgAcceptance: 49,
    hiring: true,
    trending: true,
    topTags: ["Arrays", "Trees", "Graphs", "DP", "System Design"],
    recentlyAskedDays: 1,
    notableQuestions: [
      { id: "q1", title: "Number of Islands", difficulty: "MEDIUM", askedCount: 184 },
      { id: "q2", title: "LRU Cache", difficulty: "MEDIUM", askedCount: 142 },
      { id: "q3", title: "Reorder Data in Log Files", difficulty: "EASY", askedCount: 128 },
    ],
  },
  {
    id: "c-microsoft",
    slug: "microsoft",
    name: "Microsoft",
    ticker: "MSFT",
    industry: "Productivity",
    tier: "TITAN",
    description:
      "Azure, Office, Xbox, Copilot. Classic CS fundamentals. Expect strings, OOP design, and lots of trees.",
    monogram: "MS",
    brandColor: "#5E5DF0",
    brandColorTo: "#0078D4",
    totalQuestions: 548,
    easy: 162,
    medium: 286,
    hard: 100,
    avgAcceptance: 53,
    hiring: true,
    topTags: ["Strings", "Trees", "Linked List", "OOP", "Arrays"],
    recentlyAskedDays: 3,
    notableQuestions: [
      { id: "q1", title: "Reverse Words in a String", difficulty: "MEDIUM", askedCount: 92 },
      { id: "q2", title: "Copy List with Random Pointer", difficulty: "MEDIUM", askedCount: 78 },
      { id: "q3", title: "Spiral Matrix", difficulty: "MEDIUM", askedCount: 64 },
    ],
  },
  {
    id: "c-apple",
    slug: "apple",
    name: "Apple",
    ticker: "AAPL",
    industry: "Consumer Hardware",
    tier: "TITAN",
    description:
      "iPhone, iCloud, Silicon. Expect strong fundamentals, low-level systems, and OOP design. Quiet but rigorous interviews.",
    monogram: "A",
    brandColor: "#A2AAAD",
    brandColorTo: "#5E5E5E",
    totalQuestions: 332,
    easy: 96,
    medium: 178,
    hard: 58,
    avgAcceptance: 56,
    hiring: false,
    topTags: ["OOP", "Strings", "Arrays", "Math", "Bit Manipulation"],
    recentlyAskedDays: 6,
    notableQuestions: [
      { id: "q1", title: "Simplify Path", difficulty: "MEDIUM", askedCount: 52 },
      { id: "q2", title: "Combine Two Tables", difficulty: "EASY", askedCount: 41 },
      { id: "q3", title: "Reverse Linked List II", difficulty: "MEDIUM", askedCount: 38 },
    ],
  },
  {
    id: "c-netflix",
    slug: "netflix",
    name: "Netflix",
    ticker: "NFLX",
    industry: "Streaming",
    tier: "TITAN",
    description:
      "Streaming, Studios, Games. Bar is brutal — fewer rounds but each one is deep. Heavy on system design.",
    monogram: "N",
    brandColor: "#E50914",
    brandColorTo: "#B20710",
    totalQuestions: 184,
    easy: 38,
    medium: 92,
    hard: 54,
    avgAcceptance: 38,
    hiring: true,
    trending: true,
    topTags: ["System Design", "DP", "Graphs", "Concurrency", "Hash Map"],
    recentlyAskedDays: 2,
    notableQuestions: [
      { id: "q1", title: "Design HitCounter", difficulty: "MEDIUM", askedCount: 44 },
      { id: "q2", title: "Word Break II", difficulty: "HARD", askedCount: 36 },
      { id: "q3", title: "Top K Frequent Words", difficulty: "MEDIUM", askedCount: 32 },
    ],
  },

  // ─── UNICORNS ─────────────────────────────────────────
  {
    id: "c-stripe",
    slug: "stripe",
    name: "Stripe",
    ticker: "STRP",
    industry: "FinTech",
    tier: "UNICORN",
    description:
      "Payments infrastructure for the internet. Famous for practical, real-world coding interviews — multi-step, no LeetCode-tricks.",
    monogram: "S",
    brandColor: "#635BFF",
    brandColorTo: "#3B82F6",
    totalQuestions: 142,
    easy: 28,
    medium: 78,
    hard: 36,
    avgAcceptance: 42,
    hiring: true,
    trending: true,
    bookmarked: true,
    topTags: ["Hash Map", "OOP", "Strings", "System Design", "Concurrency"],
    recentlyAskedDays: 1,
    notableQuestions: [
      { id: "q1", title: "API Rate Limiter", difficulty: "MEDIUM", askedCount: 56 },
      { id: "q2", title: "Bank Account Reconciler", difficulty: "MEDIUM", askedCount: 42 },
      { id: "q3", title: "Currency Conversion Graph", difficulty: "HARD", askedCount: 28 },
    ],
  },
  {
    id: "c-openai",
    slug: "openai",
    name: "OpenAI",
    ticker: "OPAI",
    industry: "AI Research",
    tier: "UNICORN",
    description:
      "GPT, ChatGPT, Sora. Mix of applied ML, distributed systems, and pure algorithms. Bar is exceptionally high.",
    monogram: "O",
    brandColor: "#10A37F",
    brandColorTo: "#0E8A6A",
    totalQuestions: 124,
    easy: 22,
    medium: 64,
    hard: 38,
    avgAcceptance: 36,
    hiring: true,
    trending: true,
    topTags: ["DP", "System Design", "Math", "Graphs", "Concurrency"],
    recentlyAskedDays: 0,
    notableQuestions: [
      { id: "q1", title: "Token Streaming Buffer", difficulty: "MEDIUM", askedCount: 38 },
      { id: "q2", title: "Retrieval Index Sharding", difficulty: "HARD", askedCount: 24 },
      { id: "q3", title: "Inference Queue Scheduler", difficulty: "HARD", askedCount: 18 },
    ],
  },
  {
    id: "c-anthropic",
    slug: "anthropic",
    name: "Anthropic",
    ticker: "ANTH",
    industry: "AI Research",
    tier: "UNICORN",
    description:
      "Claude, Constitutional AI, alignment research. Expect rigor on systems thinking and clean code under pressure.",
    monogram: "A",
    brandColor: "#D97757",
    brandColorTo: "#C45A38",
    totalQuestions: 86,
    easy: 16,
    medium: 46,
    hard: 24,
    avgAcceptance: 40,
    hiring: true,
    trending: true,
    topTags: ["DP", "Math", "System Design", "Strings", "Trees"],
    recentlyAskedDays: 1,
    notableQuestions: [
      { id: "q1", title: "Token Bucket Rate Limiter", difficulty: "MEDIUM", askedCount: 28 },
      { id: "q2", title: "Constitutional Filter Tree", difficulty: "HARD", askedCount: 22 },
      { id: "q3", title: "Prefix Trie Compression", difficulty: "MEDIUM", askedCount: 19 },
    ],
  },
  {
    id: "c-airbnb",
    slug: "airbnb",
    name: "Airbnb",
    ticker: "ABNB",
    industry: "Mobility",
    tier: "UNICORN",
    description:
      "Stays, Experiences, AI Search. Loves practical coding problems with a hospitality twist.",
    monogram: "A",
    brandColor: "#FF5A5F",
    brandColorTo: "#FF385C",
    totalQuestions: 168,
    easy: 42,
    medium: 92,
    hard: 34,
    avgAcceptance: 52,
    hiring: false,
    topTags: ["Trees", "Hash Map", "Graphs", "OOP", "DP"],
    recentlyAskedDays: 4,
    notableQuestions: [
      { id: "q1", title: "Pour Water", difficulty: "MEDIUM", askedCount: 36 },
      { id: "q2", title: "Mini Parser", difficulty: "MEDIUM", askedCount: 28 },
      { id: "q3", title: "Alien Dictionary", difficulty: "HARD", askedCount: 24 },
    ],
  },
  {
    id: "c-uber",
    slug: "uber",
    name: "Uber",
    ticker: "UBER",
    industry: "Mobility",
    tier: "UNICORN",
    description:
      "Rides, Eats, Freight, ATG. Expect graph algorithms (routing!), heaps, and distributed system design.",
    monogram: "U",
    brandColor: "#000000",
    brandColorTo: "#1FBAD6",
    totalQuestions: 286,
    easy: 74,
    medium: 152,
    hard: 60,
    avgAcceptance: 50,
    hiring: true,
    topTags: ["Graphs", "Heap", "Hash Map", "DP", "System Design"],
    recentlyAskedDays: 2,
    notableQuestions: [
      { id: "q1", title: "Shortest Path with K Stops", difficulty: "HARD", askedCount: 64 },
      { id: "q2", title: "Sliding Window Maximum", difficulty: "HARD", askedCount: 48 },
      { id: "q3", title: "Top K Frequent Elements", difficulty: "MEDIUM", askedCount: 42 },
    ],
  },
  {
    id: "c-databricks",
    slug: "databricks",
    name: "Databricks",
    ticker: "DBRX",
    industry: "Data Cloud",
    tier: "UNICORN",
    description:
      "Lakehouse, Unity Catalog, Mosaic AI. Expect distributed systems, Spark internals, and tough algorithmic rounds.",
    monogram: "DB",
    brandColor: "#FF3621",
    brandColorTo: "#1B3139",
    totalQuestions: 132,
    easy: 28,
    medium: 68,
    hard: 36,
    avgAcceptance: 41,
    hiring: true,
    trending: true,
    topTags: ["Graphs", "DP", "System Design", "Hash Map", "Concurrency"],
    recentlyAskedDays: 1,
    notableQuestions: [
      { id: "q1", title: "Distributed Counter Reconciler", difficulty: "HARD", askedCount: 36 },
      { id: "q2", title: "Shard Rebalancer", difficulty: "HARD", askedCount: 28 },
      { id: "q3", title: "Query Plan Optimizer", difficulty: "MEDIUM", askedCount: 22 },
    ],
  },
  {
    id: "c-coinbase",
    slug: "coinbase",
    name: "Coinbase",
    ticker: "COIN",
    industry: "Crypto",
    tier: "UNICORN",
    description:
      "Crypto exchange, Base L2, wallets. Expect order book mechanics, concurrency, and a take-home exercise.",
    monogram: "C",
    brandColor: "#0052FF",
    brandColorTo: "#1652F0",
    totalQuestions: 96,
    easy: 22,
    medium: 50,
    hard: 24,
    avgAcceptance: 48,
    hiring: true,
    topTags: ["Hash Map", "Concurrency", "Heap", "OOP", "System Design"],
    recentlyAskedDays: 3,
    notableQuestions: [
      { id: "q1", title: "Order Book Engine", difficulty: "MEDIUM", askedCount: 32 },
      { id: "q2", title: "UTXO Reconciler", difficulty: "HARD", askedCount: 18 },
      { id: "q3", title: "Wallet Address Generator", difficulty: "MEDIUM", askedCount: 14 },
    ],
  },

  // ─── ELITE ────────────────────────────────────────────
  {
    id: "c-nvidia",
    slug: "nvidia",
    name: "Nvidia",
    ticker: "NVDA",
    industry: "Hardware",
    tier: "ELITE",
    description:
      "GPUs, CUDA, Omniverse, automotive. Strong systems and parallel programming focus. Hardware-aware coding.",
    monogram: "N",
    brandColor: "#76B900",
    brandColorTo: "#5C9300",
    totalQuestions: 218,
    easy: 52,
    medium: 110,
    hard: 56,
    avgAcceptance: 44,
    hiring: true,
    trending: true,
    topTags: ["Concurrency", "Bit Manipulation", "Math", "Arrays", "DP"],
    recentlyAskedDays: 2,
    notableQuestions: [
      { id: "q1", title: "Parallel Matrix Multiply", difficulty: "HARD", askedCount: 42 },
      { id: "q2", title: "Tensor Reshape Validator", difficulty: "MEDIUM", askedCount: 36 },
      { id: "q3", title: "GPU Block Scheduler", difficulty: "HARD", askedCount: 28 },
    ],
  },
  {
    id: "c-tesla",
    slug: "tesla",
    name: "Tesla",
    ticker: "TSLA",
    industry: "EV",
    tier: "ELITE",
    description:
      "EVs, Autopilot, Energy, Optimus. Expect embedded systems thinking, geometry problems, and chaotic simulation rounds.",
    monogram: "T",
    brandColor: "#E31937",
    brandColorTo: "#CC0000",
    totalQuestions: 154,
    easy: 36,
    medium: 82,
    hard: 36,
    avgAcceptance: 46,
    hiring: false,
    topTags: ["Math", "Graphs", "DP", "Greedy", "System Design"],
    recentlyAskedDays: 5,
    notableQuestions: [
      { id: "q1", title: "Battery Pack Balancer", difficulty: "MEDIUM", askedCount: 24 },
      { id: "q2", title: "Trajectory Smoother", difficulty: "HARD", askedCount: 18 },
      { id: "q3", title: "Charging Station Placement", difficulty: "MEDIUM", askedCount: 16 },
    ],
  },
  {
    id: "c-bloomberg",
    slug: "bloomberg",
    name: "Bloomberg",
    ticker: "BBG",
    industry: "FinTech",
    tier: "ELITE",
    description:
      "Bloomberg Terminal, news, data. Famous for stack/queue problems, trees, and OOP design questions.",
    monogram: "B",
    brandColor: "#FA7B17",
    brandColorTo: "#E55A00",
    totalQuestions: 248,
    easy: 64,
    medium: 132,
    hard: 52,
    avgAcceptance: 54,
    hiring: true,
    topTags: ["Trees", "Stack", "OOP", "Linked List", "Hash Map"],
    recentlyAskedDays: 4,
    notableQuestions: [
      { id: "q1", title: "Flatten Nested List Iterator", difficulty: "MEDIUM", askedCount: 64 },
      { id: "q2", title: "Insert into a Sorted Circular List", difficulty: "MEDIUM", askedCount: 48 },
      { id: "q3", title: "Encode N-ary Tree", difficulty: "HARD", askedCount: 32 },
    ],
  },
  {
    id: "c-adobe",
    slug: "adobe",
    name: "Adobe",
    ticker: "ADBE",
    industry: "Creative Tools",
    tier: "ELITE",
    description:
      "Photoshop, Premiere, Firefly. Mix of creative engineering and classic algorithms. Friendly bar but real depth.",
    monogram: "A",
    brandColor: "#FA0F00",
    brandColorTo: "#D70000",
    totalQuestions: 196,
    easy: 58,
    medium: 102,
    hard: 36,
    avgAcceptance: 58,
    hiring: false,
    topTags: ["Strings", "Arrays", "DP", "Trees", "Math"],
    recentlyAskedDays: 7,
    notableQuestions: [
      { id: "q1", title: "Image Region Fill", difficulty: "MEDIUM", askedCount: 32 },
      { id: "q2", title: "Histogram Equalize", difficulty: "MEDIUM", askedCount: 22 },
      { id: "q3", title: "Layer Composition Tree", difficulty: "HARD", askedCount: 16 },
    ],
  },
  {
    id: "c-spotify",
    slug: "spotify",
    name: "Spotify",
    ticker: "SPOT",
    industry: "Music",
    tier: "ELITE",
    description:
      "Music, podcasts, audiobooks, ML personalization. Expect playful product-flavored algorithms.",
    monogram: "S",
    brandColor: "#1DB954",
    brandColorTo: "#1AA34A",
    totalQuestions: 92,
    easy: 28,
    medium: 48,
    hard: 16,
    avgAcceptance: 60,
    hiring: false,
    topTags: ["Hash Map", "Heap", "Trees", "Graphs", "DP"],
    recentlyAskedDays: 9,
    notableQuestions: [
      { id: "q1", title: "Playlist Shuffler", difficulty: "MEDIUM", askedCount: 24 },
      { id: "q2", title: "Listening Streak Counter", difficulty: "EASY", askedCount: 18 },
      { id: "q3", title: "Recommendation Top-K", difficulty: "MEDIUM", askedCount: 14 },
    ],
  },
  {
    id: "c-salesforce",
    slug: "salesforce",
    name: "Salesforce",
    ticker: "CRM",
    industry: "SaaS",
    tier: "ELITE",
    description:
      "CRM, Slack, Tableau, Data Cloud. Big enterprise interviews — expect SQL, OOP, and integration design.",
    monogram: "SF",
    brandColor: "#00A1E0",
    brandColorTo: "#0070D2",
    totalQuestions: 124,
    easy: 38,
    medium: 64,
    hard: 22,
    avgAcceptance: 57,
    hiring: false,
    topTags: ["SQL", "OOP", "Hash Map", "Strings", "System Design"],
    recentlyAskedDays: 8,
    notableQuestions: [
      { id: "q1", title: "Lead Scoring Pipeline", difficulty: "MEDIUM", askedCount: 18 },
      { id: "q2", title: "Permission Inheritance Tree", difficulty: "MEDIUM", askedCount: 14 },
      { id: "q3", title: "Audit Log Aggregator", difficulty: "MEDIUM", askedCount: 12 },
    ],
  },
  {
    id: "c-snowflake",
    slug: "snowflake",
    name: "Snowflake",
    ticker: "SNOW",
    industry: "Database",
    tier: "ELITE",
    description:
      "Cloud data platform. Expect SQL gymnastics, query optimization, and distributed systems theory.",
    monogram: "SN",
    brandColor: "#29B5E8",
    brandColorTo: "#1A8FB5",
    totalQuestions: 108,
    easy: 24,
    medium: 56,
    hard: 28,
    avgAcceptance: 45,
    hiring: true,
    topTags: ["SQL", "DP", "Graphs", "Hash Map", "System Design"],
    recentlyAskedDays: 3,
    notableQuestions: [
      { id: "q1", title: "Materialized View Refresher", difficulty: "MEDIUM", askedCount: 22 },
      { id: "q2", title: "Query Cost Estimator", difficulty: "HARD", askedCount: 16 },
      { id: "q3", title: "Snowflake Cluster Pruning", difficulty: "MEDIUM", askedCount: 12 },
    ],
  },

  // ─── QUANT ────────────────────────────────────────────
  {
    id: "c-twosigma",
    slug: "two-sigma",
    name: "Two Sigma",
    ticker: "2SIG",
    industry: "Quant Trading",
    tier: "QUANT",
    description:
      "Quant hedge fund. Brutal math + probability + algorithm interviews. Expect cleverness over volume.",
    monogram: "2σ",
    brandColor: "#F9A03F",
    brandColorTo: "#E07B14",
    totalQuestions: 86,
    easy: 12,
    medium: 38,
    hard: 36,
    avgAcceptance: 32,
    hiring: true,
    trending: true,
    topTags: ["Math", "DP", "Bit Manipulation", "Heap", "Graphs"],
    recentlyAskedDays: 2,
    notableQuestions: [
      { id: "q1", title: "Optimal Bet Sizing", difficulty: "HARD", askedCount: 24 },
      { id: "q2", title: "Markov Chain Steady State", difficulty: "HARD", askedCount: 18 },
      { id: "q3", title: "Dice Expected Value", difficulty: "MEDIUM", askedCount: 16 },
    ],
  },
  {
    id: "c-janestreet",
    slug: "jane-street",
    name: "Jane Street",
    ticker: "JANE",
    industry: "Quant Trading",
    tier: "QUANT",
    description:
      "Trading firm using OCaml everywhere. Expect mental math, probability puzzles, and elegant code.",
    monogram: "JS",
    brandColor: "#1A4D7C",
    brandColorTo: "#0E2D4F",
    totalQuestions: 64,
    easy: 8,
    medium: 28,
    hard: 28,
    avgAcceptance: 28,
    hiring: true,
    topTags: ["Math", "DP", "Bit Manipulation", "Greedy", "Trees"],
    recentlyAskedDays: 4,
    notableQuestions: [
      { id: "q1", title: "Coin Flip Sequences", difficulty: "MEDIUM", askedCount: 18 },
      { id: "q2", title: "Optimal Stopping Theorem", difficulty: "HARD", askedCount: 14 },
      { id: "q3", title: "Trading Window EV", difficulty: "HARD", askedCount: 12 },
    ],
  },
  {
    id: "c-citadel",
    slug: "citadel",
    name: "Citadel",
    ticker: "CTDL",
    industry: "Quant Trading",
    tier: "QUANT",
    description:
      "Citadel + Citadel Securities. C++ shops at heart. Expect hard algorithms, stats, and live coding under pressure.",
    monogram: "C",
    brandColor: "#0A2540",
    brandColorTo: "#1A3A5C",
    totalQuestions: 78,
    easy: 14,
    medium: 32,
    hard: 32,
    avgAcceptance: 30,
    hiring: true,
    topTags: ["DP", "Math", "Heap", "Graphs", "Bit Manipulation"],
    recentlyAskedDays: 3,
    notableQuestions: [
      { id: "q1", title: "Order Matching Engine", difficulty: "HARD", askedCount: 28 },
      { id: "q2", title: "Latency Arb Detector", difficulty: "HARD", askedCount: 18 },
      { id: "q3", title: "Tick Compression", difficulty: "MEDIUM", askedCount: 14 },
    ],
  },
  {
    id: "c-goldman",
    slug: "goldman-sachs",
    name: "Goldman Sachs",
    ticker: "GS",
    industry: "Investment Bank",
    tier: "QUANT",
    description:
      "Global investment bank with massive engineering org. Mix of HackerRank screens, OOP design, and SQL.",
    monogram: "GS",
    brandColor: "#7399C6",
    brandColorTo: "#0F3057",
    totalQuestions: 162,
    easy: 48,
    medium: 84,
    hard: 30,
    avgAcceptance: 52,
    hiring: true,
    topTags: ["SQL", "OOP", "Arrays", "Strings", "Hash Map"],
    recentlyAskedDays: 6,
    notableQuestions: [
      { id: "q1", title: "Trading Window Profit", difficulty: "MEDIUM", askedCount: 32 },
      { id: "q2", title: "Risk Aggregation", difficulty: "MEDIUM", askedCount: 22 },
      { id: "q3", title: "Bond Yield Calculator", difficulty: "MEDIUM", askedCount: 18 },
    ],
  },

  // ─── RISING ───────────────────────────────────────────
  {
    id: "c-vercel",
    slug: "vercel",
    name: "Vercel",
    ticker: "VRCL",
    industry: "Dev Tools",
    tier: "RISING",
    description:
      "Frontend cloud, Next.js, AI SDK, v0. Pragmatic interviews — expect TypeScript, edge runtime, and DX problems.",
    monogram: "V",
    brandColor: "#000000",
    brandColorTo: "#3F3F46",
    totalQuestions: 56,
    easy: 18,
    medium: 28,
    hard: 10,
    avgAcceptance: 60,
    hiring: true,
    trending: true,
    topTags: ["Strings", "Hash Map", "OOP", "Graphs", "System Design"],
    recentlyAskedDays: 1,
    notableQuestions: [
      { id: "q1", title: "Edge Cache Invalidator", difficulty: "MEDIUM", askedCount: 18 },
      { id: "q2", title: "ISR Revalidation Queue", difficulty: "MEDIUM", askedCount: 14 },
      { id: "q3", title: "Build Graph Resolver", difficulty: "HARD", askedCount: 10 },
    ],
  },
  {
    id: "c-figma",
    slug: "figma",
    name: "Figma",
    ticker: "FIG",
    industry: "Creative Tools",
    tier: "RISING",
    description:
      "Collaborative design tool. Realtime CRDTs, geometry, rendering. Famous for take-home + onsite blend.",
    monogram: "F",
    brandColor: "#F24E1E",
    brandColorTo: "#A259FF",
    totalQuestions: 72,
    easy: 16,
    medium: 38,
    hard: 18,
    avgAcceptance: 49,
    hiring: true,
    trending: true,
    topTags: ["Trees", "Graphs", "Concurrency", "Math", "System Design"],
    recentlyAskedDays: 2,
    notableQuestions: [
      { id: "q1", title: "CRDT Conflict Resolver", difficulty: "HARD", askedCount: 22 },
      { id: "q2", title: "Bezier Hit Test", difficulty: "MEDIUM", askedCount: 16 },
      { id: "q3", title: "Layer Z-Index Compactor", difficulty: "MEDIUM", askedCount: 12 },
    ],
  },
  {
    id: "c-notion",
    slug: "notion",
    name: "Notion",
    ticker: "NOTN",
    industry: "Productivity",
    tier: "RISING",
    description:
      "Knowledge OS — docs, databases, AI. Tree-shaped data everywhere. Expect realistic block-editor problems.",
    monogram: "N",
    brandColor: "#FFFFFF",
    brandColorTo: "#7B7B7B",
    totalQuestions: 48,
    easy: 14,
    medium: 26,
    hard: 8,
    avgAcceptance: 56,
    hiring: false,
    topTags: ["Trees", "Linked List", "Strings", "Hash Map", "OOP"],
    recentlyAskedDays: 5,
    notableQuestions: [
      { id: "q1", title: "Block Tree Reorderer", difficulty: "MEDIUM", askedCount: 14 },
      { id: "q2", title: "Slash Command Parser", difficulty: "MEDIUM", askedCount: 10 },
      { id: "q3", title: "Sync Conflict Merger", difficulty: "HARD", askedCount: 8 },
    ],
  },
  {
    id: "c-linear",
    slug: "linear",
    name: "Linear",
    ticker: "LNR",
    industry: "Productivity",
    tier: "RISING",
    description:
      "Issue tracking for elite engineering teams. High taste bar. Expect realtime sync and crisp UX algorithms.",
    monogram: "L",
    brandColor: "#5E6AD2",
    brandColorTo: "#3D4DC4",
    totalQuestions: 36,
    easy: 8,
    medium: 22,
    hard: 6,
    avgAcceptance: 58,
    hiring: true,
    topTags: ["Hash Map", "Trees", "Strings", "System Design", "Concurrency"],
    recentlyAskedDays: 3,
    notableQuestions: [
      { id: "q1", title: "Issue Cycle Scheduler", difficulty: "MEDIUM", askedCount: 12 },
      { id: "q2", title: "Realtime Mention Parser", difficulty: "MEDIUM", askedCount: 8 },
      { id: "q3", title: "Workflow Graph Validator", difficulty: "HARD", askedCount: 6 },
    ],
  },
  {
    id: "c-roblox",
    slug: "roblox",
    name: "Roblox",
    ticker: "RBLX",
    industry: "Consumer Hardware",
    tier: "RISING",
    description:
      "User-generated 3D platform. Expect physics, geometry, networking, and lots of optimization questions.",
    monogram: "R",
    brandColor: "#E2231A",
    brandColorTo: "#A50E1B",
    totalQuestions: 84,
    easy: 22,
    medium: 44,
    hard: 18,
    avgAcceptance: 51,
    hiring: false,
    topTags: ["Math", "Graphs", "DP", "Concurrency", "Trees"],
    recentlyAskedDays: 7,
    notableQuestions: [
      { id: "q1", title: "Voxel Mesh Compactor", difficulty: "HARD", askedCount: 14 },
      { id: "q2", title: "Avatar Animation Blender", difficulty: "MEDIUM", askedCount: 10 },
      { id: "q3", title: "Server Region Picker", difficulty: "MEDIUM", askedCount: 8 },
    ],
  },

  // ─── GLOBAL ───────────────────────────────────────────
  {
    id: "c-bytedance",
    slug: "bytedance",
    name: "ByteDance",
    ticker: "BDNC",
    industry: "Social",
    tier: "GLOBAL",
    description:
      "TikTok, Douyin, Lark. Notoriously hard onsites — many rounds, deep DP, and system design at scale.",
    monogram: "B",
    brandColor: "#25F4EE",
    brandColorTo: "#FE2C55",
    totalQuestions: 384,
    easy: 92,
    medium: 198,
    hard: 94,
    avgAcceptance: 41,
    hiring: true,
    trending: true,
    topTags: ["DP", "Graphs", "Trees", "System Design", "Hash Map"],
    recentlyAskedDays: 1,
    notableQuestions: [
      { id: "q1", title: "Video Feed Ranker", difficulty: "HARD", askedCount: 48 },
      { id: "q2", title: "Trending Hashtag Bucket", difficulty: "MEDIUM", askedCount: 36 },
      { id: "q3", title: "Recommendation Replay Buffer", difficulty: "HARD", askedCount: 28 },
    ],
  },
  {
    id: "c-shopify",
    slug: "shopify",
    name: "Shopify",
    ticker: "SHOP",
    industry: "E-Commerce",
    tier: "GLOBAL",
    description:
      "Commerce platform. Pair programming, real-world Ruby/TypeScript problems, take-home challenges.",
    monogram: "S",
    brandColor: "#95BF47",
    brandColorTo: "#5E8E3E",
    totalQuestions: 118,
    easy: 32,
    medium: 64,
    hard: 22,
    avgAcceptance: 55,
    hiring: false,
    topTags: ["OOP", "Hash Map", "Strings", "DP", "System Design"],
    recentlyAskedDays: 8,
    notableQuestions: [
      { id: "q1", title: "Cart Discount Resolver", difficulty: "MEDIUM", askedCount: 22 },
      { id: "q2", title: "Inventory Reservation", difficulty: "MEDIUM", askedCount: 18 },
      { id: "q3", title: "Multi-Currency Pricing", difficulty: "MEDIUM", askedCount: 14 },
    ],
  },
  {
    id: "c-atlassian",
    slug: "atlassian",
    name: "Atlassian",
    ticker: "TEAM",
    industry: "SaaS",
    tier: "GLOBAL",
    description:
      "Jira, Confluence, Trello. Friendly but rigorous. Expect collaborative coding and design discussions.",
    monogram: "A",
    brandColor: "#0052CC",
    brandColorTo: "#2684FF",
    totalQuestions: 142,
    easy: 42,
    medium: 76,
    hard: 24,
    avgAcceptance: 56,
    hiring: true,
    topTags: ["Trees", "Hash Map", "Strings", "OOP", "Graphs"],
    recentlyAskedDays: 4,
    notableQuestions: [
      { id: "q1", title: "Sprint Burndown Calc", difficulty: "MEDIUM", askedCount: 22 },
      { id: "q2", title: "Issue Hierarchy Flatten", difficulty: "MEDIUM", askedCount: 16 },
      { id: "q3", title: "Permission Resolver", difficulty: "HARD", askedCount: 12 },
    ],
  },
  {
    id: "c-oracle",
    slug: "oracle",
    name: "Oracle",
    ticker: "ORCL",
    industry: "Database",
    tier: "GLOBAL",
    description:
      "Enterprise databases, OCI, Java stewardship. Expect SQL-heavy interviews and OOP fundamentals.",
    monogram: "O",
    brandColor: "#F80000",
    brandColorTo: "#A50000",
    totalQuestions: 168,
    easy: 56,
    medium: 84,
    hard: 28,
    avgAcceptance: 53,
    hiring: false,
    topTags: ["SQL", "OOP", "Trees", "Hash Map", "Strings"],
    recentlyAskedDays: 11,
    notableQuestions: [
      { id: "q1", title: "Join Optimizer", difficulty: "HARD", askedCount: 24 },
      { id: "q2", title: "Pagination Window", difficulty: "MEDIUM", askedCount: 16 },
      { id: "q3", title: "Index Picker", difficulty: "MEDIUM", askedCount: 12 },
    ],
  },
]

// ─── Aggregate stats for header ─────────────────────────
export const COMPANY_STATS = {
  totalCompanies: COMPANIES.length,
  totalQuestions: COMPANIES.reduce((acc, c) => acc + c.totalQuestions, 0),
  hiringNow: COMPANIES.filter((c) => c.hiring).length,
  trendingNow: COMPANIES.filter((c) => c.trending).length,
}

// ─── Side rail content ──────────────────────────────────
export const TRENDING_TAGS: { tag: QuestionTag; count: number; delta: number }[] = [
  { tag: "Graphs", count: 1284, delta: 12 },
  { tag: "DP", count: 1142, delta: 8 },
  { tag: "Trees", count: 968, delta: 4 },
  { tag: "System Design", count: 812, delta: 22 },
  { tag: "Hash Map", count: 742, delta: -2 },
  { tag: "Sliding Window", count: 486, delta: 6 },
]

export const HIRING_SPOTLIGHT = [
  { handle: "Stripe", role: "Senior Backend Eng", flag: "US", lp: "L5" },
  { handle: "Anthropic", role: "Member of Tech Staff", flag: "US", lp: "L6" },
  { handle: "Vercel", role: "Edge Runtime Eng", flag: "US", lp: "L4" },
  { handle: "ByteDance", role: "Recommendation ML", flag: "SG", lp: "L5" },
]

export const COMPANY_NEWS = [
  {
    id: "n1",
    tag: "PROTOCOL",
    title: "62 new Stripe questions added from October 2026 onsites",
    timeAgo: "2h ago",
  },
  {
    id: "n2",
    tag: "TIER UP",
    title: "OpenAI promoted to Titan — 124 verified questions tracked",
    timeAgo: "1d ago",
  },
  {
    id: "n3",
    tag: "RECRUIT",
    title: "Anthropic recruiters are scouting Diamond+ from this leaderboard",
    timeAgo: "3d ago",
  },
]

// ─── Helpers ────────────────────────────────────────────
export function formatRecentlyAsked(days: number) {
  if (days <= 0) return "Today"
  if (days === 1) return "Yesterday"
  if (days < 7) return `${days}d ago`
  if (days < 30) return `${Math.round(days / 7)}w ago`
  return `${Math.round(days / 30)}mo ago`
}

export function tierAccent(tier: CompanyTier): {
  text: string
  border: string
  bg: string
  bar: string
  ring: string
} {
  switch (tier) {
    case "TITAN":
      return {
        text: "text-gold",
        border: "border-gold/50",
        bg: "bg-gold/10",
        bar: "bg-gold",
        ring: "shadow-[0_0_20px_-4px_rgba(251,191,36,0.4)]",
      }
    case "UNICORN":
      return {
        text: "text-neon",
        border: "border-neon/50",
        bg: "bg-neon/10",
        bar: "bg-neon",
        ring: "shadow-[0_0_20px_-4px_rgba(0,240,255,0.4)]",
      }
    case "ELITE":
      return {
        text: "text-electric",
        border: "border-electric/50",
        bg: "bg-electric/10",
        bar: "bg-electric",
        ring: "shadow-[0_0_20px_-4px_rgba(0,102,255,0.4)]",
      }
    case "QUANT":
      return {
        text: "text-ember",
        border: "border-ember/50",
        bg: "bg-ember/10",
        bar: "bg-ember",
        ring: "shadow-[0_0_20px_-4px_rgba(255,107,26,0.4)]",
      }
    case "RISING":
      return {
        text: "text-blood",
        border: "border-blood/50",
        bg: "bg-blood/10",
        bar: "bg-blood",
        ring: "shadow-[0_0_20px_-4px_rgba(255,51,85,0.4)]",
      }
    case "GLOBAL":
      return {
        text: "text-blue-mid",
        border: "border-blue-mid/50",
        bg: "bg-blue-mid/10",
        bar: "bg-blue-mid",
        ring: "shadow-[0_0_20px_-4px_rgba(30,144,255,0.4)]",
      }
  }
}
