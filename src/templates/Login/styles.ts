import Link from "next/link";
import styled, { css } from "styled-components";

import { Button, Skeleton as AtomSkeleton } from "@atoms";

export const Container = styled.div`
  ${({ theme }) => css`
    min-height: calc(100vh - 160px);
    padding: 80px 0;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: ${theme.colors.neutral[80]};

    overflow-x: hidden;

    > div {
      width: 80%;
      max-width: 420px;
    }
  `}
`;

export const InputContainer = styled.div<{
  $isError?: boolean;
}>`
  ${({ $isError }) => css`
    display: flex;
    flex-direction: column;
    gap: 5px;

    height: ${$isError ? "85px" : "65px"};

    transition: height 0.3s ease;

    input {
      width: 100%;
    }

    @media (max-width: 550px) {
      max-width: none;
      width: 100%;
    }
  `}
`;

export const Content = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    flex-direction: column;

    h2 {
      margin-bottom: 25px;
      color: ${theme.colors.neutral[0]};
    }
  `}
`;

export const Skeleton = styled(AtomSkeleton)<{
  height?: number;
  width?: number;
  isCenter?: boolean;
}>`
  ${({ height, width, isCenter }) => css`
    height: ${height || 40}px;

    width: ${width}px;

    border-radius: 5px;

    display: flex;
    align-items: center;
    justify-content: center;

    margin: ${isCenter ? "0 auto" : ""};
  `}
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;

  @media (max-width: 425px) {
    padding: 0 5px;
  }
`;

export const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Submit = styled(Button)`
  width: 100%;

  font-size: 1.4rem;
`;

export const ForgotPassword = styled(Link)`
  ${({ theme }) => css`
    text-align: center;
    margin: 0 auto;

    width: fit-content;

    color: ${theme.colors.primary.blue};

    transition-duration: 0.3s;

    &:hover {
      color: ${theme.colors.neutral[0]};
    }
  `}
`;
