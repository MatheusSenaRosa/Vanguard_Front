import styled, { css } from "styled-components";

import { Skeleton as AtomSkeleton, Button, ResponsiveMain } from "@atoms";

export const Main = styled(ResponsiveMain)`
  width: 1040px;
  min-height: calc(100vh - 160px);

  padding: 80px 0;

  display: flex;
  justify-content: space-between;
  align-items: center;

  margin: 0 auto;
  overflow-x: hidden;

  @media (max-width: 960px) {
    justify-content: center;
  }

  @media (max-width: 400px) {
    width: 100%;
    max-width: none;
  }
`;

export const Skeleton = styled(AtomSkeleton)<{
  height?: number;
  width?: number;
}>`
  ${({ height, width }) => css`
    height: ${height || 40}px;

    width: ${width}px;

    border-radius: 5px;

    display: flex;
    align-items: center;
    justify-content: center;
  `}
`;

export const ReCAPTCHAContainer = styled.div`
  width: 300px;
  height: 75px;

  border-radius: 5px;

  overflow: hidden;
`;

export const Form = styled.form`
  width: 420px;

  margin: 0 50px;

  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 600px) {
    max-width: 360px;
  }

  @media (max-width: 400px) {
    max-width: 320px;
  }
`;

export const Title = styled.h2`
  ${({ theme }) => css`
    margin: 0 auto 5px auto;
    color: ${theme.colors.neutral[0]};
  `}
`;

export const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const InputContainer = styled.div<{
  $isError?: boolean;
}>`
  ${({ $isError }) => css`
    display: flex;
    flex-direction: column;
    gap: 5px;

    height: ${$isError ? "85px" : "65px"};

    transition: height 0.3s ease;

    input {
      width: 100%;
    }

    @media (max-width: 550px) {
      max-width: none;
      width: 100%;
    }
  `}
`;

export const Submit = styled(Button)`
  font-size: 1.4rem;
`;

export const Infos = styled.section`
  ${({ theme }) => css`
    width: 40%;

    > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;

      text-align: center;

      h2 {
        color: ${theme.colors.neutral[0]};
      }

      img {
        -webkit-user-drag: none;
        -khtml-user-drag: none;
        -moz-user-drag: none;
        -o-user-drag: none;

        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -o-user-select: none;
        user-select: none;
      }
    }

    @media (max-width: 960px) {
      display: none;
    }
  `}
`;

export const Logo = styled.div`
  ${({ theme }) => css`
    height: 200px;
    width: 200px;

    img {
      border-radius: 50%;
      box-shadow: 0px 0px 5px 0px ${theme.colors.neutral[0]};
      width: 100%;
      height: 100%;
    }
  `}
`;
