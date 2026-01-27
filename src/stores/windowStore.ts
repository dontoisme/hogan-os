import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface WindowState {
  id: string;
  title: string;
  icon: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  minSize?: { width: number; height: number };
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}

interface WindowStore {
  windows: WindowState[];
  activeWindowId: string | null;
  highestZIndex: number;

  openWindow: (id: string, title: string, icon: string, options?: Partial<WindowState>) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  bringToFront: (id: string) => void;
  updatePosition: (id: string, position: { x: number; y: number }) => void;
  updateSize: (id: string, size: { width: number; height: number }) => void;
  toggleWindow: (id: string, title: string, icon: string, options?: Partial<WindowState>) => void;
  isWindowOpen: (id: string) => boolean;
  getWindow: (id: string) => WindowState | undefined;
}

const DEFAULT_WINDOW_SIZE = { width: 800, height: 600 };
const DEFAULT_MIN_SIZE = { width: 400, height: 300 };

const getDefaultPosition = (index: number) => ({
  x: 100 + (index * 30),
  y: 100 + (index * 30),
});

export const useWindowStore = create<WindowStore>()(
  persist(
    (set, get) => ({
      windows: [],
      activeWindowId: null,
      highestZIndex: 0,

      openWindow: (id, title, icon, options = {}) => {
        const { windows, highestZIndex } = get();
        const existingWindow = windows.find(w => w.id === id);

        if (existingWindow) {
          // If window exists and is minimized, restore it
          if (existingWindow.isMinimized) {
            get().restoreWindow(id);
          }
          get().bringToFront(id);
          return;
        }

        const newZIndex = highestZIndex + 1;
        const newWindow: WindowState = {
          id,
          title,
          icon,
          position: options.position || getDefaultPosition(windows.length),
          size: options.size || DEFAULT_WINDOW_SIZE,
          minSize: options.minSize || DEFAULT_MIN_SIZE,
          isMinimized: false,
          isMaximized: false,
          zIndex: newZIndex,
        };

        set({
          windows: [...windows, newWindow],
          activeWindowId: id,
          highestZIndex: newZIndex,
        });
      },

      closeWindow: (id) => {
        const { windows, activeWindowId } = get();
        const newWindows = windows.filter(w => w.id !== id);

        set({
          windows: newWindows,
          activeWindowId: activeWindowId === id
            ? (newWindows.length > 0 ? newWindows[newWindows.length - 1].id : null)
            : activeWindowId,
        });
      },

      minimizeWindow: (id) => {
        set((state) => ({
          windows: state.windows.map(w =>
            w.id === id ? { ...w, isMinimized: true } : w
          ),
          activeWindowId: state.activeWindowId === id ? null : state.activeWindowId,
        }));
      },

      maximizeWindow: (id) => {
        set((state) => ({
          windows: state.windows.map(w =>
            w.id === id ? { ...w, isMaximized: true } : w
          ),
        }));
      },

      restoreWindow: (id) => {
        const { highestZIndex } = get();
        const newZIndex = highestZIndex + 1;

        set((state) => ({
          windows: state.windows.map(w =>
            w.id === id ? { ...w, isMinimized: false, isMaximized: false, zIndex: newZIndex } : w
          ),
          activeWindowId: id,
          highestZIndex: newZIndex,
        }));
      },

      bringToFront: (id) => {
        const { highestZIndex } = get();
        const newZIndex = highestZIndex + 1;

        set((state) => ({
          windows: state.windows.map(w =>
            w.id === id ? { ...w, zIndex: newZIndex } : w
          ),
          activeWindowId: id,
          highestZIndex: newZIndex,
        }));
      },

      updatePosition: (id, position) => {
        set((state) => ({
          windows: state.windows.map(w =>
            w.id === id ? { ...w, position } : w
          ),
        }));
      },

      updateSize: (id, size) => {
        set((state) => ({
          windows: state.windows.map(w =>
            w.id === id ? { ...w, size } : w
          ),
        }));
      },

      toggleWindow: (id, title, icon, options) => {
        const { windows } = get();
        const existingWindow = windows.find(w => w.id === id);

        if (existingWindow) {
          if (existingWindow.isMinimized) {
            get().restoreWindow(id);
          } else {
            get().closeWindow(id);
          }
        } else {
          get().openWindow(id, title, icon, options);
        }
      },

      isWindowOpen: (id) => {
        return get().windows.some(w => w.id === id);
      },

      getWindow: (id) => {
        return get().windows.find(w => w.id === id);
      },
    }),
    {
      name: 'window-store',
      partialize: (state) => ({
        // Only persist window positions and sizes, not open state
      }),
    }
  )
);
