import styled, { css } from "styled-components";

export const Container = styled.footer`
  ${({ theme }) => css`
    background-color: ${theme.colors.neutral[60]};
  `}
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between !important;

  height: 80px;
  max-width: 1120px;

  margin: 0 auto;

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
    flex-direction: column;
    justify-content: center !important;
    gap: 10px;
    align-items: center;

    width: 100%;
    max-width: none;
  }
`;

export const Vanguard = styled.div`
  ${({ theme }) => css`
    color: ${theme.colors.neutral[0]};
  `}
`;

export const VanguardRights = styled.div`
  ${({ theme }) => css`
    display: flex;

    color: ${theme.colors.neutral[0]};

    a {
      margin-left: 5px;
      color: ${theme.colors.primary.blue};

      &&:hover {
        color: ${theme.colors.neutral[0]};
      }
    }
  `}
`;
