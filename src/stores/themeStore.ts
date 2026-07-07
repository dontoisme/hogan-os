import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeMode = 'light' | 'dark' | 'retro';

interface ThemeStore {
  theme: ThemeMode;
  soundEnabled: boolean;
  setTheme: (theme: ThemeMode) => void;
  toggleSound: () => void;
  setSoundEnabled: (enabled: boolean) => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: 'dark',
      soundEnabled: false,

      setTheme: (theme) => set({ theme }),
      toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
      setSoundEnabled: (enabled) => set({ soundEnabled: enabled }),
    }),
    {
      name: 'theme-store',
    }
  )
);
