import axios from "axios";
import { parseCookies, setCookie } from "nookies";
import { unstable_batchedUpdates } from "react-dom";
import { toast } from "react-toastify";

import { useAuthenticationServices } from "@services";
import { useSession } from "@store";

export const api = axios.create({
  baseURL: "http://localhost:3333/",
});

api.interceptors.request.use(async (config) => {
  const cookies = parseCookies();
  const hasSession = Object.keys(cookies).some((key) => key === "@vanguard-session");

  let accessToken = "";

  if (hasSession) {
    const storedSession = JSON.parse(cookies["@vanguard-session"]);
    accessToken = storedSession.accessToken;
  }

  if (config.headers) {
    config.headers["Content-Type"] = "application/json";
    config.headers["Accept"] = "application/json";

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { refreshToken } = useAuthenticationServices();
    const { destroySession } = useSession.getState();
    const storedSession = parseCookies();

    const hasSession = Object.keys(storedSession).includes("@vanguard-session");

    const isUnauthorized = hasSession && error?.response?.status === 401;

    const errorMessage = error?.response?.data?.message;

    if (isUnauthorized) {
      try {
        const session = JSON.parse(storedSession["@vanguard-session"]);

        const data = await refreshToken(session?.refreshToken);

        setCookie(
          null,
          "@vanguard-session",
          JSON.stringify({
            status: data.status,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          })
        );

        return api(error.config);
      } catch {
        unstable_batchedUpdates(() => {
          destroySession();
        });
        toast.warn("Sua sessão expirou. Faça login novamente.");
      }

      return Promise.reject(errorMessage);
    }
    return Promise.reject(errorMessage);
  }
);
