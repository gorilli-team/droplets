import { sepolia } from "wagmi/chains";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";

export const rainbowKitConfig = getDefaultConfig({
  appName: "Droplets",
  projectId: process.env.NEXT_PUBLIC_RAINBOW_PROJECT_ID,
  chains: [sepolia],
  ssr: true, // If your dApp uses server side rendering (SSR)
});
