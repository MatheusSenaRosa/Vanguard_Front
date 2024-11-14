interface IUser {
  id: string;
  avatar: string;
  name: string;
}

interface IReply {
  id: string;
  description: string;
  customer?: IUser;
  manager?: IUser;
}

export interface IComment {
  id: string;
  description: string;
  customer?: IUser;
  manager?: IUser;
  replies: IReply[];
}

export interface ICommentForm {
  comment: string;
}

export interface IReplyForm {
  reply: string;
}

export interface IEditingForm {
  editing: string;
}

export type Modal = {
  commentId: string;
  replyId?: string;
  isLoading: boolean;
  action: "report" | "remove";
};

export type Editing = {
  replyId?: string;
  commentId: string;
};

export type OnCreate = {
  comment: (description: string) => Promise<void>;
  reply: (commentId: string, description: string) => Promise<void>;
};

export type OnUpdate = {
  comment: (commentId: string, description: string) => Promise<void>;
  reply: (replyId: string, description: string) => Promise<void>;
};

export type OnRemove = {
  comment: (commentId: string) => Promise<void>;
  reply: (replyId: string) => Promise<void>;
};

export type OnReport = {
  comment: (commentId: string) => Promise<void>;
  reply: (replyId: string) => Promise<void>;
};
