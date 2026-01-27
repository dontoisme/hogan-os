'use client';

import { useState } from 'react';
import { useWindowStore } from '@/stores/windowStore';
import { StartMenu } from './StartMenu';
import { SystemTray } from './SystemTray';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export function Taskbar() {
  const [showStartMenu, setShowStartMenu] = useState(false);
  const { windows, bringToFront, restoreWindow, minimizeWindow, activeWindowId } = useWindowStore();

  const handleWindowClick = (id: string, isMinimized: boolean) => {
    if (isMinimized) {
      restoreWindow(id);
    } else if (activeWindowId === id) {
      minimizeWindow(id);
    } else {
      bringToFront(id);
    }
  };

  return (
    <>
      {/* Start Menu */}
      {showStartMenu && <StartMenu onClose={() => setShowStartMenu(false)} />}

      {/* Taskbar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-12 flex items-center px-2 border-t border-[var(--border-color)]"
        style={{ background: 'var(--bg-taskbar)', zIndex: 9999 }}
      >
        {/* Start Button */}
        <button
          className={cn(
            'flex items-center gap-2 px-3 h-9 rounded-md transition-colors',
            'hover:bg-[var(--bg-tertiary)]',
            showStartMenu && 'bg-[var(--bg-tertiary)]'
          )}
          onClick={() => setShowStartMenu(!showStartMenu)}
        >
          <Image
            src="/images/logo/hoganos-logo.png"
            alt="HoganOS"
            width={24}
            height={24}
            className="rounded-sm"
          />
          <span className="text-sm font-medium hidden sm:inline">Start</span>
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-[var(--border-color)] mx-2" />

        {/* Open Windows */}
        <div className="flex-1 flex items-center gap-1 overflow-x-auto">
          {windows.map((window) => (
            <button
              key={window.id}
              className={cn(
                'flex items-center gap-2 px-3 h-9 rounded-md transition-colors min-w-[120px] max-w-[200px]',
                'hover:bg-[var(--bg-tertiary)]',
                activeWindowId === window.id && !window.isMinimized
                  ? 'bg-[var(--bg-tertiary)] border-b-2 border-[var(--accent)]'
                  : 'bg-[var(--bg-secondary)]',
                window.isMinimized && 'opacity-70'
              )}
              onClick={() => handleWindowClick(window.id, window.isMinimized)}
            >
              <span className="text-sm truncate">{window.title}</span>
            </button>
          ))}
        </div>

        {/* System Tray */}
        <SystemTray />
      </div>
    </>
  );
}
