import { useContext, useEffect, useState } from "react";
import { WalletContext } from "../context/walletContext";

export const useGetQuestionById = (questionId) => {
  const { contract, account } = useContext(WalletContext);
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    (async () => {
      if (account) {
        try {
          const data = await contract.getQuestion(questionId);

          setQuestion(data);
        } catch (error) {
          console.error("Error fetching user bet:", error);
        }
      }
    })();
  }, [account, contract]);

  return question;
};
