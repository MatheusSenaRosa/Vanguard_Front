import Image from "next/image";
import styled, { css } from "styled-components";

import { Button, ResponsiveMain } from "@atoms";
import { fadeIn } from "@styles/animations";

export const Main = styled(ResponsiveMain)<{ isError?: boolean }>`
  ${({ isError }) => css`
    display: flex;
    gap: 50px;

    min-height: calc(100vh - 160px);

    margin: 0 auto;

    padding: 80px 0;

    ${isError &&
    css`
      align-items: center;
      justify-content: center;
    `}

    @media (min-width: 1221px) {
      max-width: 1120px;
    }

    @media (max-width: 960px) {
      flex-direction: column;
    }
  `}
`;

export const SectionUser = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;

  position: sticky;
  top: 160px;

  height: fit-content;

  animation: ${fadeIn} 0.5s;

  @media (max-width: 960px) {
    position: static;
  }

  h4 {
    font-size: 16px;
    font-weight: 500;
  }
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;

  width: 100%;

  h4 {
    font-size: 16px;
    font-weight: 500;
  }
`;

export const ProfileCard = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.neutral[60]};

    height: fit-content;
    width: 325px;

    text-align: center;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    padding: 25px;
    border-radius: 5px;

    h3,
    h4 {
      color: ${theme.colors.neutral[0]};
    }

    a {
      font-size: 20px;
      color: ${theme.colors.neutral[0]};
    }

    @media (max-width: 960px) {
      width: 100%;

      flex-direction: row;
      justify-content: space-evenly;

      position: relative;
    }

    @media (max-width: 600px) {
      width: 100%;

      flex-direction: column;
    }
  `}
`;

export const EditButton = styled.button`
  ${({ theme }) => css`
    position: absolute;
    right: 15px;
    top: 15px;

    cursor: pointer;
    border: none;
    background-color: transparent;

    svg {
      font-size: 20px;
      color: ${theme.colors.neutral[0]};
    }

    &:hover {
      svg {
        color: ${theme.colors.neutral[20]};
      }
    }
  `}
`;

export const ProfilePicture = styled(Image)`
  ${({ theme }) => css`
    margin-bottom: 10px;

    border: 2px solid ${theme.colors.primary.yellow};
    border-radius: 50%;

    user-select: none;

    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
  `}
`;

export const EmptyProfilePicture = styled.div`
  ${({ theme }) => css`
    width: 120px;
    height: 120px;

    margin-bottom: 10px;

    display: flex;
    align-items: center;
    justify-content: center;

    border: 2px solid ${theme.colors.primary.yellow};
    border-radius: 50%;

    overflow: hidden;

    svg {
      width: 100%;
      height: 100%;

      color: ${theme.colors.primary.yellow};
    }
  `}
`;

export const ProfileMedia = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;

    height: 25px;

    a {
      display: flex;
      color: ${theme.colors.primary.blue};

      transition-duration: 0.3s;

      &:hover {
        color: ${theme.colors.neutral[0]};
      }
    }
  `}
`;

export const ProfileButton = styled(Button)`
  width: 100%;
`;

export const Subtitle = styled.h2`
  ${({ theme }) => css`
    color: ${theme.colors.neutral[0]};
    margin-bottom: 20px;

    animation: ${fadeIn} 0.5s;
  `}
`;

export const AchievementsContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const PasswordButton = styled(Button)`
  width: 220px;
`;

export const RefundContainer = styled.div`
  display: flex;
  align-items: center;

  p {
    margin-left: 10px;
  }
`;

export const RefundButton = styled(Button)`
  width: 220px;
`;
