'use client';

import { useMemo } from 'react';
import { getStoredMarkdown, splitSections } from '@/data/presentation-content';

/**
 * Returns parsed presentation sections from localStorage (or defaults).
 * Each slide calls this to get its markdown section.
 */
export function usePresentationContent(): Record<string, string> {
  return useMemo(() => {
    const markdown = getStoredMarkdown();
    return splitSections(markdown);
  }, []);
}
