import { useRouter } from "next/router";
import { toast } from "react-toastify";

import { Reveal, Spinner } from "@atoms";
import { useStripeServices } from "@services";
import { useSession } from "@store";
import { ProgrammingIcon } from "@svg/amicos";
import { routes } from "@utils";

import * as S from "./styles";

type Props = {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
};

export const Introduction = ({ isLoading, setIsLoading }: Props) => {
  const { user } = useSession();
  const router = useRouter();
  const { createCustomer } = useStripeServices();

  const handleSignature = async () => {
    setIsLoading(true);

    if (!user) {
      await router.push(routes.authentication.register);
      return;
    }

    if (user.status === "Inativo") {
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
      <S.Content>
        <S.Introduction>
          <Reveal from="left" useInViewHook>
            <h1>Vanguard - Academy</h1>
            <h2>Deseja se tornar um mestre em tecnologia? com a assinatura Vanguard você terá acesso a todas as nossas aulas!</h2>

            <S.SignatureButton onClick={handleSignature} disabled={isLoading}>
              {isLoading && <Spinner size={30} />}
              {!isLoading && (
                <>
                  Assinar&nbsp;<span>Vanguard</span>
                </>
              )}
            </S.SignatureButton>
          </Reveal>
        </S.Introduction>

        {/* <Link href="https://storyset.com/illustration/programming/amico"> */}
        <Reveal from="right" useInViewHook>
          <S.IntroductionImage>
            <ProgrammingIcon />
          </S.IntroductionImage>
        </Reveal>
      </S.Content>
    </S.Container>
  );
};
