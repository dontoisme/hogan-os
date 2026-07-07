import { create } from 'zustand';
import { playRetroSound } from '@/lib/retroSounds';

export interface ToastAction {
  label: string;
  onAction: () => void;
  primary?: boolean;
}

export interface ToastItem {
  id: string;
  icon?: string; // emoji or image path
  title?: string;
  message: string;
  actions?: ToastAction[];
  duration?: number; // ms; omit for sticky (until dismissed/acted)
}

interface ToastStore {
  toasts: ToastItem[];
  showToast: (toast: ToastItem) => void;
  dismissToast: (id: string) => void;
}

export const useToastStore = create<ToastStore>((set, get) => ({
  toasts: [],

  showToast: (toast) => {
    if (get().toasts.some(t => t.id === toast.id)) return;
    set((state) => ({ toasts: [...state.toasts, toast] }));
    playRetroSound('toast');
    if (toast.duration) {
      setTimeout(() => get().dismissToast(toast.id), toast.duration);
    }
  },

  dismissToast: (id) => {
    set((state) => ({ toasts: state.toasts.filter(t => t.id !== id) }));
  },
}));
