import { useRouter } from "next/router";

import { IPage } from "../../types";
import * as S from "./styles";

type Props = {
  pages: IPage[];
};

export const MainNavigation = ({ pages }: Props) => {
  const { pathname } = useRouter();

  return (
    <S.MainNavbar>
      {pages.map((item, key) => (
        <S.NavLink
          $isActive={pathname === item.href || (item.href.includes("posts") && pathname.includes("posts")) ? 1 : 0}
          href={item.href}
          key={key}
        >
          {item.name}
          {item.icon}
        </S.NavLink>
      ))}
    </S.MainNavbar>
  );
};
