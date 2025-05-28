import { useContext, useEffect, useState } from "react";
import { WalletContext } from "../context/walletContext"; // Assuming WalletContext is typed
import { ethers } from "ethers"; // For BigNumberish type if needed in Question

// Interface for the structure of a question object returned by the smart contract
export interface Question {
  id: number; // Added id for convenience, though getQuestion might not return it directly
  topic: string;
  question: string;
  options: string[]; // e.g., ["Yes", "No"]
  timestamp: number; // Unix timestamp (seconds), will be converted to ms in usage
  isActive: boolean;
  totalPool: ethers.BigNumberish; // Raw total pool amount from contract
  winningOption: string; // The option string that won, or empty/default if not resolved
  // Raw contract data structure if different from the desired usable structure
  // For example, if contract.getQuestion returns an array:
  // rawData: [string, string, string[], ethers.BigNumber, boolean, ethers.BigNumber, string]; 
}


export const useGetQuestionById = (questionId: number | string | null): Question | null => {
  const { contract, account } = useContext(WalletContext); // account might not be needed if contract allows read-only calls
  const [question, setQuestion] = useState<Question | null>(null);

  useEffect(() => {
    const fetchQuestion = async () => {
      if (contract && questionId !== null && questionId !== undefined) {
        try {
          // Assuming getQuestion returns an array/tuple matching this structure:
          const [
            topic,
            questionText,
            options,
            timestampBigNum, // Assuming contract returns BigNumber for timestamp
            isActive,
            totalPool,
            winningOption,
          ] = await contract.getQuestion(questionId);
          
          setQuestion({
            id: Number(questionId), // Store the ID used for fetching
            topic,
            question: questionText,
            options,
            timestamp: Number(timestampBigNum) * 1000, // Convert to milliseconds
            isActive,
            totalPool,
            winningOption,
          });
        } catch (error) {
          console.error(`Error fetching question Q#${questionId}:`, error);
          setQuestion(null); // Reset or set error state
        }
      } else {
        setQuestion(null); // Reset if no contract or questionId
      }
    };

    fetchQuestion();
  }, [contract, questionId]); // Removed account if not strictly necessary for getQuestion

  return question;
};
