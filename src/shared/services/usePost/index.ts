import { parseISO } from "date-fns";

import { createClient } from "@libs";
import { PrismicDocument } from "@prismicio/types";
import { formatDate } from "@utils";

import { api } from "../config";
import { IUsePostServices } from "./types";

export const usePostServices = (): IUsePostServices => {
  const baseUrl = "/posts";
  const prismicClient = createClient();

  const sortAndFormatPosts = (posts: PrismicDocument[]) => {
    const sorted = posts.sort((a, b) => {
      return parseISO(b.first_publication_date).getTime() - parseISO(a.first_publication_date).getTime();
    });

    const formatted = sorted.map((post) => {
      return {
        slug: post.uid,
        title: post.data.title[0].text,
        firstPublicationDate: formatDate(post.first_publication_date),
      };
    });

    return formatted;
  };

  return {
    getPosts: async () => {
      const { results } = await prismicClient.get();

      const posts = sortAndFormatPosts(results);

      return posts;
    },
    getComments: async (postUid: string) => {
      try {
        const { data } = await api.get(`${baseUrl}/comments/${postUid}`);

        return data.comments;
      } catch {
        throw new Error();
      }
    },
    deleteComment: async (commentId: string) => {
      await api.delete(`${baseUrl}/comments/${commentId}`);
    },
    createComment: async ({ description, postId }) => {
      await api.post(`${baseUrl}/comments`, { description, postId });
    },
    updateComment: async ({ description, commentId }) => {
      await api.put(`${baseUrl}/comments`, { description, commentId });
    },
    reportComment: async (commentId: string) => {
      await api.put(`${baseUrl}/comments/reports/${commentId}`);
    },
    createReply: async ({ description, commentId }) => {
      await api.post(`${baseUrl}/replies`, { commentId, description });
    },
    deleteReply: async (replyId: string) => {
      await api.delete(`${baseUrl}/replies/${replyId}`);
    },
    updateReply: async ({ description, replyId }) => {
      await api.put(`${baseUrl}/replies`, { description, replyId });
    },
    reportReply: async (replyId: string) => {
      await api.put(`${baseUrl}/replies/reports/${replyId}`);
    },
  };
};
