import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { toast } from "react-toastify";

import { Portal, Spinner } from "@atoms";
import { useAuthenticationServices } from "@services";
import { MailIcon } from "@svg/general";

import * as S from "./styles";

type Props = {
  isOpen: boolean;
  email: string;
  onClose: () => void;
};

export const Modal = ({ isOpen, email, onClose }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const { forgotPassword } = useAuthenticationServices();

  const handleResendEmail = async () => {
    setIsLoading(true);

    try {
      await forgotPassword(email);

      toast.success("Email reenviado com sucesso!");
    } catch {
      toast.error("Ocorreu um erro ao tentar reenviar o email.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Portal>
      <AnimatePresence>
        {isOpen && (
          <S.Container>
            <S.Wrapper
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.3 }}
            >
              <S.Icon>
                <MailIcon />
              </S.Icon>
              <S.Title>Verifique seu email</S.Title>
              <S.Description>O código para alteração de senha foi enviado para o endereço {email}.</S.Description>

              {isLoading && (
                <>
                  <S.Button type="button" onClick={onClose} disabled={isLoading}>
                    Recebi o email
                  </S.Button>

                  <S.ResendingContainer>
                    <Spinner />
                    <p>Reenviando email...</p>
                  </S.ResendingContainer>
                </>
              )}

              {!isLoading && (
                <>
                  <S.Button data-cy="submit-modal" type="button" onClick={onClose}>
                    Recebi o email
                  </S.Button>

                  <S.Description>
                    <button type="button" onClick={handleResendEmail}>
                      Clique aqui
                    </button>{" "}
                    para reenviar o email caso não o tenha recebido.
                  </S.Description>
                </>
              )}
            </S.Wrapper>
          </S.Container>
        )}
      </AnimatePresence>
    </Portal>
  );
};
