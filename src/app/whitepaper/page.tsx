import fs from "fs";
import path from "path";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

export default function WhitepaperPage() {
  const filePath = path.join(process.cwd(), "whitepaper.md");
  const content = fs.readFileSync(filePath, "utf-8");

  return (
    <div className="flex flex-col flex-1">
      <header className="sticky top-0 z-40 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-lg">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            ← 返回收纳盒
          </Link>
        </div>
      </header>

      <main className="flex-1 mx-auto max-w-3xl w-full px-4 sm:px-6 py-12">
        <article className="prose prose-zinc dark:prose-invert max-w-none prose-headings:font-semibold prose-a:text-zinc-900 dark:prose-a:text-zinc-100 prose-a:no-underline hover:prose-a:underline prose-table:text-sm prose-th:border prose-td:border prose-th:border-zinc-300 prose-td:border-zinc-300 dark:prose-th:border-zinc-700 dark:prose-td:border-zinc-700 prose-th:px-3 prose-th:py-2 prose-td:px-3 prose-td:py-2">
          <ReactMarkdown>{content}</ReactMarkdown>
        </article>
      </main>
    </div>
  );
}
