import { GetServerSideProps } from "next";

import { SEO } from "@atoms";
import { validateRoutePermission } from "@guards";
import { LoginTemplate } from "@templates";

const Login = () => {
  return (
    <>
      <SEO title="Entrar" />

      <LoginTemplate />
    </>
  );
};

export default Login;

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
