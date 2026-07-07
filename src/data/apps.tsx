'use client';

import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  ScrollText,
  FolderOpen,
  FileText,
  Briefcase,
  BarChart3,
  Mail,
  User,
  Settings,
  SquareTerminal,
  StickyNote,
  Trash2,
  ListTodo,
  PawPrint,
} from 'lucide-react';
import { useWindowStore } from '@/stores/windowStore';
import type { OriginRect } from '@/stores/windowStore';

// Single source of truth for every app in the OS. Desktop icons, taskbar,
// Start menu, and the mobile grid all derive from this list — register an
// app here and it appears everywhere.
export interface AppDefinition {
  id: string;
  title: string; // window title + desktop icon label
  mobileTitle: string;
  icon: LucideIcon;
  iconKey: string; // legacy windowStore icon string
  Window: ComponentType;
  size?: { width: number; height: number };
  minSize?: { width: number; height: number };
  onDesktop: boolean;
  showInStartMenu: boolean;
  startMenuLabel?: string;
  onMobile: boolean;
  mobileDescription: string;
}

const windowLoading = () => <div className="h-full w-full" />;

const load = (loader: () => Promise<ComponentType>) =>
  dynamic(loader, { loading: windowLoading });

export const apps: AppDefinition[] = [
  {
    id: 'readme',
    title: 'Start Here.txt',
    mobileTitle: 'Start Here',
    icon: ScrollText,
    iconKey: 'scroll',
    Window: load(() => import('@/components/windows/ReadmeWindow').then(m => m.ReadmeWindow)),
    onDesktop: true,
    showInStartMenu: true,
    startMenuLabel: 'Start Here',
    onMobile: true,
    mobileDescription: 'Who I am & what I do',
  },
  {
    id: 'projects',
    title: 'Side Quests',
    mobileTitle: 'Side Quests',
    icon: FolderOpen,
    iconKey: 'folder',
    Window: load(() => import('@/components/windows/ProjectsWindow').then(m => m.ProjectsWindow)),
    onDesktop: true,
    showInStartMenu: true,
    startMenuLabel: 'Projects',
    onMobile: true,
    mobileDescription: 'What I build',
  },
  {
    id: 'field-guide',
    title: 'Field Guide',
    mobileTitle: 'Field Guide',
    icon: PawPrint,
    iconKey: 'folder',
    Window: load(() => import('@/components/windows/FieldGuideWindow').then(m => m.FieldGuideWindow)),
    size: { width: 920, height: 640 },
    onDesktop: true,
    showInStartMenu: true,
    startMenuLabel: 'Field Guide',
    onMobile: true,
    mobileDescription: 'The whole zoo',
  },
  {
    id: 'resume',
    title: 'Resume (Final)3.pdf',
    mobileTitle: 'Resume',
    icon: FileText,
    iconKey: 'file',
    Window: load(() => import('@/components/windows/ResumeWindow').then(m => m.ResumeWindow)),
    onDesktop: true,
    showInStartMenu: true,
    startMenuLabel: 'Resume',
    onMobile: true,
    mobileDescription: 'The formal stuff',
  },
  {
    id: 'experience',
    title: 'The Journey',
    mobileTitle: 'The Journey',
    icon: Briefcase,
    iconKey: 'briefcase',
    Window: load(() => import('@/components/windows/ExperienceWindow').then(m => m.ExperienceWindow)),
    onDesktop: true,
    showInStartMenu: true,
    startMenuLabel: 'Experience',
    onMobile: true,
    mobileDescription: 'Work history',
  },
  {
    id: 'job-journal',
    title: 'Job Journal',
    mobileTitle: 'Job Journal',
    icon: BarChart3,
    iconKey: 'chart',
    Window: load(() => import('@/components/windows/JobJournalWindow').then(m => m.JobJournalWindow)),
    onDesktop: true,
    showInStartMenu: true,
    startMenuLabel: 'Job Journal',
    onMobile: true,
    mobileDescription: 'Application tracker',
  },
  {
    id: 'contact',
    title: 'Say Hi',
    mobileTitle: 'Say Hi',
    icon: Mail,
    iconKey: 'mail',
    Window: load(() => import('@/components/windows/ContactWindow').then(m => m.ContactWindow)),
    onDesktop: true,
    showInStartMenu: true,
    startMenuLabel: 'Contact',
    onMobile: true,
    mobileDescription: 'Get in touch',
  },
  {
    id: 'about',
    title: 'The Dude',
    mobileTitle: 'The Dude',
    icon: User,
    iconKey: 'user',
    Window: load(() => import('@/components/windows/AboutWindow').then(m => m.AboutWindow)),
    onDesktop: true,
    showInStartMenu: true,
    startMenuLabel: 'About Me',
    onMobile: true,
    mobileDescription: 'Who I am',
  },
  {
    id: 'settings',
    title: 'Preferences',
    mobileTitle: 'Preferences',
    icon: Settings,
    iconKey: 'settings',
    Window: load(() => import('@/components/windows/SettingsWindow').then(m => m.SettingsWindow)),
    onDesktop: true,
    showInStartMenu: true,
    startMenuLabel: 'Settings',
    onMobile: true,
    mobileDescription: 'Theme & sound',
  },
  {
    id: 'terminal',
    title: 'Terminal',
    mobileTitle: 'Terminal',
    icon: SquareTerminal,
    iconKey: 'terminal',
    Window: load(() => import('@/components/windows/TerminalWindow').then(m => m.TerminalWindow)),
    size: { width: 680, height: 440 },
    onDesktop: true,
    showInStartMenu: true,
    startMenuLabel: 'Terminal',
    onMobile: true,
    mobileDescription: 'For the brave',
  },
  {
    id: 'notepad',
    title: 'thoughts.txt',
    mobileTitle: 'thoughts.txt',
    icon: StickyNote,
    iconKey: 'note',
    Window: load(() => import('@/components/windows/NotepadWindow').then(m => m.NotepadWindow)),
    size: { width: 560, height: 520 },
    onDesktop: true,
    showInStartMenu: false,
    onMobile: true,
    mobileDescription: 'PM philosophy',
  },
  {
    id: 'recycle-bin',
    title: 'Recycle Bin',
    mobileTitle: 'Recycle Bin',
    icon: Trash2,
    iconKey: 'trash',
    Window: load(() => import('@/components/windows/RecycleBinWindow').then(m => m.RecycleBinWindow)),
    size: { width: 620, height: 520 },
    onDesktop: true,
    showInStartMenu: false,
    onMobile: true,
    mobileDescription: 'Nothing to see here',
  },
  {
    // No desktop icon (11-icon cap) — it auto-opens as a sticky instead
    id: 'todo',
    title: 'things to do.txt',
    mobileTitle: 'Things To Do',
    icon: ListTodo,
    iconKey: 'note',
    Window: load(() => import('@/components/windows/TodoWindow').then(m => m.TodoWindow)),
    size: { width: 340, height: 540 },
    minSize: { width: 280, height: 340 },
    onDesktop: false,
    showInStartMenu: true,
    startMenuLabel: 'Things To Do',
    onMobile: true,
    mobileDescription: 'The scavenger hunt',
  },
];

export const getApp = (id: string): AppDefinition | undefined =>
  apps.find(a => a.id === id);

export const desktopApps = apps.filter(a => a.onDesktop);
export const startMenuApps = apps.filter(a => a.showInStartMenu);
export const mobileApps = apps.filter(a => a.onMobile);

// The one way to open a window on the desktop shell. Pass the trigger
// element's rect as origin and the window flies out of it.
export function openAppWindow(id: string, origin?: OriginRect) {
  const app = getApp(id);
  if (!app) return;
  useWindowStore.getState().openWindow(id, app.title, app.iconKey, {
    ...(app.size ? { size: app.size } : {}),
    ...(app.minSize ? { minSize: app.minSize } : {}),
    ...(origin ? { origin } : {}),
  });
}
