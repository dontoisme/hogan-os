'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  defaultMarkdown,
  getStoredMarkdown,
  setStoredMarkdown,
  clearStoredMarkdown,
  splitSections,
} from '@/data/presentation-content';
import { cn } from '@/lib/utils';
import { Save, RotateCcw, ChevronDown, ChevronRight, Eye, EyeOff } from 'lucide-react';

const EDITOR_PASSWORD = 'hoganos';

const sectionLabels: Record<string, string> = {
  title: 'Slide 1 — Title',
  'brutal-math': 'Slide 2 — The Brutal Math',
  'emotional-cycle': 'Slide 3 — The Emotional Cycle',
  'knowledge-exists': 'Slide 4 — You Already Know Your Stories',
  'core-idea': 'Slide 5 — SELECT, don\'t COMPOSE',
  'product-intro': 'Slide 6 — Enter Job Journal',
  'demo-dashboard': 'Slide 7 — Demo: Dashboard',
  'demo-scoring': 'Slide 8 — Demo: Job Scoring',
  'demo-resume': 'Slide 9 — Demo: Resume Generation',
  'demo-integrations': 'Slide 10 — Demo: Integrations',
  'demo-cli': 'Slide 11 — Demo: CLI',
  meta: 'Slide 12 — The Meta Moment',
  'appendix-title': 'Slide 13 — Appendix Title',
  principles: 'Slide 14 — Design Principles',
  architecture: 'Slide 15 — Architecture',
  tradeoffs: 'Slide 16 — Trade-offs',
  numbers: 'Slide 17 — By the Numbers',
  'whats-next': 'Slide 18 — What\'s Next',
};

const sectionOrder = Object.keys(sectionLabels);

export function PresentationEditor() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [markdown, setMarkdown] = useState('');
  const [sections, setSections] = useState<Record<string, string>>({});
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [viewMode, setViewMode] = useState<'sections' | 'raw'>('sections');

  useEffect(() => {
    const stored = getStoredMarkdown();
    setMarkdown(stored);
    setSections(splitSections(stored));
  }, []);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === EDITOR_PASSWORD) {
      setAuthenticated(true);
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const rebuildMarkdown = useCallback(
    (updatedSections: Record<string, string>) => {
      const parts = sectionOrder
        .filter((id) => updatedSections[id] !== undefined)
        .map((id) => `---${id}---\n${updatedSections[id]}`);
      return parts.join('\n\n');
    },
    [],
  );

  const handleSectionChange = (id: string, value: string) => {
    const next = { ...sections, [id]: value };
    setSections(next);
    setMarkdown(rebuildMarkdown(next));
    setHasChanges(true);
    setSaved(false);
  };

  const handleRawChange = (value: string) => {
    setMarkdown(value);
    setSections(splitSections(value));
    setHasChanges(true);
    setSaved(false);
  };

  const handleSave = () => {
    setStoredMarkdown(markdown);
    setSaved(true);
    setHasChanges(false);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    setMarkdown(defaultMarkdown);
    setSections(splitSections(defaultMarkdown));
    clearStoredMarkdown();
    setHasChanges(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  /* ---- Password gate ---- */
  if (!authenticated) {
    return (
      <form onSubmit={handlePasswordSubmit} className="space-y-3">
        <p className="text-sm text-[var(--text-secondary)]">
          Enter the password to edit presentation content.
        </p>
        <div className="flex gap-2">
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError(false);
            }}
            placeholder="Password"
            className={cn(
              'flex-1 px-3 py-2 rounded-lg text-sm',
              'bg-[var(--bg-tertiary)] border text-[var(--text-primary)]',
              'placeholder:text-[var(--text-muted)]',
              passwordError
                ? 'border-red-500'
                : 'border-[var(--border-color)]',
            )}
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-lg text-sm font-medium bg-[var(--accent)] text-white hover:opacity-90"
          >
            Unlock
          </button>
        </div>
        {passwordError && (
          <p className="text-xs text-red-400">Incorrect password</p>
        )}
      </form>
    );
  }

  /* ---- Editor ---- */
  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center gap-2">
        <button
          onClick={() =>
            setViewMode(viewMode === 'sections' ? 'raw' : 'sections')
          }
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
        >
          {viewMode === 'sections' ? (
            <>
              <Eye className="w-3 h-3" /> Sections
            </>
          ) : (
            <>
              <EyeOff className="w-3 h-3" /> Raw Markdown
            </>
          )}
        </button>
        <div className="flex-1" />
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
        >
          <RotateCcw className="w-3 h-3" /> Reset
        </button>
        <button
          onClick={handleSave}
          disabled={!hasChanges}
          className={cn(
            'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium',
            hasChanges
              ? 'bg-[var(--accent)] text-white hover:opacity-90'
              : 'bg-[var(--bg-tertiary)] text-[var(--text-muted)] border border-[var(--border-color)]',
          )}
        >
          <Save className="w-3 h-3" /> {saved ? 'Saved!' : 'Save'}
        </button>
      </div>

      {/* Section-by-section view */}
      {viewMode === 'sections' ? (
        <div className="space-y-1">
          {sectionOrder.map((id) => {
            const isExpanded = expandedSection === id;
            const content = sections[id] || '';
            return (
              <div
                key={id}
                className="rounded-lg border border-[var(--border-color)] overflow-hidden"
              >
                <button
                  onClick={() =>
                    setExpandedSection(isExpanded ? null : id)
                  }
                  className="w-full flex items-center gap-2 px-3 py-2 text-left bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)]"
                >
                  {isExpanded ? (
                    <ChevronDown className="w-3 h-3 text-[var(--text-muted)]" />
                  ) : (
                    <ChevronRight className="w-3 h-3 text-[var(--text-muted)]" />
                  )}
                  <span className="text-xs font-medium text-[var(--text-primary)]">
                    {sectionLabels[id] || id}
                  </span>
                  {content !== (splitSections(defaultMarkdown)[id] || '') && (
                    <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-[var(--accent)]/20 text-[var(--accent)]">
                      edited
                    </span>
                  )}
                </button>
                {isExpanded && (
                  <textarea
                    value={content}
                    onChange={(e) =>
                      handleSectionChange(id, e.target.value)
                    }
                    className="w-full px-3 py-2 text-xs font-mono leading-relaxed bg-[var(--bg-primary)] text-[var(--text-primary)] border-t border-[var(--border-color)] resize-y focus:outline-none"
                    rows={Math.max(4, content.split('\n').length + 1)}
                  />
                )}
              </div>
            );
          })}
        </div>
      ) : (
        /* Raw markdown view */
        <textarea
          value={markdown}
          onChange={(e) => handleRawChange(e.target.value)}
          className="w-full px-3 py-2 text-xs font-mono leading-relaxed rounded-lg bg-[var(--bg-primary)] text-[var(--text-primary)] border border-[var(--border-color)] resize-y focus:outline-none"
          rows={30}
        />
      )}

      <p className="text-[10px] text-[var(--text-muted)]">
        Changes are saved to your browser. Reopen the presentation to see
        updates. Reset restores the original content.
      </p>
    </div>
  );
}
