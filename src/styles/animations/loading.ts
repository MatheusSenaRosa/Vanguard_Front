import { css, keyframes } from "styled-components";

export const skeleton = keyframes`
${css`
  from {
    opacity: 0.5;
  }

  50% {
    opacity: 1;
  }

  to {
    opacity: 0.5;
  }
`}
`;

export const spin = keyframes`
${css`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`}

`;
