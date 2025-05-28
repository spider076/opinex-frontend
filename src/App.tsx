import { RouterProvider } from "react-router-dom";
import { WalletProvider } from "./context/walletContext.tsx"; // Ensure .tsx
import router from "./routes"; // Assuming this is correctly configured
import Wrapper from "./utils/Wrapper.tsx"; // Ensure .tsx
import { Toaster } from "./components/ui/toaster"; // Import shadcn/ui Toaster

function App() {
  return (
    <WalletProvider>
      <main className="bg-background text-foreground min-h-screen flex flex-col w-screen">
        <Wrapper>
          <RouterProvider router={router} />
        </Wrapper>
        <footer className="fixed bottom-1 mx-auto w-full text-center text-sm text-muted-foreground">
          <p>
            Built with ❤️ |{" "}
            <a target="_blank" rel="noopener noreferrer" href="https://github.com/spider076/opinex-frontend" className="hover:text-foreground underline">
              GitHub
            </a>{" "}
            |{" "}
            <a
              href="https://sepolia.etherscan.io/address/0xE6dff8960a2BD40365BadC37fdE73cc5511e1d06"
              target="_blank" rel="noopener noreferrer"
              className="hover:text-foreground underline"
            >
              Contract
            </a>
          </p>
        </footer>
      </main>
      <Toaster />
    </WalletProvider>
  );
}

export default App;
