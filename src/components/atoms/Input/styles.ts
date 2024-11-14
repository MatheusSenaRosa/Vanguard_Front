import { rgba } from "polished";
import styled, { css } from "styled-components";

export const Input = styled.input`
  ${({ theme }) => css`
    height: 40px;
    padding: 10px;
    background-color: ${theme.colors.neutral[40]};
    border: none;
    border-radius: 5px;

    color: ${theme.colors.neutral[0]};

    &[type="password"]::-ms-reveal {
      display: none;
    }

    &[type="password"]::-moz-show-password-button {
      display: none;
    }

    width: 100%;

    font-size: 13.3px;

    &:disabled {
      background-color: ${rgba(theme.colors.neutral[40], 0.6)};
      cursor: not-allowed;
    }
  `}
`;

export const Container = styled.div`
  position: relative;
`;

export const ShowPassword = styled.button`
  ${({ theme }) => css`
    position: absolute;

    right: 10px;
    top: 17.5px;

    height: 15px;
    width: 15px;

    transform: translateY(-50%);

    background: transparent;

    border: none;

    font-size: 15px;
    color: ${theme.colors.neutral[0]};

    cursor: pointer;
  `}
`;
