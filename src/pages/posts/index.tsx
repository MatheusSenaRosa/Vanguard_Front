import { GetStaticProps } from "next";
import React from "react";
import { Props } from "src/templates/Posts/List";

import { SEO } from "@atoms";
import { usePostServices } from "@services";
import { PostsListTemplate } from "@templates";

const PostsList = (props: Props) => {
  return (
    <>
      <SEO title="Posts" />
      <PostsListTemplate {...props} />
    </>
  );
};

export default PostsList;

export const getStaticProps: GetStaticProps = async () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { getPosts } = usePostServices();

  try {
    const posts = await getPosts();

    return {
      props: {
        posts,
        revalidate: 60 * 30, // 30 minutes
        isError: false,
      },
    };
  } catch {
    return {
      props: {
        isError: true,
        revalidate: 30, // 30 minutes
      },
    };
  }
};
