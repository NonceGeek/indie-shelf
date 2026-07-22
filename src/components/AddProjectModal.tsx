"use client";

import { useState } from "react";
import { CategoryId, Project } from "@/lib/types";
import { categories } from "@/lib/categories";

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: Omit<Project, "id" | "createdAt">) => void;
  editProject?: Project | null;
  defaultCategoryId?: CategoryId;
}

export function AddProjectModal({
  isOpen,
  onClose,
  onSave,
  editProject,
  defaultCategoryId,
}: AddProjectModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [projectUrl, setProjectUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [categoryId, setCategoryId] = useState<CategoryId>(defaultCategoryId ?? 1);

  const [prevIsOpen, setPrevIsOpen] = useState(false);
  const [prevEditProjectId, setPrevEditProjectId] = useState<string | null>(null);

  if (isOpen && !prevIsOpen) {
    if (editProject) {
      setName(editProject.name);
      setDescription(editProject.description);
      setProjectUrl(editProject.projectUrl ?? "");
      setGithubUrl(editProject.githubUrl ?? "");
      setCategoryId(editProject.categoryId);
    } else {
      setName("");
      setDescription("");
      setProjectUrl("");
      setGithubUrl("");
      setCategoryId(defaultCategoryId ?? 1);
    }
  }

  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
  }

  if (editProject && editProject.id !== prevEditProjectId) {
    setPrevEditProjectId(editProject.id);
    setName(editProject.name);
    setDescription(editProject.description);
    setProjectUrl(editProject.projectUrl ?? "");
    setGithubUrl(editProject.githubUrl ?? "");
    setCategoryId(editProject.categoryId);
  }

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave({
      name: name.trim(),
      description: description.trim(),
      projectUrl: projectUrl.trim() || undefined,
      githubUrl: githubUrl.trim() || undefined,
      categoryId,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl p-6 mx-4">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-5">
          {editProject ? "编辑项目" : "添加项目"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
              项目名称
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="输入项目名称"
              className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition-all"
              autoFocus
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
              项目描述 <span className="text-zinc-400">(可选)</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="简单描述一下你的项目"
              rows={3}
              className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition-all resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
              项目链接 <span className="text-zinc-400">(可选)</span>
            </label>
            <input
              type="url"
              value={projectUrl}
              onChange={(e) => setProjectUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
              GitHub 链接 <span className="text-zinc-400">(可选)</span>
            </label>
            <input
              type="url"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              placeholder="https://github.com/username/repo"
              className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
              所属分类
            </label>
            <div className="space-y-1.5">
              {categories.map((cat) => (
                <label
                  key={cat.id}
                  className={`flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-all ${
                    categoryId === cat.id
                      ? `${cat.borderColor} ${cat.bgColor} ring-1 ring-current`
                      : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
                  }`}
                >
                  <input
                    type="radio"
                    name="category"
                    value={cat.id}
                    checked={categoryId === cat.id}
                    onChange={() => setCategoryId(cat.id)}
                    className="sr-only"
                  />
                  <div className={`w-3 h-3 rounded-full border-2 ${
                    categoryId === cat.id
                      ? `${cat.color} border-current`
                      : "border-zinc-300 dark:border-zinc-600"
                  }`}>
                    {categoryId === cat.id && (
                      <div className={`w-full h-full rounded-full ${cat.color.replace("text-", "bg-")}`} />
                    )}
                  </div>
                  <span className={`text-sm font-medium ${cat.color}`}>
                    {cat.title}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-zinc-300 dark:border-zinc-700 px-4 py-2.5 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              className="flex-1 rounded-lg bg-zinc-900 dark:bg-zinc-100 px-4 py-2.5 text-sm font-medium text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
            >
              {editProject ? "保存" : "添加"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
