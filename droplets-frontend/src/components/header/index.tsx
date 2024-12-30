import { ConnectButton } from "@particle-network/connectkit";

import styles from "./index.module.css";

export default function Header() {
  return (
    <header className="p-6 bg-gray-800 h-20 z-50">
      <div className={styles["nav-end"]}>
        <ConnectButton />
      </div>
    </header>
  );
}
