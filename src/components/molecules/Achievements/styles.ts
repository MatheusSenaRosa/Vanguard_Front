import styled, { css } from "styled-components";

import { Skeleton as AtomSkeleton } from "@atoms";

export const Container = styled.div`
  ${({ theme }) => css`
    > div {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    h4 {
      font-size: 16px;
      font-weight: 500;
      color: ${theme.colors.neutral[0]};
    }
  `}
`;

export const ListContainer = styled.div`
  position: relative;
`;

export const Skeleton = styled(AtomSkeleton)<{
  height: number;
  width?: number;
  $hasMargin?: boolean;
}>`
  ${({ height, width, $hasMargin }) => css`
    height: ${height}px;
    width: ${width ? `${width}px` : "auto"};

    border-radius: 5px;

    margin-bottom: ${$hasMargin ? "10px" : "0"};
  `}
`;

export const ContainerEmptyList = styled.ul<{
  height: number;
}>`
  ${({ theme, height }) => css`
    background-color: ${theme.colors.neutral[60]};
    height: ${height}px;
    border-radius: 5px;
    align-items: center;
    text-align: center;
    display: flex;
    justify-content: center;
  `}
`;

export const ListTechnologies = styled.ul<{
  height: number;
}>`
  ${({ theme, height }) => css`
    background-color: ${theme.colors.neutral[60]};

    height: ${height}px;
    border-radius: 5px;

    overflow: hidden;

    transition: height 0.3s ease;

    position: relative;

    display: grid;

    grid-template-columns: 3fr 3fr 3fr;

    @media (max-width: 1220px) {
      grid-template-columns: 2fr 2fr;
    }

    @media (max-width: 960px) {
      grid-template-columns: 3fr 3fr 3fr;
    }

    @media (max-width: 800px) {
      grid-template-columns: 2fr 2fr;
    }

    @media (max-width: 600px) {
      grid-template-columns: 1fr;
    }
  `}
`;

export const TechnologyName = styled.span<{ size: number }>`
  ${({ theme, size }) => css`
    position: absolute;

    width: ${`${size}px`};

    margin-left: ${`-${size}px`};
    margin-top: ${`${(size / 100) * 38}px`};

    text-align: center;

    color: ${theme.colors.neutral[0]};
  `}
`;

export const ListTrails = styled.ul<{ height: number }>`
  ${({ theme, height }) => css`
    background-color: ${theme.colors.neutral[60]};

    border-radius: 5px;
    padding: auto;

    height: ${height}px;

    overflow: hidden;

    transition: height 0.3s ease;

    position: relative;

    display: grid;

    grid-template-columns: 2fr 2fr;

    @media (max-width: 1220px) {
      grid-template-columns: 2fr 2fr;
    }

    @media (max-width: 800px) {
      grid-template-columns: 1fr;
    }
  `}
`;

export const Item = styled.li<{ size: number }>`
  ${({ size }) => css`
    width: ${`${size}px`};
    height: ${`${size}px`};

    margin: 0 auto;

    position: relative;

    svg {
      width: 100%;
      height: 100%;
    }
  `}
`;

export const TrailName = styled.span<{ size: number }>`
  ${({ theme, size }) => css`
    position: absolute;

    width: 100%;

    margin-left: ${`-${size}px`};
    margin-top: ${`${(size / 100) * 57.5}px`};

    text-align: center;

    color: ${theme.colors.neutral[0]};
  `}
`;

export const Dropdown = styled.button`
  ${({ theme }) => css`
    display: flex;
    margin: 0 auto;

    cursor: pointer;

    position: absolute;
    bottom: -15px;
    right: calc(50% - ${30 / 2}px);

    background-color: ${theme.colors.neutral[40]};
    width: fit-content;

    border: none;
    border-radius: 50px;
    padding: 5px;

    svg {
      font-size: ${20}px;

      color: ${theme.colors.neutral[0]};
    }
  `}
`;
