export interface Course {
  id: string;
  name: string;
  description?: string;
  price: number;
  imageUrl: string;
  author: string;
  createdAt: Date;
<<<<<<< HEAD
  channels: {
    id: string,
    name: string,
  };
=======
  authorId: string;
>>>>>>> fc9348f9b0d180cede6d15a413262bacb5ce0eab
}
