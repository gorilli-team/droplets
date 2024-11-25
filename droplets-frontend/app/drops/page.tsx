'use client';
import { Layout } from '../../src/components/Layout';
import { mockedDrops } from '../../src/mockedData/mockedDrops';
import DeployVault from '../../src/components/DeployVault';
import { useEffect, useState } from 'react';
import { Button } from '../../src/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../src/components/ui/card';
import { Edit, Lock, Plus, Settings, Shield } from 'lucide-react';
import DeployVaultModal from '../../src/components/DeployVault';
import { useApi, Vault } from '../../src/hooks/useApi';
import { useAccount } from '@particle-network/connectkit';
import { useAsyncMemo } from 'use-async-memo';

export default function Drops() {
  const { fetchAllVaults } = useApi();
  const { address } = useAccount();
  const [showCreateVaultModal, setShowCreateVaultModal] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [selectedVaultAddress, setSelectedVaultAddress] = useState('');
  const [selectedVaultId, setSelectedVaultId] = useState('');
  const [backers, setBackers] = useState<{ address: string; value: number }[]>([]);
  const [vaultTotals, setVaultTotals] = useState<Record<string, number>>({});
  const [loadingTotals, setLoadingTotals] = useState<Record<string, boolean>>({});
  const [vaultsLoading, setVaultsLoading] = useState<boolean>(true);
  const [showConnectWalletMessage, setShowConnectWalletMessage] = useState<boolean>(false);

  const ethToUsd = async (eth: number) => {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`,
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
    if (!address) {
      setVaultsLoading(false); // Stop loading after fetch is complete
      setShowConnectWalletMessage(true);
      return [];
    }
    const result = await fetchAllVaults();
    setVaultsLoading(false); // Stop loading after fetch is complete
    return result;
  }, [address, refresh]);

  // Fetch and set USD totals for each vault when vaults change
  useEffect(() => {
    const fetchVaultTotals = async () => {
      if (!vaults || !Array.isArray(vaults)) return; // Ensure vaults is defined and is an array

      for (const vault of vaults) {
        setLoadingTotals((prev) => ({ ...prev, [vault._id as string]: true })); // Mark as loading

        const totalEth = vault.backers.reduce((acc, cur) => acc + (cur.value || 0), 0);
        const usdValue = await ethToUsd(totalEth);
        setVaultTotals((prev) => ({
          ...prev,
          [vault._id as string]: usdValue,
        }));
        setLoadingTotals((prev) => ({ ...prev, [vault._id as string]: false })); // Mark as loaded
      }
    };

    fetchVaultTotals(); // Call the async function
  }, [vaults]); // Ensure vaults is defined and correctly passed as a dependency

  const data = mockedDrops;

  return (
    <Layout>
      <div className="w-full mt-4 p-4">
        <div className="p-6 space-y-8">
          <>
            {showConnectWalletMessage ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center p-6 border rounded-lg shadow-lg bg-white">
                  <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
                  <p className="mb-4">Please connect your wallet to see the vaults.</p>
                </div>
              </div>
            ) : (
              <section className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-3xl font-semibold tracking-tight">Vaults</h2>
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
                            Total:{' '}
                            {loadingTotals[vault._id as string]
                              ? 'Loading...'
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
                    <p>No vaults available</p>
                  )}
                </div>
              </section>
            )}
          </>
        </div>
      </div>
    </Layout>
  );
}
