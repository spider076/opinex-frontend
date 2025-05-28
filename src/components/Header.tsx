import { useContext } from "react";
import { WalletContext } from "../context/walletContext";
import { toast } from "react-toastify";
import { Button } from "./ui/button"; // Assuming shadcn/ui button is here

const Header = () => {
  const { account, balance, isConnected, connectWallet, disconnectWallet } =
    useContext(WalletContext);

  const handleConnect = async () => {
    try {
      await connectWallet();
    } catch (error) {
      toast.error("Failed to connect wallet");
    }
  };

  return (
    <header className="py-4">
      <nav className="container mx-auto flex justify-between items-center px-4">
        <div className="text-2xl font-bold text-primary">
          Opinex
        </div>
        <div className="flex items-center space-x-4">
          {isConnected ? (
            <>
              <p className="text-sm text-muted-foreground hidden md:block">
                {account.slice(0, 6)}...{account.slice(-4)} |{" "}
                {parseFloat(balance).toFixed(2)} ETH
              </p>
              <Button variant="outline" onClick={disconnectWallet}>
                Disconnect
              </Button>
            </>
          ) : (
            <Button onClick={handleConnect}>
              Connect Wallet
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
