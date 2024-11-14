import styled, { css } from "styled-components";

export const Container = styled.div<{ $isSelected: boolean }>`
  ${({ theme, $isSelected }) => css`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    padding: 10px 25px;

    cursor: pointer;
    border-radius: 5px;

    transition: 0.3s;

    ${!$isSelected &&
    css`
      background-color: ${theme.colors.neutral[40]};
      color: ${theme.colors.neutral[20]};

      &:hover {
        color: ${theme.colors.neutral[0]};
      }
    `}
  `}
`;

export const Content = styled.div`
  display: flex;
  align-items: center;

  height: 40px;
`;

export const Title = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.neutral[0]};
  `}
`;

export const Icon = styled.div`
  width: 30px;
  height: 30px;

  margin-left: 20px;

  @media (max-width: 1080px) {
    margin-left: 10px;
  }
  @media (max-width: 400px) {
    margin-left: 5px;
  }
`;
