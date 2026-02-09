'use client';

import { useEffect, useRef } from 'react';
import { useWindowStore } from '@/stores/windowStore';
import {
  FolderOpen,
  FileText,
  Briefcase,
  Mail,
  BarChart3,
  Settings,
  User,
  Github,
  Linkedin,
  ExternalLink,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface StartMenuProps {
  onClose: () => void;
}

const menuItems = [
  { id: 'projects', label: 'Projects', icon: FolderOpen },
  { id: 'resume', label: 'Resume', icon: FileText },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'job-journal', label: 'Job Journal', icon: BarChart3 },
  { id: 'contact', label: 'Contact', icon: Mail },
  { id: 'about', label: 'About Me', icon: User },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const externalLinks = [
  { label: 'GitHub', icon: Github, url: 'https://github.com/dontoisme' },
  { label: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com/in/dhogan' },
];

export function StartMenu({ onClose }: StartMenuProps) {
  const { openWindow } = useWindowStore();
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

  const handleItemClick = (id: string, title: string) => {
    openWindow(id, title, id);
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
            <h2 className="text-sm font-semibold text-[var(--text-primary)]">Don Hogan</h2>
            <p className="text-xs text-[var(--text-muted)]">Principal PM &ndash; Growth</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="p-1.5">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={cn(
              'w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
              'hover:bg-[var(--bg-tertiary)] text-left'
            )}
            onClick={() => handleItemClick(item.id, item.label)}
          >
            <item.icon className="w-4 h-4 text-[var(--text-muted)]" />
            <span className="text-sm text-[var(--text-primary)]">{item.label}</span>
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
