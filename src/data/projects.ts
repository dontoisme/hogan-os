export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tech: string[];
  status: 'active' | 'completed' | 'in-progress';
  tier: 1 | 2;
  links?: {
    github?: string;
    demo?: string;
    website?: string;
  };
  images?: string[];
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: 'job-journal',
    title: 'Job Journal',
    description: 'A comprehensive job search tracking application with dashboard analytics, TWC compliance logging, and application management.',
    longDescription: 'Built to solve my own job search pain points. Features a full dashboard with real-time statistics, interview scheduling, and Texas Workforce Commission compliance tracking for unemployment benefits.',
    tech: ['Python', 'Flask', 'SQLite', 'Tailwind CSS', 'HTMX'],
    status: 'active',
    tier: 1,
    featured: true,
    links: {
      github: 'https://github.com/donhogan/job-journal',
    },
  },
  {
    id: 'darwin',
    title: 'Darwin',
    description: 'Visual screenshot diffing tool for catching UI regressions in web applications.',
    longDescription: 'Darwin captures screenshots of your web app and compares them against baseline images, highlighting pixel-level differences. Perfect for catching unintended CSS changes and visual regressions.',
    tech: ['Node.js', 'Puppeteer', 'Sharp', 'TypeScript'],
    status: 'completed',
    tier: 1,
    featured: true,
  },
  {
    id: 'zeroed',
    title: 'Zeroed',
    description: 'Zero-based budgeting app with visual spending breakdowns and goal tracking.',
    longDescription: 'A personal finance tool that implements zero-based budgeting methodology. Every dollar gets assigned a job, with beautiful visualizations showing where your money goes.',
    tech: ['React', 'TypeScript', 'D3.js', 'Firebase'],
    status: 'completed',
    tier: 1,
  },
  {
    id: 'cars-bids-analyzer',
    title: 'Cars & Bids Analyzer',
    description: 'Data analysis tool for tracking auction results and predicting final bid prices.',
    longDescription: 'Scrapes and analyzes auction data from Cars & Bids to identify trends, predict final prices, and find undervalued vehicles. Includes interactive charts and price prediction models.',
    tech: ['Python', 'Pandas', 'Scikit-learn', 'Plotly'],
    status: 'completed',
    tier: 1,
    featured: true,
  },
  {
    id: 'squabble',
    title: 'Squabble',
    description: 'Social audiobook app concept for React Native with shared listening rooms.',
    longDescription: 'A concept for a social audiobook experience where friends can listen together, discuss chapters in real-time, and share highlights. Built as a React Native prototype.',
    tech: ['React Native', 'Expo', 'TypeScript', 'Firebase'],
    status: 'in-progress',
    tier: 1,
  },
  {
    id: 'portfolio-os',
    title: 'This Portfolio',
    description: 'A desktop OS-inspired portfolio website with draggable windows and nostalgic UX.',
    longDescription: 'The very site you\'re looking at! Built with Next.js and inspired by classic desktop operating systems. Features draggable windows, a taskbar, and various easter eggs.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Zustand', 'Framer Motion'],
    status: 'active',
    tier: 2,
  },
];

export const getProjectById = (id: string): Project | undefined => {
  return projects.find(p => p.id === id);
};

export const getFeaturedProjects = (): Project[] => {
  return projects.filter(p => p.featured);
};

export const getTier1Projects = (): Project[] => {
  return projects.filter(p => p.tier === 1);
};
