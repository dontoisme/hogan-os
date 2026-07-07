'use client';

import { useState, useEffect } from 'react';
import { useThemeStore } from '@/stores/themeStore';
import { formatDate } from '@/lib/utils';
import { Volume2, VolumeX, Wifi, Battery, Sun, Moon, Monitor, Bell } from 'lucide-react';
import { NotificationsPanel } from './NotificationsPanel';
import { playRetroSound } from '@/lib/retroSounds';
import { cn } from '@/lib/utils';

export function SystemTray() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationsSeen, setNotificationsSeen] = useState(false);
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
    <div className="flex items-center gap-0.5">
      {/* Sound Toggle */}
      <button
        className={cn(
          'p-1.5 rounded-lg transition-colors',
          'hover:bg-[var(--bg-tertiary)]'
        )}
        onClick={toggleSound}
        title={soundEnabled ? 'Mute sounds' : 'Enable sounds'}
      >
        {soundEnabled ? (
          <Volume2 className="w-3.5 h-3.5 text-[var(--text-muted)]" />
        ) : (
          <VolumeX className="w-3.5 h-3.5 text-[var(--text-muted)]" />
        )}
      </button>

      {/* WiFi (decorative) */}
      <span
        className="p-1.5 rounded-lg"
        title="Connected to: Opportunity Network · Firewall: blocking imposter syndrome"
        aria-hidden="true"
      >
        <Wifi className="w-3.5 h-3.5 text-[var(--text-muted)]" />
      </span>

      {/* Battery (decorative) */}
      <span
        className="p-1.5 rounded-lg"
        title="Energy: Growth Fuel [████████░░] 80% · Last charged: this morning's trail ride"
        aria-hidden="true"
      >
        <Battery className="w-3.5 h-3.5 text-[var(--text-muted)]" />
      </span>

      {/* Notifications */}
      <div className="relative">
        <button
          className={cn(
            'relative p-1.5 rounded-lg transition-colors',
            'hover:bg-[var(--bg-tertiary)]',
            showNotifications && 'bg-[var(--bg-tertiary)]'
          )}
          onClick={() => {
            if (!showNotifications) {
              playRetroSound('notification');
              setNotificationsSeen(true);
            }
            setShowNotifications(!showNotifications);
          }}
          title="Notifications"
          aria-expanded={showNotifications}
        >
          <Bell className="w-3.5 h-3.5 text-[var(--text-muted)]" />
          {!notificationsSeen && (
            <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
          )}
        </button>

        {showNotifications && (
          <NotificationsPanel onClose={() => setShowNotifications(false)} />
        )}
      </div>

      {/* Theme Toggle */}
      <div className="relative">
        <button
          className={cn(
            'p-1.5 rounded-lg transition-colors',
            'hover:bg-[var(--bg-tertiary)]',
            showThemeMenu && 'bg-[var(--bg-tertiary)]'
          )}
          onClick={() => setShowThemeMenu(!showThemeMenu)}
          title="Change theme"
        >
          <ThemeIcon className="w-3.5 h-3.5 text-[var(--text-muted)]" />
        </button>

        {showThemeMenu && (
          <div
            className="absolute bottom-full right-0 mb-2 w-28 rounded-xl border border-[var(--border-color)] overflow-hidden p-1"
            style={{ background: 'var(--bg-window)', boxShadow: 'var(--window-shadow)' }}
          >
            <button
              className={cn(
                'w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg transition-colors',
                'hover:bg-[var(--bg-tertiary)]',
                theme === 'light' && 'bg-[var(--bg-tertiary)]'
              )}
              onClick={() => {
                setTheme('light');
                setShowThemeMenu(false);
              }}
            >
              <Sun className="w-3.5 h-3.5 text-[var(--text-muted)]" />
              <span className="text-xs text-[var(--text-secondary)]">Light</span>
            </button>
            <button
              className={cn(
                'w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg transition-colors',
                'hover:bg-[var(--bg-tertiary)]',
                theme === 'dark' && 'bg-[var(--bg-tertiary)]'
              )}
              onClick={() => {
                setTheme('dark');
                setShowThemeMenu(false);
              }}
            >
              <Moon className="w-3.5 h-3.5 text-[var(--text-muted)]" />
              <span className="text-xs text-[var(--text-secondary)]">Dark</span>
            </button>
            <button
              className={cn(
                'w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg transition-colors',
                'hover:bg-[var(--bg-tertiary)]',
                theme === 'retro' && 'bg-[var(--bg-tertiary)]'
              )}
              onClick={() => {
                setTheme('retro');
                setShowThemeMenu(false);
              }}
            >
              <Monitor className="w-3.5 h-3.5 text-[var(--text-muted)]" />
              <span className="text-xs text-[var(--text-secondary)]">Retro</span>
            </button>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="w-px h-4 bg-[var(--border-color)] mx-1.5" />

      {/* Clock */}
      <div className="px-1 text-xs text-[var(--text-muted)] tabular-nums">
        {formatDate(currentTime)}
      </div>
    </div>
  );
}
