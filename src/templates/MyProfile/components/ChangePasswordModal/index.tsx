import { useEffect, useState } from "react";
import { Controller, useForm, Resolver } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";

import { FormErrorMessage, Input, Label, Spinner } from "@atoms";
import { yupResolver } from "@hookform/resolvers/yup";
import { Modal } from "@molecules";
import { useProfileServices } from "@services";
import { ptbr } from "@utils";

import * as S from "./styles";
import { IForm } from "./types";
import { schema } from "./utils";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const ChangePasswordModal = ({ isOpen, onClose }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    formState: { errors },
    control,
    handleSubmit,
    reset,
  } = useForm<IForm>({
    resolver: yupResolver(schema) as Resolver<IForm>,
  });

  const { changePassword } = useProfileServices();

  const onSubmit = async (data: IForm) => {
    setIsLoading(true);

    try {
      await changePassword(data);
      onClose();

      toast.success("Senha alterada com sucesso!");
    } catch (error) {
      const errorMessage = ptbr.errors.authentication.changePassword(error as string);

      if (!errorMessage) {
        toast.error("Ocorreu um erro ao tentar alterar a sua senha.");
        return;
      }
      toast.warn(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} canClose={!isLoading}>
      <S.Container>
        <S.Header>
          <h2>Alterar senha</h2>

          <S.CloseButton disabled={isLoading} onClick={onClose}>
            <AiOutlineClose />
          </S.CloseButton>
        </S.Header>
        <S.Form onSubmit={handleSubmit(onSubmit)} noValidate>
          <S.FormRow>
            <S.InputContainer $isError={Boolean(errors.currentPassword?.message)}>
              <Label htmlFor="currentPassword">
                Senha atual*
                <Controller
                  control={control}
                  name="currentPassword"
                  render={({ field: { value, onChange } }) => (
                    <Input
                      data-cy="currentPassword"
                      type={"password"}
                      id="currentPassword"
                      placeholder="Insira a senha"
                      onChange={onChange}
                      value={value}
                      disabled={isLoading}
                    />
                  )}
                />
              </Label>

              {errors.currentPassword?.message && (
                <FormErrorMessage data-cy="currentPassword-error">{errors.currentPassword?.message}</FormErrorMessage>
              )}
            </S.InputContainer>
          </S.FormRow>

          <S.FormRow>
            <S.InputContainer $isError={Boolean(errors.newPassword?.message)}>
              <Label htmlFor="newPassword">
                Nova senha*
                <Controller
                  control={control}
                  name="newPassword"
                  render={({ field: { value, onChange } }) => (
                    <Input
                      data-cy="newPassword"
                      type="password"
                      id="newPassword"
                      placeholder="Confirme a senha"
                      onChange={onChange}
                      value={value}
                      disabled={isLoading}
                    />
                  )}
                />
              </Label>

              {errors.newPassword?.message && (
                <FormErrorMessage data-cy="newPassword-error">{errors.newPassword?.message}</FormErrorMessage>
              )}
            </S.InputContainer>
          </S.FormRow>

          <S.FormRow>
            <S.InputContainer $isError={Boolean(errors.confirmationNewPassword?.message)}>
              <Label htmlFor="confirmationNewPassword">
                Confirme a nova senha*
                <Controller
                  control={control}
                  name="confirmationNewPassword"
                  render={({ field: { value, onChange } }) => (
                    <Input
                      data-cy="confirmationNewPassword"
                      type="password"
                      id="confirmationNewPassword"
                      placeholder="Confirme a nova senha"
                      onChange={onChange}
                      value={value}
                      disabled={isLoading}
                    />
                  )}
                />
              </Label>

              {errors.confirmationNewPassword?.message && (
                <FormErrorMessage data-cy="confirmationNewPassword-error">
                  {errors.confirmationNewPassword?.message}
                </FormErrorMessage>
              )}
            </S.InputContainer>
          </S.FormRow>
          <S.Footer>
            <S.Button type="button" $buttonTheme="cancel" disabled={isLoading} onClick={onClose}>
              Cancelar
            </S.Button>
            <S.Button data-cy="submit" type="submit" disabled={isLoading}>
              {isLoading && <Spinner />}
              {!isLoading && "Alterar"}
            </S.Button>
          </S.Footer>
        </S.Form>
      </S.Container>
    </Modal>
  );
};
