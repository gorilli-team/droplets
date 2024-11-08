import { useState, useEffect } from "react";
import axios from "axios";

const useTransactions = (profileAddress, chain) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalTransactions, setTotalTransactions] = useState(0); // State for transaction count

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!profileAddress) return;

      setLoading(true);
      setError(null);

      if (!chain) {
        setError("Chain not selected.");
        setLoading(false);
        return;
      }

      let url = "";

      if (chain === "sepolia") {
        const apiKey = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;
        url = `https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${profileAddress}&startblock=0&endblock=99999999&sort=asc&apikey=${apiKey}`;
      } else if (chain === "ethereum") {
        const apiKey = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;
        url = `https://api.etherscan.io/api?module=account&action=txlist&address=${profileAddress}&startblock=0&endblock=99999999&sort=asc&apikey=${apiKey}`;
      } else if (chain === "base") {
        const apiKey = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;
        url = `https://api.base.etherscan.io/api?module=account&action=txlist&address=${profileAddress}&startblock=0&endblock=99999999&sort=asc&apikey=${apiKey}`;
      } else if (chain === "optimism") {
        const apiKey = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;
        url = `https://api-optimistic.etherscan.io/api?module=account&action=txlist&address=${profileAddress}&startblock=0&endblock=99999999&sort=asc&apikey=${apiKey}`;
      } else if (chain === "polygon") {
        const apiKey = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;
        url = `https://api.polygonscan.com/api?module=account&action=txlist&address=${profileAddress}&startblock=0&endblock=99999999&sort=asc&apikey=${apiKey}`;
      } else {
        setError("Invalid chain selected.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(url);
        if (response.data.status === "1") {
          setTransactions(response.data.result);
          setTotalTransactions(response.data.result.length); // Update total transactions
        } else {
          setTransactions([]);
          setTotalTransactions(0); // Reset total transactions
        }
      } catch (err) {
        console.error("Error fetching transactions:", err);
        setError("Failed to fetch transactions.");
        setTransactions([]);
        setTotalTransactions(0); // Reset total transactions
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [profileAddress, chain]);

  return { transactions, totalTransactions, loading, error };
};

export default useTransactions;
