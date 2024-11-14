import { ChalkboardTeacher } from "phosphor-react";
import { useEffect, useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { RiPagesLine } from "react-icons/ri";

import { useSession } from "@store";

import { AuthNavigation, DropdownNavigation, MainNavigation } from "./Navigations";
import * as S from "./styles";

export const Header = () => {
  const [isAnimating, setIsAnimating] = useState(true);

  const { user, isLoggingIn } = useSession();

  const pages = [
    { name: "Home", href: "/", icon: <AiOutlineHome /> },
    { name: "Aulas", href: "/aulas", icon: <ChalkboardTeacher /> },
    { name: "Posts", href: "/posts", icon: <RiPagesLine /> },
  ];

  useEffect(() => {
    if (isLoggingIn) {
      setIsAnimating(true);
    }
  }, [isLoggingIn]);

  useEffect(() => {
    if ((user || user === null) && !isLoggingIn) {
      setIsAnimating(false);
    }
  }, [user, isAnimating, isLoggingIn]);

  if (isAnimating) return <S.Skeleton />;

  return (
    <S.Container>
      <S.Content>
        <S.Logo href="/">Vanguard</S.Logo>

        <MainNavigation pages={pages} />

        <AuthNavigation isLogged={Boolean(user)} />

        <DropdownNavigation pages={pages} isLogged={Boolean(user)} />
      </S.Content>
    </S.Container>
  );
};
