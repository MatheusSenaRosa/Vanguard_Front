import { useState } from "react";
import { useForm, Resolver } from "react-hook-form";
import { toast } from "react-toastify";

import { FormErrorMessage, Input, Label, Spinner } from "@atoms";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuthenticationServices } from "@services";
import { formatEmail, ptbr } from "@utils";

import { useForgotPasswordContext } from "../../context";
import * as S from "./styles";
import { IForm } from "./types";
import { schema } from "./utils";

export const FirstStep = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { onFinishFirstStep, onGoBack, modal } = useForgotPasswordContext();

  const { forgotPassword } = useAuthenticationServices();

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<IForm>({
    resolver: yupResolver(schema) as Resolver<IForm>,
  });

  const onSubmit = async ({ email: dirtyEmail }: IForm) => {
    setIsLoading(true);

    try {
      const email = formatEmail(dirtyEmail);
      await forgotPassword(email);

      toast.success("Email de recuperação enviado com sucesso!");

      onFinishFirstStep(email);
    } catch (err) {
      const errorMessage = ptbr.errors.authentication.forgotPassword(err as string);

      if (!errorMessage) {
        toast.error("Ocorreu um erro ao tentar recuperar a senha.");
        return;
      }

      toast.warn(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <S.Title>Recuperar senha</S.Title>
      <S.Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <S.FormRow>
          <S.InputContainer $isError={Boolean(errors.email?.message)}>
            <Label htmlFor="email">
              Email*
              <Input
                data-cy="email"
                disabled={isLoading || modal.isOpen}
                id="email"
                placeholder="Insira o email"
                {...register("email")}
              />
            </Label>
            {errors.email?.message && <FormErrorMessage data-cy="email-error">{errors.email?.message}</FormErrorMessage>}
          </S.InputContainer>
        </S.FormRow>

        <S.Submit data-cy="submit" disabled={isLoading || modal.isOpen} type="submit">
          {isLoading || modal.isOpen ? <Spinner /> : "Recuperar"}
        </S.Submit>

        <S.GoBack onClick={onGoBack} type="button">
          Voltar
        </S.GoBack>
      </S.Form>
    </>
  );
};
