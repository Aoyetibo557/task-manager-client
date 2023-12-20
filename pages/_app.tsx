import "@/styles/globals.css";
import { ReactNode } from "react";
import { ThemeProvider } from "@/components/Layout/_contexts/themecontext";
import { AppContext, AppInitialProps, AppLayoutProps } from "next/app";
import type { NextComponentType } from "next";
import { AuthProvider } from "@/components/Layout/_contexts/authcontext";
import { ReduxProvider } from "@/redux/provider";

const App: NextComponentType<AppContext, AppInitialProps, AppLayoutProps> = ({
  Component,
  pageProps,
}: AppLayoutProps) => {
  const getLayout = Component.getLayout || ((page: ReactNode) => page);
  return (
    <ThemeProvider>
      <ReduxProvider>{getLayout(<Component {...pageProps} />)}</ReduxProvider>
    </ThemeProvider>
  );
};

export default App;
