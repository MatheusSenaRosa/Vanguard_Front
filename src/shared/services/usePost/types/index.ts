type User = {
  id: string;
  avatar: string;
  name: string;
};

type GetCommentsResponse = {
  id: string;
  description: string;
  customer?: User;
  manager?: User;
  replies: { id: string; description: string; customer: User }[];
};

type CreateCommentBody = {
  postId: string;
  description: string;
};

type UpdateCommentBody = {
  commentId: string;
  description: string;
};

type GetComments = (postUid: string) => Promise<GetCommentsResponse[]>;

type DeleteComment = (commentId: string) => Promise<void>;

type CreateComment = (body: CreateCommentBody) => Promise<void>;

type UpdateComment = (body: UpdateCommentBody) => Promise<void>;

type ReportComment = (commentId: string) => Promise<void>;

type CreateReplyBody = {
  commentId: string;
  description: string;
};

type CreateReplies = (body: CreateReplyBody) => Promise<void>;

type DeleteReplies = (commentId: string) => Promise<void>;

type UpdateReplyBody = {
  replyId: string;
  description: string;
};

type UpdateReply = (body: UpdateReplyBody) => Promise<void>;

type ReportReply = (commentId: string) => Promise<void>;

type GetPostsResponse = {
  slug: string;
  title: string;
  firstPublicationDate: string;
}[];

export interface IUsePostServices {
  getPosts: () => Promise<GetPostsResponse>;
  getComments: GetComments;
  deleteComment: DeleteComment;
  createComment: CreateComment;
  updateComment: UpdateComment;
  reportComment: ReportComment;
  createReply: CreateReplies;
  deleteReply: DeleteReplies;
  updateReply: UpdateReply;
  reportReply: ReportReply;
}
