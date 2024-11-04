import React, { useState } from "react";
import useTransactions from "../../../hooks/useTransactions"; // Adjust the import path accordingly

const chainConfigs = {
  // ethereum: {
  //   name: "Ethereum Mainnet",
  //   apiUrl: "https://api.etherscan.io/api",
  //   icon: "/icons/ethereum.png",
  // },
  // base: {
  //   name: "Base",
  //   apiUrl: "https://api.base.etherscan.io/api",
  //   icon: "/icons/base.png",
  // },
  // optimism: {
  //   name: "Optimism",
  //   apiUrl: "https://api-optimistic.etherscan.io/api",
  //   icon: "/icons/optimism.png",
  // },
  // polygon: {
  //   name: "Polygon",
  //   apiUrl: "https://api.polygonscan.com/api",
  //   icon: "/icons/polygon.png",
  // },
  sepolia: {
    name: "Sepolia",
    apiUrl: "https://api-sepolia.etherscan.io/api",
    icon: "/icons/sepolia.png",
  },
};

const Transactions = ({ profileAddress }) => {
  const [selectedChain, setSelectedChain] = useState("ethereum");
  const { transactions, totalTransactions, loading, error } = useTransactions(
    profileAddress,
    selectedChain
  );

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
    return date.toLocaleString(); // Format the date as a string
  };

  return (
    <div>
      <div className="flex items-center space-x-4 mb-4">
        {Object.entries(chainConfigs).map(([key, config]) => (
          <button
            key={key}
            onClick={() => setSelectedChain(key)}
            className={`flex items-center space-x-2 p-2 border rounded ${
              selectedChain === key ? "bg-gray-200" : "bg-white"
            }`}
          >
            <img
              src={config.icon}
              alt={`${config.name} icon`}
              className="w-5 h-5"
            />
            <span>{config.name}</span>
          </button>
        ))}
      </div>

      {loading ? (
        <div className="border rounded shadow-sm p-4 bg-white">
          <div className="flex justify-between items-center">
            Loading transactions for {profileAddress} on{" "}
            {chainConfigs[selectedChain]?.name}...
          </div>
        </div>
      ) : error ? (
        <div className="border rounded shadow-sm p-4 bg-white">
          <div className="flex justify-between items-center">
            Error: {error}
          </div>
        </div>
      ) : transactions.length === 0 ? (
        <div className="border rounded shadow-sm p-4 bg-white">
          <div className="flex items-center">
            No transactions available for this profile for {profileAddress} on{" "}
            {chainConfigs[selectedChain]?.name}.
          </div>
        </div>
      ) : (
        <ul className="mt-4 space-y-4">
          Transactions for {profileAddress} on{" "}
          {chainConfigs[selectedChain]?.name}
          <p>Total Transactions: {totalTransactions}</p>
          {transactions.map((item) => (
            <li
              key={item.hash}
              className="border rounded shadow-sm p-4 bg-white"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-md font-semibold">Tx Hash: {item.hash}</p>
                  <p className="text-sm text-gray-500">
                    From: {item.from} To: {item.to}
                  </p>
                  <p className="text-sm text-gray-500">
                    Block Number: {item.blockNumber}
                  </p>
                  <p className="text-sm text-gray-500">
                    Value: {item.value} wei
                  </p>
                  <p className="text-sm text-gray-500">
                    Time: {formatDate(item.timeStamp)}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Transactions;
