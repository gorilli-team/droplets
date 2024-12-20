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
import { Button } from "./ui/button";

interface Props {
  customCallback: () => void;
}

export default function DeployVault(props: Props) {
  const { customCallback } = props;
  const { address, isConnected } = useAccount();
  const publicClient = usePublicClient();
  const [primaryWallet] = useWallets();
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
    <div className="flex flex-col text-white bg-gray-800 p-6">
      {/* Connect Button */}
      <div>
        {isConnected ? (
          <>
            {/* Deployment Form */}
            <div className="w-full max-w-md">
              <label className="block mb-2 text-sm">Vault name:</label>
              <input
                type="text"
                value={vaultName}
                onChange={(e) => setVaultName(e.target.value)}
                placeholder="Vault name"
                className="w-full px-4 py-3 mb-4 rounded-lg bg-gray-700 text-sm text-gray-400 border-gray-600"
              />

              <label className="block mb-2 text-sm">ERC20 Asset Address:</label>
              <input
                type="text"
                value={assetAddress}
                onChange={(e) => setAssetAddress(e.target.value)}
                placeholder="ERC20 asset address"
                className="w-full px-4 py-3 mb-4 rounded-lg bg-gray-700 text-sm text-gray-400 border-gray-600"
              />

              <label className="block mb-2 text-sm">Fee Basis Points:</label>
              <input
                type="number"
                value={basisPoints}
                onChange={(e) => setBasisPoints(e.target.value)}
                placeholder="Basis points (e.g., 500)"
                className="w-full px-4 py-3 mb-4 rounded-lg bg-gray-700 text-sm text-gray-400 border-gray-600"
              />

              <Button
                onClick={deployContract}
                disabled={isDeploying}
                variant={"default"}
                size="full"
              >
                {isDeploying ? "Deploying..." : "Deploy contract"}
              </Button>

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
