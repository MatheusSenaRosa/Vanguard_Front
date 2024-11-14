import styled from "styled-components";
import { css } from "styled-components";

export const Label = styled.label`
  ${({ theme }) => css`
    user-select: none;

    font-size: 16px;
    color: ${theme.colors.neutral[0]};
  `}
`;
