export interface Presentation {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  date: string;
  slideCount: number;
  tags: string[];
}

export const presentations: Presentation[] = [
  {
    id: 'job-journal-case-study',
    title: 'Job Journal',
    subtitle: 'From Career Chaos to Corpus-Driven Clarity',
    description:
      'A story-driven case study: the pain of modern job searching, the insight behind corpus-driven resumes, and a demo of the AI-native tool built to solve it.',
    date: 'February 2026',
    slideCount: 18,
    tags: ['AI', 'Product Management', 'Case Study', 'Demo'],
  },
  {
    id: 'health-tech-case-study',
    title: 'The 73% Problem',
    subtitle: 'Data-Driven Growth Strategy for Senior Healthcare AI',
    description:
      'How 72 PostHog insights in 12 days uncovered a 97.5% retention signal, identified five mental models blocking elderly users, and produced a strategic roadmap to 6.5x DAU/MAU improvement.',
    date: 'November 2025',
    slideCount: 16,
    tags: ['Healthcare AI', 'Growth', 'Analytics', 'Strategy'],
  },
];
