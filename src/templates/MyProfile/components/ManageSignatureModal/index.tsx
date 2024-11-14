import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { AlertDialog } from "src/components/molecules";

import { Modal } from "@molecules";

import * as S from "./styles";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const ManageSignatureModal = ({ isOpen, onClose }: Props) => {
  const [isModal, setIsModal] = useState(false);

  const cancelSignature = () => {};

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <S.Container>
        <S.Header>
          <h2>Gerenciar assinatura</h2>

          <S.CloseButton onClick={onClose}>
            <AiOutlineClose />
          </S.CloseButton>
        </S.Header>
        <S.Section>
          <S.InfosContainer>
            <span>
              Status:
              <br />
              <S.SignatureStatus $isActive={true}>Ativo</S.SignatureStatus>
            </span>
            <div>
              <span>
                Assinado em:
                <br /> 24/02/2023
              </span>
              <span>
                Expira em:
                <br /> 24/02/2024
              </span>
            </div>
          </S.InfosContainer>
          <S.ActionsContainer>
            <S.Button>Renovar assinatura</S.Button>
            <S.Button onClick={() => setIsModal(true)}>
              Reembolsar assinatura <span>(Reembolsável até o sétimo dia.)</span>
            </S.Button>
          </S.ActionsContainer>
        </S.Section>
      </S.Container>

      <AlertDialog
        isOpen={isModal}
        isLoading={false}
        description="Realmente deseja reembolsar sua assinatura?"
        confirmationText="Reembolsar"
        onClose={() => setIsModal(false)}
        onConfirm={cancelSignature}
      />
    </Modal>
  );
};
