'use client';

import { demoApplications, getDemoStats, getUpcomingInterviews } from '@/data/demo-applications';
import { cn } from '@/lib/utils';
import {
  BarChart3,
  Send,
  Phone,
  Trophy,
  XCircle,
  Calendar,
  Building2,
  TrendingUp,
} from 'lucide-react';

export function JobJournalWindow() {
  const stats = getDemoStats();
  const upcomingInterviews = getUpcomingInterviews();

  const statCards = [
    {
      label: 'Total Applications',
      value: stats.total,
      icon: Send,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
    },
    {
      label: 'Active',
      value: stats.active,
      icon: TrendingUp,
      color: 'text-green-400',
      bgColor: 'bg-green-500/20',
    },
    {
      label: 'Interviews',
      value: stats.interviews,
      icon: Phone,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/20',
    },
    {
      label: 'Offers',
      value: stats.offers,
      icon: Trophy,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'applied':
        return 'bg-blue-500/20 text-blue-400';
      case 'screening':
        return 'bg-cyan-500/20 text-cyan-400';
      case 'interview':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'offer':
        return 'bg-green-500/20 text-green-400';
      case 'rejected':
        return 'bg-red-500/20 text-red-400';
      case 'withdrawn':
        return 'bg-gray-500/20 text-gray-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-[var(--border-color)]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-[var(--text-primary)]">Job Journal</h1>
            <p className="text-sm text-[var(--text-muted)]">Demo Dashboard</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-auto">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {statCards.map((stat) => (
            <div
              key={stat.label}
              className={cn(
                'p-4 rounded-lg',
                'border border-[var(--border-color)] bg-[var(--bg-secondary)]'
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[var(--text-muted)]">{stat.label}</span>
                <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center', stat.bgColor)}>
                  <stat.icon className={cn('w-4 h-4', stat.color)} />
                </div>
              </div>
              <p className="text-2xl font-bold text-[var(--text-primary)]">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          {/* Upcoming Interviews */}
          <div
            className={cn(
              'p-4 rounded-lg',
              'border border-[var(--border-color)] bg-[var(--bg-secondary)]'
            )}
          >
            <h2 className="font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[var(--accent)]" />
              Upcoming Interviews
            </h2>
            {upcomingInterviews.length > 0 ? (
              <div className="space-y-3">
                {upcomingInterviews.slice(0, 4).map((interview, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[var(--bg-tertiary)] flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-[var(--text-muted)]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-[var(--text-primary)] truncate">
                        {interview.company}
                      </p>
                      <p className="text-sm text-[var(--text-muted)] truncate">{interview.position}</p>
                    </div>
                    <span className="text-sm text-[var(--accent)] whitespace-nowrap">
                      {interview.date}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-[var(--text-muted)]">No upcoming interviews</p>
            )}
          </div>

          {/* Response Rate */}
          <div
            className={cn(
              'p-4 rounded-lg',
              'border border-[var(--border-color)] bg-[var(--bg-secondary)]'
            )}
          >
            <h2 className="font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[var(--accent)]" />
              Response Rate
            </h2>
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="var(--bg-tertiary)"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="3"
                    strokeDasharray={`${stats.responseRate}, 100`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-[var(--text-primary)]">
                    {stats.responseRate}%
                  </span>
                </div>
              </div>
              <div className="text-sm text-[var(--text-secondary)]">
                <p>
                  {stats.interviews + stats.offers + stats.rejected} responses out of {stats.total}{' '}
                  applications
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Applications */}
        <div className="mt-4">
          <h2 className="font-semibold text-[var(--text-primary)] mb-3">Recent Applications</h2>
          <div className="space-y-2">
            {demoApplications.slice(0, 6).map((app) => (
              <div
                key={app.id}
                className={cn(
                  'p-3 rounded-lg flex items-center gap-3',
                  'border border-[var(--border-color)] bg-[var(--bg-secondary)]'
                )}
              >
                <div className="w-10 h-10 rounded-lg bg-[var(--bg-tertiary)] flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-[var(--text-muted)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-[var(--text-primary)] truncate">{app.company}</p>
                  <p className="text-sm text-[var(--text-muted)] truncate">{app.position}</p>
                </div>
                <span className={cn('px-2 py-1 rounded text-xs font-medium', getStatusColor(app.status))}>
                  {app.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
