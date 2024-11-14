import { GetServerSideProps } from "next";

import { SEO } from "@atoms";
import { validateRoutePermission } from "@guards";
import { RegisterTemplate } from "@templates";

const Register = () => {
  return (
    <>
      <SEO title="Criar conta" />

      <RegisterTemplate />
    </>
  );
};

export default Register;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const guardResult = await validateRoutePermission(ctx, {
    mustBeUnlogged: true,
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
