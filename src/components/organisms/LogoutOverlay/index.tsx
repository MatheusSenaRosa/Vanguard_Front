import { Spinner } from "@atoms";

import * as S from "./styles";

export const LogoutOverlay = () => {
  return (
    <S.Container>
      <Spinner size={50} />
    </S.Container>
  );
};
