import { rgba } from "polished";
import styled, { css } from "styled-components";

import { Button as AtomButton } from "@atoms";

export const Container = styled.div`
  ${({ theme }) => css`
    border-radius: 5px;

    background-color: ${theme.colors.neutral[80]};
    color: ${theme.colors.neutral[0]};

    width: 100vw;
    max-width: 550px;

    display: flex;
    flex-direction: column;

    gap: 20px;

    padding: 30px;

    box-shadow: 10px 10px 5px 0px ${rgba(theme.colors.neutral[100], 0.75)};
  `}
`;

export const Button = styled(AtomButton)`
  font-size: 1.2rem;
  flex: 1;
`;

export const Actions = styled.div`
  display: flex;
  gap: 10px;
`;
