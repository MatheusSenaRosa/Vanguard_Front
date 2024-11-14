import styled, { css } from "styled-components";

export const Title = styled.div`
  ${({ theme }) => css`
    color: ${theme.colors.neutral[0]};
    margin-top: 60px;
    text-align: center;
    font-size: 1.2rem;
  `}
`;

export const TextContent = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.neutral[0]};
    margin-top: 40px;
    display: block;
    text-align: left;
    width: 100%;
    font-size: 1.2rem;
  `}
`;

export const TextLink = styled.a`
  margin-top: 40px;
  display: block;
  text-align: left;
  width: 100%;
  font-size: 1.2rem;
`;
