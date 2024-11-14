import { useRouter } from "next/router";
import { useState } from "react";
import { Controller, useForm, Resolver } from "react-hook-form";
import { toast } from "react-toastify";

import { FormErrorMessage, Input, Label, Reveal, Spinner } from "@atoms";
import { yupResolver } from "@hookform/resolvers/yup";
import { Footer, Header } from "@organisms";
import { useAuthenticationServices } from "@services";
import { useSession } from "@store";
import { formatEmail, ptbr, routes } from "@utils";

import * as S from "./styles";
import { IForm } from "./types";
import { schema } from "./utils";

export const LoginTemplate = () => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { signIn } = useAuthenticationServices();
  const { createSession, setIsLoggingIn } = useSession();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    resolver: yupResolver(schema) as Resolver<IForm>,
  });

  const onSubmit = async ({ email: dirtyEmail, password }: IForm) => {
    setIsLoading(true);

    const email = formatEmail(dirtyEmail);

    try {
      setIsLoggingIn(true);
      const response = await signIn({ email, password });
      createSession(response);
      toast.success("Login efetuado com sucesso!");

      await router.replace("/");
    } catch (err) {
      setIsLoading(false);

      const errorMessage = ptbr.errors.authentication.signIn(err as string);

      if (!errorMessage) {
        toast.error("Ocorreu um erro ao tentar entrar.");
        return;
      }

      toast.warn(errorMessage);
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <>
      <Header />

      <S.Container data-cy="signin">
        <Reveal from="left" duration={0.5}>
          <S.Content>
            <h2>Entrar</h2>

            <S.Form onSubmit={handleSubmit(onSubmit)} noValidate>
              <S.FormRow>
                <S.InputContainer $isError={Boolean(errors.email?.message)}>
                  <Label htmlFor="email">
                    Email*
                    <Input data-cy="email" disabled={isLoading} id="email" placeholder="Insira o email" {...register("email")} />
                  </Label>
                  {errors.email?.message && <FormErrorMessage data-cy="email-error">{errors.email?.message}</FormErrorMessage>}
                </S.InputContainer>
              </S.FormRow>

              <S.FormRow>
                <S.InputContainer $isError={Boolean(errors.password?.message)}>
                  <Label htmlFor="password">
                    Senha*
                    <Controller
                      control={control}
                      name="password"
                      render={({ field: { value, onChange } }) => (
                        <Input
                          disabled={isLoading}
                          data-cy="password"
                          type={"password"}
                          id="password"
                          placeholder="Insira a senha"
                          onChange={onChange}
                          value={value}
                        />
                      )}
                    />
                  </Label>

                  {errors.password?.message && (
                    <FormErrorMessage data-cy="password-error">{errors.password?.message}</FormErrorMessage>
                  )}
                </S.InputContainer>
              </S.FormRow>

              <S.Submit type="submit" disabled={isLoading} data-cy="submit">
                {isLoading ? <Spinner /> : "Entrar"}
              </S.Submit>

              <S.ForgotPassword href={routes.authentication.forgotPassword}>Esqueceu a senha?</S.ForgotPassword>
            </S.Form>
          </S.Content>
        </Reveal>
      </S.Container>

      <Footer />
    </>
  );
};
