'use client';

import Header from '../src/components/header';
import { useAccount } from '@particle-network/connectkit';
import Link from 'next/link';

export default function Index() {
  const { isConnected, chain } = useAccount();

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-900 text-white">
        {/* Hero Section */}
        <section className="relative flex items-center justify-center h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="relative z-10 text-center max-w-4xl px-6">
            <h1 className="text-6xl font-extrabold leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-400 to-indigo-400">
              Transparent DeFi Investing
              <br />
              with <span className="text-white">Droplets</span>
            </h1>
            <p className="mt-6 text-2xl text-gray-200">
              Access ERC4626 vaults designed for transparency, security, and performance. Invest
              smarter with trust at the core.
            </p>
            <Link href="/drops">
              <button className="mt-10 px-10 py-4 bg-gradient-to-r from-pink-500 to-yellow-500 text-gray-900 font-bold rounded-full shadow-lg transform hover:scale-105 hover:shadow-2xl transition-all duration-300">
                Get Started
              </button>
            </Link>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 bg-gray-800">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-10 text-white">Why Droplets?</h2>
            <p className="text-gray-300 text-xl leading-relaxed max-w-3xl mx-auto">
              Droplets combines cutting-edge DeFi technology with user-centric design to provide an
              investing experience that's transparent, secure, and trustworthy. With our ERC4626
              vaults, you gain unparalleled insights into your investments, ensuring peace of mind
              at every step.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-gradient-to-r from-blue-800 via-teal-700 to-indigo-800">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center px-6">
            <div className="p-10 bg-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-white">Transparent Vaults</h3>
              <p className="mt-4 text-gray-400">
                Our ERC4626-compliant vaults ensure clear insights into fees, assets, and
                performance.
              </p>
            </div>
            <div className="p-10 bg-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-white">Secure by Design</h3>
              <p className="mt-4 text-gray-400">
                Built with audited smart contracts to safeguard your assets and ensure reliability.
              </p>
            </div>
            <div className="p-10 bg-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-white">Empowered Investing</h3>
              <p className="mt-4 text-gray-400">
                Leverage community-driven strategies to maximize returns and align with your goals.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-24 bg-gray-900">
          <div className="max-w-6xl mx-auto text-center px-6">
            <h2 className="text-4xl font-bold mb-10 text-white">Start Your Journey</h2>
            <p className="text-gray-300 text-xl mb-12 max-w-2xl mx-auto">
              Stay ahead in the world of DeFi. Subscribe to our newsletter to get the latest
              insights, updates, and exclusive content directly in your inbox.
            </p>
            <Link href="https://luduvigo.substack.com" target="_blank" rel="noopener noreferrer">
              <button className="px-12 py-4 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-bold rounded-full shadow-lg transform hover:scale-105 hover:shadow-2xl transition-all duration-300">
                Connect with Us
              </button>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 bg-gray-800">
          <div className="max-w-6xl mx-auto text-center text-gray-400">
            <p>&copy; 2024 Droplets. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
