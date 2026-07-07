'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

const tips = [
  "G'day! I'm Dusty, the resident dingo. It looks like you're viewing a portfolio. Don't Panic.",
  'Pro tip: double-click the icons to open windows. Drag them by the title bar. Minimize them and watch where they go.',
  'There\'s a Terminal on the desktop. Type `git log --oneline` in it — the whole career, as commits.',
  'Fun fact: there\'s a secret code hidden in this site. The answer might be 42. (↑↑ is a good start.)',
  'Hiring a product leader? The Resume icon has a real PDF behind it. Radical, I know.',
  'Don grew Wellcore from $100K to $1.8M ARR with a 7-person company. I mostly supervised.',
  'Day 14 activation from 8% to 25% at Mattermost. I would have settled for 20%, but nobody asked me.',
  'Try the retro theme in Preferences. It\'s like nostalgia, but with better conversion rates.',
  'Check the Recycle Bin. Some things are better left deleted.',
  'If you go idle for a minute, I get the whole screen to myself. Just saying.',
];

const SHOW_DELAY = 25_000;

export function DingoAssistant() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTip, setCurrentTip] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => {
      if (!dismissed) {
        setIsVisible(true);
      }
    }, SHOW_DELAY);

    return () => clearTimeout(showTimer);
  }, [dismissed]);

  useEffect(() => {
    // Auto-hide after showing for a while
    if (isVisible) {
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 12000);

      return () => clearTimeout(hideTimer);
    }
  }, [isVisible, currentTip]);

  const handleNextTip = () => {
    setCurrentTip((prev) => (prev + 1) % tips.length);
  };

  const handleDismiss = () => {
    setIsVisible(false);
    setDismissed(true);
  };

  const handleShow = () => {
    setIsVisible(true);
    setDismissed(false);
  };

  return (
    <>
      {/* Dusty button (when hidden) */}
      {!isVisible && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={cn(
            'fixed bottom-16 right-4 z-50',
            'w-12 h-12 rounded-full',
            'bg-[var(--bg-window)] border border-[var(--border-color)]',
            'flex items-center justify-center',
            'shadow-lg hover:shadow-xl transition-shadow overflow-hidden'
          )}
          onClick={handleShow}
          title="Ask the dingo"
        >
          <Image
            src="/images/dingo/dingo-idle.png"
            alt="Dusty the dingo"
            width={36}
            height={36}
            className="pixelated"
            unoptimized
          />
        </motion.button>
      )}

      {/* Dusty dialog — sits above the toast corner so they never overlap */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className={cn(
              'fixed bottom-32 right-4 z-50',
              'w-72 rounded-lg overflow-hidden',
              'bg-[var(--bg-window)] border border-[var(--border-color)]',
              'shadow-2xl'
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-3 py-2 bg-[var(--bg-secondary)] border-b border-[var(--border-color)]">
              <div className="flex items-center gap-2">
                <Image
                  src="/images/dingo/dingo-wave.png"
                  alt=""
                  width={28}
                  height={28}
                  className="pixelated"
                  unoptimized
                />
                <span className="text-sm font-medium text-[var(--text-primary)]">Dusty</span>
                <span className="text-[10px] text-[var(--text-muted)]">spirit animal, unpaid</span>
              </div>
              <button
                onClick={handleDismiss}
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                aria-label="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4">
              <p className="text-sm text-[var(--text-secondary)] mb-4">
                {tips[currentTip]}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handleNextTip}
                  className={cn(
                    'flex-1 px-3 py-1.5 rounded text-sm',
                    'bg-[var(--accent)] text-white',
                    'hover:bg-[var(--accent-hover)]'
                  )}
                >
                  Next Tip
                </button>
                <button
                  onClick={handleDismiss}
                  className={cn(
                    'px-3 py-1.5 rounded text-sm',
                    'border border-[var(--border-color)]',
                    'hover:bg-[var(--bg-tertiary)]'
                  )}
                >
                  Dismiss
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
