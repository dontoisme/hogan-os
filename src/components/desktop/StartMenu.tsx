'use client';

import { useEffect, useRef } from 'react';
import { Github, Linkedin, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { playRetroSound } from '@/lib/retroSounds';
import { profile } from '@/data/profile';
import { startMenuApps, openAppWindow } from '@/data/apps';
import { toOrigin } from '@/lib/openApp';
import Image from 'next/image';

interface StartMenuProps {
  onClose: () => void;
}

const externalLinks = [
  { label: 'GitHub', icon: Github, url: 'https://github.com/dontoisme' },
  { label: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com/in/dhogan' },
];

export function StartMenu({ onClose }: StartMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const handleItemClick = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    playRetroSound('click');
    openAppWindow(id, toOrigin(e.currentTarget.getBoundingClientRect()));
    onClose();
  };

  return (
    <div
      ref={menuRef}
      className="start-menu absolute bottom-12 left-2 w-64 rounded-xl border border-[var(--border-color)] overflow-hidden"
      style={{
        background: 'var(--bg-window)',
        boxShadow: 'var(--window-shadow)',
        zIndex: 10000,
      }}
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-[var(--border-color)]">
        <div className="flex items-center gap-3">
          <Image
            src="/images/logo/hoganos-logo.png"
            alt="HoganOS"
            width={36}
            height={36}
            className="rounded-lg"
          />
          <div>
            <h2 className="text-sm font-semibold text-[var(--text-primary)]">{profile.name}</h2>
            <p className="text-xs text-[var(--text-muted)]">{profile.title}</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="p-1.5">
        {startMenuApps.map((app) => (
          <button
            key={app.id}
            className={cn(
              'w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
              'hover:bg-[var(--bg-tertiary)] text-left'
            )}
            onClick={(e) => handleItemClick(e, app.id)}
          >
            <app.icon className="w-4 h-4 text-[var(--text-muted)]" />
            <span className="text-sm text-[var(--text-primary)]">{app.startMenuLabel ?? app.title}</span>
          </button>
        ))}
      </div>

      {/* Divider */}
      <div className="h-px bg-[var(--border-color)] mx-3" />

      {/* External Links */}
      <div className="p-1.5">
        {externalLinks.map((link) => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
              'hover:bg-[var(--bg-tertiary)]'
            )}
            onClick={onClose}
          >
            <link.icon className="w-4 h-4 text-[var(--text-muted)]" />
            <span className="text-sm text-[var(--text-primary)] flex-1">{link.label}</span>
            <ExternalLink className="w-3.5 h-3.5 text-[var(--text-muted)]" />
          </a>
        ))}
      </div>
    </div>
  );
}
