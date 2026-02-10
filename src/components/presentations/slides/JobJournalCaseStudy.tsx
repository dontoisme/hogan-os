'use client';

import Image from 'next/image';
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
  RotateCcw,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePresentationContent } from '@/hooks/usePresentationContent';
import {
  extractHeading,
  extractSubheading,
  extractBlockquote,
  extractItalic,
  extractListItems,
  extractParagraphs,
  extractCommaSeparated,
  extractTableRows,
  parseListItem,
  parseTradeoffItem,
  parseRoadmapItem,
  parseWorkflowItem,
} from '@/data/presentation-content';

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
        'h-full flex flex-col items-center justify-center p-6',
        className,
      )}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Screenshot helpers                                                  */
/* ------------------------------------------------------------------ */

function ScreenshotFrame({
  src,
  alt,
  caption,
  className,
}: {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'w-full rounded-lg overflow-hidden border border-[var(--border-color)] bg-[var(--bg-tertiary)]',
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={800}
        height={450}
        className="w-full h-auto"
      />
      {caption && (
        <p className="text-xs text-[var(--text-muted)] px-3 py-2 border-t border-[var(--border-color)]">
          {caption}
        </p>
      )}
    </div>
  );
}

function ScreenshotPlaceholder({ label }: { label: string }) {
  return (
    <div className="w-full h-48 rounded-lg border-2 border-dashed border-[var(--border-color)] flex items-center justify-center bg-[var(--bg-tertiary)]">
      <span className="text-sm text-[var(--text-muted)]">
        Screenshot: {label}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Demo slide layout                                                   */
/* ------------------------------------------------------------------ */

function DemoSlideLayout({
  problem,
  problemIcon: Icon,
  problemColor,
  problemBg,
  solution,
  screenshotSrc,
  screenshotAlt,
  screenshotCaption,
  children,
}: {
  problem: string;
  problemIcon: LucideIcon;
  problemColor: string;
  problemBg: string;
  solution: string;
  screenshotSrc?: string;
  screenshotAlt: string;
  screenshotCaption?: string;
  children?: React.ReactNode;
}) {
  return (
    <SlideLayout className="items-start max-w-2xl mx-auto">
      <div className="w-full flex gap-3 p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] mb-3">
        <div
          className={cn(
            'w-9 h-9 rounded-lg flex items-center justify-center shrink-0',
            problemBg,
          )}
        >
          <Icon className={cn('w-4 h-4', problemColor)} />
        </div>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed self-center">
          {problem}
        </p>
      </div>
      <p className="text-sm text-[var(--text-primary)] font-medium mb-3 px-1">
        {solution}
      </p>
      {screenshotSrc ? (
        <ScreenshotFrame
          src={screenshotSrc}
          alt={screenshotAlt}
          caption={screenshotCaption}
        />
      ) : (
        <ScreenshotPlaceholder label={screenshotAlt} />
      )}
      {children}
    </SlideLayout>
  );
}

/* ================================================================== */
/*  Icon / color maps (structural — not editable via markdown)          */
/* ================================================================== */

const brutalIcons = [Clock, AlertTriangle, RotateCcw];
const brutalColors = ['text-red-400', 'text-yellow-400', 'text-blue-400'];
const brutalBgs = ['bg-red-500/20', 'bg-yellow-500/20', 'bg-blue-500/20'];

const pillIcons = [Shield, Zap, UserCheck];

const workflowIcons: Record<string, LucideIcon> = {
  '/interview': Terminal,
  '/jobs': Search,
  '/apply': FileText,
  '/greenhouse': Radio,
};

const principleIcons = [Shield, Zap, UserCheck];

const tradeoffIcons = [Lock, Database, Monitor, Package];

const roadmapColors: Record<string, string> = {
  Designed: 'bg-blue-500/20 text-blue-400',
  Planned: 'bg-yellow-500/20 text-yellow-400',
  'In Progress': 'bg-green-500/20 text-green-400',
  Vision: 'bg-purple-500/20 text-purple-400',
};

/* ================================================================== */
/*  ACT 1: THE PAIN                                                    */
/* ================================================================== */

function TitleSlide() {
  const sections = usePresentationContent();
  const s = sections['title'] || '';
  const heading = extractHeading(s) || 'Job Journal';
  const subtitle = extractSubheading(s) || 'From Career Chaos to Corpus-Driven Clarity';
  const paras = extractParagraphs(s);

  return (
    <SlideLayout>
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[var(--accent)] to-purple-500 flex items-center justify-center mb-6">
        <Brain className="w-10 h-10 text-white" />
      </div>
      <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2 text-center">
        {heading}
      </h1>
      <p className="text-xl text-[var(--text-secondary)] mb-2 text-center">
        {subtitle}
      </p>
      {paras[0] && (
        <p className="text-sm text-[var(--text-muted)] mb-6 text-center max-w-md">
          {paras[0]}
        </p>
      )}
      <div className="flex items-center gap-3 text-sm text-[var(--text-muted)]">
        {(paras[1] || 'Don Hogan | February 2026').split('|').map((part, i, arr) => (
          <span key={i} className="flex items-center gap-3">
            {part.trim()}
            {i < arr.length - 1 && (
              <span className="text-[var(--border-color)]">|</span>
            )}
          </span>
        ))}
      </div>
      <span className="mt-4 px-3 py-1 rounded-full text-xs bg-[var(--accent)]/20 text-[var(--accent)]">
        Built with Claude Code
      </span>
    </SlideLayout>
  );
}

function BrutalMathSlide() {
  const sections = usePresentationContent();
  const s = sections['brutal-math'] || '';
  const heading = extractHeading(s) || 'The Best Practice That Breaks You';
  const paras = extractParagraphs(s);
  const subtitle = paras[0] || '';
  const items = extractListItems(s).map(parseListItem);
  const quote = extractBlockquote(s);

  return (
    <SlideLayout className="items-start max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-1">
        {heading}
      </h2>
      {subtitle && (
        <p className="text-sm text-[var(--text-muted)] mb-4">{subtitle}</p>
      )}
      <div className="w-full space-y-2">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex gap-3 p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)]"
          >
            <div
              className={cn(
                'w-10 h-10 rounded-lg flex items-center justify-center shrink-0',
                brutalBgs[i] || 'bg-[var(--accent)]/20',
              )}
            >
              {(() => {
                const IconComp = brutalIcons[i] || Clock;
                return (
                  <IconComp
                    className={cn('w-5 h-5', brutalColors[i] || 'text-[var(--accent)]')}
                  />
                );
              })()}
            </div>
            <div>
              <h3 className="font-semibold text-[var(--text-primary)]">
                {item.title}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] mt-0.5">
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </div>
      {quote && (
        <div className="w-full mt-3 p-3 rounded-lg border-l-4 border-[var(--accent)] bg-[var(--bg-secondary)]">
          <p className="text-sm text-[var(--text-secondary)] italic">
            &ldquo;{quote}&rdquo;
          </p>
        </div>
      )}
    </SlideLayout>
  );
}

function EmotionalCycleSlide() {
  const sections = usePresentationContent();
  const s = sections['emotional-cycle'] || '';
  const heading = extractHeading(s) || 'The Real Cost';
  const paras = extractParagraphs(s);
  const subtitle = paras[0] || '';
  const steps = extractCommaSeparated(s);
  const statement = extractItalic(s);

  return (
    <SlideLayout className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-1">
        {heading}
      </h2>
      {subtitle && (
        <p className="text-sm text-[var(--text-muted)] mb-8">{subtitle}</p>
      )}
      {steps.length > 0 && (
        <div className="w-full flex flex-wrap items-center justify-center gap-1 mb-4 p-5 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)]">
          {steps.map((step, i) => (
            <div key={step} className="flex items-center gap-1">
              <span
                className={cn(
                  'px-3 py-1.5 rounded text-xs font-medium',
                  i === steps.length - 1
                    ? 'bg-red-500/20 text-red-400'
                    : i === 1
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-[var(--accent)]/15 text-[var(--accent)]',
                )}
              >
                {step}
              </span>
              <ArrowRight className="w-3 h-3 text-[var(--text-muted)]" />
            </div>
          ))}
          <span className="px-2 py-1 rounded text-xs font-medium text-[var(--text-muted)]">
            <RotateCcw className="w-4 h-4" />
          </span>
        </div>
      )}
      {statement && (
        <p className="text-xl italic text-[var(--text-secondary)] text-center mt-6 max-w-md leading-relaxed">
          {statement}
        </p>
      )}
    </SlideLayout>
  );
}

/* ================================================================== */
/*  ACT 2: THE INSIGHT                                                 */
/* ================================================================== */

function KnowledgeExistsSlide() {
  const sections = usePresentationContent();
  const s = sections['knowledge-exists'] || '';
  const heading = extractHeading(s) || 'You Already Know Your Stories';
  const paras = extractParagraphs(s);
  const items = extractListItems(s).map(parseListItem);

  return (
    <SlideLayout className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
        {heading}
      </h2>
      <div className="w-full p-5 rounded-lg border-l-4 border-[var(--accent)] bg-[var(--bg-secondary)] mb-6">
        {paras[0] && (
          <p className="text-base text-[var(--text-primary)] leading-relaxed">
            {paras[0]}
          </p>
        )}
        {paras[1] && (
          <p className="text-sm text-[var(--text-secondary)] mt-2">
            {paras[1]}
          </p>
        )}
      </div>
      <div className="w-full grid grid-cols-2 gap-3">
        {items.slice(0, 2).map((item, i) => (
          <div
            key={i}
            className={cn(
              'p-4 rounded-lg border',
              i === 0
                ? 'bg-red-500/10 border-red-500/20'
                : 'bg-green-500/10 border-green-500/20',
            )}
          >
            <h3
              className={cn(
                'font-semibold text-sm mb-2',
                i === 0 ? 'text-red-400' : 'text-green-400',
              )}
            >
              {item.title}
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </SlideLayout>
  );
}

function CoreIdeaSlide() {
  const sections = usePresentationContent();
  const s = sections['core-idea'] || '';
  const heading = extractHeading(s) || '"SELECT, don\'t COMPOSE"';
  const paras = extractParagraphs(s);
  const pills = extractListItems(s);

  return (
    <SlideLayout className="max-w-xl mx-auto">
      <div className="w-full p-6 rounded-lg border-l-4 border-[var(--accent)] bg-[var(--bg-secondary)] mb-8">
        <p className="text-2xl font-bold text-[var(--accent)] mb-2">
          {heading}
        </p>
        {paras[0] && (
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            {paras[0]}
          </p>
        )}
      </div>
      <div className="w-full flex justify-center gap-3 flex-wrap">
        {pills.map((pill, i) => {
          const IconComp = pillIcons[i] || Shield;
          return (
            <div
              key={i}
              className="flex items-center gap-2 px-3 py-2 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20"
            >
              <IconComp className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span className="text-xs text-[var(--accent)] font-medium">
                {pill}
              </span>
            </div>
          );
        })}
      </div>
    </SlideLayout>
  );
}

/* ================================================================== */
/*  ACT 3: ENTER JOB JOURNAL                                          */
/* ================================================================== */

function ProductIntroSlide() {
  const sections = usePresentationContent();
  const s = sections['product-intro'] || '';
  const heading = extractHeading(s) || 'Enter Job Journal';
  const paras = extractParagraphs(s);
  const subtitle = paras[0] || '';
  const rawItems = extractListItems(s).map(parseWorkflowItem);
  const stats = extractTableRows(s);

  return (
    <SlideLayout className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-1">
        {heading}
      </h2>
      {subtitle && (
        <p className="text-sm text-[var(--text-muted)] mb-6">{subtitle}</p>
      )}
      <div className="w-full space-y-2 mb-6">
        {rawItems.map((w) => {
          const IconComp = workflowIcons[w.cmd] || Terminal;
          return (
            <div
              key={w.cmd}
              className="flex items-center gap-2 w-full p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)]"
            >
              <div className="w-8 h-8 rounded bg-[var(--bg-tertiary)] flex items-center justify-center shrink-0">
                <IconComp className="w-4 h-4 text-[var(--text-muted)]" />
              </div>
              <code className="text-sm font-mono text-[var(--accent)] shrink-0">
                {w.cmd}
              </code>
              <ArrowRight className="w-3 h-3 text-[var(--text-muted)] shrink-0" />
              <span className="text-sm text-[var(--text-secondary)]">
                {w.desc}
              </span>
            </div>
          );
        })}
      </div>
      {stats.length > 0 && (
        <div className="w-full flex gap-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex-1 p-3 rounded-lg bg-[var(--accent)]/10 border border-[var(--accent)]/30 text-center"
            >
              <p className="text-xl font-bold text-[var(--accent)]">
                {stat.value}
              </p>
              <p className="text-xs text-[var(--text-muted)]">{stat.label}</p>
            </div>
          ))}
        </div>
      )}
    </SlideLayout>
  );
}

/* ================================================================== */
/*  ACT 4: DEMO                                                        */
/* ================================================================== */

function useDemoContent(sectionId: string) {
  const sections = usePresentationContent();
  const s = sections[sectionId] || '';
  const paras = extractParagraphs(s);
  const caption = extractBlockquote(s);
  return {
    problem: paras[0] || '',
    solution: paras[1] || '',
    caption: caption || undefined,
  };
}

function DemoDashboardSlide() {
  const { problem, solution, caption } = useDemoContent('demo-dashboard');
  return (
    <DemoSlideLayout
      problem={problem}
      problemIcon={Layers}
      problemColor="text-red-400"
      problemBg="bg-red-500/20"
      solution={solution}
      screenshotSrc="/images/job-journal/dashboard.png"
      screenshotAlt="Dashboard"
      screenshotCaption={caption}
    />
  );
}

function DemoScoringSlide() {
  const { problem, solution, caption } = useDemoContent('demo-scoring');
  return (
    <DemoSlideLayout
      problem={problem}
      problemIcon={Search}
      problemColor="text-yellow-400"
      problemBg="bg-yellow-500/20"
      solution={solution}
      screenshotSrc="/images/job-journal/scoring.png"
      screenshotAlt="Scoring Output"
      screenshotCaption={caption}
    />
  );
}

function DemoResumeSlide() {
  const { problem, solution, caption } = useDemoContent('demo-resume');
  return (
    <DemoSlideLayout
      problem={problem}
      problemIcon={FileText}
      problemColor="text-blue-400"
      problemBg="bg-blue-500/20"
      solution={solution}
      screenshotSrc="/images/job-journal/corpus.png"
      screenshotAlt="Resume Generation"
      screenshotCaption={caption}
    />
  );
}

function DemoIntegrationsSlide() {
  const { problem, solution, caption } = useDemoContent('demo-integrations');
  return (
    <DemoSlideLayout
      problem={problem}
      problemIcon={Globe}
      problemColor="text-green-400"
      problemBg="bg-green-500/20"
      solution={solution}
      screenshotSrc="/images/job-journal/map.png"
      screenshotAlt="Gmail Integration"
      screenshotCaption={caption}
    >
      <div className="flex gap-2 mt-4">
        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs text-[var(--text-secondary)]">
          <Globe className="w-3 h-3" />
          Google Maps — Location Lookup
        </span>
        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs text-[var(--text-secondary)]">
          <Mail className="w-3 h-3" />
          Gmail — Status Sync
        </span>
      </div>
    </DemoSlideLayout>
  );
}

function DemoCLISlide() {
  const { problem, solution, caption } = useDemoContent('demo-cli');
  return (
    <DemoSlideLayout
      problem={problem}
      problemIcon={Terminal}
      problemColor="text-purple-400"
      problemBg="bg-purple-500/20"
      solution={solution}
      screenshotSrc="/images/job-journal/cli.png"
      screenshotAlt="Terminal CLI"
      screenshotCaption={caption}
    />
  );
}

/* ================================================================== */
/*  CLOSING                                                            */
/* ================================================================== */

function MetaSlide() {
  const sections = usePresentationContent();
  const s = sections['meta'] || '';
  const paras = extractParagraphs(s);

  return (
    <SlideLayout>
      <Sparkles className="w-8 h-8 text-[var(--accent)] mb-6 opacity-60" />
      <p className="text-2xl font-bold text-[var(--text-primary)] text-center leading-relaxed max-w-lg">
        {paras[0] || 'The resume you reviewed was generated by this tool.'}
      </p>
      <p className="text-sm text-[var(--text-secondary)] mt-4 text-center max-w-md">
        {paras[1] || 'Job Journal wrote the resume. HoganOS presented the case study. Claude Code built them both.'}
      </p>
      <div className="mt-8 flex items-center gap-3 text-xs text-[var(--text-muted)]">
        {(paras[2] || 'Don Hogan | donhogan.com').split('|').map((part, i, arr) => (
          <span key={i} className="flex items-center gap-3">
            {part.trim()}
            {i < arr.length - 1 && (
              <span className="text-[var(--border-color)]">&middot;</span>
            )}
          </span>
        ))}
      </div>
    </SlideLayout>
  );
}

/* ================================================================== */
/*  TECHNICAL APPENDIX                                                 */
/* ================================================================== */

function AppendixTitleSlide() {
  const sections = usePresentationContent();
  const s = sections['appendix-title'] || '';
  const heading = extractHeading(s) || 'Technical Appendix';
  const paras = extractParagraphs(s);

  return (
    <SlideLayout>
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--accent)] to-purple-500 flex items-center justify-center mb-6">
        <Database className="w-8 h-8 text-white" />
      </div>
      <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2 text-center">
        {heading}
      </h2>
      {paras[0] && (
        <p className="text-sm text-[var(--text-muted)] text-center max-w-md">
          {paras[0]}
        </p>
      )}
    </SlideLayout>
  );
}

function PrinciplesSlide() {
  const sections = usePresentationContent();
  const s = sections['principles'] || '';
  const heading = extractHeading(s) || 'Design Principles';
  const items = extractListItems(s).map(parseListItem);

  return (
    <SlideLayout className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
        {heading}
      </h2>
      <div className="w-full grid grid-cols-3 gap-3">
        {items.map((item, i) => {
          const IconComp = principleIcons[i] || Shield;
          return (
            <div
              key={i}
              className="p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] text-center"
            >
              <div className="w-10 h-10 rounded-lg bg-[var(--accent)]/20 flex items-center justify-center mx-auto mb-3">
                <IconComp className="w-5 h-5 text-[var(--accent)]" />
              </div>
              <h3 className="font-semibold text-[var(--text-primary)] text-sm mb-1">
                {item.title}
              </h3>
              <p className="text-xs text-[var(--text-muted)]">{item.text}</p>
            </div>
          );
        })}
      </div>
    </SlideLayout>
  );
}

function ArchitectureSlide() {
  const sections = usePresentationContent();
  const s = sections['architecture'] || '';
  const heading = extractHeading(s) || 'System Architecture';
  const paras = extractParagraphs(s);
  const subtitle = paras[0] || '';
  const pipelineSteps = extractCommaSeparated(s);
  const stats = extractTableRows(s);

  const integrationBadges = [
    { name: 'Gmail', icon: Mail },
    { name: 'Google Docs', icon: FileDown },
    { name: 'Greenhouse.io', icon: Globe },
    { name: 'Google Maps', icon: Globe },
  ];

  return (
    <SlideLayout className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-1">
        {heading}
      </h2>
      {subtitle && (
        <p className="text-sm text-[var(--text-muted)] mb-5">{subtitle}</p>
      )}
      {pipelineSteps.length > 0 && (
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
      )}
      {stats.length > 0 && (
        <div className="w-full grid grid-cols-4 gap-3 mb-5">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] text-center"
            >
              <p className="text-xl font-bold text-[var(--text-primary)]">
                {stat.value}
              </p>
              <p className="text-xs text-[var(--text-muted)]">{stat.label}</p>
            </div>
          ))}
        </div>
      )}
      <div className="w-full flex justify-center gap-2">
        {integrationBadges.map((ig) => (
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

function TradeoffsSlide() {
  const sections = usePresentationContent();
  const s = sections['tradeoffs'] || '';
  const heading = extractHeading(s) || 'Durable Trade-offs';
  const paras = extractParagraphs(s);
  const subtitle = paras[0] || '';
  const items = extractListItems(s).map(parseTradeoffItem);

  return (
    <SlideLayout className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-1">
        {heading}
      </h2>
      {subtitle && (
        <p className="text-sm text-[var(--text-muted)] mb-5">{subtitle}</p>
      )}
      <div className="w-full grid grid-cols-2 gap-3">
        {items.map((t, i) => {
          const IconComp = tradeoffIcons[i] || Lock;
          return (
            <div
              key={i}
              className="p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)]"
            >
              <div className="flex items-center gap-2 mb-2">
                <IconComp className="w-4 h-4 text-[var(--text-muted)]" />
                <span className="text-xs text-[var(--text-muted)]">
                  {t.versus}
                </span>
              </div>
              <p className="text-sm font-semibold text-[var(--accent)] mb-1">
                {t.decision}
              </p>
              <p className="text-xs text-[var(--text-secondary)]">{t.why}</p>
            </div>
          );
        })}
      </div>
    </SlideLayout>
  );
}

function NumbersSlide() {
  const sections = usePresentationContent();
  const s = sections['numbers'] || '';
  const heading = extractHeading(s) || 'By the Numbers';
  const paras = extractParagraphs(s);
  const subtitle = paras[0] || '';
  const stats = extractTableRows(s);

  return (
    <SlideLayout className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-1">
        {heading}
      </h2>
      {subtitle && (
        <p className="text-sm text-[var(--text-muted)] mb-6">{subtitle}</p>
      )}
      <div className="w-full grid grid-cols-3 gap-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="p-5 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] text-center"
          >
            <p className="text-3xl font-bold text-[var(--accent)]">
              {stat.value}
            </p>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </SlideLayout>
  );
}

function WhatsNextSlide() {
  const sections = usePresentationContent();
  const s = sections['whats-next'] || '';
  const heading = extractHeading(s) || "What's Next";
  const paras = extractParagraphs(s);
  const subtitle = paras[0] || '';
  const items = extractListItems(s).map(parseRoadmapItem);

  return (
    <SlideLayout className="items-start max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-1">
        {heading}
      </h2>
      {subtitle && (
        <p className="text-sm text-[var(--text-muted)] mb-5">{subtitle}</p>
      )}
      <div className="w-full space-y-3">
        {items.map((r, i) => (
          <div
            key={i}
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
                    roadmapColors[r.status] || 'bg-[var(--accent)]/20 text-[var(--accent)]',
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
/*  Export                                                              */
/* ------------------------------------------------------------------ */

export const jobJournalSlides: React.ComponentType[] = [
  TitleSlide,
  BrutalMathSlide,
  EmotionalCycleSlide,
  KnowledgeExistsSlide,
  CoreIdeaSlide,
  ProductIntroSlide,
  DemoDashboardSlide,
  DemoScoringSlide,
  DemoResumeSlide,
  DemoIntegrationsSlide,
  DemoCLISlide,
  MetaSlide,
  AppendixTitleSlide,
  PrinciplesSlide,
  ArchitectureSlide,
  TradeoffsSlide,
  NumbersSlide,
  WhatsNextSlide,
];
