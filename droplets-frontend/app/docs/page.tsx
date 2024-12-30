"use client";
import { Button } from "src/components/ui/button";
import { Layout } from "../../src/components/Layout";
import { Github } from "lucide-react";

export default function Docs() {
  return (
    <Layout>
      <div className="w-full p-4 text-white">
        <div className="p-6 space-y-8">
          <h1 className="text-2xl text-white font-bold">
            Droplets Documentation
          </h1>
          <div className="flex items-center">
            <Button>
              <a
                href="https://github.com/luduvigo/droplets"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-row"
              >
                <Github className="mr-2" />
                View on GitHub
              </a>
            </Button>
          </div>
          <p className="text-lg">
            Welcome to the Droplets documentation! Here, you'll find everything
            you need to understand how to use Droplets to simplify decentralized
            investing and asset management.
          </p>
          <section>
            <h2 className="text-2xl font-semibold py-3">What is Droplets?</h2>
            <p>
              Droplets is a DeFi platform designed to unify liquidity across
              multiple chains, simplify investment strategies, and empower users
              with tools that make decentralized investing transparent and
              efficient.
            </p>
            <p>
              With Droplets, you can leverage modern DeFi standards, like
              ERC-4626 vaults, and chain-agnostic mechanisms to manage your
              assets seamlessly. Whether you're a crypto beginner or a seasoned
              investor, Droplets makes DeFi accessible.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold py-3">Features</h2>
            <ul className="list-disc pl-5">
              <li>
                <strong>ERC-4626 Vaults:</strong> A standardized way to interact
                with yield-generating vaults, ensuring efficiency, security, and
                compatibility across DeFi platforms.
              </li>
              <li>
                <strong>Chain Abstraction:</strong> Invest across multiple
                blockchains without worrying about network-specific
                complexities.
              </li>
              <li>
                <strong>Stablecoin Mechanism:</strong> Manage stable,
                predictable investments with transparent mechanisms designed for
                risk reduction.
              </li>
              <li>
                <strong>User-Friendly Interface:</strong> Simple, intuitive
                tools for interacting with vaults and managing your assets.
              </li>
              <li>
                <strong>Social Proof:</strong> Build trust and transparency by
                showcasing your investment activities and achievements through
                integrations with platforms like Farcaster (coming soon).
              </li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-semibold py-3">How It Works</h2>
            <p>
              Using Droplets is straightforward. Here's a step-by-step overview:
            </p>
            <ol className="list-decimal pl-5">
              <li>
                <strong>Connect Your Wallet:</strong> Start by connecting your
                crypto wallet. Droplets supports popular wallets like MetaMask
                and WalletConnect.
              </li>
              <li>
                <strong>Select a Vault:</strong> Browse available ERC-4626
                vaults to find the one that matches your investment goals.
              </li>
              <li>
                <strong>Deposit Assets:</strong> Easily deposit assets into your
                chosen vault to start earning yield. Droplets automatically
                handles cross-chain interactions if needed.
              </li>
              <li>
                <strong>Track Performance:</strong> Monitor your investments in
                real-time through the intuitive dashboard. Withdraw or reinvest
                with just a few clicks.
              </li>
              <li>
                <strong>Engage with the Community:</strong> Once available,
                leverage social proof features to showcase your activity and
                connect with like-minded investors.
              </li>
            </ol>
          </section>
          <section>
            <h2 className="text-2xl font-semibold py-3">Getting Started</h2>
            <p>To begin your journey with Droplets:</p>
            <ul className="list-disc pl-5">
              <li>
                Ensure to connect to our Drops our Particle Connect Wallet
                Integration.
              </li>
              <li>
                Visit the platform and connect your wallet to access all
                features.
              </li>
              <li>
                Explore the user guide for detailed instructions and tips.
              </li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-semibold py-3">Next Steps</h2>
            <p>
              Stay tuned for updates on our beta launch in early 2025, where
              you’ll gain exclusive access to new features and community-driven
              enhancements. We’re excited to have you join us on this journey to
              revolutionize decentralized investing.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
}
