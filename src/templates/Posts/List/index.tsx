import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

import { FetchError } from "@molecules";
import { Footer, Header } from "@organisms";
import { normalizeString, routes, scrollToTop } from "@utils";

import * as S from "./styles";
import { IPost } from "./types";

export type Props = {
  posts: IPost[];
  isError: boolean;
};

export const PostsListTemplate = ({ posts, isError }: Props) => {
  const router = useRouter();

  const currentPage = Number(router.query?.page) || 1;
  const postsPerPage = 7;
  const pagesAmount = Math.ceil(posts?.length / postsPerPage);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPagesAmount, setFilteredPagesAmount] = useState(pagesAmount);

  const getFilteredPosts = useCallback(() => {
    const normalizedSearchTerm = normalizeString(searchTerm);

    const filteredPosts = posts.filter((post) => {
      const normalizedTitle = normalizeString(post.title);

      return normalizedTitle.includes(normalizedSearchTerm);
    });

    return filteredPosts;
  }, [posts, searchTerm]);

  const generatePaginationRange = useCallback(() => {
    if (pagesAmount < 5) {
      const range = Array(pagesAmount)
        .fill(null)
        .map((_, index) => index + 1);

      return range;
    }

    if (currentPage <= 3) return [1, 2, 3, 4, 5];

    if (currentPage >= pagesAmount - 2) {
      const range = Array(5)
        .fill(null)
        .map((_, index) => pagesAmount - index)
        .reverse();

      return range;
    }

    const range = Array(5)
      .fill(null)
      .map((_, index) => {
        return currentPage + index - 2;
      });

    return range;
  }, [currentPage, pagesAmount]);

  const { paginationRange, visiblePosts } = useMemo(() => {
    const firstPostPage = currentPage * postsPerPage - postsPerPage;

    const filteredPosts = searchTerm ? getFilteredPosts() : posts;

    const postsOfCurrentPage = filteredPosts?.slice(firstPostPage, firstPostPage + postsPerPage);

    setFilteredPagesAmount(Math.ceil(filteredPosts?.length / postsPerPage));

    return {
      paginationRange: generatePaginationRange(),
      visiblePosts: postsOfCurrentPage,
    };
  }, [currentPage, getFilteredPosts, generatePaginationRange, posts, searchTerm]);

  const pushShallowRoute = useCallback(
    async (pageNumber: number) => {
      await router.push(`${routes.posts.list}?page=${pageNumber}`, undefined, {
        shallow: true,
      });
      scrollToTop();
    },
    [router]
  );

  useEffect(() => {
    if (visiblePosts?.length) {
      if (currentPage < 1) pushShallowRoute(1);

      if (currentPage > filteredPagesAmount) pushShallowRoute(filteredPagesAmount);
    }
  }, [currentPage, pushShallowRoute, paginationRange, filteredPagesAmount, visiblePosts]);

  useEffect(() => {
    if (router.query?.page && router.query?.page !== "1") {
      pushShallowRoute(1);
    }

    // DO NOT ADD pushShallowRoute NOR router AS DEPENDENCY
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  if (isError)
    return (
      <>
        <Header />

        <S.Main isError>
          <FetchError />
        </S.Main>

        <Footer />
      </>
    );

  if (!posts.length) {
    return (
      <>
        <Header />

        <S.Main>
          <S.Title>Posts</S.Title>

          <S.EmptyFeedback>Nenhum post encontrado</S.EmptyFeedback>
        </S.Main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <S.Main data-cy="posts">
        <S.Title>Posts</S.Title>

        <S.SearchInputLabel htmlFor="searchInput">
          <AiOutlineSearch />
          <S.SearchInput
            type="text"
            id="searchInput"
            placeholder="Pesquisar por título"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm !== "" && (
            <button type="button" onClick={() => setSearchTerm("")}>
              X
            </button>
          )}
        </S.SearchInputLabel>

        <S.PostsContainer>
          {visiblePosts.map((post) => (
            <Link key={post.slug} href={routes.posts.post.replace("%slug%", post.slug)}>
              <S.PostCard>
                <h3>{post.title}</h3>
                <S.PostDate>{post.firstPublicationDate}</S.PostDate>
              </S.PostCard>
            </Link>
          ))}
        </S.PostsContainer>

        {filteredPagesAmount > 1 && (
          <S.Pagination>
            {currentPage > 1 && <S.PaginationButton onClick={() => pushShallowRoute(currentPage - 1)}>&lt;</S.PaginationButton>}

            {paginationRange.map((item) => {
              return (
                <div key={item}>
                  <S.PageButton
                    $marginLeft={currentPage === 1 && item === 1}
                    $marginRight={currentPage === filteredPagesAmount && item === filteredPagesAmount}
                    disabled={item === currentPage}
                    onClick={() => pushShallowRoute(item)}
                  >
                    {item}
                  </S.PageButton>
                </div>
              );
            })}

            {currentPage < filteredPagesAmount && (
              <S.PaginationButton onClick={() => pushShallowRoute(currentPage + 1)}>&gt;</S.PaginationButton>
            )}
          </S.Pagination>
        )}
      </S.Main>

      <Footer />
    </>
  );
};
