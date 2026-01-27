'use client';

import { skills, getSkillsByLevel } from '@/data/skills';
import { cn } from '@/lib/utils';
import { User, MapPin, Coffee, Code, Gamepad, Music } from 'lucide-react';

export function AboutWindow() {
  const expertSkills = getSkillsByLevel('expert');
  const proficientSkills = getSkillsByLevel('proficient');

  return (
    <div className="h-full p-6 overflow-auto">
      <div className="max-w-2xl mx-auto">
        {/* Profile Header */}
        <div className="flex items-start gap-6 mb-8">
          <div
            className={cn(
              'w-24 h-24 rounded-2xl flex items-center justify-center shrink-0',
              'bg-gradient-to-br from-[var(--accent)] to-[var(--accent-hover)]'
            )}
          >
            <User className="w-12 h-12 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">Don Hogan</h1>
            <p className="text-lg text-[var(--accent)] mb-2">Senior Software Engineer</p>
            <p className="flex items-center gap-2 text-[var(--text-muted)]">
              <MapPin className="w-4 h-4" />
              Austin, TX
            </p>
          </div>
        </div>

        {/* Bio */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">About Me</h2>
          <div className="space-y-4 text-[var(--text-secondary)]">
            <p>
              I'm a full-stack software engineer with a passion for building products that make people's
              lives easier. With 7+ years of experience in web development, I specialize in creating
              intuitive user interfaces and robust backend systems.
            </p>
            <p>
              When I'm not coding, you'll find me tinkering with side projects, exploring new
              technologies, or contributing to open source. I believe in writing clean, maintainable
              code and sharing knowledge with the developer community.
            </p>
          </div>
        </section>

        {/* Skills */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">Skills</h2>

          <div className="mb-4">
            <p className="text-sm text-[var(--text-muted)] mb-2">Expert</p>
            <div className="flex flex-wrap gap-2">
              {expertSkills.map((skill) => (
                <span
                  key={skill.name}
                  className="px-3 py-1 bg-[var(--accent)]/20 text-[var(--accent)] rounded-md text-sm font-medium"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm text-[var(--text-muted)] mb-2">Proficient</p>
            <div className="flex flex-wrap gap-2">
              {proficientSkills.map((skill) => (
                <span
                  key={skill.name}
                  className="px-3 py-1 bg-[var(--bg-tertiary)] text-[var(--text-secondary)] rounded-md text-sm"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Interests */}
        <section>
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">Interests</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Code, label: 'Open Source', description: 'Contributing to projects I use' },
              { icon: Coffee, label: 'Coffee', description: 'Fuel for late-night coding' },
              { icon: Gamepad, label: 'Gaming', description: 'Retro games and indie titles' },
              { icon: Music, label: 'Music', description: 'Coding playlists and vinyl' },
            ].map((interest) => (
              <div
                key={interest.label}
                className={cn(
                  'p-4 rounded-lg flex items-center gap-3',
                  'border border-[var(--border-color)] bg-[var(--bg-secondary)]'
                )}
              >
                <div
                  className={cn(
                    'w-10 h-10 rounded-lg flex items-center justify-center',
                    'bg-[var(--bg-tertiary)]'
                  )}
                >
                  <interest.icon className="w-5 h-5 text-[var(--accent)]" />
                </div>
                <div>
                  <p className="font-medium text-[var(--text-primary)]">{interest.label}</p>
                  <p className="text-xs text-[var(--text-muted)]">{interest.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
