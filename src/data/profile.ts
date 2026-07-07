// Single source of truth for identity facts shown anywhere on the site.
// Numbers come from the canonical resume (public/resume/don-hogan-resume.pdf) —
// if a metric isn't here or in experience.ts, don't claim it.
export const profile = {
  name: 'Don Hogan',
  title: 'Principal Product Manager',
  tagline: 'Product leader — growth, experimentation & health tech',
  location: 'Austin, TX',
  email: 'don.r.hogan@gmail.com',
  siteUrl: 'https://hogan-os.vercel.app',
  resumePdf: '/resume/don-hogan-resume.pdf',
  github: 'https://github.com/dontoisme',
  githubHandle: '@dontoisme',
  linkedin: 'https://www.linkedin.com/in/dhogan/',
  linkedinHandle: 'in/dhogan',

  // One-sentence pitch (boot screen, meta description)
  pitch:
    'Senior product leader who takes products from strategy through launch and proves impact on growth, retention, and revenue — now improving conversion for new cancer patients at Memorial Sloan Kettering.',

  // Longer summary (mirrors the resume summary)
  summary:
    'A strategic, deeply technical PM who connects UX, code, and data to solve problems fast: grew a consumer health platform from $100K to $1.8M ARR, drove self-serve signups 270% with activation from 8% to 25%, and scaled experimentation velocity across teams. Equally at home with ambiguous 0-to-1 bets and optimization at scale.',

  metaDescription:
    'Don Hogan — Principal Product Manager in Austin, TX. Growth, experimentation, and health-tech product leader: $100K→$1.8M ARR at Wellcore, +270% signups at Mattermost, 600% experimentation velocity at Indeed.',

  // Headline metrics, resume-verified
  headlineStats: [
    { value: '$100K→$1.8M', label: 'ARR grown at Wellcore' },
    { value: '8%→25%', label: 'D14 activation at Mattermost' },
    { value: '$12MM', label: 'YoY revenue, SONOS checkout' },
  ],
} as const;
