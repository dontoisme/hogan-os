'use client';

import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import Image from 'next/image';
import { FileText, Briefcase, Mail, ArrowRight } from 'lucide-react';
import { profile } from '@/data/profile';
import { openApp, toOrigin, getRequestedApp, BOOT_DISMISSED_EVENT } from '@/lib/openApp';
import { BootPost } from './boot/BootPost';
import { cn } from '@/lib/utils';

const BOOT_SEEN_KEY = 'hoganos-boot-seen';

const ctas = [
  { id: 'resume', label: 'View Resume', icon: FileText },
  { id: 'experience', label: 'The Journey', icon: Briefcase },
  { id: 'contact', label: 'Say Hi', icon: Mail },
];

type BootPhase = 'post' | 'logo' | 'hero';

// Server-rendered so the hero text (name, title, pitch) is crawlable — the
// SSR state is always the settled hero. First-time visitors are upgraded to
// the POST sequence before paint; return visitors and ?app= deep links hide
// before paint.
export function BootScreen() {
  const [hidden, setHidden] = useState(false);
  // 'hero' on server AND initial client render (hydration match + SSR text).
  const [phase, setPhase] = useState<BootPhase>('hero');
  const [heroAnimate, setHeroAnimate] = useState(false);

  useLayoutEffect(() => {
    if (localStorage.getItem(BOOT_SEEN_KEY) || getRequestedApp()) {
      // Must set synchronously before paint: the overlay is server-rendered
      // for crawlability and needs to vanish without a flash for return visits.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHidden(true);
      return;
    }
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reducedMotion) {
      // First visit: play the POST sequence (before paint, so the settled
      // hero never flashes first).
      setPhase('post');
    }
  }, []);

  const dismiss = useCallback((appId?: string, originEl?: HTMLElement) => {
    localStorage.setItem(BOOT_SEEN_KEY, '1');
    setHidden(true);
    if (appId) openApp(appId, toOrigin(originEl?.getBoundingClientRect()));
    window.dispatchEvent(
      new CustomEvent(BOOT_DISMISSED_EVENT, { detail: { openedApp: Boolean(appId) } })
    );
  }, []);

  const skipToHero = useCallback(() => {
    setHeroAnimate(false);
    setPhase('hero');
  }, []);

  const finishPost = useCallback(() => {
    setPhase('logo');
    setTimeout(() => {
      setHeroAnimate(true);
      setPhase('hero');
    }, 450);
  }, []);

  useEffect(() => {
    if (hidden) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Enter' && e.key !== 'Escape') return;
      if (phase === 'hero') {
        dismiss();
      } else {
        skipToHero();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [hidden, phase, dismiss, skipToHero]);

  if (hidden) return null;

  return (
    <div
      className="fixed inset-0 z-[20000] flex items-center justify-center p-6
                 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 text-zinc-100"
      role="dialog"
      aria-label="Welcome to HoganOS"
      onClick={phase !== 'hero' ? skipToHero : undefined}
    >
      {/* BIOS/POST layer — plays above the hero; hero stays in the DOM for SSR */}
      {phase !== 'hero' && <BootPost phase={phase} onPostComplete={finishPost} />}

      <div className={cn('max-w-xl w-full', heroAnimate && 'boot-hero-animate')}>
        {/* Boot header */}
        <p className="font-mono text-xs text-zinc-500 mb-6">
          HOGANOS v1.0 — boot complete
          <span className="inline-block w-2 h-3.5 ml-1 bg-zinc-500 align-middle animate-pulse motion-reduce:animate-none" />
        </p>

        <div className="flex items-center gap-4 mb-5">
          <Image
            src="/images/logo/hoganos-logo.png"
            alt=""
            width={56}
            height={56}
            className="rounded-xl"
            priority
          />
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">{profile.name}</h1>
            <p className="text-sm text-zinc-400">
              {profile.title} · {profile.location}
            </p>
          </div>
        </div>

        <p className="text-zinc-300 leading-relaxed mb-6">{profile.pitch}</p>

        {/* Headline stats */}
        <div className="grid grid-cols-3 gap-2 mb-8">
          {profile.headlineStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-zinc-800 bg-zinc-900/60 px-3 py-2.5"
            >
              <p className="text-sm sm:text-base font-semibold text-white">{stat.value}</p>
              <p className="text-[11px] text-zinc-500 leading-tight mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {ctas.map((cta) => (
            <button
              key={cta.id}
              onClick={(e) => dismiss(cta.id, e.currentTarget)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                         border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 transition-colors"
            >
              <cta.icon className="w-4 h-4 text-zinc-400" />
              {cta.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => dismiss()}
          className="group flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold
                     bg-white text-zinc-900 hover:bg-zinc-200 transition-colors"
        >
          Enter HoganOS
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
        </button>

        <p className="font-mono text-[11px] text-zinc-600 mt-6">
          press enter to continue · a desktop OS built with Claude Code
        </p>
      </div>
    </div>
  );
}
