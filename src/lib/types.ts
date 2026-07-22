export type CategoryId = 1 | 2 | 3 | 4 | 5;

export interface Project {
  id: string;
  name: string;
  description: string;
  projectUrl?: string;
  githubUrl?: string;
  categoryId: CategoryId;
  createdAt: number;
}

export interface Category {
  id: CategoryId;
  title: string;
  description: string;
  color: string;
  bgColor: string;
  borderColor: string;
  iconBg: string;
}
