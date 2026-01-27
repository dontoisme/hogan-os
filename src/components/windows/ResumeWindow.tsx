'use client';

import { Download, ExternalLink } from 'lucide-react';
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
        <a
          href="https://www.linkedin.com/in/dhogan/"
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
            <h1 className="text-3xl font-bold text-gray-900">Don Hogan</h1>
            <p className="text-lg text-gray-600 mt-1">Principal Product Manager – Growth</p>
            <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
              <span>Austin, TX</span>
              <span>•</span>
              <span>don.r.hogan@gmail.com</span>
              <span>•</span>
              <span>github.com/dontoisme</span>
            </div>
          </div>

          {/* Skills */}
          <section className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 uppercase tracking-wide">Skills</h2>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="font-medium text-gray-800 mb-1">Product Management</p>
                <ul className="text-gray-600 space-y-0.5">
                  <li>• Problem Discovery</li>
                  <li>• AI UX</li>
                  <li>• A/B Testing</li>
                  <li>• Roadmapping</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-gray-800 mb-1">Leadership</p>
                <ul className="text-gray-600 space-y-0.5">
                  <li>• Product Strategy</li>
                  <li>• Cross-Functional Leadership</li>
                  <li>• Employee Mentoring</li>
                  <li>• Interdepartmental Growth</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-gray-800 mb-1">Design & Development</p>
                <ul className="text-gray-600 space-y-0.5">
                  <li>• User Centered Design</li>
                  <li>• HTML, CSS, JS</li>
                  <li>• SQL and NoSQL</li>
                  <li>• Designing for AI</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Experience */}
          <section className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 uppercase tracking-wide">Experience</h2>

            <div className="mb-5">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">Staff Product Manager of Growth</h3>
                  <p className="text-gray-600">ZenBusiness, Inc • Austin, TX</p>
                </div>
                <span className="text-sm text-gray-500">Jan 2025 - Aug 2025</span>
              </div>
              <ul className="mt-2 text-gray-700 text-sm space-y-1 list-disc list-inside">
                <li>Integrated ZenBusiness Velo AI into front end tooling, improving funnel starts by 70%</li>
                <li>Created new customer entry points, driving conversions up 8% or 1500 new customers/day</li>
                <li>Added 50+ fixes to landing pages, improving lead capture 75% on mobile</li>
                <li>Managed multiple streams, increasing A/B testing throughput by 250%</li>
              </ul>
            </div>

            <div className="mb-5">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">Head of Product and User Experience</h3>
                  <p className="text-gray-600">Wellcore, Inc • Austin, TX</p>
                </div>
                <span className="text-sm text-gray-500">May 2023 - Sep 2024</span>
              </div>
              <ul className="mt-2 text-gray-700 text-sm space-y-1 list-disc list-inside">
                <li>Led full stack health-tech virtual-platform EHR build for longevity optimization</li>
                <li>Increased LTV 112% to $3500+ and drove acquisition costs down by 75%</li>
                <li>Applied PLG to increase new customer acquisition 1150% with no headcount growth</li>
                <li>Reduced churn by 60% by eliminating repeated data entry</li>
              </ul>
            </div>

            <div className="mb-5">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">Principal Product Manager of Growth</h3>
                  <p className="text-gray-600">Mattermost • Austin, TX (Remote)</p>
                </div>
                <span className="text-sm text-gray-500">Nov 2021 - Feb 2023</span>
              </div>
              <ul className="mt-2 text-gray-700 text-sm space-y-1 list-disc list-inside">
                <li>Led Growth MLX team, driving cloud signups and day 0 activations up 270%</li>
                <li>Increased day 14 activation rate from 8% to 25%</li>
                <li>Led UX research via 3x weekly interviews to iterate on signup funnel</li>
              </ul>
            </div>

            <div className="mb-5">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">Web Optimization Manager – Global Marketing Technology</h3>
                  <p className="text-gray-600">Indeed.com • Austin, TX</p>
                </div>
                <span className="text-sm text-gray-500">Aug 2018 - Nov 2021</span>
              </div>
              <ul className="mt-2 text-gray-700 text-sm space-y-1 list-disc list-inside">
                <li>Improved experimentation velocity for 5 teams 600%, improving win rate by 150%</li>
                <li>Implemented attribution best practices, increasing retargeting wins 70%</li>
              </ul>
            </div>

            <div className="mb-5">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">Optimization Director</h3>
                  <p className="text-gray-600">Clearhead/Accenture Interactive • Austin, TX</p>
                </div>
                <span className="text-sm text-gray-500">Jan 2017 - Aug 2018</span>
              </div>
              <ul className="mt-2 text-gray-700 text-sm space-y-1 list-disc list-inside">
                <li>Ran 600+ experiments with 36% win rate for 15 clients with 10x ROI</li>
                <li>Launched redesigned checkout for SONOS, +22% conversion, $12MM revenue</li>
                <li>Led multi-disciplined team of Designers, Developers, Analysts, and PMs</li>
              </ul>
            </div>
          </section>

          {/* Education */}
          <section className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 uppercase tracking-wide">Education</h2>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-900">Bachelor of Business Administration</h3>
                <p className="text-gray-600">University of Oklahoma, Norman, OK</p>
                <p className="text-sm text-gray-500">Majors: Entrepreneurship/Venture Management and Finance</p>
              </div>
              <span className="text-sm text-gray-500">May 2010</span>
            </div>
          </section>

          {/* Hobbies */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3 uppercase tracking-wide">Hobbies & Interests</h2>
            <div className="flex flex-wrap gap-2 text-sm text-gray-600">
              <span className="px-3 py-1 bg-gray-100 rounded-full">🚴 Biking (mountain + road)</span>
              <span className="px-3 py-1 bg-gray-100 rounded-full">📷 Photography</span>
              <span className="px-3 py-1 bg-gray-100 rounded-full">🧗 Rock climbing & backpacking</span>
              <span className="px-3 py-1 bg-gray-100 rounded-full">🎮 SNES & Indie games</span>
              <span className="px-3 py-1 bg-gray-100 rounded-full">🐟 Ask me about catching fish barehanded</span>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
