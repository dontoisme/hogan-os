'use client';

import { useEffect, useState, useRef } from 'react';

// True after `timeout` ms with no pointer/keyboard/scroll input; any input
// resets. `enabled: false` pauses the timer and forces the result false.
export function useIdle(timeout: number, enabled: boolean = true): boolean {
  const [isIdle, setIsIdle] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const arm = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setIsIdle(true), timeout);
    };

    const events = ['mousemove', 'mousedown', 'keydown', 'wheel', 'touchstart'] as const;
    let throttled = false;
    const onActivity = () => {
      if (throttled) return;
      throttled = true;
      setTimeout(() => (throttled = false), 250);
      setIsIdle(false);
      arm();
    };

    events.forEach((e) => window.addEventListener(e, onActivity, { passive: true }));
    arm();

    return () => {
      events.forEach((e) => window.removeEventListener(e, onActivity));
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timeout, enabled]);

  return enabled && isIdle;
}
