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
    subtitle: 'An AI-Native Product Case Study',
    description:
      'Architecture, design principles, and trade-offs behind a corpus-driven, AI-native career management tool built in one month.',
    date: 'February 2026',
    slideCount: 9,
    tags: ['AI', 'Product Management', 'Case Study'],
  },
];
