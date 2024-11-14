import styled, { css } from "styled-components";

export const FormErrorMessage = styled.span`
  ${({ theme }) => css`
    font-size: 0.75rem;
    color: ${theme.colors.feedback.error};

    min-height: 19px;
  `}
`;
