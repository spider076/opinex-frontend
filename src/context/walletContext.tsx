import React, { createContext, useState, useEffect, useCallback, ReactNode } from "react";
import { ethers, BrowserProvider, JsonRpcSigner, Contract } from "ethers";
import OpinexABI from "../abis/Opinex.json"; // Assuming ABI is correctly located
import { useToast } from "../components/ui/use-toast"; // Import shadcn/ui useToast

// Replace with your deployed contract address
const CONTRACT_ADDRESS = import.meta.env.VITE_API_OPINEX_CONTRACT as string;

// Define the shape of the context data
interface WalletContextType {
  provider: BrowserProvider | null;
  signer: JsonRpcSigner | null;
  contract: Contract | null;
  account: string | null;
  balance: string;
  isConnected: boolean;
  networkError: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

// Create the context with a default undefined value, will be provided by WalletProvider
export const WalletContext = createContext<WalletContextType | undefined>(undefined);

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const { toast } = useToast(); // Initialize useToast
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
  const [contract, setContract] = useState<Contract | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>("0");
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [networkError, setNetworkError] = useState<string | null>(null);

  const connectWallet = useCallback(async () => {
    if (window.ethereum) {
      try {
        const browserProvider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await browserProvider.send("eth_requestAccounts", []);
        const jsonRpcSigner = await browserProvider.getSigner();
        const network = await browserProvider.getNetwork();

        if (Number(network.chainId) !== 11155111) { // Sepolia chain ID
          const errorMsg = "Please switch to Sepolia testnet";
          setNetworkError(errorMsg);
          toast({ title: "Network Error", description: errorMsg, variant: "destructive" });
          return;
        }

        const opinexContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          OpinexABI,
          jsonRpcSigner
        );

        setProvider(browserProvider);
        setSigner(jsonRpcSigner);
        setContract(opinexContract);
        setAccount(accounts[0]);
        setIsConnected(true);
        setNetworkError(null);

        const userBalance = await browserProvider.getBalance(accounts[0]);
        setBalance(ethers.formatEther(userBalance));

        localStorage.setItem("isWalletConnected", "true");

        toast({ title: "Success", description: "Wallet connected!" });
      } catch (error) {
        console.error("Connection error:", error);
        toast({ title: "Error", description: "Failed to connect wallet.", variant: "destructive" });
      }
    } else {
      toast({ title: "Error", description: "MetaMask not detected. Please install MetaMask.", variant: "destructive" });
    }
  }, [toast]);

  const disconnectWallet = useCallback(() => {
    setProvider(null);
    setSigner(null);
    setContract(null);
    setAccount(null);
    setBalance("0");
    setIsConnected(false);
    localStorage.removeItem("isWalletConnected");
    toast({ title: "Info", description: "Wallet disconnected." });
  }, [toast]);

  useEffect(() => {
    if (localStorage.getItem("isWalletConnected") === "true") {
      connectWallet();
    }

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        disconnectWallet();
      } else {
        setAccount(accounts[0]);
        // Re-connect or update signer/contract if necessary, connectWallet often handles this
        connectWallet(); 
      }
    };

    const handleChainChanged = () => {
      // It's often better to prompt the user to reload or handle state rather than forcing a reload
      toast({ title: "Network Changed", description: "Please verify your network connection or reconnect your wallet."});
      // Consider calling connectWallet() or specific logic to re-validate the network
      // window.location.reload(); // Avoid if possible, or make conditional
      disconnectWallet(); // A safer approach to force re-check on next connect
    };

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", handleChainChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
        window.ethereum.removeListener("chainChanged", handleChainChanged);
      }
    };
  }, [connectWallet, disconnectWallet, toast]);

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
