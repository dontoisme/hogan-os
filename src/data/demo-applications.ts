export interface DemoApplication {
  id: number;
  company: string;
  position: string;
  status: 'applied' | 'screening' | 'interview' | 'offer' | 'rejected' | 'withdrawn';
  appliedDate: string;
  lastActivity: string;
  source: string;
  notes?: string;
  salary?: string;
  location?: string;
  interviewDates?: string[];
}

export const demoApplications: DemoApplication[] = [
  {
    id: 1,
    company: 'TechCorp Industries',
    position: 'Senior Frontend Engineer',
    status: 'interview',
    appliedDate: '2024-01-15',
    lastActivity: '2024-01-22',
    source: 'LinkedIn',
    salary: '$150k-180k',
    location: 'Austin, TX (Hybrid)',
    interviewDates: ['2024-01-25'],
  },
  {
    id: 2,
    company: 'StartupXYZ',
    position: 'Full Stack Developer',
    status: 'screening',
    appliedDate: '2024-01-18',
    lastActivity: '2024-01-20',
    source: 'Company Website',
    salary: '$130k-160k',
    location: 'Remote',
  },
  {
    id: 3,
    company: 'MegaSoft Solutions',
    position: 'Software Engineer II',
    status: 'offer',
    appliedDate: '2024-01-08',
    lastActivity: '2024-01-24',
    source: 'Referral',
    salary: '$145k',
    location: 'San Francisco, CA',
    notes: 'Offer received! Negotiating start date.',
  },
  {
    id: 4,
    company: 'DataDriven Inc',
    position: 'Frontend Architect',
    status: 'interview',
    appliedDate: '2024-01-12',
    lastActivity: '2024-01-23',
    source: 'Indeed',
    salary: '$170k-200k',
    location: 'New York, NY (Remote OK)',
    interviewDates: ['2024-01-26', '2024-01-30'],
  },
  {
    id: 5,
    company: 'CloudNine Systems',
    position: 'React Developer',
    status: 'rejected',
    appliedDate: '2024-01-05',
    lastActivity: '2024-01-19',
    source: 'LinkedIn',
    notes: 'Position filled internally',
  },
  {
    id: 6,
    company: 'FinTech Pros',
    position: 'Senior Software Engineer',
    status: 'applied',
    appliedDate: '2024-01-21',
    lastActivity: '2024-01-21',
    source: 'Company Website',
    salary: '$160k-190k',
    location: 'Austin, TX',
  },
  {
    id: 7,
    company: 'GreenTech Solutions',
    position: 'Lead Frontend Developer',
    status: 'screening',
    appliedDate: '2024-01-17',
    lastActivity: '2024-01-22',
    source: 'Glassdoor',
    salary: '$155k-175k',
    location: 'Denver, CO (Hybrid)',
  },
  {
    id: 8,
    company: 'HealthFirst Digital',
    position: 'Software Engineer',
    status: 'interview',
    appliedDate: '2024-01-10',
    lastActivity: '2024-01-24',
    source: 'LinkedIn',
    salary: '$140k-160k',
    location: 'Remote',
    interviewDates: ['2024-01-27'],
  },
  {
    id: 9,
    company: 'RetailTech Corp',
    position: 'Full Stack Engineer',
    status: 'rejected',
    appliedDate: '2024-01-03',
    lastActivity: '2024-01-15',
    source: 'Indeed',
    notes: 'Not enough e-commerce experience',
  },
  {
    id: 10,
    company: 'AI Innovations',
    position: 'Frontend Engineer',
    status: 'applied',
    appliedDate: '2024-01-22',
    lastActivity: '2024-01-22',
    source: 'Company Website',
    salary: '$165k-195k',
    location: 'San Francisco, CA (Remote OK)',
  },
  {
    id: 11,
    company: 'DevTools Startup',
    position: 'Senior React Developer',
    status: 'withdrawn',
    appliedDate: '2024-01-06',
    lastActivity: '2024-01-18',
    source: 'Referral',
    notes: 'Withdrew after accepting other offer',
  },
  {
    id: 12,
    company: 'Enterprise Systems Inc',
    position: 'UI Engineer',
    status: 'applied',
    appliedDate: '2024-01-20',
    lastActivity: '2024-01-20',
    source: 'LinkedIn',
    salary: '$135k-155k',
    location: 'Dallas, TX',
  },
  {
    id: 13,
    company: 'Crypto Exchange Co',
    position: 'Senior Frontend Engineer',
    status: 'screening',
    appliedDate: '2024-01-16',
    lastActivity: '2024-01-23',
    source: 'AngelList',
    salary: '$175k-220k',
    location: 'Remote',
  },
  {
    id: 14,
    company: 'EdTech Platform',
    position: 'Software Developer',
    status: 'interview',
    appliedDate: '2024-01-09',
    lastActivity: '2024-01-24',
    source: 'Company Website',
    salary: '$125k-145k',
    location: 'Boston, MA (Hybrid)',
    interviewDates: ['2024-01-28'],
  },
  {
    id: 15,
    company: 'Security First Ltd',
    position: 'Full Stack Developer',
    status: 'applied',
    appliedDate: '2024-01-23',
    lastActivity: '2024-01-23',
    source: 'Indeed',
    salary: '$150k-175k',
    location: 'Austin, TX',
  },
];

export const getDemoStats = () => {
  const total = demoApplications.length;
  const active = demoApplications.filter(a =>
    ['applied', 'screening', 'interview'].includes(a.status)
  ).length;
  const interviews = demoApplications.filter(a => a.status === 'interview').length;
  const offers = demoApplications.filter(a => a.status === 'offer').length;
  const rejected = demoApplications.filter(a => a.status === 'rejected').length;

  return {
    total,
    active,
    interviews,
    offers,
    rejected,
    responseRate: Math.round(((interviews + offers + rejected) / total) * 100),
  };
};

export const getUpcomingInterviews = () => {
  return demoApplications
    .filter(a => a.status === 'interview' && a.interviewDates)
    .flatMap(a =>
      (a.interviewDates || []).map(date => ({
        company: a.company,
        position: a.position,
        date,
      }))
    )
    .sort((a, b) => a.date.localeCompare(b.date));
};
