// components/Sidebar.tsx
"use client";
import Link from "next/link";
import { useAccount } from "@particle-network/connectkit";
import DropletsLogo from "src/assets/svg/DropletsLogo";

export default function Sidebar() {
  console.log("useAccount:", useAccount);
  const { isConnected } = useAccount();

  const navigation = [
    { name: "My Account", href: "/profile" },
    { name: "Agents", href: "/agents" },
    { name: "Drops", href: "/drops" },
    { name: "Docs", href: "/docs" },
    { name: "Help", href: "/help" },
  ];

  return (
    <aside className="bg-gray-800 p-6 w-full md:w-64 min-h-screen text-white font-semibold border-r border-gray-600">
      <div className="flex flex-row gap-1.5 mb-3">
        <DropletsLogo className="w-6 h-6" />
        <h1 className="text-lg font-bold">Droplets</h1>
      </div>
      <nav>
        <ul className="space-y-2">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="block px-2 py-1.5 rounded-md hover:bg-gray-700 transition"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
