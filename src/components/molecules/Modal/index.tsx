import { AnimatePresence } from "framer-motion";

import { Portal } from "@atoms";

import * as S from "./styles";

type Props = {
  isOpen: boolean;
  children: React.ReactNode;
  canClose?: boolean;
  onClose: () => void;
};

export const Modal = ({ isOpen, children, canClose = true, onClose }: Props) => {
  return (
    <Portal>
      <AnimatePresence>
        {isOpen && (
          <S.Container>
            <S.Overlay
              data-cy="overlay"
              aria-hidden="true"
              onClick={canClose ? onClose : () => {}}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
            <S.Wrapper
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </S.Wrapper>
          </S.Container>
        )}
      </AnimatePresence>
    </Portal>
  );
};
