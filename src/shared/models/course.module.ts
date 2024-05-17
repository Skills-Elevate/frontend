export interface Course {
  id: string;
  name: string;
  description?: string;
  price: number;
  imageUrl: string;
  author: string;
  createdAt: Date;
  authorId: string;
  channels: Channel[];
  firstChannelId?: string;
}

export interface Channel {
  id: string,
  name: string,
}
