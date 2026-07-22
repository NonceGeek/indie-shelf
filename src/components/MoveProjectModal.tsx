"use client";

import { CategoryId, Project } from "@/lib/types";
import { categories } from "@/lib/categories";

interface MoveProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMove: (projectId: string, newCategoryId: CategoryId) => void;
  project: Project | null;
}

export function MoveProjectModal({ isOpen, onClose, onMove, project }: MoveProjectModalProps) {
  if (!isOpen || !project) return null;

  const handleMove = (categoryId: CategoryId) => {
    onMove(project.id, categoryId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-sm rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl p-6 mx-4">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
          移动项目
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-5">
          将「{project.name}」移动到：
        </p>

        <div className="space-y-1.5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleMove(cat.id)}
              disabled={cat.id === project.categoryId}
              className={`w-full flex items-center gap-3 rounded-lg border p-3 text-left transition-all ${
                cat.id === project.categoryId
                  ? "opacity-40 cursor-not-allowed border-zinc-200 dark:border-zinc-800"
                  : `${cat.borderColor} hover:${cat.bgColor} cursor-pointer`
              }`}
            >
              <span className={`text-sm font-medium ${cat.color}`}>
                {cat.title}
              </span>
              {cat.id === project.categoryId && (
                <span className="ml-auto text-xs text-zinc-400">当前</span>
              )}
            </button>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full mt-4 rounded-lg border border-zinc-300 dark:border-zinc-700 px-4 py-2.5 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
        >
          取消
        </button>
      </div>
    </div>
  );
}
