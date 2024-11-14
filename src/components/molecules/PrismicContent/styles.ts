import styled, { css } from "styled-components";

import { Skeleton as AtomSkeleton } from "@atoms";

export const Image = styled.img`
  margin: 50px auto 50px;
  max-width: 80%;
  display: flex;
`;

export const Skeleton = styled(AtomSkeleton)<{ width: number; height: number }>`
  ${({ width, height }) => css`
    width: ${width}px;
    height: ${height}px;
    max-width: 80%;
    margin: 50px auto 50px;
    display: flex;
  `}
`;
