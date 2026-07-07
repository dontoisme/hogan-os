'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import Image from 'next/image';
import { useIdle } from '@/hooks/useIdle';

const IDLE_TIMEOUT = 60_000;

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION_QUERY);
  mq.addEventListener('change', callback);
  return () => mq.removeEventListener('change', callback);
}

interface ScreensaverProps {
  suspended?: boolean; // boot screen or hacker mode active
}

// After 60s idle: dark overlay, a pixel dingo trots back and forth.
// Any input dismisses (useIdle resets on the same events). Disabled under
// reduced motion.
export function Screensaver({ suspended = false }: ScreensaverProps) {
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => true // server: assume reduced until we know better
  );

  const isIdle = useIdle(IDLE_TIMEOUT, !suspended && !reducedMotion);

  const [frame, setFrame] = useState<1 | 2>(1);
  useEffect(() => {
    if (!isIdle) return;
    const interval = setInterval(() => setFrame((f) => (f === 1 ? 2 : 1)), 220);
    return () => clearInterval(interval);
  }, [isIdle]);

  if (!isIdle) return null;

  return (
    <div
      className="fixed inset-0 z-[15000] bg-zinc-950/95 overflow-hidden cursor-none"
      aria-hidden="true"
    >
      <p className="absolute top-1/3 left-1/2 -translate-x-1/2 font-mono text-sm text-zinc-600 select-none">
        Optimizing for growth…
      </p>

      {/* Trotting dingo — CSS keyframe sweeps him across; sprite frames alternate */}
      <div className="screensaver-dingo absolute bottom-16">
        <Image
          src={`/images/dingo/dingo-walk-${frame}.png`}
          alt=""
          width={96}
          height={96}
          className="pixelated"
          unoptimized
          priority
        />
      </div>

      <p className="absolute bottom-5 left-1/2 -translate-x-1/2 font-mono text-[11px] text-zinc-700 select-none">
        move the mouse to wake · the dingo doesn&apos;t mind
      </p>
    </div>
  );
}
