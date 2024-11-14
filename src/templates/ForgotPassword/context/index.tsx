import { useRouter } from "next/router";
import { createContext, useContext, useState } from "react";

import { routes } from "@utils";

import { IForgotPasswordContext } from "./types";

const ForgotPasswordContext = createContext<IForgotPasswordContext>({} as IForgotPasswordContext);

type Props = {
  children: React.ReactNode;
};

export const ForgotPasswordProvider = ({ children }: Props) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");

  const [modal, setModal] = useState({
    isOpen: false,
    hasReceivedCode: false,
  });

  const router = useRouter();

  const onGoBack = () => {
    if (step === 1) {
      router.replace(routes.authentication.login);
      return;
    }

    setEmail("");

    setModal({
      hasReceivedCode: false,
      isOpen: false,
    });
    setStep(1);
  };

  const onCloseModal = () => {
    setModal({
      isOpen: false,
      hasReceivedCode: true,
    });

    setStep(2);
  };

  const onFinishFirstStep = (email: string) => {
    setEmail(email);

    setModal({
      isOpen: true,
      hasReceivedCode: false,
    });
  };

  const onFinishSecondStep = () => {
    router.replace(routes.authentication.login);
  };

  return (
    <ForgotPasswordContext.Provider
      value={{
        email,
        modal,
        currentStep: step,
        onCloseModal,
        onFinishFirstStep,
        onFinishSecondStep,
        onGoBack,
      }}
    >
      {children}
    </ForgotPasswordContext.Provider>
  );
};

export const useForgotPasswordContext = () => useContext(ForgotPasswordContext);
