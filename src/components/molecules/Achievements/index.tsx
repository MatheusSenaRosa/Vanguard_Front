import { useCallback, useEffect, useState } from "react";
import { FiChevronsDown, FiChevronsUp } from "react-icons/fi";

import { Reveal } from "@atoms";
import { MedalIcon, MedalVIcon } from "@svg/medals";

import * as S from "./styles";

type Props = {
  title: string;
  achievements: string[];
  isLoading?: boolean;
  type: "technologies" | "trails";
};

const medalSize = 150;
const medalVSize = 200;

export const Achievements = ({ title, achievements, type, isLoading }: Props) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const [maxItemsBeforeShowDropdown, setMaxItemsBeforeShowDropdown] = useState(1);

  const getListHeight = () => {
    if (type === "technologies") {
      if (isDropDownOpen) {
        const height = Math.ceil(achievements.length / maxItemsBeforeShowDropdown) * medalSize;

        return height;
      }
      return medalSize;
    }

    if (isDropDownOpen) {
      const height = Math.ceil(achievements.length / maxItemsBeforeShowDropdown) * medalVSize;

      return height;
    }

    return medalVSize;
  };

  const onResize = useCallback(() => {
    if (window.innerWidth > 1220) {
      setMaxItemsBeforeShowDropdown(type === "technologies" ? 3 : 2);
      return;
    }

    if (window.innerWidth < 1220 && window.innerWidth > 960) {
      setMaxItemsBeforeShowDropdown(2);
      return;
    }

    if (window.innerWidth < 960 && window.innerWidth > 800) {
      setMaxItemsBeforeShowDropdown(type === "technologies" ? 3 : 2);
      return;
    }

    if (window.innerWidth < 800 && window.innerWidth > 600) {
      setMaxItemsBeforeShowDropdown(type === "technologies" ? 2 : 1);
      return;
    }

    setMaxItemsBeforeShowDropdown(1);
  }, [type]);

  useEffect(() => {
    if (isMounted) {
      onResize();
    }
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [isMounted, onResize]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (isLoading) {
    return (
      <S.Container>
        <S.Skeleton $hasMargin height={25} width={150} />

        <S.ListContainer>
          <S.Skeleton height={getListHeight()} />
        </S.ListContainer>
      </S.Container>
    );
  }

  if (!achievements.length) {
    switch (type) {
      case "technologies":
        return <S.ContainerEmptyList height={medalSize}>Suas técnologias serão exibidas aqui!</S.ContainerEmptyList>;

      case "trails":
        return <S.ContainerEmptyList height={medalVSize}>Suas trilhas serao exibidas aqui!</S.ContainerEmptyList>;

      default:
        return null;
    }
  }

  return (
    <S.Container>
      <Reveal from="top" duration={0.5}>
        <h4>{title}</h4>

        <S.ListContainer>
          {type === "technologies" && (
            <S.ListTechnologies height={getListHeight()}>
              {achievements.map((item, key) => (
                <S.Item size={medalSize} key={key}>
                  <MedalIcon />
                  <S.TechnologyName size={medalSize}>{item}</S.TechnologyName>
                </S.Item>
              ))}
            </S.ListTechnologies>
          )}

          {type === "trails" && (
            <S.ListTrails height={getListHeight()}>
              {achievements.map((item, key) => (
                <S.Item size={medalVSize} key={key}>
                  <MedalVIcon />
                  <S.TrailName size={medalVSize}>{item}</S.TrailName>
                </S.Item>
              ))}
            </S.ListTrails>
          )}

          {!isDropDownOpen && achievements.length > maxItemsBeforeShowDropdown ? (
            <S.Dropdown onClick={() => setIsDropDownOpen(true)} title="Expandir">
              <FiChevronsDown />
            </S.Dropdown>
          ) : null}

          {isDropDownOpen && (
            <S.Dropdown onClick={() => setIsDropDownOpen(false)} title="Retrair">
              <FiChevronsUp />
            </S.Dropdown>
          )}
        </S.ListContainer>
      </Reveal>
    </S.Container>
  );
};
