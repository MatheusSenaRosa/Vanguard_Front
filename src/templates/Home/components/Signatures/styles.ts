import styled, { css } from "styled-components";

import { Button as AtomButton } from "@atoms";

export const Container = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;

    background-color: ${theme.colors.neutral[60]};
    margin-top: 100px;
  `}
`;

export const Content = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;

    padding: 50px 0;
    width: 1120px;

    h1 {
      color: ${theme.colors.neutral[0]};
    }

    @media (max-width: 1220px) {
      width: 840px;
    }
    @media (max-width: 960px) {
      width: 680px;
    }
    @media (max-width: 800px) {
      width: 480px;
    }
    @media (max-width: 600px) {
      width: 360px;
    }
    @media (max-width: 400px) {
      width: 320px;
    }
  `}
`;

export const SignatureArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-top: 40px;

  @media (max-width: 960px) {
    flex-direction: column;
    height: 600px;
  }
`;

export const Signatures = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;

    height: 150px;
    font-size: 1.1rem;
    color: ${theme.colors.neutral[0]};

    width: 250px;
  `}
`;

export const Button = styled(AtomButton)`
  font-size: 1.2rem;
  width: 250px;
  height: 50px;
`;

export const AssignLink = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 1.2rem;
    color: ${theme.colors.primary.yellow};

    height: 54px;
    width: 250px;
    background-color: ${theme.colors.neutral[40]};

    border: none;
    border-radius: 5px;

    cursor: pointer;

    &:hover {
      color: ${theme.colors.neutral[20]};
    }
  `}
`;
