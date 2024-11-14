import styled, { css } from "styled-components";

import { Skeleton as AtomSkeleton } from "@atoms";

export const Skeleton = styled(AtomSkeleton)<{
  height?: number;
  width?: number;
  $marginBottom?: number;
}>`
  ${({ width, height, $marginBottom }) => css`
    width: ${width ? `${width}px` : "auto"};
    height: ${height ? `${height}px` : "auto"};
    margin-bottom: ${$marginBottom ? `${$marginBottom}px` : 0};

    border-radius: 5px;
  `}
`;

export const ManagerSectionSkeleton = styled(AtomSkeleton)`
  height: 170px;
  width: 325px;

  border-radius: 5px;

  @media (max-width: 960px) {
    width: 100%;

    height: 100px;
  }

  @media (max-width: 600px) {
    height: 170px;
  }
`;

export const ProfileCardSkeleton = styled(AtomSkeleton)<{ height: number }>`
  ${({ height }) => css`
    width: 325px;
    height: ${height}px;

    border-radius: 5px;

    @media (max-width: 960px) {
      width: 100%;

      height: 180px;
    }

    @media (max-width: 600px) {
      height: ${height}px;
    }
  `}
`;
