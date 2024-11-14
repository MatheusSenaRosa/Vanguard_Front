import { motion } from "framer-motion";
import { rgba } from "polished";
import styled, { css } from "styled-components";

import { Button as AtomButton, Skeleton as AtomSkeleton } from "@atoms";

export const Container = styled.div`
  ${({ theme }) => css`
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 30;

    display: flex;
    align-items: center;
    justify-content: center;

    background: ${rgba(theme.colors.neutral[100], 0.5)};
  `}
`;

export const Wrapper = styled(motion.div)`
  ${({ theme }) => css`
    padding: 36px 48px;
    border-radius: 16px;

    flex: 1;
    max-width: 500px;

    z-index: 1;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;

    box-shadow: 10px 10px 5px 0px ${rgba(theme.colors.neutral[100], 0.75)};

    background-color: ${theme.colors.neutral[60]};
  `}
`;

export const Icon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 80px;
  padding-top: 15px;
  width: 100px;
`;

export const Title = styled.h2`
  ${({ theme }) => css`
    text-align: center;

    color: ${theme.colors.neutral[0]};
  `}
`;

export const Description = styled.p`
  ${({ theme }) => css`
    text-align: center;
    color: ${theme.colors.neutral[0]};
    font-size: 16px;

    button {
      font-size: 16px;

      background-color: transparent;
      border: none;

      color: ${theme.colors.primary.yellow};
      cursor: pointer;

      transition-duration: 0.3s;

      &:hover {
        opacity: 0.7;
      }
    }
  `}
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;

  input {
    height: 70px;
    width: 200px;

    text-align: center;
    font-size: 32px;
    text-transform: uppercase;
    letter-spacing: 5px;
  }
`;

export const Button = styled(AtomButton)`
  font-size: 20px;

  width: 190px;
`;

export const ResendingContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 10px;

    p {
      text-align: center;
      color: ${theme.colors.neutral[0]};
      font-size: 16px;
    }
  `}
`;

export const Skeleton = styled(AtomSkeleton)`
  height: 54px;

  width: 190px;
  border-radius: 5px;
`;
