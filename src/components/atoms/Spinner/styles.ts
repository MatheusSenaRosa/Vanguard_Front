import styled, { css } from "styled-components";

import { spin } from "@styles/animations";

const getBorderSize = (size: number) => (size * 4) / 25;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Spinner = styled.div<{ size: number }>`
  ${({ theme, size }) => css`
    width: ${size}px;
    height: ${size}px;

    border: ${getBorderSize(size)}px solid ${theme.colors.neutral[40]};
    border-top: ${getBorderSize(size)}px solid ${theme.colors.primary.yellow};

    border-radius: 50%;
    animation: ${spin} 1.5s linear infinite;
  `}
`;
