import { Reveal } from "@atoms";

import { Modal } from "./components";
import { ForgotPasswordProvider, useForgotPasswordContext } from "./context";
import { FirstStep, SecondStep } from "./steps";
import * as S from "./styles";

const ForgotPasswordElement = () => {
  const { currentStep, modal, email, onCloseModal } = useForgotPasswordContext();

  return (
    <>
      <S.Main data-cy="forgot-password">
        {currentStep === 1 && (
          <S.Content>
            <Reveal from="left" duration={0.5}>
              <FirstStep />
            </Reveal>
          </S.Content>
        )}

        {currentStep === 2 && (
          <S.Content>
            <Reveal from="left" duration={0.5}>
              <SecondStep />
            </Reveal>
          </S.Content>
        )}
      </S.Main>

      <Modal isOpen={modal.isOpen} email={email} onClose={onCloseModal} />
    </>
  );
};

export const ForgotPasswordTemplate = () => (
  <ForgotPasswordProvider>
    <ForgotPasswordElement />
  </ForgotPasswordProvider>
);
