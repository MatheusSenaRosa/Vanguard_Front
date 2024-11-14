import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { MaskedInput, Portal, Spinner } from "@atoms";
import { useAuthenticationServices } from "@services";
import { useSession } from "@store";
import { MailIcon } from "@svg/general";
import { ptbr } from "@utils";

import * as S from "./styles";
import { IForm } from "./types";

export const ActivateAccountTemplate = () => {
  const [isResending, setIsResending] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { control, handleSubmit, watch } = useForm<IForm>();
  const { user, activateAccount: activateSession } = useSession();
  const router = useRouter();
  const { resendActivationEmail, activateAccount } = useAuthenticationServices();

  const isSubmitDisabled = watch("token")?.includes("_") || !watch("token");

  const handleResendEmail = async () => {
    setIsResending(true);

    try {
      await resendActivationEmail();

      toast.success("Email reenviado com sucesso!");
    } catch (err) {
      const errorMessage = ptbr.errors.me.resendEmail(err as string);

      if (!errorMessage) {
        toast.error("Ocorreu um erro ao tentar reenviar o email.");
        return;
      }
      toast.warn(errorMessage);
    } finally {
      setIsResending(false);
    }
  };

  const onSubmit = async ({ token }: IForm) => {
    setIsSubmitting(true);

    try {
      await activateAccount(token);
      activateSession();

      toast.success("Conta ativada com sucesso!");

      await router.replace("/");
    } catch (error) {
      const errorMessage = ptbr.errors.me.activateAccount(error as string);

      if (!errorMessage) {
        toast.error("Ocorreu um erro ao tentar ativar a conta.");
        return;
      }
      toast.warn(errorMessage);
      setIsSubmitting(false);
    }
  };

  return (
    <Portal>
      <AnimatePresence>
        <S.Container data-cy="activate-account">
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

            <S.Description>Por favor, insira o código de ativação que foi enviado para {user?.email}.</S.Description>

            <S.Form onSubmit={handleSubmit(onSubmit)} noValidate>
              <>
                <Controller
                  control={control}
                  name="token"
                  render={({ field: { value, onChange } }) => (
                    <MaskedInput
                      disabled={isResending || isSubmitting}
                      mask="******"
                      placeholder="Código"
                      value={value}
                      onChange={(e) => {
                        if (!e?.target?.value) {
                          onChange(e);
                          return;
                        }

                        onChange(e.target.value.toLocaleUpperCase());
                      }}
                    />
                  )}
                />

                <S.Submit disabled={isSubmitDisabled || isSubmitting} type="submit">
                  {isSubmitting ? <Spinner /> : "Confirmar"}
                </S.Submit>
              </>
            </S.Form>

            {isResending && (
              <S.ResendingContainer>
                <Spinner />
                <p>Reenviando email...</p>
              </S.ResendingContainer>
            )}

            {!isResending && (
              <S.Description>
                <button type="button" disabled={isSubmitting} onClick={handleResendEmail}>
                  Clique aqui
                </button>{" "}
                para reenviar o email caso não o tenha recebido.
              </S.Description>
            )}
          </S.Wrapper>
        </S.Container>
      </AnimatePresence>
    </Portal>
  );
};
