export interface BLog {
  id: number;
  title: string;
  author: string;
  content: string;
  excerpt: string;
  imageUrl: string;
  createdAt: Date;
  tags: string[];
}
