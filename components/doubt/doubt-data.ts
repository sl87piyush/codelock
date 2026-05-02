export type DoubtStatus = "OPEN" | "RESOLVED" | "BOUNTY"
export type Difficulty = "EASY" | "MEDIUM" | "HARD" | "EXPERT"

export type Author = {
  username: string
  handle: string
  initial: string
  division: "BRONZE" | "SILVER" | "GOLD" | "PLATINUM" | "DIAMOND"
  avatarTone: "neon" | "ember" | "gold" | "electric" | "blood"
}

export type Answer = {
  id: string
  author: Author
  body: string
  code?: string
  language?: string
  upvotes: number
  isAccepted: boolean
  postedAt: string
  comments: number
}

export type Doubt = {
  id: string
  title: string
  body: string
  code?: string
  language?: string
  status: DoubtStatus
  difficulty: Difficulty
  topic: string
  tags: string[]
  author: Author
  postedAt: string
  upvotes: number
  views: number
  answers: Answer[]
  bounty?: number
  isHot?: boolean
}

export const TOPICS = [
  { id: "all", label: "ALL", count: 1284 },
  { id: "arrays", label: "ARRAYS", count: 312 },
  { id: "dp", label: "DYNAMIC PROGRAMMING", count: 198 },
  { id: "graphs", label: "GRAPHS", count: 154 },
  { id: "trees", label: "TREES", count: 142 },
  { id: "strings", label: "STRINGS", count: 121 },
  { id: "system-design", label: "SYSTEM DESIGN", count: 89 },
  { id: "sql", label: "SQL", count: 76 },
  { id: "concurrency", label: "CONCURRENCY", count: 54 },
] as const

export type TopicId = (typeof TOPICS)[number]["id"]

export const SORT_OPTIONS = [
  { id: "trending", label: "TRENDING", sub: "Hot right now" },
  { id: "newest", label: "NEWEST", sub: "Latest first" },
  { id: "votes", label: "MOST VOTED", sub: "Top scored" },
  { id: "unanswered", label: "UNANSWERED", sub: "Need help" },
] as const

export type SortId = (typeof SORT_OPTIONS)[number]["id"]

export const STATUS_FILTERS = [
  { id: "all", label: "ALL" },
  { id: "open", label: "OPEN" },
  { id: "resolved", label: "RESOLVED" },
  { id: "bounty", label: "BOUNTY" },
] as const

export type StatusFilterId = (typeof STATUS_FILTERS)[number]["id"]

const AUTHORS: Author[] = [
  { username: "isagi_y", handle: "isagi_y", initial: "I", division: "DIAMOND", avatarTone: "neon" },
  { username: "kaiser_n", handle: "kaiser_n", initial: "K", division: "DIAMOND", avatarTone: "ember" },
  { username: "bachira_m", handle: "bachira_m", initial: "B", division: "PLATINUM", avatarTone: "electric" },
  { username: "rin_itoshi", handle: "rin_itoshi", initial: "R", division: "DIAMOND", avatarTone: "blood" },
  { username: "chigiri_h", handle: "chigiri_h", initial: "C", division: "PLATINUM", avatarTone: "gold" },
  { username: "nagi_s", handle: "nagi_s", initial: "N", division: "GOLD", avatarTone: "neon" },
  { username: "barou_s", handle: "barou_s", initial: "B", division: "DIAMOND", avatarTone: "ember" },
  { username: "tonystark", handle: "tonystark", initial: "t", division: "BRONZE", avatarTone: "neon" },
  { username: "reo_m", handle: "reo_m", initial: "R", division: "GOLD", avatarTone: "electric" },
  { username: "yuki_k", handle: "yuki_k", initial: "Y", division: "SILVER", avatarTone: "gold" },
] as const

export const DOUBTS: Doubt[] = [
  {
    id: "DB-A001",
    title: "Why does my sliding window TLE on n = 10^6 even with O(n)?",
    body: "I'm solving 'Longest Substring Without Repeating Characters' with a hashmap-based sliding window. Logic is O(n), but it consistently TLEs on the largest test case. I suspect it's the hashmap rehashing cost in the worst case. Has anyone faced this?",
    code: `def lengthOfLongestSubstring(s: str) -> int:
    last = {}
    start = 0
    best = 0
    for i, ch in enumerate(s):
        if ch in last and last[ch] >= start:
            start = last[ch] + 1
        last[ch] = i
        best = max(best, i - start + 1)
    return best`,
    language: "python",
    status: "OPEN",
    difficulty: "MEDIUM",
    topic: "strings",
    tags: ["sliding-window", "hashmap", "TLE"],
    author: AUTHORS[0],
    postedAt: "12m",
    upvotes: 47,
    views: 213,
    answers: [
      {
        id: "AN-001",
        author: AUTHORS[1],
        body: "Python dicts are heavy. Swap to a fixed-size array of length 256 indexed by ord(ch). I cut runtime from 1180ms to 340ms with this single change.",
        code: `def lengthOfLongestSubstring(s: str) -> int:
    last = [-1] * 256
    start = 0
    best = 0
    for i, ch in enumerate(s):
        c = ord(ch)
        if last[c] >= start:
            start = last[c] + 1
        last[c] = i
        best = max(best, i - start + 1)
    return best`,
        language: "python",
        upvotes: 32,
        isAccepted: true,
        postedAt: "8m",
        comments: 4,
      },
      {
        id: "AN-002",
        author: AUTHORS[3],
        body: "Also worth checking: are you reading input with input() inside a tight loop? sys.stdin.read() can save 100-300ms on large I/O.",
        upvotes: 11,
        isAccepted: false,
        postedAt: "5m",
        comments: 1,
      },
    ],
    bounty: 50,
    isHot: true,
  },
  {
    id: "DB-A002",
    title: "Bellman-Ford vs Dijkstra: when is BF actually worth it in interviews?",
    body: "Every solution I've seen for shortest path interviews uses Dijkstra + heap. When does Bellman-Ford actually come up? Negative weights are the obvious case but I want to know what real interviewers ask.",
    status: "RESOLVED",
    difficulty: "HARD",
    topic: "graphs",
    tags: ["shortest-path", "interview-prep"],
    author: AUTHORS[2],
    postedAt: "1h",
    upvotes: 84,
    views: 612,
    answers: [
      {
        id: "AN-003",
        author: AUTHORS[6],
        body: "Currency arbitrage detection (negative cycles), and any 'k-stops' constraint where you need to bound the number of edges. Both showed up in my Citadel onsite.",
        upvotes: 56,
        isAccepted: true,
        postedAt: "55m",
        comments: 7,
      },
    ],
  },
  {
    id: "DB-A003",
    title: "How do I prove correctness of a greedy algorithm under time pressure?",
    body: "I keep failing the 'prove it' follow-up after a greedy solution. Exchange argument and induction both feel hand-wavy in 3 minutes. Any concrete templates?",
    status: "OPEN",
    difficulty: "EXPERT",
    topic: "dp",
    tags: ["greedy", "proof", "interview-prep"],
    author: AUTHORS[4],
    postedAt: "3h",
    upvotes: 129,
    views: 1402,
    answers: [
      {
        id: "AN-004",
        author: AUTHORS[1],
        body: "Two-step template: (1) state the optimal-substructure claim explicitly, (2) exchange argument: assume an optimal solution differs from greedy at the first step, swap to greedy's choice, show objective doesn't decrease. Practice it on Activity Selection until it's muscle memory.",
        upvotes: 92,
        isAccepted: false,
        postedAt: "2h",
        comments: 12,
      },
      {
        id: "AN-005",
        author: AUTHORS[5],
        body: "I write the loop invariant first, then the exchange. Interviewers love seeing 'after iteration k, the partial solution is a prefix of some optimal solution'.",
        upvotes: 41,
        isAccepted: false,
        postedAt: "1h",
        comments: 3,
      },
    ],
    bounty: 100,
    isHot: true,
  },
  {
    id: "DB-A004",
    title: "Why does memoizing this LIS solution still fail?",
    body: "I converted my recursion to top-down DP but it's still O(n^2 * 2^n) somehow. I think my memo key is wrong because prev_index is a true index, not a value.",
    code: `def lis(nums):
    memo = {}
    def solve(i, prev):
        if i == len(nums): return 0
        if (i, prev) in memo: return memo[(i, prev)]
        take = 0
        if prev == -1 or nums[i] > nums[prev]:
            take = 1 + solve(i + 1, i)
        skip = solve(i + 1, prev)
        memo[(i, prev)] = max(take, skip)
        return memo[(i, prev)]
    return solve(0, -1)`,
    language: "python",
    status: "OPEN",
    difficulty: "MEDIUM",
    topic: "dp",
    tags: ["memoization", "LIS", "recursion"],
    author: AUTHORS[7],
    postedAt: "5h",
    upvotes: 18,
    views: 89,
    answers: [],
  },
  {
    id: "DB-A005",
    title: "System design: design a real-time leaderboard for 10M concurrent users",
    body: "I keep saying 'Redis sorted sets' but the interviewer pushed on consistency, sharding, and tail latency. What are the real tradeoffs at 10M scale?",
    status: "BOUNTY",
    difficulty: "EXPERT",
    topic: "system-design",
    tags: ["redis", "sharding", "real-time"],
    author: AUTHORS[8],
    postedAt: "8h",
    upvotes: 211,
    views: 3204,
    answers: [
      {
        id: "AN-006",
        author: AUTHORS[6],
        body: "Shard by region for write locality, then aggregate top-K per shard into a global ZSET asynchronously. Use Lua scripts for atomic increment-and-fetch. Tail latency is your real enemy: pin Redis cluster CPUs and use RDMA if you can.",
        upvotes: 104,
        isAccepted: false,
        postedAt: "6h",
        comments: 18,
      },
    ],
    bounty: 250,
    isHot: true,
  },
  {
    id: "DB-A006",
    title: "Quickest way to detect cycle in a linked list — Floyd's vs hashing?",
    body: "I know Floyd's is O(1) space but in practice does it actually beat hashing on cache-friendly inputs?",
    status: "RESOLVED",
    difficulty: "EASY",
    topic: "trees",
    tags: ["linked-list", "two-pointers"],
    author: AUTHORS[9],
    postedAt: "12h",
    upvotes: 24,
    views: 178,
    answers: [
      {
        id: "AN-007",
        author: AUTHORS[0],
        body: "On modern CPUs hashing is faster for n < 10^4 because the set fits in L2. Floyd's wins for huge or memory-pressured inputs. Always say both and pick based on constraints.",
        upvotes: 19,
        isAccepted: true,
        postedAt: "11h",
        comments: 2,
      },
    ],
  },
  {
    id: "DB-A007",
    title: "Confused about when to use Segment Tree vs Fenwick Tree",
    body: "Both do range queries in O(log n). I default to Fenwick for sums and Segment for everything else, but is there a cleaner heuristic?",
    status: "OPEN",
    difficulty: "HARD",
    topic: "trees",
    tags: ["segment-tree", "BIT", "range-query"],
    author: AUTHORS[3],
    postedAt: "1d",
    upvotes: 67,
    views: 503,
    answers: [
      {
        id: "AN-008",
        author: AUTHORS[1],
        body: "Fenwick: invertible monoid (sum, xor). Segment: any associative op (min, max, gcd, matrix). If you need lazy propagation, segment tree is the only option.",
        upvotes: 51,
        isAccepted: false,
        postedAt: "20h",
        comments: 5,
      },
    ],
  },
  {
    id: "DB-A008",
    title: "SQL: efficient way to compute moving average over the last 7 days per user",
    body: "Window functions feel right but my query plan does a full scan. Is there an index pattern that actually helps with PARTITION BY user_id ORDER BY date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW?",
    status: "OPEN",
    difficulty: "MEDIUM",
    topic: "sql",
    tags: ["window-functions", "performance", "indexing"],
    author: AUTHORS[5],
    postedAt: "1d",
    upvotes: 38,
    views: 256,
    answers: [],
  },
  {
    id: "DB-A009",
    title: "Concurrency: producer-consumer with bounded buffer in Go vs Java",
    body: "Trying to wrap my head around channels vs ArrayBlockingQueue. They feel similar but the failure modes differ a lot. When does each lose?",
    status: "OPEN",
    difficulty: "HARD",
    topic: "concurrency",
    tags: ["channels", "blocking-queue", "go", "java"],
    author: AUTHORS[2],
    postedAt: "2d",
    upvotes: 29,
    views: 192,
    answers: [
      {
        id: "AN-009",
        author: AUTHORS[6],
        body: "Channels favor cooperative cancellation (close() propagates). ArrayBlockingQueue gives you precise capacity control and timed offers/polls — better for backpressure-sensitive systems.",
        upvotes: 14,
        isAccepted: false,
        postedAt: "1d",
        comments: 2,
      },
    ],
  },
  {
    id: "DB-A010",
    title: "When can I early-exit from a backtracking search?",
    body: "My N-Queens is correct but slow. I prune by column/diagonal but it still explores too much. What pruning patterns actually help?",
    status: "RESOLVED",
    difficulty: "MEDIUM",
    topic: "dp",
    tags: ["backtracking", "n-queens", "pruning"],
    author: AUTHORS[4],
    postedAt: "3d",
    upvotes: 22,
    views: 145,
    answers: [
      {
        id: "AN-010",
        author: AUTHORS[1],
        body: "Bitmask the column/diagonal sets. State fits in three integers and conflict checks are O(1). Cuts wall time by ~10x on N=14.",
        upvotes: 20,
        isAccepted: true,
        postedAt: "2d",
        comments: 1,
      },
    ],
  },
  {
    id: "DB-A011",
    title: "Heap-based scheduler: how to handle ties in priority deterministically?",
    body: "When two tasks have the same priority, I want FIFO order, but Python's heapq breaks ties by comparing the payload. Adding a counter feels hacky.",
    status: "OPEN",
    difficulty: "EASY",
    topic: "trees",
    tags: ["heap", "scheduler", "python"],
    author: AUTHORS[8],
    postedAt: "4d",
    upvotes: 9,
    views: 71,
    answers: [],
  },
  {
    id: "DB-A012",
    title: "Two-pointer template for 'sum closest to target' — generic version?",
    body: "I always reach for two-pointer on sorted arrays but I forget the exact 'update-when-closer' logic. Anyone have a reusable template?",
    status: "RESOLVED",
    difficulty: "EASY",
    topic: "arrays",
    tags: ["two-pointers", "template"],
    author: AUTHORS[9],
    postedAt: "5d",
    upvotes: 51,
    views: 387,
    answers: [
      {
        id: "AN-011",
        author: AUTHORS[0],
        body: "Sort, two pointers from both ends. Track best = inf, update when |sum - target| < |best - target|. Move left if sum < target else right. Always handle ties by preferring smaller indices to make output deterministic.",
        upvotes: 45,
        isAccepted: true,
        postedAt: "5d",
        comments: 3,
      },
    ],
  },
]

export const TRENDING_TOPICS = [
  { id: "dp", label: "Dynamic Programming", count: 198, delta: "+24" },
  { id: "system-design", label: "System Design", count: 89, delta: "+18" },
  { id: "graphs", label: "Graphs", count: 154, delta: "+12" },
  { id: "concurrency", label: "Concurrency", count: 54, delta: "+9" },
  { id: "sql", label: "SQL", count: 76, delta: "+7" },
] as const

export const TOP_HELPERS = [
  {
    rank: 1,
    username: "kaiser_n",
    initial: "K",
    division: "DIAMOND",
    accepted: 142,
    rep: "12.4k",
    avatarTone: "ember" as const,
  },
  {
    rank: 2,
    username: "isagi_y",
    initial: "I",
    division: "DIAMOND",
    accepted: 118,
    rep: "10.1k",
    avatarTone: "neon" as const,
  },
  {
    rank: 3,
    username: "barou_s",
    initial: "B",
    division: "DIAMOND",
    accepted: 97,
    rep: "8.7k",
    avatarTone: "ember" as const,
  },
  {
    rank: 4,
    username: "rin_itoshi",
    initial: "R",
    division: "DIAMOND",
    accepted: 84,
    rep: "7.2k",
    avatarTone: "blood" as const,
  },
  {
    rank: 5,
    username: "chigiri_h",
    initial: "C",
    division: "PLATINUM",
    accepted: 71,
    rep: "5.8k",
    avatarTone: "gold" as const,
  },
] as const

export const YOUR_DOUBT_STATS = {
  asked: 12,
  resolved: 8,
  reputation: 340,
  helperRank: "—",
  bounty: 50,
}
