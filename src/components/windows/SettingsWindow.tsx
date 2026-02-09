'use client';

import { useThemeStore, ThemeMode } from '@/stores/themeStore';
import { Sun, Moon, Monitor, Volume2, VolumeX, Check, FileEdit } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PresentationEditor } from '@/components/PresentationEditor';

export function SettingsWindow() {
  const { theme, setTheme, soundEnabled, toggleSound } = useThemeStore();

  const themes: { id: ThemeMode; label: string; icon: typeof Sun; description: string }[] = [
    {
      id: 'light',
      label: 'Light',
      icon: Sun,
      description: 'Clean and bright interface',
    },
    {
      id: 'dark',
      label: 'Dark',
      icon: Moon,
      description: 'Easy on the eyes, modern look',
    },
    {
      id: 'retro',
      label: 'Retro',
      icon: Monitor,
      description: 'Classic 90s operating system vibes',
    },
  ];

  return (
    <div className="h-full p-6 overflow-auto">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Settings</h1>

        {/* Theme Selection */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Appearance</h2>
          <div className="space-y-3">
            {themes.map((t) => (
              <button
                key={t.id}
                className={cn(
                  'w-full flex items-center gap-4 p-4 rounded-lg transition-all',
                  'border-2',
                  theme === t.id
                    ? 'border-[var(--accent)] bg-[var(--accent)]/10'
                    : 'border-[var(--border-color)] bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)]'
                )}
                onClick={() => setTheme(t.id)}
              >
                <div
                  className={cn(
                    'w-12 h-12 rounded-lg flex items-center justify-center',
                    theme === t.id ? 'bg-[var(--accent)]' : 'bg-[var(--bg-tertiary)]'
                  )}
                >
                  <t.icon
                    className={cn(
                      'w-6 h-6',
                      theme === t.id ? 'text-white' : 'text-[var(--text-secondary)]'
                    )}
                  />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-[var(--text-primary)]">{t.label}</p>
                  <p className="text-sm text-[var(--text-secondary)]">{t.description}</p>
                </div>
                {theme === t.id && (
                  <div className="w-6 h-6 rounded-full bg-[var(--accent)] flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Sound Settings */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Sound</h2>
          <button
            className={cn(
              'w-full flex items-center gap-4 p-4 rounded-lg transition-all',
              'border-2 border-[var(--border-color)] bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)]'
            )}
            onClick={toggleSound}
          >
            <div
              className={cn(
                'w-12 h-12 rounded-lg flex items-center justify-center',
                soundEnabled ? 'bg-[var(--accent)]' : 'bg-[var(--bg-tertiary)]'
              )}
            >
              {soundEnabled ? (
                <Volume2 className="w-6 h-6 text-white" />
              ) : (
                <VolumeX className="w-6 h-6 text-[var(--text-secondary)]" />
              )}
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium text-[var(--text-primary)]">Sound Effects</p>
              <p className="text-sm text-[var(--text-secondary)]">
                {soundEnabled ? 'UI sounds are enabled' : 'UI sounds are disabled'}
              </p>
            </div>
            <div
              className={cn(
                'w-12 h-6 rounded-full transition-colors relative',
                soundEnabled ? 'bg-[var(--accent)]' : 'bg-[var(--bg-tertiary)]'
              )}
            >
              <div
                className={cn(
                  'absolute top-1 w-4 h-4 rounded-full bg-white transition-transform',
                  soundEnabled ? 'translate-x-7' : 'translate-x-1'
                )}
              />
            </div>
          </button>
        </section>

        {/* Presentation Content */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
            <span className="flex items-center gap-2">
              <FileEdit className="w-5 h-5" />
              Presentation Content
            </span>
          </h2>
          <PresentationEditor />
        </section>

        {/* About */}
        <section>
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">About</h2>
          <div
            className={cn(
              'p-4 rounded-lg',
              'border border-[var(--border-color)] bg-[var(--bg-secondary)]'
            )}
          >
            <p className="text-[var(--text-primary)] font-medium mb-1">HoganOS</p>
            <p className="text-sm text-[var(--text-secondary)] mb-2">Version 1.0.0</p>
            <p className="text-sm text-[var(--text-muted)]">
              A desktop OS-inspired portfolio website built with Next.js, TypeScript, and Tailwind CSS.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
