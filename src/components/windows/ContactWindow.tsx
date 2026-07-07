'use client';

import { Mail, Github, Linkedin, ExternalLink, FileText } from 'lucide-react';
import { profile } from '@/data/profile';
import { cn } from '@/lib/utils';

export function ContactWindow() {
  const contactLinks = [
    {
      label: 'GitHub',
      value: profile.githubHandle,
      icon: Github,
      href: profile.github,
    },
    {
      label: 'LinkedIn',
      value: profile.linkedinHandle,
      icon: Linkedin,
      href: profile.linkedin,
    },
    {
      label: 'Resume',
      value: 'Download PDF',
      icon: FileText,
      href: profile.resumePdf,
    },
  ];

  return (
    <div className="h-full p-6 overflow-auto">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Let&apos;s Connect</h1>
        <p className="text-[var(--text-secondary)] mb-6">
          Hiring a product leader? Want to talk growth experiments, health tech, fish catching,
          or Douglas Adams? I&apos;m always down to chat.
        </p>

        {/* Primary CTA */}
        <a
          href={`mailto:${profile.email}?subject=Hello%20from%20HoganOS`}
          className={cn(
            'flex items-center gap-4 p-5 rounded-xl mb-6 transition-colors',
            'bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white'
          )}
        >
          <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
            <Mail className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <p className="font-semibold">Email me</p>
            <p className="text-sm opacity-90">{profile.email}</p>
          </div>
          <ExternalLink className="w-4 h-4 opacity-75" />
        </a>

        {/* Other links */}
        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">Elsewhere</h2>
        <div className="space-y-3">
          {contactLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'flex items-center gap-3 p-3 rounded-lg transition-colors',
                'bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)]',
                'border border-[var(--border-color)]'
              )}
            >
              <div
                className={cn(
                  'w-10 h-10 rounded-lg flex items-center justify-center',
                  'bg-[var(--bg-tertiary)]'
                )}
              >
                <link.icon className="w-5 h-5 text-[var(--accent)]" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-[var(--text-muted)]">{link.label}</p>
                <p className="text-[var(--text-primary)] font-medium">{link.value}</p>
              </div>
              <ExternalLink className="w-4 h-4 text-[var(--text-muted)]" />
            </a>
          ))}
        </div>

        <p className="text-xs text-[var(--text-muted)] mt-6">
          Email is fastest — I usually reply within a day.
        </p>
      </div>
    </div>
  );
}
