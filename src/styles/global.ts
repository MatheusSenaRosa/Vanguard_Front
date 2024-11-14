import { createGlobalStyle, css } from "styled-components";

export const GlobalStyles = createGlobalStyle`
${({ theme }) => css`
  html,
  button {
    @media (max-width: 1680px) {
      font-size: 93.75%;
    }
    @media (max-width: 1080px) {
      font-size: 87.5%;
    }
    @media (max-width: 720px) {
      font-size: 75%;
    }
  }

  body {
    background-color: ${theme.colors.neutral[80]};
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Poppins";
    text-decoration: none;
    font-family: "Poppins", sans-serif;
    list-style: none;

    --webkit-font-smoothing: antialiased;

    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }

    ::-webkit-scrollbar-track {
      background: #9da0a8;
      background-color: ${theme.colors.neutral[80]};
    }

    ::-webkit-scrollbar-thumb {
      background-color: ${theme.colors.neutral[0]};

      border-radius: 100px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background-color: ${theme.colors.neutral[20]};
    }
  }
`}

`;
