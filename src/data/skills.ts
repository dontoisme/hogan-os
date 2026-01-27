export interface Skill {
  name: string;
  category: 'language' | 'framework' | 'tool' | 'database' | 'cloud' | 'other';
  level: 'expert' | 'proficient' | 'familiar';
}

export const skills: Skill[] = [
  // Languages
  { name: 'TypeScript', category: 'language', level: 'expert' },
  { name: 'JavaScript', category: 'language', level: 'expert' },
  { name: 'Python', category: 'language', level: 'proficient' },
  { name: 'Go', category: 'language', level: 'familiar' },
  { name: 'SQL', category: 'language', level: 'proficient' },
  { name: 'HTML/CSS', category: 'language', level: 'expert' },

  // Frameworks
  { name: 'React', category: 'framework', level: 'expert' },
  { name: 'Next.js', category: 'framework', level: 'expert' },
  { name: 'Node.js', category: 'framework', level: 'proficient' },
  { name: 'Flask', category: 'framework', level: 'proficient' },
  { name: 'Django', category: 'framework', level: 'familiar' },
  { name: 'React Native', category: 'framework', level: 'proficient' },
  { name: 'Tailwind CSS', category: 'framework', level: 'expert' },

  // Tools
  { name: 'Git', category: 'tool', level: 'expert' },
  { name: 'Docker', category: 'tool', level: 'proficient' },
  { name: 'Vim', category: 'tool', level: 'proficient' },
  { name: 'Jest', category: 'tool', level: 'proficient' },
  { name: 'Webpack', category: 'tool', level: 'proficient' },

  // Databases
  { name: 'PostgreSQL', category: 'database', level: 'proficient' },
  { name: 'SQLite', category: 'database', level: 'proficient' },
  { name: 'MongoDB', category: 'database', level: 'familiar' },
  { name: 'Redis', category: 'database', level: 'familiar' },

  // Cloud
  { name: 'AWS', category: 'cloud', level: 'proficient' },
  { name: 'Vercel', category: 'cloud', level: 'proficient' },
  { name: 'Firebase', category: 'cloud', level: 'familiar' },
];

export const getSkillsByCategory = (category: Skill['category']): Skill[] => {
  return skills.filter(s => s.category === category);
};

export const getSkillsByLevel = (level: Skill['level']): Skill[] => {
  return skills.filter(s => s.level === level);
};
