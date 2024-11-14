import { useRouter } from "next/router";

import { Button } from "@atoms";
import { SadIcon2 } from "@svg/general";

import * as S from "./styles";

export const NotFoundTemplate = () => {
  const { back, replace } = useRouter();

  return (
    <S.Container data-cy="not-found">
      <SadIcon2 height="50px" width="50px" />
      <h3>Desculpe, mas essa página não foi encontrada.</h3>

      <div>
        <Button onClick={back}>Voltar à tela anterior</Button>
        <Button onClick={() => replace("/")}>Voltar à tela inicial</Button>
      </div>
    </S.Container>
  );
};
