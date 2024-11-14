import { GetServerSideProps } from "next";
import { Props } from "src/templates/Home";

import { SEO } from "@atoms";
import { getSignaturesMock } from "@mocks";
import { useStripeServices } from "@services";
import { HomeTemplate } from "@templates";

const Home = (props: Props) => {
  return (
    <>
      <SEO title="Home" />
      <HomeTemplate {...props} />
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { getSignature } = useStripeServices();

  try {
    const signature = await getSignature();
    const price = signature.unit_amount / 100;

    const SIGNATURES_MOCK = getSignaturesMock(price);

    return {
      props: {
        signatures: SIGNATURES_MOCK,
        isError: false,
      },
    };
  } catch {
    return {
      props: {
        isError: true,
      },
    };
  }
};
