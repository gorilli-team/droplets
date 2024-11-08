"use client";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Modal } from "../ui/modal";
import { Edit, Lock, Plus, Settings, Shield } from "lucide-react";
import DeployVaultModal from "../DeployVault";
import DepositToVault from "../DepositToVault";
import { useApi, Vault } from "../../hooks/useApi";
import { useAccount } from "@particle-network/connectkit";
import { useAsyncMemo } from "use-async-memo";

export default function UserProfile() {
  const { fetchVaults } = useApi();
  const { address } = useAccount();
  const [showCreateVaultModal, setShowCreateVaultModal] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [selectedVaultAddress, setSelectedVaultAddress] = useState("");
  const [selectedVaultId, setSelectedVaultId] = useState("");
  const [backers, setBackers] = useState<{ address: string; value: number }[]>(
    []
  );
  const [vaultTotals, setVaultTotals] = useState<Record<string, number>>({});
  const [loadingTotals, setLoadingTotals] = useState<Record<string, boolean>>(
    {}
  );
  const [vaultsLoading, setVaultsLoading] = useState<boolean>(true);

  const ethToUsd = async (eth: number) => {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`
    );
    const data = await response.json();
    console.log(eth * data.ethereum.usd);
    return eth * data.ethereum.usd;
  };

  const handleCreateVault = async () => {
    setShowCreateVaultModal(true);
  };

  const handleDeposit = async (vault: Vault) => {
    setSelectedVaultAddress(vault.vaultAddress);
    setSelectedVaultId(vault._id as string);
    setBackers(vault.backers);
    setShowDepositModal(true);
  };

  const vaults = useAsyncMemo(async () => {
    setVaultsLoading(true); // Start loading
    if (!address) return [];
    const result = await fetchVaults(address);
    setVaultsLoading(false); // Stop loading after fetch is complete
    return result;
  }, [address, refresh]);

  // Fetch and set USD totals for each vault when vaults change
  useEffect(() => {
    const fetchVaultTotals = async () => {
      if (!vaults || !Array.isArray(vaults)) return;

      for (const vault of vaults) {
        setLoadingTotals((prev) => ({ ...prev, [vault._id as string]: true })); // Mark as loading

        const totalEth = vault.backers.reduce(
          (acc, cur) => acc + (cur.value || 0),
          0
        );
        const usdValue = await ethToUsd(totalEth);
        setVaultTotals((prev) => ({
          ...prev,
          [vault._id as string]: usdValue,
        }));
        setLoadingTotals((prev) => ({ ...prev, [vault._id as string]: false })); // Mark as loaded
      }
    };

    fetchVaultTotals();
  }, [vaults]);

  return (
    <div className="p-6 space-y-8">
      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">
          Welcome back, luduvigo
        </h2>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage
                src="/placeholder.svg?height=64&width=64"
                alt="Alex"
              />
              <AvatarFallback>L</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>luduvigo</CardTitle>
              <CardDescription>Premium Member</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="grid gap-2">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{vaults?.length || 0} Drops</Badge>
              <Badge variant="secondary">2 Shared</Badge>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm">
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Account Settings
            </Button>
          </CardFooter>
        </Card>
      </section>

      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold tracking-tight">Your Drops</h2>
          <Button onClick={handleCreateVault}>
            <Plus className="w-4 h-4 mr-2" />
            Create New Drop
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {vaultsLoading ? (
            <p>Loading vaults...</p>
          ) : Array.isArray(vaults) && vaults.length > 0 ? (
            vaults.map((vault) => (
              <Card key={vault._id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="w-5 h-5" />
                    {vault.name}
                  </CardTitle>
                  <CardDescription>2%</CardDescription>
                  <CardDescription>
                    Total:{" "}
                    {loadingTotals[vault._id as string]
                      ? "Loading..."
                      : `$${vaultTotals[vault._id as string]?.toFixed(2) || 0}`}
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleDeposit(vault)}
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Deposit
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <p>No Drops available</p>
          )}
        </div>
        {showCreateVaultModal && (
          <Modal
            isOpen={showCreateVaultModal}
            onClose={() => setShowCreateVaultModal(false)}
          >
            <DeployVaultModal
              customCallback={() => {
                setRefresh(!refresh);
              }}
            />
          </Modal>
        )}
        {showDepositModal && (
          <Modal
            isOpen={showDepositModal}
            onClose={() => setShowDepositModal(false)}
          >
            <DepositToVault
              address={selectedVaultAddress as `0x${string}`}
              id={selectedVaultId}
              backers={backers}
              customCallback={() => {
                setRefresh(!refresh);
              }}
            />
          </Modal>
        )}
      </section>
    </div>
  );
}
