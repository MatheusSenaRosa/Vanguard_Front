import { GetServerSideProps } from "next";

import { SEO } from "@atoms";
import { validateRoutePermission } from "@guards";
import { ForgotPasswordTemplate } from "@templates";

const ForgotPassword = () => {
  return (
    <>
      <SEO title="Esqueci a senha" />

      <ForgotPasswordTemplate />
    </>
  );
};

export default ForgotPassword;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const hasPermission = await validateRoutePermission(ctx, {
    mustBeUnlogged: true,
  });

  if (!hasPermission.hasPermission)
    return {
      props: {},
      redirect: { destination: "/" },
    };

  return {
    props: {},
  };
};
