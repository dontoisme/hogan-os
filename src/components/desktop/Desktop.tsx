'use client';

import { useEffect, useState } from 'react';
import { useThemeStore } from '@/stores/themeStore';
import { useWindowStore } from '@/stores/windowStore';
import { useKonamiCode } from '@/hooks/useKonamiCode';
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
} from 'lucide-react';

const desktopIcons = [
  { id: 'projects', label: 'Projects', icon: FolderOpen, row: 0, col: 0 },
  { id: 'resume', label: 'Resume', icon: FileText, row: 0, col: 1 },
  { id: 'experience', label: 'Experience', icon: Briefcase, row: 1, col: 0 },
  { id: 'job-journal', label: 'Job Journal', icon: BarChart3, row: 1, col: 1 },
  { id: 'contact', label: 'Contact', icon: Mail, row: 2, col: 0 },
  { id: 'about', label: 'About Me', icon: User, row: 2, col: 1 },
  { id: 'settings', label: 'Settings', icon: Settings, row: 3, col: 0 },
];

const windowComponents: Record<string, React.ComponentType> = {
  resume: ResumeWindow,
  projects: ProjectsWindow,
  experience: ExperienceWindow,
  contact: ContactWindow,
  settings: SettingsWindow,
  'job-journal': JobJournalWindow,
  about: AboutWindow,
};

const windowTitles: Record<string, string> = {
  resume: 'Resume',
  projects: 'Projects',
  experience: 'Experience',
  contact: 'Contact',
  settings: 'Settings',
  'job-journal': 'Job Journal',
  about: 'About Me',
};

const windowIcons: Record<string, string> = {
  resume: 'file',
  projects: 'folder',
  experience: 'briefcase',
  contact: 'mail',
  settings: 'settings',
  'job-journal': 'chart',
  about: 'user',
};

export function Desktop() {
  const { theme } = useThemeStore();
  const { windows, openWindow } = useWindowStore();
  const [hackerModeActive, setHackerModeActive] = useState(false);

  // Konami code easter egg
  useKonamiCode(() => {
    setHackerModeActive(true);
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleIconDoubleClick = (id: string) => {
    openWindow(id, windowTitles[id] || id, windowIcons[id] || 'file');
  };

  return (
    <div
      className="desktop-only relative h-screen w-screen overflow-hidden"
      style={{
        background: 'var(--wallpaper-gradient)',
      }}
    >
      {/* Desktop Icons */}
      <div className="absolute inset-0 p-4 pb-16">
        <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(auto-fill, 90px)' }}>
          {desktopIcons.map((icon) => (
            <DesktopIcon
              key={icon.id}
              id={icon.id}
              label={icon.label}
              icon={icon.icon}
              onDoubleClick={() => handleIconDoubleClick(icon.id)}
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
