import styled, { css } from "styled-components";

import { MedalVIcon, MedalIcon } from "@svg/medals";

export const Container = styled.div`
  display: flex;
  justify-content: center;

  margin-top: 150px;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  max-width: 1120px;

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

export const Title = styled.div`
  ${({ theme }) => css`
    font-size: 1.5rem;
    font-weight: bold;
    color: ${theme.colors.neutral[0]};

    div {
      color: ${theme.colors.secondary.yellow};
      display: inline-block;
    }
  `}
`;

export const OurMethodology = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 40px;
`;

export const OurMethodologySubtitle = styled.h3`
  ${({ theme }) => css`
    color: ${theme.colors.neutral[0]};
  `}
`;

export const MethodologyContent = styled.div`
  display: flex;
  justify-content: space-between;

  > div {
    display: flex;
    align-items: center;
    width: 50%;
  }

  > div:last-child {
    width: 20%;
  }
`;

export const MethodologyText = styled.p`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;

    color: ${theme.colors.neutral[0]};

    a {
      width: fit-content;
      color: ${theme.colors.primary.blue};

      &:hover {
        color: ${theme.colors.neutral[0]};
      }
    }
  `}
`;

export const Assemble = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  > div:first-child {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const AssembleSubtitle = styled.h3`
  ${({ theme }) => css`
    color: ${theme.colors.neutral[0]};

    margin-top: 40px;
  `}
`;

export const AssembleText = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.neutral[0]};
  `}
`;

export const Medals = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  > div {
    width: 50%;
  }
`;

export const ImageMasterMedal = styled(MedalIcon)`
  ${({ theme }) => css`
    fill: ${theme.colors.secondary.yellow};
    width: 100%;
  `}
`;
export const ImageVanguardMedal = styled(MedalVIcon)`
  fill: red;
  width: 100%;
`;
