'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useThemeStore } from '@/stores/themeStore';
import { useWindowStore } from '@/stores/windowStore';
import { useKonamiCode } from '@/hooks/useKonamiCode';
import { useRetroSounds } from '@/hooks/useRetroSounds';
import { OPEN_APP_EVENT, BOOT_DISMISSED_EVENT, getRequestedApp, toOrigin } from '@/lib/openApp';
import { getRect } from '@/lib/rectRegistry';
import { desktopApps, getApp, openAppWindow } from '@/data/apps';
import { DesktopIcon } from './DesktopIcon';
import { Taskbar } from './Taskbar';
import { ContextMenu } from './ContextMenu';
import { Window } from '../windows/Window';
import { DingoAssistant } from '../DingoAssistant';
import { HackerMode } from '../HackerMode';
import { Screensaver } from '../system/Screensaver';

const AUTO_OPEN_KEY = 'hoganos-autoopen-done';

export function Desktop() {
  const { theme } = useThemeStore();
  const { windows } = useWindowStore();
  const [hackerModeActive, setHackerModeActive] = useState(false);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const autoOpenFired = useRef(false);

  // Retro sound effects (subscribes to window events)
  useRetroSounds();

  // Konami code easter egg
  useKonamiCode(() => {
    setHackerModeActive(true);
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // The "things to do" sticky lives on the right third of the desktop by
  // default — like a real sticky note, it's there when you sit down.
  // (Declared before the deep-link effect so a ?app= window opens above it.)
  useEffect(() => {
    const { openWindow, isWindowOpen } = useWindowStore.getState();
    if (isWindowOpen('todo')) return;
    const app = getApp('todo');
    if (!app) return;
    const width = app.size?.width ?? 340;
    const height = app.size?.height ?? 540;
    openWindow('todo', app.title, app.iconKey, {
      size: { width, height },
      minSize: app.minSize,
      position: {
        x: Math.max(24, window.innerWidth - width - 28),
        y: Math.max(16, Math.min(90, window.innerHeight - height - 60)),
      },
    });
  }, []);

  // Open apps requested by the boot screen CTAs or the ?app= deep link
  useEffect(() => {
    const handler = (e: Event) => {
      const { id, origin } = (e as CustomEvent).detail ?? {};
      if (id) openAppWindow(id, origin);
    };
    window.addEventListener(OPEN_APP_EVENT, handler);
    const requested = getRequestedApp();
    if (requested) openAppWindow(requested);
    return () => window.removeEventListener(OPEN_APP_EVENT, handler);
  }, []);

  // First visit only: after the boot screen is dismissed without opening
  // anything, Start Here flies open from its desktop icon.
  useEffect(() => {
    const handler = (e: Event) => {
      const openedApp = Boolean((e as CustomEvent).detail?.openedApp);
      if (openedApp || getRequestedApp()) return;
      if (autoOpenFired.current || localStorage.getItem(AUTO_OPEN_KEY)) return;
      autoOpenFired.current = true;
      localStorage.setItem(AUTO_OPEN_KEY, '1');
      setTimeout(() => {
        openAppWindow('readme', toOrigin(getRect('icon:readme')));
      }, 800);
    };
    window.addEventListener(BOOT_DISMISSED_EVENT, handler);
    return () => window.removeEventListener(BOOT_DISMISSED_EVENT, handler);
  }, []);

  return (
    <div
      className="desktop-only relative h-screen w-screen overflow-hidden"
      style={{
        background: 'var(--wallpaper-gradient)',
        backgroundSize: 'var(--wallpaper-size)',
        backgroundPosition: 'var(--wallpaper-position)',
        backgroundRepeat: 'no-repeat',
      }}
      onContextMenu={(e) => {
        // Custom menu on the desktop surface only — windows keep the native menu
        if ((e.target as HTMLElement).closest('.window-chrome, .retro-taskbar')) return;
        e.preventDefault();
        setContextMenu({ x: e.clientX, y: e.clientY });
      }}
    >
      {/* Desktop Icons */}
      <div className="absolute inset-0 p-4 pb-16">
        <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(auto-fill, 90px)' }}>
          {desktopApps.map((app) => (
            <DesktopIcon
              key={app.id}
              id={app.id}
              label={app.title}
              icon={app.icon}
              onOpen={(rect) => openAppWindow(app.id, toOrigin(rect))}
            />
          ))}
        </div>
      </div>

      {/* Windows — minimized ones stay mounted so restore animates back
          from the taskbar and content state survives */}
      <AnimatePresence>
        {windows.map((windowState) => {
          const app = getApp(windowState.id);
          if (!app) return null;
          const WindowContent = app.Window;

          return (
            <Window key={windowState.id} windowState={windowState}>
              <WindowContent />
            </Window>
          );
        })}
      </AnimatePresence>

      {/* Taskbar */}
      <Taskbar />

      {/* Right-click menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
        />
      )}

      {/* Dusty the dingo (Clippy's successor) */}
      <DingoAssistant />

      {/* Idle screensaver */}
      <Screensaver suspended={hackerModeActive} />

      {/* Hacker Mode Easter Egg */}
      <HackerMode
        isActive={hackerModeActive}
        onClose={() => setHackerModeActive(false)}
      />
    </div>
  );
}
