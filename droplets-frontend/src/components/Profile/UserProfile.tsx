"use client";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardRow,
  CardTitle,
} from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Modal } from "./modal";
import { Edit, Lock, Plus, Settings, Shield } from "lucide-react";
import DeployVault from "../DeployVault";
import DepositToVault from "../DepositToVault";
import { useApi, Vault } from "../../hooks/useApi";
import { useAccount } from "@particle-network/connectkit";
import { useAsyncMemo } from "use-async-memo";
import BaseLogo from "src/assets/svg/BaseLogo";

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
      <section className="space-y-4">
        <h2 className="text-3xl text-white font-bold tracking-tight border-b-gray-800 border-b-2 pb-3">
          Welcome back, luduvigo!
        </h2>

        <Card>
          <CardHeader className="flex flex-row justify-between">
            <div className="flex flex-row items-center gap-4">
              <Avatar className="w-20 h-20">
                <AvatarImage
                  src="/img/profilePictures/luduvigoevil.png"
                  alt="Alex"
                />
                <AvatarFallback>L</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>luduvigo.lens</CardTitle>
              </div>
            </div>
            <Button variant={"secondary"} size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Account Settings
            </Button>
          </CardHeader>
          <CardContent className="grid gap-2">
            <div className="flex items-center gap-2">
              <Badge>{vaults?.length || 0} Drops</Badge>
              <Badge>2 Shared</Badge>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-6">
        <div className="flex justify-between items-center border-b-gray-800 border-b-2 pb-3">
          <div className="flex flex-col">
            <h2 className="text-xl text-white font-semibold tracking-tight">
              Your Drops
            </h2>
            <h3 className="text-white tracking-tight">Manage your drops</h3>
          </div>
          <Button onClick={handleCreateVault}>
            <Plus className="w-4 h-4" />
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
                    {vault.name}
                  </CardTitle>
                </CardHeader>
                <CardRow>
                  <Badge>
                    30D APY: &nbsp; <b>{(Math.random() * 5).toFixed(2)}%</b>
                  </Badge>
                  <Badge>
                    TVL:{" "}
                    {loadingTotals[vault._id as string]
                      ? "Loading..."
                      : `$${vaultTotals[vault._id as string]?.toFixed(2) || 0}`}
                  </Badge>
                  <Badge>
                    <BaseLogo className="w-4 h-4" />
                    Base
                  </Badge>
                </CardRow>
                <CardRow>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleDeposit(vault)}
                  >
                    <Settings className="w-4 h-4" />
                    Manage
                  </Button>
                </CardRow>
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
            title={"Deploy new Droplets Vault"}
          >
            <DeployVault
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
