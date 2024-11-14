import styled from "styled-components";
import { css } from "styled-components";

export const Container = styled.main`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 20px;

    height: 100vh;

    h3 {
      text-align: center;
      color: ${theme.colors.neutral[0]};
    }

    div {
      display: flex;
      gap: 20px;

      button {
        width: 200px;
      }

      button:last-child {
        width: 180px;
      }
    }

    @media (max-width: 500px) {
      div {
        flex-direction: column;

        button {
          max-width: 200px;

          width: 100%;
        }
      }
    }
  `}
`;
