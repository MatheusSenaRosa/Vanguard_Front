import styled from "styled-components";

export const ResponsiveMain = styled.main`
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
    max-width: 320px;
  }
`;
