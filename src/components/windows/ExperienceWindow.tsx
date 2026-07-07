'use client';

import { useState } from 'react';
import { experiences } from '@/data/experience';
import { profile } from '@/data/profile';
import { cn } from '@/lib/utils';
import { Cpu, HardDrive, Activity, MapPin, Calendar } from 'lucide-react';

type Section = 'summary' | 'devices' | 'processes';

const sections: { id: Section; label: string; icon: React.ElementType }[] = [
  { id: 'summary', label: 'System Summary', icon: Cpu },
  { id: 'devices', label: 'Career Hardware', icon: HardDrive },
  { id: 'processes', label: 'Running Processes', icon: Activity },
];

const summarySpecs = [
  { label: 'Model', value: 'Product Leader (Austin build)' },
  { label: 'Processor', value: 'Growth PM — UX/code/data tri-core' },
  { label: 'Uptime', value: 'Shipping since 2011, zero reboots' },
  { label: 'Current workload', value: 'New-patient conversion @ Memorial Sloan Kettering' },
  { label: 'Memory', value: 'DDR4 (Data-Driven Rate 4)' },
  { label: 'Graphics', value: 'Funnel charts, mostly' },
  { label: 'Operating system', value: 'HoganOS 1.0 (built with Claude Code)' },
];

const processes = [
  { name: 'product-discovery.app', cpu: '28%', status: 'Running' },
  { name: 'growth-experiments.daemon', cpu: '24%', status: 'Running' },
  { name: 'ai-orchestration.service', cpu: '19%', status: 'Running' },
  { name: 'stakeholder-alignment.exe', cpu: '11%', status: 'Running' },
  { name: 'sql-queries.sh', cpu: '8%', status: 'Running' },
  { name: 'trail-ride-ideation.bg', cpu: '6%', status: 'Weekends' },
  { name: 'imposter-syndrome.dll', cpu: '2%', status: 'Cannot Kill' },
  { name: 'douglas-adams-references.dll', cpu: '1%', status: 'Involuntary' },
];

export function ExperienceWindow() {
  const [section, setSection] = useState<Section>('devices');

  return (
    <div className="h-full flex flex-col sm:flex-row">
      {/* Sidebar */}
      <div
        className={cn(
          'sm:w-52 shrink-0 border-b sm:border-b-0 sm:border-r border-[var(--border-color)]',
          'bg-[var(--bg-secondary)] p-2 flex sm:flex-col gap-1'
        )}
      >
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => setSection(s.id)}
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-lg text-left text-sm transition-colors flex-1 sm:flex-none',
              section === s.id
                ? 'bg-[var(--accent)]/15 text-[var(--accent)] font-medium'
                : 'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]'
            )}
          >
            <s.icon className="w-4 h-4 shrink-0" />
            <span className="truncate">{s.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-5">
        {section === 'summary' && (
          <div className="max-w-xl">
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
              System Summary
            </h2>
            <div className="rounded-lg border border-[var(--border-color)] divide-y divide-[var(--border-color)]">
              {summarySpecs.map((spec) => (
                <div key={spec.label} className="flex gap-4 px-4 py-2.5 text-sm">
                  <span className="w-40 shrink-0 text-[var(--text-muted)]">{spec.label}</span>
                  <span className="text-[var(--text-primary)]">{spec.value}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 grid grid-cols-3 gap-2">
              {profile.headlineStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] px-3 py-2.5"
                >
                  <p className="text-sm font-semibold text-[var(--text-primary)]">{stat.value}</p>
                  <p className="text-[11px] text-[var(--text-muted)] leading-tight mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-4">
              Benchmarks verified against resume.pdf — no synthetic scores.
            </p>
          </div>
        )}

        {section === 'devices' && (
          <div>
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-1">
              Career Hardware
            </h2>
            <p className="text-xs text-[var(--text-muted)] mb-5">
              Installed roles, newest first. All drivers up to date.
            </p>

            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[var(--border-color)]" />

              {experiences.map((exp, index) => (
                <div key={exp.id} className="relative pl-12 pb-8 last:pb-0">
                  <div
                    className={cn(
                      'absolute left-2 w-5 h-5 rounded-full border-2 bg-[var(--bg-window)]',
                      index === 0 ? 'border-[var(--accent)]' : 'border-[var(--border-color)]'
                    )}
                  />

                  <div
                    className={cn(
                      'p-4 rounded-lg border border-[var(--border-color)]',
                      'bg-[var(--bg-secondary)]'
                    )}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="font-semibold text-lg text-[var(--text-primary)]">{exp.role}</h3>
                        <p className="text-[var(--accent)] font-medium">{exp.company}</p>
                      </div>
                      <div className="flex flex-col items-end text-sm text-[var(--text-muted)]">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {exp.startDate} - {exp.endDate}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {exp.location}
                        </span>
                      </div>
                    </div>

                    <p className="text-[var(--text-secondary)] mb-3">{exp.description}</p>

                    {exp.highlights.length > 0 && (
                      <ul className="space-y-1 mb-3">
                        {exp.highlights.map((highlight, i) => (
                          <li
                            key={i}
                            className="text-sm text-[var(--text-secondary)] flex items-start gap-2"
                          >
                            <span className="text-[var(--accent)] mt-1">•</span>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    )}

                    {exp.tech && (
                      <div className="flex flex-wrap gap-1 pt-2 border-t border-[var(--border-color)]">
                        {exp.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 bg-[var(--bg-tertiary)] text-[var(--text-muted)] rounded text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {section === 'processes' && (
          <div className="max-w-xl">
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
              Running Processes
            </h2>
            <div className="rounded-lg border border-[var(--border-color)] overflow-hidden">
              <div className="grid grid-cols-[1fr_auto_auto] gap-4 px-4 py-2 text-xs font-medium text-[var(--text-muted)] bg-[var(--bg-secondary)] border-b border-[var(--border-color)]">
                <span>Process name</span>
                <span>CPU</span>
                <span className="w-20 text-right">Status</span>
              </div>
              {processes.map((proc) => (
                <div
                  key={proc.name}
                  className="grid grid-cols-[1fr_auto_auto] gap-4 px-4 py-2 text-sm border-b border-[var(--border-color)] last:border-b-0"
                >
                  <span className="font-mono text-[13px] text-[var(--text-primary)] truncate">{proc.name}</span>
                  <span className="text-[var(--text-muted)]">{proc.cpu}</span>
                  <span
                    className={cn(
                      'w-20 text-right text-xs',
                      proc.status === 'Cannot Kill'
                        ? 'text-[var(--accent)]'
                        : 'text-[var(--text-muted)]'
                    )}
                  >
                    {proc.status}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-3">
              Force-quitting imposter-syndrome.dll has been attempted 47 times.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
