import styled, { css } from "styled-components";

export const Container = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;

    background-color: ${theme.colors.neutral[60]};
  `}
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  max-width: 1120px;

  @media (max-width: 1220px) {
    max-width: 840px;
  }
  @media (max-width: 960px) {
    max-width: 680px;
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

export const CardArea = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  width: 1120px;
  gap: 10px;

  @media (max-width: 1220px) {
    max-width: 840px;
  }
  @media (max-width: 1080px) {
    grid-template-columns: repeat(2, 1fr);
    width: 840px;
  }
  @media (max-width: 960px) {
    width: 680px;
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

export const Title = styled.h2`
  ${({ theme }) => css`
    margin-top: 40px;
    margin-bottom: 40px;
    color: ${theme.colors.neutral[0]};
  `}
`;

export const Introduction = styled.div`
  margin: 0 auto;
  border-radius: 5px;
  margin: 40px auto 0 auto;
`;

export const TrailContent = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;

    height: 200px;

    color: ${theme.colors.neutral[0]};

    a {
      width: fit-content;
      text-decoration: none;
      color: ${theme.colors.primary.blue};

      &:hover {
        color: ${theme.colors.neutral[0]};
      }
    }
  `}
`;
