export interface Course {
  id: string;
  name: string;
  description?: string;
  price: number;
  imageUrl: string;
  author: string;
  createdAt: Date;
  channels: {
    id: string,
    name: string,
  };
}
