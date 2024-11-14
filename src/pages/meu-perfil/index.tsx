import type { GetServerSideProps } from "next";
import React from "react";

import { SEO } from "@atoms";
import { validateRoutePermission } from "@guards";
import { MyProfileTemplate } from "@templates";

const MyProfile = () => {
  return (
    <>
      <SEO title="Meu perfil" />
      <MyProfileTemplate />
    </>
  );
};

export default MyProfile;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const guardResult = await validateRoutePermission(ctx, {
    mustBeLogged: true,
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
