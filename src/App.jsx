import {
  BrowserRouter as Router,
  Routes,
  Route,
  RouterProvider,
} from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import History from "./pages/History";
import ProfilePage from "./pages/Profile";
import { WalletProvider } from "./context/walletContext";
import router from "./routes";

function App() {
  const theme = useTheme();

  return (
    <WalletProvider>
      <main className="bg-[#20293C] min-h-screen flex flex-col w-screen">
        <RouterProvider router={router} />
        <footer className="fixed bottom-1 mx-auto w-full text-center text-gray-500 dark:text-gray-400">
          <p>
            Built with ❤️ |{" "}
            <a href="https://github.com" className="underline">
              GitHub
            </a>{" "}
            |{" "}
            <a href="https://twitter.com" className="underline">
              Twitter
            </a>{" "}
            |{" "}
            <a
              href="https://sepolia.etherscan.io/address/0xE6dff8960a2BD40365BadC37fdE73cc5511e1d06"
              className="underline"
            >
              Contract
            </a>
          </p>
        </footer>
      </main>
    </WalletProvider>
  );
}

export default App;
