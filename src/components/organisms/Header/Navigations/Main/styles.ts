import Link from "next/link";
import styled, { css } from "styled-components";

export const MainNavbar = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;

  height: 100%;

  margin-left: 155px;

  > a {
    display: flex;
    gap: 10px;

    svg {
      font-size: 18px;
    }
  }

  @media (max-width: 960px) {
    display: none;
  }
`;

export const NavLink = styled(Link)<{ $isActive?: number }>`
  ${({ theme, $isActive }) => css`
    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    height: 40px;

    color: ${$isActive ? theme.colors.primary.blue : theme.colors.neutral[0]};

    ${!$isActive &&
    css`
      border-radius: 5px;

      &:hover {
        color: ${theme.colors.neutral[20]};
      }
    `}
  `}
`;
