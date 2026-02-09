'use client';

import {
  Brain,
  Layers,
  AlertTriangle,
  Clock,
  Shield,
  Zap,
  UserCheck,
  Terminal,
  Search,
  FileText,
  Radio,
  ArrowRight,
  Database,
  Globe,
  Mail,
  FileDown,
  Lock,
  Monitor,
  Package,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Shared layout wrapper                                              */
/* ------------------------------------------------------------------ */

function SlideLayout({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'h-full flex flex-col items-center justify-center p-8',
        className,
      )}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SLIDE 1 — Title                                                    */
/* ------------------------------------------------------------------ */

function TitleSlide() {
  return (
    <SlideLayout>
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[var(--accent)] to-purple-500 flex items-center justify-center mb-6">
        <Brain className="w-10 h-10 text-white" />
      </div>
      <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2 text-center">
        Job Journal
      </h1>
      <p className="text-xl text-[var(--text-secondary)] mb-6 text-center">
        An AI-Native Product Case Study
      </p>
      <div className="flex items-center gap-3 text-sm text-[var(--text-muted)]">
        <span>Don Hogan</span>
        <span className="text-[var(--border-color)]">|</span>
        <span>February 2026</span>
      </div>
      <span className="mt-4 px-3 py-1 rounded-full text-xs bg-[var(--accent)]/20 text-[var(--accent)]">
        Built with Claude Code
      </span>
    </SlideLayout>
  );
}

/* ------------------------------------------------------------------ */
/*  SLIDE 2 — The Problem                                              */
/* ------------------------------------------------------------------ */

const problems = [
  {
    icon: Layers,
    title: 'Fragmentation',
    text: 'Applications scattered across 15 tabs, 4 email threads, and a spreadsheet you forgot to update. No single source of truth.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/20',
  },
  {
    icon: AlertTriangle,
    title: 'AI Hallucination',
    text: '"Spearheaded cross-functional synergies" — you never said that. Resume builders fabricate achievements.',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/20',
  },
  {
    icon: Clock,
    title: 'Time Sink',
    text: 'Customizing each resume by hand. Checking job boards daily. Losing track of where you applied and when.',
    color: 'text-red-400',
    bg: 'bg-red-500/20',
  },
];

function ProblemSlide() {
  return (
    <SlideLayout className="items-start max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-1">
        The Problem
      </h2>
      <p className="text-sm text-[var(--text-muted)] mb-6">
        Job searching is broken in three specific ways
      </p>
      <div className="w-full space-y-3">
        {problems.map((p) => (
          <div
            key={p.title}
            className="flex gap-4 p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)]"
          >
            <div
              className={cn(
                'w-10 h-10 rounded-lg flex items-center justify-center shrink-0',
                p.bg,
              )}
            >
              <p.icon className={cn('w-5 h-5', p.color)} />
            </div>
            <div>
              <h3 className="font-semibold text-[var(--text-primary)]">
                {p.title}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] mt-0.5">
                {p.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </SlideLayout>
  );
}

/* ------------------------------------------------------------------ */
/*  SLIDE 3 — Design Principles                                        */
/* ------------------------------------------------------------------ */

const principles = [
  {
    icon: Shield,
    title: 'Responsible AI',
    text: 'Your words, your corpus. AI assists selection, not fabrication.',
  },
  {
    icon: Zap,
    title: 'Strong Defaults',
    text: 'One command to score a JD. One to generate a resume. Works out of the box.',
  },
  {
    icon: UserCheck,
    title: 'User Control',
    text: 'You review every bullet. You approve every resume. Human in the loop, always.',
  },
];

function PrinciplesSlide() {
  return (
    <SlideLayout className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
        Design Principles
      </h2>

      {/* Hero quote */}
      <div className="w-full p-5 rounded-lg border-l-4 border-[var(--accent)] bg-[var(--bg-secondary)] mb-6">
        <p className="text-xl font-bold text-[var(--accent)] mb-1">
          &ldquo;SELECT, don&rsquo;t COMPOSE&rdquo;
        </p>
        <p className="text-sm text-[var(--text-secondary)]">
          Every resume bullet traces back to something you actually said. No
          hallucinated achievements. No fabricated metrics.
        </p>
      </div>

      {/* Three principles */}
      <div className="w-full grid grid-cols-3 gap-3">
        {principles.map((p) => (
          <div
            key={p.title}
            className="p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] text-center"
          >
            <div className="w-10 h-10 rounded-lg bg-[var(--accent)]/20 flex items-center justify-center mx-auto mb-3">
              <p.icon className="w-5 h-5 text-[var(--accent)]" />
            </div>
            <h3 className="font-semibold text-[var(--text-primary)] text-sm mb-1">
              {p.title}
            </h3>
            <p className="text-xs text-[var(--text-muted)]">{p.text}</p>
          </div>
        ))}
      </div>
    </SlideLayout>
  );
}

/* ------------------------------------------------------------------ */
/*  SLIDE 4 — AI-Native UX                                            */
/* ------------------------------------------------------------------ */

const workflows = [
  {
    cmd: '/interview',
    desc: 'Mine your career history conversationally',
    icon: Terminal,
  },
  {
    cmd: '/jobs',
    desc: 'Search and discover opportunities',
    icon: Search,
  },
  {
    cmd: '/apply',
    desc: 'Score JD fit, generate resume, track application',
    icon: FileText,
  },
  {
    cmd: '/greenhouse',
    desc: 'Poll company job boards automatically',
    icon: Radio,
  },
];

function AINativeSlide() {
  return (
    <SlideLayout className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-1">
        AI-Native UX
      </h2>
      <p className="text-sm text-[var(--text-muted)] mb-6">
        Claude Code is the primary interface — not just a helper
      </p>

      {/* Stat callout */}
      <div className="w-full flex gap-3 mb-6">
        <div className="flex-1 p-3 rounded-lg bg-[var(--accent)]/10 border border-[var(--accent)]/30 text-center">
          <p className="text-2xl font-bold text-[var(--accent)]">2,080</p>
          <p className="text-xs text-[var(--text-muted)]">
            lines of skill prompts
          </p>
        </div>
        <div className="flex-1 p-3 rounded-lg bg-[var(--accent)]/10 border border-[var(--accent)]/30 text-center">
          <p className="text-2xl font-bold text-[var(--accent)]">4</p>
          <p className="text-xs text-[var(--text-muted)]">
            Claude Code workflows
          </p>
        </div>
      </div>

      {/* Workflow pipeline */}
      <div className="w-full space-y-2">
        {workflows.map((w, i) => (
          <div key={w.cmd} className="flex items-center gap-3">
            <div className="flex items-center gap-2 w-full p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)]">
              <div className="w-8 h-8 rounded bg-[var(--bg-tertiary)] flex items-center justify-center shrink-0">
                <w.icon className="w-4 h-4 text-[var(--text-muted)]" />
              </div>
              <code className="text-sm font-mono text-[var(--accent)] shrink-0">
                {w.cmd}
              </code>
              <ArrowRight className="w-3 h-3 text-[var(--text-muted)] shrink-0" />
              <span className="text-sm text-[var(--text-secondary)]">
                {w.desc}
              </span>
            </div>
            {i < workflows.length - 1 && (
              <div className="w-0.5 h-2 bg-[var(--border-color)] ml-4 shrink-0 hidden" />
            )}
          </div>
        ))}
      </div>

      <p className="text-xs text-[var(--text-muted)] mt-4 italic">
        The CLI exists for automation. Claude is the UX.
      </p>
    </SlideLayout>
  );
}

/* ------------------------------------------------------------------ */
/*  SLIDE 5 — System Architecture                                      */
/* ------------------------------------------------------------------ */

const pipelineSteps = [
  'Interview',
  'Corpus',
  'Discovery',
  'Scoring',
  'Generation',
  'Tracking',
  'Analytics',
];

const stats = [
  { value: '11,500', label: 'Lines of Python' },
  { value: '16', label: 'SQLite Tables' },
  { value: '13', label: 'Modules' },
  { value: '4', label: 'Integrations' },
];

const integrations = [
  { name: 'Gmail', icon: Mail },
  { name: 'Google Docs', icon: FileDown },
  { name: 'Greenhouse.io', icon: Globe },
  { name: 'Google Maps', icon: Globe },
];

function ArchitectureSlide() {
  return (
    <SlideLayout className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-1">
        System Architecture
      </h2>
      <p className="text-sm text-[var(--text-muted)] mb-5">
        Full lifecycle pipeline — not isolated features
      </p>

      {/* Pipeline */}
      <div className="w-full flex flex-wrap items-center justify-center gap-1 mb-6 p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)]">
        {pipelineSteps.map((step, i) => (
          <div key={step} className="flex items-center gap-1">
            <span className="px-2.5 py-1 rounded bg-[var(--accent)]/15 text-xs font-medium text-[var(--accent)]">
              {step}
            </span>
            {i < pipelineSteps.length - 1 && (
              <ArrowRight className="w-3 h-3 text-[var(--text-muted)]" />
            )}
          </div>
        ))}
      </div>

      {/* Stats row */}
      <div className="w-full grid grid-cols-4 gap-3 mb-5">
        {stats.map((s) => (
          <div
            key={s.label}
            className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] text-center"
          >
            <p className="text-xl font-bold text-[var(--text-primary)]">
              {s.value}
            </p>
            <p className="text-xs text-[var(--text-muted)]">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Integrations */}
      <div className="w-full flex justify-center gap-2">
        {integrations.map((ig) => (
          <span
            key={ig.name}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs text-[var(--text-secondary)]"
          >
            <ig.icon className="w-3 h-3" />
            {ig.name}
          </span>
        ))}
      </div>
    </SlideLayout>
  );
}

/* ------------------------------------------------------------------ */
/*  SLIDE 6 — Durable Trade-offs                                       */
/* ------------------------------------------------------------------ */

const tradeoffs = [
  {
    icon: Lock,
    versus: 'Local-first vs. Cloud',
    decision: 'Local-first',
    why: "Career data is sensitive. 'Your data never leaves your machine' is a feature, not a limitation.",
  },
  {
    icon: Database,
    versus: 'Corpus vs. AI-generated',
    decision: 'Corpus-backed',
    why: 'Traceability over convenience. Every bullet has a source. Hallucination rate: 0%.',
  },
  {
    icon: Monitor,
    versus: 'CLI vs. GUI',
    decision: 'Both',
    why: 'Claude Code for conversations. CLI for automation. Web dashboard for visualization.',
  },
  {
    icon: Package,
    versus: 'Optional deps vs. batteries-included',
    decision: 'Optional',
    why: 'Gmail, Google Docs, RAG install separately. Core works offline with zero config.',
  },
];

function TradeoffsSlide() {
  return (
    <SlideLayout className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-1">
        Durable Trade-offs
      </h2>
      <p className="text-sm text-[var(--text-muted)] mb-5">
        Every architecture decision is a bet on what matters
      </p>

      <div className="w-full grid grid-cols-2 gap-3">
        {tradeoffs.map((t) => (
          <div
            key={t.versus}
            className="p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)]"
          >
            <div className="flex items-center gap-2 mb-2">
              <t.icon className="w-4 h-4 text-[var(--text-muted)]" />
              <span className="text-xs text-[var(--text-muted)]">
                {t.versus}
              </span>
            </div>
            <p className="text-sm font-semibold text-[var(--accent)] mb-1">
              {t.decision}
            </p>
            <p className="text-xs text-[var(--text-secondary)]">{t.why}</p>
          </div>
        ))}
      </div>
    </SlideLayout>
  );
}

/* ------------------------------------------------------------------ */
/*  SLIDE 7 — By the Numbers                                           */
/* ------------------------------------------------------------------ */

const bigStats = [
  { value: '11,500', label: 'lines of Python' },
  { value: '30+', label: 'CLI commands' },
  { value: '16', label: 'database tables' },
  { value: '4', label: 'external integrations' },
  { value: '2,080', label: 'lines of skill prompts' },
  { value: '1', label: 'month to build' },
];

function NumbersSlide() {
  return (
    <SlideLayout className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-1">
        By the Numbers
      </h2>
      <p className="text-sm text-[var(--text-muted)] mb-6">
        One month. One developer. One AI pair-programmer.
      </p>

      <div className="w-full grid grid-cols-3 gap-3">
        {bigStats.map((s) => (
          <div
            key={s.label}
            className="p-5 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] text-center"
          >
            <p className="text-3xl font-bold text-[var(--accent)]">
              {s.value}
            </p>
            <p className="text-xs text-[var(--text-muted)] mt-1">{s.label}</p>
          </div>
        ))}
      </div>
    </SlideLayout>
  );
}

/* ------------------------------------------------------------------ */
/*  SLIDE 8 — What's Next                                              */
/* ------------------------------------------------------------------ */

const roadmap = [
  {
    title: 'ATS Job Monitoring',
    desc: 'Automatically poll Greenhouse, Lever, and Ashby boards for target companies. 277-line spec ready.',
    status: 'Designed',
    statusColor: 'bg-blue-500/20 text-blue-400',
  },
  {
    title: 'Bullet-level Selection',
    desc: 'Choose specific achievements per role during resume generation. Infrastructure exists.',
    status: 'Planned',
    statusColor: 'bg-yellow-500/20 text-yellow-400',
  },
  {
    title: 'Open Source Release',
    desc: 'Community files, test suite, CI/CD pipeline. Local-first tools should be shared.',
    status: 'In Progress',
    statusColor: 'bg-green-500/20 text-green-400',
  },
  {
    title: 'Platform for Others',
    desc: 'The corpus architecture enables any corpus-driven career tool. Resume is just the first output.',
    status: 'Vision',
    statusColor: 'bg-purple-500/20 text-purple-400',
  },
];

function WhatsNextSlide() {
  return (
    <SlideLayout className="items-start max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-1">
        What&rsquo;s Next
      </h2>
      <p className="text-sm text-[var(--text-muted)] mb-5">
        The architecture supports what hasn&rsquo;t been built yet
      </p>

      <div className="w-full space-y-3">
        {roadmap.map((r) => (
          <div
            key={r.title}
            className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)]"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <h3 className="font-semibold text-sm text-[var(--text-primary)]">
                  {r.title}
                </h3>
                <span
                  className={cn(
                    'px-2 py-0.5 rounded text-[10px] font-medium',
                    r.statusColor,
                  )}
                >
                  {r.status}
                </span>
              </div>
              <p className="text-xs text-[var(--text-secondary)]">{r.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </SlideLayout>
  );
}

/* ------------------------------------------------------------------ */
/*  SLIDE 9 — The Meta Moment                                          */
/* ------------------------------------------------------------------ */

function MetaSlide() {
  return (
    <SlideLayout>
      <Sparkles className="w-8 h-8 text-[var(--accent)] mb-6 opacity-60" />
      <p className="text-2xl font-bold text-[var(--text-primary)] text-center leading-relaxed max-w-lg">
        The resume you reviewed was generated by this tool.
      </p>
      <p className="text-sm text-[var(--text-secondary)] mt-4 text-center max-w-md">
        Job Journal wrote the resume. HoganOS presented the case study. Claude
        Code built them both.
      </p>
      <div className="mt-8 flex items-center gap-3 text-xs text-[var(--text-muted)]">
        <span>Don Hogan</span>
        <span className="text-[var(--border-color)]">&middot;</span>
        <span>donhogan.com</span>
      </div>
    </SlideLayout>
  );
}

/* ------------------------------------------------------------------ */
/*  Export                                                              */
/* ------------------------------------------------------------------ */

export const jobJournalSlides: React.ComponentType[] = [
  TitleSlide,
  ProblemSlide,
  PrinciplesSlide,
  AINativeSlide,
  ArchitectureSlide,
  TradeoffsSlide,
  NumbersSlide,
  WhatsNextSlide,
  MetaSlide,
];
