'use client';

import { skills, getSkillsByCategory, categories } from '@/data/skills';
import { cn } from '@/lib/utils';
import { User, MapPin, Bike, Camera, Mountain, Gamepad2, Fish } from 'lucide-react';

export function AboutWindow() {
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
            <p className="text-lg text-[var(--accent)] mb-2">Principal Product Manager – Growth</p>
            <p className="flex items-center gap-2 text-[var(--text-muted)]">
              <MapPin className="w-4 h-4" />
              Austin, TX
            </p>
            <p className="text-sm text-[var(--text-muted)] mt-1 italic">
              &quot;Just a dude having fun.&quot;
            </p>
          </div>
        </div>

        {/* Bio */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">About Me</h2>
          <div className="space-y-4 text-[var(--text-secondary)]">
            <p>
              I&apos;m a Growth Product Leader with a track record of turning experimentation and data
              into real business results. I&apos;ve spent 8+ years helping companies like Indeed,
              Mattermost, and ZenBusiness figure out what makes users tick and how to make
              products they actually want to use.
            </p>
            <p>
              I describe myself as a hobbyist who tries to make a living solving big problems.
              When I&apos;m not running A/B tests or optimizing funnels, you&apos;ll find me building
              side projects with Claude Code, riding my bike on Austin trails, or referencing
              Douglas Adams at inappropriate moments.
            </p>
            <p>
              Former rock climbing guide. Can catch fish barehanded. Will definitely ask you
              about that if we meet.
            </p>
          </div>
        </section>

        {/* Skills by Category */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">Skills</h2>
          <div className="space-y-4">
            {categories.map((category) => {
              const categorySkills = getSkillsByCategory(category.id);
              if (categorySkills.length === 0) return null;

              return (
                <div key={category.id}>
                  <p className="text-sm text-[var(--text-muted)] mb-2">{category.label}</p>
                  <div className="flex flex-wrap gap-2">
                    {categorySkills.map((skill) => (
                      <span
                        key={skill.name}
                        className={cn(
                          'px-3 py-1 rounded-md text-sm',
                          skill.level === 'expert'
                            ? 'bg-[var(--accent)]/20 text-[var(--accent)] font-medium'
                            : skill.level === 'proficient'
                            ? 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)]'
                            : 'bg-[var(--bg-secondary)] text-[var(--text-muted)]'
                        )}
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Interests */}
        <section>
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">When I&apos;m Not Working</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Bike, label: 'Biking', description: 'Mountain and road, Austin trails' },
              { icon: Camera, label: 'Photography', description: 'Finding beauty in unexpected places' },
              { icon: Mountain, label: 'Outdoors', description: 'Former climbing guide, backpacker' },
              { icon: Gamepad2, label: 'Gaming', description: 'SNES classics and indie titles' },
              { icon: Fish, label: 'Fishing', description: 'Ask me about catching them barehanded' },
              { icon: User, label: 'Storytelling', description: 'Connecting people through stories' },
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
