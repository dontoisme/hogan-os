'use client';

import { useState } from 'react';
import { projects } from '@/data/projects';
import { experiences } from '@/data/experience';
import { skills, getSkillsByLevel } from '@/data/skills';
import {
  FolderOpen,
  FileText,
  Briefcase,
  Mail,
  User,
  Github,
  Linkedin,
  ExternalLink,
  ChevronDown,
  MapPin,
  Download,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type Section = 'about' | 'projects' | 'experience' | 'skills' | 'contact' | null;

export function MobileFallback() {
  const [openSection, setOpenSection] = useState<Section>('about');

  const toggleSection = (section: Section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const expertSkills = getSkillsByLevel('expert');
  const proficientSkills = getSkillsByLevel('proficient');

  return (
    <div className="mobile-only min-h-screen bg-[var(--bg-primary)]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[var(--border-color)] bg-[var(--bg-primary)]/95 backdrop-blur">
        <div className="px-4 py-4">
          <h1 className="text-xl font-bold text-[var(--text-primary)]">Don Hogan</h1>
          <p className="text-sm text-[var(--text-secondary)]">Senior Software Engineer</p>
        </div>
      </header>

      {/* Content */}
      <main className="px-4 py-4 space-y-3">
        {/* About Section */}
        <section className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] overflow-hidden">
          <button
            className="w-full flex items-center justify-between p-4"
            onClick={() => toggleSection('about')}
          >
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-[var(--accent)]" />
              <span className="font-medium text-[var(--text-primary)]">About Me</span>
            </div>
            <ChevronDown
              className={cn(
                'w-5 h-5 text-[var(--text-muted)] transition-transform',
                openSection === 'about' && 'rotate-180'
              )}
            />
          </button>
          {openSection === 'about' && (
            <div className="px-4 pb-4 border-t border-[var(--border-color)]">
              <div className="pt-4 space-y-4">
                <p className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                  <MapPin className="w-4 h-4" />
                  Austin, TX
                </p>
                <p className="text-[var(--text-secondary)]">
                  Full-stack software engineer with 7+ years of experience building scalable web
                  applications. Passionate about clean code and developer experience.
                </p>
                <div className="flex gap-3">
                  <a
                    href="https://github.com/donhogan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--bg-tertiary)] text-sm"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                  <a
                    href="https://linkedin.com/in/donhogan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--bg-tertiary)] text-sm"
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Projects Section */}
        <section className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] overflow-hidden">
          <button
            className="w-full flex items-center justify-between p-4"
            onClick={() => toggleSection('projects')}
          >
            <div className="flex items-center gap-3">
              <FolderOpen className="w-5 h-5 text-[var(--accent)]" />
              <span className="font-medium text-[var(--text-primary)]">Projects</span>
            </div>
            <ChevronDown
              className={cn(
                'w-5 h-5 text-[var(--text-muted)] transition-transform',
                openSection === 'projects' && 'rotate-180'
              )}
            />
          </button>
          {openSection === 'projects' && (
            <div className="px-4 pb-4 border-t border-[var(--border-color)]">
              <div className="pt-4 space-y-3">
                {projects.filter(p => p.tier === 1).map((project) => (
                  <div
                    key={project.id}
                    className="p-3 rounded-lg bg-[var(--bg-tertiary)]"
                  >
                    <h3 className="font-medium text-[var(--text-primary)]">{project.title}</h3>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">{project.description}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {project.tech.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 bg-[var(--bg-secondary)] text-[var(--text-muted)] rounded text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Experience Section */}
        <section className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] overflow-hidden">
          <button
            className="w-full flex items-center justify-between p-4"
            onClick={() => toggleSection('experience')}
          >
            <div className="flex items-center gap-3">
              <Briefcase className="w-5 h-5 text-[var(--accent)]" />
              <span className="font-medium text-[var(--text-primary)]">Experience</span>
            </div>
            <ChevronDown
              className={cn(
                'w-5 h-5 text-[var(--text-muted)] transition-transform',
                openSection === 'experience' && 'rotate-180'
              )}
            />
          </button>
          {openSection === 'experience' && (
            <div className="px-4 pb-4 border-t border-[var(--border-color)]">
              <div className="pt-4 space-y-4">
                {experiences.map((exp) => (
                  <div key={exp.id}>
                    <h3 className="font-medium text-[var(--text-primary)]">{exp.role}</h3>
                    <p className="text-sm text-[var(--accent)]">{exp.company}</p>
                    <p className="text-xs text-[var(--text-muted)] mt-1">
                      {exp.startDate} - {exp.endDate} • {exp.location}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Skills Section */}
        <section className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] overflow-hidden">
          <button
            className="w-full flex items-center justify-between p-4"
            onClick={() => toggleSection('skills')}
          >
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-[var(--accent)]" />
              <span className="font-medium text-[var(--text-primary)]">Skills</span>
            </div>
            <ChevronDown
              className={cn(
                'w-5 h-5 text-[var(--text-muted)] transition-transform',
                openSection === 'skills' && 'rotate-180'
              )}
            />
          </button>
          {openSection === 'skills' && (
            <div className="px-4 pb-4 border-t border-[var(--border-color)]">
              <div className="pt-4 space-y-4">
                <div>
                  <p className="text-xs text-[var(--text-muted)] mb-2">Expert</p>
                  <div className="flex flex-wrap gap-2">
                    {expertSkills.map((skill) => (
                      <span
                        key={skill.name}
                        className="px-2 py-1 bg-[var(--accent)]/20 text-[var(--accent)] rounded text-xs"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-[var(--text-muted)] mb-2">Proficient</p>
                  <div className="flex flex-wrap gap-2">
                    {proficientSkills.map((skill) => (
                      <span
                        key={skill.name}
                        className="px-2 py-1 bg-[var(--bg-tertiary)] text-[var(--text-secondary)] rounded text-xs"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Contact Section */}
        <section className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] overflow-hidden">
          <button
            className="w-full flex items-center justify-between p-4"
            onClick={() => toggleSection('contact')}
          >
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-[var(--accent)]" />
              <span className="font-medium text-[var(--text-primary)]">Contact</span>
            </div>
            <ChevronDown
              className={cn(
                'w-5 h-5 text-[var(--text-muted)] transition-transform',
                openSection === 'contact' && 'rotate-180'
              )}
            />
          </button>
          {openSection === 'contact' && (
            <div className="px-4 pb-4 border-t border-[var(--border-color)]">
              <div className="pt-4 space-y-3">
                <a
                  href="mailto:don@example.com"
                  className="flex items-center gap-3 p-3 rounded-lg bg-[var(--bg-tertiary)]"
                >
                  <Mail className="w-5 h-5 text-[var(--accent)]" />
                  <span className="text-[var(--text-primary)]">don@example.com</span>
                </a>
                <button
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[var(--accent)] text-white font-medium"
                >
                  <Download className="w-4 h-4" />
                  Download Resume
                </button>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="px-4 py-6 text-center text-sm text-[var(--text-muted)]">
        <p>View on desktop for the full experience</p>
      </footer>
    </div>
  );
}
