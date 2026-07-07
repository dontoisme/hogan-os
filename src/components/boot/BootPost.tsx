'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { playRetroSound } from '@/lib/retroSounds';

const POST_LINES = [
  'HoganBIOS v4.2 — (C) Hogan Systems',
  'Memory Test: 640K OK (should be enough for anybody)',
  'Detecting product sense .......... OK',
  'Loading growth_experiments.sys ... OK',
  'Loading dingo.drv ................ OK',
  'Mounting /career ................. OK',
  'Boot device: HOGANOS_HD1 ... booting',
];

const LINE_INTERVAL = 200;
const FIRST_LINE_DELAY = 180;

interface BootPostProps {
  phase: 'post' | 'logo';
  onPostComplete: () => void;
}

// The BIOS-style layer that plays ABOVE the (always server-rendered) hero.
export function BootPost({ phase, onPostComplete }: BootPostProps) {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    playRetroSound('bootBeep');
    const timers = POST_LINES.map((_, i) =>
      setTimeout(() => setVisibleLines(i + 1), FIRST_LINE_DELAY + i * LINE_INTERVAL)
    );
    const done = setTimeout(
      onPostComplete,
      FIRST_LINE_DELAY + POST_LINES.length * LINE_INTERVAL + 300
    );
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(done);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="absolute inset-0 z-10 bg-zinc-950 flex items-start justify-start p-8 sm:p-12">
      {phase === 'post' ? (
        <div className="font-mono text-sm sm:text-base text-zinc-300 space-y-1.5">
          {POST_LINES.slice(0, visibleLines).map((line, i) => (
            <p key={i}>{line}</p>
          ))}
          <span className="inline-block w-2.5 h-4 bg-zinc-300 animate-pulse motion-reduce:animate-none" />
        </div>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
          <Image
            src="/images/logo/hoganos-logo.png"
            alt="HoganOS"
            width={96}
            height={96}
            className="rounded-2xl animate-[fade-up_0.3s_ease-out]"
            priority
          />
          <p className="font-mono text-xs text-zinc-500 tracking-widest uppercase">
            HoganOS
          </p>
        </div>
      )}
    </div>
  );
}
