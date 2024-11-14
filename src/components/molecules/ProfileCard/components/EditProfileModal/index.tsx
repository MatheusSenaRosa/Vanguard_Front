import { useCallback, useEffect, useState } from "react";
import { useForm, Controller, Resolver } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

import { AutoCompleteSelect, FormErrorMessage, Input, Label, Select, Spinner } from "@atoms";
import { yupResolver } from "@hookform/resolvers/yup";
import { GENDERS_MOCK } from "@mocks";
import { Modal } from "@molecules";
import { useProfileServices } from "@services";
import { ptbr, nameMask } from "@utils";

import { IMe } from "../../types";
import { Skeleton } from "./Skeleton";
import * as S from "./styles";
import { ICities, IForm } from "./types";
import { schema } from "./utils";

type Props = {
  isOpen: boolean;
  me: IMe;
  onClose: () => void;
};

export const EditProfileModal = ({ isOpen, me, onClose }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetchingCities, setIsFetchingCities] = useState(false);
  const [cities, setCities] = useState<ICities>(null);

  const { updateProfile, getCitiesByStateId, getProfileModalData } = useProfileServices();

  const { data, ...queryRest } = useQuery("MyProfileUpdate", getProfileModalData, {
    refetchOnWindowFocus: false,
    enabled: isOpen,
  });

  const {
    control,
    register,
    handleSubmit,
    setValue,
    clearErrors,
    watch,
    reset,
    setError,
    formState: { errors },
  } = useForm<IForm>({
    resolver: yupResolver(schema) as Resolver<IForm>,
  });

  const isLocatedOutside = watch("isLocatedOutside");
  const stateId = watch("stateId");
  const isLoading = queryRest.isRefetching || queryRest.isLoading;
  const isError = queryRest.isError || queryRest.isRefetchError || queryRest.isLoadingError;

  const clearLocation = () => {
    setValue("stateId", null);
    setValue("cityId", null);
    setValue("countryId", null);
    clearErrors(["cityId", "countryId", "stateId"]);
  };

  const getCitiesBySelectedState = useCallback(async (stateId: number) => {
    try {
      setIsFetchingCities(true);

      const response = await getCitiesByStateId(stateId);

      setCities({
        stateId,
        cities: response.map((item) => ({
          value: item.id,
          description: item.nome,
        })),
      });
    } catch {
      toast.error("Ocorreu um erro ao tentar recuperar os dados");
    } finally {
      setIsFetchingCities(false);
    }

    //do not add getCities as dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fillForm = useCallback(async () => {
    const { localization } = me;

    if (localization.state?.id) {
      await getCitiesBySelectedState(localization.state?.id);
    }

    const countryId = localization.country?.description === "Brasil" ? null : localization.country?.id;

    setValue("name", nameMask(me.name));
    setValue("occupationId", me?.occupation?.id);
    setValue("gender", me.gender);
    setValue("linkedIn", me.linkedIn);
    setValue("gitHub", me.gitHub);
    setValue("countryId", countryId);
    setValue("stateId", localization.state?.id);
    setValue("cityId", localization.city?.id);

    if (!localization.country?.id) {
      setValue("isLocatedOutside", false);

      return;
    }
    setValue("isLocatedOutside", localization.country?.description !== "Brasil");

    // do not add getCitiesBySelectedState as a dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me, setValue]);

  const onSubmit = async (formData: IForm) => {
    const brasilId = data.countries.find((item) => item.description === "Brasil").value;

    if (formData.isLocatedOutside && formData.countryId === brasilId) {
      setValue("isLocatedOutside", false);
      setValue("countryId", null);

      setError("stateId", {
        message: "Campo obrigatório",
      });
      setError("cityId", {
        message: "Campo obrigatório",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await updateProfile({
        ...formData,
        gender: formData.gender,
        occupationId: formData.occupationId,
        countryId: formData.countryId || brasilId,
        cityId: formData.cityId || null,
        stateId: formData.stateId || null,
        gitHub: formData.gitHub || null,
        linkedIn: formData.linkedIn || null,
      });

      toast.success("Perfil atualizado com sucesso!");

      onClose();
    } catch (err) {
      const errorMessage = ptbr.errors.authentication.signUp(err as string);

      if (!errorMessage) {
        toast.error("Ocorreu um erro ao tentar atualizar os dados.");
        return;
      }
      toast.warn(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (isOpen && !isLoading && data) {
      fillForm();
    }
  }, [isOpen, fillForm, isLoading, data]);

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  useEffect(() => {
    if (isError) {
      toast.error("Ocorreu um erro ao tentar buscar os dados.");
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);

  return (
    <Modal isOpen={isOpen} canClose={!isSubmitting} onClose={onClose}>
      {isLoading && <Skeleton onClose={onClose} isLocatedOutside={isLocatedOutside} />}

      {!isLoading && (
        <S.Container data-cy="edit-profile-modal">
          <S.Header>
            <h2>Editar Perfil</h2>

            <S.CloseButton data-cy="close" onClick={onClose} disabled={isSubmitting}>
              <AiOutlineClose />
            </S.CloseButton>
          </S.Header>

          <S.Form onSubmit={handleSubmit(onSubmit)} noValidate>
            <S.FormRow>
              <S.InputContainer $isError={Boolean(errors.name?.message)} $isFullWidth>
                <Label htmlFor="name">
                  Nome completo*
                  <Controller
                    control={control}
                    name="name"
                    render={({ field: { value, onChange } }) => (
                      <Input
                        id="name"
                        data-cy="name"
                        disabled={isSubmitting}
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
              <S.InputContainer $isError={Boolean(errors.occupationId?.message)}>
                <Controller
                  control={control}
                  name="occupationId"
                  render={({ field: { value, onChange } }) => (
                    <Label htmlFor="occupation" data-cy="occupation">
                      Ocupação*
                      <Select
                        id="occupation"
                        options={data?.occupations || []}
                        disabled={isSubmitting}
                        placeholder="Selecione uma ocupação"
                        onChange={onChange}
                        value={value}
                      />
                    </Label>
                  )}
                />
                {errors.occupationId?.message && (
                  <FormErrorMessage data-cy="occupation-error">{errors.occupationId?.message}</FormErrorMessage>
                )}
              </S.InputContainer>

              <S.InputContainer $isError={Boolean(errors.gender?.message)}>
                <Controller
                  control={control}
                  name="gender"
                  render={({ field: { value, onChange } }) => (
                    <Label htmlFor="gender" data-cy="gender">
                      Gênero*
                      <Select
                        id="gender"
                        disabled={isSubmitting}
                        options={GENDERS_MOCK}
                        placeholder="Selecione um gênero"
                        onChange={onChange}
                        value={value}
                      />
                    </Label>
                  )}
                />
                {errors.gender?.message && <FormErrorMessage data-cy="gender-error">{errors.gender?.message}</FormErrorMessage>}
              </S.InputContainer>
            </S.FormRow>

            <S.FormRow>
              <S.InputContainer $isError={Boolean(errors.linkedIn?.message)}>
                <Label htmlFor="linkedIn">
                  LinkedIn
                  <Input
                    disabled={isSubmitting}
                    id="linkedIn"
                    data-cy="linkedin"
                    placeholder="Insira a URL do LinkedIn"
                    {...register("linkedIn")}
                  />
                </Label>
                {errors.linkedIn?.message && (
                  <FormErrorMessage data-cy="linkedin-error">{errors.linkedIn?.message}</FormErrorMessage>
                )}
              </S.InputContainer>

              <S.InputContainer $isError={Boolean(errors.gitHub?.message)}>
                <Label htmlFor="gitHub">
                  GitHub
                  <Input
                    disabled={isSubmitting}
                    id="gitHub"
                    data-cy="github"
                    placeholder="Insira a URL do GitHub"
                    {...register("gitHub")}
                  />
                </Label>
                {errors.gitHub?.message && <FormErrorMessage data-cy="github-error">{errors.gitHub?.message}</FormErrorMessage>}
              </S.InputContainer>
            </S.FormRow>

            <S.FormRow>
              <Controller
                control={control}
                name="isLocatedOutside"
                render={({ field: { value, onChange } }) => (
                  <Label data-cy="isLocatedOutside">
                    <S.Checkbox
                      type="checkbox"
                      checked={value}
                      disabled={isSubmitting}
                      onChange={(e) => {
                        clearLocation();
                        onChange(e);
                      }}
                    />
                    Moro fora do Brasil
                  </Label>
                )}
              />
            </S.FormRow>

            <S.FormRow>
              <S.InputContainer $isError={Boolean(errors.countryId?.message)}>
                <Controller
                  control={control}
                  name="countryId"
                  render={({ field: { value, onChange } }) => (
                    <Label htmlFor="country" data-cy="country">
                      País{isLocatedOutside && "*"}
                      <AutoCompleteSelect
                        id="country"
                        options={data?.countries || []}
                        disabled={!isLocatedOutside || isSubmitting}
                        placeholder="Selecione o país"
                        value={value}
                        onChange={onChange}
                      />
                    </Label>
                  )}
                />
                {errors.countryId?.message && (
                  <FormErrorMessage data-cy="country-error">{errors.countryId?.message}</FormErrorMessage>
                )}
              </S.InputContainer>

              <S.InputContainer $isError={Boolean(errors.stateId?.message)}>
                <Controller
                  control={control}
                  name="stateId"
                  render={({ field: { onChange, value } }) => (
                    <Label htmlFor="stateId" data-cy="state">
                      Estado{!isLocatedOutside && "*"}
                      <AutoCompleteSelect
                        id="state"
                        placeholder="Selecione o estado"
                        disabled={isLocatedOutside || isSubmitting}
                        options={data?.states || []}
                        value={value}
                        onChange={(newValue) => {
                          onChange(newValue);
                          setValue("cityId", null);

                          if (newValue) {
                            getCitiesBySelectedState(newValue as number);
                          }
                        }}
                      />
                    </Label>
                  )}
                />
                {errors.stateId?.message && <FormErrorMessage data-cy="state-error">{errors.stateId?.message}</FormErrorMessage>}
              </S.InputContainer>

              <S.InputContainer $isError={Boolean(errors.cityId?.message)}>
                {isFetchingCities && (
                  <S.InputContainer>
                    <Label>
                      Cidade{!isLocatedOutside && "*"}
                      <S.Skeleton />
                    </Label>
                  </S.InputContainer>
                )}

                {!isFetchingCities && (
                  <Controller
                    control={control}
                    name="cityId"
                    render={({ field: { value, onChange } }) => (
                      <Label htmlFor="cityId" data-cy="city">
                        Cidade{!isLocatedOutside && "*"}
                        <AutoCompleteSelect
                          id="city"
                          placeholder="Selecione a cidade"
                          onChange={onChange}
                          options={cities?.cities || []}
                          value={value}
                          disabled={isLocatedOutside || !stateId}
                        />
                      </Label>
                    )}
                  />
                )}

                {errors.cityId?.message && <FormErrorMessage data-cy="city-error">{errors.cityId?.message}</FormErrorMessage>}
              </S.InputContainer>
            </S.FormRow>

            <S.Footer>
              <S.Button type="button" disabled={isSubmitting} $buttonTheme="cancel" onClick={onClose}>
                Cancelar
              </S.Button>

              <S.Button data-cy="submit" type="submit" disabled={isSubmitting}>
                {isSubmitting ? <Spinner /> : "Salvar"}
              </S.Button>
            </S.Footer>
          </S.Form>
        </S.Container>
      )}
    </Modal>
  );
};
