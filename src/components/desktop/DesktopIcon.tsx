'use client';

import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { playRetroSound } from '@/lib/retroSounds';
import { registerRect } from '@/lib/rectRegistry';

interface DesktopIconProps {
  id: string;
  label: string;
  icon: LucideIcon;
  onOpen: (rect: DOMRect | null) => void;
}

export function DesktopIcon({ id, label, icon: Icon, onOpen }: DesktopIconProps) {
  const [isSelected, setIsSelected] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const setRef = useCallback(
    (el: HTMLButtonElement | null) => {
      buttonRef.current = el;
      registerRect(`icon:${id}`, el);
    },
    [id]
  );

  const handleClick = () => {
    setIsSelected(true);
    playRetroSound('click');
  };

  const handleOpen = () => {
    onOpen(buttonRef.current?.getBoundingClientRect() ?? null);
  };

  const handleBlur = () => {
    setIsSelected(false);
  };

  return (
    <motion.button
      ref={setRef}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={cn(
        'desktop-icon flex flex-col items-center justify-center gap-1.5 p-2 rounded-xl w-20 h-24',
        'hover:bg-white/10',
        isSelected && 'bg-white/15'
      )}
      onClick={handleClick}
      onDoubleClick={handleOpen}
      onBlur={handleBlur}
      tabIndex={0}
    >
      <div
        className={cn(
          'w-11 h-11 flex items-center justify-center rounded-xl',
          'bg-white/10 border border-white/10'
        )}
      >
        <Icon className="w-6 h-6 text-white/90" strokeWidth={1.5} />
      </div>
      <span
        className={cn(
          'text-[11px] text-white/90 text-center leading-tight',
          isSelected && 'text-white'
        )}
        style={{ textShadow: '0 1px 3px rgba(0,0,0,0.4)' }}
      >
        {label}
      </span>
    </motion.button>
  );
}
