import "@/styles/globals.css";
import { ThemeProvider } from "@/components/Layout/_contexts/themecontext";
import type { AppProps } from "next/app";
import { AuthProvider } from "@/components/Layout/_contexts/authcontext";

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <ThemeProvider>
      <AuthProvider>{getLayout(<Component {...pageProps} />)}</AuthProvider>
    </ThemeProvider>
  );
}
