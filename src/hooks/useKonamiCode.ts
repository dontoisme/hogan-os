'use client';

import { useEffect, useState, useCallback } from 'react';

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'KeyB',
  'KeyA',
];

export function useKonamiCode(callback?: () => void) {
  const [input, setInput] = useState<string[]>([]);
  const [activated, setActivated] = useState(false);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const newInput = [...input, e.code].slice(-KONAMI_CODE.length);
      setInput(newInput);

      if (newInput.join(',') === KONAMI_CODE.join(',')) {
        setActivated(true);
        callback?.();
        setInput([]);
      }
    },
    [input, callback]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return { activated, reset: () => setActivated(false) };
}
