// Cross-shell "open this app" signal. Desktop opens a window; MobileShell
// opens a panel. Used by the boot screen CTAs and the ?app= deep link.
export const OPEN_APP_EVENT = 'hoganos:open-app';

export function openApp(id: string) {
  window.dispatchEvent(new CustomEvent(OPEN_APP_EVENT, { detail: { id } }));
}

export function getRequestedApp(): string | null {
  if (typeof window === 'undefined') return null;
  return new URLSearchParams(window.location.search).get('app');
}
