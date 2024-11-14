import Link from "next/link";

import { Reveal } from "@atoms";
import { MethodologyIcon } from "@svg/general";

import * as S from "./styles";

export const AboutUs = () => (
  <S.Container>
    <S.Content>
      <S.Title>
        Nossas trilhas foram pensadas para levar você do total zero ao nível&nbsp;
        <div>mestre.</div>
      </S.Title>

      <S.OurMethodology>
        <Reveal from="top" useInViewHook>
          <S.OurMethodologySubtitle>A escolha é sua</S.OurMethodologySubtitle>
        </Reveal>

        <S.MethodologyContent>
          <Reveal from="left" useInViewHook>
            <S.MethodologyText>
              As aulas são dividas em trilhas e em tecnologias, se não quiser seguir a trilha sinta-se livre para ir direto para a
              tecnologia que quiser aprender.
              <Link href="/aulas">Acessar aulas</Link>
            </S.MethodologyText>
          </Reveal>

          <Reveal from="right" useInViewHook>
            <MethodologyIcon alt="class" />
          </Reveal>
        </S.MethodologyContent>
      </S.OurMethodology>

      <S.Assemble>
        <Reveal from="top" useInViewHook>
          <S.AssembleSubtitle>Avance na tecnologia!</S.AssembleSubtitle>

          <S.AssembleText>
            Ao concluir uma tecnologia você poderá gerar o certificado de conclusão da tecnologia e ao atingir o nivel mestre de
            uma trilha, o certificado de conlusão dessa trilha virá com uma exclusiva medalha Vanguard!
          </S.AssembleText>
        </Reveal>

        <S.Medals>
          <Reveal from="left" useInViewHook>
            <S.ImageMasterMedal alt="medal" />
          </Reveal>

          <Reveal from="right" useInViewHook>
            <S.ImageVanguardMedal alt="medal" />
          </Reveal>
        </S.Medals>
      </S.Assemble>
    </S.Content>
  </S.Container>
);
