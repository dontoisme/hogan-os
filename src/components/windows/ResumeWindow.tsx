'use client';

import { Download, FileText, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ResumeWindow() {
  return (
    <div className="h-full flex flex-col p-4">
      {/* Actions Bar */}
      <div className="flex items-center gap-3 mb-4">
        <button
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-md transition-colors',
            'bg-[var(--accent)] text-white',
            'hover:bg-[var(--accent-hover)]'
          )}
        >
          <Download className="w-4 h-4" />
          <span className="text-sm font-medium">Download PDF</span>
        </button>
        <button
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-md transition-colors',
            'border border-[var(--border-color)]',
            'hover:bg-[var(--bg-tertiary)]'
          )}
        >
          <ExternalLink className="w-4 h-4" />
          <span className="text-sm">View Full Page</span>
        </button>
      </div>

      {/* Resume Preview */}
      <div className="flex-1 bg-white rounded-lg shadow-inner overflow-auto">
        <div className="p-8 text-gray-900 max-w-3xl mx-auto">
          {/* Header */}
          <div className="border-b-2 border-gray-200 pb-4 mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Don Hogan</h1>
            <p className="text-lg text-gray-600 mt-1">Senior Software Engineer</p>
            <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
              <span>Austin, TX</span>
              <span>•</span>
              <span>don@example.com</span>
              <span>•</span>
              <span>github.com/donhogan</span>
            </div>
          </div>

          {/* Summary */}
          <section className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2 uppercase tracking-wide">Summary</h2>
            <p className="text-gray-700 leading-relaxed">
              Full-stack software engineer with 7+ years of experience building scalable web applications.
              Passionate about clean code, developer experience, and creating products that solve real problems.
              Experienced in leading teams, mentoring junior developers, and driving technical decisions.
            </p>
          </section>

          {/* Experience */}
          <section className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 uppercase tracking-wide">Experience</h2>

            <div className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">Senior Software Engineer</h3>
                  <p className="text-gray-600">TechCorp Industries • Austin, TX</p>
                </div>
                <span className="text-sm text-gray-500">2022 - Present</span>
              </div>
              <ul className="mt-2 text-gray-700 text-sm space-y-1 list-disc list-inside">
                <li>Led migration from legacy codebase to modern React architecture</li>
                <li>Implemented comprehensive testing strategy, achieving 85% code coverage</li>
                <li>Mentored team of 4 junior developers</li>
                <li>Reduced page load times by 40% through performance optimizations</li>
              </ul>
            </div>

            <div className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">Software Engineer</h3>
                  <p className="text-gray-600">StartupXYZ • Austin, TX</p>
                </div>
                <span className="text-sm text-gray-500">2019 - 2021</span>
              </div>
              <ul className="mt-2 text-gray-700 text-sm space-y-1 list-disc list-inside">
                <li>Built real-time inventory management system serving 500+ merchants</li>
                <li>Designed RESTful APIs handling 10M+ requests/day</li>
                <li>Collaborated with product team to define technical requirements</li>
              </ul>
            </div>
          </section>

          {/* Skills */}
          <section className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 uppercase tracking-wide">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {['TypeScript', 'React', 'Next.js', 'Node.js', 'Python', 'PostgreSQL', 'AWS', 'Docker', 'Git'].map(
                (skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
          </section>

          {/* Education */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3 uppercase tracking-wide">Education</h2>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-900">B.S. Computer Science</h3>
                <p className="text-gray-600">University of Texas at Austin</p>
              </div>
              <span className="text-sm text-gray-500">2015 - 2019</span>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
