'use client';

import { useState } from 'react';
import { presentations, Presentation } from '@/data/presentations';
import { SlideViewer } from '@/components/presentations/SlideViewer';
import { jobJournalSlides } from '@/components/presentations/slides/JobJournalCaseStudy';
import { Presentation as PresentationIcon, Calendar, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

const slideDecks: Record<string, React.ComponentType[]> = {
  'job-journal-case-study': jobJournalSlides,
};

export function PresentationsWindow() {
  const [selected, setSelected] = useState<Presentation | null>(null);

  if (selected) {
    const slides = slideDecks[selected.id];
    if (!slides) return null;

    return (
      <div className="h-full flex flex-col">
        <div className="p-3 border-b border-[var(--border-color)] flex items-center justify-between shrink-0">
          <button
            className="text-sm text-[var(--accent)] hover:underline"
            onClick={() => setSelected(null)}
          >
            &larr; Back to Presentations
          </button>
          <span className="text-xs text-[var(--text-muted)] truncate ml-4">
            {selected.title}: {selected.subtitle}
          </span>
        </div>
        <div className="flex-1 overflow-hidden">
          <SlideViewer slides={slides} />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full p-4 overflow-auto">
      <div className="grid grid-cols-1 gap-4">
        {presentations.map((pres) => (
          <button
            key={pres.id}
            className={cn(
              'p-5 rounded-lg text-left transition-all',
              'bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)]',
              'border border-[var(--border-color)] hover:border-[var(--accent)]',
            )}
            onClick={() => setSelected(pres)}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[var(--accent)] to-purple-500 flex items-center justify-center shrink-0">
                <PresentationIcon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-[var(--text-primary)]">
                  {pres.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] mt-0.5">
                  {pres.subtitle}
                </p>
                <p className="text-xs text-[var(--text-muted)] mt-2 line-clamp-2">
                  {pres.description}
                </p>
                <div className="flex items-center gap-3 mt-3">
                  <span className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                    <Calendar className="w-3 h-3" />
                    {pres.date}
                  </span>
                  <span className="text-xs text-[var(--text-muted)]">
                    {pres.slideCount} slides
                  </span>
                  <div className="flex gap-1 ml-auto">
                    {pres.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-[10px] bg-[var(--bg-tertiary)] text-[var(--text-muted)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-[var(--accent)]/20 flex items-center justify-center shrink-0 self-center">
                <Play className="w-4 h-4 text-[var(--accent)] ml-0.5" />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
