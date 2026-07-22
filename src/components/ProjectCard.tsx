"use client";

import { Project } from "@/lib/types";
import { categories } from "@/lib/categories";

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
  onMove: (project: Project) => void;
}

export function ProjectCard({ project, onEdit, onDelete, onMove }: ProjectCardProps) {
  const category = categories.find((c) => c.id === project.categoryId);

  return (
    <div className="group relative rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 transition-all hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <h3 className="font-medium text-zinc-900 dark:text-zinc-100 truncate">
            {project.name}
          </h3>
          {project.description && (
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2">
              {project.description}
            </p>
          )}
          {(project.projectUrl || project.githubUrl) && (
            <div className="mt-2 flex items-center gap-3">
              {project.projectUrl && (
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" />
                  </svg>
                  项目
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </a>
              )}
            </div>
          )}
        </div>
        <div className="flex shrink-0 gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onMove(project)}
            className="rounded p-1.5 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 dark:hover:text-zinc-300 dark:hover:bg-zinc-800 transition-colors"
            title="移动分类"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>
          <button
            onClick={() => onEdit(project)}
            className="rounded p-1.5 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 dark:hover:text-zinc-300 dark:hover:bg-zinc-800 transition-colors"
            title="编辑"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(project.id)}
            className="rounded p-1.5 text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
            title="删除"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            </svg>
          </button>
        </div>
      </div>
      {category && (
        <div className="mt-3">
          <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${category.color} ${category.bgColor}`}>
            {category.title}
          </span>
        </div>
      )}
    </div>
  );
}
