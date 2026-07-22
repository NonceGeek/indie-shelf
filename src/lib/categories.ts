import { Category } from "./types";

export const categories: Category[] = [
  {
    id: 1,
    title: "完全免费的项目",
    description: "项目没有形成任何直接收入，用户可以免费使用全部功能。",
    color: "text-zinc-600 dark:text-zinc-400",
    bgColor: "bg-zinc-50 dark:bg-zinc-900/50",
    borderColor: "border-zinc-200 dark:border-zinc-800",
    iconBg: "bg-zinc-100 dark:bg-zinc-800",
  },
  {
    id: 2,
    title: "能获得一次性收益的项目",
    description: "Hackathon 比赛奖金、用户定制项目等，是独立开发之路上的盈利起点。",
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-50 dark:bg-amber-950/30",
    borderColor: "border-amber-200 dark:border-amber-900/50",
    iconBg: "bg-amber-100 dark:bg-amber-900/50",
  },
  {
    id: 3,
    title: "能获得少量用户长期订阅的项目",
    description: "少量用户持续付费订阅，项目能长期独立存活。",
    color: "text-sky-600 dark:text-sky-400",
    bgColor: "bg-sky-50 dark:bg-sky-950/30",
    borderColor: "border-sky-200 dark:border-sky-900/50",
    iconBg: "bg-sky-100 dark:bg-sky-900/50",
  },
  {
    id: 4,
    title: "能获得大量用户付费的项目",
    description: "已完成商业价值的规模化验证，一批人愿意为同一个产品付费。",
    color: "text-violet-600 dark:text-violet-400",
    bgColor: "bg-violet-50 dark:bg-violet-950/30",
    borderColor: "border-violet-200 dark:border-violet-900/50",
    iconBg: "bg-violet-100 dark:bg-violet-900/50",
  },
  {
    id: 5,
    title: "能获得大量用户长期订阅的项目",
    description: "大量用户愿意付费且持续付费，传统意义上的「成功项目」。",
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
    borderColor: "border-emerald-200 dark:border-emerald-900/50",
    iconBg: "bg-emerald-100 dark:bg-emerald-900/50",
  },
];
