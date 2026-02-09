export interface CustomizationItem {
  category: string;
  item: string;
  currentValue: string;
  fileLocation: string;
  notes: string;
}

export const customizationItems: CustomizationItem[] = [
  // WALLPAPER
  { category: "WALLPAPER", item: "Desktop background", currentValue: "CSS gradient", fileLocation: "src/app/globals.css (--wallpaper-gradient)", notes: "Replace with custom image or illustrated scene like PostHog's farm" },
  { category: "WALLPAPER", item: "Background texture", currentValue: "None", fileLocation: "src/app/globals.css", notes: "Add noise/grain overlay for texture" },
  { category: "WALLPAPER", item: "Light theme wallpaper", currentValue: "Blue gradient", fileLocation: "src/app/globals.css [data-theme=\"light\"]", notes: "Different wallpaper per theme" },
  { category: "WALLPAPER", item: "Retro theme wallpaper", currentValue: "Solid teal #008080", fileLocation: "src/app/globals.css [data-theme=\"retro\"]", notes: "Classic Windows 95 teal or custom" },

  // ICONS
  { category: "ICONS", item: "Projects icon", currentValue: "Lucide FolderOpen", fileLocation: "src/components/desktop/Desktop.tsx", notes: "Custom PNG/SVG illustration" },
  { category: "ICONS", item: "Resume icon", currentValue: "Lucide FileText", fileLocation: "src/components/desktop/Desktop.tsx", notes: "Custom PNG/SVG illustration" },
  { category: "ICONS", item: "Experience icon", currentValue: "Lucide Briefcase", fileLocation: "src/components/desktop/Desktop.tsx", notes: "Custom PNG/SVG illustration" },
  { category: "ICONS", item: "Job Journal icon", currentValue: "Lucide BarChart3", fileLocation: "src/components/desktop/Desktop.tsx", notes: "Custom PNG/SVG illustration" },
  { category: "ICONS", item: "Contact icon", currentValue: "Lucide Mail", fileLocation: "src/components/desktop/Desktop.tsx", notes: "Custom PNG/SVG illustration" },
  { category: "ICONS", item: "About Me icon", currentValue: "Lucide User", fileLocation: "src/components/desktop/Desktop.tsx", notes: "Custom PNG/SVG or photo" },
  { category: "ICONS", item: "Settings icon", currentValue: "Lucide Settings", fileLocation: "src/components/desktop/Desktop.tsx", notes: "Custom PNG/SVG illustration" },
  { category: "ICONS", item: "Icon style", currentValue: "Gradient background box", fileLocation: "src/components/desktop/DesktopIcon.tsx", notes: "Could be full custom images like PostHog" },

  // DESKTOP ITEMS
  { category: "DESKTOP ITEMS", item: "Add new icons", currentValue: "Projects, Resume, Experience, etc.", fileLocation: "src/components/desktop/Desktop.tsx", notes: "Add fun stuff: Games folder, Trash, custom links" },
  { category: "DESKTOP ITEMS", item: "Icon labels", currentValue: "Generic names", fileLocation: "src/components/desktop/Desktop.tsx", notes: "Fun names like \"resume.pdf\" or \"hire_me.exe\"" },
  { category: "DESKTOP ITEMS", item: "Icon positions", currentValue: "Auto-grid", fileLocation: "src/components/desktop/Desktop.tsx", notes: "Manual positioning for artistic layout" },

  // PROFILE
  { category: "PROFILE", item: "Name", currentValue: "Don Hogan", fileLocation: "src/components/desktop/StartMenu.tsx", notes: "Your actual name" },
  { category: "PROFILE", item: "Title", currentValue: "Software Engineer", fileLocation: "src/components/desktop/StartMenu.tsx", notes: "Your title/tagline" },
  { category: "PROFILE", item: "Avatar/Photo", currentValue: "None (icon only)", fileLocation: "src/components/desktop/StartMenu.tsx + AboutWindow.tsx", notes: "Add profile photo" },
  { category: "PROFILE", item: "Bio text", currentValue: "Generic placeholder", fileLocation: "src/components/windows/AboutWindow.tsx", notes: "Your actual bio" },
  { category: "PROFILE", item: "Location", currentValue: "Austin, TX", fileLocation: "src/components/windows/AboutWindow.tsx + ResumeWindow.tsx", notes: "Your location" },
  { category: "PROFILE", item: "Email", currentValue: "don@example.com", fileLocation: "src/components/windows/ContactWindow.tsx", notes: "Your real email" },
  { category: "PROFILE", item: "GitHub URL", currentValue: "github.com/donhogan", fileLocation: "src/components/desktop/StartMenu.tsx + ContactWindow.tsx", notes: "Your GitHub" },
  { category: "PROFILE", item: "LinkedIn URL", currentValue: "linkedin.com/in/donhogan", fileLocation: "src/components/desktop/StartMenu.tsx + ContactWindow.tsx", notes: "Your LinkedIn" },

  // CONTENT
  { category: "CONTENT", item: "Projects list", currentValue: "Placeholder projects", fileLocation: "src/data/projects.ts", notes: "Your actual projects with descriptions" },
  { category: "CONTENT", item: "Experience/jobs", currentValue: "Placeholder companies", fileLocation: "src/data/experience.ts", notes: "Your real work history" },
  { category: "CONTENT", item: "Skills list", currentValue: "Generic skills", fileLocation: "src/data/skills.ts", notes: "Your actual skills" },
  { category: "CONTENT", item: "Resume content", currentValue: "Placeholder text", fileLocation: "src/components/windows/ResumeWindow.tsx", notes: "Your real resume or PDF embed" },
  { category: "CONTENT", item: "Interests", currentValue: "Code/Coffee/Gaming/Music", fileLocation: "src/components/windows/AboutWindow.tsx", notes: "Your actual hobbies" },

  // FUN STUFF
  { category: "FUN STUFF", item: "Clippy tips", currentValue: "Generic tips", fileLocation: "src/components/Clippy.tsx", notes: "Personalized tips with your voice" },
  { category: "FUN STUFF", item: "Clippy character", currentValue: "Paperclip emoji 📎", fileLocation: "src/components/Clippy.tsx", notes: "Custom mascot character" },
  { category: "FUN STUFF", item: "Hacker mode text", currentValue: "Generic ASCII art", fileLocation: "src/components/HackerMode.tsx", notes: "Custom message/ASCII art" },
  { category: "FUN STUFF", item: "404 page text", currentValue: "Generic BSOD", fileLocation: "src/app/not-found.tsx", notes: "Personalized error humor" },
  { category: "FUN STUFF", item: "Konami code easter egg", currentValue: "Hacker terminal", fileLocation: "src/hooks/useKonamiCode.ts", notes: "Different secret unlock" },
  { category: "FUN STUFF", item: "Add games folder", currentValue: "None", fileLocation: "New component needed", notes: "Mini games like Minesweeper clone" },
  { category: "FUN STUFF", item: "Add screensaver", currentValue: "None", fileLocation: "New component needed", notes: "Animated screensaver on idle" },
  { category: "FUN STUFF", item: "Add sound effects", currentValue: "Disabled", fileLocation: "public/sounds/", notes: "Startup sound, click sounds, etc." },

  // THEMES
  { category: "THEMES", item: "Accent color", currentValue: "#f97316 (orange)", fileLocation: "src/app/globals.css (--accent)", notes: "Your brand color" },
  { category: "THEMES", item: "Dark mode colors", currentValue: "Default dark grays", fileLocation: "src/app/globals.css :root", notes: "Custom color palette" },
  { category: "THEMES", item: "Light mode colors", currentValue: "Default light grays", fileLocation: "src/app/globals.css [data-theme=\"light\"]", notes: "Custom color palette" },
  { category: "THEMES", item: "Retro mode colors", currentValue: "Windows 95 style", fileLocation: "src/app/globals.css [data-theme=\"retro\"]", notes: "Could be Mac OS 9 or other" },
  { category: "THEMES", item: "Add custom theme", currentValue: "Only 3 themes", fileLocation: "src/stores/themeStore.ts + globals.css", notes: "Add \"vaporwave\" or personal theme" },

  // WINDOW STYLE
  { category: "WINDOW STYLE", item: "Title bar buttons", currentValue: "macOS style dots", fileLocation: "src/app/globals.css + Window.tsx", notes: "Windows style or custom" },
  { category: "WINDOW STYLE", item: "Window shadows", currentValue: "Standard drop shadow", fileLocation: "src/app/globals.css (--window-shadow)", notes: "Softer or more dramatic" },
  { category: "WINDOW STYLE", item: "Border radius", currentValue: "Rounded corners", fileLocation: "src/components/windows/Window.tsx", notes: "Sharp corners for retro feel" },
  { category: "WINDOW STYLE", item: "Window chrome", currentValue: "Minimal", fileLocation: "src/components/windows/Window.tsx", notes: "Add toolbar/menu bar like real OS" },

  // TASKBAR
  { category: "TASKBAR", item: "Start button icon", currentValue: "Hamburger menu", fileLocation: "src/components/desktop/Taskbar.tsx", notes: "Custom logo/icon" },
  { category: "TASKBAR", item: "Start button text", currentValue: "Start", fileLocation: "src/components/desktop/Taskbar.tsx", notes: "\"HoganOS\" or custom text" },
  { category: "TASKBAR", item: "System tray items", currentValue: "Sound, WiFi, Battery, Theme, Clock", fileLocation: "src/components/desktop/SystemTray.tsx", notes: "Add/remove items" },
  { category: "TASKBAR", item: "Taskbar position", currentValue: "Bottom", fileLocation: "src/components/desktop/Taskbar.tsx", notes: "Could be top like PostHog" },

  // START MENU
  { category: "START MENU", item: "Menu items", currentValue: "Standard sections", fileLocation: "src/components/desktop/StartMenu.tsx", notes: "Add categories like PostHog's \"Things that spark joy\"" },
  { category: "START MENU", item: "External links", currentValue: "GitHub, LinkedIn", fileLocation: "src/components/desktop/StartMenu.tsx", notes: "Add Twitter, Blog, etc." },
  { category: "START MENU", item: "Header style", currentValue: "Gradient with name", fileLocation: "src/components/desktop/StartMenu.tsx", notes: "Custom illustration or photo" },

  // MOBILE
  { category: "MOBILE", item: "App grid", currentValue: "3x3 tile grid", fileLocation: "src/components/mobile/MobileAppGrid.tsx", notes: "Touch-friendly app launcher" },
  { category: "MOBILE", item: "Mobile header", currentValue: "Name + title + theme toggle", fileLocation: "src/components/mobile/MobileShell.tsx", notes: "Add photo or branding" },

  // META
  { category: "META", item: "Page title", currentValue: "HoganOS | Don Hogan", fileLocation: "src/app/layout.tsx", notes: "Your SEO title" },
  { category: "META", item: "Meta description", currentValue: "Generic", fileLocation: "src/app/layout.tsx", notes: "Your SEO description" },
  { category: "META", item: "OG image", currentValue: "None", fileLocation: "src/app/layout.tsx + public/", notes: "Social sharing preview image" },
  { category: "META", item: "Favicon", currentValue: "Next.js default", fileLocation: "public/favicon.ico", notes: "Custom favicon matching brand" },
];

export const categories = [...new Set(customizationItems.map(item => item.category))];

export const getItemsByCategory = (category: string) => {
  return customizationItems.filter(item => item.category === category);
};
