'use client';

import { useEffect, useRef } from 'react';
import { useWindowStore } from '@/stores/windowStore';
import { useThemeStore } from '@/stores/themeStore';
import { playRetroSound } from '@/lib/retroSounds';

export function useRetroSounds() {
  const prevWindowIds = useRef<Set<string>>(new Set());
  const hasPlayedStartup = useRef(false);

  // Play startup chime once after mount (with delay)
  useEffect(() => {
    if (hasPlayedStartup.current) return;
    hasPlayedStartup.current = true;

    const timer = setTimeout(() => {
      if (useThemeStore.getState().soundEnabled) {
        playRetroSound('startup');
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // Subscribe to window store changes for open/close/minimize sounds
  useEffect(() => {
    // Initialize with current window IDs
    const initialWindows = useWindowStore.getState().windows;
    prevWindowIds.current = new Set(initialWindows.map(w => w.id));

    const unsubscribe = useWindowStore.subscribe((state, prevState) => {
      const currentIds = new Set(state.windows.map(w => w.id));
      const previousIds = new Set(prevState.windows.map(w => w.id));

      // Detect new windows (opened)
      for (const id of currentIds) {
        if (!previousIds.has(id)) {
          playRetroSound('windowOpen');
          break;
        }
      }

      // Detect removed windows (closed)
      for (const id of previousIds) {
        if (!currentIds.has(id)) {
          playRetroSound('windowClose');
          break;
        }
      }

      // Detect minimize
      for (const win of state.windows) {
        const prev = prevState.windows.find(w => w.id === win.id);
        if (prev && !prev.isMinimized && win.isMinimized) {
          playRetroSound('minimize');
          break;
        }
      }

      prevWindowIds.current = currentIds;
    });

    return unsubscribe;
  }, []);
}
