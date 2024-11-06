import logo from "@/assets/images/logo.png";
import { ConnectButton } from "@particle-network/connectkit";
import Image from "next/image";
import Link from "next/link";

import styles from "./index.module.css";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-teal-500 to-blue-600 p-2 text-white flex items-center justify-between">
      <Link href="/">
        <img src="/img/gorilli.png" alt="Droplets Logo" className="h-16" />{" "}
      </Link>
      <div className={styles["nav-end"]}>
        <ConnectButton />
      </div>
    </header>
  );
}
