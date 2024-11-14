import Image from "next/image";
import Link from "next/link";
import { rgba } from "polished";
import { FiArrowDown } from "react-icons/fi";
import styled, { css } from "styled-components";

import { Button as AtomButton } from "@atoms";

export const Container = styled.div`
  ${({ theme }) => css`
    margin-top: 60px;
    display: flex;
    flex-direction: column;
    gap: 20px;

    > h2 {
      color: ${theme.colors.neutral[0]};
    }
  `}
`;

export const Comment = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.neutral[60]};
    border-radius: 5px;
    padding: 20px;
    color: ${theme.colors.neutral[0]};
  `}
`;

export const MainCommentary = styled.div`
  margin-bottom: 20px;
`;

export const Infos = styled.div`
  display: flex;
  gap: 20px;
  align-items: flex-start;
`;

export const Avatar = styled(Image)`
  ${({ theme }) => css`
    border-radius: 50%;
    border: 2px solid ${theme.colors.primary.yellow};
  `}
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex: 1;

  span {
    font-size: 15px;
  }
`;

export const TextCreationArea = styled.textarea<{ $isReply?: boolean }>`
  ${({ theme, $isReply }) => css`
    background-color: ${$isReply ? theme.colors.neutral[60] : theme.colors.neutral[40]};
    color: ${theme.colors.neutral[0]};
    max-width: 100%;
    padding: 10px;
    border-radius: 5px;
    height: 80px;
    resize: none;
    border: none;
  `}
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export const CommentCreationContainer = styled.div<{
  $isReply?: boolean;
}>`
  ${({ $isReply }) => css`
    margin-left: ${$isReply ? "70px" : 0};
    display: flex;
    flex-direction: column;
    gap: 10px;
  `}
`;

export const InfoBanner = styled.button`
  ${({ theme }) => css`
    font-size: 1.2rem;
    border: none;
    text-align: center;
    width: 100%;
    padding: 20px;
    cursor: pointer;
    background-color: ${theme.colors.neutral[60]};
    color: ${theme.colors.secondary.yellow};
    border-radius: 5px;
  `}
`;

export const SpinnerContainer = styled.div`
  ${({ theme }) => css`
    background: ${rgba(theme.colors.neutral[100], 0.5)};
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 30;

    display: flex;
    align-items: center;
    justify-content: center;
  `}
`;

export const Button = styled(AtomButton)<{ $isReply?: boolean }>`
  ${({ theme, $isReply }) => css`
    width: 120px;
    background-color: ${$isReply ? theme.colors.neutral[60] : theme.colors.neutral[40]};

    &:disabled {
      cursor: not-allowed;
      color: ${theme.colors.neutral[20]};
    }
  `}
`;

export const Username = styled(Link)`
  ${({ theme }) => css`
    color: ${theme.colors.primary.yellow};
    transition: 0.3s;
    font-size: 16px;

    width: fit-content;
  `}
`;

export const Actions = styled.div<{ $isReply?: boolean }>`
  ${({ $isReply }) => css`
    display: flex;

    ${$isReply &&
    css`
      margin: 0 0 0 auto;
      gap: 20px;
    `}

    ${!$isReply &&
    css`
      justify-content: space-between;

      div {
        display: flex;
        gap: 20px;

        padding-right: 20px;
      }
    `}
  `}
`;

export const ReplyButton = styled.button`
  ${({ theme }) => css`
    background: transparent;
    border: none;
    color: ${theme.colors.neutral[0]};
    font-size: 15px;
    display: flex;
    align-items: center;
    gap: 5px;

    &:hover {
      cursor: pointer;
      color: ${theme.colors.neutral[20]};
    }
  `}
`;

export const ArrowDown = styled(FiArrowDown)`
  width: 21px;
  height: 21px;
`;

export const ReplyContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Reply = styled.div`
  ${({ theme }) => css`
    margin-left: 70px;
    background-color: ${theme.colors.neutral[40]};
    border-radius: 5px;
    padding: 20px;
    color: ${theme.colors.neutral[0]};

    @media (max-width: 600px) {
      margin-left: 20px;
    }
  `}
`;

export const Report = styled.button`
  ${({ theme }) => css`
    color: ${theme.colors.primary.yellow};
    background: transparent;
    border: none;
    display: flex;
    align-items: end;

    svg {
      width: 21px;
      height: 21px;
    }

    &:hover {
      cursor: pointer;
    }
  `}
`;

export const Delete = styled.button`
  ${({ theme }) => css`
    color: ${theme.colors.feedback.error};
    background: transparent;
    border: none;
    display: flex;
    align-items: end;

    svg {
      width: 21px;
      height: 21px;
    }

    &:hover {
      cursor: pointer;
    }
  `}
`;

export const Edit = styled.button`
  ${({ theme }) => css`
    color: ${theme.colors.neutral[0]};
    background: transparent;
    border: none;
    display: flex;
    align-items: end;

    svg {
      width: 21px;
      height: 21px;
    }

    &:hover {
      cursor: pointer;
    }
  `}
`;
