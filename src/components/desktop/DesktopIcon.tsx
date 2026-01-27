'use client';

import { useState } from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DesktopIconProps {
  id: string;
  label: string;
  icon: LucideIcon;
  onDoubleClick: () => void;
}

export function DesktopIcon({ id, label, icon: Icon, onDoubleClick }: DesktopIconProps) {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(true);
  };

  const handleBlur = () => {
    setIsSelected(false);
  };

  return (
    <button
      className={cn(
        'desktop-icon flex flex-col items-center justify-center gap-1 p-2 rounded-lg transition-colors w-20 h-24',
        'hover:bg-white/10 focus:bg-white/10',
        isSelected && 'bg-white/20'
      )}
      onClick={handleClick}
      onDoubleClick={onDoubleClick}
      onBlur={handleBlur}
      tabIndex={0}
    >
      <div
        className={cn(
          'w-12 h-12 flex items-center justify-center rounded-lg',
          'bg-gradient-to-br from-white/20 to-white/5',
          'shadow-lg backdrop-blur-sm'
        )}
        style={{ boxShadow: 'var(--icon-shadow)' }}
      >
        <Icon className="w-7 h-7 text-white" strokeWidth={1.5} />
      </div>
      <span
        className={cn(
          'text-xs text-white text-center leading-tight mt-1',
          'text-shadow-sm drop-shadow-md',
          isSelected && 'bg-[var(--accent)] px-1 rounded'
        )}
        style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
      >
        {label}
      </span>
    </button>
  );
}
