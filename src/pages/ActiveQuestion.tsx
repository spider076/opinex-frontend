import { useState, useEffect, useContext } from "react";
import QuestionCard from "../components/QuestionCard.tsx"; // Ensure .tsx is used or resolved
import { WalletContext } from "../context/walletContext.tsx"; // Ensure .tsx
import { useToast } from "../components/ui/use-toast"; // Import shadcn/ui useToast

const ActiveQuestion = () => {
  const { toast } = useToast(); // Initialize useToast
  const { contract, isConnected } = useContext(WalletContext);
  const [latestQuestion, setLatestQuestion] = useState<any>(null); // Consider defining a type for Question
  const [questionId, setQuestionId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (contract) {
      setIsLoading(true);
      fetchLatestQuestion().finally(() => setIsLoading(false));
      setupEventListeners();
    }
    return () => {
      if (contract) {
        contract.removeAllListeners();
      }
    };
  }, [contract]);

  const fetchLatestQuestion = async () => {
    try {
      const questionCountBigInt = await contract.getQuestionsCount();
      const questionCount = Number(questionCountBigInt);
      console.log("question : ", questionCount);
      if (questionCount > 0) {
        const id = questionCount - 1;
        const [
          topic,
          question,
          options,
          timestamp,
          isActive,
          totalPool,
          winningOption,
        ] = await contract.getQuestion(id);
        setLatestQuestion({
          topic,
          question,
          options,
          timestamp: Number(timestamp),
          isActive,
          totalPool,
          winningOption,
        });
        setQuestionId(id);
      }
    } catch (error) {
      console.error("Error fetching latest question:", error);
      toast({ title: "Error", description: "Failed to load question.", variant: "destructive" });
    }
    // setIsLoading(false); // Moved to finally block
  };

  const setupEventListeners = () => {
    if (!contract) return; // Ensure contract is available before setting up listeners
    
    contract.on("NewQuestion", () => {
      fetchLatestQuestion();
      toast({ title: "Update", description: "New question available!" });
    });
    contract.on("BetPlaced", () => {
      fetchLatestQuestion();
    });
    contract.on("Withdrawn", () => {
      fetchLatestQuestion();
    });
    contract.on("QuestionResolved", () => {
      fetchLatestQuestion();
    });
  };

  if (!isConnected) {
    return (
      <div className="container mx-auto text-center mt-12 p-4">
        <p className="text-xl text-muted-foreground">
          Please connect your wallet to view the latest question.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto text-center mt-12 p-4">
        {/* Optional: Add a shadcn/ui spinner or a simple text like below */}
        <p className="text-xl text-muted-foreground animate-pulse">Loading latest question...</p>
      </div>
    );
  }

  if (!latestQuestion) {
    return (
      <div className="container mx-auto text-center mt-12 p-4">
        <p className="text-xl text-muted-foreground">
          No active questions available at the moment.
        </p>
      </div>
    );
  }

  return (
    // container and mx-auto were already in DashboardLayout, check if needed here too
    // For now, assuming QuestionCard handles its own width/spacing or is full-width within this div
    <div className="py-6"> 
      {latestQuestion && questionId !== null && (
        <QuestionCard
          questionData={latestQuestion}
          questionId={questionId}
          fetchStakes={fetchLatestQuestion} // Pass the function to refresh data
        />
      )}
    </div>
  );
};

export default ActiveQuestion;
