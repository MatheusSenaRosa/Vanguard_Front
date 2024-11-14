import styled, { css } from "styled-components";

import { skeleton } from "@styles/animations";

export const Skeleton = styled.div`
  ${({ theme }) => css`
    animation: ${skeleton} 1s infinite ease;
    background-color: ${theme.colors.neutral[40]};
  `}
`;
