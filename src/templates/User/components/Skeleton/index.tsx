import { Achievements } from "@molecules";

import { AchievementsContent, Main, SectionUser, Section } from "../../styles";
import * as S from "./styles";

export const Skeleton = () => {
  return (
    <Main data-cy="my-profile">
      <SectionUser>
        <S.ProfileCardSkeleton height={320} />
      </SectionUser>

      <Section>
        <S.Skeleton width={150} height={35} $marginBottom={20} />

        <AchievementsContent>
          <Achievements isLoading achievements={[]} title="Tecnologias completas" type="technologies" />

          <Achievements isLoading achievements={[]} title="Trilhas completas" type="trails" />
        </AchievementsContent>
      </Section>
    </Main>
  );
};
