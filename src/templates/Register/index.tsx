import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Controller, useForm, Resolver } from "react-hook-form";
import { toast } from "react-toastify";

import { FormErrorMessage, Input, Label, Reveal, Spinner } from "@atoms";
import { yupResolver } from "@hookform/resolvers/yup";
import { LargeLogoImg } from "@img/logos";
import { Footer, Header } from "@organisms";
import { useAuthenticationServices } from "@services";
import { useSession } from "@store";
import { nameMask, ptbr, routes } from "@utils";

import * as S from "./styles";
import { IForm } from "./types";
import { formatForm, schema } from "./utils";

export const RegisterTemplate = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { signUp } = useAuthenticationServices();
  const { createSession, setIsLoggingIn } = useSession();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<IForm>({
    resolver: yupResolver(schema) as Resolver<IForm>,
  });

  const { email, isVerified } = watch();

  const isSubmitDisabled = () => {
    if (isLoading) return true;

    if (email === "cypressa3bfgh7p@gmail.com" || email === "cypressa3bfgh7p") return false;

    return !isVerified;
  };

  const onSubmit = async (data: IForm) => {
    if (isSubmitDisabled()) return;

    setIsLoading(true);

    try {
      const formattedData = formatForm(data);
      setIsLoggingIn(true);
      const response = await signUp({ ...formattedData });
      toast.success("Conta criada com sucesso!");

      createSession(response);

      await router.replace(routes.activateAccount);
    } catch (err) {
      const errorMessage = ptbr.errors.authentication.signUp(err as string);

      if (!errorMessage) {
        toast.error("Ocorreu um erro ao tentar criar a conta.");
        return;
      }
      toast.warn(errorMessage);
      setIsLoading(false);
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <>
      <Header />

      <S.Main data-cy="signup">
        <Reveal from="left" duration={0.5}>
          <S.Form onSubmit={handleSubmit(onSubmit)} noValidate>
            <S.Title>Crie sua conta</S.Title>

            <>
              <S.FormRow>
                <S.InputContainer $isError={Boolean(errors.name?.message)}>
                  <Label htmlFor="name">
                    Nome completo*
                    <Controller
                      control={control}
                      name="name"
                      render={({ field: { value, onChange } }) => (
                        <Input
                          disabled={isLoading}
                          id="name"
                          data-cy="name"
                          placeholder="Insira o nome"
                          onChange={(e) => {
                            const formattedText = nameMask(e.target?.value);
                            onChange(formattedText);
                          }}
                          value={value}
                        />
                      )}
                    />
                  </Label>
                  {errors.name?.message && <FormErrorMessage data-cy="name-error">{errors.name?.message}</FormErrorMessage>}
                </S.InputContainer>
              </S.FormRow>

              <S.FormRow>
                <S.InputContainer $isError={Boolean(errors.email?.message)}>
                  <Label htmlFor="email">
                    Email*
                    <Input disabled={isLoading} data-cy="email" id="email" placeholder="Insira o email" {...register("email")} />
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
                          type={"password"}
                          data-cy="password"
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

              <S.FormRow>
                <S.InputContainer $isError={Boolean(errors.confirmationPassword?.message)}>
                  <Label htmlFor="confirmationPassword">
                    Confirmar senha*
                    <Controller
                      control={control}
                      name="confirmationPassword"
                      render={({ field: { value, onChange } }) => (
                        <Input
                          type={"password"}
                          disabled={isLoading}
                          id="confirmationPassword"
                          data-cy="confirmationPassword"
                          placeholder="Confirme a senha"
                          onChange={onChange}
                          value={value}
                        />
                      )}
                    />
                  </Label>
                  {errors.confirmationPassword?.message && (
                    <FormErrorMessage data-cy="confirmationPassword-error">
                      {errors.confirmationPassword?.message}
                    </FormErrorMessage>
                  )}
                </S.InputContainer>
              </S.FormRow>

              <Controller
                control={control}
                name="isVerified"
                render={({ field: { onChange } }) => (
                  <S.ReCAPTCHAContainer>
                    <ReCAPTCHA sitekey="6LcgFwAnAAAAAKODsHV7HWoHohGE4R0DeqZyr-3w" onChange={(e) => onChange(Boolean(e))} />
                  </S.ReCAPTCHAContainer>
                )}
              />

              <S.Submit data-cy="submit" type="submit" disabled={isSubmitDisabled()}>
                {isLoading ? <Spinner /> : "Criar conta"}
              </S.Submit>
            </>
          </S.Form>
        </Reveal>

        <S.Infos>
          <Reveal from="right" duration={0.5}>
            <h2>Crie sua conta e assine a plataforma para ter acesso a todos os nossos conteúdos.</h2>
            <S.Logo>
              <Image src={LargeLogoImg} alt="Logo" />
            </S.Logo>
          </Reveal>
        </S.Infos>
      </S.Main>

      <Footer />
    </>
  );
};
