"use client";

import { Category, Project } from "@/lib/types";
import { ProjectCard } from "./ProjectCard";

interface CategoryCardProps {
  category: Category;
  projects: Project[];
  onAddProject: (categoryId: number) => void;
  onEditProject: (project: Project) => void;
  onDeleteProject: (id: string) => void;
  onMoveProject: (project: Project) => void;
}

const categoryIcons: Record<number, string> = {
  1: "🆓",
  2: "💰",
  3: "👥",
  4: "🛒",
  5: "⭐",
};

export function CategoryCard({
  category,
  projects,
  onAddProject,
  onEditProject,
  onDeleteProject,
  onMoveProject,
}: CategoryCardProps) {
  return (
    <div className={`rounded-xl border ${category.borderColor} ${category.bgColor} p-5 transition-all`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`flex items-center justify-center w-9 h-9 rounded-lg ${category.iconBg} text-lg`}>
            {categoryIcons[category.id]}
          </div>
          <div>
            <h2 className={`font-semibold ${category.color}`}>
              {category.title}
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              {projects.length} 个项目
            </p>
          </div>
        </div>
        <button
          onClick={() => onAddProject(category.id)}
          className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:bg-white/60 dark:hover:bg-zinc-800/60 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
          添加
        </button>
      </div>

      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4 leading-relaxed">
        {category.description}
      </p>

      {projects.length > 0 ? (
        <div className="space-y-2">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={onEditProject}
              onDelete={onDeleteProject}
              onMove={onMoveProject}
            />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center py-8 text-sm text-zinc-400 dark:text-zinc-500">
          暂无项目，点击上方「添加」按钮
        </div>
      )}
    </div>
  );
}
