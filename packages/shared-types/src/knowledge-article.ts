export interface KnowledgeArticle {
  id: string;
  title: string;
  content: string;
  category: string;
  slug: string;
  published: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}
