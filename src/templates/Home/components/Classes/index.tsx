import Link from "next/link";
import { useMemo, useState } from "react";

import { Reveal } from "@atoms";

import { Card } from "./Card";
import * as S from "./styles";
import { ITrail } from "./types";
import { matchTrailsToIcons, truncateText } from "./utils";

type Props = {
  trails: ITrail[];
};

export const Classes = ({ trails }: Props) => {
  const [selectedTrail, setSelectedTrail] = useState(trails[0].id);

  const trailsWithIcons = useMemo(() => matchTrailsToIcons(trails), [trails]);

  return (
    <S.Container>
      <S.Content>
        <S.Title>Trilhas</S.Title>

        <S.CardArea>
          {trailsWithIcons.map((item, key) => (
            <Card key={key} trail={item} isSelected={selectedTrail === item.id} onClick={setSelectedTrail} />
          ))}
        </S.CardArea>

        <S.Introduction>
          {trailsWithIcons.map((item, key) => (
            <div key={key}>
              {item.id === selectedTrail && (
                <Reveal from="left" useInViewHook>
                  <S.TrailContent>
                    <div>{truncateText(item.description)}</div>
                    <Link href="/">{`Acessar trilha ${item.title}`}</Link>
                  </S.TrailContent>
                </Reveal>
              )}
            </div>
          ))}
        </S.Introduction>
      </S.Content>
    </S.Container>
  );
};
