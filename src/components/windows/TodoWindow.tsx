'use client';

import { useEffect, useState } from 'react';
import { useThemeStore } from '@/stores/themeStore';
import { useToastStore } from '@/stores/toastStore';
import { openApp } from '@/lib/openApp';
import { playRetroSound } from '@/lib/retroSounds';
import { profile } from '@/data/profile';
import { cn } from '@/lib/utils';

const STORAGE_KEY = 'hoganos-todo-checked';

interface TodoItem {
  id: string;
  label: string;
  appId?: string; // clicking the label opens this app
  hint?: string;
  auto?: 'sound' | 'retro'; // checked automatically when observed
}

const items: TodoItem[] = [
  { id: 'boot', label: 'Boot up HoganOS', hint: 'nailed it' },
  { id: 'gitlog', label: 'Run `git log --oneline` in the Terminal', appId: 'terminal' },
  { id: 'chiptunes', label: 'Turn on the chiptune sounds', appId: 'settings', auto: 'sound' },
  { id: 'dingo', label: 'Get a tip from Dusty the dingo', hint: 'bottom right' },
  { id: 'bin', label: 'Snoop through the Recycle Bin', appId: 'recycle-bin' },
  { id: 'retro', label: 'Try the retro theme', appId: 'settings', auto: 'retro' },
  { id: 'profiler', label: 'Check the Running Processes in The Journey', appId: 'experience' },
  { id: 'idle', label: 'Do absolutely nothing for 60 seconds', hint: 'trust me' },
  { id: 'konami', label: 'Enter the Konami code', hint: '↑↑↓↓←→←→BA' },
  { id: 'resume', label: 'Download the resume', appId: 'resume', hint: 'the actual point' },
  { id: 'hi', label: 'Say hi', appId: 'contact' },
];

function loadChecked(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return new Set(raw ? (JSON.parse(raw) as string[]) : ['boot']);
  } catch {
    return new Set(['boot']);
  }
}

export function TodoWindow() {
  const [checked, setChecked] = useState<Set<string>>(new Set(['boot']));
  const [loaded, setLoaded] = useState(false);
  const { soundEnabled, theme } = useThemeStore();

  useEffect(() => {
    setChecked(loadChecked());
    setLoaded(true);
  }, []);

  // Auto-check items the visitor has actually done
  useEffect(() => {
    if (!loaded) return;
    const autoDone: string[] = [];
    if (soundEnabled) autoDone.push('chiptunes');
    if (theme === 'retro') autoDone.push('retro');
    if (autoDone.some((id) => !checked.has(id))) {
      update(new Set([...checked, ...autoDone]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [soundEnabled, theme, loaded]);

  const update = (next: Set<string>) => {
    setChecked(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
    if (next.size === items.length) {
      useToastStore.getState().showToast({
        id: 'todo-complete',
        icon: '🏆',
        title: '100% complete',
        message: `You found everything. The only item left is ${profile.email}.`,
        duration: 8000,
      });
    }
  };

  const toggle = (id: string) => {
    playRetroSound('click');
    const next = new Set(checked);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    update(next);
  };

  const done = checked.size;

  return (
    <div
      className="h-full overflow-auto"
      style={{
        background: 'linear-gradient(180deg, #fbe89e 0%, #f7dd85 100%)',
        fontFamily: "'Marker Felt', 'Segoe Print', 'Comic Sans MS', var(--font-geist-sans), sans-serif",
      }}
    >
      <div className="p-5 text-[#5c4a1c]">
        <div className="flex items-baseline justify-between mb-3">
          <h1 className="text-lg font-bold">things to do</h1>
          <span className="text-xs opacity-70">
            {done}/{items.length}
          </span>
        </div>

        <ul className="space-y-2.5">
          {items.map((item) => {
            const isChecked = checked.has(item.id);
            return (
              <li key={item.id} className="flex items-start gap-2.5 leading-snug">
                <button
                  onClick={() => toggle(item.id)}
                  aria-label={isChecked ? `Uncheck ${item.label}` : `Check ${item.label}`}
                  className={cn(
                    'w-[18px] h-[18px] mt-0.5 shrink-0 rounded-[5px] border-2 border-[#8a6d2b]',
                    'flex items-center justify-center transition-colors',
                    isChecked ? 'bg-[#8a6d2b] text-[#fbe89e]' : 'bg-transparent hover:bg-[#8a6d2b]/15'
                  )}
                >
                  {isChecked && <span className="text-[12px] leading-none font-bold">✓</span>}
                </button>
                <span className={cn('text-[13.5px]', isChecked && 'line-through opacity-60')}>
                  {item.appId ? (
                    <button
                      onClick={() => openApp(item.appId!)}
                      className="text-left underline decoration-dotted decoration-[#8a6d2b]/60 underline-offset-2 hover:decoration-solid"
                    >
                      {item.label}
                    </button>
                  ) : (
                    item.label
                  )}
                  {item.hint && (
                    <span className="ml-1.5 text-[11px] opacity-60">({item.hint})</span>
                  )}
                </span>
              </li>
            );
          })}
        </ul>

        <p className="mt-5 text-[11px] opacity-60">
          — checked off automatically where I can tell. honor system otherwise.
        </p>
      </div>
    </div>
  );
}
