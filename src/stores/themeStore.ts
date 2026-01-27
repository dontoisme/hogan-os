import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeMode = 'light' | 'dark' | 'retro';

interface ThemeStore {
  theme: ThemeMode;
  soundEnabled: boolean;
  setTheme: (theme: ThemeMode) => void;
  toggleSound: () => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: 'dark',
      soundEnabled: false,

      setTheme: (theme) => set({ theme }),
      toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
    }),
    {
      name: 'theme-store',
    }
  )
);
