'use client';

import { useState } from 'react';
import { useWindowStore } from '@/stores/windowStore';
import { cn } from '@/lib/utils';
import {
  Sparkles,
  Brain,
  Users,
  Code,
  Layers,
  Heart,
  Briefcase,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  Target,
  TrendingUp,
  Zap,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';

interface FitSection {
  id: string;
  title: string;
  icon: React.ElementType;
  requirement: string;
  evidence: string[];
  verdict: 'strong' | 'good' | 'developing';
}

const fitSections: FitSection[] = [
  {
    id: 'ai-native',
    title: 'AI-Native Product Practice',
    icon: Brain,
    requirement: 'Actively uses AI to think better, move faster, and designs products that responsibly leverage AI.',
    evidence: [
      'At stealth AI-health startup: Multi-agent LLM system for clinical workflows — AI that must be trustworthy, explainable, and compliant',
      'Built this entire portfolio site (HoganOS) with Claude Code in a single session',
      'At ZenBusiness: Integrated Velo AI into front-end tooling, improving funnel starts by 70%',
      'Daily AI practice: discovery, prototyping, code generation, strategic analysis',
      'Strong opinion: AI changes *how* we build, not just *what* we build',
    ],
    verdict: 'strong',
  },
  {
    id: 'customer-obsessed',
    title: 'Customer-Problem Obsessed',
    icon: Users,
    requirement: 'Measures success by problems eliminated and outcomes achieved, not feature counts.',
    evidence: [
      'At Mattermost: Led 3x weekly user interviews to iterate on signup funnel',
      'At Wellcore: Reduced churn 60% by identifying repeated data entry as the core friction',
      'At Clearhead: Ran 600+ experiments with 36% win rate — killed more bad ideas than shipped',
      'Philosophy: "What problem are we solving?" is the first question, always',
      'Outcomes > outputs: Every resume bullet is a metric, not a feature list',
    ],
    verdict: 'strong',
  },
  {
    id: 'technical',
    title: 'Technically Fluent',
    icon: Code,
    requirement: 'Can engage deeply with engineers on architecture, trade-offs, and scalability.',
    evidence: [
      'Hands-on: HTML/CSS/JS, SQL, Python, Swift, React/Next.js',
      'At Indeed: Built attribution systems requiring deep analytics architecture understanding',
      'At Wellcore: Led full-stack EHR platform build, made tech decisions alongside engineering',
      'Shipped production code in side projects — not just specs',
      'Can read a PR, debate an architecture decision, and know when to defer to eng',
    ],
    verdict: 'strong',
  },
  {
    id: 'systems-thinker',
    title: 'Systems Thinker',
    icon: Layers,
    requirement: 'Thinks beyond individual screens to platforms, workflows, and ecosystems.',
    evidence: [
      'At Clearhead: Built experimentation platform that enabled 5 downstream teams',
      'At Wellcore: Designed patient-provider-admin ecosystem, not just screens',
      'At ZenBusiness: Managed multiple streams, increasing A/B testing throughput 250%',
      'Growth PM mindset = understanding the full funnel, not just one step',
      'Platform thinking: Strong defaults + configurability without brittleness',
    ],
    verdict: 'strong',
  },
  {
    id: 'mission-driven',
    title: 'Mission-Driven but Pragmatic',
    icon: Heart,
    requirement: 'Wants to change the world, understands durable impact requires focus and execution.',
    evidence: [
      'At Wellcore: Health-tech for longevity optimization — literally helping people live better',
      'Former rock climbing guide — comfortable with calculated risk and real consequences',
      'Growth PM = measurable impact, not vanity metrics',
      'Bonterra fit: Social good + enterprise scale = exactly my lane',
      '"Just a dude having fun" = I care deeply but don\'t take myself too seriously',
    ],
    verdict: 'strong',
  },
  {
    id: 'experience',
    title: '8+ Years PM Experience',
    icon: Briefcase,
    requirement: 'PM experience in SaaS with complex, platform-oriented products.',
    evidence: [
      '8+ years: AI-Health Startup, ZenBusiness, Wellcore, Mattermost, Indeed, Clearhead/Accenture',
      'Principal/Staff level at multiple companies',
      'Platform products: Multi-agent AI systems, EHR platforms, experimentation infrastructure',
      'Enterprise + SMB experience across B2B and B2C',
      'OU BBA 2010: Entrepreneurship & Finance (yes, I understand the business side)',
    ],
    verdict: 'strong',
  },
];

const keyAccomplishments = [
  {
    title: 'Multi-Quarter Initiative: Mattermost Growth',
    description: 'Led Growth MLX team over multiple quarters, driving cloud signups +270% and day 14 activation from 8% to 25%.',
    impact: 'Customer adoption & retention',
  },
  {
    title: 'Difficult Trade-offs: Wellcore Platform',
    description: 'Made hard calls on EHR platform architecture — balancing speed-to-market with HIPAA compliance and long-term scalability.',
    impact: 'Platform health',
  },
  {
    title: 'Foundational Capability: Indeed Experimentation',
    description: 'Built experimentation infrastructure that improved velocity 600% for 5 teams. Enabled downstream teams to run their own experiments.',
    impact: 'Platform enablement',
  },
  {
    title: 'Revenue Impact: SONOS Checkout',
    description: 'Led checkout redesign at Clearhead that delivered +22% conversion and $12MM incremental revenue.',
    impact: 'Business results',
  },
];

const verdictColors = {
  strong: 'bg-green-500/20 text-green-400 border-green-500/30',
  good: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  developing: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
};

const verdictLabels = {
  strong: 'Strong Fit',
  good: 'Good Fit',
  developing: 'Developing',
};

export function ReadmeWindow() {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['ai-native', 'customer-obsessed'])
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
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-[var(--text-primary)]">Don Hogan</h1>
              <span className="text-lg">→</span>
              <h1 className="text-lg font-bold text-[var(--accent)]">Bonterra</h1>
            </div>
            <p className="text-[var(--text-secondary)] text-xs">
              Principal Product Manager, CSR — Role Fit Analysis
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="px-2 py-0.5 text-xs rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
            <CheckCircle2 className="w-3 h-3 inline mr-1" />
            Strong Overall Fit
          </span>
          <span className="px-2 py-0.5 text-xs rounded-full bg-[var(--bg-tertiary)] text-[var(--text-muted)]">
            12+ years PM
          </span>
          <span className="px-2 py-0.5 text-xs rounded-full bg-[var(--bg-tertiary)] text-[var(--text-muted)]">
            AI-Native
          </span>
          <span className="px-2 py-0.5 text-xs rounded-full bg-[var(--bg-tertiary)] text-[var(--text-muted)]">
            Growth Expert
          </span>
        </div>
        <div className="flex items-start gap-2 text-xs text-[var(--text-secondary)] bg-[var(--bg-secondary)]/50 rounded p-2">
          <Sparkles className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
          <p>
            <span className="font-medium text-[var(--text-primary)]">TL;DR:</span> Growth PM with 12+ years building AI-powered, outcome-focused products. Track record of 10x improvements in experimentation velocity, activation rates, and revenue. Technically fluent enough to build this site with Claude Code. Mission-driven enough to care about increasing the giving rate.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div>
        {/* Qualification Sections */}
        <div className="p-4">
          <h2 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-3">
            Qualification Fit
          </h2>

          <div className="space-y-2">
            {fitSections.map((section) => {
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
                    <span className={cn(
                      'px-2 py-0.5 text-xs rounded-full border',
                      verdictColors[section.verdict]
                    )}>
                      {verdictLabels[section.verdict]}
                    </span>
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-[var(--text-muted)]" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-[var(--text-muted)]" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="px-4 pb-4">
                      <p className="text-xs text-[var(--text-muted)] italic mb-3 pl-11">
                        "{section.requirement}"
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
            You've Successfully...
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

        {/* CSR/Social Impact Note */}
        <div className="p-4 border-t border-[var(--border-color)]">
          <div className="p-4 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
            <div className="flex items-start gap-3">
              <Heart className="w-5 h-5 text-pink-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-[var(--text-primary)] text-sm mb-2">
                  Why CSR? The Patterns Transfer.
                </p>
                <p className="text-sm text-[var(--text-secondary)] mb-3">
                  Most recently at <span className="text-[var(--accent)]">a stealth AI-health startup</span> (2025), I was Principal PM for a B2B2C
                  healthcare platform enabling physician practices to bill CMS (Medicare) for care management. Built multi-agent
                  LLM workflows across Epic, Cerner, and Athena — where retention = revenue and AI must be trustworthy.
                  The challenges map directly to CSR:
                </p>
                <div className="space-y-2 text-sm">
                  {[
                    { from: 'CMS billing compliance', to: 'ESG/CSR reporting requirements' },
                    { from: 'Multi-EMR integrations', to: 'HRIS, payroll, nonprofit databases' },
                    { from: 'Clinical AI that must be trustworthy', to: 'Grant disbursement, giving automation' },
                    { from: 'Patient/provider/payer coordination', to: 'Corporation/nonprofit/employee alignment' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-[var(--text-secondary)]">
                      <span className="text-[var(--text-muted)]">{item.from}</span>
                      <ArrowRight className="w-3 h-3 text-[var(--accent)] shrink-0" />
                      <span>{item.to}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-[var(--text-secondary)] mt-3 italic">
                  The patterns transfer. The mission is why Bonterra excites me.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="p-4 border-t border-[var(--border-color)]">
          <h2 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-3">
            Dig Deeper
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'resume', title: 'Hire Me.pdf', desc: 'Full resume' },
              { id: 'experience', title: 'The Journey', desc: 'Work history' },
              { id: 'projects', title: 'Side Quests', desc: 'What I build' },
              { id: 'about', title: 'The Dude', desc: 'Who I am' },
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
        <div className="flex items-center justify-between">
          <p className="text-xs text-[var(--text-muted)]">
            Built with Claude Code — proof of AI-native practice
          </p>
          <a
            href="https://bonterra.wd1.myworkdayjobs.com/en-US/bonterratech/job/Principal-Product-Manager--CSR_R2026-0038"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-[var(--accent)] hover:underline"
          >
            View JD
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
