import styled, { css } from "styled-components";

import { ResponsiveMain } from "@atoms";

export const Main = styled(ResponsiveMain)<{ isError?: boolean }>`
  ${({ isError }) => css`
    width: 1120px;
    margin: 0 auto;
    margin-bottom: 90px;

    min-height: calc(100vh - 160px);

    ${isError &&
    css`
      display: flex;
      align-items: center;
      justify-content: center;
    `}
  `}
`;

export const LastUpdateDateText = styled.div`
  ${({ theme }) => css`
    margin-top: 20px;
    text-align: end;
    color: ${theme.colors.neutral[0]};

    span {
      font-weight: 600;
    }
  `}
`;
