'use client';

const thoughts = `thoughts.txt — last modified: during a trail ride

on product
──────────
· Discovery time > build time. The most expensive code is the code
  nobody needed.
· Roadmaps are hypotheses, not promises. Update them like you'd
  update a forecast, not like you'd defend a thesis.
· "What problem are we solving?" is the first question. Always.
  The second is "how will we know?"
· Outcomes > outputs. A shipped feature that moves nothing is
  inventory, not progress.
· Kill more ideas than you ship. A 36% experiment win rate means
  64% of my ideas were wrong — that's the system working.

on AI
─────
· AI changes *how* we build, not just *what* we build.
· I built this entire site with Claude Code. The point isn't that
  AI wrote code — it's that one PM shipped a production site while
  thinking mostly about the product.
· Agents need the same thing teams need: clear goals, good context,
  and an escalation path to a human who cares.

on work
───────
· Experimentation velocity compounds. Teams that learn 2x faster
  don't finish 2x sooner — they end up somewhere better.
· The best growth lever is usually removing something.
· Trust the data, but interview the users anyway. Numbers tell you
  what; people tell you why.

on everything else
──────────────────
· Ideas come on bike rides.
· Don't panic.
`;

export function NotepadWindow() {
  return (
    <div className="h-full overflow-auto">
      <pre className="p-6 font-mono text-[13px] leading-relaxed whitespace-pre-wrap text-[var(--text-secondary)]">
        {thoughts}
      </pre>
    </div>
  );
}
