import { useState } from "react";
import { Controller, useForm, Resolver } from "react-hook-form";
import { toast } from "react-toastify";

import { FormErrorMessage, Input, Label, MaskedInput, Spinner } from "@atoms";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuthenticationServices } from "@services";
import { ptbr } from "@utils";

import { useForgotPasswordContext } from "../../context";
import * as S from "./styles";
import { IForm } from "./types";
import { schema } from "./utils";

export const SecondStep = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { email, onGoBack, onFinishSecondStep } = useForgotPasswordContext();

  const { resetPassword } = useAuthenticationServices();

  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<IForm>({
    resolver: yupResolver(schema) as Resolver<IForm>,
  });

  const onSubmit = async (data: IForm) => {
    setIsLoading(true);

    try {
      await resetPassword({
        token: data.token,
        newPassword: data.password,
        email,
      });

      toast.success("Senha alterada com sucesso!");

      await onFinishSecondStep();
    } catch (error) {
      const errorMessage = ptbr.errors.authentication.resetPassword(error as string);

      setIsLoading(false);

      if (!errorMessage) {
        toast.error("Ocorreu um erro ao tentar alterar a sua senha.");
        return;
      }
      toast.warn(errorMessage);
    }
  };

  return (
    <>
      <S.Title>Alterar senha</S.Title>

      <S.Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <S.FormRow>
          <S.InputContainer $isError={Boolean(errors.password?.message)}>
            <Label htmlFor="password">
              Nova senha*
              <Controller
                control={control}
                name="password"
                render={({ field: { value, onChange } }) => (
                  <Input
                    data-cy="password"
                    disabled={isLoading}
                    type={"password"}
                    id="password"
                    placeholder="Insira a senha"
                    onChange={onChange}
                    value={value}
                  />
                )}
              />
            </Label>

            {errors.password?.message && <FormErrorMessage data-cy="password-error">{errors.password?.message}</FormErrorMessage>}
          </S.InputContainer>
        </S.FormRow>

        <S.FormRow>
          <S.InputContainer $isError={Boolean(errors.confirmationPassword?.message)}>
            <Label htmlFor="confirmationPassword">
              Confirmar nova senha*
              <Controller
                control={control}
                name="confirmationPassword"
                render={({ field: { value, onChange } }) => (
                  <Input
                    type="password"
                    data-cy="confirmationPassword"
                    disabled={isLoading}
                    id="confirmationPassword"
                    placeholder="Confirme a senha"
                    onChange={onChange}
                    value={value}
                  />
                )}
              />
            </Label>

            {errors.confirmationPassword?.message && (
              <FormErrorMessage data-cy="confirmationPassword-error">{errors.confirmationPassword?.message}</FormErrorMessage>
            )}
          </S.InputContainer>
        </S.FormRow>

        <S.FormRow>
          <Label htmlFor="confirmationPassword">
            Código de alteração*
            <Controller
              control={control}
              name="token"
              render={({ field: { value, onChange } }) => (
                <MaskedInput
                  data-cy="token"
                  mask="******"
                  value={value}
                  disabled={isLoading}
                  onChange={(e) => {
                    const value = e?.target?.value;

                    onChange(value?.toLocaleUpperCase());
                  }}
                  placeholder="Insira o código de alteração"
                />
              )}
            />
          </Label>

          {errors.token?.message && <FormErrorMessage data-cy="token-error">{errors.token?.message}</FormErrorMessage>}
        </S.FormRow>

        <S.Submit data-cy="submit" type="submit" disabled={isLoading}>
          {isLoading ? <Spinner /> : "Alterar"}
        </S.Submit>

        <S.GoBack onClick={onGoBack} type="button">
          Voltar
        </S.GoBack>
      </S.Form>
    </>
  );
};
