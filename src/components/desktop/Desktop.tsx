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
import { ReadmeWindow } from '../windows/ReadmeWindow';
import { PresentationsWindow } from '../windows/PresentationsWindow';
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
  Presentation,
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
  { id: 'presentations', label: 'Presentations', icon: Presentation, row: 4, col: 0 },
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
  presentations: PresentationsWindow,
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
  presentations: 'Presentations',
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
  presentations: 'presentation',
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

  // Auto-open "Start Here" window after 2 seconds on first load
  useEffect(() => {
    const timer = setTimeout(() => {
      openWindow('readme', windowTitles['readme'], windowIcons['readme']);
    }, 2000);
    return () => clearTimeout(timer);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleIconDoubleClick = (id: string) => {
    openWindow(id, windowTitles[id] || id, windowIcons[id] || 'file');
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
