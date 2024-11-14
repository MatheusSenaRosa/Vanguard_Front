import { useRouter } from "next/router";
import { toast } from "react-toastify";

import { Reveal, Spinner } from "@atoms";
import { useStripeServices } from "@services";
import { useSession } from "@store";
import { formatToReal, routes } from "@utils";

import { ISignature } from "../../types";
import * as S from "./styles";

type Props = {
  signatures: ISignature[];
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
};

export const Signatures = ({ signatures, isLoading, setIsLoading }: Props) => {
  const { user } = useSession();
  const { createCustomer } = useStripeServices();
  const router = useRouter();

  const handleSignature = async () => {
    setIsLoading(true);

    if (!user) {
      await router.push(routes.authentication.register);
      return;
    }

    if (user.status === "Inativo") {
      toast.warn("Ative sua conta para assinar a Vanguard.");
      await router.push(routes.activateAccount);
      setIsLoading(false);

      return;
    }

    try {
      await createCustomer();
    } catch {
      toast.error("Ocorreu um erro ao tentar acessar assinatura.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <S.Container>
      <Reveal from="top" useInViewHook>
        <S.Content>
          <h1>Comece hoje mesmo!</h1>
          <S.Signatures>
            {signatures.map((signature, key) => (
              <S.Signatures key={key}>
                <h3>Assinatura por {signature.signatureTime}</h3>
                <div>{formatToReal(signature.price)}</div>

                <S.Button onClick={handleSignature} disabled={isLoading}>
                  {isLoading && <Spinner />}
                  {!isLoading && "Assinar"}
                </S.Button>
              </S.Signatures>
            ))}
          </S.Signatures>
        </S.Content>
      </Reveal>
    </S.Container>
  );
};
