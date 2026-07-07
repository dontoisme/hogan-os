'use client';

import { playRetroSound } from '@/lib/retroSounds';
import { mobileApps } from '@/data/apps';

interface MobileAppGridProps {
  onOpenApp: (appId: string) => void;
}

export function MobileAppGrid({ onOpenApp }: MobileAppGridProps) {
  return (
    <div className="p-4 pb-8">
      <p className="text-xs text-[var(--text-muted)] mb-4 px-1">
        Welcome to HoganOS. Tap to explore.
      </p>

      <div className="grid grid-cols-3 gap-2.5">
        {mobileApps.map((app) => (
          <button
            key={app.id}
            onClick={() => {
              playRetroSound('click');
              onOpenApp(app.id);
            }}
            className="flex flex-col items-center gap-2 p-3 rounded-xl
                       bg-[var(--bg-window)] border border-[var(--border-color)]
                       active:scale-[0.97] transition-all duration-100
                       min-h-[100px]"
          >
            <div
              className="w-10 h-10 rounded-xl bg-[var(--bg-secondary)]
                         flex items-center justify-center shrink-0"
            >
              <app.icon className="w-4.5 h-4.5 text-[var(--text-secondary)]" />
            </div>
            <div className="text-center">
              <p className="text-xs font-medium text-[var(--text-primary)] leading-tight">
                {app.mobileTitle}
              </p>
              <p className="text-[10px] text-[var(--text-muted)] mt-0.5 leading-tight">
                {app.mobileDescription}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
