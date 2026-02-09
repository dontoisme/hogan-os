'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SlideViewerProps {
  slides: React.ComponentType[];
}

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -300 : 300,
    opacity: 0,
  }),
};

export function SlideViewer({ slides }: SlideViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const goNext = useCallback(() => {
    if (currentIndex < slides.length - 1) {
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentIndex, slides.length]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  const goToSlide = useCallback(
    (index: number) => {
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
    },
    [currentIndex],
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;

      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        goNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrev]);

  const CurrentSlide = slides[currentIndex];

  return (
    <div className="h-full flex flex-col relative">
      {/* Slide content */}
      <div className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="absolute inset-0 overflow-auto"
          >
            <CurrentSlide />
          </motion.div>
        </AnimatePresence>

        {/* Prev arrow */}
        <button
          className={cn(
            'absolute left-0 top-0 bottom-0 w-14 flex items-center justify-start pl-2',
            'opacity-0 hover:opacity-100 transition-opacity z-10',
            currentIndex === 0 && 'pointer-events-none',
          )}
          onClick={goPrev}
        >
          <div className="w-8 h-8 rounded-full bg-[var(--bg-secondary)]/80 flex items-center justify-center">
            <ChevronLeft className="w-5 h-5 text-[var(--text-muted)]" />
          </div>
        </button>

        {/* Next arrow */}
        <button
          className={cn(
            'absolute right-0 top-0 bottom-0 w-14 flex items-center justify-end pr-2',
            'opacity-0 hover:opacity-100 transition-opacity z-10',
            currentIndex === slides.length - 1 && 'pointer-events-none',
          )}
          onClick={goNext}
        >
          <div className="w-8 h-8 rounded-full bg-[var(--bg-secondary)]/80 flex items-center justify-center">
            <ChevronRight className="w-5 h-5 text-[var(--text-muted)]" />
          </div>
        </button>
      </div>

      {/* Bottom bar */}
      <div className="h-10 flex items-center justify-center gap-4 border-t border-[var(--border-color)] bg-[var(--bg-secondary)] shrink-0">
        <span className="text-xs text-[var(--text-muted)] tabular-nums">
          {currentIndex + 1} / {slides.length}
        </span>
        <div className="flex gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={cn(
                'h-2 rounded-full transition-all duration-200',
                i === currentIndex
                  ? 'w-5 bg-[var(--accent)]'
                  : 'w-2 bg-[var(--text-muted)]/30 hover:bg-[var(--text-muted)]',
              )}
            />
          ))}
        </div>
        <span className="text-xs text-[var(--text-muted)]">
          <kbd className="px-1 py-0.5 rounded bg-[var(--bg-tertiary)] text-[10px]">
            &larr; &rarr;
          </kbd>
        </span>
      </div>
    </div>
  );
}
