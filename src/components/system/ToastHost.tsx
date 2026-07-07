'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useToastStore } from '@/stores/toastStore';
import { cn } from '@/lib/utils';

// Mounted exactly once in page.tsx, above both shells. Desktop: bottom-right
// above the taskbar; mobile: bottom-center above the safe area (see globals).
export function ToastHost() {
  const { toasts, dismissToast } = useToastStore();

  return (
    <div className="toast-host fixed z-[10500] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.2, 0.9, 0.3, 1] }}
            className={cn(
              'pointer-events-auto w-80 max-w-[calc(100vw-2rem)] rounded-xl p-3.5',
              'border border-[var(--border-color)] shadow-lg'
            )}
            style={{ background: 'var(--bg-window)', boxShadow: 'var(--window-shadow)' }}
            role="status"
          >
            <div className="flex items-start gap-3">
              {toast.icon && <span className="text-xl leading-none mt-0.5">{toast.icon}</span>}
              <div className="flex-1 min-w-0">
                {toast.title && (
                  <p className="text-sm font-semibold text-[var(--text-primary)] mb-0.5">
                    {toast.title}
                  </p>
                )}
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {toast.message}
                </p>
                {toast.actions && toast.actions.length > 0 && (
                  <div className="flex gap-2 mt-2.5">
                    {toast.actions.map((action) => (
                      <button
                        key={action.label}
                        onClick={() => {
                          action.onAction();
                          dismissToast(toast.id);
                        }}
                        className={cn(
                          'px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
                          action.primary
                            ? 'bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)]'
                            : 'border border-[var(--border-color)] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]'
                        )}
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button
                onClick={() => dismissToast(toast.id)}
                className="p-1 rounded-md hover:bg-[var(--bg-tertiary)] transition-colors"
                aria-label="Dismiss"
              >
                <X className="w-3.5 h-3.5 text-[var(--text-muted)]" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
