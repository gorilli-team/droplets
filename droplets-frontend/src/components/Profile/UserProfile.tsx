"use client";
import { Button } from "@/components/UI/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/UI/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/UI/avatar";
import { Badge } from "@/components/UI/badge";
import { Modal } from "@/components/UI/modal";
import { Edit, Lock, Plus, Settings, Shield } from "lucide-react";
import { useState } from "react";
import DeployVaultModal from "@/components/DeployVault";
import DepositToVault from "../DepositToVault";
import { useApi } from "@/hooks/useApi";
import { useAccount } from "@particle-network/connectkit";
import { useAsyncMemo } from "use-async-memo";

export default function UserProfile() {
  const { fetchVaults } = useApi();
  const { address } = useAccount();
  const [showCreateVaultModal, setShowCreateVaultModal] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handleCreateVault = async () => {
    setShowCreateVaultModal(true);
  };

  const handleDeposit = async () => {
    setShowDepositModal(true);
  };

  const vaults = useAsyncMemo(async () => {
    if (!address) return [];

    console.log([
      { name: "MEV Capital Vault", performance: 23.4 },
      { name: "Moonwell Flagship ETH", performance: 10.22 },
      { name: "Usual Boosted USDC", performance: 14.25 },
      { name: "Degen Vault", performance: 128 },
      { name: "Stablecoin Vault", performance: -0.03 },
    ]);
    return await fetchVaults(address);
  }, [address, refresh]);

  console.log(vaults);

  return (
    <div className="p-6 space-y-8">
      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">
          Welcome back, Alex
        </h2>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage
                src="/placeholder.svg?height=64&width=64"
                alt="Alex"
              />
              <AvatarFallback>AL</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>Alex Johnson</CardTitle>
              <CardDescription>Premium Member</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="grid gap-2">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">5 Vaults</Badge>
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
          <h2 className="text-2xl font-semibold tracking-tight">Your Vaults</h2>
          <Button onClick={handleCreateVault}>
            <Plus className="w-4 h-4 mr-2" />
            Create New Vault
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {vaults?.length &&
            vaults.map((vault) => (
              <Card key={vault.name}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="w-5 h-5" />
                    {vault.name}
                  </CardTitle>
                  <CardDescription>2%</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleDeposit}
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Deposit
                  </Button>
                </CardFooter>
              </Card>
            ))}
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
            <DepositToVault />
          </Modal>
        )}
      </section>
    </div>
  );
}
