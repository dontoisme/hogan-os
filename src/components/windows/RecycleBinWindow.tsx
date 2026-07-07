'use client';

import Image from 'next/image';
import { FileX2, RotateCcw } from 'lucide-react';
import { playRetroSound } from '@/lib/retroSounds';
import { useToastStore } from '@/stores/toastStore';
import { cn } from '@/lib/utils';

interface DeletedFile {
  name: string;
  size: string;
  deleted: string;
  note: string;
  restoreError: string;
}

const deletedFiles: DeletedFile[] = [
  {
    name: 'work-life-balance.exe',
    size: '4.2 MB',
    deleted: 'a while ago',
    note: 'Cannot delete permanently: file is in use by ambition.dll',
    restoreError: 'Restore failed: ambition.dll still holds the lock.',
  },
  {
    name: '8-hours-of-sleep.dll',
    size: '8.0 MB',
    deleted: 'circa 2023',
    note: 'Deprecated in favor of coffee-daemon',
    restoreError: 'Restore failed: coffee-daemon has claimed this port.',
  },
  {
    name: 'failed-experiment-047.log',
    size: '112 KB',
    deleted: 'last quarter',
    note: 'Hypothesis rejected. Learned something anyway.',
    restoreError: 'Not restoring this one — the learnings already shipped.',
  },
  {
    name: 'perfectionism.exe',
    size: '∞ KB',
    deleted: 'ongoing',
    note: 'Replaced with done-is-better-than-perfect.sh',
    restoreError: 'Restore blocked by done-is-better-than-perfect.sh (thankfully).',
  },
  {
    name: 'generic-portfolio-template.zip',
    size: '87 MB',
    deleted: 'day one',
    note: 'You’re looking at the replacement.',
    restoreError: 'Absolutely not.',
  },
];

export function RecycleBinWindow() {
  const showToast = useToastStore((s) => s.showToast);

  const handleRestore = (file: DeletedFile) => {
    playRetroSound('error');
    showToast({
      id: `restore-${file.name}`,
      icon: '🚫',
      title: 'Restore failed',
      message: file.restoreError,
      duration: 4500,
    });
  };

  return (
    <div className="h-full overflow-auto p-4">
      <p className="text-xs text-[var(--text-muted)] mb-3 px-1">
        {deletedFiles.length} items · none of them coming back
      </p>

      <div className="space-y-2">
        {deletedFiles.map((file) => (
          <div
            key={file.name}
            className={cn(
              'p-3 rounded-lg flex items-start gap-3',
              'bg-[var(--bg-secondary)] border border-[var(--border-color)]'
            )}
          >
            <div className="w-9 h-9 rounded-lg bg-[var(--bg-tertiary)] flex items-center justify-center shrink-0">
              <FileX2 className="w-4.5 h-4.5 text-[var(--text-muted)]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2 flex-wrap">
                <p className="font-mono text-sm text-[var(--text-primary)]">{file.name}</p>
                <span className="text-[11px] text-[var(--text-muted)]">
                  {file.size} · deleted {file.deleted}
                </span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] mt-1">{file.note}</p>
            </div>
            <button
              onClick={() => handleRestore(file)}
              className={cn(
                'flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs shrink-0 transition-colors',
                'border border-[var(--border-color)] text-[var(--text-secondary)]',
                'hover:bg-[var(--bg-tertiary)]'
              )}
            >
              <RotateCcw className="w-3 h-3" />
              Restore
            </button>
          </div>
        ))}
      </div>

      {/* Sleeping dingo keeps watch */}
      <div className="flex flex-col items-center gap-2 mt-8 mb-4 opacity-70">
        <Image
          src="/images/dingo/dingo-sleep.png"
          alt="A sleeping pixel-art dingo"
          width={72}
          height={72}
          className="pixelated"
          unoptimized
        />
        <p className="text-[11px] text-[var(--text-muted)]">
          The dingo guards the bin. He is not very good at it.
        </p>
      </div>
    </div>
  );
}
