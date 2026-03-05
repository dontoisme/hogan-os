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
    description: 'Job search tracking app with dashboard analytics, TWC compliance logging, and application management.',
    longDescription: 'Built to solve my own job search pain points. Features a full dashboard with real-time statistics, interview scheduling, and Texas Workforce Commission compliance tracking. Because job hunting is hard enough without losing track of where you applied.',
    tech: ['Python', 'Flask', 'SQLite', 'Tailwind CSS', 'HTMX'],
    status: 'active',
    tier: 1,
    featured: true,
    links: {
      github: 'https://github.com/dontoisme/job-journal',
    },
  },
  {
    id: 'darwin',
    title: 'Darwin',
    description: 'Git-aware visual regression testing and development timelapse for iOS apps.',
    longDescription: 'Darwin helps iOS developers catch visual regressions by comparing screenshots across git commits. Creates development timelapses to see how your UI evolved. Named after evolution because your app should only get better.',
    tech: ['Shell', 'iOS', 'Git', 'Screenshot Diffing'],
    status: 'active',
    tier: 1,
    featured: true,
    links: {
      github: 'https://github.com/dontoisme/darwin',
    },
  },
  {
    id: 'squabble',
    title: 'Squabble',
    description: 'Audiobook player for DRM-free content. Fork of BookPlayer with custom enhancements.',
    longDescription: 'A clean audiobook player for people who actually own their audiobooks. Forked from BookPlayer and customized for my listening habits. Because not everything needs to be a subscription.',
    tech: ['Swift', 'iOS', 'AVFoundation', 'Core Data'],
    status: 'in-progress',
    tier: 1,
    featured: true,
    links: {
      github: 'https://github.com/dontoisme/Squabble',
    },
  },
  {
    id: 'gmail-quick-filter',
    title: 'Gmail Quick Filter',
    description: 'Chrome extension for quick filtering and keyboard shortcuts in Gmail.',
    longDescription: 'Because Gmail\'s built-in keyboard shortcuts aren\'t quite enough. Adds quick filtering and navigation shortcuts for power users who live in their inbox.',
    tech: ['JavaScript', 'Chrome Extension', 'Gmail API'],
    status: 'completed',
    tier: 1,
    links: {
      github: 'https://github.com/dontoisme/Gmail-Quick-Filter',
    },
  },
  {
    id: 'agent-commerce',
    title: 'agent-pay',
    description: 'CLI-native transaction confirmation layer for AI agent commerce. Touch ID-confirmed payments from the terminal.',
    longDescription: 'CLI agents like Claude Code can recommend tools but can\'t buy them. Browser agents (ChatGPT, Perplexity) have full checkout flows, but terminal agents hit a wall — the user has to leave the terminal, sign up in a browser, copy an API key, and come back. That\'s 5-15 minutes of broken flow every time.\n\nagent-pay bridges that gap. It connects macOS Touch ID to Stripe\'s Shared Payment Tokens so a CLI agent can trigger a biometric payment confirmation without leaving the terminal. The full flow — discover service, confirm with fingerprint, process payment, receive credentials, configure MCP server — takes about 10 seconds.\n\nThe project started as a deep research effort into the agent commerce landscape: Stripe ACP, Google AP2/UCP, Visa TAP, Mastercard Agentic Tokens, and more. Six research documents map the protocols, identity layers, compliance requirements, and the specific CLI gap. The spec defines the architecture, Touch ID confirmation flow, and integration points with existing protocols.\n\nThe prototype is a TypeScript CLI + compiled Swift binary. Touch ID triggers from a terminal process (underdocumented by Apple but it works), the vault stores payment tokens in macOS Keychain, and the Stripe adapter handles SPT creation and payment processing. The whole thing compiles clean and the biometric prompt fires.\n\nThis is a product insight disguised as a side project: the protocols exist, the payment rails exist, the identity layer exists. The missing piece is a 10-second UX that connects them from the terminal.',
    tech: ['TypeScript', 'Swift', 'Stripe', 'Touch ID', 'macOS Keychain', 'MCP'],
    status: 'in-progress',
    tier: 1,
    featured: true,
    links: {
      github: 'https://github.com/dontoisme/agent-commerce',
    },
    images: ['/images/agent-commerce/demo-flow.png'],
  },
  {
    id: 'hogan-os',
    title: 'HoganOS',
    description: 'This portfolio site. A desktop OS metaphor built with Next.js and too much nostalgia.',
    longDescription: 'The very site you\'re looking at. Inspired by PostHog\'s playful desktop UI and my fond memories of Windows 95. Features draggable windows, a taskbar, Clippy, and a Konami code easter egg because of course it does.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Zustand', 'Framer Motion'],
    status: 'active',
    tier: 2,
    links: {
      github: 'https://github.com/dontoisme/hogan-os',
    },
  },
  {
    id: 'ark-b-writings',
    title: 'Ark B Writings',
    description: 'Personal blog about product management, life, and Douglas Adams references.',
    longDescription: 'A blog where I write about product management philosophy, current projects, and occasionally reference The Hitchhiker\'s Guide. The name is a deep cut - if you know, you know.',
    tech: ['GitHub Pages', 'Jekyll', 'Markdown'],
    status: 'active',
    tier: 2,
    links: {
      website: 'https://dontoisme.github.io/ark-b-writings/',
      github: 'https://github.com/dontoisme/ark-b-writings',
    },
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
