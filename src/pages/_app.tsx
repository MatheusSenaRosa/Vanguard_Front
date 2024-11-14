import { AppProps } from "next/app";
import Link from "next/link";
import NextNProgress from "nextjs-progressbar";
import React, { useEffect } from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "styled-components";

import { linkResolver, repositoryName } from "@libs";
import { LogoutOverlay } from "@organisms";
import { PrismicPreview } from "@prismicio/next";
import { PrismicProvider } from "@prismicio/react";
import { useSession } from "@store";
import { GlobalStyles } from "@styles/global";
import { theme } from "@styles/theme";

import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { restoreSession, isLoggingOut } = useSession();

  useEffect(() => {
    restoreSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PrismicProvider
      linkResolver={linkResolver}
      internalLinkComponent={({ href, ...props }) => (
        <Link href={href}>
          <a {...props} />
        </Link>
      )}
    >
      <NextNProgress />
      <ThemeProvider theme={theme}>
        <PrismicPreview repositoryName={repositoryName}>
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
          </QueryClientProvider>
          {isLoggingOut && <LogoutOverlay />}
        </PrismicPreview>
        <GlobalStyles />
        <ToastContainer />
      </ThemeProvider>
    </PrismicProvider>
  );
};

export default MyApp;
