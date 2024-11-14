import * as S from "./styles";

type Props = {
  trail: {
    id: string;
    title: string;
    icon: string;
  };
  isSelected: boolean;
  onClick: (id: string) => void;
};

export const Card = ({ trail, isSelected, onClick }: Props) => {
  const { icon: Icon } = trail;
  return (
    <S.Container $isSelected={isSelected} onClick={() => onClick(trail.id)}>
      <S.Content>
        <S.Title>{trail.title}</S.Title>
        <S.Icon>
          <Icon />
        </S.Icon>
      </S.Content>
    </S.Container>
  );
};
