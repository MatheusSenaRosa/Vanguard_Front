import { RiArrowRightDoubleLine } from "react-icons/ri";
import styled, { css } from "styled-components";

import { ResponsiveMain } from "@atoms";

export const Main = styled(ResponsiveMain)`
  width: 1120px;
  margin: 0 auto;

  padding: 80px 0;
`;

export const Title = styled.h1`
  ${({ theme }) => css`
    color: ${theme.colors.neutral[0]};
  `}
`;

export const Description = styled.h4`
  ${({ theme }) => css`
    color: ${theme.colors.neutral[0]};

    span {
      font-size: 19px;
      color: ${theme.colors.primary.yellow};
    }
  `}
`;

export const Trails = styled.section`
  margin-top: 30px;
  display: flex;

  flex-direction: column;

  > ul {
    margin-top: 10px;

    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

export const TrailWrapper = styled.li`
  ${({ theme }) => css`
    color: ${theme.colors.neutral[0]};
    background-color: ${theme.colors.neutral[40]};
    border-radius: 5px;

    padding: 20px;

    cursor: pointer;
    transition: 0.3s;

    &:hover {
      transform: scale(1.02);
    }
  `}
`;

export const TrailList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 20px;
`;

export const TrailTitle = styled.h3`
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;

  font-size: 19px;

  gap: 10px;
`;

export const TrailItem = styled.li`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;

    position: relative;
    margin-bottom: 10px;

    width: 130px;
    height: 90px;

    &:last-child {
      color: ${theme.colors.secondary.yellow};

      ${StyledGoArrowRight} {
        display: none;
      }
    }
  `}
`;

export const StyledGoArrowRight = styled(RiArrowRightDoubleLine)`
  ${({ theme }) => css`
    position: absolute;
    right: -20px;

    font-size: 20px;
    color: ${theme.colors.secondary.yellow};
  `}
`;

export const Technologies = styled.section`
  display: flex;
  flex-direction: column;

  margin-top: 60px;
`;

export const TechnologiesWrapper = styled.div`
  ${({ theme }) => css`
    color: ${theme.colors.neutral[0]};
    border-radius: 5px;

    padding: 0 20px;
    margin-top: 10px;
  `}
`;

export const TechnologiesList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 20px;
`;

export const TechnologieItem = styled.li`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;

    position: relative;

    width: 130px;
    height: 90px;

    cursor: pointer;
    transition: 0.3s;
    border-radius: 5px;

    &:hover {
      background-color: ${theme.colors.neutral[40]};
    }
  `}
`;
