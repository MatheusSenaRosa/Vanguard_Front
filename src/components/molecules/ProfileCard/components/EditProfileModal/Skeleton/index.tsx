import { AiOutlineClose } from "react-icons/ai";

import { Label } from "@atoms";

import * as S from "../styles";

type Props = {
  isLocatedOutside: boolean;
  onClose: () => void;
};

export const Skeleton = ({ isLocatedOutside, onClose }: Props) => {
  return (
    <S.Container>
      <S.Header>
        <h2>Editar Perfil</h2>
        <S.CloseButton onClick={onClose}>
          <AiOutlineClose />
        </S.CloseButton>
      </S.Header>

      <S.Form>
        <S.FormRow>
          <S.InputContainer $isFullWidth>
            <Label>
              Nome completo*
              <S.Skeleton />
            </Label>
          </S.InputContainer>
        </S.FormRow>

        <S.FormRow>
          <S.InputContainer>
            <Label>
              Ocupação*
              <S.Skeleton />
            </Label>
          </S.InputContainer>

          <S.InputContainer>
            <Label>
              Gênero*
              <S.Skeleton />
            </Label>
          </S.InputContainer>
        </S.FormRow>

        <S.FormRow>
          <S.InputContainer>
            <Label>
              LinkedIn*
              <S.Skeleton />
            </Label>
          </S.InputContainer>

          <S.InputContainer>
            <Label>
              GitHub*
              <S.Skeleton />
            </Label>
          </S.InputContainer>
        </S.FormRow>

        <S.Skeleton height={26} width={180} />

        <S.FormRow>
          <S.InputContainer>
            <Label>
              País{isLocatedOutside && "*"}
              <S.Skeleton />
            </Label>
          </S.InputContainer>

          <S.InputContainer>
            <Label>
              Estado{!isLocatedOutside && "*"}
              <S.Skeleton />
            </Label>
          </S.InputContainer>

          <S.InputContainer>
            <Label>
              Cidade{!isLocatedOutside && "*"}
              <S.Skeleton />
            </Label>
          </S.InputContainer>
        </S.FormRow>

        <S.Footer>
          <S.ActionContainer>
            <S.Skeleton height={54} />
          </S.ActionContainer>

          <S.ActionContainer>
            <S.Skeleton height={54} />
          </S.ActionContainer>
        </S.Footer>
      </S.Form>
    </S.Container>
  );
};
