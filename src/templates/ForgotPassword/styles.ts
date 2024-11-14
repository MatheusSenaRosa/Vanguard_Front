import styled from "styled-components";

export const Main = styled.main`
  min-height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  overflow-x: hidden;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  width: 80%;
  max-width: 420px;

  h2 {
    text-align: center;
    margin-bottom: 25px;
  }
`;
