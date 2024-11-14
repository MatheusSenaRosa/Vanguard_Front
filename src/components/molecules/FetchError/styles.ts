import { shade } from "polished";
import styled, { css } from "styled-components";

export const Container = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    gap: 16px;

    svg {
      color: ${theme.colors.feedback.error};
    }
  `}
`;
export const Title = styled.h2`
  ${({ theme }) => css`
    font-size: 30px;
    font-weight: 600;
    line-height: 37px;
    text-align: center;

    color: ${theme.colors.feedback.error};
  `}
`;

export const Description = styled.p`
  font-size: 16px;
  font-weight: 300;
  color: white;
  text-align: center;
  line-height: 25px;
`;

export const Button = styled.button`
  ${({ theme }) => css`
    padding: 6px;
    border-radius: 4px;
    background-color: ${theme.colors.feedback.error};
    border: none;
    color: white;
    font-size: 16px;

    display: flex;
    align-items: center;
    gap: 12px;

    svg {
      color: white;
    }

    cursor: pointer;

    transition: all 0.2s ease-in-out;

    &:hover {
      background-color: ${shade(0.2, theme.colors.feedback.error)};
    }
  `}
`;
