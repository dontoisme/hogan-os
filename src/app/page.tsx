'use client';

import { BootScreen } from '@/components/BootScreen';
import { Desktop } from '@/components/desktop/Desktop';
import { MobileShell } from '@/components/mobile/MobileShell';

export default function Home() {
  return (
    <>
      <BootScreen />
      <Desktop />
      <MobileShell />
    </>
  );
}
