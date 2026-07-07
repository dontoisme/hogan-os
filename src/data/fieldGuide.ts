// The Field Guide — a naturalist's catalog of every project ever spotted in
// the wild of ~/Projects. Each repo is a specimen: classified, dated, and
// annotated with field notes. Generated from a survey of the actual
// directories (commit dates and file counts are real).

export type SpecimenStatus = 'thriving' | 'stable' | 'dormant' | 'fossil' | 'rare';

export type SpecimenClass =
  | 'product'
  | 'tool'
  | 'ai'
  | 'game'
  | 'knowledge'
  | 'fork'
  | 'exercise';

export interface Specimen {
  id: string;
  commonName: string;
  binomial: string; // faux-Latin species name, rendered in italics
  classification: SpecimenClass;
  status: SpecimenStatus;
  summary: string; // one line for the index card
  fieldNotes: string; // the longer observation, for the detail plate
  habitat: string[]; // tech stack
  firstObserved: string; // 'YYYY-MM' from the real first commit
  lastSeen: string; // 'YYYY-MM' from the real last commit
  fileCount: number; // rough source-file count, drives size class
  range?: {
    github?: string;
    website?: string;
  };
  featured?: boolean;
}

export const statusMeta: Record<
  SpecimenStatus,
  { label: string; note: string; className: string }
> = {
  thriving: {
    label: 'Thriving',
    note: 'actively developed — approach with enthusiasm',
    className: 'bg-green-500/15 text-green-500 border-green-500/40',
  },
  stable: {
    label: 'Stable population',
    note: 'shipped and self-sustaining',
    className: 'bg-blue-500/15 text-blue-400 border-blue-500/40',
  },
  dormant: {
    label: 'Dormant',
    note: 'hibernating — may reawaken any season',
    className: 'bg-amber-500/15 text-amber-500 border-amber-500/40',
  },
  fossil: {
    label: 'Fossilized',
    note: 'preserved in the strata for the record',
    className: 'bg-zinc-500/15 text-zinc-400 border-zinc-500/40',
  },
  rare: {
    label: 'Rare sighting',
    note: 'observed once or twice, existence disputed',
    className: 'bg-purple-500/15 text-purple-400 border-purple-500/40',
  },
};

export const classMeta: Record<
  SpecimenClass,
  { label: string; genus: string; note: string }
> = {
  product: {
    label: 'Products',
    genus: 'Productus',
    note: 'apex builds — real apps for real humans',
  },
  tool: {
    label: 'Tools',
    genus: 'Utilitas',
    note: 'CLIs and utilities, mostly nocturnal',
  },
  ai: {
    label: 'AI Experiments',
    genus: 'Agentis',
    note: 'a fast-evolving genus, first observed 2024',
  },
  game: {
    label: 'Games & Play',
    genus: 'Ludus',
    note: 'built for the joy of it',
  },
  knowledge: {
    label: 'Writing & Knowledge',
    genus: 'Sapientia',
    note: 'vaults, blogs, and field journals',
  },
  fork: {
    label: 'Introduced Species',
    genus: 'Furca',
    note: 'descended from stock bred elsewhere (forks)',
  },
  exercise: {
    label: 'Exercises',
    genus: 'Exercitium',
    note: 'captive-bred for interviews and tutorials',
  },
};

// Rough source-file counts mapped to a naturalist's size classes.
export function sizeClass(fileCount: number): { label: string; note: string } {
  if (fileCount >= 400) return { label: 'Megafauna', note: '400+ source files' };
  if (fileCount >= 150) return { label: 'Large game', note: '150–399 source files' };
  if (fileCount >= 50) return { label: 'Medium mammal', note: '50–149 source files' };
  if (fileCount >= 10) return { label: 'Small critter', note: '10–49 source files' };
  return { label: 'Microfauna', note: 'under 10 source files' };
}

export function formatObserved(yyyymm: string): string {
  const [y, m] = yyyymm.split('-').map(Number);
  if (!y || !m) return yyyymm;
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];
  return `${months[m - 1]} ${y}`;
}

export const specimens: Specimen[] = [
  // ── Products ──────────────────────────────────────────────────────────
  {
    id: 'squabble-react-native',
    commonName: 'Squabble Inn',
    binomial: 'Productus squabblus',
    classification: 'product',
    status: 'thriving',
    summary:
      'Social audiobook app — leave hidden, timestamped notes on audiobooks for your friends to find.',
    fieldNotes:
      'The apex specimen of the collection. A React Native app where friends form guilds and leave hidden comments pinned to exact moments in audiobooks — like marginalia, but social. In alpha prep with TestFlight builds, Maestro end-to-end tests, and the kind of reliability engineering (92% reduction in Firestore startup chatter) that suggests the keeper intends for it to survive in the wild.',
    habitat: ['React Native', 'Expo', 'TypeScript', 'Firebase', 'Zustand', 'Maestro'],
    firstObserved: '2026-01',
    lastSeen: '2026-07',
    fileCount: 1833,
    range: { github: 'https://github.com/dontoisme/squabble-react-native' },
    featured: true,
  },
  {
    id: 'squabble-ios',
    commonName: 'Squabble (native iOS)',
    binomial: 'Productus squabblus nativus',
    classification: 'product',
    status: 'dormant',
    summary:
      'The original SwiftUI incarnation of Squabble, evolved from the open-source BookPlayer codebase.',
    fieldNotes:
      'An earlier subspecies of Squabble, native to iOS. Adapted from the open-source BookPlayer audiobook player — its git history reaches all the way back to 2016, making it the specimen with the deepest fossil record in the collection. Currently hibernating, superseded by its cross-platform cousin, but it served as the proving ground for the Darwin visual-regression tool.',
    habitat: ['Swift', 'SwiftUI', 'Firebase', 'Core Data'],
    firstObserved: '2016-07',
    lastSeen: '2026-01',
    fileCount: 585,
    range: { github: 'https://github.com/dontoisme/Squabble' },
  },
  {
    id: 'squabble-web',
    commonName: 'Squabble Web',
    binomial: 'Productus squabblus telaris',
    classification: 'product',
    status: 'fossil',
    summary: 'Web companion to Squabble Inn — since absorbed into the mobile monorepo.',
    fieldNotes:
      'A Next.js companion organism that shared Firebase Auth and Firestore with the mobile app. In July 2026 it was absorbed into the squabble-react-native monorepo (history preserved via git subtree) — a rare documented case of one specimen being swallowed whole by another, with both surviving.',
    habitat: ['Next.js', 'TypeScript', 'Firebase', 'Radix UI'],
    firstObserved: '2026-01',
    lastSeen: '2026-07',
    fileCount: 407,
    range: { github: 'https://github.com/dontoisme/squabble-web' },
  },
  {
    id: 'hogan-os',
    commonName: 'HoganOS',
    binomial: 'Productus recursivus',
    classification: 'product',
    status: 'thriving',
    summary: 'The very operating system you are standing in right now.',
    fieldNotes:
      'A self-describing specimen — you are currently inside it. A portfolio site built as a retro desktop OS: boot sequence, draggable windows, a terminal where git log renders a career as commits, a recycle bin of joke files, and a pixel-art dingo with opinions. This field guide is one of its organs, which makes reading this entry mildly recursive. The author apologizes for nothing.',
    habitat: ['Next.js 16', 'React 19', 'TypeScript', 'Framer Motion', 'Tailwind CSS'],
    firstObserved: '2026-01',
    lastSeen: '2026-07',
    fileCount: 386,
    range: { github: 'https://github.com/dontoisme/hogan-os' },
    featured: true,
  },
  {
    id: 'cleanspace-dfw',
    commonName: 'CleanSpace DFW',
    binomial: 'Productus subterraneus',
    classification: 'product',
    status: 'thriving',
    summary:
      'AI crawlspace-and-attic estimator: homeowners upload photos, Claude vision produces the estimate.',
    fieldNotes:
      'A burrowing species that lives in crawlspaces and attics. Built as a lead-generation tool for a real restoration company: homeowners or referral partners upload photos, and a vision model produces a scoped estimate server-side. Notable as a working deployment of AI for a small business that has never heard of a prompt — with Playwright end-to-end tests standing guard.',
    habitat: ['Next.js 16', 'TypeScript', 'Firebase', 'Claude API', 'Playwright'],
    firstObserved: '2026-04',
    lastSeen: '2026-06',
    fileCount: 464,
    range: { github: 'https://github.com/dontoisme/cleanspace-dfw' },
    featured: true,
  },
  {
    id: 'todobien',
    commonName: 'RestoreDoc Pro',
    binomial: 'Productus restauratus',
    classification: 'product',
    status: 'dormant',
    summary:
      'Mobile-first PWA for restoration job-site documentation — one app instead of three subscriptions.',
    fieldNotes:
      'Built for an owner-operator water/fire/mold restoration business to replace CompanyCam, Albiware, and Xactimate with a single workflow-driven app that enforces documentation standards for invoicing and lawsuit defense. A real client project with real stakes, and the parent organism that later spawned CleanSpace DFW.',
    habitat: ['React', 'Vite', 'TypeScript', 'Firebase', 'react-pdf'],
    firstObserved: '2026-01',
    lastSeen: '2026-04',
    fileCount: 108,
    range: { github: 'https://github.com/dontoisme/restoredoc-pro' },
  },
  {
    id: 'alucard',
    commonName: 'Alucard',
    binomial: 'Productus collegiatus',
    classification: 'product',
    status: 'dormant',
    summary:
      "'Carta for NIL' — compliance and fair-market-value infrastructure for college athlete deals.",
    fieldNotes:
      'A prototype pitched as the transaction and compliance layer for the $1.5B+ college NIL market, designed around the House v. NCAA settlement cap and fair-market-value documentation requirements. Traveled with an investor one-pager and demo script — evidence of a PM who prototypes the pitch alongside the product. Hunts in a pack with nil-scraper and nil-valuation.',
    habitat: ['Next.js', 'TypeScript', 'shadcn/ui'],
    firstObserved: '2025-12',
    lastSeen: '2025-12',
    fileCount: 124,
    range: { github: 'https://github.com/dontoisme/alucard' },
  },
  {
    id: 'zeroed',
    commonName: 'Zeroed',
    binomial: 'Productus frugalis',
    classification: 'product',
    status: 'dormant',
    summary: 'Privacy-first zero-based budgeting: Python CLI for the data, Next.js dashboard for the charts.',
    fieldNotes:
      'A thrifty local-first species that never lets your bank data leave the burrow. A Click/Rich CLI handles CSV imports, auto-categorization, and zero-based budget logic against local SQLite, while a Next.js dashboard renders the picture. Designed to be operated conversationally through Claude Code — you talk to your budget now.',
    habitat: ['Python', 'SQLite', 'Next.js', 'Prisma', 'TypeScript'],
    firstObserved: '2026-01',
    lastSeen: '2026-01',
    fileCount: 92,
    range: { github: 'https://github.com/dontoisme/zeroed' },
  },
  {
    id: 'dinocodex',
    commonName: 'DinoCodex',
    binomial: 'Productus dinosauricus',
    classification: 'product',
    status: 'rare',
    summary: 'A 14-screen SwiftUI dinosaur encyclopedia, built in a day as a test bed for Darwin.',
    fieldNotes:
      'A dinosaur encyclopedia that exists primarily so another tool could photograph it: DinoCodex served as the living test subject for the Darwin visual-regression tool. Designed from ASCII mockups and implemented in SwiftUI in a single day. A specimen about extinct specimens, built to help other specimens evolve. The taxonomy committee had a long meeting about this one.',
    habitat: ['Swift', 'SwiftUI'],
    firstObserved: '2025-12',
    lastSeen: '2025-12',
    fileCount: 22,
  },
  {
    id: 'pandemic',
    commonName: 'Pandemic Industry',
    binomial: 'Productus stellaris',
    classification: 'product',
    status: 'thriving',
    summary:
      'Industry-management app for an EVE Echoes gaming corporation: ship orders, materials, logistics, Discord.',
    fieldNotes:
      'The longest-serving working animal in the collection: a full-stack app coordinating a gaming corporation\'s industrial operations — ship build orders with material calculations, real-time inventory, role-based access, and Discord integration. Originally bred in another keeper\'s enclosure (the repo belongs to a corpmate), but the last twenty commits of care and feeding — modernization, localization, emulator-based dev — are all this author\'s. Real users, real logistics, fictional spaceships.',
    habitat: ['React', 'Firebase', 'Cloud Functions', 'Discord API'],
    firstObserved: '2020-08',
    lastSeen: '2026-05',
    fileCount: 6688,
    range: { github: 'https://github.com/fortmana/pandemic' },
  },

  // ── AI Experiments ────────────────────────────────────────────────────
  {
    id: 'agent-commerce',
    commonName: 'agent-pay',
    binomial: 'Agentis mercatorius',
    classification: 'ai',
    status: 'dormant',
    summary:
      'Touch ID-confirmed payments for CLI agents — closing the last mile of terminal commerce.',
    fieldNotes:
      'CLI agents like Claude Code can recommend paid tools but cannot buy them; the human must leave the terminal, sign up in a browser, and carry an API key home in their teeth. agent-pay closes that gap with a biometric payment confirmation that fires directly from a terminal process — a Swift Touch ID binary wired to a TypeScript CLI, with tokens in the macOS Keychain. The full flow takes about ten seconds. Was being groomed for a Show HN debut; currently hibernating with its research intact.',
    habitat: ['TypeScript', 'Swift', 'Stripe', 'Touch ID', 'MCP'],
    firstObserved: '2026-03',
    lastSeen: '2026-04',
    fileCount: 36,
    range: { github: 'https://github.com/dontoisme/agent-commerce' },
    featured: true,
  },
  {
    id: 'co-op-claude',
    commonName: 'Co-op Claude',
    binomial: 'Agentis cooperativus',
    classification: 'ai',
    status: 'rare',
    summary:
      'Multiplayer Claude Code: two developers, two role-specialized AI instances, one shared project.',
    fieldNotes:
      'A pack-hunting experiment: two or more developers each run their own role-specialized Claude (architect vs. UX, say) against one shared project, coordinating through a message bus and task board. Works same-machine or across machines. Built in a single weekend sprint, complete with a blueprint document — observed briefly, then it vanished back into the brush.',
    habitat: ['Python', 'Claude Code Agent Teams'],
    firstObserved: '2026-03',
    lastSeen: '2026-03',
    fileCount: 878,
    range: { github: 'https://github.com/dontoisme/co-op-claude' },
  },
  {
    id: 'jj-interview-coach',
    commonName: 'Interview Coach (JJ edition)',
    binomial: 'Agentis praeceptor',
    classification: 'ai',
    status: 'dormant',
    summary:
      'An interview-coach Claude skill wired into Job Journal so it already knows your whole career.',
    fieldNotes:
      'Descended from stock bred elsewhere (a fork of noamseg/interview-coach-skill), then substantially domesticated: a data bridge auto-loads your career corpus, storybank, and live application pipeline from Job Journal so the coach never cold-starts with "paste your resume." Includes audio recording and transcription scripts for real interview sessions. Part of the larger job-search food chain.',
    habitat: ['Claude Code Skills', 'Python', 'Shell'],
    firstObserved: '2026-01',
    lastSeen: '2026-03',
    fileCount: 44,
    range: { github: 'https://github.com/dontoisme/jj-interview-coach-skill' },
  },
  {
    id: 'brave-sir-robin',
    commonName: 'Brave Sir Robin',
    binomial: 'Agentis fugax',
    classification: 'ai',
    status: 'rare',
    summary:
      'A guardrails framework for AI-assisted trading sessions — named for its readiness to bravely run away.',
    fieldNotes:
      'An experiment in giving an AI structured self-awareness for real-money decisions: a written thesis and account rules that keep trading sessions explicitly framed as a calibrated learning budget, never an income strategy. The name is the strategy — when in doubt, it bravely turns its tail and flees. More interesting as a study in agent guardrails than as finance.',
    habitat: ['Markdown', 'MCP'],
    firstObserved: '2026-06',
    lastSeen: '2026-06',
    fileCount: 2,
  },
  {
    id: 'gemini-cli-test',
    commonName: 'Gemini CLI Test',
    binomial: 'Agentis geminorum',
    classification: 'ai',
    status: 'rare',
    summary: 'A sandbox for evaluating the Gemini CLI against a Gmail job-search script.',
    fieldNotes:
      'Sighted exactly once: a scratch experiment pointing the Gemini CLI at Gmail to extract job-search results into a CSV. Kept in the guide for scientific completeness. Some specimens exist mainly to prove the observer was paying attention to the whole ecosystem, not just one vendor.',
    habitat: ['Python', 'Gmail API'],
    firstObserved: '2026-01',
    lastSeen: '2026-01',
    fileCount: 3,
  },

  // ── Tools ─────────────────────────────────────────────────────────────
  {
    id: 'job-journal',
    commonName: 'Job Journal',
    binomial: 'Utilitas memorialis',
    classification: 'tool',
    status: 'thriving',
    summary:
      'A CLI that interviews you about your career, then generates tailored resumes from your own words.',
    fieldNotes:
      'The workhorse of the job-search food chain. Job Journal builds a rich corpus of professional experience through conversational interviews, then selects — never fabricates — bullets from that corpus to generate role-tailored resumes. SQLite storage, job scraping and scoring, application tracking, and Claude Code as a first-class interface. One of the most sustained specimens in the collection; a web-UI prototype exists in captivity but the CLI remains the dominant form.',
    habitat: ['Python', 'SQLite', 'Claude Code'],
    firstObserved: '2026-01',
    lastSeen: '2026-07',
    fileCount: 76,
    range: { github: 'https://github.com/dontoisme/Job-Journal' },
    featured: true,
  },
  {
    id: 'darwin',
    commonName: 'Darwin',
    binomial: 'Utilitas darwinii',
    classification: 'tool',
    status: 'stable',
    summary:
      "Visual regression testing for AI-assisted iOS development — your AI's eyes on the build.",
    fieldNotes:
      'Named for the obvious reason: it watches things evolve. Darwin captures only the screens affected by changed source files, generates pixel-level diff reports, and builds an interactive visual timeline of an app\'s evolution — giving AI coding agents (and their humans) actual eyes on what changed. Git-aware, CI-friendly, and installable via its own published Homebrew tap.',
    habitat: ['Bash', 'ImageMagick', 'Xcode tooling', 'Homebrew'],
    firstObserved: '2025-12',
    lastSeen: '2025-12',
    fileCount: 11,
    range: { github: 'https://github.com/dontoisme/darwin' },
    featured: true,
  },
  {
    id: 'homebrew-darwin',
    commonName: 'Homebrew Tap (Darwin)',
    binomial: 'Utilitas darwinii domestica',
    classification: 'tool',
    status: 'stable',
    summary: "The Homebrew formula that makes Darwin installable in two commands.",
    fieldNotes:
      'The domesticated companion subspecies: a Homebrew tap so anyone can run brew install darwin and be done. Small, symbiotic, and living proof that the keeper ships distribution, not just code.',
    habitat: ['Ruby', 'Homebrew'],
    firstObserved: '2025-12',
    lastSeen: '2025-12',
    fileCount: 1,
    range: { github: 'https://github.com/dontoisme/homebrew-darwin' },
  },
  {
    id: 'carsandbids-analyzer',
    commonName: 'Cars & Bids Analyzer',
    binomial: 'Utilitas licitatoria',
    classification: 'tool',
    status: 'stable',
    summary: 'Scrapes auction history and flags cars priced below their make/model averages.',
    fieldNotes:
      'A scavenger species that picks through carsandbids.com auction results: filters by body style and year, exports to CSV and Excel, flags underpriced listings, and draws bubble plots of the market. Its README includes a paste-into-Claude-Code onboarding prompt — an early example of designing tools with an AI as the expected first user.',
    habitat: ['Python', 'Playwright', 'pandas'],
    firstObserved: '2026-01',
    lastSeen: '2026-01',
    fileCount: 3,
    range: { github: 'https://github.com/dontoisme/carsandbids-analyzer' },
  },
  {
    id: 'gmail-quick-filter',
    commonName: 'Gmail Quick Filter',
    binomial: 'Utilitas epistolaris',
    classification: 'tool',
    status: 'stable',
    summary: 'Chrome extension: one click to see every email from the selected sender.',
    fieldNotes:
      'A small, complete, shipped organism from 2024 — the classic scratch-your-own-itch utility. Adds a Quick Filter button and a keyboard shortcut to Gmail so you can instantly see everything a sender has ever mailed you. It does one thing. It still does it.',
    habitat: ['JavaScript', 'Chrome Extension'],
    firstObserved: '2024-12',
    lastSeen: '2025-01',
    fileCount: 3,
    range: { github: 'https://github.com/dontoisme/Gmail-Quick-Filter' },
  },
  {
    id: 'gql',
    commonName: 'GQL',
    binomial: 'Utilitas purgatrix',
    classification: 'tool',
    status: 'rare',
    summary: 'Gmail inbox analyzer and bulk-delete CLI backed by a local SQLite index.',
    fieldNotes:
      'A two-phase predator of inbox clutter: phase one scans Gmail metadata into a read-only local SQLite index; phase two queries it and batch-deletes with confirmation. Includes sender-distribution reporting, for those who want to know exactly which newsletter is the apex offender. Observed in the wild but never formally committed.',
    habitat: ['Python', 'SQLite', 'Gmail API'],
    firstObserved: '2026-03',
    lastSeen: '2026-03',
    fileCount: 2,
  },
  {
    id: 'nil-scraper',
    commonName: 'NIL Scraper',
    binomial: 'Utilitas collectiva',
    classification: 'tool',
    status: 'rare',
    summary: 'Maps the college NIL collective ecosystem from IRS 990 filings and public data.',
    fieldNotes:
      'Market-research groundwork for the Alucard platform: scrapes and compiles intelligence on NIL collectives, including nonprofit financial data from IRS Form 990s, into an ecosystem report identifying who would actually pay for NIL transaction data. A PM instinct wearing a scraper costume.',
    habitat: ['Python'],
    firstObserved: '2025-12',
    lastSeen: '2025-12',
    fileCount: 8,
  },
  {
    id: 'nil-valuation',
    commonName: 'NIL Valuation',
    binomial: 'Utilitas aestimatrix',
    classification: 'tool',
    status: 'dormant',
    summary: 'A data pipeline for estimating fair-market value of college athlete NIL deals.',
    fieldNotes:
      'The analytical engine of the NIL pack: a structured valuation pipeline (sources, derivers, models, API layer) with tests, built to compute athlete fair-market values. Bred during the same late-2025 sprint as Alucard and NIL Scraper; the three travel together.',
    habitat: ['Python'],
    firstObserved: '2025-12',
    lastSeen: '2025-12',
    fileCount: 21,
  },
  {
    id: 'job-apply-cli',
    commonName: 'Job Apply CLI',
    binomial: 'Utilitas applicans',
    classification: 'tool',
    status: 'dormant',
    summary: 'Planned CLI to auto-fill ATS job applications while keeping the human decisions human.',
    fieldNotes:
      'Currently exists only as a detailed kickoff document: a tool to automate the repetitive form-filling of Greenhouse and Lever applications while preserving human judgment about which jobs and which resume variant. An egg that has not hatched. The guide includes it because eggs count.',
    habitat: ['Markdown (planning)'],
    firstObserved: '2025-12',
    lastSeen: '2025-12',
    fileCount: 4,
  },
  {
    id: 'pythonweb',
    commonName: 'Bookmark Parser',
    binomial: 'Utilitas indicis',
    classification: 'tool',
    status: 'fossil',
    summary: 'Parses Chrome bookmark exports into a sorted, annotated CSV.',
    fieldNotes:
      'An early utility from late 2024: extracts bookmarks from browser HTML exports, computes their ages, pulls domains, and emits a tidy date-sorted CSV. Preserved in the strata as evidence of the pre-AI-tooling era, when one wrote one\'s own BeautifulSoup selectors and was grateful.',
    habitat: ['Python', 'pandas', 'BeautifulSoup'],
    firstObserved: '2024-12',
    lastSeen: '2024-12',
    fileCount: 3,
    range: { github: 'https://github.com/dontoisme/PythonWeb' },
  },

  // ── Games & Play ──────────────────────────────────────────────────────
  {
    id: 'scrapwind',
    commonName: 'Scrapwind',
    binomial: 'Ludus ferrivorus',
    classification: 'game',
    status: 'thriving',
    summary:
      'Unity 6 game: shoot down cargo drones, salvage the wreckage, bolt the parts into your own speeder.',
    fieldNotes:
      'The largest predator currently active in the ecosystem: a third-person hunt-salvage-build game where every machine in the world runs the same simulation of power, heat, thrust, and signal. Bring down an autonomous cargo drone, strip it at the wreck site, and weld its organs into your open-cockpit speeder. Unity 6 with URP, PC-first with Steam Deck ambitions, developed with AI assistance through the Unity MCP bridge — complete with a headless EditMode test suite, because even games deserve CI.',
    habitat: ['Unity 6', 'C#', 'URP'],
    firstObserved: '2026-06',
    lastSeen: '2026-07',
    fileCount: 939,
    range: { github: 'https://github.com/dontoisme/scrapwind' },
    featured: true,
  },

  // ── Writing & Knowledge ───────────────────────────────────────────────
  {
    id: 'brain',
    commonName: 'The Brain',
    binomial: 'Sapientia cerebrum',
    classification: 'knowledge',
    status: 'thriving',
    summary: 'The private Obsidian second-brain vault that feeds strategic context to every other specimen.',
    fieldNotes:
      'The keystone species: an Obsidian vault organized with PARA + Maps of Content, holding over 500 notes of planning, strategy, and accumulated judgment. Every other project in this guide grazes on it for context. Kept off public exhibit for obvious reasons, but a fully domesticated template of it is available — see Second Brain Template, its public-facing offspring.',
    habitat: ['Obsidian', 'Markdown', 'Claude Code commands'],
    firstObserved: '2025-11',
    lastSeen: '2026-06',
    fileCount: 542,
  },
  {
    id: 'second-brain-obsidian',
    commonName: 'Second Brain Template',
    binomial: 'Sapientia cerebrum publica',
    classification: 'knowledge',
    status: 'stable',
    summary: 'A clone-and-open Obsidian vault template: PARA + MOC structure with Claude Code setup.',
    fieldNotes:
      'The Brain, domesticated for release: a generalized, shareable version of the private vault with full PARA + MOC structure, templates, workflows, a ten-minute QuickStart, and interactive setup via Claude Code commands. Bred specifically to survive in other people\'s habitats.',
    habitat: ['Obsidian', 'Markdown', 'Claude Code commands'],
    firstObserved: '2026-01',
    lastSeen: '2026-01',
    fileCount: 37,
    range: { github: 'https://github.com/dontoisme/second-brain-obsidian' },
  },
  {
    id: 'awesome-powered-by-claude-code',
    commonName: 'Awesome: Powered by Claude Code',
    binomial: 'Sapientia curatoria',
    classification: 'knowledge',
    status: 'stable',
    summary: 'A curated awesome-list of apps that use Claude Code itself as their runtime.',
    fieldNotes:
      'A category-defining attempt: not "tools for Claude Code" but apps where Claude Code is the engine — the user talks to Claude while local files and SQLite provide persistence via skill instructions. Grew out of a ten-document strategic analysis of the missing "app layer" for AI-generated local software. Curation as an act of taxonomy, which this guide respects deeply.',
    habitat: ['Markdown'],
    firstObserved: '2026-01',
    lastSeen: '2026-01',
    fileCount: 8,
    range: { github: 'https://github.com/dontoisme/awesome-powered-by-claude-code' },
  },
  {
    id: 'dontoisme-github-io',
    commonName: 'The Blog',
    binomial: 'Sapientia scriptorium',
    classification: 'knowledge',
    status: 'thriving',
    summary: 'A Jekyll blog with an AI-assisted publishing pipeline and a written voice guide.',
    fieldNotes:
      'The oldest living specimen in the collection — first observed in 2014 and still active. Now notable for its AI publishing pipeline: a drafts pen where AI-generated posts await review, a voice-guide document so drafts sound like the author rather than a press release, and Claude Code commands running the whole workflow. Longevity plus adaptation: the naturalist\'s favorite combination.',
    habitat: ['Jekyll', 'Ruby', 'Markdown', 'GitHub Pages'],
    firstObserved: '2014-11',
    lastSeen: '2026-06',
    fileCount: 18,
    range: {
      github: 'https://github.com/dontoisme/dontoisme.github.io',
      website: 'https://dontoisme.github.io',
    },
  },
  {
    id: 'don-blog',
    commonName: 'AstroPaper Blog',
    binomial: 'Sapientia astro',
    classification: 'knowledge',
    status: 'dormant',
    summary: 'An earlier blog built on the AstroPaper theme, largely superseded by the Jekyll site.',
    fieldNotes:
      'A previous nesting site from 2023, built on the minimal AstroPaper theme. Still standing, occasionally visited, but the flock has largely migrated to the Jekyll blog where the AI publishing pipeline lives. Every naturalist keeps their old field stations.',
    habitat: ['Astro', 'TypeScript', 'Tailwind CSS'],
    firstObserved: '2023-03',
    lastSeen: '2025-12',
    fileCount: 35,
    range: { github: 'https://github.com/dontoisme/don-blog' },
  },
  {
    id: 'ark-b-writings',
    commonName: 'Ark B Writings',
    binomial: 'Sapientia golgafrinchana',
    classification: 'knowledge',
    status: 'dormant',
    summary: 'A GitHub Pages home for personal essays. The name is a Douglas Adams deep cut.',
    fieldNotes:
      'A quiet enclosure for personal writing. The binomial honors the Golgafrincham Ark Fleet Ship B, which carried the telephone sanitizers, account executives, and management consultants — the third of the population deemed useless, who then inherited the Earth. If you know, you know. If you don\'t: go read The Restaurant at the End of the Universe, this entry will still be here.',
    habitat: ['Jekyll', 'Markdown', 'GitHub Pages'],
    firstObserved: '2024-10',
    lastSeen: '2025-12',
    fileCount: 19,
    range: {
      github: 'https://github.com/dontoisme/ark-b-writings',
      website: 'https://dontoisme.github.io/ark-b-writings/',
    },
  },
  {
    id: 'applayer-analysis',
    commonName: 'App Layer Analysis',
    binomial: 'Sapientia stratigraphica',
    classification: 'knowledge',
    status: 'fossil',
    summary: 'Ten-document strategic analysis of the missing distribution layer for AI-generated local apps.',
    fieldNotes:
      'A fossilized thought process, preserved in ten sedimentary layers: analyst findings, architecture, PM assessment, UX review, competitive landscape, synthesis, and action plan — produced with role-based AI agents examining why MCP standardized data connections but nothing standardized distributing AI-generated local apps. Its conclusions hatched the Awesome: Powered by Claude Code list.',
    habitat: ['Markdown'],
    firstObserved: '2026-01',
    lastSeen: '2026-01',
    fileCount: 10,
  },

  // ── Introduced Species (forks) ────────────────────────────────────────
  {
    id: 'eve-echoes-tools',
    commonName: 'EVE Echoes Data Toolchain',
    binomial: 'Furca echoensis',
    classification: 'fork',
    status: 'fossil',
    summary: 'Third-party Rust/Python tooling for extracting EVE Echoes game data (three enclosures).',
    fieldNotes:
      'A cluster of introduced species, imported circa 2022: xforce\'s extraction toolchain, a Docker data pipeline, and a JSON static-data dump, all kept to feed game data into the Pandemic industry app. No original code — these are working animals brought in from other ecosystems, credited to their original breeders, and honestly labeled as such. A field guide that hides its forks is lying to you.',
    habitat: ['Rust', 'Python', 'Docker'],
    firstObserved: '2020-08',
    lastSeen: '2022-12',
    fileCount: 500,
    range: { github: 'https://github.com/xforce/eve-echoes-tools' },
  },

  // ── Exercises ─────────────────────────────────────────────────────────
  {
    id: 'bonterra-exercise',
    commonName: 'Bonterra Exercise',
    binomial: 'Exercitium diurnum',
    classification: 'exercise',
    status: 'fossil',
    summary:
      'A complete PM interview take-home — hypotheses, personas, wireframes, working prototype — in one day.',
    fieldNotes:
      'A captive-bred specimen produced under time pressure: root-cause analysis, hypothesis evaluation, personas, wireframes, and a working prototype, all in a single day. Preserved as evidence of what a PM with AI leverage can produce between sunrise and deadline.',
    habitat: ['Markdown', 'TypeScript'],
    firstObserved: '2026-02',
    lastSeen: '2026-02',
    fileCount: 84,
    range: { github: 'https://github.com/dontoisme/bonterra-exercise' },
  },
  {
    id: 'prisma-example',
    commonName: 'Prisma Hello World',
    binomial: 'Exercitium prismaticum',
    classification: 'exercise',
    status: 'fossil',
    summary: 'The standard Prisma getting-started tutorial, completed and preserved.',
    fieldNotes:
      'Every collection has one: the tutorial scaffold, followed faithfully, never revisited. Preserved in the strata as proof that even ORMs must be met before they can be judged.',
    habitat: ['TypeScript', 'Prisma'],
    firstObserved: '2024-12',
    lastSeen: '2024-12',
    fileCount: 8,
  },
  {
    id: 'builder-test',
    commonName: 'Builder Test',
    binomial: 'Exercitium sveltus',
    classification: 'exercise',
    status: 'fossil',
    summary: 'A SvelteKit scaffold from a 2023 tooling experiment, created and abandoned in one day.',
    fieldNotes:
      'Radiocarbon dating places this specimen in March 2023: a create-svelte scaffold with Playwright config, alive for approximately one afternoon. Its brief existence answered a question, which is all an experiment owes anyone.',
    habitat: ['Svelte', 'SvelteKit', 'Vite'],
    firstObserved: '2023-03',
    lastSeen: '2023-03',
    fileCount: 169,
    range: { github: 'https://github.com/dontoisme/builder-test' },
  },
  {
    id: 'ladder',
    commonName: 'Ladder',
    binomial: 'Exercitium scalaris',
    classification: 'exercise',
    status: 'fossil',
    summary: 'A 2022 Next.js scaffold whose only fossil evidence of intent is axios and cheerio.',
    fieldNotes:
      'Paleontology by package.json: a bare create-next-app skeleton whose dependency list (axios, cheerio) suggests a scraping ambition that never got past setup. The homepage is still the default template. Included because the fossil record must be honest about the ideas that died at the trailhead.',
    habitat: ['Next.js', 'JavaScript'],
    firstObserved: '2022-11',
    lastSeen: '2025-01',
    fileCount: 7,
    range: { github: 'https://github.com/dontoisme/Ladder' },
  },
];

export const specimenCount = specimens.length;

export const classesInOrder: SpecimenClass[] = [
  'product',
  'ai',
  'tool',
  'game',
  'knowledge',
  'fork',
  'exercise',
];

export function getSpecimensByClass(cls: SpecimenClass): Specimen[] {
  return specimens.filter((s) => s.classification === cls);
}
