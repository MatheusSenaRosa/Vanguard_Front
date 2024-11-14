import { rgba } from "polished";
import styled, { css } from "styled-components";

import { Skeleton as AtomSkeleton, Button as AtomButton } from "@atoms";

export const Container = styled.div`
  ${({ theme }) => css`
    border-radius: 5px;

    background-color: ${theme.colors.neutral[80]};

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

    &:hover:not(:disabled) {
      svg {
        color: ${theme.colors.neutral[20]};
      }
    }
  `}
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;

  padding: 30px;
`;

export const FormRow = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 550px) {
    flex-direction: column;
  }
`;

export const InputContainer = styled.div<{
  $isError?: boolean;
  $isFullWidth?: boolean;
}>`
  ${({ $isError, $isFullWidth }) => css`
    display: flex;
    flex-direction: column;
    gap: 5px;

    height: ${$isError ? "85px" : "65px"};

    width: 100%;
    max-width: ${$isFullWidth ? "none" : "240px"};

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
    width: ${width ? `${width}px` : "auto"};

    border-radius: 5px;

    display: flex;
    align-items: center;
    justify-content: center;
  `}
`;

export const Checkbox = styled.input`
  margin-right: 5px;

  &:disabled {
    cursor: not-allowed;
  }
`;

export const Button = styled(AtomButton)`
  font-size: 1.2rem;
  width: 100%;
`;

export const Footer = styled.div`
  display: flex;
  gap: 10px;
`;

export const ActionContainer = styled.div`
  flex: 1;
`;
