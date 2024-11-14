import { Reveal } from "@atoms";
import { CLASSES_MOCK } from "@mocks";
import { Footer, Header } from "@organisms";

import * as S from "./styles";

export const ClassesTemplate = () => {
  return (
    <>
      <Header />

      <S.Main>
        <Reveal from="left" duration={0.5}>
          <S.Title>Aulas</S.Title>

          <S.Trails>
            <S.Description>
              <span>Trilhas</span> - Para aqueles que buscam seguir o caminho de uma profissão
            </S.Description>

            <ul>
              {CLASSES_MOCK.trails.map(({ icon: TrailIcon, ...trail }) => (
                <S.TrailWrapper key={trail.title}>
                  <S.TrailTitle>
                    <TrailIcon />
                    <span>{trail.title}</span>
                  </S.TrailTitle>

                  <S.TrailList>
                    {trail.classes.map(({ icon: ClassIcon, ...classItem }) => (
                      <S.TrailItem key={classItem.title}>
                        <ClassIcon />
                        <span>{classItem.title}</span>
                        <S.StyledGoArrowRight />
                      </S.TrailItem>
                    ))}
                  </S.TrailList>
                </S.TrailWrapper>
              ))}
            </ul>
          </S.Trails>
        </Reveal>

        <Reveal from="left" duration={0.5} useInViewHook>
          <S.Technologies>
            <S.Description>
              <span>Tecnologias</span> - Para aqueles que já conhecem o caminho
            </S.Description>

            <S.TechnologiesWrapper>
              <S.TechnologiesList>
                {CLASSES_MOCK.technologies.map(({ icon: Icon, title }) => (
                  <S.TechnologieItem key={title}>
                    <Icon />
                    <span>{title}</span>
                  </S.TechnologieItem>
                ))}
              </S.TechnologiesList>
            </S.TechnologiesWrapper>
          </S.Technologies>
        </Reveal>
      </S.Main>

      <Footer />
    </>
  );
};
