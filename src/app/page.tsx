'use client';

import { Desktop } from '@/components/desktop/Desktop';
import { MobileShell } from '@/components/mobile/MobileShell';

export default function Home() {
  return (
    <>
      <Desktop />
      <MobileShell />
    </>
  );
}
