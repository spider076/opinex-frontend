import { useState, useEffect, useContext } from "react";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { WalletContext } from "../context/walletContext";
import { ethers } from "ethers";

const Profile = () => {
  const { contract, account, isConnected } = useContext(WalletContext);
  const [bets, setBets] = useState([]);

  useEffect(() => {
    if (contract && account) {
      fetchUserBets();
    }
  }, [contract, account]);

  const fetchUserBets = async () => {
    try {
      const questionCount = await contract.getQuestionsCount();;
      const betPromises = [];
      for (let i = 0; i < questionCount; i++) {
        betPromises.push(contract.getUserBet(i, account));
        betPromises.push(contract.getQuestion(i));
      }
      const results = await Promise.all(betPromises);
      const userBets = [];
      for (let i = 0; i < questionCount; i++) {
        const [amount, option] = results[i * 2];
        const [topic, question, , , isActive, , winningOption] =
          results[i * 2 + 1];
        if (Number(amount) > 0) {
          userBets.push({
            questionId: i,
            question,
            topic,
            amount: ethers.formatEther(amount),
            option,
            status: isActive
              ? "Active"
              : winningOption
              ? option === winningOption
                ? "Won"
                : "Lost"
              : "Resolved (No Winner)",
          });
        }
      }
      setBets(userBets);
    } catch (error) {
      console.error("Error fetching bets:", error);
    }
  };

  if (!isConnected) {
    return (
      <Typography className="text-center mt-8">
        Please connect your wallet to view your bets.
      </Typography>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardContent>
        <Typography variant="h5" className="mb-4">
          Your Bets
        </Typography>
        {bets.length === 0 ? (
          <Typography>No bets placed yet.</Typography>
        ) : (
          <List>
            {bets.map((bet) => (
              <ListItem key={bet.questionId} className="border-b last:border-0">
                <ListItemText
                  primary={`${bet.topic}: ${bet.question}`}
                  secondary={`Bet: ${bet.amount} ETH on "${bet.option}" | Status: ${bet.status}`}
                />
              </ListItem>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
};

export default Profile;
