'use client';

import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Bell,
  Brain,
  CheckCircle2,
  Clock,
  DollarSign,
  FileText,
  Heart,
  Layers,
  LineChart,
  Mail,
  MessageSquare,
  Search,
  Sparkles,
  TrendingUp,
  Users,
  XCircle,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useHealthTechContent } from '@/hooks/useHealthTechContent';
import {
  extractHeading,
  extractSubheading,
  extractBlockquote,
  extractListItems,
  extractParagraphs,
  extractTableRows,
  parseListItem,
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

/* ================================================================== */
/*  Icon / color maps                                                   */
/* ================================================================== */

const situationIcons: LucideIcon[] = [BarChart3, Clock, Layers];
const situationColors = ['text-red-400', 'text-yellow-400', 'text-blue-400'];
const situationBgs = ['bg-red-500/20', 'bg-yellow-500/20', 'bg-blue-500/20'];

const funnelIcons: LucideIcon[] = [AlertTriangle, XCircle, Heart];
const funnelColors = ['text-red-400', 'text-yellow-400', 'text-blue-400'];
const funnelBgs = ['bg-red-500/20', 'bg-yellow-500/20', 'bg-blue-500/20'];

const releaseColors: Record<string, { text: string; bg: string }> = {
  'Oct 14': { text: 'text-red-400', bg: 'bg-red-500/20' },
  'Sep 16': { text: 'text-green-400', bg: 'bg-green-500/20' },
  'Oct 28': { text: 'text-green-400', bg: 'bg-green-500/20' },
  Registration: { text: 'text-yellow-400', bg: 'bg-yellow-500/20' },
};

const signalIcons: LucideIcon[] = [CheckCircle2, MessageSquare, Users];
const signalColors = ['text-green-400', 'text-blue-400', 'text-red-400'];
const signalBgs = ['bg-green-500/20', 'bg-blue-500/20', 'bg-red-500/20'];

const mentalModelIcons: LucideIcon[] = [
  Search,
  Heart,
  AlertTriangle,
  Layers,
  Brain,
];
const mentalModelColors = [
  'text-blue-400',
  'text-red-400',
  'text-yellow-400',
  'text-purple-400',
  'text-green-400',
];
const mentalModelBgs = [
  'bg-blue-500/20',
  'bg-red-500/20',
  'bg-yellow-500/20',
  'bg-purple-500/20',
  'bg-green-500/20',
];

const frameworkIcons: LucideIcon[] = [Heart, TrendingUp, AlertTriangle, Sparkles];
const frameworkColors = [
  'text-purple-400',
  'text-green-400',
  'text-red-400',
  'text-blue-400',
];
const frameworkBgs = [
  'bg-purple-500/20',
  'bg-green-500/20',
  'bg-red-500/20',
  'bg-blue-500/20',
];

const initiativeIcons: LucideIcon[] = [MessageSquare, Layers, Mail, Bell];
const initiativeColors = [
  'text-blue-400',
  'text-green-400',
  'text-yellow-400',
  'text-purple-400',
];
const initiativeBgs = [
  'bg-blue-500/20',
  'bg-green-500/20',
  'bg-yellow-500/20',
  'bg-purple-500/20',
];

const notBuildIcons: LucideIcon[] = [XCircle, XCircle, XCircle, XCircle];

const deliverableIcons: LucideIcon[] = [
  BarChart3,
  Layers,
  FileText,
  TrendingUp,
  Activity,
];
const deliverableColors = [
  'text-blue-400',
  'text-purple-400',
  'text-green-400',
  'text-yellow-400',
  'text-red-400',
];
const deliverableBgs = [
  'bg-blue-500/20',
  'bg-purple-500/20',
  'bg-green-500/20',
  'bg-yellow-500/20',
  'bg-red-500/20',
];

const learningIcons: LucideIcon[] = [LineChart, Brain, Users];
const learningColors = ['text-green-400', 'text-purple-400', 'text-blue-400'];
const learningBgs = ['bg-green-500/20', 'bg-purple-500/20', 'bg-blue-500/20'];

/* ================================================================== */
/*  ACT 1: THE PROBLEM                                                 */
/* ================================================================== */

function TitleSlide() {
  const sections = useHealthTechContent();
  const s = sections['ht-title'] || '';
  const heading = extractHeading(s) || 'The 73% Problem';
  const subtitle =
    extractSubheading(s) ||
    'Data-Driven Growth Strategy for Senior Healthcare AI';
  const paras = extractParagraphs(s);

  return (
    <SlideLayout>
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-6">
        <Activity className="w-10 h-10 text-white" />
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
        {(paras[1] || 'Don Hogan | Principal PM, Growth | November 2025')
          .split('|')
          .map((part, i, arr) => (
            <span key={i} className="flex items-center gap-3">
              {part.trim()}
              {i < arr.length - 1 && (
                <span className="text-[var(--border-color)]">|</span>
              )}
            </span>
          ))}
      </div>
      <span className="mt-4 px-3 py-1 rounded-full text-xs bg-emerald-500/20 text-emerald-400">
        Healthcare AI Growth
      </span>
    </SlideLayout>
  );
}

function SituationSlide() {
  const sections = useHealthTechContent();
  const s = sections['ht-situation'] || '';
  const heading = extractHeading(s) || 'The Situation';
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
        <p className="text-sm text-[var(--text-muted)] mb-4 leading-relaxed">
          {subtitle}
        </p>
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
                situationBgs[i] || 'bg-[var(--accent)]/20',
              )}
            >
              {(() => {
                const IconComp = situationIcons[i] || BarChart3;
                return (
                  <IconComp
                    className={cn(
                      'w-5 h-5',
                      situationColors[i] || 'text-[var(--accent)]',
                    )}
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
        <div className="w-full mt-3 p-3 rounded-lg border-l-4 border-emerald-500 bg-[var(--bg-secondary)]">
          <p className="text-sm text-[var(--text-secondary)] italic">
            &ldquo;{quote}&rdquo;
          </p>
        </div>
      )}
    </SlideLayout>
  );
}

function FunnelSlide() {
  const sections = useHealthTechContent();
  const s = sections['ht-funnel'] || '';
  const heading = extractHeading(s) || 'The Activation Funnel';
  const paras = extractParagraphs(s);
  const subtitle = paras[0] || '';
  const stats = extractTableRows(s);
  const items = extractListItems(s).map(parseListItem);

  return (
    <SlideLayout className="items-start max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-1">
        {heading}
      </h2>
      {subtitle && (
        <p className="text-sm text-[var(--text-muted)] mb-4">{subtitle}</p>
      )}
      {stats.length > 0 && (
        <div className="w-full mb-4">
          <div className="space-y-1.5">
            {stats.map((stat, i) => {
              const widths = ['100%', '54%', '45%', '36%', '16.5%'];
              const isLast = i === stats.length - 1;
              return (
                <div key={stat.label} className="flex items-center gap-3">
                  <div className="w-20 text-right text-sm font-mono text-[var(--text-primary)] shrink-0">
                    {stat.value}
                  </div>
                  <div className="flex-1">
                    <div
                      className={cn(
                        'h-8 rounded flex items-center px-3 transition-all',
                        isLast
                          ? 'bg-red-500/30 border border-red-500/40'
                          : 'bg-emerald-500/20 border border-emerald-500/30',
                      )}
                      style={{ width: widths[i] || '100%' }}
                    >
                      <span
                        className={cn(
                          'text-xs font-medium truncate',
                          isLast ? 'text-red-400' : 'text-emerald-400',
                        )}
                      >
                        {stat.label}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <div className="w-full space-y-2">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex gap-3 p-2.5 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)]"
          >
            <div
              className={cn(
                'w-8 h-8 rounded-lg flex items-center justify-center shrink-0',
                funnelBgs[i] || 'bg-[var(--accent)]/20',
              )}
            >
              {(() => {
                const IconComp = funnelIcons[i] || AlertTriangle;
                return (
                  <IconComp
                    className={cn(
                      'w-4 h-4',
                      funnelColors[i] || 'text-[var(--accent)]',
                    )}
                  />
                );
              })()}
            </div>
            <div>
              <h3 className="font-semibold text-sm text-[var(--text-primary)]">
                {item.title}
              </h3>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </SlideLayout>
  );
}

function ReleasesSlide() {
  const sections = useHealthTechContent();
  const s = sections['ht-releases'] || '';
  const heading = extractHeading(s) || 'Feature Releases & Metric Correlation';
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
        {items.map((item, i) => {
          const key = Object.keys(releaseColors).find((k) =>
            item.title.startsWith(k),
          );
          const colors = key
            ? releaseColors[key]
            : { text: 'text-yellow-400', bg: 'bg-yellow-500/20' };
          const isNegative =
            item.text.toLowerCase().includes('decreased') ||
            item.text.toLowerCase().includes('zero impact');
          const icon = isNegative ? TrendingUp : TrendingUp;
          return (
            <div
              key={i}
              className="flex gap-3 p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)]"
            >
              <div
                className={cn(
                  'w-9 h-9 rounded-lg flex items-center justify-center shrink-0',
                  colors.bg,
                )}
              >
                <TrendingUp
                  className={cn(
                    'w-4 h-4',
                    colors.text,
                    isNegative && 'rotate-180',
                  )}
                />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-[var(--text-primary)]">
                  {item.title}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                  {item.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      {quote && (
        <div className="w-full mt-3 p-3 rounded-lg border-l-4 border-emerald-500 bg-[var(--bg-secondary)]">
          <p className="text-sm text-[var(--text-secondary)] italic">
            &ldquo;{quote}&rdquo;
          </p>
        </div>
      )}
    </SlideLayout>
  );
}

/* ================================================================== */
/*  ACT 2: THE DISCOVERY                                               */
/* ================================================================== */

function FoundationSlide() {
  const sections = useHealthTechContent();
  const s = sections['ht-foundation'] || '';
  const heading =
    extractHeading(s) || 'Building the Analytics Foundation';
  const paras = extractParagraphs(s);
  const subtitle = paras[0] || '';
  const items = extractListItems(s).map(parseListItem);
  const stats = extractTableRows(s);

  return (
    <SlideLayout className="items-start max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-1">
        {heading}
      </h2>
      {subtitle && (
        <p className="text-sm text-[var(--text-muted)] mb-4">{subtitle}</p>
      )}
      <div className="w-full space-y-2 mb-4">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex gap-3 p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)]"
          >
            <div
              className={cn(
                'w-9 h-9 rounded-lg flex items-center justify-center shrink-0',
                deliverableBgs[i] || 'bg-[var(--accent)]/20',
              )}
            >
              {(() => {
                const IconComp = deliverableIcons[i] || BarChart3;
                return (
                  <IconComp
                    className={cn(
                      'w-4 h-4',
                      deliverableColors[i] || 'text-[var(--accent)]',
                    )}
                  />
                );
              })()}
            </div>
            <div>
              <h3 className="font-semibold text-sm text-[var(--text-primary)]">
                {item.title}
              </h3>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </div>
      {stats.length > 0 && (
        <div className="w-full flex gap-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex-1 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-center"
            >
              <p className="text-xl font-bold text-emerald-400">{stat.value}</p>
              <p className="text-xs text-[var(--text-muted)]">{stat.label}</p>
            </div>
          ))}
        </div>
      )}
    </SlideLayout>
  );
}

function SignalSlide() {
  const sections = useHealthTechContent();
  const s = sections['ht-signal'] || '';
  const heading = extractHeading(s) || 'The 97.5% Signal';
  const paras = extractParagraphs(s);
  const subtitle = paras[0] || '';
  const items = extractListItems(s).map(parseListItem);
  const quote = extractBlockquote(s);

  return (
    <SlideLayout className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-1">
        {heading}
      </h2>
      {subtitle && (
        <p className="text-sm text-[var(--text-muted)] mb-6">{subtitle}</p>
      )}
      <div className="w-full grid grid-cols-3 gap-3 mb-4">
        {items.map((item, i) => (
          <div
            key={i}
            className={cn(
              'p-4 rounded-lg border text-center',
              signalBgs[i],
              `border-${signalColors[i]?.replace('text-', '')}/30`,
            )}
            style={{
              borderColor:
                i === 0
                  ? 'rgba(74, 222, 128, 0.3)'
                  : i === 1
                    ? 'rgba(96, 165, 250, 0.3)'
                    : 'rgba(248, 113, 113, 0.3)',
            }}
          >
            <div
              className={cn(
                'w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2',
                signalBgs[i],
              )}
            >
              {(() => {
                const IconComp = signalIcons[i] || CheckCircle2;
                return (
                  <IconComp className={cn('w-5 h-5', signalColors[i])} />
                );
              })()}
            </div>
            <h3
              className={cn(
                'font-bold text-lg',
                signalColors[i],
              )}
            >
              {item.title.split(':')[0]}
            </h3>
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              {item.text}
            </p>
          </div>
        ))}
      </div>
      {quote && (
        <div className="w-full p-3 rounded-lg border-l-4 border-emerald-500 bg-[var(--bg-secondary)]">
          <p className="text-sm text-[var(--text-secondary)] italic">
            &ldquo;{quote}&rdquo;
          </p>
        </div>
      )}
    </SlideLayout>
  );
}

function TimeToValueSlide() {
  const sections = useHealthTechContent();
  const s = sections['ht-time-to-value'] || '';
  const heading = extractHeading(s) || 'Time-to-Value Analysis';
  const paras = extractParagraphs(s);
  const subtitle = paras[0] || '';
  const items = extractListItems(s).map(parseListItem);
  const stats = extractTableRows(s);
  const quote = extractBlockquote(s);

  return (
    <SlideLayout className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-1">
        {heading}
      </h2>
      {subtitle && (
        <p className="text-sm text-[var(--text-muted)] mb-5">{subtitle}</p>
      )}
      {stats.length > 0 && (
        <div className="w-full flex gap-3 mb-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={cn(
                'flex-1 p-4 rounded-lg border text-center',
                i === 0
                  ? 'bg-green-500/10 border-green-500/30'
                  : i === 1
                    ? 'bg-red-500/10 border-red-500/30'
                    : 'bg-yellow-500/10 border-yellow-500/30',
              )}
            >
              <p
                className={cn(
                  'text-2xl font-bold',
                  i === 0
                    ? 'text-green-400'
                    : i === 1
                      ? 'text-red-400'
                      : 'text-yellow-400',
                )}
              >
                {stat.value}
              </p>
              <p className="text-xs text-[var(--text-muted)] mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      )}
      <div className="w-full space-y-2 mb-3">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex gap-3 p-2.5 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)]"
          >
            <div
              className={cn(
                'w-8 h-8 rounded-lg flex items-center justify-center shrink-0',
                i === 0
                  ? 'bg-green-500/20'
                  : i === 1
                    ? 'bg-red-500/20'
                    : 'bg-yellow-500/20',
              )}
            >
              <Clock
                className={cn(
                  'w-4 h-4',
                  i === 0
                    ? 'text-green-400'
                    : i === 1
                      ? 'text-red-400'
                      : 'text-yellow-400',
                )}
              />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-[var(--text-primary)]">
                {item.title}
              </h3>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </div>
      {quote && (
        <div className="w-full p-3 rounded-lg border-l-4 border-emerald-500 bg-[var(--bg-secondary)]">
          <p className="text-sm text-[var(--text-secondary)] italic">
            &ldquo;{quote}&rdquo;
          </p>
        </div>
      )}
    </SlideLayout>
  );
}

function MentalModelsSlide() {
  const sections = useHealthTechContent();
  const s = sections['ht-mental-models'] || '';
  const heading =
    extractHeading(s) || 'Five Mental Models Blocking Adoption';
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
            className="flex gap-3 p-2.5 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)]"
          >
            <div
              className={cn(
                'w-8 h-8 rounded-lg flex items-center justify-center shrink-0',
                mentalModelBgs[i] || 'bg-[var(--accent)]/20',
              )}
            >
              {(() => {
                const IconComp = mentalModelIcons[i] || Brain;
                return (
                  <IconComp
                    className={cn(
                      'w-4 h-4',
                      mentalModelColors[i] || 'text-[var(--accent)]',
                    )}
                  />
                );
              })()}
            </div>
            <div>
              <h3 className="font-semibold text-sm text-[var(--text-primary)]">
                {item.title}
              </h3>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </div>
      {quote && (
        <div className="w-full mt-3 p-3 rounded-lg border-l-4 border-emerald-500 bg-[var(--bg-secondary)]">
          <p className="text-sm text-[var(--text-secondary)] italic">
            &ldquo;{quote}&rdquo;
          </p>
        </div>
      )}
    </SlideLayout>
  );
}

/* ================================================================== */
/*  ACT 3: THE STRATEGY                                                */
/* ================================================================== */

function FrameworkSlide() {
  const sections = useHealthTechContent();
  const s = sections['ht-framework'] || '';
  const heading = extractHeading(s) || 'The Strategic Framework';
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
                'w-9 h-9 rounded-lg flex items-center justify-center shrink-0',
                frameworkBgs[i] || 'bg-[var(--accent)]/20',
              )}
            >
              {(() => {
                const IconComp = frameworkIcons[i] || Heart;
                return (
                  <IconComp
                    className={cn(
                      'w-4 h-4',
                      frameworkColors[i] || 'text-[var(--accent)]',
                    )}
                  />
                );
              })()}
            </div>
            <div>
              <h3 className="font-semibold text-sm text-[var(--text-primary)]">
                {item.title}
              </h3>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </div>
      {quote && (
        <div className="w-full mt-3 p-3 rounded-lg border-l-4 border-emerald-500 bg-[var(--bg-secondary)]">
          <p className="text-sm text-[var(--text-secondary)] italic">
            &ldquo;{quote}&rdquo;
          </p>
        </div>
      )}
    </SlideLayout>
  );
}

function InitiativesSlide() {
  const sections = useHealthTechContent();
  const s = sections['ht-initiatives'] || '';
  const heading = extractHeading(s) || 'P0 Initiatives';
  const paras = extractParagraphs(s);
  const subtitle = paras[0] || '';
  const items = extractListItems(s).map(parseListItem);

  return (
    <SlideLayout className="items-start max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-1">
        {heading}
      </h2>
      {subtitle && (
        <p className="text-sm text-[var(--text-muted)] mb-4">{subtitle}</p>
      )}
      <div className="w-full grid grid-cols-2 gap-3">
        {items.map((item, i) => (
          <div
            key={i}
            className="p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)]"
          >
            <div className="flex items-center gap-2 mb-2">
              <div
                className={cn(
                  'w-8 h-8 rounded-lg flex items-center justify-center shrink-0',
                  initiativeBgs[i] || 'bg-[var(--accent)]/20',
                )}
              >
                {(() => {
                  const IconComp = initiativeIcons[i] || Sparkles;
                  return (
                    <IconComp
                      className={cn(
                        'w-4 h-4',
                        initiativeColors[i] || 'text-[var(--accent)]',
                      )}
                    />
                  );
                })()}
              </div>
              <h3 className="font-semibold text-sm text-[var(--text-primary)]">
                {item.title}
              </h3>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </SlideLayout>
  );
}

function NotBuildSlide() {
  const sections = useHealthTechContent();
  const s = sections['ht-not-build'] || '';
  const heading = extractHeading(s) || 'What NOT to Build';
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
            className="flex gap-3 p-3 rounded-lg bg-[var(--bg-secondary)] border border-red-500/20"
          >
            <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-red-500/20">
              <XCircle className="w-4 h-4 text-red-400" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-[var(--text-primary)]">
                {item.title}
              </h3>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </div>
      {quote && (
        <div className="w-full mt-3 p-3 rounded-lg border-l-4 border-emerald-500 bg-[var(--bg-secondary)]">
          <p className="text-sm text-[var(--text-secondary)] italic">
            &ldquo;{quote}&rdquo;
          </p>
        </div>
      )}
    </SlideLayout>
  );
}

/* ================================================================== */
/*  ACT 4: THE IMPACT                                                  */
/* ================================================================== */

function WaterfallSlide() {
  const sections = useHealthTechContent();
  const s = sections['ht-waterfall'] || '';
  const heading = extractHeading(s) || 'The Impact Model';
  const paras = extractParagraphs(s);
  const subtitle = paras[0] || '';
  const stats = extractTableRows(s);
  const items = extractListItems(s).map(parseListItem);

  const barColors = [
    'bg-red-500/40',
    'bg-yellow-500/40',
    'bg-blue-500/40',
    'bg-emerald-500/40',
    'bg-green-500/40',
  ];
  const textColors = [
    'text-red-400',
    'text-yellow-400',
    'text-blue-400',
    'text-emerald-400',
    'text-green-400',
  ];

  return (
    <SlideLayout className="items-start max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-1">
        {heading}
      </h2>
      {subtitle && (
        <p className="text-sm text-[var(--text-muted)] mb-4">{subtitle}</p>
      )}
      {stats.length > 0 && (
        <div className="w-full mb-4 space-y-2">
          {stats.map((stat, i) => {
            const pct = parseFloat(stat.value);
            const width = `${Math.min((pct / 15) * 100, 100)}%`;
            return (
              <div key={stat.label} className="flex items-center gap-3">
                <div className="w-12 text-right text-sm font-mono font-bold shrink-0">
                  <span className={textColors[i] || 'text-[var(--accent)]'}>
                    {stat.value}
                  </span>
                </div>
                <div className="flex-1">
                  <div
                    className={cn(
                      'h-8 rounded flex items-center px-3',
                      barColors[i] || 'bg-[var(--accent)]/30',
                    )}
                    style={{ width }}
                  >
                    <span className="text-xs text-[var(--text-secondary)] truncate">
                      {stat.label}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div className="w-full space-y-2">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex gap-3 p-2.5 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)]"
          >
            <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-sm text-[var(--text-primary)]">
                {item.title}
              </h3>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </SlideLayout>
  );
}

function BusinessImpactSlide() {
  const sections = useHealthTechContent();
  const s = sections['ht-business'] || '';
  const heading = extractHeading(s) || 'Business Impact';
  const paras = extractParagraphs(s);
  const subtitle = paras[0] || '';
  const items = extractListItems(s).map(parseListItem);
  const stats = extractTableRows(s);

  return (
    <SlideLayout className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-1">
        {heading}
      </h2>
      {subtitle && (
        <p className="text-sm text-[var(--text-muted)] mb-5">{subtitle}</p>
      )}
      {stats.length > 0 && (
        <div className="w-full grid grid-cols-4 gap-3 mb-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={cn(
                'p-3 rounded-lg border text-center',
                i === 2
                  ? 'bg-emerald-500/10 border-emerald-500/30'
                  : 'bg-[var(--bg-secondary)] border-[var(--border-color)]',
              )}
            >
              <p
                className={cn(
                  'text-xl font-bold',
                  i === 2 ? 'text-emerald-400' : 'text-[var(--text-primary)]',
                )}
              >
                {stat.value}
              </p>
              <p className="text-xs text-[var(--text-muted)]">{stat.label}</p>
            </div>
          ))}
        </div>
      )}
      <div className="w-full space-y-2">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex gap-3 p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)]"
          >
            <div
              className={cn(
                'w-9 h-9 rounded-lg flex items-center justify-center shrink-0',
                i === 0
                  ? 'bg-green-500/20'
                  : i === 1
                    ? 'bg-blue-500/20'
                    : i === 2
                      ? 'bg-purple-500/20'
                      : 'bg-yellow-500/20',
              )}
            >
              {(() => {
                const icons = [DollarSign, Heart, LineChart, TrendingUp];
                const colors = [
                  'text-green-400',
                  'text-blue-400',
                  'text-purple-400',
                  'text-yellow-400',
                ];
                const IconComp = icons[i] || DollarSign;
                return <IconComp className={cn('w-4 h-4', colors[i])} />;
              })()}
            </div>
            <div>
              <h3 className="font-semibold text-sm text-[var(--text-primary)]">
                {item.title}
              </h3>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </SlideLayout>
  );
}

function DeliverablesSlide() {
  const sections = useHealthTechContent();
  const s = sections['ht-deliverables'] || '';
  const heading = extractHeading(s) || 'What I Delivered';
  const paras = extractParagraphs(s);
  const subtitle = paras[0] || '';
  const items = extractListItems(s).map(parseListItem);
  const stats = extractTableRows(s);

  return (
    <SlideLayout className="items-start max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-1">
        {heading}
      </h2>
      {subtitle && (
        <p className="text-sm text-[var(--text-muted)] mb-4">{subtitle}</p>
      )}
      <div className="w-full space-y-2 mb-4">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex gap-3 p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)]"
          >
            <div
              className={cn(
                'w-9 h-9 rounded-lg flex items-center justify-center shrink-0',
                deliverableBgs[i] || 'bg-[var(--accent)]/20',
              )}
            >
              {(() => {
                const IconComp = deliverableIcons[i] || FileText;
                return (
                  <IconComp
                    className={cn(
                      'w-4 h-4',
                      deliverableColors[i] || 'text-[var(--accent)]',
                    )}
                  />
                );
              })()}
            </div>
            <div>
              <h3 className="font-semibold text-sm text-[var(--text-primary)]">
                {item.title}
              </h3>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </div>
      {stats.length > 0 && (
        <div className="w-full flex gap-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex-1 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-center"
            >
              <p className="text-xl font-bold text-emerald-400">{stat.value}</p>
              <p className="text-xs text-[var(--text-muted)]">{stat.label}</p>
            </div>
          ))}
        </div>
      )}
    </SlideLayout>
  );
}

/* ================================================================== */
/*  CLOSING                                                            */
/* ================================================================== */

function LearningsSlide() {
  const sections = useHealthTechContent();
  const s = sections['ht-learnings'] || '';
  const heading = extractHeading(s) || 'Key Learnings';
  const paras = extractParagraphs(s);
  const subtitle = paras[0] || '';
  const items = extractListItems(s).map(parseListItem);
  const quote = extractBlockquote(s);

  return (
    <SlideLayout className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-1">
        {heading}
      </h2>
      {subtitle && (
        <p className="text-sm text-[var(--text-muted)] mb-6">{subtitle}</p>
      )}
      <div className="w-full grid grid-cols-3 gap-3">
        {items.map((item, i) => (
          <div
            key={i}
            className="p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] text-center"
          >
            <div
              className={cn(
                'w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3',
                learningBgs[i] || 'bg-[var(--accent)]/20',
              )}
            >
              {(() => {
                const IconComp = learningIcons[i] || Brain;
                return (
                  <IconComp
                    className={cn('w-5 h-5', learningColors[i])}
                  />
                );
              })()}
            </div>
            <h3 className="font-semibold text-sm text-[var(--text-primary)] mb-1">
              {item.title}
            </h3>
            <p className="text-xs text-[var(--text-muted)]">{item.text}</p>
          </div>
        ))}
      </div>
      {quote && (
        <div className="w-full mt-4 p-3 rounded-lg border-l-4 border-emerald-500 bg-[var(--bg-secondary)]">
          <p className="text-sm text-[var(--text-secondary)] italic">
            &ldquo;{quote}&rdquo;
          </p>
        </div>
      )}
    </SlideLayout>
  );
}

function ClosingSlide() {
  const sections = useHealthTechContent();
  const s = sections['ht-closing'] || '';
  const paras = extractParagraphs(s);

  return (
    <SlideLayout>
      <Sparkles className="w-8 h-8 text-emerald-400 mb-6 opacity-60" />
      <p className="text-2xl font-bold text-[var(--text-primary)] text-center leading-relaxed max-w-lg">
        {paras[0] ||
          'This case study was built with the same tools used to build this portfolio.'}
      </p>
      <p className="text-sm text-[var(--text-secondary)] mt-4 text-center max-w-md">
        {paras[1] ||
          'Analytics drove the strategy. Strategy shaped the roadmap. The data told the story.'}
      </p>
      <div className="mt-8 flex items-center gap-3 text-xs text-[var(--text-muted)]">
        {(paras[2] || 'Don Hogan | donhogan.com | Principal PM, Growth')
          .split('|')
          .map((part, i, arr) => (
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

/* ------------------------------------------------------------------ */
/*  Export                                                              */
/* ------------------------------------------------------------------ */

export const healthTechSlides: React.ComponentType[] = [
  TitleSlide,
  SituationSlide,
  FunnelSlide,
  ReleasesSlide,
  FoundationSlide,
  SignalSlide,
  TimeToValueSlide,
  MentalModelsSlide,
  FrameworkSlide,
  InitiativesSlide,
  NotBuildSlide,
  WaterfallSlide,
  BusinessImpactSlide,
  DeliverablesSlide,
  LearningsSlide,
  ClosingSlide,
];
