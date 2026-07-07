'use client';

import { useState } from 'react';
import { useWindowStore } from '@/stores/windowStore';
import { profile } from '@/data/profile';
import { cn } from '@/lib/utils';
import {
  Sparkles,
  Brain,
  Users,
  Code,
  Layers,
  HeartPulse,
  CheckCircle2,
  ArrowRight,
  Target,
  TrendingUp,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';

interface StrengthSection {
  id: string;
  title: string;
  icon: React.ElementType;
  summary: string;
  evidence: string[];
}

const strengthSections: StrengthSection[] = [
  {
    id: 'growth',
    title: 'Growth & Experimentation',
    icon: TrendingUp,
    summary: 'Turning experimentation into revenue, activation, and retention — not vanity metrics.',
    evidence: [
      'Mattermost: drove self-serve signups +270% and Day 14 activation from 8% to 25%',
      'Indeed: built an experimentation platform serving 5 teams — testing velocity +600%, win rate +150%',
      'ZenBusiness: new self-serve acquisition funnels drove an 8% conversion lift (~1,500 new customers/day)',
      'Clearhead: 400+ experiments at a 36% win rate and 10x ROI — killed more bad ideas than shipped',
    ],
  },
  {
    id: 'health-tech',
    title: 'Health-Tech Depth',
    icon: HeartPulse,
    summary: 'Products where compliance, trust, and multi-stakeholder coordination are the hard part.',
    evidence: [
      'Now: improving conversion for new cancer patients at Memorial Sloan Kettering (~20% — thousands of patients annually)',
      'GetHealthy: B2B2C platform enabling physician practices to bill CMS (Medicare) for care management',
      'Built multi-agent AI workflows across EMRs — Epic, Cerner, and Athena',
      'Wellcore: 0→1 consumer health platform, $100K→$1.8M ARR; orchestrated patients, providers, labs, and pharmacies',
    ],
  },
  {
    id: 'ai-native',
    title: 'AI-Native Product Practice',
    icon: Brain,
    summary: 'Uses AI to think better and move faster; designs products that leverage it responsibly.',
    evidence: [
      'Led launch of a multi-agent AI orchestration system: 5 specialized agents interpreting intent, reasoning through workflows, executing autonomously',
      'Defined product vision for agentic work management: task routing, agent handoffs, persistent context, human-in-the-loop escalation',
      'Built this entire portfolio site (HoganOS) with Claude Code',
      'Daily AI practice across discovery, prototyping, code generation, and strategic analysis',
    ],
  },
  {
    id: 'customer-obsessed',
    title: 'Customer-Problem Obsessed',
    icon: Users,
    summary: 'Success is problems eliminated and outcomes achieved, not features shipped.',
    evidence: [
      'Wellcore: reduced churn 60% by identifying repeated data entry as the core friction',
      'Worked backwards from customer goals to shape roadmap priorities and innovation bets',
      '"What problem are we solving?" is the first question, always',
      'Outcomes > outputs: every resume bullet is a metric, not a feature list',
    ],
  },
  {
    id: 'technical',
    title: 'Technically Fluent',
    icon: Code,
    summary: 'Engages deeply with engineers on architecture, trade-offs, and scalability.',
    evidence: [
      'Hands-on: SQL, Python, TypeScript/React, Swift — ships production code in side projects, not just specs',
      'Wellcore: led a full-stack health platform build, making tech decisions alongside engineering',
      'Can read a PR, debate an architecture decision, and know when to defer to eng',
    ],
  },
  {
    id: 'systems-thinker',
    title: 'Systems Thinker',
    icon: Layers,
    summary: 'Thinks beyond individual screens to platforms, workflows, and ecosystems.',
    evidence: [
      'Indeed: experimentation platform that enabled 5 downstream teams to run their own tests',
      'Wellcore: designed a patient–provider–lab–pharmacy ecosystem, not just screens',
      'Growth PM mindset = understanding the full funnel, not just one step',
    ],
  },
];

const keyAccomplishments = [
  {
    title: 'Zero-to-One: Wellcore',
    description: 'Owned the full product lifecycle for a consumer health platform: grew ARR from $100K to $1.8M, acquisition +1150% YoY, churn −60%, LTV +112% — with a 7-person company.',
    impact: 'Business results',
  },
  {
    title: 'Activation at Scale: Mattermost',
    description: 'Owned acquisition and activation for the cloud collaboration platform — self-serve signups +270%, Day 14 activation from 8% to 25%. Established a cross-functional Growth Tiger Team.',
    impact: 'Growth leadership',
  },
  {
    title: 'Platform Enablement: Indeed',
    description: 'Built a scalable experimentation platform serving 5 internal teams — testing velocity +600%, win rate +150% — and mentored practitioners to build a testing culture.',
    impact: 'Platform enablement',
  },
  {
    title: 'Revenue Impact: SONOS Checkout',
    description: 'Shipped the SONOS checkout redesign from conception through launch at Clearhead — $12MM YoY revenue impact.',
    impact: 'Revenue',
  },
];

export function ReadmeWindow() {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['growth', 'health-tech'])
  );
  const { openWindow } = useWindowStore();

  const toggleSection = (id: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedSections(newExpanded);
  };

  const handleOpenWindow = (id: string, title: string) => {
    openWindow(id, title, id);
  };

  return (
    <div className="h-full overflow-auto">
      {/* Compact Header */}
      <div className="p-4 bg-gradient-to-br from-[var(--accent)]/20 via-purple-500/10 to-pink-500/10 border-b border-[var(--border-color)]">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--accent)] to-purple-500 flex items-center justify-center shrink-0">
            <Target className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-[var(--text-primary)]">{profile.name}</h1>
            <p className="text-[var(--text-secondary)] text-xs">
              {profile.title} — {profile.location}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          {['Growth & Experimentation', 'Health Tech', 'AI-Native'].map((chip) => (
            <span
              key={chip}
              className="px-2 py-0.5 text-xs rounded-full bg-[var(--bg-tertiary)] text-[var(--text-muted)]"
            >
              {chip}
            </span>
          ))}
        </div>
        <div className="flex items-start gap-2 text-xs text-[var(--text-secondary)] bg-[var(--bg-secondary)]/50 rounded p-2">
          <Sparkles className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
          <p>
            <span className="font-medium text-[var(--text-primary)]">TL;DR:</span>{' '}
            {profile.pitch} {profile.summary}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div>
        {/* Strength Sections */}
        <div className="p-4">
          <h2 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-3">
            What I Do Best
          </h2>

          <div className="space-y-2">
            {strengthSections.map((section) => {
              const isExpanded = expandedSections.has(section.id);
              const Icon = section.icon;

              return (
                <div
                  key={section.id}
                  className={cn(
                    'rounded-lg border border-[var(--border-color)]',
                    'bg-[var(--bg-secondary)]'
                  )}
                >
                  <button
                    onClick={() => toggleSection(section.id)}
                    className={cn(
                      'w-full flex items-center gap-3 p-3',
                      'hover:bg-[var(--bg-tertiary)] transition-colors',
                      'text-left rounded-lg'
                    )}
                  >
                    <div className="w-8 h-8 rounded-lg bg-[var(--bg-tertiary)] flex items-center justify-center">
                      <Icon className="w-4 h-4 text-[var(--accent)]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-[var(--text-primary)] text-sm">
                        {section.title}
                      </p>
                    </div>
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-[var(--text-muted)]" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-[var(--text-muted)]" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="px-4 pb-4">
                      <p className="text-xs text-[var(--text-muted)] italic mb-3 pl-11">
                        {section.summary}
                      </p>
                      <div className="space-y-2 pl-11">
                        {section.evidence.map((item, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                            <p className="text-sm text-[var(--text-secondary)]">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Key Accomplishments */}
        <div className="p-4 border-t border-[var(--border-color)]">
          <h2 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-3">
            Greatest Hits
          </h2>
          <div className="grid gap-3">
            {keyAccomplishments.map((item, index) => (
              <div
                key={index}
                className={cn(
                  'p-3 rounded-lg',
                  'bg-[var(--bg-secondary)] border border-[var(--border-color)]'
                )}
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--accent)]/20 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-4 h-4 text-[var(--accent)]" />
                  </div>
                  <div>
                    <p className="font-medium text-[var(--text-primary)] text-sm">{item.title}</p>
                    <p className="text-xs text-[var(--text-secondary)] mt-1">{item.description}</p>
                    <span className="inline-block mt-2 px-2 py-0.5 text-xs rounded bg-[var(--bg-tertiary)] text-[var(--text-muted)]">
                      {item.impact}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="p-4 border-t border-[var(--border-color)]">
          <h2 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-3">
            Dig Deeper
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'resume', title: 'Resume (Final)3.pdf', desc: 'Full resume + download' },
              { id: 'experience', title: 'The Journey', desc: 'Work history' },
              { id: 'projects', title: 'Side Quests', desc: 'What I build' },
              { id: 'contact', title: 'Say Hi', desc: 'Get in touch' },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => handleOpenWindow(link.id, link.title)}
                className={cn(
                  'flex items-center gap-2 p-3 rounded-lg text-left',
                  'bg-[var(--bg-secondary)] border border-[var(--border-color)]',
                  'hover:bg-[var(--bg-tertiary)] transition-colors'
                )}
              >
                <div className="flex-1">
                  <p className="text-sm font-medium text-[var(--text-primary)]">{link.title}</p>
                  <p className="text-xs text-[var(--text-muted)]">{link.desc}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-[var(--text-muted)]" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-[var(--border-color)] bg-[var(--bg-secondary)]">
        <p className="text-xs text-[var(--text-muted)]">
          Built with Claude Code — proof of AI-native practice
        </p>
      </div>
    </div>
  );
}
