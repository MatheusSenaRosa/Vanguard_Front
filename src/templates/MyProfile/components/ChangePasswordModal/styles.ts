import { rgba } from "polished";
import styled, { css } from "styled-components";

import { Button as AtomButton, Skeleton as AtomSkeleton } from "@atoms";

export const Container = styled.div`
  ${({ theme }) => css`
    border-radius: 5px;

    background-color: ${theme.colors.neutral[80]};
    color: ${theme.colors.neutral[0]};

    width: 100vw;
    max-width: 550px;

    display: flex;
    flex-direction: column;

    box-shadow: 10px 10px 5px 0px ${rgba(theme.colors.neutral[100], 0.75)};
  `}
`;

export const Header = styled.div`
  ${({ theme }) => css`
    padding: 15px 15px 0 30px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    border-radius: 5px 5px 0 0;

    h2 {
      color: ${theme.colors.neutral[0]};
    }
  `}
`;

export const CloseButton = styled.button`
  ${({ theme }) => css`
    display: flex;

    background-color: transparent;
    border: none;

    cursor: pointer;

    svg {
      font-size: 25px;
      color: ${theme.colors.neutral[0]};

      transition-duration: 0.3s;
    }

    &:disabled {
      cursor: not-allowed;
    }

    &:hover {
      svg {
        color: ${theme.colors.neutral[20]};
      }
    }
  `}
`;

export const ActionContainer = styled.div`
  flex: 1;
`;

export const Title = styled.h2`
  ${({ theme }) => css`
    color: ${theme.colors.neutral[0]};
  `}
  padding: 30px 30px 0 30px;
`;

export const Form = styled.form`
  padding: 30px;
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

export const Skeleton = styled(AtomSkeleton)<{
  height?: number;
  width?: number;
}>`
  ${({ height, width }) => css`
    height: ${height || 40}px;

    width: ${width}px;

    border-radius: 5px;

    display: flex;
    align-items: center;
    justify-content: center;
  `}
`;

export const Button = styled(AtomButton)`
  font-size: 1.2rem;
  width: 100%;
`;

export const Footer = styled.div`
  display: flex;
  gap: 10px;
`;
