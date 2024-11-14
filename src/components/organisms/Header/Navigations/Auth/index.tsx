import { useRouter } from "next/router";
import { useEffect } from "react";

import { useSession } from "@store";
import { routes } from "@utils";

import * as S from "./styles";

type Props = {
  isLogged: boolean;
};

export const AuthNavigation = ({ isLogged }: Props) => {
  const { push, pathname } = useRouter();
  const { destroySession } = useSession();

  const handleLogout = () => {
    const broadcastChannel = new BroadcastChannel("VanguardBroadcastChannel");
    broadcastChannel.postMessage("logout");
  };

  useEffect(() => {
    const broadcastChannel = new BroadcastChannel("VanguardBroadcastChannel");

    broadcastChannel.onmessage = (event) => {
      if (event.data === "logout") {
        destroySession();
      }
    };

    return () => {
      broadcastChannel.close();
    };
  }, [destroySession]);

  if (isLogged)
    return (
      <S.Container>
        <S.Button $isActive={pathname === routes.myProfile} onClick={() => push(routes.myProfile)}>
          Meu Perfil
        </S.Button>

        <S.Button onClick={handleLogout} $noBackground $buttonTheme="cancel">
          Sair
        </S.Button>
      </S.Container>
    );

  return (
    <S.Container>
      <S.Button $isActive={pathname === routes.authentication.login} onClick={() => push(routes.authentication.login)}>
        Entrar
      </S.Button>

      <S.Button $isActive={pathname === routes.authentication.register} onClick={() => push(routes.authentication.register)}>
        Criar conta
      </S.Button>
    </S.Container>
  );
};
