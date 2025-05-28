import { FC, useContext, useState } from "react";
import { WalletContext } from "../context/walletContext";
import { useGetQuestionById, Question } from "../hooks/useQuestion.ts"; // Ensure .ts is used or resolved
import { UserTrade } from "../hooks/useBets.ts"; // Ensure .ts is used or resolved
import { ethers } from "ethers";
import { useToast } from "./ui/use-toast"; // Import shadcn/ui useToast

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Loader2, Clock, Wallet, Vote, Info } from "lucide-react"; // Example icons

interface TradeCardProps {
  trade: UserTrade;
}

const TradeCard: FC<TradeCardProps> = ({ trade }) => {
  const { toast } = useToast(); // Initialize useToast
  const { contract } = useContext(WalletContext);
  const question = useGetQuestionById(trade.questionId);
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  const handleWithdraw = async () => {
    if (!contract) {
      toast({ title: "Error", description: "Contract not available.", variant: "destructive" });
      return;
    }
    setIsWithdrawing(true);
    try {
      const tx = await contract.withdraw(trade.questionId);
      await tx.wait();
      toast({ title: "Success", description: "Withdrawal successful!" });
      // Optionally, you might want to refresh data or update UI state here
    } catch (error: any) {
      console.error("Withdraw error:", error);
      const errorMessage = error?.reason || error?.message || "Failed to withdraw";
      toast({ title: "Withdraw Failed", description: errorMessage, variant: "destructive" });
    } finally {
      setIsWithdrawing(false);
    }
  };

  if (!question) {
    return (
      <Card className="w-full bg-card shadow-md rounded-lg p-4 animate-pulse">
        <CardHeader>
          <div className="h-6 bg-muted rounded w-3/4"></div>
          <div className="h-4 bg-muted rounded w-1/2 mt-1"></div>
        </CardHeader>
        <CardContent>
          <div className="h-4 bg-muted rounded w-full mb-2"></div>
          <div className="h-4 bg-muted rounded w-3/4"></div>
        </CardContent>
        <CardFooter>
           <div className="h-10 bg-muted rounded w-1/3 ml-auto"></div>
        </CardFooter>
      </Card>
    );
  }

  // Determine if user can withdraw. This logic might need adjustment based on game rules.
  // For example, can only withdraw if the question is ended AND their option won.
  // Or, if the question is active and they want to pull out (if allowed).
  // The original logic was: `question.isActive && trade.amount > 0` which might be too simple.
  // Let's assume for now: can withdraw if question ended and their option won.
  const isQuestionResolved = !question.isActive;
  const didUserWin = isQuestionResolved && trade.option === question.winningOption && trade.amount > 0;
  // Or if active and withdrawal means something else (e.g. cancel bet - not typical for prediction markets)
  // For simplicity, the original button was enabled if `question.isActive`, let's stick to that for now,
  // but it should be clarified what "Withdraw" means in an active market.
  // Reverting to a simpler "canWithdraw" based on original logic, but with a note.
  // The original `canWithdraw` was `question.isActive && trade.amount > 0;`
  // This seems to imply withdrawing from an active market, which is unusual unless it's a "cash out" feature.
  // If "Withdraw" means "claim winnings", it should only be available when question.isActive is false and user won.

  // Let's assume "Withdraw" means "Claim Winnings" for a resolved question.
  const canClaimWinnings = !question.isActive && trade.option === question.winningOption && trade.amount > 0;
  
  // If "Withdraw" means cancel from an active market (if contract supports it)
  // const canCancelBet = question.isActive && trade.amount > 0;


  // Calculate pool percentages if options and totalPool are valid
  let option1Percent = 0;
  let option2Percent = 0;
  if (question.options && question.options.length === 2 && question.totalPool) {
    const totalPoolNum = Number(ethers.formatEther(question.totalPool));
    if (totalPoolNum > 0) {
      // This part is tricky as individual option stakes are not directly in `Question` type.
      // We'd need to fetch them similar to QuestionCard, or adjust what `TradeCard` shows.
      // For now, let's remove direct display of percentages as they are not in `Question` type.
      // If this is needed, `question` object in `useGetQuestionById` must be augmented.
    }
  }


  return (
    <Card className="w-full bg-card shadow-md rounded-lg overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-semibold">{question.question}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">{question.topic}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center">
            <Wallet className="h-4 w-4 mr-2 text-muted-foreground" />
            <div>
              <p className="text-muted-foreground">Amount Bet</p>
              <p className="font-semibold text-foreground">{trade.amount} ETH</p>
            </div>
          </div>
          <div className="flex items-center">
            <Vote className="h-4 w-4 mr-2 text-muted-foreground" />
            <div>
              <p className="text-muted-foreground">Your Vote</p>
              <Badge 
                variant={trade.option === (question.options && question.options.length > 0 ? question.options[0] : '') ? "default" : "secondary"}
                className="capitalize"
              >
                {trade.option || "N/A"}
              </Badge>
            </div>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
            <div>
              <p className="text-muted-foreground">Status</p>
              <Badge variant={question.isActive ? "outline" : "destructive"} className="capitalize">
                {question.isActive ? "Active" : "Ended"}
              </Badge>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border pt-4">
            <div className="flex items-center text-sm">
                 <Info className="h-4 w-4 mr-2 text-muted-foreground" />
                <p className="text-muted-foreground">
                    Total Pool: <span className="font-semibold text-foreground">{ethers.formatEther(question.totalPool)} ETH</span>
                </p>
            </div>
          {/* Removed option percentages as they are not directly available in Question type */}
        </div>
      </CardContent>
      <CardFooter className="bg-muted/30 px-6 py-4 justify-end">
        {/* Adjusting withdraw logic: typically withdraw is for claiming winnings after market resolves */}
        {/* Or if the contract allows pulling out from an active market (less common) */}
        {/* For this example, let's say withdraw is to claim if user won and market ended */}
        {!question.isActive && trade.option === question.winningOption && trade.amount > 0 ? (
          <Button
            onClick={handleWithdraw}
            disabled={isWithdrawing}
            className="w-full sm:w-auto"
          >
            {isWithdrawing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isWithdrawing ? "Withdrawing..." : "Claim Winnings"}
          </Button>
        ) : !question.isActive ? (
            <p className="text-sm text-muted-foreground">Market ended. You did not win this trade.</p>
        ) : (
            <p className="text-sm text-muted-foreground">Market is still active.</p>
        )
    }
      </CardFooter>
    </Card>
  );
};

export default TradeCard;
