import { useContext, useEffect, useState } from "react";
import { WalletContext } from "../context/wallet-states";
import { ethers } from "ethers";

export const useGetUserTrades = () => {
  const { contract, account } = useContext(WalletContext);
  const [userTrades, setUserTrades] = useState([]);

  useEffect(() => {
    (async () => {
      if (account) {
        try {
          const questionCountBigInt = await contract.getQuestionsCount();
          const questionCount = Number(questionCountBigInt);

          const trades = [];
          for (let questionId = 0; questionId < questionCount; questionId++) {
            const [amount, option] = await contract.getUserBet(
              questionId,
              account
            );
            // if (amount > 0) {
            trades.push({
              questionId,
              amount: Number(ethers.formatEther(amount)),
              option,
            });
            // }
          }

          setUserTrades(trades);
        } catch (error) {
          console.error("Error fetching user bet:", error);
        }
      }

      return () => {
        setUserTrades([]);
      };
    })();
  }, [account, contract]);

  return userTrades;
};

export const useGetUserTradesById = (questionId) => {
  const { contract, account } = useContext(WalletContext);
  const [userTrade, setUserTrade] = useState({ amount: 0, option: "" });

  useEffect(() => {
    (async () => {
      if (account) {
        try {
          const [amount, option] = await contract.getUserBet(
            questionId,
            account
          );
          setUserTrade({
            amount: Number(ethers.formatEther(amount)),
            option,
          });
        } catch (error) {
          console.error("Error fetching user bet:", error);
        }
      }
    })();
  }, [account, contract]);

  return userTrade;
};
