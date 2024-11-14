/* eslint-disable @next/next/no-img-element */
import React from "react";

import { PrismicContent } from "@molecules";
import { PrismicRichText } from "@prismicio/react";

import * as S from "./styles";

/**
 * @typedef {import("@prismicio/client").Content.HeroSliceSlice} HeroSliceSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<HeroSliceSlice>} HeroSliceProps
 * @param { HeroSliceProps }
 */
const HeroSlice = ({ slice }) => {
  return (
    <>
      <S.Title>
        {slice.primary.title ? <PrismicRichText field={slice.primary.title} /> : <div>Template slice, update me!</div>}
      </S.Title>

      <S.TextContent>
        {slice?.items?.map((item, i) => (
          <PrismicContent img={item.image?.url ? item.image : null} text={item.text} key={i} />
        ))}
      </S.TextContent>

      <style jsx>{`
        section {
          max-width: 600px;
          margin: 4em auto;
          text-align: center;
        }
        div {
          margin-top: 20px;
        }
      `}</style>
    </>
  );
};

export default HeroSlice;
