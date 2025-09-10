import { ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import OpinexABI from "../abis/Opinex.json";
import { CONTRACT_ADDRESS, WalletContext } from "./wallet-states";

export const WalletProvider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState("0");
  const [isConnected, setIsConnected] = useState(false);
  const [networkError, setNetworkError] = useState(null);

  console.log("Opinex Smart Contract :: ", CONTRACT_ADDRESS);

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

        try {
          console.log("Creating contract instance...");
          const contract = new ethers.Contract(
            CONTRACT_ADDRESS,
            OpinexABI,
            signer
          );

          // Verify contract code exists at address
          const code = await provider.getCode(CONTRACT_ADDRESS);
          if (code === "0x") {
            console.error("No contract code found at address:", CONTRACT_ADDRESS);
            toast.error("No contract found at specified address");
            return;
          }

          console.log(
            "Contract code exists, attempting to call getQuestionsCount..."
          );

          // Verify contract connection by calling a view function
          try {
            const tx = contract.getQuestionsCount.fragment;
            console.log("getQuestionsCount function signature:", tx.selector);

            const count = await contract.getQuestionsCount();
            console.log("Questions count:", count);
            console.log("Contract connection verified successfully");
          } catch (contractError) {
            console.error("Contract call error details:", {
              errorSignature: contractError.data, // This might show which function failed
              errorData: contractError.data,
              message: contractError.message,
              reason: contractError.reason,
              code: contractError.code,
              method: contractError.method,
              transaction: contractError.transaction,
            });

            // Try to decode the error
            if (contractError.data) {
              try {
                const iface = new ethers.Interface(OpinexABI);
                const decodedError = iface.parseError(contractError.data);
                console.log("Decoded error:", decodedError);
              } catch (e) {
                console.log("Could not decode error data", e);
              }
            }

            toast.error(
              "Failed to interact with contract. Please verify contract address and ABI"
            );
            return;
          }

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
        } catch (contractError) {
          console.error("Contract creation failed:", contractError);
          toast.error(
            "Failed to initialize contract. Please verify contract address"
          );
          return;
        }
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
