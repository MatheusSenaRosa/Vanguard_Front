import { GetServerSideProps } from "next";
import React from "react";
import { Props, UserTemplate } from "src/templates/User";

import { SEO } from "@atoms";
import { useProfileServices } from "@services";

const User = ({ data }: Props) => {
  return (
    <>
      <SEO title={data?.name} />
      <UserTemplate data={{ ...data, createdAt: new Date(data.createdAt) }} />
    </>
  );
};

export default User;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { getUserById } = useProfileServices();
  const userId = ctx.params.id as string;

  try {
    const data = await getUserById(userId);

    return {
      props: {
        data,
      },
    };
  } catch (err) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
};
