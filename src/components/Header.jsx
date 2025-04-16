import { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  useTheme,
} from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { WalletContext } from "../context/walletContext";
import { toast } from "react-toastify";

const Header = () => {
  const { account, balance, isConnected, connectWallet, disconnectWallet } =
    useContext(WalletContext);
  const theme = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleConnect = async () => {
    try {
      await connectWallet();
    } catch (error) {
      toast.error("Failed to connect wallet");
    }
  };

  return (
    <AppBar position="static" className="!bg-transparent !shadow-none">
      <Toolbar className="flex justify-around items-center">
        <Typography variant="h4" className="flex-1 font-bold">
          Opinex
        </Typography>
        <Box className="flex-end absolute right-0 flex items-center space-x-4">
          {isConnected ? (
            <>
              <Typography variant="body2" className="hidden md:block">
                {account.slice(0, 6)}...{account.slice(-4)} |{" "}
                {parseFloat(balance).toFixed(2)} ETH
              </Typography>
              <Button color="inherit" onClick={disconnectWallet}>
                Disconnect
              </Button>
            </>
          ) : (
            <Button color="green" variant="contained" onClick={handleConnect}>
              Connect Wallet
            </Button>
          )}
          {/* <IconButton onClick={toggleTheme} color="inherit">
            {isDarkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton> */}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
