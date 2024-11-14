import { useState } from "react";
import { useQuery } from "react-query";

import { ACHIEVEMENTS_MOCK } from "@mocks";
import { FetchError, ProfileCard } from "@molecules";
import { Achievements } from "@molecules";
import { Header, Footer } from "@organisms";
import { useAuthenticationServices } from "@services";

import { ChangePasswordModal, ManageSignatureModal, Skeleton } from "./components";
import { OpenModal } from "./components/types";
import * as S from "./styles";

export const MyProfileTemplate = () => {
  const [openModal, setOpenModal] = useState<OpenModal>(null);

  const { whoAmI } = useAuthenticationServices();

  const {
    data: me,
    refetch,
    ...queryRest
  } = useQuery("MyProfile:Me", () => whoAmI(), {
    refetchOnWindowFocus: false,
  });

  const isLoading = queryRest.isLoading || queryRest.isRefetching;
  const isError = queryRest.isLoadingError || queryRest.isRefetchError || queryRest.isError;

  if (isError) {
    return (
      <>
        <Header />

        <S.Main isError>
          <FetchError refetch={refetch} />
        </S.Main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      {isLoading && <Skeleton />}

      {!isLoading && (
        <S.Main data-cy="my-profile">
          <S.SectionUser>
            <ProfileCard data={me} refetch={refetch} />
            <S.ProfileCard>
              <S.ProfileButton data-cy="changePassword-modal" onClick={() => setOpenModal("password")}>
                Alterar senha
              </S.ProfileButton>
              <S.ProfileButton onClick={() => setOpenModal("signature")}>Gerenciar assinatura</S.ProfileButton>
            </S.ProfileCard>
          </S.SectionUser>

          <S.Section>
            <S.Subtitle>Conquistas</S.Subtitle>

            <S.AchievementsContent>
              <Achievements achievements={ACHIEVEMENTS_MOCK.technologies} title="Tecnologias completas" type="technologies" />

              <Achievements achievements={ACHIEVEMENTS_MOCK.trails} title="Trilhas completas" type="trails" />
            </S.AchievementsContent>
          </S.Section>
        </S.Main>
      )}

      <Footer />

      <ChangePasswordModal isOpen={openModal === "password"} onClose={() => setOpenModal(null)} />

      <ManageSignatureModal isOpen={openModal === "signature"} onClose={() => setOpenModal(null)} />
    </>
  );
};
