import { useContext, useEffect, useState } from "react";
import { WalletContext } from "../context/walletContext"; // Assuming WalletContext is typed
import { ethers } from "ethers";

// Define the interface for a single user trade
export interface UserTrade {
  questionId: number;
  amount: number; // Amount in ETH (already formatted)
  option: string;
}

// Define the interface for the return type of useGetUserTradesById, which might include raw amount
export interface UserTradeDetails extends UserTrade {
  rawAmount?: ethers.BigNumberish; // Optional: store raw amount if needed elsewhere
}


export const useGetUserTrades = (): UserTrade[] => {
  const { contract, account } = useContext(WalletContext);
  const [userTrades, setUserTrades] = useState<UserTrade[]>([]);

  useEffect(() => {
    const fetchTrades = async () => {
      if (account && contract) {
        try {
          const questionCountBigInt = await contract.getQuestionsCount();
          const questionCount = Number(questionCountBigInt);

          const tradesPromises: Promise<UserTrade | null>[] = [];
          for (let questionId = 0; questionId < questionCount; questionId++) {
            tradesPromises.push(
              contract.getUserBet(questionId, account)
                .then(([amount, option]: [ethers.BigNumberish, string]) => {
                  // Only include if amount is greater than 0, or adjust as needed
                  if (ethers.parseEther("0").lt(amount)) { 
                    return {
                      questionId,
                      amount: Number(ethers.formatEther(amount)),
                      option,
                    };
                  }
                  return null; 
                })
                .catch((error: any) => {
                  console.error(`Error fetching user bet for Q#${questionId}:`, error);
                  return null; // Return null or handle error appropriately
                })
            );
          }
          
          const resolvedTrades = (await Promise.all(tradesPromises)).filter(trade => trade !== null) as UserTrade[];
          setUserTrades(resolvedTrades);
        } catch (error) {
          console.error("Error fetching question count or user bets:", error);
          setUserTrades([]); // Clear or set to error state
        }
      } else {
        setUserTrades([]); // Clear trades if no account or contract
      }
    };

    fetchTrades();

    // Cleanup function is not strictly needed here as setUserTrades(trades) 
    // will replace the state. If there were subscriptions, they'd be cleaned up.
    // return () => {
    //   // setUserTrades([]); // This would clear trades on component unmount or dependency change
    // };
  }, [account, contract]);

  return userTrades;
};

export const useGetUserTradesById = (questionId: number | string): UserTradeDetails => {
  const { contract, account } = useContext(WalletContext);
  // Initialize with a default structure that matches UserTradeDetails
  const [userTrade, setUserTrade] = useState<UserTradeDetails>({ 
    questionId: Number(questionId), // Ensure questionId is a number
    amount: 0, 
    option: "", 
    rawAmount: ethers.parseEther("0") 
  });

  useEffect(() => {
    const fetchTradeById = async () => {
      if (account && contract && questionId !== null && questionId !== undefined) {
        try {
          const [amountBigNum, option]: [ethers.BigNumberish, string] = await contract.getUserBet(
            questionId,
            account
          );
          setUserTrade({
            questionId: Number(questionId),
            amount: Number(ethers.formatEther(amountBigNum)),
            option,
            rawAmount: amountBigNum,
          });
        } catch (error) {
          console.error(`Error fetching user bet for Q#${questionId}:`, error);
          // Reset to default or set an error state
          setUserTrade({ questionId: Number(questionId), amount: 0, option: "", rawAmount: ethers.parseEther("0") });
        }
      } else {
        // Reset if no account, contract, or valid questionId
        setUserTrade({ questionId: Number(questionId), amount: 0, option: "", rawAmount: ethers.parseEther("0") });
      }
    };

    fetchTradeById();
  }, [account, contract, questionId]);

  return userTrade;
};
