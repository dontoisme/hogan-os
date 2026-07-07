'use client';

import { useEffect, useRef } from 'react';
import { Sparkles, Eye, BarChart3, AlertTriangle, Download } from 'lucide-react';
import { openApp } from '@/lib/openApp';
import { cn } from '@/lib/utils';

interface Notification {
  id: string;
  icon: React.ElementType;
  title: string;
  body: string;
  time: string;
  appId?: string;
}

const notifications: Notification[] = [
  {
    id: 'viewed',
    icon: Eye,
    title: 'Someone viewed this portfolio',
    body: 'It was you. Hi. Thanks for checking the notifications.',
    time: 'just now',
  },
  {
    id: 'sizzle',
    icon: Download,
    title: 'System update installed',
    body: 'HoganOS 1.1 "Sizzle" — now with 100% more dingo.',
    time: 'today',
  },
  {
    id: 'achievement',
    icon: Sparkles,
    title: 'Achievement unlocked',
    body: 'Shipped a production portfolio site with Claude Code as the only engineer.',
    time: 'this year',
  },
  {
    id: 'job-journal',
    icon: BarChart3,
    title: 'Job Journal',
    body: 'The demo dashboard misses you. Tap to visit.',
    time: '2h ago',
    appId: 'job-journal',
  },
  {
    id: 'wlb',
    icon: AlertTriangle,
    title: 'work-life-balance.exe has stopped responding',
    body: 'Wait · Close · Go for a bike ride (recommended)',
    time: 'recurring',
  },
];

interface NotificationsPanelProps {
  onClose: () => void;
}

export function NotificationsPanel({ onClose }: NotificationsPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) onClose();
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  return (
    <div
      ref={panelRef}
      className="absolute bottom-full right-0 mb-2 w-80 rounded-xl border border-[var(--border-color)] overflow-hidden"
      style={{ background: 'var(--bg-window)', boxShadow: 'var(--window-shadow)' }}
      role="dialog"
      aria-label="Notifications"
    >
      <div className="px-4 py-2.5 border-b border-[var(--border-color)] flex items-center justify-between">
        <p className="text-sm font-semibold text-[var(--text-primary)]">Notifications</p>
        <span className="text-[11px] text-[var(--text-muted)]">{notifications.length} unread, always</span>
      </div>
      <div className="max-h-96 overflow-auto p-1.5 space-y-1">
        {notifications.map((n) => (
          <button
            key={n.id}
            onClick={() => {
              if (n.appId) {
                openApp(n.appId);
                onClose();
              }
            }}
            className={cn(
              'w-full flex items-start gap-3 p-2.5 rounded-lg text-left transition-colors',
              n.appId ? 'hover:bg-[var(--bg-tertiary)] cursor-pointer' : 'cursor-default'
            )}
          >
            <div className="w-8 h-8 rounded-lg bg-[var(--bg-tertiary)] flex items-center justify-center shrink-0 mt-0.5">
              <n.icon className="w-4 h-4 text-[var(--accent)]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between gap-2">
                <p className="text-xs font-medium text-[var(--text-primary)] truncate">{n.title}</p>
                <span className="text-[10px] text-[var(--text-muted)] shrink-0">{n.time}</span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5 leading-relaxed">{n.body}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
