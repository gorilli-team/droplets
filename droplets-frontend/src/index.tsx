"use client";

import Header from "../src/components/header";
import { useAccount } from "@particle-network/connectkit";
import Link from "next/link";

export default function Index() {
  const { isConnected, chain } = useAccount();

  return (
    <>
      <Header />{" "}
      <div className="min-h-screen bg-gray-900 text-white">
        {/* Hero Section */}
        <section className="relative flex items-center justify-center h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="relative z-10 text-center max-w-4xl px-6">
            <h1 className="text-6xl font-extrabold leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-400 to-indigo-400">
              Invest as a Degen with <br />
              <span className="text-white">Droplets</span>
            </h1>
            <p className="mt-6 text-2xl text-gray-200">
              Get access to the top DeFi investors' portfolios and invest like a
              Pro accessing their strategies and assets.
            </p>
            <Link href="/drops">
              <button className="mt-10 px-10 py-4 bg-gradient-to-r from-pink-500 to-yellow-500 text-gray-900 font-bold rounded-full shadow-lg transform hover:scale-105 hover:shadow-2xl transition-all duration-300">
                Get Started
              </button>
            </Link>
          </div>

          <div className="absolute bottom-10 w-full text-center">
            <a href="#about" className="text-gray-300 hover:text-white">
              <span className="material-icons animate-bounce text-3xl">
                expand_more
              </span>
            </a>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 bg-gray-800">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-10 text-white">What We Do</h2>
            <p className="text-gray-300 text-xl leading-relaxed max-w-3xl mx-auto">
              At Droplets, we are revolutionizing the way you interact with the
              decentralized web. Our platform is designed for creators,
              innovators, and visionaries. With seamless integration, secure
              transactions, and a community-first approach, we are building the
              future of the internet.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-gradient-to-r from-blue-800 via-teal-700 to-indigo-800">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center px-6">
            <div className="p-10 bg-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <span className="material-icons text-cyan-300 text-7xl mb-6">
                bolt
              </span>
              <h3 className="text-2xl font-semibold text-white">
                Lightning Fast
              </h3>
              <p className="mt-4 text-gray-400">
                Our platform is optimized for speed, ensuring you experience
                Web3 like never before.
              </p>
            </div>
            <div className="p-10 bg-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <span className="material-icons text-green-400 text-7xl mb-6">
                security
              </span>
              <h3 className="text-2xl font-semibold text-white">
                Secure & Reliable
              </h3>
              <p className="mt-4 text-gray-400">
                Built with the highest security standards, your assets are
                always safe with us.
              </p>
            </div>
            <div className="p-10 bg-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <span className="material-icons text-purple-300 text-7xl mb-6">
                people
              </span>
              <h3 className="text-2xl font-semibold text-white">
                Community Driven
              </h3>
              <p className="mt-4 text-gray-400">
                We put our community first, ensuring that every voice is heard
                and valued.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-24 bg-gray-900">
          <div className="max-w-6xl mx-auto text-center px-6">
            <h2 className="text-4xl font-bold mb-10 text-white">
              Join the Revolution
            </h2>
            <p className="text-gray-300 text-xl mb-12 max-w-2xl mx-auto">
              Ready to be part of something bigger? Get started with Droplets
              today and explore the endless possibilities of Web3.
            </p>
            <button className="px-12 py-4 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-bold rounded-full shadow-lg transform hover:scale-105 hover:shadow-2xl transition-all duration-300">
              Sign Up Now
            </button>
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
