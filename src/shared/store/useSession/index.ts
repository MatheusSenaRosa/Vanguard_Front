import Router from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { create } from "zustand";

import { useAuthenticationServices } from "@services";

import { IUseSession, IUser } from "./types";

export const useSession = create<IUseSession>((set) => {
  const { whoAmI } = useAuthenticationServices();

  return {
    user: undefined,
    isLoggingOut: false,
    isLoggingIn: false,
    setIsLoggingIn: (value: boolean) => {
      set({ isLoggingIn: value });
    },
    createSession: (apiResponse) => {
      setCookie(
        null,
        "@vanguard-session",
        JSON.stringify({
          status: apiResponse.status,
          accessToken: apiResponse.accessToken,
          refreshToken: apiResponse.refreshToken,
        })
      );

      const user: IUser = {
        id: apiResponse.id,
        name: apiResponse.name,
        status: apiResponse.status,
        email: apiResponse.email,
      };

      set({ user });
    },
    activateAccount: () => {
      const { ["@vanguard-session"]: storedSession } = parseCookies();

      const session = JSON.parse(storedSession);

      setCookie(
        null,
        "@vanguard-session",
        JSON.stringify({
          ...session,
          status: "Ativo",
        })
      );

      set((prev) => {
        const previousUserData = { ...prev.user } as IUser;

        return {
          user: { ...previousUserData, status: "Ativo" },
        };
      });
    },
    restoreSession: async () => {
      const { ["@vanguard-session"]: storedSession } = parseCookies();

      if (storedSession) {
        const me = await whoAmI(true);

        if (!me) {
          set({ user: null });
          return;
        }

        const user: IUser = {
          id: me.id,
          name: me.name,
          email: me.email,
          status: me.status,
        };

        set({ user });
        return;
      }

      set({ user: null });
    },
    destroySession: async () => {
      destroyCookie(null, "@vanguard-session");
      set({ isLoggingOut: true });
      await Router.push("/");

      set({ user: null, isLoggingOut: false });
    },
  };
});
