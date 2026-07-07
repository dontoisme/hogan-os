// Live element registry so animations can target real screen positions:
// desktop icons register `icon:<id>`, taskbar window buttons `taskbar:<id>`.
// Rects are read lazily at animation time, so drags/reflows stay accurate.
const elements = new Map<string, HTMLElement>();

export function registerRect(key: string, el: HTMLElement | null) {
  if (el) {
    elements.set(key, el);
  } else {
    elements.delete(key);
  }
}

export function getRect(key: string): DOMRect | null {
  const el = elements.get(key);
  if (!el || !el.isConnected) return null;
  return el.getBoundingClientRect();
}
