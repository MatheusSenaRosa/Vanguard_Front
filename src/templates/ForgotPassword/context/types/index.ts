export interface IForgotPasswordContext {
  email: string;
  currentStep: number;
  modal: {
    isOpen: boolean;
    hasReceivedCode: boolean;
  };
  onCloseModal: () => void;
  onFinishFirstStep: (email: string) => void;
  onFinishSecondStep: () => void;
  onGoBack: () => void;
}
