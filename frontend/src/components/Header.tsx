import { useEffect, useRef } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";

export const Header = () => {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const prevIsConnectedRef = useRef(isConnected);

  useEffect(() => {
    const prevIsConnected = prevIsConnectedRef.current;

    // Check if there was a transition from !isConnected to isConnected
    if (!prevIsConnected && isConnected && address) {
      console.log("Connected with address:", address);
      router.push(`/profile/${address}`);
    }

    // Update the previous connection status
    prevIsConnectedRef.current = isConnected;
  }, [isConnected, address]);

  return (
    <header className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white p-2 flex items-center justify-between">
      <h1
        className="text-xl font-bold cursor-pointer"
        onClick={() => router.push("/")}
      >
        <img src="/img/gorilli.png" alt="Droplets Logo" className="h-16" />
      </h1>
      <ConnectButton />
    </header>
  );
};
