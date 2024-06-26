export interface ChannelI {
  id: string;
  name: string;
  ChannelMembership: ChannelMembership[];
  messages: Message[];
  currentUserName: string;
  studentName: string;
}

export interface ChannelMembership {
  userId: string;
  channelId: string;
  user: {
    email: string;
    name: string;
  };
  hasAcceptedAccess: boolean
}

export interface Message {
  content: string;
  createdAt: string;
  channelId: string;
  author: {
    name: string;
  };
}

export interface CreateChannelDto {
  id: string;
  courseId: string;
}
