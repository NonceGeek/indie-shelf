"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { CategoryId, Project } from "@/lib/types";
import { categories } from "@/lib/categories";
import { useLocalStorage } from "@/lib/useLocalStorage";
import { CategoryCard } from "@/components/CategoryCard";
import { AddProjectModal } from "@/components/AddProjectModal";
import { MoveProjectModal } from "@/components/MoveProjectModal";

export default function Home() {
  const [projects, setProjects, isHydrated] = useLocalStorage<Project[]>("indie-shelf-projects", []);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isMoveModalOpen, setIsMoveModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [movingProject, setMovingProject] = useState<Project | null>(null);
  const [defaultCategoryId, setDefaultCategoryId] = useState<CategoryId>(1);
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);

  const handleAddProject = useCallback((categoryId: number) => {
    setDefaultCategoryId(categoryId as CategoryId);
    setEditingProject(null);
    setIsAddModalOpen(true);
  }, []);

  const handleEditProject = useCallback((project: Project) => {
    setEditingProject(project);
    setDefaultCategoryId(project.categoryId);
    setIsAddModalOpen(true);
  }, []);

  const handleMoveProject = useCallback((project: Project) => {
    setMovingProject(project);
    setIsMoveModalOpen(true);
  }, []);

  const handleDeleteProject = useCallback((id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }, [setProjects]);

  const handleSaveProject = useCallback(
    (data: Omit<Project, "id" | "createdAt">) => {
      if (editingProject) {
        setProjects((prev) =>
          prev.map((p) =>
            p.id === editingProject.id ? { ...p, ...data } : p
          )
        );
      } else {
        const newProject: Project = {
          ...data,
          id: crypto.randomUUID(),
          createdAt: Date.now(),
        };
        setProjects((prev) => [...prev, newProject]);
      }
      setEditingProject(null);
    },
    [editingProject, setProjects]
  );

  const handleMoveToCategory = useCallback(
    (projectId: string, newCategoryId: CategoryId) => {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === projectId ? { ...p, categoryId: newCategoryId } : p
        )
      );
    },
    [setProjects]
  );

  const getProjectsByCategory = useCallback(
    (categoryId: number) =>
      projects.filter((p) => p.categoryId === categoryId),
    [projects]
  );

  const totalProjects = projects.length;

  const downloadFile = useCallback((content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  const handleExportCSV = useCallback(() => {
    const rows = [["类别", "项目名称", "项目描述", "项目链接", "GitHub 链接"]];
    for (const cat of categories) {
      const catProjects = projects.filter((p) => p.categoryId === cat.id);
      if (catProjects.length === 0) {
        rows.push([cat.title, "", "", "", ""]);
      } else {
        for (const p of catProjects) {
          rows.push([cat.title, p.name, p.description, p.projectUrl ?? "", p.githubUrl ?? ""]);
        }
      }
    }
    const csv = rows
      .map((row) =>
        row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");
    downloadFile("\uFEFF" + csv, `项目收纳盒_${new Date().toISOString().slice(0, 10)}.csv`, "text/csv;charset=utf-8;");
    setIsExportMenuOpen(false);
  }, [projects, downloadFile]);

  const handleExportHTML = useCallback(() => {
    const nickname = window.prompt("请输入你的昵称：");
    if (nickname === null) {
      setIsExportMenuOpen(false);
      return;
    }

    const escapeHtml = (str: string) =>
      str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

    let tableRows = "";
    for (const cat of categories) {
      const catProjects = projects.filter((p) => p.categoryId === cat.id);
      if (catProjects.length === 0) {
        tableRows += `<tr><td class="category">${escapeHtml(cat.title)}</td><td></td><td></td><td></td><td></td></tr>`;
      } else {
        for (const p of catProjects) {
          const projectLink = p.projectUrl
            ? `<a href="${escapeHtml(p.projectUrl)}" target="_blank" rel="noopener noreferrer">主页</a>`
            : "";
          const githubLink = p.githubUrl
            ? `<a href="${escapeHtml(p.githubUrl)}" target="_blank" rel="noopener noreferrer">GitHub</a>`
            : "";
          const links = [projectLink, githubLink].filter(Boolean).join(" · ");
          tableRows += `<tr>
            <td class="category">${escapeHtml(cat.title)}</td>
            <td><strong>${escapeHtml(p.name)}</strong></td>
            <td>${escapeHtml(p.description)}</td>
            <td>${links}</td>
          </tr>`;
        }
      }
    }

    const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${nickname ? escapeHtml(nickname) + "的" : ""}项目收纳盒</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      line-height: 1.6;
      color: #1a1a1a;
      background: #fafafa;
      padding: 2rem;
    }
    .container { max-width: 900px; margin: 0 auto; }
    h1 { font-size: 1.75rem; margin-bottom: 0.5rem; color: #111; }
    .subtitle { color: #666; font-size: 0.9rem; margin-bottom: 2rem; }
    table {
      width: 100%;
      border-collapse: collapse;
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    th, td { padding: 0.75rem 1rem; text-align: left; border-bottom: 1px solid #e5e5e5; }
    th { background: #f5f5f5; font-weight: 600; font-size: 0.85rem; color: #444; }
    td.category { font-weight: 600; color: #333; background: #fafafa; }
    td a { color: #2563eb; text-decoration: none; }
    td a:hover { text-decoration: underline; }
    tr:last-child td { border-bottom: none; }
    .footer { margin-top: 2rem; text-align: center; color: #999; font-size: 0.8rem; }
  </style>
</head>
<body>
  <div class="container">
    <h1>${nickname ? escapeHtml(nickname) + "的" : ""}项目收纳盒</h1>
    <p class="subtitle">导出日期：${new Date().toLocaleDateString("zh-CN")}</p>
    <table>
      <thead>
        <tr>
          <th>类别</th>
          <th>项目名称</th>
          <th>项目描述</th>
          <th>链接</th>
        </tr>
      </thead>
      <tbody>
        ${tableRows}
      </tbody>
    </table>
    <p class="footer">独立开发者的项目收纳盒 — 从更高的视角看待自己的项目</p>
  </div>
</body>
</html>`;

    downloadFile(html, `项目收纳盒_${new Date().toISOString().slice(0, 10)}.html`, "text/html;charset=utf-8;");
    setIsExportMenuOpen(false);
  }, [projects, downloadFile]);

  if (!isHydrated) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="text-zinc-400 dark:text-zinc-500">加载中...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1">
      <header className="sticky top-0 z-40 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-lg">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
              独立开发者的项目收纳盒
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
              {totalProjects > 0
                ? `已收纳 ${totalProjects} 个项目`
                : "把你的项目归类到不同的收纳盒里"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/whitepaper"
              className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              白皮书
            </Link>
            <div className="relative">
              <button
                onClick={() => setIsExportMenuOpen(!isExportMenuOpen)}
                disabled={totalProjects === 0}
                className="flex items-center gap-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 px-3 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                </svg>
                导出
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              {isExportMenuOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsExportMenuOpen(false)} />
                  <div className="absolute right-0 z-20 mt-1 w-36 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 shadow-lg py-1">
                    <button
                      onClick={handleExportCSV}
                      className="flex w-full items-center gap-2 px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                      导出 CSV
                    </button>
                    <button
                      onClick={handleExportHTML}
                      className="flex w-full items-center gap-2 px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="16 18 22 12 16 6" />
                        <polyline points="8 6 2 12 8 18" />
                      </svg>
                      导出 HTML
                    </button>
                  </div>
                </>
              )}
            </div>
            <button
              onClick={() => {
                setEditingProject(null);
                setDefaultCategoryId(1);
                setIsAddModalOpen(true);
              }}
              className="flex items-center gap-1.5 rounded-lg bg-zinc-900 dark:bg-zinc-100 px-4 py-2 text-sm font-medium text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
              添加项目
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 mx-auto max-w-5xl w-full px-4 sm:px-6 py-8">
        <div className="space-y-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              projects={getProjectsByCategory(category.id)}
              onAddProject={handleAddProject}
              onEditProject={handleEditProject}
              onDeleteProject={handleDeleteProject}
              onMoveProject={handleMoveProject}
            />
          ))}
        </div>

        {totalProjects === 0 && (
          <div className="mt-12 text-center">
            <div className="text-4xl mb-4">📦</div>
            <h3 className="text-lg font-medium text-zinc-600 dark:text-zinc-400">
              收纳盒是空的
            </h3>
            <p className="text-sm text-zinc-400 dark:text-zinc-500 mt-1 max-w-md mx-auto">
              按照项目已经实现的商业结果，将你的项目归入不同的类别。项目可以随着经营结果的变化，在不同类别之间移动。
            </p>
          </div>
        )}
      </main>

      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-6">
        <p className="text-center text-xs text-zinc-400 dark:text-zinc-500">
          独立开发者的项目收纳盒 — 从更高的视角看待自己的项目
        </p>
      </footer>

      <AddProjectModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingProject(null);
        }}
        onSave={handleSaveProject}
        editProject={editingProject}
        defaultCategoryId={defaultCategoryId}
      />

      <MoveProjectModal
        isOpen={isMoveModalOpen}
        onClose={() => {
          setIsMoveModalOpen(false);
          setMovingProject(null);
        }}
        onMove={handleMoveToCategory}
        project={movingProject}
      />
    </div>
  );
}
