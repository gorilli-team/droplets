// components/Sidebar.tsx
import Link from "next/link";
import { useAccount } from "wagmi";

export const Sidebar = () => {
  const { isConnected } = useAccount();

  return (
    <aside className="bg-gray-200 p-4 w-full md:w-48 min-h-screen text-black font-semibold">
      <nav>
        <ul className="space-y-4">
          <li>
            {isConnected && (
              <li>
                <Link
                  href="/profile"
                  className="block p-2 rounded bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition"
                >
                  My Account
                </Link>
              </li>
            )}
            <Link
              href="/drops"
              className="block p-2 rounded hover:bg-purple-500 transition"
            >
              Drops
            </Link>
          </li>
          <li>
            <Link
              href="/profiles"
              className="block p-2 rounded hover:bg-purple-500 transition"
            >
              Profiles
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="block p-2 rounded hover:bg-purple-500 transition"
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};
