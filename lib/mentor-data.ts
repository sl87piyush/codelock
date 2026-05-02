export type MentorId = "astra" | "rex" | "nova" | "vera"

export type Mentor = {
  id: MentorId
  name: string
  role: string
  tagline: string
  personality: string
  bestFor: string
  style: string
  traits: [string, string, string]
  avatar: string
  /** Tailwind color tokens used as accent across the UI for this mentor. */
  accent: {
    /** Primary glow color (var name without the `--` prefix, used inline). */
    color: string
    /** Tailwind utility class background tint, e.g. `bg-neon/10`. */
    bg: string
    /** Tailwind utility class for borders, e.g. `border-neon/50`. */
    border: string
    /** Tailwind utility class for text, e.g. `text-neon`. */
    text: string
    /** Hex used in CSS box-shadow inline strings. */
    hex: string
  }
  /** Mentor-specific signature daily greeting template. The user's level/goal
   *  is interpolated client-side. */
  greetingTemplate: string
}

export const MENTORS: Mentor[] = [
  {
    id: "astra",
    name: "Astra",
    role: "The Guide",
    tagline: "I will walk beside you, one step at a time.",
    personality: "Calm. Supportive. Beginner-friendly.",
    bestFor: "Users starting from zero",
    style:
      "Explains slowly, motivates daily, breaks problems into the smallest possible pieces and celebrates every win.",
    traits: ["Patient teacher", "Friendly tone", "Step-by-step"],
    avatar: "/mentors/astra.jpg",
    accent: {
      color: "neon",
      bg: "bg-neon/10",
      border: "border-neon/60",
      text: "text-neon",
      hex: "#00f0ff",
    },
    greetingTemplate:
      "We are starting clean. Today we lay one brick. Tomorrow another. In a month you will not recognise yourself.",
  },
  {
    id: "rex",
    name: "Rex",
    role: "The Drill Sergeant",
    tagline: "No excuses. Only reps.",
    personality: "Strict. Competitive. Disciplined.",
    bestFor: "Users who want rank, streaks and hard training",
    style:
      "Direct feedback, no sugar coating. Daily pressure, ruthless on missed streaks, brutal honesty on weak topics.",
    traits: ["Streak enforcer", "Brutal feedback", "Rank-driven"],
    avatar: "/mentors/rex.jpg",
    accent: {
      color: "ember",
      bg: "bg-ember/10",
      border: "border-ember/60",
      text: "text-ember",
      hex: "#ff6b1a",
    },
    greetingTemplate:
      "Your competition is already grinding. You think medium is hard? Medium is the floor. Get in the arena.",
  },
  {
    id: "nova",
    name: "Nova",
    role: "The Architect",
    tagline: "Build the system. The wins follow.",
    personality: "Strategic. Logical. Roadmap-focused.",
    bestFor: "Backend, full-stack and systematic learners",
    style:
      "Designs structured 7/30/90-day plans, focuses on first-principles fundamentals, tracks coverage of every pattern.",
    traits: ["Plan-driven", "Pattern coverage", "First principles"],
    avatar: "/mentors/nova.jpg",
    accent: {
      color: "electric",
      bg: "bg-electric/15",
      border: "border-electric/60",
      text: "text-blue-mid",
      hex: "#0066ff",
    },
    greetingTemplate:
      "We optimise for compound progress. Every topic becomes a node, every node becomes a graph, the graph becomes mastery.",
  },
  {
    id: "vera",
    name: "Vera",
    role: "The Interviewer",
    tagline: "Code is half the battle. Communication wins it.",
    personality: "Interview-focused. Communication-heavy.",
    bestFor: "Placement and interview prep",
    style:
      "Forces you to explain your approach out loud, drills behavioural + system-design + DSA in mock format.",
    traits: ["Mock interviews", "Talk-through-code", "Hire-grade rubric"],
    avatar: "/mentors/vera.jpg",
    accent: {
      color: "gold",
      bg: "bg-gold/10",
      border: "border-gold/60",
      text: "text-gold",
      hex: "#fbbf24",
    },
    greetingTemplate:
      "Walk me through your thought process. Out loud. Every assumption, every trade-off. The interviewer sees the path, not just the answer.",
  },
]

export function getMentor(id: MentorId | null | undefined): Mentor {
  return MENTORS.find((m) => m.id === id) ?? MENTORS[0]
}

// ---------------------------------------------------------------------------
// Onboarding question schema
// ---------------------------------------------------------------------------

export type QuestionKey = "level" | "goal" | "time" | "language" | "stack"

export type QuestionOption = {
  value: string
  label: string
  hint?: string
}

export type Question = {
  key: QuestionKey
  prompt: string
  helper: string
  options: QuestionOption[]
}

export const QUESTIONS: Question[] = [
  {
    key: "level",
    prompt: "What is your current coding level?",
    helper: "Be honest — your mentor will calibrate from here.",
    options: [
      { value: "zero", label: "I am starting from zero", hint: "No code written yet" },
      { value: "basics", label: "I know the basics", hint: "Loops, conditions, arrays" },
      { value: "easy", label: "I can solve easy problems", hint: "LeetCode Easy is comfortable" },
      { value: "medium", label: "I can solve medium problems", hint: "Hash maps, recursion, DP" },
    ],
  },
  {
    key: "goal",
    prompt: "What is your main goal?",
    helper: "Pick the outcome that matters most for the next 90 days.",
    options: [
      { value: "internship", label: "Crack an internship" },
      { value: "job", label: "Get a software job" },
      { value: "dsa", label: "Master DSA" },
      { value: "backend", label: "Become a backend developer" },
      { value: "frontend", label: "Become a frontend developer" },
      { value: "product", label: "Prepare for product companies" },
      { value: "cp", label: "Competitive programming" },
      { value: "switch", label: "Switch from a non-tech career" },
    ],
  },
  {
    key: "time",
    prompt: "How much time can you give daily?",
    helper: "Realistic beats heroic. We will hold you to it.",
    options: [
      { value: "15", label: "15 minutes", hint: "Micro-mission mode" },
      { value: "30", label: "30 minutes", hint: "Steady builder" },
      { value: "60", label: "1 hour", hint: "Recommended" },
      { value: "120", label: "2+ hours", hint: "Beast mode" },
    ],
  },
  {
    key: "language",
    prompt: "What guidance language do you prefer?",
    helper: "Your mentor will speak in this language.",
    options: [
      { value: "english", label: "English" },
      { value: "hinglish", label: "Hinglish" },
      { value: "hindi", label: "Hindi" },
    ],
  },
  {
    key: "stack",
    prompt: "Which programming language do you want to use?",
    helper: "Your problems and solutions will default to this.",
    options: [
      { value: "javascript", label: "JavaScript" },
      { value: "typescript", label: "TypeScript" },
      { value: "python", label: "Python" },
      { value: "java", label: "Java" },
      { value: "cpp", label: "C++" },
    ],
  },
]

// ---------------------------------------------------------------------------
// Personalised journey generator (deterministic, runs client-side)
// ---------------------------------------------------------------------------

export type OnboardingAnswers = Partial<Record<QuestionKey, string>>

export type PersonalJourney = {
  mentorId: MentorId
  goalLabel: string
  pathName: string
  pathSummary: string
  dailyMinutes: number
  language: string
  stack: string
  weeklyTopics: string[]
  firstMission: {
    code: string
    title: string
    summary: string
    tasks: string[]
    xp: number
  }
}

const GOAL_LABELS: Record<string, string> = {
  internship: "Crack an internship",
  job: "Get a software job",
  dsa: "Master DSA",
  backend: "Become a backend developer",
  frontend: "Become a frontend developer",
  product: "Prepare for product companies",
  cp: "Competitive programming",
  switch: "Switch from a non-tech career",
}

const STACK_LABELS: Record<string, string> = {
  javascript: "JavaScript",
  typescript: "TypeScript",
  python: "Python",
  java: "Java",
  cpp: "C++",
}

const LANG_LABELS: Record<string, string> = {
  english: "English",
  hinglish: "Hinglish",
  hindi: "Hindi",
}

export function buildJourney(
  mentorId: MentorId,
  answers: OnboardingAnswers,
): PersonalJourney {
  const level = answers.level ?? "zero"
  const goal = answers.goal ?? "dsa"
  const time = parseInt(answers.time ?? "60", 10)
  const language = answers.language ?? "english"
  const stack = answers.stack ?? "javascript"

  // Path is chosen by goal, but content depth flexes with level.
  let pathName = "DSA Foundations"
  let pathSummary = "Arrays, Hashing, Two Pointers, Stacks, Recursion, Trees, Graphs, DP."
  let weeklyTopics: string[] = [
    "Arrays & Hashing",
    "Two Pointers",
    "Sliding Window",
    "Stacks",
    "Binary Search",
    "Linked Lists",
    "Trees",
  ]

  if (goal === "frontend") {
    pathName = "Frontend Mastery Track"
    pathSummary = "JS deep-dive, DOM, React patterns, state, performance and system design for UI."
    weeklyTopics = [
      "JS Fundamentals",
      "Async & Event Loop",
      "DOM & Rendering",
      "React Patterns",
      "State Management",
      "Performance",
      "Frontend System Design",
    ]
  } else if (goal === "backend") {
    pathName = "Backend Engineering Track"
    pathSummary = "Data structures, databases, system design, APIs and concurrency."
    weeklyTopics = [
      "Core DSA",
      "SQL & Indexing",
      "REST & Auth",
      "Caching",
      "Queues & Workers",
      "Distributed Basics",
      "System Design",
    ]
  } else if (goal === "product") {
    pathName = "Product-Company Sprint"
    pathSummary = "Top-150 patterns, behavioural prep, system design rounds, mock interviews."
    weeklyTopics = [
      "Top Patterns I",
      "Top Patterns II",
      "Graphs & DP",
      "LLD / OOP",
      "HLD / System Design",
      "Behavioural",
      "Mock Loops",
    ]
  } else if (goal === "cp") {
    pathName = "Competitive Forge"
    pathSummary = "Number theory, greedy, advanced graphs, DP on trees, segment trees."
    weeklyTopics = [
      "Greedy",
      "Number Theory",
      "Graphs Adv",
      "DP on Trees",
      "Segment Trees",
      "Bitmask DP",
      "Contest Reps",
    ]
  } else if (goal === "internship") {
    pathName = "Internship Launchpad"
    pathSummary = "Easy → Medium ramp, projects, resume, OA practice and 1 mock per week."
    weeklyTopics = [
      "Arrays & Hashing",
      "Sliding Window",
      "Trees & BST",
      "Graphs Basic",
      "Project Sprint",
      "OA Drills",
      "Mock Round",
    ]
  }

  // First mission flexes with level.
  const isZero = level === "zero" || level === "basics"
  const firstMission = isZero
    ? {
        code: "MSN-001",
        title: "Mission 001 — Lay Your Foundation",
        summary:
          "Your first checkpoint. We touch the most-asked pattern in the universe and prove you can ship a single problem end-to-end.",
        tasks: [
          "Read: Arrays & Hashing — what they are and when to reach for them",
          `Solve 1 beginner problem in ${STACK_LABELS[stack]} (Two Sum or Contains Duplicate)`,
          "Write a 2-line plain-English explanation of your solution",
          "Earn 30 XP and unlock Mission 002",
        ],
        xp: 30,
      }
    : {
        code: "MSN-001",
        title: "Mission 001 — Calibration Sprint",
        summary:
          "We benchmark your real level so the path adapts. Three problems, escalating, timed.",
        tasks: [
          `Solve 1 Easy in ${STACK_LABELS[stack]} under 8 minutes`,
          "Solve 1 Medium with full explanation written in your own words",
          "Tag your weakest topic — your mentor uses this for week 1",
          "Earn 50 XP and unlock your week-1 plan",
        ],
        xp: 50,
      }

  return {
    mentorId,
    goalLabel: GOAL_LABELS[goal] ?? goal,
    pathName,
    pathSummary,
    dailyMinutes: time,
    language: LANG_LABELS[language] ?? language,
    stack: STACK_LABELS[stack] ?? stack,
    weeklyTopics,
    firstMission,
  }
}
