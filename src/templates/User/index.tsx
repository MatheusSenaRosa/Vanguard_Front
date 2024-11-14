import { ACHIEVEMENTS_MOCK } from "@mocks";
import { Achievements, ProfileCard } from "@molecules";
import { Header, Footer } from "@organisms";

import * as S from "./styles";
import { IMe } from "./types";

export type Props = {
  data: IMe;
};

export const UserTemplate = ({ data }: Props) => {
  return (
    <>
      <Header />

      <S.Main>
        <S.SectionUser>
          <ProfileCard data={data} readOnly />
        </S.SectionUser>

        <S.Section>
          <S.Subtitle>Conquistas</S.Subtitle>

          <S.AchievementsContent>
            <Achievements achievements={ACHIEVEMENTS_MOCK.technologies} title="Tecnologias completas" type="technologies" />

            <Achievements achievements={ACHIEVEMENTS_MOCK.trails} title="Trilhas completas" type="trails" />
          </S.AchievementsContent>
        </S.Section>
      </S.Main>

      <Footer />
    </>
  );
};
