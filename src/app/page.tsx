'use client';

import { Desktop } from '@/components/desktop/Desktop';
import { MobileFallback } from '@/components/MobileFallback';

export default function Home() {
  return (
    <>
      <Desktop />
      <MobileFallback />
    </>
  );
}
