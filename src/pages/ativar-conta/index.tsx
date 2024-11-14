import { GetServerSideProps } from "next";
import { ActivateAccountTemplate } from "src/templates/ActivateAccount";

import { SEO } from "@atoms";
import { validateRoutePermission } from "@guards";

const ActivationAccount = () => {
  return (
    <>
      <SEO title="Ativar conta" />
      <ActivateAccountTemplate />
    </>
  );
};

export default ActivationAccount;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const guardResult = await validateRoutePermission(ctx, {
    mustBeLogged: true,
    mustBeUnactive: true,
  });

  if (!guardResult.hasPermission)
    return {
      props: {},
      redirect: { destination: guardResult.redirect },
    };

  return {
    props: {},
  };
};
