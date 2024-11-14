import * as S from "./styles";

type Props = {
  size?: number;
};

export const Spinner = ({ size }: Props) => {
  return (
    <S.Container>
      <S.Spinner size={size || 25} />
    </S.Container>
  );
};
