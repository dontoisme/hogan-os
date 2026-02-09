'use client';

import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';

interface MobileAppPanelProps {
  appId: string;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

export function MobileAppPanel({ title, onClose, children }: MobileAppPanelProps) {
  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className="fixed inset-0 z-50 flex flex-col bg-[var(--bg-primary)]"
    >
      {/* Panel header */}
      <div
        className="flex items-center gap-3 px-3 py-2 border-b border-[var(--border-color)]
                    bg-[var(--bg-window)] shrink-0"
      >
        <button
          onClick={onClose}
          className="flex items-center gap-0.5 px-2 py-2 -ml-1 rounded-lg
                     text-[var(--text-secondary)] min-w-[44px] min-h-[44px]
                     transition-colors hover:text-[var(--text-primary)]"
          aria-label="Go back"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="text-xs">Back</span>
        </button>
        <span className="flex-1 text-center text-xs font-medium text-[var(--text-secondary)] truncate pr-[60px]">
          {title}
        </span>
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-hidden mobile-panel-content">
        {children}
      </div>
    </motion.div>
  );
}
