import { motion } from "framer-motion";
import { rgba } from "polished";
import styled, { css } from "styled-components";

export const Container = styled.div`
  width: 100%;

  position: relative;

  display: flex;
`;

export const Button = styled.button<{ $isOpen: boolean; $isEmpty: boolean }>`
  ${({ theme, $isOpen, $isEmpty }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;

    height: 40px;
    width: 100%;
    padding: 0 10px;

    background-color: ${theme.colors.neutral[40]};
    border: none;
    border-radius: 5px;

    z-index: 2;

    text-align: start;

    cursor: pointer;
    transition-duration: 0.1s;

    p {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: ${theme.colors.neutral[0]};
    }

    svg {
      color: ${theme.colors.neutral[0]};
      font-size: 25px;
      min-width: 25px;

      transition-duration: 0.3s;
    }

    ${$isEmpty &&
    css`
      p {
        color: ${rgba(theme.colors.neutral[0], 0.3)};
      }
    `}

    ${$isOpen &&
    css`
      border-radius: 5px 5px 0 0;

      svg {
        transform: rotate(180deg);
      }
    `}

    &:disabled {
      cursor: not-allowed;

      background-color: ${rgba(theme.colors.neutral[40], 0.6)};
    }
  `}
`;

export const List = styled(motion.ul)`
  ${({ theme }) => css`
    position: absolute;
    top: 40px;

    background-color: ${theme.colors.neutral[60]};
    border-top: 1px solid ${theme.colors.neutral[80]};

    width: 100%;
    border-radius: 0 0 5px 5px;

    display: flex;
    flex-direction: column;

    box-shadow: 10px 10px 5px 0px ${rgba(theme.colors.neutral[100], 0.5)};
  `}
`;

export const Option = styled.li<{ $isActive: boolean }>`
  ${({ theme, $isActive }) => css`
    width: 100%;

    button {
      display: flex;
      padding: 10px;

      width: 100%;

      font-size: 13.3px;
      text-align: start;
      color: ${theme.colors.neutral[0]};

      border: none;
      background-color: ${$isActive ? theme.colors.neutral[40] : "transparent"};

      cursor: pointer;
      transition-duration: 0.3s;

      &:hover {
        background-color: ${theme.colors.neutral[40]};
      }
    }

    :last-child button {
      border-radius: 0 0 5px 5px;
    }
  `}
`;
