import { rgba } from "polished";
import styled, { DefaultTheme, css } from "styled-components";

type ButtonTheme = "default" | "cancel";

const getButtonThemeStyles = (buttonTheme: ButtonTheme, theme: DefaultTheme) => {
  switch (buttonTheme) {
    case "cancel":
      return css`
        color: ${theme.colors.feedback.error};

        background-color: ${theme.colors.neutral[40]};

        &:disabled {
          background-color: ${rgba(theme.colors.neutral[40], 0.6)};
          cursor: not-allowed;
        }

        &:not(:disabled):hover {
          background-color: ${theme.colors.feedback.error};
          color: ${theme.colors.neutral[80]};
        }
      `;

    default:
      return css`
        color: ${theme.colors.primary.yellow};
        background-color: ${theme.colors.neutral[40]};

        &:disabled {
          background-color: ${rgba(theme.colors.neutral[40], 0.6)};
          cursor: not-allowed;
        }

        &:not(:disabled):hover {
          background-color: ${theme.colors.primary.yellow};
          color: ${theme.colors.neutral[80]};
        }
      `;
  }
};

export const Button = styled.button<{ $buttonTheme?: ButtonTheme }>`
  ${({ theme, $buttonTheme = "default" }) => css`
    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    height: 54px;

    border-radius: 5px;
    font-size: 1rem;

    border: none;
    transition-duration: 0.3s;

    ${getButtonThemeStyles($buttonTheme, theme)}
  `}
`;
