'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X } from 'lucide-react';

interface HackerModeProps {
  isActive: boolean;
  onClose: () => void;
}

const hackerLines = [
  '> SYSTEM ACCESS GRANTED',
  '> Initializing neural interface...',
  '> Loading portfolio.exe...',
  '> Decrypting skill matrix...',
  '> Welcome, elite hacker.',
  '> You found the secret!',
  '',
  '███████╗██╗   ██╗███╗   ██╗',
  '██╔════╝██║   ██║████╗  ██║',
  '█████╗  ██║   ██║██╔██╗ ██║',
  '██╔══╝  ██║   ██║██║╚██╗██║',
  '██║     ╚██████╔╝██║ ╚████║',
  '╚═╝      ╚═════╝ ╚═╝  ╚═══╝',
  '',
  '> Thanks for checking out my portfolio!',
  '> Press ESC or click X to exit.',
];

export function HackerMode({ isActive, onClose }: HackerModeProps) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setDisplayedLines([]);
      setCurrentLineIndex(0);
      return;
    }

    if (currentLineIndex < hackerLines.length) {
      const timer = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, hackerLines[currentLineIndex]]);
        setCurrentLineIndex((prev) => prev + 1);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isActive, currentLineIndex]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isActive) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isActive, onClose]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[99999] bg-black flex items-center justify-center p-8"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-green-500 hover:text-green-400 transition-colors"
          >
            <X className="w-8 h-8" />
          </button>

          <div className="max-w-2xl w-full">
            <div className="flex items-center gap-2 text-green-500 mb-4">
              <Terminal className="w-6 h-6" />
              <span className="font-mono text-lg">HACKER_MODE.exe</span>
            </div>

            <div className="font-mono text-green-500 text-sm space-y-1">
              {displayedLines.map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.1 }}
                  className="whitespace-pre"
                >
                  {line}
                </motion.div>
              ))}
              {currentLineIndex < hackerLines.length && (
                <span className="animate-pulse">▌</span>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
