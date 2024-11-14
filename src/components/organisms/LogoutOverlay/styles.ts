import { rgba } from "polished";
import styled from "styled-components";
import { css } from "styled-components";

export const Container = styled.div`
  ${({ theme }) => css`
    position: fixed;
    background: ${rgba(theme.colors.neutral[100], 0.7)};

    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 10;

    display: flex;
    align-items: center;
    justify-content: center;
  `}
`;
