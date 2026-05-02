export type Verdict = "AC" | "WA" | "TLE" | "RE" | "PENDING"

export type TestCase = {
  id: string
  input: string
  expected: string
  actual?: string
  status: Verdict
  runtimeMs?: number
  memoryKb?: number
  hidden?: boolean
}

export type Submission = {
  id: string
  time: string
  lang: string
  verdict: Verdict
  passed: number
  total: number
  runtimeMs?: number
  memoryKb?: number
}

export type OpponentSnapshot = {
  handle: string
  status: "CODING" | "COMPILING" | "DEBUGGING" | "CLEARED" | "STUCK"
  progress: number // 0..100
  testsPassed: number
  testsTotal: number
  submissions: number
  lastAction: string
  tone: "neon" | "ember" | "gold"
}

export const PROBLEM = {
  id: "P-014",
  title: "Longest Synchronized Subarray",
  difficulty: "HARD",
  acceptance: 27.4,
  score: 850,
  stake: 28,
  topics: ["Dynamic Programming", "Two Pointers", "Sliding Window"],
  constraints: [
    { k: "N", v: "≤ 10⁵" },
    { k: "TIME", v: "2.0 s" },
    { k: "MEMORY", v: "256 MB" },
  ],
  statement: [
    "Given two integer arrays A and B of equal length N, find the length of the longest contiguous subarray in which A and B are simultaneously non-decreasing.",
    "A subarray [l, r] is synchronized if for every l ≤ i < r, A[i] ≤ A[i+1] AND B[i] ≤ B[i+1].",
    "Return the maximum length over all valid subarrays.",
  ],
  examples: [
    {
      input: "A = [1, 3, 5, 4, 7]\nB = [2, 2, 3, 1, 9]",
      output: "3",
      explanation:
        "The subarray [1, 3, 5] of A with [2, 2, 3] of B is synchronized. Length = 3.",
    },
    {
      input: "A = [5, 4, 3, 2, 1]\nB = [1, 2, 3, 4, 5]",
      output: "1",
      explanation:
        "No pair of adjacent indices satisfies the condition, so the answer is 1.",
    },
  ],
  hints: [
    "Define dp[i] = length of synchronized subarray ending at i.",
    "Transition: dp[i] = dp[i-1] + 1 if both A[i-1] ≤ A[i] and B[i-1] ≤ B[i], else 1.",
    "Two-pointer formulation also works — shrink left on violation.",
  ],
}

export const TEST_CASES: TestCase[] = [
  {
    id: "T1",
    input: "A = [1, 3, 5, 4, 7]\nB = [2, 2, 3, 1, 9]",
    expected: "3",
    actual: "3",
    status: "AC",
    runtimeMs: 14,
    memoryKb: 8120,
  },
  {
    id: "T2",
    input: "A = [5, 4, 3, 2, 1]\nB = [1, 2, 3, 4, 5]",
    expected: "1",
    actual: "1",
    status: "AC",
    runtimeMs: 11,
    memoryKb: 7840,
  },
  {
    id: "T3",
    input: "A = [2, 2, 2, 2]\nB = [1, 1, 1, 1]",
    expected: "4",
    actual: "4",
    status: "AC",
    runtimeMs: 9,
    memoryKb: 7612,
  },
  {
    id: "T4",
    input: "Large sequence (N=10⁵, random, seed=42)",
    expected: "42318",
    actual: "42318",
    status: "AC",
    runtimeMs: 188,
    memoryKb: 12480,
  },
  {
    id: "T5",
    input: "Hidden — edge / stress",
    expected: "—",
    status: "PENDING",
    hidden: true,
  },
]

export const SUBMISSIONS: Submission[] = [
  {
    id: "S-04",
    time: "00:41",
    lang: "PY",
    verdict: "AC",
    passed: 4,
    total: 4,
    runtimeMs: 188,
    memoryKb: 12480,
  },
  {
    id: "S-03",
    time: "01:12",
    lang: "PY",
    verdict: "WA",
    passed: 3,
    total: 5,
  },
  {
    id: "S-02",
    time: "02:48",
    lang: "PY",
    verdict: "TLE",
    passed: 2,
    total: 5,
  },
  {
    id: "S-01",
    time: "04:05",
    lang: "PY",
    verdict: "RE",
    passed: 0,
    total: 5,
  },
]

export const OPPONENTS: OpponentSnapshot[] = [
  {
    handle: "isagi_y",
    status: "CODING",
    progress: 68,
    testsPassed: 3,
    testsTotal: 5,
    submissions: 2,
    lastAction: "Wrote `for i in range`",
    tone: "ember",
  },
  {
    handle: "bachira_m",
    status: "DEBUGGING",
    progress: 42,
    testsPassed: 1,
    testsTotal: 5,
    submissions: 3,
    lastAction: "Runtime error on T4",
    tone: "ember",
  },
]

export const TEAMMATE: OpponentSnapshot = {
  handle: "rin_itoshi",
  status: "CODING",
  progress: 74,
  testsPassed: 3,
  testsTotal: 5,
  submissions: 1,
  lastAction: "Running tests",
  tone: "neon",
}

export const LANGUAGES = [
  { id: "py", label: "Python 3.11", ext: "py" },
  { id: "cpp", label: "C++ 20", ext: "cpp" },
  { id: "java", label: "Java 17", ext: "java" },
  { id: "go", label: "Go 1.22", ext: "go" },
  { id: "rs", label: "Rust 1.78", ext: "rs" },
  { id: "ts", label: "TypeScript", ext: "ts" },
]

// Tokenized code lines for the syntax-highlighted editor
export type Token = {
  t: "kw" | "str" | "num" | "com" | "fn" | "op" | "var" | "ws" | "dec" | "cls"
  v: string
}
export type Line = Token[]

// A "mid-typing" Python solution (current player's work-in-progress).
export const CODE_LINES: Line[] = [
  [
    { t: "com", v: "# Longest Synchronized Subarray" },
  ],
  [
    { t: "com", v: "# approach: dp in O(N), extend while both arrays non-decreasing" },
  ],
  [],
  [
    { t: "kw", v: "from" },
    { t: "ws", v: " " },
    { t: "var", v: "typing" },
    { t: "ws", v: " " },
    { t: "kw", v: "import" },
    { t: "ws", v: " " },
    { t: "cls", v: "List" },
  ],
  [],
  [
    { t: "kw", v: "class" },
    { t: "ws", v: " " },
    { t: "cls", v: "Solution" },
    { t: "op", v: ":" },
  ],
  [
    { t: "ws", v: "    " },
    { t: "kw", v: "def" },
    { t: "ws", v: " " },
    { t: "fn", v: "longest_sync" },
    { t: "op", v: "(" },
    { t: "var", v: "self" },
    { t: "op", v: "," },
    { t: "ws", v: " " },
    { t: "var", v: "A" },
    { t: "op", v: ":" },
    { t: "ws", v: " " },
    { t: "cls", v: "List" },
    { t: "op", v: "[" },
    { t: "cls", v: "int" },
    { t: "op", v: "]," },
    { t: "ws", v: " " },
    { t: "var", v: "B" },
    { t: "op", v: ":" },
    { t: "ws", v: " " },
    { t: "cls", v: "List" },
    { t: "op", v: "[" },
    { t: "cls", v: "int" },
    { t: "op", v: "])" },
    { t: "ws", v: " " },
    { t: "op", v: "->" },
    { t: "ws", v: " " },
    { t: "cls", v: "int" },
    { t: "op", v: ":" },
  ],
  [
    { t: "ws", v: "        " },
    { t: "var", v: "n" },
    { t: "ws", v: " " },
    { t: "op", v: "=" },
    { t: "ws", v: " " },
    { t: "fn", v: "len" },
    { t: "op", v: "(" },
    { t: "var", v: "A" },
    { t: "op", v: ")" },
  ],
  [
    { t: "ws", v: "        " },
    { t: "kw", v: "if" },
    { t: "ws", v: " " },
    { t: "var", v: "n" },
    { t: "ws", v: " " },
    { t: "op", v: "==" },
    { t: "ws", v: " " },
    { t: "num", v: "0" },
    { t: "op", v: ":" },
  ],
  [
    { t: "ws", v: "            " },
    { t: "kw", v: "return" },
    { t: "ws", v: " " },
    { t: "num", v: "0" },
  ],
  [],
  [
    { t: "ws", v: "        " },
    { t: "var", v: "best" },
    { t: "ws", v: " " },
    { t: "op", v: "=" },
    { t: "ws", v: " " },
    { t: "var", v: "cur" },
    { t: "ws", v: " " },
    { t: "op", v: "=" },
    { t: "ws", v: " " },
    { t: "num", v: "1" },
  ],
  [
    { t: "ws", v: "        " },
    { t: "kw", v: "for" },
    { t: "ws", v: " " },
    { t: "var", v: "i" },
    { t: "ws", v: " " },
    { t: "kw", v: "in" },
    { t: "ws", v: " " },
    { t: "fn", v: "range" },
    { t: "op", v: "(" },
    { t: "num", v: "1" },
    { t: "op", v: "," },
    { t: "ws", v: " " },
    { t: "var", v: "n" },
    { t: "op", v: "):" },
  ],
  [
    { t: "ws", v: "            " },
    { t: "kw", v: "if" },
    { t: "ws", v: " " },
    { t: "var", v: "A" },
    { t: "op", v: "[" },
    { t: "var", v: "i" },
    { t: "op", v: " - " },
    { t: "num", v: "1" },
    { t: "op", v: "]" },
    { t: "ws", v: " " },
    { t: "op", v: "<=" },
    { t: "ws", v: " " },
    { t: "var", v: "A" },
    { t: "op", v: "[" },
    { t: "var", v: "i" },
    { t: "op", v: "]" },
    { t: "ws", v: " " },
    { t: "kw", v: "and" },
    { t: "ws", v: " " },
    { t: "var", v: "B" },
    { t: "op", v: "[" },
    { t: "var", v: "i" },
    { t: "op", v: " - " },
    { t: "num", v: "1" },
    { t: "op", v: "]" },
    { t: "ws", v: " " },
    { t: "op", v: "<=" },
    { t: "ws", v: " " },
    { t: "var", v: "B" },
    { t: "op", v: "[" },
    { t: "var", v: "i" },
    { t: "op", v: "]:" },
  ],
  [
    { t: "ws", v: "                " },
    { t: "var", v: "cur" },
    { t: "ws", v: " " },
    { t: "op", v: "+=" },
    { t: "ws", v: " " },
    { t: "num", v: "1" },
  ],
  [
    { t: "ws", v: "            " },
    { t: "kw", v: "else" },
    { t: "op", v: ":" },
  ],
  [
    { t: "ws", v: "                " },
    { t: "var", v: "cur" },
    { t: "ws", v: " " },
    { t: "op", v: "=" },
    { t: "ws", v: " " },
    { t: "num", v: "1" },
  ],
  [
    { t: "ws", v: "            " },
    { t: "var", v: "best" },
    { t: "ws", v: " " },
    { t: "op", v: "=" },
    { t: "ws", v: " " },
    { t: "fn", v: "max" },
    { t: "op", v: "(" },
    { t: "var", v: "best" },
    { t: "op", v: "," },
    { t: "ws", v: " " },
    { t: "var", v: "cur" },
    { t: "op", v: ")" },
  ],
  [
    { t: "ws", v: "        " },
    { t: "kw", v: "return" },
    { t: "ws", v: " " },
    { t: "var", v: "best" },
  ],
  [],
  [
    { t: "com", v: "# TODO: handle edge when N is extremely large — verify cache locality" },
  ],
]
