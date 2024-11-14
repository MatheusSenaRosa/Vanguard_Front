import { useRouter } from "next/router";
import { ArrowClockwise, SmileySad } from "phosphor-react";

import * as S from "./styles";

type Props = {
  refetch?: () => void;
};

export const FetchError = ({ refetch }: Props) => {
  const router = useRouter();

  return (
    <S.Container>
      <SmileySad size={50} />

      <S.Title>Ops! Algo deu errado...</S.Title>

      <S.Description>
        Por favor, tente novamente mais tarde.
        <br /> Desculpe pelo inconveniente!
      </S.Description>

      <S.Button onClick={refetch || router.reload}>
        <ArrowClockwise />
        {refetch && "Tentar novamente"}
        {!refetch && "Recarregar página"}
      </S.Button>
    </S.Container>
  );
};
