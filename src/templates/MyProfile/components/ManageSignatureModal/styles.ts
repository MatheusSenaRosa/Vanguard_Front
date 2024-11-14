import { rgba } from "polished";
import styled, { css } from "styled-components";

import { Button as AtomicButton } from "@atoms";

export const Container = styled.div`
  ${({ theme }) => css`
    border-radius: 5px;

    background-color: ${theme.colors.neutral[80]};
    color: ${theme.colors.neutral[0]};

    width: 100vw;
    max-width: 550px;

    padding: 30px;

    display: flex;
    flex-direction: column;

    gap: 30px;

    box-shadow: 10px 10px 5px 0px ${rgba(theme.colors.neutral[100], 0.75)};
  `}
`;

export const Header = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;

    border-radius: 5px 5px 0 0;

    h2 {
      color: ${theme.colors.neutral[0]};
    }
  `}
`;

export const CloseButton = styled.button`
  ${({ theme }) => css`
    display: flex;

    background-color: transparent;
    border: none;

    cursor: pointer;

    svg {
      font-size: 25px;
      color: ${theme.colors.neutral[0]};

      transition-duration: 0.3s;
    }

    &:hover {
      svg {
        color: ${theme.colors.neutral[20]};
      }
    }
  `}
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const InfosContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    justify-content: space-between;
  }
`;

export const ActionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

export const Button = styled(AtomicButton)`
  display: flex;
  flex-direction: column;
  width: 50%;
  span {
    font-size: 0.8rem;
  }
`;

export const SignatureStatus = styled.span<{ $isActive?: boolean }>`
  ${({ theme, $isActive }) => css`
    color: ${$isActive ? theme.colors.primary.yellow : theme.colors.neutral[0]};
  `}
`;
