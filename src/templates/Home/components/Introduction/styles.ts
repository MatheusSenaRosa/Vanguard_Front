import styled, { css } from "styled-components";

import { Button } from "@atoms";

export const Container = styled.div`
  display: flex;
  justify-content: center;

  height: calc(100vh - 80px);
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  max-width: 1120px;
  height: 100%;

  a {
    cursor: default;
  }

  @media (max-width: 1220px) {
    max-width: 840px;
  }
  @media (max-width: 960px) {
    max-width: 680px;
    justify-content: center;
  }
  @media (max-width: 800px) {
    max-width: 480px;
  }
  @media (max-width: 600px) {
    max-width: 360px;
  }
  @media (max-width: 400px) {
    max-width: 320px;
  }
`;

export const Introduction = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: flex-start;
    flex-direction: column;

    width: 70%;

    h1 {
      font-weight: normal;
      color: ${theme.colors.neutral[0]};
    }

    h2 {
      margin-top: 170px;

      line-height: 40px;
      font-weight: normal;
      color: ${theme.colors.neutral[0]};
    }

    @media (max-width: 1220px) {
      h2 {
        margin-top: 100px;
      }
    }
  `}
`;

export const SignatureButton = styled(Button)`
  ${({ theme }) => css`
    margin-top: 20px;
    width: 250px;
    height: 58px;

    font-size: 1.4rem;

    span {
      color: ${theme.colors.neutral[0]};
      transition: background ease 0.4s, color ease 0.4s;
    }

    &:not(:disabled):hover {
      span {
        color: ${theme.colors.neutral[80]};
      }
    }
  `}
`;

export const IntroductionImage = styled.div`
  svg {
    width: 550px;
    height: 600px;

    @media (max-width: 960px) {
      display: none;
    }
  }
`;
