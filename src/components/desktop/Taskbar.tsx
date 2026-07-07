'use client';

import { useState } from 'react';
import { useWindowStore } from '@/stores/windowStore';
import { StartMenu } from './StartMenu';
import { SystemTray } from './SystemTray';
import { cn } from '@/lib/utils';
import { playRetroSound } from '@/lib/retroSounds';
import { registerRect } from '@/lib/rectRegistry';
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
        className="retro-taskbar absolute bottom-0 left-0 right-0 h-11 flex items-center px-3 border-t border-[var(--border-color)]"
        style={{ background: 'var(--bg-taskbar)', zIndex: 9999 }}
      >
        {/* Start Button */}
        <button
          className={cn(
            'flex items-center gap-2 px-2.5 h-8 rounded-lg transition-colors',
            'hover:bg-[var(--bg-tertiary)]',
            showStartMenu && 'bg-[var(--bg-tertiary)]'
          )}
          onClick={() => {
            playRetroSound('startMenu');
            setShowStartMenu(!showStartMenu);
          }}
        >
          <Image
            src="/images/logo/hoganos-logo.png"
            alt="HoganOS"
            width={20}
            height={20}
            className="rounded-sm"
          />
          <span className="text-xs font-medium hidden sm:inline text-[var(--text-secondary)]">Start</span>
        </button>

        {/* Divider */}
        <div className="w-px h-5 bg-[var(--border-color)] mx-2" />

        {/* Open Windows */}
        <div className="flex-1 flex items-center gap-1 overflow-x-auto">
          {windows.map((window) => (
            <button
              key={window.id}
              ref={(el) => registerRect(`taskbar:${window.id}`, el)}
              className={cn(
                'flex items-center gap-2 px-3 h-8 rounded-lg transition-colors min-w-[100px] max-w-[180px]',
                'hover:bg-[var(--bg-tertiary)]',
                activeWindowId === window.id && !window.isMinimized
                  ? 'bg-[var(--bg-tertiary)] border-b-2 border-[var(--accent)]'
                  : '',
                window.isMinimized && 'opacity-50'
              )}
              onClick={() => handleWindowClick(window.id, window.isMinimized)}
            >
              <span className="text-xs truncate text-[var(--text-secondary)]">{window.title}</span>
            </button>
          ))}
        </div>

        {/* System Tray */}
        <SystemTray />
      </div>
    </>
  );
}
