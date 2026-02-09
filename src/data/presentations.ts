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
];
