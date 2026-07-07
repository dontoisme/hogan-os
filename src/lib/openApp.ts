import type { OriginRect } from '@/stores/windowStore';

// Cross-shell "open this app" signal. Desktop opens a window; MobileShell
// opens a panel. Used by the boot screen CTAs and the ?app= deep link.
export const OPEN_APP_EVENT = 'hoganos:open-app';

// Fired once when the boot screen is dismissed; detail: { openedApp }.
export const BOOT_DISMISSED_EVENT = 'hoganos:boot-dismissed';

export function openApp(id: string, origin?: OriginRect) {
  window.dispatchEvent(new CustomEvent(OPEN_APP_EVENT, { detail: { id, origin } }));
}

export function toOrigin(rect: DOMRect | null | undefined): OriginRect | undefined {
  if (!rect) return undefined;
  return { x: rect.x, y: rect.y, width: rect.width, height: rect.height };
}

export function getRequestedApp(): string | null {
  if (typeof window === 'undefined') return null;
  return new URLSearchParams(window.location.search).get('app');
}
