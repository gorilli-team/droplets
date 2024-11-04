import "../../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";

import { ApolloProvider } from "@apollo/client";
import { client } from "../lib/apollo-client";
import { rainbowKitConfig } from "../config/rainbowKit";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";

import { WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

function Droplets({ Component, pageProps }) {
  return (
    <WagmiProvider config={rainbowKitConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider showRecentTransactions={true}>
          <ApolloProvider client={client}>
            <Component {...pageProps} />
          </ApolloProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default Droplets;
