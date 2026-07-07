'use client';

import { useState, useEffect } from 'react';
import { useThemeStore, ThemeMode } from '@/stores/themeStore';
import { AnimatePresence } from 'framer-motion';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useRetroSounds } from '@/hooks/useRetroSounds';
import { MobileAppGrid } from './MobileAppGrid';
import { MobileAppPanel } from './MobileAppPanel';
import { profile } from '@/data/profile';
import { getApp } from '@/data/apps';
import { OPEN_APP_EVENT, getRequestedApp } from '@/lib/openApp';

const themeOrder: ThemeMode[] = ['dark', 'light', 'retro'];
const themeIcons = { dark: Moon, light: Sun, retro: Monitor };

export function MobileShell() {
  const { theme, setTheme } = useThemeStore();
  const [activeApp, setActiveApp] = useState<string | null>(null);

  useRetroSounds();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Open apps requested by the boot screen CTAs or the ?app= deep link
  useEffect(() => {
    const open = (id: string) => {
      if (getApp(id)?.onMobile) setActiveApp(id);
    };
    const handler = (e: Event) => open((e as CustomEvent).detail?.id);
    window.addEventListener(OPEN_APP_EVENT, handler);
    const requested = getRequestedApp();
    if (requested) open(requested);
    return () => window.removeEventListener(OPEN_APP_EVENT, handler);
  }, []);

  const cycleTheme = () => {
    const next = themeOrder[(themeOrder.indexOf(theme) + 1) % themeOrder.length];
    setTheme(next);
  };

  const ThemeIcon = themeIcons[theme] || Moon;
  const activeAppDef = activeApp ? getApp(activeApp) : null;
  const ActiveComponent = activeAppDef?.Window ?? null;

  return (
    <div className="mobile-only min-h-screen flex flex-col bg-[var(--bg-primary)] mobile-shell">
      {/* Sticky header */}
      <header
        className="sticky top-0 z-40 border-b border-[var(--border-color)]
                    bg-[var(--bg-window)]/95 backdrop-blur-md"
      >
        <div className="flex items-center justify-between px-4 py-3">
          <div>
            <h1 className="text-base font-semibold text-[var(--text-primary)]">{profile.name}</h1>
            <p className="text-xs text-[var(--text-muted)]">
              {profile.title}
            </p>
          </div>
          <button
            onClick={cycleTheme}
            className="w-9 h-9 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)]
                       flex items-center justify-center transition-colors hover:bg-[var(--bg-tertiary)]"
            aria-label="Toggle theme"
          >
            <ThemeIcon className="w-4 h-4 text-[var(--text-muted)]" />
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
              title={activeAppDef?.mobileTitle || activeApp}
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
          <p className="text-[11px] text-[var(--text-muted)]">
            Built with Claude Code &mdash; try the desktop experience on a larger screen
          </p>
        </footer>
      )}
    </div>
  );
}
