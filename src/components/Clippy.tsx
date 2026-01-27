'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const tips = [
  "Hi! I'm Clippy! It looks like you're viewing a portfolio. Would you like help with that?",
  "Pro tip: Try double-clicking the icons to open windows!",
  "Did you know? You can drag windows around by their title bars!",
  "Fun fact: There's a secret code hidden in this site. Can you find it?",
  "Looking for my resume? Just double-click the Resume icon!",
  "Want to see my projects? The Projects folder has everything!",
  "You can change the theme in Settings. Try the retro mode!",
  "Thanks for visiting! Feel free to reach out via the Contact window.",
];

export function Clippy() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTip, setCurrentTip] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Show Clippy after a delay
    const showTimer = setTimeout(() => {
      if (!dismissed) {
        setIsVisible(true);
      }
    }, 5000);

    return () => clearTimeout(showTimer);
  }, [dismissed]);

  useEffect(() => {
    // Auto-hide after showing for a while
    if (isVisible) {
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 10000);

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
      {/* Clippy Button (when hidden) */}
      {!isVisible && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={cn(
            'fixed bottom-16 right-4 z-50',
            'w-12 h-12 rounded-full',
            'bg-[var(--bg-window)] border border-[var(--border-color)]',
            'flex items-center justify-center',
            'shadow-lg hover:shadow-xl transition-shadow'
          )}
          onClick={handleShow}
          title="Need help?"
        >
          <HelpCircle className="w-6 h-6 text-[var(--accent)]" />
        </motion.button>
      )}

      {/* Clippy Dialog */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className={cn(
              'fixed bottom-16 right-4 z-50',
              'w-72 rounded-lg overflow-hidden',
              'bg-[var(--bg-window)] border border-[var(--border-color)]',
              'shadow-2xl'
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-3 py-2 bg-[var(--bg-secondary)] border-b border-[var(--border-color)]">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📎</span>
                <span className="text-sm font-medium text-[var(--text-primary)]">Clippy</span>
              </div>
              <button
                onClick={handleDismiss}
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)]"
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
