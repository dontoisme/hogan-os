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
    id: 'healthtech-startup',
    company: 'Consumer AI-Health Tech Startup',
    role: 'Principal Product Manager (Consultant)',
    location: 'Austin, TX',
    startDate: 'Nov 2025',
    endDate: 'Nov 2025',
    description: 'Stealth mode AI-health tech startup building multi-agent orchestration for healthcare workflows.',
    highlights: [
      'Led launch of multi-agent AI orchestration system; 5 agents interpreting intent, reasoning through workflows, executing tasks autonomously',
      'Defined product vision for agentic work management: task routing, agent handoffs, context persistence, escalation paths',
      'Partnered with engineering to build agent capabilities, define acceptance criteria, establish task completion metrics',
      'Worked backwards from customer goals to shape roadmap priorities and innovation bets',
    ],
    tech: ['Multi-Agent AI', 'LLM Orchestration', 'Healthcare', 'Agentic Workflows'],
  },
  {
    id: 'zenbusiness',
    company: 'ZenBusiness',
    role: 'Staff Product Manager of Growth',
    location: 'Austin, TX',
    startDate: 'Jan 2025',
    endDate: 'Sep 2025',
    description: 'Led growth initiatives and experimentation infrastructure for business formation platform.',
    highlights: [
      'Created multiple new customer entry points, driving up conversions by over 1500 new customers per day',
      'Closed UX gaps from landing pages to improve lead capture goals by 75% on mobile and 30% overall',
      'Lead C-Suite level workshops focused on improving Growth capabilities and alignment on goals',
      'Managed multiple design and engineering streams, scaling experimentation infrastructure for algorithm performance validation by 250%',
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
      'Lead a full stack health-tech virtual-platform build focused on longevity and human optimization',
      'Drove CPA down from ~$2500 to ~$600 and increasing LTV to ~$3500+',
      'Grew new clients from 40 to over 500 in one year and over 1M ARR with 7 people in the company',
      'Switched payment tech to Stripe via the workflow orchestration API enabling cross-system task routing and data pipelines with our EHR',
    ],
    tech: ['Health Tech', 'EHR', 'Stripe', 'Workflow Orchestration'],
  },
  {
    id: 'mattermost',
    company: 'Mattermost',
    role: 'Principal Product Manager of Growth',
    location: 'Austin, TX (Remote)',
    startDate: 'Nov 2021',
    endDate: 'Feb 2023',
    description: 'Owned acquisition and activation for cloud collaboration platform.',
    highlights: [
      'Owned acquisition and activation for cloud collaboration platform, driving self-serve signups 270% and Day 14 activation from 8% to 25%',
      'Established Growth Tiger Team spanning Product, Engineering, Marketing, and Sales to align growth loops and resolve cross-functional friction',
      'Launched and promoted new capabilities; delivered presentations and demos to drive adoption of growth features',
    ],
    tech: ['Cloud', 'Growth', 'Experimentation', 'Cross-functional Leadership'],
  },
  {
    id: 'indeed',
    company: 'Indeed.com',
    role: 'Web Optimization Manager – Global Marketing Technology',
    location: 'Austin, TX',
    startDate: 'Aug 2018',
    endDate: 'Nov 2021',
    description: 'Delivered experimentation best practices across global marketing teams.',
    highlights: [
      'Delivered best practices and improved experimentation and A/B testing across 5 internal teams',
      'Lead problem discovery around marketing attribution, discovering a lack of proper marketing attribution',
      'Increased A/B Testing velocity by 300% for SMB Employer Marketing',
      'Uncovered an ~50% registration rate for Indeed Interactive via marketing campaigns',
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
      'Owned experimentation roadmaps and metrics; delivered 600+ A/B tests with 36% win rate and 10x ROI',
      'Managed cross-functional teams (Engineering, Design, Analytics) through agile development for 15 clients',
      'Delivered SONOS checkout redesign increasing conversion 22% ($12MM YoY revenue impact)',
    ],
    tech: ['A/B Testing', 'CRO', 'E-commerce', 'Team Leadership'],
  },
];

export const getExperienceById = (id: string): Experience | undefined => {
  return experiences.find(e => e.id === id);
};
