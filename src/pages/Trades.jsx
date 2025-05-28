import { useState, useEffect, useContext } from "react";
import { useGetUserTrades } from "../hooks/useBets.ts"; // Ensure .ts or resolved
import TradeCard from "../components/TradeCard.tsx"; // Ensure .ts or resolved
import { WalletContext } from "../context/walletContext"; // Ensure .ts or resolved
import { Skeleton } from "../components/ui/skeleton.tsx"; // Assuming shadcn/ui skeleton
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert.tsx"; // Assuming shadcn/ui alert
import { ListChecks } from "lucide-react"; // Example icon for Alert

const Trades = () => {
  const { account, isConnected } = useContext(WalletContext); // Added isConnected and account to check wallet status
  const trades = useGetUserTrades(); // Hook is already typed
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state, in a real app, useGetUserTrades might return a loading status
  useEffect(() => {
    // If trades are fetched based on account, loading should depend on account presence
    if (isConnected && account) {
        // A simple timeout to simulate network delay for fetching trades
        // In a real scenario, useGetUserTrades would internally handle its loading state
        // and possibly return { trades, isLoading, error }
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500); // Adjust delay as needed, or remove if hook provides loading state
        return () => clearTimeout(timer);
    } else {
        setIsLoading(false); // Not connected or no account, so not loading trades
    }
  }, [trades, isConnected, account]);


  if (!isConnected || !account) {
    return (
        <div className="container mx-auto py-6 lg:py-10 text-center">
             <Alert variant="default" className="max-w-md mx-auto">
                <ListChecks className="h-5 w-5" />
                <AlertTitle>Connect Wallet</AlertTitle>
                <AlertDescription>
                    Please connect your wallet to view your trades.
                </AlertDescription>
            </Alert>
        </div>
    );
  }


  if (isLoading) {
    return (
      <div className="container mx-auto py-6 lg:py-10">
        <h1 className="text-3xl font-bold mb-6 lg:mb-8 text-center text-foreground">
          Your Trades
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 lg:py-10">
      <h1 className="text-3xl font-bold mb-6 lg:mb-8 text-center text-foreground">
        Your Trades
      </h1>
      {trades.length === 0 ? (
        <Alert variant="default" className="max-w-lg mx-auto">
          <ListChecks className="h-5 w-5" />
          <AlertTitle>No Trades Yet</AlertTitle>
          <AlertDescription>
            You haven't made any trades. Once you participate in a question, your trades will appear here.
          </AlertDescription>
        </Alert>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {trades.map((trade) => (
            <TradeCard key={trade.questionId} trade={trade} />
          ))}
        </div>
      )}
    </div>
  );
};

// Simple Skeleton for TradeCard
const CardSkeleton = () => (
  <div className="bg-card shadow-md rounded-lg p-4 border border-border">
    <Skeleton className="h-6 w-3/4 mb-2" />
    <Skeleton className="h-4 w-1/2 mb-4" />
    <div className="space-y-3">
      <Skeleton className="h-5 w-full" />
      <Skeleton className="h-5 w-5/6" />
      <Skeleton className="h-5 w-4/6" />
    </div>
    <div className="flex justify-end mt-4">
        <Skeleton className="h-10 w-1/3" />
    </div>
  </div>
);

export default Trades;
