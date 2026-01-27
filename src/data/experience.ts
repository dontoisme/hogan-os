export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string | 'Present';
  description: string;
  highlights: string[];
  tech?: string[];
}

export const experiences: Experience[] = [
  {
    id: 'zenbusiness',
    company: 'ZenBusiness',
    role: 'Staff Product Manager of Growth',
    location: 'Austin, TX',
    startDate: 'Jan 2025',
    endDate: 'Aug 2025',
    description: 'Led growth initiatives integrating AI into front-end tooling and optimizing customer acquisition funnels.',
    highlights: [
      'Integrated ZenBusiness Velo AI into front end tooling, improving funnel starts by 70%',
      'Created new customer entry points, driving conversions up 8% (1500 new customers/day)',
      'Added 50+ fixes to landing pages, improving lead capture 75% on mobile, 30% overall',
      'Managed multiple design and engineering streams, increasing A/B testing throughput 250%',
    ],
    tech: ['AI/ML', 'A/B Testing', 'Growth', 'Landing Pages'],
  },
  {
    id: 'wellcore',
    company: 'Wellcore',
    role: 'Head of Product and User Experience',
    location: 'Austin, TX',
    startDate: 'May 2023',
    endDate: 'Sep 2024',
    description: 'Led full stack health-tech virtual platform EHR build focused on longevity and human optimization.',
    highlights: [
      'Increased LTV 112% to $3500+ and drove acquisition costs down by 75%',
      'Applied product-led growth to increase new customer acquisition 1150% in one year with no headcount growth',
      'Reduced churn by 60% by eliminating repeated payment and health information entry',
    ],
    tech: ['Health Tech', 'EHR', 'Product-Led Growth', 'UX'],
  },
  {
    id: 'mattermost',
    company: 'Mattermost',
    role: 'Principal Product Manager of Growth',
    location: 'Austin, TX (Remote)',
    startDate: 'Nov 2021',
    endDate: 'Feb 2023',
    description: 'Led the Growth MLX team driving cloud workspace signups and product activations.',
    highlights: [
      'Drove cloud workspace signups and day 0 product activations up 270%',
      'Increased day 14 activation rate from 8% to 25% using growth best practices',
      'Led UX research via 3x weekly interviews to iterate on signup funnel',
    ],
    tech: ['Cloud', 'Growth', 'Experimentation', 'UX Research'],
  },
  {
    id: 'indeed',
    company: 'Indeed.com',
    role: 'Web Optimization Manager – Global Marketing Technology',
    location: 'Austin, TX',
    startDate: 'Aug 2018',
    endDate: 'Nov 2021',
    description: 'Improved experimentation velocity and attribution practices across global marketing teams.',
    highlights: [
      'Improved experimentation velocity for 5 internal teams 600%, improving win rate by 150%',
      'Implemented attribution best practices, increasing retargeting wins 70% and reducing acquisition costs',
    ],
    tech: ['Experimentation', 'Attribution', 'Marketing Tech', 'Analytics'],
  },
  {
    id: 'clearhead',
    company: 'Clearhead/Accenture Interactive',
    role: 'Optimization Director',
    location: 'Austin, TX',
    startDate: 'Jan 2017',
    endDate: 'Aug 2018',
    description: 'Ran experimentation programs for enterprise clients with multi-disciplined teams.',
    highlights: [
      'Directly responsible for 600+ experiments with 36% win rate for 15 clients with 10x ROI',
      'Launched redesigned checkout for SONOS, increasing conversion 22% and revenue $12MM YoY',
      'Led multi-disciplined team of Designers, Developers, Analysts, and Project Managers',
    ],
    tech: ['A/B Testing', 'CRO', 'E-commerce', 'Team Leadership'],
  },
];

export const getExperienceById = (id: string): Experience | undefined => {
  return experiences.find(e => e.id === id);
};
