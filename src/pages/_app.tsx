import "@/styles/globals.css";
import type { AppProps, AppContext } from "next/app";
import { getSession, SessionProvider } from "next-auth/react";
import { client } from "../graphql/apollo-client";
import { ApolloProvider } from "@apollo/client";
import { Toaster } from "react-hot-toast";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <ApolloProvider client={client}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
        <Toaster />
      </SessionProvider>
    </ApolloProvider>
  );
}

App.getInitialProps = async (context: AppContext) => {
  const { ctx } = context;
  const session = await getSession(ctx);
  return {
    pageProps: {
      session,
    },
  };
};
