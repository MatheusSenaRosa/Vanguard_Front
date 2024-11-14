import { useRouter } from "next/router";
import { createRef, useState } from "react";

import { useClickOutside } from "@hooks";
import { useSession } from "@store";
import { routes } from "@utils";

import { IPage } from "../../types";
import * as S from "./styles";

type Props = {
  isLogged: boolean;
  pages: IPage[];
};

export const DropdownNavigation = ({ pages, isLogged }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const { destroySession } = useSession();
  const { push, pathname } = useRouter();

  const menuRef = createRef<HTMLDivElement>();

  useClickOutside(menuRef, () => {
    setIsOpen(false);
  });

  const onClickOption = (path: string) => {
    setIsOpen(false);
    push(path);
  };

  const getAuthButtons = () => {
    const buttons = [
      {
        name: "Entrar",
        buttonTheme: "default",
        onClick: () => onClickOption(routes.authentication.login),
      },
      {
        name: "Criar conta",
        buttonTheme: "default",
        onClick: () => onClickOption(routes.authentication.register),
      },
      {
        name: "Meu perfil",
        buttonTheme: "default",
        isActive: pathname === routes.myProfile,
        onClick: () => onClickOption(routes.myProfile),
      },
      {
        name: "Sair",
        buttonTheme: "cancel",
        onClick: destroySession,
      },
    ];

    if (isLogged) {
      buttons.splice(0, 2);

      return buttons;
    }

    buttons.splice(2, 2);
    return buttons;
  };

  return (
    <S.Container ref={menuRef}>
      <S.RootButton $isActive={isOpen} type="button" onClick={() => setIsOpen((prev) => !prev)}>
        Menu
      </S.RootButton>

      {isOpen && (
        <S.Content>
          {pages.map((page, key) => (
            <S.LinkItem key={key} $isActive={page.href === pathname ? 1 : 0} onClick={() => setIsOpen(false)} href={page.href}>
              {page.name}
            </S.LinkItem>
          ))}

          {getAuthButtons().map((item) => (
            <S.Button
              key={item.name}
              $buttonTheme={item.buttonTheme as "default" | "cancel"}
              $isActive={item?.isActive}
              onClick={item.onClick}
            >
              {item.name}
            </S.Button>
          ))}
        </S.Content>
      )}
    </S.Container>
  );
};
