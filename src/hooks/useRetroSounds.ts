'use client';

import { useEffect } from 'react';
import { useWindowStore } from '@/stores/windowStore';
import { useThemeStore } from '@/stores/themeStore';
import { playRetroSound } from '@/lib/retroSounds';

// Both shells (Desktop + MobileShell) mount this hook, and both are always
// in the tree — module-level guards keep every sound single-fire.
let startupScheduled = false;
let subscriberCount = 0;
let unsubscribeStore: (() => void) | null = null;

function subscribeWindowSounds() {
  return useWindowStore.subscribe((state, prevState) => {
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
  });
}

export function useRetroSounds() {
  // Play startup chime once after mount (with delay)
  useEffect(() => {
    if (startupScheduled) return;
    startupScheduled = true;

    const timer = setTimeout(() => {
      if (useThemeStore.getState().soundEnabled) {
        playRetroSound('startup');
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // Single shared store subscription for open/close/minimize sounds
  useEffect(() => {
    if (subscriberCount === 0) {
      unsubscribeStore = subscribeWindowSounds();
    }
    subscriberCount++;

    return () => {
      subscriberCount--;
      if (subscriberCount === 0 && unsubscribeStore) {
        unsubscribeStore();
        unsubscribeStore = null;
      }
    };
  }, []);
}
