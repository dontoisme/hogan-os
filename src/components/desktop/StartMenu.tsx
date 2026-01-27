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
  { label: 'GitHub', icon: Github, url: 'https://github.com/donhogan' },
  { label: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com/in/donhogan' },
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
      className="start-menu absolute bottom-14 left-2 w-72 rounded-lg border border-[var(--border-color)] overflow-hidden"
      style={{
        background: 'var(--bg-window)',
        boxShadow: 'var(--window-shadow)',
        zIndex: 10000,
      }}
    >
      {/* Header */}
      <div className="p-4 border-b border-[var(--border-color)] bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)]">
        <h2 className="text-lg font-bold text-white">Don Hogan</h2>
        <p className="text-sm text-white/80">Software Engineer</p>
      </div>

      {/* Menu Items */}
      <div className="p-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={cn(
              'w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors',
              'hover:bg-[var(--bg-tertiary)] text-left'
            )}
            onClick={() => handleItemClick(item.id, item.label)}
          >
            <item.icon className="w-5 h-5 text-[var(--text-secondary)]" />
            <span className="text-sm text-[var(--text-primary)]">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Divider */}
      <div className="h-px bg-[var(--border-color)] mx-2" />

      {/* External Links */}
      <div className="p-2">
        {externalLinks.map((link) => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors',
              'hover:bg-[var(--bg-tertiary)]'
            )}
            onClick={onClose}
          >
            <link.icon className="w-5 h-5 text-[var(--text-secondary)]" />
            <span className="text-sm text-[var(--text-primary)] flex-1">{link.label}</span>
            <ExternalLink className="w-4 h-4 text-[var(--text-muted)]" />
          </a>
        ))}
      </div>
    </div>
  );
}
