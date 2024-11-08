"use client";

import { useState } from "react";
import {
  useAccount,
  useWallets,
  usePublicClient,
} from "@particle-network/connectkit";
import { encodeFunctionData, parseEther } from "viem";
import { arbitrum } from "viem/chains";

// Import contract ABI and bytecode
import dropletsVaultAbi from "@/abi/DropletsVaultAbi.json"; // Replace with actual ABI and bytecode
import { erc20Abi } from "viem";
import { useApi } from "@/hooks/useApi";

interface Props {
  address: `0x${string}`;
  id: string;
  backers: { value: number; address: string }[];
  customCallback: () => void;
}

export default function DepositToVault(props: Props) {
  const { customCallback, address: vaultAddress, id, backers } = props;
  const { address, isConnected } = useAccount();
  const publicClient = usePublicClient();
  const [primaryWallet] = useWallets();
  const { updateVault } = useApi();

  // State variables for deposit
  const [receiver, setReceiver] = useState<string>("");
  const [assets, setAssets] = useState<string>("");
  const [isDepositing, setIsDepositing] = useState<boolean>(false);
  const [transactionHash, setTransactionHash] = useState<string>("");

  // Function to approve the vault contract to spend the specified amount of tokens
  const approveTokens = async (amountInWei: bigint, tokenAddress: string) => {
    try {
      const walletClient = primaryWallet.getWalletClient();

      // Encode the approval transaction data
      const approveData = encodeFunctionData({
        abi: erc20Abi,
        functionName: "approve",
        args: [vaultAddress, amountInWei],
      });

      // Send the approval transaction
      const txHash = await walletClient.sendTransaction({
        account: address as `0x${string}`,
        to: tokenAddress as `0x${string}`,
        data: approveData,
        chain: arbitrum,
      });

      // Wait for transaction confirmation
      await publicClient?.waitForTransactionReceipt({ hash: txHash });
      console.log("Approval transaction hash:", txHash);
    } catch (error) {
      console.error("Error during token approval:", error);
      throw new Error("Token approval failed");
    }
  };

  const previewShares = async (assetsInWei: bigint) => {
    const { abi, bytecode } = dropletsVaultAbi;

    // Call the contract's previewDeposit function
    const sharesData = encodeFunctionData({
      abi,
      functionName: "previewDeposit",
      args: [assetsInWei],
    });

    const sharesResult = await publicClient?.call({
      to: vaultAddress, // Replace with deployed contract address
      data: sharesData,
    });

    console.log("Shares result:", sharesResult);

    // Parse the result as a BigInt
    return 0;
  };

  // Function to deposit assets into the vault
  const deposit = async () => {
    const tokenAddress = "0x82af49447d8a07e3bd95bd0d56f35241523fbab1";
    if (!address || !publicClient || !assets) {
      alert("Please connect your wallet and provide all inputs.");
      return;
    }

    setIsDepositing(true);

    try {
      const { abi, bytecode } = dropletsVaultAbi;
      const bytecodeHex = bytecode.object; // Extract the hex string from `bytecode.object`

      // Ensure bytecode is prefixed with "0x"
      const bytecodeWithPrefix = bytecodeHex.startsWith("0x")
        ? bytecodeHex
        : `0x${bytecodeHex}`;

      // Convert assets to wei (assuming assets are in Ether format)
      const assetsInWei = parseEther(assets);

      await approveTokens(assetsInWei, tokenAddress);

      const shares = await previewShares(assetsInWei);

      // Encode the function data for the deposit function
      const depositData = encodeFunctionData({
        abi,
        functionName: "deposit", // assuming there's a public `deposit` function
        args: [assetsInWei, vaultAddress],
      });

      console.log({ vaultAddress });

      const gasEstimate = await publicClient.estimateGas({
        account: address as `0x${string}`,
        to: vaultAddress,
        data: depositData,
      });

      console.log({ gasEstimate });

      // Get the wallet client from the primary wallet
      const walletClient = primaryWallet.getWalletClient();

      // Send the transaction
      const txHash = await walletClient.sendTransaction({
        account: address as `0x${string}`, // Ensure account format is correct
        to: vaultAddress, // Replace with deployed contract address
        data: depositData,
        chain: arbitrum,
        gas: gasEstimate,
      });

      // Wait for transaction receipt
      const receipt = await publicClient.waitForTransactionReceipt({
        hash: txHash,
      });

      if (receipt) {
        setTransactionHash(txHash);
        alert(`Deposit successful! Transaction hash: ${txHash}`);

        const value = parseFloat(assets);

        updateVault(id, {
          backers: [
            ...backers,
            {
              value,
              address,
            },
          ],
        });

        customCallback();
      }
    } catch (error) {
      console.error("Error depositing to vault:", error);
      alert("Deposit failed. Please check the console for details.");
    } finally {
      setIsDepositing(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-black text-white">
      <h2 className="text-3xl font-bold mb-4">Deposit to DropletsVault</h2>

      {/* Form to accept deposit inputs */}
      <div className="w-full max-w-md">
        <label className="block mb-2">Assets to Deposit (in ETH):</label>
        <input
          type="text"
          value={assets}
          onChange={(e) => setAssets(e.target.value)}
          placeholder="Enter amount in ETH"
          className="w-full p-2 mb-4 rounded bg-gray-800 text-white"
        />

        <button
          onClick={deposit}
          disabled={isDepositing}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded text-white"
        >
          {isDepositing ? "Depositing..." : "Deposit"}
        </button>

        {transactionHash && (
          <div className="mt-4 p-2 bg-green-600 rounded text-white">
            Deposit successful! Transaction{" "}
            <a
              href={`https://arbiscan.io/tx/${transactionHash}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
