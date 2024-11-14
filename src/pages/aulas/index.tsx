import { GetServerSideProps } from "next";

import { SEO } from "@atoms";
import { validateRoutePermission } from "@guards";
import { ClassesTemplate } from "@templates";

const Classes = () => {
  return (
    <>
      <SEO title="Aulas" />
      <ClassesTemplate />
    </>
  );
};

export default Classes;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const guardResult = await validateRoutePermission(ctx, {
    mustBeLogged: true,
  });

  if (!guardResult.hasPermission) {
    return {
      props: {},
      redirect: {
        destination: guardResult.redirect,
      },
    };
  }

  return {
    props: {},
  };
};
