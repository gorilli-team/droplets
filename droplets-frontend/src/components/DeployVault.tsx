"use client";

import { useEffect, useState } from "react";
import {
  useAccount,
  useDisconnect,
  useWallets,
  ConnectButton,
  usePublicClient,
} from "@particle-network/connectkit";
import { encodeDeployData } from "viem";
import { arbitrum } from "viem/chains";
import { useApi } from "../hooks/useApi";

// Import contract ABI and bytecode
import dropletsVaultAbi from "../abi/DropletsVaultAbi.json"; // Replace with actual ABI and bytecode

interface Props {
  customCallback: () => void;
}

export default function DeployVault(props: Props) {
  const { customCallback } = props;
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const publicClient = usePublicClient();
  const [primaryWallet] = useWallets(); // Get the primary wallet from Particle Connect
  const { createVault } = useApi();
  const [isMounted, setIsMounted] = useState(false);

  const [assetAddress, setAssetAddress] = useState("");
  const [basisPoints, setBasisPoints] = useState("");
  const [deploymentAddress, setDeploymentAddress] = useState<string>("");
  const [isDeploying, setIsDeploying] = useState(false);
  const [vaultName, setVaultName] = useState("");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const deployContract = async () => {
    if (!address || !publicClient) {
      return;
    }

    setIsDeploying(true);

    try {
      const { abi, bytecode } = dropletsVaultAbi;
      const bytecodeHex = bytecode.object; // Extract the hex string from `bytecode.object`

      // Ensure bytecode is prefixed with "0x"
      const bytecodeWithPrefix = bytecodeHex.startsWith("0x")
        ? bytecodeHex
        : `0x${bytecodeHex}`;

      // Get the wallet client from the primary wallet
      const walletClient = primaryWallet.getWalletClient();

      // Encode the contract deployment data with the constructor arguments
      const deployData = encodeDeployData({
        abi,
        bytecode: bytecodeWithPrefix as `0x${string}`,
        args: [assetAddress, parseInt(basisPoints)],
      });

      const chainId = await publicClient?.getChainId();
      // Send the transaction to deploy the contract
      const txHash = await walletClient.sendTransaction({
        account: address as `0x${string}`, // Specify the account (sender) for the transaction
        to: null, // Contract deployment transaction has no `to` address
        data: deployData,
        chain: arbitrum,
      });

      // Wait for transaction receipt
      const receipt = await publicClient.waitForTransactionReceipt({
        hash: txHash,
      });

      console.log({ receipt });

      if (receipt?.contractAddress) {
        console.log("Contract deployed at:", receipt.contractAddress);
        setDeploymentAddress(receipt.contractAddress);

        // Create a new vault
        await createVault({
          ownerAddress: address,
          vaultAddress: receipt.contractAddress,
          name: vaultName,
          imageUrl: "",
          backers: [],
        });

        customCallback();

        console.log("Contract deployed at:", receipt.contractAddress);
        alert(`Contract deployed successfully at: ${receipt.contractAddress}`);
      } else {
        throw new Error("Deployment failed: No contract address found.");
      }
    } catch (error) {
      console.error("Error deploying contract:", error);
      alert("Failed to deploy contract. Check console for details.");
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-8 text-black">
      <h2 className="text-3xl font-bold mb-4">Deploy new Droplets Vault</h2>

      {/* Connect Button */}
      <div>
        {isConnected ? (
          <>
            {/* Deployment Form */}
            <div className="w-full max-w-md">
              <label className="block mb-2">Vault name:</label>
              <input
                type="text"
                value={vaultName}
                onChange={(e) => setVaultName(e.target.value)}
                placeholder="Enter Vault name"
                className="w-full p-2 mb-4 rounded bg-gray-800 text-white"
              />

              <label className="block mb-2">Asset Address:</label>
              <input
                type="text"
                value={assetAddress}
                onChange={(e) => setAssetAddress(e.target.value)}
                placeholder="Enter ERC20 asset address"
                className="w-full p-2 mb-4 rounded bg-gray-800 text-white"
              />

              <label className="block mb-2">Entry Fee Basis Points:</label>
              <input
                type="number"
                value={basisPoints}
                onChange={(e) => setBasisPoints(e.target.value)}
                placeholder="Enter basis points (e.g., 500)"
                className="w-full p-2 mb-4 rounded bg-gray-800 text-white"
              />

              <button
                onClick={deployContract}
                disabled={isDeploying}
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded text-white"
              >
                {isDeploying ? "Deploying..." : "Deploy Contract"}
              </button>

              {deploymentAddress && (
                <div className="mt-4 p-2 bg-green-600 rounded text-white">
                  Contract deployed at:{" "}
                  <a
                    href={`https://arbiscan.io/address/${deploymentAddress}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {deploymentAddress}
                  </a>
                </div>
              )}
            </div>
          </>
        ) : (
          <ConnectButton />
        )}
      </div>
    </div>
  );
}
