'use client';

import { Download, ExternalLink } from 'lucide-react';
import { profile } from '@/data/profile';
import { experiences } from '@/data/experience';
import { cn } from '@/lib/utils';

export function ResumeWindow() {
  return (
    <div className="h-full flex flex-col p-4">
      {/* Actions Bar */}
      <div className="flex items-center gap-3 mb-4">
        <a
          href={profile.resumePdf}
          download="Don Hogan - Resume.pdf"
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-md transition-colors',
            'bg-[var(--accent)] text-white',
            'hover:bg-[var(--accent-hover)]'
          )}
        >
          <Download className="w-4 h-4" />
          <span className="text-sm font-medium">Download PDF</span>
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-md transition-colors',
            'border border-[var(--border-color)]',
            'hover:bg-[var(--bg-tertiary)]'
          )}
        >
          <ExternalLink className="w-4 h-4" />
          <span className="text-sm">LinkedIn</span>
        </a>
      </div>

      {/* Resume Preview */}
      <div className="flex-1 bg-white rounded-lg shadow-inner overflow-auto">
        <div className="p-8 text-gray-900 max-w-3xl mx-auto">
          {/* Header */}
          <div className="border-b-2 border-gray-200 pb-4 mb-6">
            <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
            <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
              <span>{profile.location}</span>
              <span>•</span>
              <span>{profile.email}</span>
              <span>•</span>
              <span>linkedin.com/in/dhogan</span>
              <span>•</span>
              <span>github.com/dontoisme</span>
            </div>
          </div>

          {/* Summary */}
          <section className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 uppercase tracking-wide">Summary</h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              {profile.pitch} {profile.summary}
            </p>
          </section>

          {/* Experience */}
          <section className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 uppercase tracking-wide">Experience</h2>

            {experiences.filter((exp) => exp.highlights.length > 0).map((exp) => (
              <div className="mb-5" key={exp.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{exp.role}</h3>
                    <p className="text-gray-600">{exp.company} • {exp.location}</p>
                  </div>
                  <span className="text-sm text-gray-500 shrink-0 ml-4">
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                <ul className="mt-2 text-gray-700 text-sm space-y-1 list-disc list-inside">
                  {exp.highlights.map((highlight, i) => (
                    <li key={i}>{highlight}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          {/* Earlier Experience */}
          <section className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 uppercase tracking-wide">Earlier Experience</h2>
            {experiences.filter((exp) => exp.highlights.length === 0).map((exp) => (
              <div className="mb-3" key={exp.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{exp.role}</h3>
                    <p className="text-gray-600">{exp.company} • {exp.location}</p>
                  </div>
                  <span className="text-sm text-gray-500 shrink-0 ml-4">
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
              </div>
            ))}
          </section>

          {/* Education */}
          <section className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 uppercase tracking-wide">Education</h2>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-900">Bachelor of Business Administration</h3>
                <p className="text-gray-600">University of Oklahoma, Norman, OK</p>
                <p className="text-sm text-gray-500">Double Major: Entrepreneurship/Venture Management and Finance</p>
              </div>
            </div>
          </section>

          {/* Skills */}
          <section className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 uppercase tracking-wide">Skills</h2>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="font-medium text-gray-800 mb-1">Product & Growth</p>
                <ul className="text-gray-600 space-y-0.5">
                  <li>• Product Strategy & Vision</li>
                  <li>• Roadmap Ownership & Planning</li>
                  <li>• Funnel Optimization</li>
                  <li>• Growth Loops & Strategy</li>
                  <li>• A/B Testing & Experimentation</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-gray-800 mb-1">AI & Orchestration</p>
                <ul className="text-gray-600 space-y-0.5">
                  <li>• Agentic AI & Multi-Agent Systems</li>
                  <li>• LLM Integration & RAG</li>
                  <li>• Prompt Engineering</li>
                  <li>• Workflow Automation</li>
                  <li>• Claude Code, Cursor</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-gray-800 mb-1">Analytics & Technical</p>
                <ul className="text-gray-600 space-y-0.5">
                  <li>• Amplitude, Mixpanel, PostHog</li>
                  <li>• SQL, Segment CDP</li>
                  <li>• API Design & Integrations</li>
                  <li>• Event-Driven Architecture</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
