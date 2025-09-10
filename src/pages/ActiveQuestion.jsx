import { useState, useEffect, useContext } from "react";
import { Typography } from "@mui/material";
import QuestionCard from "../components/QuestionCard";
import { WalletContext } from "../context/wallet-states";
import { toast } from "react-toastify";

const ActiveQuestion = () => {
  const { contract, isConnected } = useContext(WalletContext);
  const [latestQuestion, setLatestQuestion] = useState(null);
  const [questionId, setQuestionId] = useState(null);

  async function temp() {
      console.log("contract : ", contract);
  }

  useEffect(() => {
    if (contract) {
      temp();
      fetchLatestQuestion();
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
      
      if (questionCount > 0) {
        const id = questionCount - 1;
        try {
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
        } catch (questionError) {
          console.error("Error fetching specific question:", {
            error: questionError,
            errorMessage: questionError.message,
            errorReason: questionError.reason,
            errorCode: questionError.code,
          });
          throw questionError;
        }
      }
    } catch (error) {
      console.error("Error details:", {
        message: error.message,
        reason: error.reason,
        code: error.code,
        method: error.method,
        transaction: error.transaction
      });
      toast.error(`Failed to load question: ${error.reason || error.message}`);
    }
  };

  const setupEventListeners = () => {
    contract.on("NewQuestion", () => {
      fetchLatestQuestion();
      toast.info("New question available!");
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
      <Typography className="text-center mt-8">
        Please connect your wallet to view the latest question.
      </Typography>
    );
  }

  if (!latestQuestion) {
    return (
      <Typography className="text-center mt-8">
        No questions available.
      </Typography>
    );
  }

  return (
    <div className="bg-transparent">
      <QuestionCard
        questionData={latestQuestion}
        questionId={questionId}
        fetchStakes={fetchLatestQuestion}
      />
    </div>
  );
};

export default ActiveQuestion;
