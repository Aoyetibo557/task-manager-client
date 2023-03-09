import "@/styles/globals.css";
import { ReactNode } from "react";
import { ThemeProvider } from "@/components/Layout/_contexts/themecontext";
import { AppContext, AppInitialProps, AppLayoutProps } from "next/app";
import type { NextComponentType } from "next";
import { AuthProvider } from "@/components/Layout/_contexts/authcontext";

const App: NextComponentType<AppContext, AppInitialProps, AppLayoutProps> = ({
  Component,
  pageProps,
}: AppLayoutProps) => {
  const getLayout = Component.getLayout || ((page: ReactNode) => page);
  return (
    <ThemeProvider>
      <AuthProvider>{getLayout(<Component {...pageProps} />)}</AuthProvider>
    </ThemeProvider>
  );
};

export default App;
