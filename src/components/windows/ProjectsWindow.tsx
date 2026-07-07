'use client';

import { useState } from 'react';
import Image from 'next/image';
import { projects, Project } from '@/data/projects';
import { specimens } from '@/data/fieldGuide';
import { useWindowStore } from '@/stores/windowStore';
import { openAppWindow } from '@/data/apps';
import { ExternalLink, Github, FolderOpen, PawPrint } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ProjectsWindow() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { openWindow } = useWindowStore();

  const handleProjectClick = (project: Project) => {
    if (project.id === 'job-journal') {
      openWindow('job-journal', 'Job Journal', 'chart');
    } else {
      setSelectedProject(project);
    }
  };

  if (selectedProject) {
    return (
      <div className="h-full flex flex-col">
        {/* Back button */}
        <div className="p-4 border-b border-[var(--border-color)]">
          <button
            className="text-sm text-[var(--accent)] hover:underline flex items-center gap-1"
            onClick={() => setSelectedProject(null)}
          >
            ← Back to Projects
          </button>
        </div>

        {/* Project Detail */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="flex items-start gap-4 mb-6">
            <div
              className={cn(
                'w-16 h-16 rounded-xl flex items-center justify-center',
                'bg-gradient-to-br from-[var(--accent)] to-[var(--accent-hover)]'
              )}
            >
              <FolderOpen className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-[var(--text-primary)]">{selectedProject.title}</h1>
              <p className="text-[var(--text-secondary)] mt-1">{selectedProject.description}</p>
            </div>
          </div>

          {/* Status Badge */}
          <div className="mb-6">
            <span
              className={cn(
                'px-3 py-1 rounded-full text-xs font-medium',
                selectedProject.status === 'active' && 'bg-green-500/20 text-green-400',
                selectedProject.status === 'completed' && 'bg-blue-500/20 text-blue-400',
                selectedProject.status === 'in-progress' && 'bg-yellow-500/20 text-yellow-400'
              )}
            >
              {selectedProject.status}
            </span>
          </div>

          {/* Screenshots */}
          {selectedProject.images && selectedProject.images.length > 0 && (
            <div className="mb-6">
              <div className="flex gap-3 overflow-x-auto pb-2">
                {selectedProject.images.map((src) => (
                  <Image
                    key={src}
                    src={src}
                    alt={`${selectedProject.title} screenshot`}
                    width={368}
                    height={800}
                    unoptimized
                    className={cn(
                      'h-72 w-auto shrink-0 rounded-lg object-contain',
                      'border border-[var(--border-color)] bg-[var(--bg-tertiary)]'
                    )}
                  />
                ))}
              </div>
              {selectedProject.imagesCaption && (
                <p className="text-xs text-[var(--text-muted)] mt-1">
                  {selectedProject.imagesCaption}
                </p>
              )}
            </div>
          )}

          {/* Long Description */}
          {selectedProject.longDescription && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-2">About</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">{selectedProject.longDescription}</p>
            </div>
          )}

          {/* Tech Stack */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-2">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {selectedProject.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-[var(--bg-tertiary)] text-[var(--text-secondary)] rounded-md text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          {selectedProject.links && (
            <div className="flex gap-3">
              {selectedProject.links.github && (
                <a
                  href={selectedProject.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-md transition-colors',
                    'bg-[var(--bg-tertiary)] hover:bg-[var(--bg-secondary)]'
                  )}
                >
                  <Github className="w-4 h-4" />
                  <span className="text-sm">View on GitHub</span>
                </a>
              )}
              {selectedProject.links.demo && (
                <a
                  href={selectedProject.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-md transition-colors',
                    'bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)]'
                  )}
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="text-sm">Live Demo</span>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full p-4 overflow-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <button
            key={project.id}
            className={cn(
              'p-4 rounded-lg text-left transition-all',
              'bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)]',
              'border border-[var(--border-color)] hover:border-[var(--accent)]'
            )}
            onClick={() => handleProjectClick(project)}
          >
            <div className="flex items-start gap-3">
              <div
                className={cn(
                  'w-10 h-10 rounded-lg flex items-center justify-center shrink-0',
                  'bg-gradient-to-br from-[var(--accent)] to-[var(--accent-hover)]'
                )}
              >
                <FolderOpen className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-[var(--text-primary)] truncate">{project.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mt-1">
                  {project.description}
                </p>
              </div>
              {project.images?.[0] && (
                <Image
                  src={project.images[0]}
                  alt=""
                  width={56}
                  height={96}
                  unoptimized
                  className={cn(
                    'w-14 h-24 shrink-0 rounded-md object-cover object-top',
                    'border border-[var(--border-color)] bg-[var(--bg-tertiary)]'
                  )}
                />
              )}
            </div>

            {/* Tech badges */}
            <div className="flex flex-wrap gap-1 mt-3">
              {project.tech.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 bg-[var(--bg-tertiary)] text-[var(--text-muted)] rounded text-xs"
                >
                  {tech}
                </span>
              ))}
              {project.tech.length > 3 && (
                <span className="px-2 py-0.5 text-[var(--text-muted)] text-xs">
                  +{project.tech.length - 3}
                </span>
              )}
            </div>

            {/* Status indicator */}
            <div className="mt-3 flex items-center justify-between">
              <span
                className={cn(
                  'px-2 py-0.5 rounded text-xs font-medium',
                  project.status === 'active' && 'bg-green-500/20 text-green-400',
                  project.status === 'completed' && 'bg-blue-500/20 text-blue-400',
                  project.status === 'in-progress' && 'bg-yellow-500/20 text-yellow-400'
                )}
              >
                {project.status}
              </span>
              {project.featured && (
                <span className="text-xs text-[var(--accent)]">★ Featured</span>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* The highlights end here — the full catalog lives in the Field Guide */}
      <button
        onClick={() => openAppWindow('field-guide')}
        className={cn(
          'mt-4 w-full p-3 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm',
          'border border-dashed border-[var(--border-color)] text-[var(--text-secondary)]',
          'hover:border-[var(--accent)] hover:text-[var(--accent)]'
        )}
      >
        <PawPrint className="w-4 h-4" />
        These are the highlights. Browse all {specimens.length} species in the Field Guide →
      </button>
    </div>
  );
}
