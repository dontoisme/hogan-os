export interface Skill {
  name: string;
  category: 'product' | 'leadership' | 'technical' | 'growth' | 'other';
  level: 'expert' | 'proficient' | 'familiar';
}

export const skills: Skill[] = [
  // Product Management - Expert
  { name: 'Problem Discovery', category: 'product', level: 'expert' },
  { name: 'A/B Testing', category: 'product', level: 'expert' },
  { name: 'AI UX', category: 'product', level: 'expert' },
  { name: 'Roadmapping', category: 'product', level: 'expert' },
  { name: 'User Research', category: 'product', level: 'expert' },
  { name: 'Experimentation', category: 'product', level: 'expert' },

  // Leadership - Expert
  { name: 'Product Strategy', category: 'leadership', level: 'expert' },
  { name: 'Cross-Functional Leadership', category: 'leadership', level: 'expert' },
  { name: 'Employee Mentoring', category: 'leadership', level: 'expert' },
  { name: 'Interdepartmental Growth', category: 'leadership', level: 'expert' },

  // Growth - Expert
  { name: 'Conversion Optimization', category: 'growth', level: 'expert' },
  { name: 'Funnel Analysis', category: 'growth', level: 'expert' },
  { name: 'Product-Led Growth', category: 'growth', level: 'expert' },
  { name: 'Attribution', category: 'growth', level: 'expert' },
  { name: 'Landing Page Optimization', category: 'growth', level: 'expert' },

  // Technical - Proficient
  { name: 'HTML/CSS/JS', category: 'technical', level: 'proficient' },
  { name: 'SQL', category: 'technical', level: 'proficient' },
  { name: 'NoSQL', category: 'technical', level: 'proficient' },
  { name: 'User Centered Design', category: 'technical', level: 'proficient' },
  { name: 'Designing for AI', category: 'technical', level: 'proficient' },
  { name: 'Python', category: 'technical', level: 'familiar' },
  { name: 'Swift', category: 'technical', level: 'familiar' },
  { name: 'React/Next.js', category: 'technical', level: 'familiar' },

  // Other
  { name: 'Photography', category: 'other', level: 'proficient' },
  { name: 'Storytelling', category: 'other', level: 'expert' },
  { name: 'Catching Fish Barehanded', category: 'other', level: 'expert' },
];

export const getSkillsByCategory = (category: Skill['category']): Skill[] => {
  return skills.filter(s => s.category === category);
};

export const getSkillsByLevel = (level: Skill['level']): Skill[] => {
  return skills.filter(s => s.level === level);
};

export const categories: { id: Skill['category']; label: string }[] = [
  { id: 'product', label: 'Product Management' },
  { id: 'growth', label: 'Growth' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'technical', label: 'Technical' },
  { id: 'other', label: 'Other' },
];
