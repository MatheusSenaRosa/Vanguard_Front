import { css } from "styled-components";
import { keyframes } from "styled-components";

export const fadeIn = keyframes`
${css`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`}
`;
