'use client';

import { useState, useEffect } from 'react';
import { useThemeStore, ThemeMode } from '@/stores/themeStore';
import { AnimatePresence } from 'framer-motion';
import { Sun, Moon, Monitor } from 'lucide-react';
import { MobileAppGrid } from './MobileAppGrid';
import { MobileAppPanel } from './MobileAppPanel';
import { ReadmeWindow } from '../windows/ReadmeWindow';
import { ResumeWindow } from '../windows/ResumeWindow';
import { ProjectsWindow } from '../windows/ProjectsWindow';
import { ExperienceWindow } from '../windows/ExperienceWindow';
import { ContactWindow } from '../windows/ContactWindow';
import { SettingsWindow } from '../windows/SettingsWindow';
import { JobJournalWindow } from '../windows/JobJournalWindow';
import { AboutWindow } from '../windows/AboutWindow';
import { PresentationsWindow } from '../windows/PresentationsWindow';

const windowComponents: Record<string, React.ComponentType> = {
  readme: ReadmeWindow,
  resume: ResumeWindow,
  projects: ProjectsWindow,
  experience: ExperienceWindow,
  contact: ContactWindow,
  settings: SettingsWindow,
  'job-journal': JobJournalWindow,
  about: AboutWindow,
  presentations: PresentationsWindow,
};

const appTitles: Record<string, string> = {
  readme: 'Start Here',
  resume: 'Resume',
  projects: 'Side Quests',
  experience: 'The Journey',
  contact: 'Say Hi',
  settings: 'Preferences',
  'job-journal': 'Job Journal',
  about: 'The Dude',
  presentations: 'Presentations',
};

const themeOrder: ThemeMode[] = ['dark', 'light', 'retro'];
const themeIcons = { dark: Moon, light: Sun, retro: Monitor };

export function MobileShell() {
  const { theme, setTheme } = useThemeStore();
  const [activeApp, setActiveApp] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const cycleTheme = () => {
    const next = themeOrder[(themeOrder.indexOf(theme) + 1) % themeOrder.length];
    setTheme(next);
  };

  const ThemeIcon = themeIcons[theme] || Moon;
  const ActiveComponent = activeApp ? windowComponents[activeApp] : null;

  return (
    <div className="mobile-only min-h-screen flex flex-col bg-[var(--bg-primary)] mobile-shell">
      {/* Sticky header */}
      <header
        className="sticky top-0 z-40 border-b border-[var(--border-color)]
                    bg-[var(--bg-primary)]/95 backdrop-blur-md"
      >
        <div className="flex items-center justify-between px-4 py-3">
          <div>
            <h1 className="text-lg font-bold text-[var(--text-primary)]">Don Hogan</h1>
            <p className="text-xs text-[var(--text-secondary)]">
              Principal Product Manager &ndash; Growth
            </p>
          </div>
          <button
            onClick={cycleTheme}
            className="w-10 h-10 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)]
                       flex items-center justify-center"
            aria-label="Toggle theme"
          >
            <ThemeIcon className="w-4 h-4 text-[var(--text-secondary)]" />
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 relative">
        <MobileAppGrid onOpenApp={(id) => setActiveApp(id)} />

        <AnimatePresence>
          {activeApp && ActiveComponent && (
            <MobileAppPanel
              key={activeApp}
              appId={activeApp}
              title={appTitles[activeApp] || activeApp}
              onClose={() => setActiveApp(null)}
            >
              <ActiveComponent />
            </MobileAppPanel>
          )}
        </AnimatePresence>
      </main>

      {/* Footer — only when on home screen */}
      {!activeApp && (
        <footer className="px-4 py-4 text-center">
          <p className="text-xs text-[var(--text-muted)]">
            Built with Claude Code &mdash; try the desktop experience on a larger screen
          </p>
        </footer>
      )}
    </div>
  );
}
