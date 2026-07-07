'use client';

import { MotionConfig } from 'framer-motion';
import { BootScreen } from '@/components/BootScreen';
import { Desktop } from '@/components/desktop/Desktop';
import { MobileShell } from '@/components/mobile/MobileShell';
import { ToastHost } from '@/components/system/ToastHost';
import { ChiptunesPrompt } from '@/components/system/ChiptunesPrompt';

export default function Home() {
  return (
    <MotionConfig reducedMotion="user">
      <BootScreen />
      <Desktop />
      <MobileShell />
      {/* Mounted once, above both shells — single-fire by construction */}
      <ToastHost />
      <ChiptunesPrompt />
    </MotionConfig>
  );
}
