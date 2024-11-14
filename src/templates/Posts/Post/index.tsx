import { useQuery } from "react-query";
import { components } from "slices/index";

import { FetchError } from "@molecules";
import { Comments, Footer, Header } from "@organisms";
import { SliceZone } from "@prismicio/react";
import { PrismicDocument } from "@prismicio/types";
import { usePostServices } from "@services";
import { formatDate } from "@utils";

import * as S from "./styles";

export type Props = {
  post: PrismicDocument;
  isError: boolean;
};

export const PostTemplate = ({ post, isError: isSSRError }: Props) => {
  const {
    deleteComment,
    createComment,
    updateComment,
    reportComment,
    createReply,
    deleteReply,
    updateReply,
    reportReply,
    getComments,
  } = usePostServices();

  const { data, isLoading, refetch, ...queryRest } = useQuery(`Post:Comments-${post?.uid}`, () => getComments(post.uid), {
    refetchOnWindowFocus: false,
    enabled: !isSSRError,
  });

  const lastUpdateDate = formatDate(post?.first_publication_date);

  const isCommentsError = queryRest.isError || queryRest.isLoadingError || queryRest.isRefetchError;

  const removeCommentHandler = async (commentId: string) => {
    await deleteComment(commentId);
    await refetch();
  };

  const removeReplyHandler = async (replyId: string) => {
    await deleteReply(replyId);
    await refetch();
  };

  const createCommentHandler = async (description: string) => {
    await createComment({
      description,
      postId: post.uid as string,
    });
    await refetch();
  };

  const updateCommentHandler = async (commentId: string, description: string) => {
    await updateComment({ commentId, description });
    await refetch();
  };

  const reportCommentHandler = async (commentId: string) => {
    await reportComment(commentId);
    await refetch();
  };

  const createReplyHandler = async (commentId: string, description: string) => {
    await createReply({
      description,
      commentId,
    });
    await refetch();
  };

  const updateReplyHandler = async (replyId: string, description: string) => {
    await updateReply({ replyId, description });
    await refetch();
  };

  const reportReplyHandler = async (replyId: string) => {
    await reportReply(replyId);
    await refetch();
  };

  if (isSSRError) {
    return (
      <>
        <Header />

        <S.Main isError>
          <FetchError />
        </S.Main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <S.Main data-cy="post">
        <SliceZone slices={post.data.slices} components={components} />

        <S.LastUpdateDateText>
          Atualizado em <span>{lastUpdateDate}</span>
        </S.LastUpdateDateText>

        {!isCommentsError && (
          <Comments
            isLoading={isLoading}
            comments={data}
            onCreate={{
              comment: createCommentHandler,
              reply: createReplyHandler,
            }}
            onRemove={{
              comment: removeCommentHandler,
              reply: removeReplyHandler,
            }}
            onReport={{
              comment: reportCommentHandler,
              reply: reportReplyHandler,
            }}
            onUpdate={{
              comment: updateCommentHandler,
              reply: updateReplyHandler,
            }}
          />
        )}
      </S.Main>

      <Footer />
    </>
  );
};
