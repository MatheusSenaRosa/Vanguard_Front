import { useState } from "react";

import { TRAILS_MOCK } from "@mocks";
import { Footer, Header } from "@organisms";

import { AboutUs, Classes, ContactUs, Introduction, Signatures } from "./components";
import * as S from "./styles";
import { ISignature } from "./types";

export type Props = {
  signatures: ISignature[];
  isError: boolean;
};

export const HomeTemplate = ({ signatures, isError }: Props) => {
  const [isLoadingSignature, setIsLoadingSignature] = useState(false);

  const trails = TRAILS_MOCK;

  return (
    <>
      <Header />

      <S.Main data-cy="home">
        <Introduction isLoading={isLoadingSignature} setIsLoading={setIsLoadingSignature} />
        <Classes trails={trails} />

        <AboutUs />

        {!isError && <Signatures signatures={signatures} isLoading={isLoadingSignature} setIsLoading={setIsLoadingSignature} />}
        <ContactUs />
      </S.Main>
      <Footer />
    </>
  );
};
