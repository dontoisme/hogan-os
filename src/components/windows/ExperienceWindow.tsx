'use client';

import { experiences } from '@/data/experience';
import { cn } from '@/lib/utils';
import { Briefcase, MapPin, Calendar } from 'lucide-react';

export function ExperienceWindow() {
  return (
    <div className="h-full p-6 overflow-auto">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Work Experience</h1>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[var(--border-color)]" />

          {experiences.map((exp, index) => (
            <div key={exp.id} className="relative pl-12 pb-8 last:pb-0">
              {/* Timeline dot */}
              <div
                className={cn(
                  'absolute left-2 w-5 h-5 rounded-full border-2 bg-[var(--bg-window)]',
                  index === 0 ? 'border-[var(--accent)]' : 'border-[var(--border-color)]'
                )}
              />

              {/* Content */}
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

                {/* Highlights */}
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

                {/* Tech Stack */}
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
    </div>
  );
}
