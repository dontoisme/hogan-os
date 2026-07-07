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

// Content mirrors the canonical resume (public/resume/don-hogan-resume.pdf).
export const experiences: Experience[] = [
  {
    id: 'msk',
    company: 'Memorial Sloan Kettering Cancer Center',
    role: 'Principal Product Manager (Consultant) – Web Optimization',
    location: 'Remote',
    startDate: 'Mar 2026',
    endDate: 'Present',
    description: 'Web optimization and experimentation strategy for mskcc.org, improving how new cancer patients find and start care.',
    highlights: [
      'Improving conversion for new patients by ~20% — helping thousands of new patients annually',
      'Increasing experimentation velocity and decreasing time to learnings from multiple months to weeks',
      'Creating a web optimization strategy mindset and defining experimentation best practices for mskcc.org',
    ],
    tech: ['Experimentation', 'Health Tech', 'Web Optimization', 'Analytics'],
  },
  {
    id: 'gethealthy',
    company: 'GetHealthy.com',
    role: 'Principal Product Manager (Consultant) – AI & Growth',
    location: 'Austin, TX',
    startDate: 'Nov 2025',
    endDate: 'Dec 2025',
    description: 'B2B2C healthcare platform enabling physician practices to bill CMS (Medicare) for care management, with multi-agent AI workflows across EMRs like Epic, Cerner, and Athena.',
    highlights: [
      'Led launch of multi-agent AI orchestration system with 5 specialized agents that independently interpret user intent, reason through complex workflows, and execute tasks autonomously across systems',
      'Defined product vision for agentic work management: task routing, agent handoffs, persistent context, and human-in-the-loop escalation paths',
      'Worked backwards from customer goals (care management, patient engagement) to shape roadmap priorities and innovation bets',
    ],
    tech: ['Multi-Agent AI', 'LLM Orchestration', 'Medicare/CMS', 'EMR Integrations'],
  },
  {
    id: 'zenbusiness',
    company: 'ZenBusiness',
    role: 'Staff Product Manager – Growth',
    location: 'Austin, TX',
    startDate: 'Jan 2025',
    endDate: 'Sep 2025',
    description: 'Led growth initiatives and experimentation infrastructure for business formation platform.',
    highlights: [
      'Built new self-serve acquisition funnels beyond core LLC product, creating customer entry points that drove 8% conversion lift (~1,500 new customers/day)',
      'Scaled experimentation velocity 250% by establishing testing infrastructure, prioritization frameworks, and best practices across multiple teams',
      'Integrated AI capabilities (Velo) into front-end tooling, improving funnel starts 70% through rapid experimentation and iteration',
    ],
    tech: ['AI/ML', 'A/B Testing', 'Growth', 'Funnel Optimization'],
  },
  {
    id: 'wellcore',
    company: 'Wellcore',
    role: 'Head of Product',
    location: 'Austin, TX',
    startDate: 'May 2023',
    endDate: 'Sep 2024',
    description: 'Owned product for a B2C consumer health platform focused on longevity and human optimization — full lifecycle from 0→1.',
    highlights: [
      'Drove meaningful business impact: grew ARR from $100K to $1.8M, increased customer acquisition 1150% YoY, reduced churn 60%, improved LTV 112%',
      'Set product vision and strategy for B2C SaaS platform, owning full product lifecycle from 0→1: build, grow, and scale',
      'Built workflow orchestration system coordinating tasks across patients, providers, labs, and pharmacies, automating multi-step processes that previously required manual intervention',
    ],
    tech: ['Health Tech', 'EHR', 'Workflow Orchestration', '0→1'],
  },
  {
    id: 'mattermost',
    company: 'Mattermost',
    role: 'Principal Product Manager – Growth',
    location: 'Austin, TX (Remote)',
    startDate: 'Nov 2021',
    endDate: 'Feb 2023',
    description: 'Owned acquisition and activation for cloud collaboration platform.',
    highlights: [
      'Drove self-serve signups 270% and Day 14 activation from 8% to 25%',
      'Established Growth Tiger Team spanning Product, Engineering, Marketing, and Sales to align growth loops and resolve cross-functional friction',
      'Defined KPIs and built dashboards to measure product success; made data-driven prioritization calls even with imperfect data',
    ],
    tech: ['Cloud', 'Growth', 'Activation', 'Cross-functional Leadership'],
  },
  {
    id: 'indeed',
    company: 'Indeed',
    role: 'Web Optimization Manager',
    location: 'Austin, TX',
    startDate: 'Jul 2018',
    endDate: 'Nov 2021',
    description: 'Built experimentation infrastructure and culture across global marketing teams.',
    highlights: [
      'Built scalable SaaS experimentation platform serving 5 internal teams; increased testing velocity 600% and win rate 150%',
      'Mentored experimentation practitioners across teams, building testing culture and analytical rigor at scale',
    ],
    tech: ['Experimentation', 'Platform', 'Marketing Tech', 'Analytics'],
  },
  {
    id: 'clearhead',
    company: 'Clearhead / Accenture Interactive',
    role: 'Optimization Director',
    location: 'Austin, TX',
    startDate: 'Jan 2017',
    endDate: 'Aug 2018',
    description: 'Ran experimentation programs for enterprise clients with multi-disciplined teams.',
    highlights: [
      'Led cross-functional teams through full product lifecycle; delivered 400+ experiments with 36% win rate and 10x ROI',
      'Shipped SONOS checkout redesign generating $12MM YoY revenue impact, from conception through launch',
      'Managed multi-disciplined teams (4–8 designers, developers, analysts) across 15 enterprise client engagements',
    ],
    tech: ['A/B Testing', 'CRO', 'E-commerce', 'Team Leadership'],
  },
  {
    id: 'sparefoot',
    company: 'SpareFoot',
    role: 'Product Manager',
    location: 'Austin, TX',
    startDate: 'May 2015',
    endDate: 'Nov 2016',
    description: 'Product management for the largest online marketplace for self-storage.',
    highlights: [],
    tech: ['Marketplace', 'B2C'],
  },
  {
    id: 'ibm',
    company: 'IBM',
    role: 'Product Manager / Designer / BPM Consultant',
    location: 'Austin, TX',
    startDate: 'Jul 2011',
    endDate: 'May 2015',
    description: 'Product, design, and business process consulting across enterprise engagements.',
    highlights: [],
    tech: ['Enterprise', 'BPM', 'Design'],
  },
];

export const getExperienceById = (id: string): Experience | undefined => {
  return experiences.find(e => e.id === id);
};
