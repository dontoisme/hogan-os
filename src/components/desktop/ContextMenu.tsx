'use client';

import { useEffect, useRef } from 'react';
import { RefreshCw, FlaskConical, Code2, Info } from 'lucide-react';
import { openAppWindow } from '@/data/apps';
import { profile } from '@/data/profile';
import { useToastStore } from '@/stores/toastStore';
import { playRetroSound } from '@/lib/retroSounds';
import { cn } from '@/lib/utils';

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
}

export function ContextMenu({ x, y, onClose }: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) onClose();
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const items = [
    {
      label: 'Refresh',
      icon: RefreshCw,
      action: () => {
        playRetroSound('click');
        useToastStore.getState().showToast({
          id: 'refresh',
          icon: '🔄',
          message: 'Desktop refreshed. Still optimizing…',
          duration: 3000,
        });
      },
    },
    {
      label: 'New Experiment',
      icon: FlaskConical,
      action: () => openAppWindow('projects'),
    },
    {
      label: 'View Source',
      icon: Code2,
      action: () => window.open(`${profile.github}/hogan-os`, '_blank', 'noopener,noreferrer'),
    },
    {
      label: 'Properties',
      icon: Info,
      action: () => openAppWindow('about'),
    },
  ];

  // Clamp to viewport so the menu never renders off-screen
  const clampedX = Math.min(x, (typeof window !== 'undefined' ? window.innerWidth : 1200) - 200);
  const clampedY = Math.min(y, (typeof window !== 'undefined' ? window.innerHeight : 800) - 200);

  return (
    <div
      ref={menuRef}
      className="fixed w-48 rounded-xl border border-[var(--border-color)] overflow-hidden p-1 z-[11000]"
      style={{ left: clampedX, top: clampedY, background: 'var(--bg-window)', boxShadow: 'var(--window-shadow)' }}
      role="menu"
    >
      {items.map((item) => (
        <button
          key={item.label}
          role="menuitem"
          className={cn(
            'w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-colors text-left',
            'hover:bg-[var(--bg-tertiary)]'
          )}
          onClick={() => {
            item.action();
            onClose();
          }}
        >
          <item.icon className="w-3.5 h-3.5 text-[var(--text-muted)]" />
          <span className="text-xs text-[var(--text-primary)]">{item.label}</span>
        </button>
      ))}
    </div>
  );
}
