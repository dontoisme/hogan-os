'use client';

import { useEffect, useRef, useState } from 'react';
import { useWindowStore } from '@/stores/windowStore';
import { openApp } from '@/lib/openApp';
import { playRetroSound } from '@/lib/retroSounds';
import { runCommand, WELCOME_LINES, TermLine } from '@/lib/terminalCommands';
import { cn } from '@/lib/utils';

const PROMPT = 'don@hoganos:~$';

const styleClasses: Record<NonNullable<TermLine['style']>, string> = {
  plain: 'text-zinc-200',
  accent: 'text-emerald-400',
  muted: 'text-zinc-500',
  error: 'text-red-400',
  success: 'text-emerald-300',
};

// The terminal keeps its own dark palette in every theme — like a real
// terminal emulator would.
export function TerminalWindow() {
  const [lines, setLines] = useState<TermLine[]>(WELCOME_LINES);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  const submit = () => {
    const raw = input;
    setInput('');
    setHistoryIndex(-1);
    if (raw.trim()) setHistory((h) => [...h, raw]);

    const result = runCommand(raw);
    const echo: TermLine = { text: `${PROMPT} ${raw}`, style: 'plain' };

    if (result.action === 'clear') {
      setLines([]);
      return;
    }

    setLines((prev) => [...prev, echo, ...result.lines]);

    if (result.action === 'exit') {
      const { isWindowOpen, closeWindow } = useWindowStore.getState();
      if (isWindowOpen('terminal')) {
        setTimeout(() => closeWindow('terminal'), 900);
      } else {
        // Mobile panel — no window to close
        setLines((prev) => [...prev, { text: '(on mobile: use the back button up top)', style: 'muted' }]);
      }
    } else if (result.action && typeof result.action === 'object' && 'open' in result.action) {
      openApp(result.action.open);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      submit();
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const next = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(next);
      setInput(history[next]);
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const next = historyIndex + 1;
      if (next >= history.length) {
        setHistoryIndex(-1);
        setInput('');
      } else {
        setHistoryIndex(next);
        setInput(history[next]);
      }
      return;
    }
    if (e.key.length === 1) playRetroSound('keystroke');
  };

  return (
    <div
      className="h-full flex flex-col bg-[#0c0c0e] font-mono text-[13px] leading-relaxed cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      <div ref={scrollRef} className="flex-1 overflow-auto p-4 space-y-0.5">
        {lines.map((l, i) => (
          <p key={i} className={cn('whitespace-pre-wrap break-words', styleClasses[l.style ?? 'plain'])}>
            {l.text}
          </p>
        ))}

        {/* Prompt */}
        <div className="flex items-center gap-2 pt-1">
          <span className="text-emerald-400 shrink-0">{PROMPT}</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            className="flex-1 bg-transparent outline-none text-zinc-100 caret-emerald-400"
            autoFocus
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            aria-label="Terminal input"
          />
        </div>
      </div>
    </div>
  );
}
