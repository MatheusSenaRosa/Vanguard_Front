import { useProgressiveImg } from "@hooks";
import { PrismicRichText } from "@prismicio/react";

import * as S from "./styles";
import { IImg } from "./types";

type Props = { text: string; img: IImg };

export const PrismicContent = ({ text, img }: Props) => {
  const [src, isSkeleton] = useProgressiveImg(img?.url);

  return (
    <div>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <PrismicRichText field={text as any} />
      {isSkeleton && img && <S.Skeleton width={img.dimensions.width} height={img.dimensions.height} />}
      {src && <S.Image src={src} alt={img.alt} />}
    </div>
  );
};
