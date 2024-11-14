import { GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";

import { routes } from "@utils";

type Params = {
  mustBeLogged?: boolean;
  mustBeUnlogged?: boolean;
  mustBeUnactive?: boolean;
};

type Return = {
  hasPermission: boolean;
  redirect?: string;
};

type ValidateRoutePermission = (ctx: GetServerSidePropsContext, params: Params) => Promise<Return>;

export const validateRoutePermission: ValidateRoutePermission = async (ctx, params) => {
  const { ["@vanguard-session"]: storedCookies } = parseCookies(ctx);

  if (params?.mustBeUnlogged) {
    if (!storedCookies) {
      return {
        hasPermission: true,
      };
    }

    return {
      hasPermission: false,
      redirect: "/",
    };
  }

  if (params?.mustBeLogged) {
    if (storedCookies) {
      const session = JSON.parse(storedCookies);

      if (params?.mustBeUnactive) {
        if (session?.status === "Inativo")
          return {
            hasPermission: true,
          };

        return {
          hasPermission: false,
          redirect: "/",
        };
      }

      if (session?.status === "Ativo") {
        return {
          hasPermission: true,
        };
      }

      return {
        hasPermission: false,
        redirect: routes.activateAccount,
      };
    }

    return {
      hasPermission: false,
      redirect: routes.authentication.login,
    };
  }

  return {
    hasPermission: true,
  };
};
