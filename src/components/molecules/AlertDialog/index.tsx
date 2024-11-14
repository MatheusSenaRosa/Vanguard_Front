import { Spinner } from "@atoms";
import { Modal } from "@molecules";

import * as S from "./styles";

type Props = {
  isOpen: boolean;
  isLoading: boolean;
  description: string;
  confirmationText: string;
  onClose: () => void;
  onConfirm: () => void;
};

export const AlertDialog = ({ isOpen, isLoading, description, confirmationText, onConfirm, onClose }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={isLoading ? () => {} : onClose}>
      <S.Container>
        <h3>{description}</h3>

        <S.Actions>
          <S.Button onClick={onClose} disabled={isLoading} $buttonTheme="cancel">
            Cancelar
          </S.Button>
          <S.Button disabled={isLoading} onClick={onConfirm} data-cy="submit-modal">
            {isLoading && <Spinner size={30} />}

            {!isLoading && confirmationText}
          </S.Button>
        </S.Actions>
      </S.Container>
    </Modal>
  );
};
