'use client';

import { useEffect, useState } from 'react';
import { useThemeStore } from '@/stores/themeStore';
import { useWindowStore } from '@/stores/windowStore';
import { useKonamiCode } from '@/hooks/useKonamiCode';
import { useRetroSounds } from '@/hooks/useRetroSounds';
import { OPEN_APP_EVENT, getRequestedApp } from '@/lib/openApp';
import { DesktopIcon } from './DesktopIcon';
import { Taskbar } from './Taskbar';
import { Window } from '../windows/Window';
import { ResumeWindow } from '../windows/ResumeWindow';
import { ProjectsWindow } from '../windows/ProjectsWindow';
import { ExperienceWindow } from '../windows/ExperienceWindow';
import { ContactWindow } from '../windows/ContactWindow';
import { SettingsWindow } from '../windows/SettingsWindow';
import { JobJournalWindow } from '../windows/JobJournalWindow';
import { AboutWindow } from '../windows/AboutWindow';
import { ReadmeWindow } from '../windows/ReadmeWindow';
import { Clippy } from '../Clippy';
import { HackerMode } from '../HackerMode';
import {
  FolderOpen,
  FileText,
  Briefcase,
  Mail,
  BarChart3,
  Settings,
  User,
  ScrollText,
} from 'lucide-react';

const desktopIcons = [
  { id: 'readme', label: 'Start Here.txt', icon: ScrollText, row: 0, col: 0 },
  { id: 'projects', label: 'Side Quests', icon: FolderOpen, row: 0, col: 1 },
  { id: 'resume', label: 'Resume (Final)3.pdf', icon: FileText, row: 1, col: 0 },
  { id: 'experience', label: 'The Journey', icon: Briefcase, row: 1, col: 1 },
  { id: 'job-journal', label: 'Job Journal', icon: BarChart3, row: 2, col: 0 },
  { id: 'contact', label: 'Say Hi', icon: Mail, row: 2, col: 1 },
  { id: 'about', label: 'The Dude', icon: User, row: 3, col: 0 },
  { id: 'settings', label: 'Preferences', icon: Settings, row: 3, col: 1 },
];

const windowComponents: Record<string, React.ComponentType> = {
  readme: ReadmeWindow,
  resume: ResumeWindow,
  projects: ProjectsWindow,
  experience: ExperienceWindow,
  contact: ContactWindow,
  settings: SettingsWindow,
  'job-journal': JobJournalWindow,
  about: AboutWindow,
};

const windowTitles: Record<string, string> = {
  readme: 'Start Here.txt',
  resume: 'Resume (Final)3.pdf',
  projects: 'Side Quests',
  experience: 'The Journey',
  contact: 'Say Hi',
  settings: 'Preferences',
  'job-journal': 'Job Journal',
  about: 'The Dude',
};

const windowIcons: Record<string, string> = {
  readme: 'scroll',
  resume: 'file',
  projects: 'folder',
  experience: 'briefcase',
  contact: 'mail',
  settings: 'settings',
  'job-journal': 'chart',
  about: 'user',
};

const windowSizeOverrides: Record<string, { size: { width: number; height: number } }> = {};

export function Desktop() {
  const { theme } = useThemeStore();
  const { windows, openWindow } = useWindowStore();
  const [hackerModeActive, setHackerModeActive] = useState(false);

  // Retro sound effects (subscribes to window events)
  useRetroSounds();

  // Konami code easter egg
  useKonamiCode(() => {
    setHackerModeActive(true);
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Open apps requested by the boot screen CTAs or the ?app= deep link
  useEffect(() => {
    const open = (id: string) => {
      if (!windowComponents[id]) return;
      openWindow(id, windowTitles[id] || id, windowIcons[id] || 'file', windowSizeOverrides[id]);
    };
    const handler = (e: Event) => open((e as CustomEvent).detail?.id);
    window.addEventListener(OPEN_APP_EVENT, handler);
    const requested = getRequestedApp();
    if (requested) open(requested);
    return () => window.removeEventListener(OPEN_APP_EVENT, handler);
  }, [openWindow]);

  const handleIconDoubleClick = (id: string) => {
    openWindow(id, windowTitles[id] || id, windowIcons[id] || 'file', windowSizeOverrides[id]);
  };

  return (
    <div
      className="desktop-only relative h-screen w-screen overflow-hidden"
      style={{
        background: 'var(--wallpaper-gradient)',
        backgroundSize: 'var(--wallpaper-size)',
        backgroundPosition: 'var(--wallpaper-position)',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Desktop Icons */}
      <div className="absolute inset-0 p-4 pb-16">
        <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(auto-fill, 90px)' }}>
          {desktopIcons.map((item) => (
            <DesktopIcon
              key={item.id}
              id={item.id}
              label={item.label}
              icon={item.icon}
              onDoubleClick={() => handleIconDoubleClick(item.id)}
            />
          ))}
        </div>
      </div>

      {/* Windows */}
      {windows.map((windowState) => {
        const WindowContent = windowComponents[windowState.id];
        if (!WindowContent || windowState.isMinimized) return null;

        return (
          <Window key={windowState.id} windowState={windowState}>
            <WindowContent />
          </Window>
        );
      })}

      {/* Taskbar */}
      <Taskbar />

      {/* Clippy Helper */}
      <Clippy />

      {/* Hacker Mode Easter Egg */}
      <HackerMode
        isActive={hackerModeActive}
        onClose={() => setHackerModeActive(false)}
      />
    </div>
  );
}
