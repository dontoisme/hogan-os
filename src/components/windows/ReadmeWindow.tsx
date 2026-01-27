'use client';

import { useState } from 'react';
import { customizationItems, categories } from '@/data/customization';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronRight, Download, FileText, Sparkles } from 'lucide-react';

export function ReadmeWindow() {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(['WALLPAPER', 'PROFILE'])
  );
  const [filter, setFilter] = useState('');

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const filteredItems = filter
    ? customizationItems.filter(
        item =>
          item.item.toLowerCase().includes(filter.toLowerCase()) ||
          item.notes.toLowerCase().includes(filter.toLowerCase()) ||
          item.category.toLowerCase().includes(filter.toLowerCase())
      )
    : customizationItems;

  const filteredCategories = filter
    ? [...new Set(filteredItems.map(item => item.category))]
    : categories;

  const downloadCSV = () => {
    const headers = ['Category', 'Item', 'Current Value', 'File Location', 'Notes'];
    const rows = customizationItems.map(item => [
      item.category,
      item.item,
      item.currentValue,
      item.fileLocation,
      item.notes,
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell.replace(/"/g, '""')}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'hoganos-customization-guide.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-[var(--border-color)] bg-[var(--bg-secondary)]">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-[var(--text-primary)]">README.txt</h1>
            <p className="text-xs text-[var(--text-muted)]">HoganOS Customization Guide</p>
          </div>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search customization options..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className={cn(
              'flex-1 px-3 py-1.5 rounded-md text-sm',
              'bg-[var(--bg-window)] border border-[var(--border-color)]',
              'text-[var(--text-primary)] placeholder-[var(--text-muted)]',
              'focus:outline-none focus:border-[var(--accent)]'
            )}
          />
          <button
            onClick={downloadCSV}
            className={cn(
              'flex items-center gap-2 px-3 py-1.5 rounded-md text-sm',
              'bg-[var(--accent)] text-white',
              'hover:bg-[var(--accent-hover)]'
            )}
          >
            <Download className="w-4 h-4" />
            CSV
          </button>
        </div>
      </div>

      {/* Intro */}
      <div className="p-4 border-b border-[var(--border-color)] bg-gradient-to-r from-purple-500/10 to-pink-500/10">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
          <div className="text-sm text-[var(--text-secondary)]">
            <p className="font-medium text-[var(--text-primary)] mb-1">Make it yours!</p>
            <p>
              This guide lists every customizable element in HoganOS. Inspired by{' '}
              <span className="text-[var(--accent)]">PostHog&apos;s</span> playful desktop UI,
              you can add custom illustrations, fun names, easter eggs, and personality throughout.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-2">
        {filteredCategories.map((category) => {
          const items = filteredItems.filter(item => item.category === category);
          const isExpanded = expandedCategories.has(category);

          return (
            <div key={category} className="mb-2">
              <button
                onClick={() => toggleCategory(category)}
                className={cn(
                  'w-full flex items-center gap-2 px-3 py-2 rounded-md',
                  'hover:bg-[var(--bg-tertiary)] transition-colors',
                  'text-left'
                )}
              >
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4 text-[var(--text-muted)]" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-[var(--text-muted)]" />
                )}
                <span className="font-medium text-[var(--text-primary)]">{category}</span>
                <span className="text-xs text-[var(--text-muted)]">({items.length})</span>
              </button>

              {isExpanded && (
                <div className="ml-6 mt-1 space-y-1">
                  {items.map((item, index) => (
                    <div
                      key={`${category}-${index}`}
                      className={cn(
                        'p-3 rounded-md',
                        'bg-[var(--bg-secondary)] border border-[var(--border-color)]'
                      )}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <span className="font-medium text-[var(--text-primary)] text-sm">
                          {item.item}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded bg-[var(--bg-tertiary)] text-[var(--text-muted)] shrink-0">
                          {item.currentValue}
                        </span>
                      </div>
                      <p className="text-xs text-[var(--text-secondary)] mb-2">{item.notes}</p>
                      <code className="text-xs text-[var(--accent)] bg-[var(--bg-tertiary)] px-1.5 py-0.5 rounded block overflow-x-auto">
                        {item.fileLocation}
                      </code>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-[var(--border-color)] bg-[var(--bg-secondary)]">
        <p className="text-xs text-[var(--text-muted)] text-center">
          {customizationItems.length} customization options across {categories.length} categories
        </p>
      </div>
    </div>
  );
}
