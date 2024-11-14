import styled, { css } from "styled-components";

import { Button } from "@atoms";

export const Title = styled.h2`
  ${({ theme }) => css`
    color: ${theme.colors.neutral[0]};
  `}
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  input {
    width: 100%;
  }
`;

export const InputContainer = styled.div<{
  $isError?: boolean;
}>`
  ${({ $isError }) => css`
    display: flex;
    flex-direction: column;
    gap: 5px;

    height: ${$isError ? "85px" : "65px"};

    width: 100%;

    transition: height 0.3s ease;

    @media (max-width: 550px) {
      max-width: none;
      width: 100%;
    }
  `}
`;

export const Submit = styled(Button)`
  font-size: 1.4rem;
`;

export const GoBack = styled.button`
  ${({ theme }) => css`
    color: ${theme.colors.primary.blue};

    margin: 0 auto;

    transition-duration: 0.3s;
    cursor: pointer;

    background-color: transparent;
    border: none;
    font-size: 16px;

    &:hover {
      color: ${theme.colors.neutral[0]};
    }
  `}
`;
