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
            <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
              <span>Austin, TX 78749</span>
              <span>•</span>
              <span>don.r.hogan@gmail.com</span>
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
              Principal Product Manager with 12+ years driving measurable growth at scale through experimentation,
              AI-native product development, and customer-obsessed discovery. Expert at building platform capabilities
              that enable downstream teams while balancing complex stakeholder needs - from enterprise compliance
              requirements to individual user outcomes. Most recently designed multi-agent AI systems for healthcare
              compliance at an Austin HealthTech AI company in stealth mode, directly translating to CSR&apos;s ESG
              reporting and regulatory challenges. Proven track record: +270% cloud signups at Mattermost, +70%
              funnel improvement at ZenBusiness, $12MM revenue impact at SONOS.
            </p>
          </section>

          {/* Experience */}
          <section className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 uppercase tracking-wide">Experience</h2>

            <div className="mb-5">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">Principal Product Manager (Consultant)</h3>
                  <p className="text-gray-600">Consumer AI-Health Tech Startup • Austin, TX</p>
                </div>
                <span className="text-sm text-gray-500">November 2025</span>
              </div>
              <ul className="mt-2 text-gray-700 text-sm space-y-1 list-disc list-inside">
                <li>Led launch of multi-agent AI orchestration system; 5 agents interpreting intent, reasoning through workflows, executing tasks autonomously</li>
                <li>Defined product vision for agentic work management: task routing, agent handoffs, context persistence, escalation paths</li>
                <li>Partnered with engineering to build agent capabilities, define acceptance criteria, establish task completion metrics</li>
                <li>Worked backwards from customer goals to shape roadmap priorities and innovation bets</li>
              </ul>
            </div>

            <div className="mb-5">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">Staff Product Manager of Growth</h3>
                  <p className="text-gray-600">ZenBusiness, Inc • Austin, TX</p>
                </div>
                <span className="text-sm text-gray-500">Jan 2025 - Sep 2025</span>
              </div>
              <ul className="mt-2 text-gray-700 text-sm space-y-1 list-disc list-inside">
                <li>Created multiple new customer entry points, driving up conversions by over 1500 new customers per day</li>
                <li>Closed UX gaps from landing pages to improve lead capture goals by 75% on mobile and 30% overall</li>
                <li>Lead C-Suite level workshops focused on improving Growth capabilities and alignment on goals</li>
                <li>Managed multiple design and engineering streams, scaling experimentation infrastructure for algorithm performance validation by 250%</li>
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
                <li>Lead a full stack health-tech virtual-platform build focused on longevity and human optimization</li>
                <li>Drove CPA down from ~$2500 to ~$600 and increasing LTV to ~$3500+</li>
                <li>Grew new clients from 40 to over 500 in one year and over 1M ARR with 7 people in the company</li>
                <li>Switched payment tech to Stripe via the workflow orchestration API enabling cross-system task routing and data pipelines with our EHR</li>
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
                <li>Owned acquisition and activation for cloud collaboration platform, driving self-serve signups 270% and Day 14 activation from 8% to 25%</li>
                <li>Established Growth Tiger Team spanning Product, Engineering, Marketing, and Sales to align growth loops and resolve cross-functional friction</li>
                <li>Launched and promoted new capabilities; delivered presentations and demos to drive adoption of growth features</li>
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
                <li>Delivered best practices and improved experimentation and A/B testing across 5 internal teams</li>
                <li>Lead problem discovery around marketing attribution, discovering a lack of proper marketing attribution</li>
                <li>Increased A/B Testing velocity by 300% for SMB Employer Marketing</li>
                <li>Uncovered an ~50% registration rate for Indeed Interactive via marketing campaigns</li>
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
                <li>Owned experimentation roadmaps and metrics; delivered 600+ A/B tests with 36% win rate and 10x ROI</li>
                <li>Managed cross-functional teams (Engineering, Design, Analytics) through agile development for 15 clients</li>
                <li>Delivered SONOS checkout redesign increasing conversion 22% ($12MM YoY revenue impact)</li>
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

          {/* Skills */}
          <section className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 uppercase tracking-wide">Skills</h2>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="font-medium text-gray-800 mb-1">Product Management</p>
                <ul className="text-gray-600 space-y-0.5">
                  <li>• Problem Discovery & User Research</li>
                  <li>• A/B Testing & Experimentation</li>
                  <li>• AI/ML Product Design</li>
                  <li>• Growth & Funnel Optimization</li>
                  <li>• Roadmapping & Prioritization</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-gray-800 mb-1">Leadership</p>
                <ul className="text-gray-600 space-y-0.5">
                  <li>• Cross-Functional Team Leadership</li>
                  <li>• Multi-Stakeholder Coordination</li>
                  <li>• Product Strategy & Vision</li>
                  <li>• Platform & Ecosystem Thinking</li>
                  <li>• Mentoring & Team Development</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-gray-800 mb-1">Technical</p>
                <ul className="text-gray-600 space-y-0.5">
                  <li>• SQL, Python, HTML/CSS/JS</li>
                  <li>• AI/LLM System Design</li>
                  <li>• Data & Analytics Architecture</li>
                  <li>• Compliance-First Dev (HIPAA → ESG)</li>
                  <li>• Claude Code, Cursor, Figma</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
