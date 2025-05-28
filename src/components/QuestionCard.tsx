import { useState, useEffect, useContext, FC } from "react";
import { ethers } from "ethers";
import { useToast } from "./ui/use-toast"; // Import shadcn/ui useToast
import { WalletContext } from "../context/walletContext.tsx"; // Ensure .tsx
import { useGetUserTradesById } from "../hooks/useBets.ts"; // Ensure .ts
import { useCountdown, TimeLeft } from "../hooks/useCountdown"; // Assuming TimeLeft is exported

import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Loader2 } from "lucide-react"; // For loading spinner

// Define interfaces for props
interface QuestionData {
  topic: string;
  question: string;
  options: string[];
  totalPool: ethers.BigNumberish; // Keep as BigNumberish or string if formatting happens here
  isActive: boolean;
  timestamp: number | string; // Or specific type if known
}

interface QuestionCardProps {
  questionData: QuestionData;
  questionId: string | number; // Or specific type
  fetchStakes?: () => void; // Optional if not always provided
}

const CountdownTimer: FC<{ timestamp: number | string }> = ({ timestamp }) => {
  const { hours, minutes, seconds, isExpired }: TimeLeft = useCountdown(timestamp);

  if (isExpired) {
    return (
      <div className="text-red-500 flex items-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
        Expired
      </div>
    );
  }

  return (
    <div className="bg-card-foreground/10 dark:bg-secondary px-4 py-2 rounded-lg border border-border">
      <p className="text-sm text-muted-foreground mb-1">Time Remaining</p>
      <p className="text-xl font-mono font-semibold">
        {String(hours).padStart(2, '0')}:
        {String(minutes).padStart(2, '0')}:
        {String(seconds).padStart(2, '0')}
      </p>
    </div>
  );
};

const QuestionCard: FC<QuestionCardProps> = ({ questionData, questionId, fetchStakes }) => {
  const { toast } = useToast(); // Initialize useToast
  const { contract, account, isConnected } = useContext(WalletContext);
  const [betAmount, setBetAmount] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [stakes, setStakes] = useState<{ option1: number; option2: number }>({ option1: 0, option2: 0 });
  const [isBetting, setIsBetting] = useState<boolean>(false);
  const [isWithdrawing, setIsWithdrawing] = useState<boolean>(false);

  const userBet = useGetUserTradesById(questionId); 
  // console.log("user : ", userBet); // Keep for debugging if needed

  const { topic, question, options, totalPool, isActive, timestamp } = questionData;
  const predefinedAmounts = [0.1, 0.2, 0.5, 1];

  // console.log("temp : ", timestamp ); // Keep for debugging if needed

  useEffect(() => {
    if (contract && isActive) {
      fetchStakesData();
    }
  }, [contract, isActive, questionId]); // Added questionId to dependencies

  const fetchStakesData = async () => {
    if (!contract || !options || options.length < 2) {
        console.error("Contract or options not available for fetching stakes.");
        return;
    }
    try {
      const stake1 = await contract.getOptionStakes(questionId, options[0]);
      const stake2 = await contract.getOptionStakes(questionId, options[1]);
      setStakes({
        option1: Number(ethers.formatEther(stake1)),
        option2: Number(ethers.formatEther(stake2)),
      });
      if (fetchStakes) fetchStakes(); // Call parent's fetchStakes if provided
    } catch (error) {
      console.error("Error fetching stakes:", error);
      toast({ title: "Error", description: "Could not fetch stake data.", variant: "destructive" });
    }
  };

  const handleBet = async () => {
    if (!isConnected) {
      toast({ title: "Error", description: "Please connect wallet.", variant: "destructive" });
      return;
    }
    if (!selectedOption) {
      toast({ title: "Error", description: "Please select an option.", variant: "destructive" });
      return;
    }
    if (!betAmount || Number(betAmount) <= 0) {
      toast({ title: "Error", description: "Enter a valid bet amount.", variant: "destructive" });
      return;
    }
    if(!contract) {
        toast({ title: "Error", description: "Contract not available.", variant: "destructive" });
        return;
    }

    setIsBetting(true);
    try {
      const tx = await contract.placeBet(questionId, selectedOption, {
        value: ethers.parseEther(betAmount),
      });
      await tx.wait();
      toast({ title: "Success", description: "Bet placed successfully!" });
      setBetAmount("");
      // setSelectedOption(""); // Keep option selected for UX or clear based on preference
      fetchStakesData();
    } catch (error: any) {
      console.error("Bet error:", error);
      const errorMessage =
        error?.reason || error?.error?.message || error?.message || "Transaction failed";
      toast({ title: "Bet Failed", description: errorMessage, variant: "destructive" });
    } finally {
      setIsBetting(false);
    }
  };

  const handleWithdraw = async () => {
    if (!isConnected) {
      toast({ title: "Error", description: "Please connect wallet.", variant: "destructive" });
      return;
    }
     if(!contract) {
        toast({ title: "Error", description: "Contract not available.", variant: "destructive" });
        return;
    }
    setIsWithdrawing(true);
    try {
      const tx = await contract.withdraw(questionId);
      await tx.wait();
      toast({ title: "Success", description: "Withdrawal successful!" });
      fetchStakesData(); // Refresh stakes and potentially user bet info
    } catch (error: any) {
      console.error("Withdraw error:", error);
      const errorMessage =
        error?.reason || error?.error?.message || error?.message || "Withdrawal failed";
      toast({ title: "Withdraw Failed", description: errorMessage, variant: "destructive" });
    } finally {
      setIsWithdrawing(false);
    }
  };

  const totalStakes = stakes.option1 + stakes.option2;
  const option1Percent = totalStakes > 0 ? (stakes.option1 / totalStakes) * 100 : 50;
  const option2Percent = totalStakes > 0 ? (stakes.option2 / totalStakes) * 100 : 50;

  // Type guard for userBet or ensure it has a default structure
  const userBetAmount = userBet && userBet.amount ? Number(ethers.formatEther(userBet.amount)) : 0;
  const userBetOption = userBet && userBet.option ? userBet.option : "";

  return (
    <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-start">
      {/* Left Column: Question Details and Stakes */}
      <Card className="md:col-span-2 bg-card shadow-lg rounded-xl">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-start gap-4">
            <div>
              <CardTitle className="text-2xl lg:text-3xl font-bold">{question}</CardTitle>
              <CardDescription className="text-primary mt-1 text-lg">{topic}</CardDescription>
            </div>
            <CountdownTimer timestamp={timestamp} />
          </div>
          <div className="text-right mt-2">
            <p className="text-sm text-muted-foreground">
              Total Pool: <span className="font-semibold text-foreground">{ethers.formatEther(totalPool)} ETH</span>
            </p>
          </div>
        </CardHeader>
        <CardContent>
          {isActive ? (
            <div className="space-y-8 mt-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <p className="text-lg font-medium text-foreground">{options && options.length > 0 ? options[0] : 'Option 1'}</p>
                  <p className="text-lg font-semibold text-blue-500">{option1Percent.toFixed(1)}%</p>
                </div>
                <Progress value={option1Percent} className="h-3 bg-blue-500/20" indicatorClassName="bg-blue-500" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <p className="text-lg font-medium text-foreground">{options && options.length > 1 ? options[1] : 'Option 2'}</p>
                  <p className="text-lg font-semibold text-green-500">{option2Percent.toFixed(1)}%</p>
                </div>
                <Progress value={option2Percent} className="h-3 bg-green-500/20" indicatorClassName="bg-green-500" />
              </div>
            </div>
          ) : (
            <p className="mt-4 text-muted-foreground text-center py-8">
              This question is no longer active for betting.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Right Column: Betting Actions */}
      {isActive && (
        <Card className="bg-card shadow-lg rounded-xl">
          <CardHeader>
            <CardTitle className="text-xl">Place Your Bet</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-3">
              {options && options.map((option) => (
                <Button
                  key={option}
                  variant={selectedOption === option ? "default" : "outline"}
                  onClick={() => setSelectedOption(option)}
                  className="py-6 text-base"
                  size="lg"
                >
                  {option}
                </Button>
              ))}
            </div>

            <div>
              <Label htmlFor="betAmount" className="text-muted-foreground mb-1 block">Amount (ETH)</Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                {predefinedAmounts.map((amount) => (
                  <Button
                    key={amount}
                    variant={betAmount === amount.toString() ? "secondary" : "outline"}
                    onClick={() => setBetAmount(amount.toString())}
                  >
                    {amount}
                  </Button>
                ))}
              </div>
              <Input
                id="betAmount"
                type="number"
                placeholder="Custom Amount"
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)}
                min="0"
                step="0.01"
                className="text-base"
              />
            </div>
            <Button
              onClick={handleBet}
              disabled={!isActive || !selectedOption || !betAmount || isBetting}
              className="w-full py-3 text-base"
              size="lg"
            >
              {isBetting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isBetting ? "Placing Bet..." : "Trade"}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* User's Current Bet Section (Full Width Below) */}
      {userBetAmount > 0 && (
        <Card className="md:col-span-3 bg-card shadow-lg rounded-xl mt-6 lg:mt-8">
          <CardHeader>
            <CardTitle className="text-xl">Your Current Position</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="flex items-center gap-3">
                <p className="text-2xl font-semibold">{userBetAmount.toFixed(Math.min(ethers.decimals, 4))} ETH</p> 
                <Badge variant={userBetOption === (options && options.length > 0 ? options[0] : '') ? "default" : "secondary"}>
                  {userBetOption}
                </Badge>
              </div>
              <Button
                onClick={handleWithdraw}
                disabled={isWithdrawing || !isActive || (userBetOption !== (option1Percent > option2Percent ? (options && options.length > 0 ? options[0] : '') : (options && options.length > 1 ? options[1] : '')))}
                variant="outline"
                className="w-full sm:w-auto"
              >
                {isWithdrawing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isWithdrawing ? "Withdrawing..." : "Withdraw Winnings"}
              </Button>
            </div>
            {isActive && ( userBetOption === (option1Percent > option2Percent ? (options && options.length > 0 ? options[0] : '') : (options && options.length > 1 ? options[1] : ''))) ? (
              <p className="text-sm text-green-500 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
                Your position is currently winning.
              </p>
            ) : isActive ? (
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-muted-foreground/50"></span>
                Withdrawal available if your position is winning when the question resolves.
              </p>
            ) : (
               <p className="text-sm text-muted-foreground flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-muted-foreground/50"></span>
                Question has ended. Check results for withdrawal eligibility.
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default QuestionCard;
