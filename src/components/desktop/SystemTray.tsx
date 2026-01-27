'use client';

import { useState, useEffect } from 'react';
import { useThemeStore } from '@/stores/themeStore';
import { formatDate } from '@/lib/utils';
import { Volume2, VolumeX, Wifi, Battery, Sun, Moon, Monitor } from 'lucide-react';
import { cn } from '@/lib/utils';

export function SystemTray() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const { theme, setTheme, soundEnabled, toggleSound } = useThemeStore();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return Sun;
      case 'dark':
        return Moon;
      case 'retro':
        return Monitor;
      default:
        return Moon;
    }
  };

  const ThemeIcon = getThemeIcon();

  return (
    <div className="flex items-center gap-1">
      {/* Sound Toggle */}
      <button
        className={cn(
          'p-2 rounded-md transition-colors',
          'hover:bg-[var(--bg-tertiary)]'
        )}
        onClick={toggleSound}
        title={soundEnabled ? 'Mute sounds' : 'Enable sounds'}
      >
        {soundEnabled ? (
          <Volume2 className="w-4 h-4 text-[var(--text-secondary)]" />
        ) : (
          <VolumeX className="w-4 h-4 text-[var(--text-muted)]" />
        )}
      </button>

      {/* WiFi (decorative) */}
      <button
        className={cn(
          'p-2 rounded-md transition-colors',
          'hover:bg-[var(--bg-tertiary)]'
        )}
        title="Connected"
      >
        <Wifi className="w-4 h-4 text-[var(--text-secondary)]" />
      </button>

      {/* Battery (decorative) */}
      <button
        className={cn(
          'p-2 rounded-md transition-colors',
          'hover:bg-[var(--bg-tertiary)]'
        )}
        title="Battery: 100%"
      >
        <Battery className="w-4 h-4 text-[var(--text-secondary)]" />
      </button>

      {/* Theme Toggle */}
      <div className="relative">
        <button
          className={cn(
            'p-2 rounded-md transition-colors',
            'hover:bg-[var(--bg-tertiary)]',
            showThemeMenu && 'bg-[var(--bg-tertiary)]'
          )}
          onClick={() => setShowThemeMenu(!showThemeMenu)}
          title="Change theme"
        >
          <ThemeIcon className="w-4 h-4 text-[var(--text-secondary)]" />
        </button>

        {showThemeMenu && (
          <div
            className="absolute bottom-full right-0 mb-2 w-32 rounded-lg border border-[var(--border-color)] overflow-hidden"
            style={{ background: 'var(--bg-window)', boxShadow: 'var(--window-shadow)' }}
          >
            <button
              className={cn(
                'w-full flex items-center gap-2 px-3 py-2 transition-colors',
                'hover:bg-[var(--bg-tertiary)]',
                theme === 'light' && 'bg-[var(--bg-tertiary)]'
              )}
              onClick={() => {
                setTheme('light');
                setShowThemeMenu(false);
              }}
            >
              <Sun className="w-4 h-4" />
              <span className="text-sm">Light</span>
            </button>
            <button
              className={cn(
                'w-full flex items-center gap-2 px-3 py-2 transition-colors',
                'hover:bg-[var(--bg-tertiary)]',
                theme === 'dark' && 'bg-[var(--bg-tertiary)]'
              )}
              onClick={() => {
                setTheme('dark');
                setShowThemeMenu(false);
              }}
            >
              <Moon className="w-4 h-4" />
              <span className="text-sm">Dark</span>
            </button>
            <button
              className={cn(
                'w-full flex items-center gap-2 px-3 py-2 transition-colors',
                'hover:bg-[var(--bg-tertiary)]',
                theme === 'retro' && 'bg-[var(--bg-tertiary)]'
              )}
              onClick={() => {
                setTheme('retro');
                setShowThemeMenu(false);
              }}
            >
              <Monitor className="w-4 h-4" />
              <span className="text-sm">Retro</span>
            </button>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="w-px h-6 bg-[var(--border-color)] mx-1" />

      {/* Clock */}
      <div className="px-2 text-sm text-[var(--text-primary)] tabular-nums">
        {formatDate(currentTime)}
      </div>
    </div>
  );
}
