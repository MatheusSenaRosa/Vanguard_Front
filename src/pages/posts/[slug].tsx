import { GetStaticProps } from "next";
import { PostTemplate, Props } from "src/templates/Posts/Post";

import { SEO } from "@atoms";
import { createClient, linkResolver } from "@libs";
import * as prismicH from "@prismicio/helpers";

const Post = (props: Props) => {
  const title = props?.post?.data?.title?.length ? props?.post?.data?.title[0]?.text : "Post não encontrado";

  return (
    <>
      <SEO title={title} />
      <PostTemplate {...props} />
    </>
  );
};

export default Post;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const client = createClient();

    const post = await client.getByUID("posts", String(params.slug), {});

    return {
      props: {
        post,
        isError: false,
      },
    };
  } catch {
    return {
      props: {
        isError: true,
      },
    };
  }
};

export async function getStaticPaths() {
  const client = createClient();
  const pages = await client.getAllByType("posts");

  return {
    paths: pages.map((page) => `/posts${prismicH.asLink(page, linkResolver)}`),
    fallback: false,
  };
}
