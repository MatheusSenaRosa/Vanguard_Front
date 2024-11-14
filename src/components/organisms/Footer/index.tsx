import Link from "next/link";

import * as S from "./styles";

export const Footer = () => (
  <S.Container>
    <S.Content>
      <>
        <S.Vanguard>Vanguard - academy</S.Vanguard>

        <S.VanguardRights>
          Created by
          <Link target="_blank" href={"https://github.com/guideveloper00"}>
            GG&nbsp;
          </Link>
          and
          <Link target="_blank" href={"https://github.com/MatheusSenaRosa"}>
            MSR
          </Link>
        </S.VanguardRights>
      </>
    </S.Content>
  </S.Container>
);
