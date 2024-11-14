import Link from "next/link";
import { rgba } from "polished";
import styled, { css } from "styled-components";

import { Skeleton as AtomSkeleton } from "@atoms";

export const Container = styled.header`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;

    position: sticky;
    top: -1px;

    z-index: 1;

    box-shadow: 0px 0px 10px 1px ${rgba(theme.colors.neutral[100], 0.5)};

    width: 100%;

    background-color: ${theme.colors.neutral[60]};
  `}
`;

export const Skeleton = styled(AtomSkeleton)`
  ${({ theme }) => css`
    height: 80px;
    background-color: ${theme.colors.neutral[60]};
  `}
`;

export const Content = styled.nav`
  height: 80px;
  width: 1120px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 1220px) {
    max-width: 840px;
  }
  @media (max-width: 960px) {
    max-width: 680px;
  }
  @media (max-width: 800px) {
    max-width: 480px;
  }
  @media (max-width: 600px) {
    max-width: 360px;
  }
  @media (max-width: 400px) {
    max-width: 320px;
  }
`;

export const Logo = styled(Link)`
  ${({ theme }) => css`
    width: 85px;

    color: ${theme.colors.neutral[0]};
  `}
`;
