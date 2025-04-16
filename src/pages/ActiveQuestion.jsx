import { useState, useEffect, useContext } from "react";
import { Typography } from "@mui/material";
import QuestionCard from "../components/QuestionCard";
import { WalletContext } from "../context/walletContext";
import { toast } from "react-toastify";

const ActiveQuestion = () => {
  const { contract, isConnected } = useContext(WalletContext);
  const [latestQuestion, setLatestQuestion] = useState(null);
  const [questionId, setQuestionId] = useState(null);

  useEffect(() => {
    if (contract) {
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
      toast.error("Failed to load question");
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
