import Link from "next/link";
import styled, { css } from "styled-components";

import { Button as AtomButton } from "@atoms";

export const Container = styled.div`
  position: relative;
  display: none;

  @media (max-width: 960px) {
    display: flex;
  }
`;

export const RootButton = styled(AtomButton)<{ $isActive: boolean }>`
  ${({ theme, $isActive }) => css`
    height: 40px;
    padding: 0 20px;

    color: ${theme.colors.neutral[0]};

    ${$isActive &&
    css`
      background-color: ${theme.colors.neutral[0]};
      color: ${theme.colors.neutral[80]};
    `}

    &:hover {
      background-color: ${theme.colors.neutral[0]};
    }
  `}
`;

export const Content = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 10px;

    position: absolute;
    top: 60px;
    right: 0;
    z-index: 1;

    border-top: 1px solid ${theme.colors.neutral[0]};
    border-radius: 0 0 5px 5px;
    padding: 15px;

    width: 150px;

    background-color: ${theme.colors.neutral[60]};
  `}
`;

export const LinkItem = styled(Link)<{ $isActive: number }>`
  ${({ theme, $isActive }) => css`
    color: ${$isActive ? theme.colors.primary.blue : theme.colors.neutral[0]};

    padding: 10px;
    border-radius: 5px;

    cursor: pointer;
    transition: all ease 0.3s;

    &:hover {
      color: ${theme.colors.neutral[100]};

      background-color: ${theme.colors.neutral[0]};
    }
  `}
`;

export const Button = styled(AtomButton)<{ $isActive?: boolean }>`
  ${({ theme, $isActive }) => css`
    font-size: 13px;
    height: 30px;
    border-radius: 4px;

    ${$isActive &&
    css`
      color: ${theme.colors.primary.blue};
    `}
  `}
`;
