import styled, { css } from "styled-components";

import { Input as AtomInput, ResponsiveMain } from "@atoms";

export const Main = styled(ResponsiveMain)<{ isError?: boolean }>`
  ${({ isError }) => css`
    max-width: 1120px;

    margin: 0 auto;
    padding: 80px 0;

    min-height: calc(100vh - 160px);

    display: flex;
    flex-direction: column;

    ${isError &&
    css`
      justify-content: center;
      align-items: center;
    `}
  `}
`;

export const EmptyFeedback = styled.h3`
  ${({ theme }) => css`
    margin: 200px auto;

    color: ${theme.colors.neutral[0]};
  `}
`;

export const Title = styled.h1`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;

    color: ${theme.colors.neutral[0]};
    width: 100%;
  `}
`;

export const SearchInputLabel = styled.label`
  ${({ theme }) => css`
    position: relative;
    width: 60%;
    margin: 0 auto;
    margin-top: 10px;

    button {
      position: absolute;

      background: none;
      user-select: none;

      padding: 6px;

      border: none;

      top: 1px;
      right: 10px;

      font-size: 16px;
      color: ${theme.colors.neutral[0]};
      cursor: pointer;
      font-weight: bold;
    }

    svg {
      position: absolute;

      font-size: 20px;
      color: ${theme.colors.neutral[0]};

      top: 10px;
      left: 10px;
    }
  `}
`;

export const SearchInput = styled(AtomInput)`
  padding: 0 40px;
`;

export const PostsContainer = styled.div`
  margin-top: 50px;

  display: flex;
  flex-direction: column;
  gap: 15px;

  min-height: 710px;
`;

export const PostCard = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.neutral[40]};
    color: ${theme.colors.neutral[0]};

    padding: 20px;

    border-radius: 5px;

    &:hover {
      color: ${theme.colors.neutral[20]};
    }
  `}
`;

export const PostDate = styled.span`
  font-size: 0.75rem;

  display: flex;
  justify-content: flex-end;
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;

  margin-top: 32px;
`;

export const PageButton = styled.button<{
  $marginLeft?: boolean;
  $marginRight?: boolean;
}>`
  ${({ theme, $marginLeft, $marginRight }) => css`
    font-size: 14px;
    color: ${theme.colors.neutral[0]};

    width: 35px;
    height: 35px;

    background-color: transparent;
    color: ${theme.colors.neutral[0]};
    border-radius: 5px;
    cursor: pointer;

    border: none;
    user-select: none;

    transition: background ease 0.3s;

    ${$marginLeft &&
    css`
      margin-left: 53px;
    `}

    ${$marginRight &&
    css`
      margin-right: 53px;
    `}

    &:not(:disabled):hover {
      background-color: ${theme.colors.neutral[60]};
    }

    &:disabled {
      cursor: default;
      color: ${theme.colors.primary.blue};
      opacity: 1;

      font-size: 16px;
      font-weight: bold;
    }
  `}
`;

export const PaginationButton = styled.button`
  ${({ theme }) => css`
    font-size: 20px;
    font-weight: bold;
    color: ${theme.colors.neutral[0]};

    background-color: ${theme.colors.neutral[40]};
    border: none;
    border-radius: 5px;

    width: 45px;
    height: 45px;

    cursor: pointer;

    transition: all ease 0.3s;

    &:hover {
      filter: brightness(1.3);
    }
  `}
`;
