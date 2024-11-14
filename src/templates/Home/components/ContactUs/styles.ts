import styled from "styled-components";
import { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export const Content = styled.div`
  ${({ theme }) => css`
    width: 1120px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    margin-top: 150px;

    h2 {
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

export const SocialMedia = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;

    width: 100%;
    height: auto;

    margin-top: 50px;
    margin-bottom: 150px;

    a {
      display: flex;
      width: 100%;
      justify-content: space-around;
      color: ${theme.colors.primary.blue};

      &:hover {
        color: ${theme.colors.neutral[0]};
      }
    }

    @media (max-width: 600px) {
      grid-template-columns: repeat(2, 1fr);
    }
  `}
`;

export const SocialMediaLinkContent = styled.div`
  cursor: pointer;
  height: 30px;

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    margin-left: 10px;

    width: 25px;
    height: 25px;
  }
`;
