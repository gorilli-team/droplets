import logo from "../src/assets/images/logo.png";
import { ConnectButton } from "@particle-network/connectkit";
import Image from "next/image";
import Link from "next/link";

import styles from "./index.module.css";

export default function Header() {
  return (
    <header className="p-6 j-fit bg-gray-800 text-white flex items-center justify-between h-20">
      <div className={styles["nav-end"]}>
        <ConnectButton />
      </div>
    </header>
  );
}
