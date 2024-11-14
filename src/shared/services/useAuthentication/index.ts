import axios from "axios";

import { api } from "../config";
import { IUseAuthentication } from "./types";

export const useAuthenticationServices = (): IUseAuthentication => {
  return {
    whoAmI: async (ignoreCatch?: boolean) => {
      if (ignoreCatch) {
        const response = await api.get("/me");

        if (!response?.data) return response?.data;

        return { ...response.data, createdAt: new Date(response.data.createdAt) };
      }

      try {
        const response = await api.get("/me");
        return { ...response.data, createdAt: new Date(response.data.createdAt) };
      } catch {
        throw new Error();
      }
    },
    resendActivationEmail: async () => {
      await api.post("/me/activation/resend-email");
    },
    signIn: async (body) => {
      const { data } = await api.post("/auth/signin", body);

      return data;
    },
    signUp: async (body) => {
      const { data } = await api.post("/auth/signup", body);

      return data;
    },
    refreshToken: async (refreshToken) => {
      const { data } = await axios.post("http://localhost:3333/auth/refresh-token", null, {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      });

      return data;
    },
    forgotPassword: async (email: string) => {
      await api.post("/auth/forgot-password", { email });
    },
    resetPassword: async (body) => {
      await api.put("/auth/reset-password", body);
    },
    activateAccount: async (token: string) => {
      await api.post(`/me/activation/${token}`);
    },
  };
};
