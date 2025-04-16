import React, { createContext, useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import OpinexABI from "../abis/Opinex.json";
import { toast } from "react-toastify";

// Replace with your deployed contract address
const CONTRACT_ADDRESS = import.meta.env.VITE_API_OPINEX_CONTRACT;

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState("0");
  const [isConnected, setIsConnected] = useState(false);
  const [networkError, setNetworkError] = useState(null);

  const connectWallet = useCallback(async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const network = await provider.getNetwork();

        if (Number(network.chainId) !== 11155111) {
          setNetworkError("Please switch to Sepolia testnet");
          toast.error("Please switch to Sepolia testnet");
          return;
        }

        const contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          OpinexABI,
          signer
        );

        setProvider(provider);
        setSigner(signer);
        setContract(contract);
        setAccount(accounts[0]);
        setIsConnected(true);
        setNetworkError(null);

        const balance = await provider.getBalance(accounts[0]);
        setBalance(ethers.formatEther(balance));

        localStorage.setItem("isWalletConnected", "true");

        toast.success("Wallet connected!");
      } catch (error) {
        console.error("Connection error:", error);
        toast.error("Failed to connect wallet");
      }
    } else {
      toast.error("MetaMask not detected");
    }
  }, []);

  const disconnectWallet = useCallback(() => {
    setProvider(null);
    setSigner(null);
    setContract(null);
    setAccount(null);
    setBalance("0");
    setIsConnected(false);
    localStorage.removeItem("isWalletConnected");
    toast.info("Wallet disconnected");
  }, []);

  useEffect(() => {
    if (localStorage.getItem("isWalletConnected") === "true") {
      connectWallet();
    }

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          setAccount(accounts[0]);
          connectWallet();
        }
      });

      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners();
      }
    };
  }, [connectWallet, disconnectWallet]);

  return (
    <WalletContext.Provider
      value={{
        provider,
        signer,
        contract,
        account,
        balance,
        isConnected,
        networkError,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
