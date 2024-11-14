import { motion } from "framer-motion";
import { rgba } from "polished";
import styled, { css } from "styled-components";

export const Container = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 30;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Overlay = styled(motion.div)`
  ${({ theme }) => css`
    background: ${rgba(theme.colors.neutral[100], 0.5)};

    width: 100%;
    height: 100%;

    position: absolute;
    top: 0;
    left: 0;
  `}
`;

export const Wrapper = styled(motion.div)`
  z-index: 1;

  max-height: 100%;
  overflow-y: auto;

  overflow-y: visible;
`;
