import styled, { css } from "styled-components";

import { Button as AtomButton } from "@atoms";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;

  height: 100%;
  width: 240px;

  @media (max-width: 960px) {
    display: none;
  }
`;

export const Button = styled(AtomButton)<{
  $isActive?: boolean;
  $noBackground?: boolean;
}>`
  ${({ theme, $isActive, $noBackground }) => css`
    height: 40px;
    padding: 0 20px;

    ${$isActive &&
    css`
      color: ${theme.colors.primary.blue};
    `}

    ${$noBackground &&
    css`
      background-color: transparent;

      &:hover {
        background-color: transparent;
        color: ${theme.colors.neutral[0]};
      }
    `}
  `}
`;
