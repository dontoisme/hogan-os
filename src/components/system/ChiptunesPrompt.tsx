'use client';

import { useEffect, useRef } from 'react';
import { useThemeStore } from '@/stores/themeStore';
import { useToastStore } from '@/stores/toastStore';
import { playRetroSound } from '@/lib/retroSounds';
import { BOOT_DISMISSED_EVENT } from '@/lib/openApp';

const ASKED_KEY = 'hoganos-chiptunes-asked';
const PROMPT_DELAY = 4000; // after the auto-open moment lands

// Mounted once in page.tsx. Asks once per browser whether to enable the
// chiptune system sounds; audio stays off unless accepted.
export function ChiptunesPrompt() {
  const scheduled = useRef(false);

  useEffect(() => {
    if (scheduled.current) return;
    if (localStorage.getItem(ASKED_KEY)) return;
    if (useThemeStore.getState().soundEnabled) return;

    let timer: ReturnType<typeof setTimeout> | null = null;

    const schedule = () => {
      if (scheduled.current) return;
      scheduled.current = true;
      timer = setTimeout(() => {
        if (localStorage.getItem(ASKED_KEY)) return;
        localStorage.setItem(ASKED_KEY, '1');
        useToastStore.getState().showToast({
          id: 'chiptunes',
          icon: '🎵',
          title: 'Sound check',
          message: 'This OS has chiptune system sounds. Want them on?',
          actions: [
            {
              label: 'Chiptunes on',
              primary: true,
              onAction: () => {
                useThemeStore.getState().setSoundEnabled(true);
                playRetroSound('startup');
              },
            },
            { label: 'No thanks', onAction: () => {} },
          ],
        });
      }, PROMPT_DELAY);
    };

    // Boot already dismissed on a previous load → schedule now; otherwise
    // wait for this load's dismissal.
    if (localStorage.getItem('hoganos-boot-seen')) {
      schedule();
    }
    window.addEventListener(BOOT_DISMISSED_EVENT, schedule);

    return () => {
      window.removeEventListener(BOOT_DISMISSED_EVENT, schedule);
      if (timer) clearTimeout(timer);
    };
  }, []);

  return null;
}
