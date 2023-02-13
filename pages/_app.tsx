import "@fontsource/public-sans";
import { CssBaseline, CssVarsProvider } from "@mui/joy";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App ({ Component, pageProps }: AppProps) {
  return (
    <CssVarsProvider defaultMode="dark">
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <CssBaseline />
      <Component {...pageProps} />
    </CssVarsProvider>
  );
}
