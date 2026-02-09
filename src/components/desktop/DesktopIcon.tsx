'use client';

import { useState } from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { playRetroSound } from '@/lib/retroSounds';

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
    playRetroSound('click');
  };

  const handleBlur = () => {
    setIsSelected(false);
  };

  return (
    <button
      className={cn(
        'desktop-icon flex flex-col items-center justify-center gap-1.5 p-2 rounded-xl transition-all w-20 h-24',
        'hover:bg-white/10',
        isSelected && 'bg-white/15'
      )}
      onClick={handleClick}
      onDoubleClick={onDoubleClick}
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
    </button>
  );
}
