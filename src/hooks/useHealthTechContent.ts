'use client';

import { useMemo } from 'react';
import { getHealthTechSections } from '@/data/health-tech-content';

/**
 * Returns parsed health-tech presentation sections from localStorage (or defaults).
 * Each slide calls this to get its markdown section.
 */
export function useHealthTechContent(): Record<string, string> {
  return useMemo(() => {
    return getHealthTechSections();
  }, []);
}
