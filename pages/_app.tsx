import "@/styles/globals.css";
import type {AppType, AppProps} from "next/app";
import {trpc} from "utils/trpc";

const App: AppType = ({Component, pageProps}: AppProps) => {
  return <Component {...pageProps} />;
};

export default trpc.withTRPC(App);
