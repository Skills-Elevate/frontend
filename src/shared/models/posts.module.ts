export interface PostI {
  title: string;
  content: string;
  published: string;
  createdAt: string;
  categoryId: string;
  authorId: string;
}

export interface CreatePostDto {
  title: string;
  content: string;
}
