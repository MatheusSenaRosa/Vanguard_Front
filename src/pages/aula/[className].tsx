import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import { SEO } from "@atoms";
import { validateRoutePermission } from "@guards";
import { ClassTemplate } from "@templates";

const Classes = () => {
  const router = useRouter();
  const { className } = router.query;

  return (
    <>
      <SEO title="Aulas" />
      <ClassTemplate className={className} />
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
