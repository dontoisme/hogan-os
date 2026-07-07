'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { Github, ExternalLink, Search, PawPrint } from 'lucide-react';
import {
  specimens,
  classMeta,
  statusMeta,
  classesInOrder,
  sizeClass,
  formatObserved,
  Specimen,
  SpecimenClass,
} from '@/data/fieldGuide';
import { cn } from '@/lib/utils';

// The zoo, reimagined as a naturalist's field guide: every project ever
// spotted in ~/Projects, catalogued as a specimen with real observation dates.

function StatusStamp({ status, small }: { status: Specimen['status']; small?: boolean }) {
  const meta = statusMeta[status];
  return (
    <span
      className={cn(
        'inline-block border rounded font-mono uppercase tracking-wider',
        small ? 'px-1.5 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs -rotate-2',
        meta.className
      )}
    >
      {meta.label}
    </span>
  );
}

function SpecimenCard({ specimen, onSelect }: { specimen: Specimen; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        'p-3.5 rounded-lg text-left transition-all flex flex-col gap-2',
        'bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)]',
        'border border-[var(--border-color)] hover:border-[var(--accent)]'
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="font-semibold text-[var(--text-primary)] truncate leading-tight">
            {specimen.commonName}
            {specimen.featured && <span className="text-[var(--accent)] ml-1.5">★</span>}
          </h3>
          <p className="text-xs italic text-[var(--text-muted)] truncate">{specimen.binomial}</p>
        </div>
        <StatusStamp status={specimen.status} small />
      </div>

      <p className="text-sm text-[var(--text-secondary)] line-clamp-2">{specimen.summary}</p>

      <div className="flex items-center justify-between gap-2 mt-auto pt-1">
        <div className="flex flex-wrap gap-1 min-w-0">
          {specimen.habitat.slice(0, 3).map((h) => (
            <span
              key={h}
              className="px-1.5 py-0.5 bg-[var(--bg-tertiary)] text-[var(--text-muted)] rounded text-[10px]"
            >
              {h}
            </span>
          ))}
        </div>
        <span className="text-[10px] text-[var(--text-muted)] shrink-0 font-mono">
          {formatObserved(specimen.firstObserved)}
        </span>
      </div>
    </button>
  );
}

function SpecimenPlate({ specimen, onBack }: { specimen: Specimen; onBack: () => void }) {
  const size = sizeClass(specimen.fileCount);
  const cls = classMeta[specimen.classification];
  const inCaptivity = !specimen.range?.github;

  const facts: [string, React.ReactNode][] = [
    ['Classification', `${cls.label} · genus ${cls.genus}`],
    ['Size class', `${size.label} (${size.note})`],
    ['First observed', formatObserved(specimen.firstObserved)],
    ['Last seen', formatObserved(specimen.lastSeen)],
    [
      'Range',
      inCaptivity
        ? 'Captivity only — not yet released to the wild'
        : 'Free-ranging on GitHub',
    ],
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="p-3 px-4 border-b border-[var(--border-color)]">
        <button
          className="text-sm text-[var(--accent)] hover:underline flex items-center gap-1"
          onClick={onBack}
        >
          ← Back to the guide
        </button>
      </div>

      <div className="flex-1 p-6 overflow-auto">
        <div className="flex items-start justify-between gap-4 mb-5 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">
              {specimen.commonName}
            </h1>
            <p className="italic text-[var(--text-muted)] mt-0.5">{specimen.binomial}</p>
          </div>
          <StatusStamp status={specimen.status} />
        </div>

        <p className="text-xs text-[var(--text-muted)] -mt-3 mb-5">
          {statusMeta[specimen.status].note}
        </p>

        {/* Taxonomy card */}
        <div className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] p-4 mb-6">
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-sm">
            {facts.map(([label, value]) => (
              <div key={label} className="flex flex-col">
                <dt className="text-[11px] uppercase tracking-wider text-[var(--text-muted)]">
                  {label}
                </dt>
                <dd className="text-[var(--text-secondary)]">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-2">Field Notes</h2>
          <p className="text-[var(--text-secondary)] leading-relaxed whitespace-pre-line">
            {specimen.fieldNotes}
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-2">Habitat</h2>
          <div className="flex flex-wrap gap-2">
            {specimen.habitat.map((h) => (
              <span
                key={h}
                className="px-3 py-1 bg-[var(--bg-tertiary)] text-[var(--text-secondary)] rounded-md text-sm"
              >
                {h}
              </span>
            ))}
          </div>
        </div>

        {(specimen.range?.github || specimen.range?.website) && (
          <div className="flex gap-3 flex-wrap">
            {specimen.range.github && (
              <a
                href={specimen.range.github}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-md transition-colors',
                  'bg-[var(--bg-tertiary)] hover:bg-[var(--bg-secondary)]'
                )}
              >
                <Github className="w-4 h-4" />
                <span className="text-sm">Observe on GitHub</span>
              </a>
            )}
            {specimen.range.website && (
              <a
                href={specimen.range.website}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-md transition-colors',
                  'bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)]'
                )}
              >
                <ExternalLink className="w-4 h-4" />
                <span className="text-sm">See it in the wild</span>
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export function FieldGuideWindow() {
  const [selected, setSelected] = useState<Specimen | null>(null);
  const [activeClass, setActiveClass] = useState<SpecimenClass | 'all'>('all');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return specimens.filter((s) => {
      if (activeClass !== 'all' && s.classification !== activeClass) return false;
      if (!q) return true;
      return (
        s.commonName.toLowerCase().includes(q) ||
        s.binomial.toLowerCase().includes(q) ||
        s.summary.toLowerCase().includes(q) ||
        s.habitat.some((h) => h.toLowerCase().includes(q))
      );
    });
  }, [activeClass, query]);

  const thrivingCount = specimens.filter((s) => s.status === 'thriving').length;
  const earliest = useMemo(
    () => specimens.reduce((min, s) => (s.firstObserved < min ? s.firstObserved : min), '9999-12'),
    []
  );

  if (selected) {
    return <SpecimenPlate specimen={selected} onBack={() => setSelected(null)} />;
  }

  // Group by classification when browsing everything; flat grid when filtered
  const grouped =
    activeClass === 'all' && !query.trim()
      ? classesInOrder
          .map((cls) => ({ cls, items: filtered.filter((s) => s.classification === cls) }))
          .filter((g) => g.items.length > 0)
      : null;

  return (
    <div className="h-full flex flex-col">
      {/* Guide cover / header */}
      <div className="p-4 pb-3 border-b border-[var(--border-color)]">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <h1 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
              <PawPrint className="w-4.5 h-4.5 text-[var(--accent)]" />
              A Field Guide to the Software Wildlife of ~/Projects
            </h1>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              {specimens.length} species catalogued · {thrivingCount} currently thriving ·
              observations since {formatObserved(earliest)}. Every specimen is real. So are the
              commit dates.
            </p>
          </div>
        </div>

        {/* Search + classification filters */}
        <div className="flex items-center gap-2 mt-3 flex-wrap">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search species..."
              className={cn(
                'pl-8 pr-3 py-1.5 rounded-md text-sm w-44',
                'bg-[var(--bg-secondary)] border border-[var(--border-color)]',
                'text-[var(--text-primary)] placeholder:text-[var(--text-muted)]',
                'focus:outline-none focus:border-[var(--accent)]'
              )}
            />
          </div>
          <button
            onClick={() => setActiveClass('all')}
            className={cn(
              'px-2.5 py-1 rounded-full text-xs border transition-colors',
              activeClass === 'all'
                ? 'bg-[var(--accent)] text-white border-[var(--accent)]'
                : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] border-[var(--border-color)] hover:border-[var(--accent)]'
            )}
          >
            All wings
          </button>
          {classesInOrder.map((cls) => (
            <button
              key={cls}
              onClick={() => setActiveClass(cls)}
              className={cn(
                'px-2.5 py-1 rounded-full text-xs border transition-colors',
                activeClass === cls
                  ? 'bg-[var(--accent)] text-white border-[var(--accent)]'
                  : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] border-[var(--border-color)] hover:border-[var(--accent)]'
              )}
            >
              {classMeta[cls].label}
            </button>
          ))}
        </div>
      </div>

      {/* Specimen index */}
      <div className="flex-1 overflow-auto p-4">
        {grouped ? (
          grouped.map(({ cls, items }) => (
            <section key={cls} className="mb-6 last:mb-2">
              <div className="flex items-baseline gap-2 mb-2.5 px-0.5">
                <h2 className="text-sm font-semibold text-[var(--text-primary)]">
                  {classMeta[cls].label}
                </h2>
                <span className="text-[11px] italic text-[var(--text-muted)]">
                  genus {classMeta[cls].genus} — {classMeta[cls].note}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {items.map((s) => (
                  <SpecimenCard key={s.id} specimen={s} onSelect={() => setSelected(s)} />
                ))}
              </div>
            </section>
          ))
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filtered.map((s) => (
              <SpecimenCard key={s.id} specimen={s} onSelect={() => setSelected(s)} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 py-12">
            <Image
              src="/images/dingo/dingo-sleep.png"
              alt="A sleeping pixel-art dingo"
              width={72}
              height={72}
              className="pixelated"
              unoptimized
            />
            <p className="text-sm text-[var(--text-muted)]">
              No sightings match. Even the dingo hasn&apos;t seen that one.
            </p>
          </div>
        )}

        <p className="text-[11px] text-[var(--text-muted)] text-center mt-4 mb-2">
          Compiled from a live survey of the actual directories. The author regrets nothing,
          especially not the forks.
        </p>
      </div>
    </div>
  );
}
