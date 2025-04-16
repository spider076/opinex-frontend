import { useTheme } from "@mui/material/styles";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { WalletProvider } from "./context/walletContext";
import router from "./routes";
import Wrapper from "./utils/Wrapper";

function App() {
  const theme = useTheme();

  return (
    <WalletProvider>
      <main className="bg-[#20293C] min-h-screen flex flex-col w-screen">
        <Wrapper>
          <RouterProvider router={router} />
        </Wrapper>
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
      <ToastContainer />
    </WalletProvider>
  );
}

export default App;
