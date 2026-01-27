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
    id: 'exp-1',
    company: 'Your Current/Recent Company',
    role: 'Senior Software Engineer',
    location: 'Austin, TX',
    startDate: '2022-01',
    endDate: 'Present',
    description: 'Leading frontend development for enterprise SaaS platform.',
    highlights: [
      'Led migration from legacy codebase to modern React architecture',
      'Implemented comprehensive testing strategy, achieving 85% code coverage',
      'Mentored team of 4 junior developers',
      'Reduced page load times by 40% through performance optimizations',
    ],
    tech: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS'],
  },
  {
    id: 'exp-2',
    company: 'Previous Company',
    role: 'Software Engineer',
    location: 'Austin, TX',
    startDate: '2019-06',
    endDate: '2021-12',
    description: 'Full-stack development for B2B e-commerce platform.',
    highlights: [
      'Built real-time inventory management system serving 500+ merchants',
      'Designed and implemented RESTful APIs handling 10M+ requests/day',
      'Collaborated with product team to define technical requirements',
    ],
    tech: ['Python', 'Django', 'React', 'Redis', 'Docker'],
  },
  {
    id: 'exp-3',
    company: 'Early Career Company',
    role: 'Junior Developer',
    location: 'Remote',
    startDate: '2017-08',
    endDate: '2019-05',
    description: 'Frontend development for marketing technology startup.',
    highlights: [
      'Developed interactive data visualization dashboards',
      'Created automated email template generation system',
      'Contributed to open-source component library',
    ],
    tech: ['JavaScript', 'Vue.js', 'D3.js', 'Node.js'],
  },
];

export const getExperienceById = (id: string): Experience | undefined => {
  return experiences.find(e => e.id === id);
};
